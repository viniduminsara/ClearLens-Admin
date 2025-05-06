import {useToast} from "../context/ToastContext.tsx";
import {useEffect, useState} from "react";
import {Order} from "../interfaces/user.ts";
import {getOrderService} from "../services/apiServices.ts";
import {PaginatedOrderResponse} from "../interfaces/api.ts";
import DataTable from "react-data-table-component";
import {orderTableColumns} from "../constant/tableHeaders.tsx";
import {customStyles} from "../constant/tableCustomStyles.ts";

const Orders = () => {

    const { showToast } = useToast();
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);

    const fetchOrders = async (page: number, limit: number) => {

        const res = await getOrderService(page, limit);
        if (res.success) {
            const { docs, totalDocs } = res.body as PaginatedOrderResponse;
            setOrders(docs);
            setTotalRows(totalDocs);
        } else {
            showToast({ type: "error", message: res.message as string });
        }
    }

    useEffect(() => {
        fetchOrders(currentPage, rowsPerPage);
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
                <h1 className="text-2xl font-semibold">Orders</h1>
            </div>
            {
                orders.length > 0 && (
                    <div className='p-4 shadow-lg rounded-xl'>
                        <DataTable
                            pagination
                            paginationServer
                            paginationRowsPerPageOptions={[5, 10, 25]}
                            columns={orderTableColumns}
                            data={orders}
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

export default Orders;
