import {useToast} from "../context/ToastContext.tsx";
import {useEffect, useState} from "react";
import {UserObject} from "../interfaces/user.ts";
import {getUserService} from "../services/apiServices.ts";
import {PaginatedUserResponse} from "../interfaces/api.ts";
import DataTable from "react-data-table-component";
import {userTableColumns} from "../constant/tableHeaders.tsx";
import {customStyles} from "../constant/tableCustomStyles.ts";

const Users = () => {
    const { showToast } = useToast();
    const [users, setUsers] = useState<UserObject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);

    const fetchUsers = async (page: number, limit: number) => {

        const res = await getUserService(page, limit);
        if (res.success) {
            const { docs, totalDocs } = res.body as PaginatedUserResponse;
            setUsers(docs);
            setTotalRows(totalDocs);
        } else {
            showToast({ type: "error", message: res.message as string });
        }
    }

    useEffect(() => {
        fetchUsers(currentPage, rowsPerPage);
    }, [currentPage, rowsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage: number) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(1);
    };

    return (
        <div className="p-6 min-h-screen space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Users</h1>
            </div>
            {
                users.length > 0 && (
                    <div className='p-4 shadow-lg rounded-xl'>
                        <DataTable
                            pagination
                            paginationServer
                            paginationRowsPerPageOptions={[25, 50, 100]}
                            columns={userTableColumns}
                            data={users}
                            paginationTotalRows={totalRows}
                            paginationPerPage={rowsPerPage}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            customStyles={customStyles}
                        />
                    </div>
                )
            }
        </div>
    )
}
export default Users;

