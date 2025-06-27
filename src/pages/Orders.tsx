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
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [statusFilter, setStatusFilter] = useState("PROCESS");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("SUCCESS");

    const fetchOrders = async (page: number, limit: number) => {

        const res = await getOrderService(page, limit, statusFilter, paymentStatusFilter);
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
    }, [currentPage, rowsPerPage, statusFilter, paymentStatusFilter]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage: number) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(1);
    };

    return (
        <div className="p-6 min-h-screen space-y-6">
            <div className="flex justify-between items-start">
                <h1 className="text-2xl font-semibold">Orders</h1>

                <div className="flex gap-6 items-center">
                    <label className="flex flex-col text-sm font-medium gap-2">
                        Order Status
                        <select
                            className="select select-primary select-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="PROCESS">Processing</option>
                            <option value="DELIVER">Delivering</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </label>

                    <label className="flex flex-col text-sm font-medium gap-2">
                        Payment Status
                        <select
                            className="select select-primary select-sm"
                            value={paymentStatusFilter}
                            onChange={(e) => setPaymentStatusFilter(e.target.value)}
                        >
                            <option value="SUCCESS">Success</option>
                            <option value="FAILED">Failed</option>
                            <option value="PENDING">Pending</option>
                        </select>
                    </label>
                </div>
            </div>


            {
                orders.length > 0 ? (
                    <div className='p-4 shadow-lg rounded-xl'>
                        <DataTable
                            pagination
                            paginationServer
                            paginationRowsPerPageOptions={[10, 25, 50]}
                            columns={orderTableColumns}
                            data={orders}
                            paginationTotalRows={totalRows}
                            paginationPerPage={rowsPerPage}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            customStyles={customStyles}
                        />
                    </div>
                ) : (
                    <div className='text-center'>No results found</div>
                )
            }
        </div>
    )
}

export default Orders;
