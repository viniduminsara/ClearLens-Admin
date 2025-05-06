import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOrderDetailsService, updateOrderStatusService} from "../services/apiServices.ts";
import {Order} from "../interfaces/user.ts";
import {useToast} from "../context/ToastContext.tsx";

const OrderDetails = () => {
    const {id} = useParams();
    const {showToast} = useToast();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    const fetchOrder = async () => {
        const res = await getOrderDetailsService(id as string);
        if (res.success) {
            setOrder(res.body as Order);
        } else {
            showToast({type: "error", message: res.message as string});
        }
    };

    const updateOrderStatus = async (status: string) => {
        const res = await updateOrderStatusService(status, id as string);
        if (res.success) {
            setOrder(res.body as Order);
            showToast({type: "success", message: "Order Status Updated"});
        } else {
            showToast({type: "error", message: res.message as string});
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (!order || !order.orderItems) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (
        <div className="mx-auto p-6 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                {order.status === 'PROCESS' && order.paymentStatus !== 'FAILED' && (
                    <button
                        onClick={() => updateOrderStatus('DELIVER')}
                        className='btn btn-primary'
                    >
                        Update Status to Deliver
                    </button>
                )}
                {order.status === 'DELIVER' && order.paymentStatus !== 'FAILED' && (
                    <button
                        onClick={() => updateOrderStatus('COMPLETED')}
                        className='btn btn-primary'
                    >
                        Update Status to Completed
                    </button>
                )}
            </div>

            <div className="bg-base-100 rounded-xl shadow p-6 mb-6 space-y-3">
                <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleString()}</p>
                <p><span className="font-semibold">Status:</span> <span
                    className="badge badge-info">{order.status}</span></p>
                <p><span className="font-semibold">Payment Status:</span> <span
                    className={`badge ${order.paymentStatus === 'SUCCESS' ? 'badge-success' : order.paymentStatus === 'FAILED' ? 'badge-error' : 'badge-warning'}`}>{order.paymentStatus}</span>
                </p>
                <p><span className="font-semibold">Amount:</span> Rs. {order.amount}</p>
                <p><span className="font-semibold">User:</span> {order.user?.username} ({order.user?.email})</p>
            </div>

            <h2 className="text-xl font-semibold mb-3">Order Items</h2>
            <div className="space-y-4">
                {order.orderItems.map(item => (
                    <div key={item._id} className="flex items-center bg-base-100 shadow rounded-lg p-4 gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded"/>
                        <div className="flex-1">
                            <p className="text-lg font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                        </div>
                        <div className="text-right">
                            <p className="line-through text-sm text-gray-400">Rs. {item.price}</p>
                            <p className="text-lg font-bold text-primary">Rs. {item.newPrice}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate(-1)}
                className="mt-6 btn btn-outline btn-primary"
            >
                Go Back
            </button>
        </div>
    );
};

export default OrderDetails;
