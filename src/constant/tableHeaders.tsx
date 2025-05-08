import {Order, ResponseProduct, UserObject} from "../interfaces/user.ts";
import {Link} from "react-router-dom";

export const productTableColumns = [
    {
        name: 'Product Name',
        selector: (row: ResponseProduct) => row.name,
        sortable: true,
        cell: (row: ResponseProduct) => <Link to={`/product/${row._id}`}>{row.name}</Link>,
    },
    {
        name: 'Image',
        selector: (row: ResponseProduct) => row.image,
        cell: (row: ResponseProduct) => <img src={row.image} className="w-24 h-18" alt="image" />,
    },
    {
        name: 'Stock',
        selector: (row: ResponseProduct) => row.quantity,
        sortable: true,
        cell: (row: ResponseProduct) => <span>{row.quantity}</span>,
    },
    {
        name: 'Price',
        selector: (row: ResponseProduct) => row.price,
        sortable: true,
        cell: (row: ResponseProduct) => <span>{row.price}</span>,
    },
    {
        name: 'New Price',
        selector: (row: ResponseProduct) => row.newPrice,
        sortable: true,
        cell: (row: ResponseProduct) => <span>{row.newPrice}</span>,
    },
    {
        name: 'Actions',
        selector: (row: ResponseProduct) => row.newPrice,
        sortable: false,
        cell: (row: ResponseProduct) => (
            <div className='flex gap-2'>
                <Link to={`/product/${row._id}`} className='btn btn-primary btn-outline'>
                    View
                </Link>
            </div>
        ),
    },
];

export const orderTableColumns = [
    {
        name: 'Order ID',
        selector: (row: Order) => row._id || '',
        sortable: true,
        cell: (row: Order) => <Link to={`/order/${row._id}`}>{row._id}</Link>,
    },
    {
        name: 'Date',
        selector: (row: Order) => row.date.split('T')[0] || '',
        sortable: true,
        cell: (row: Order) => <span>{row.date.split('T')[0]}</span>,
    },
    {
        name: 'Amount',
        selector: (row: Order) => row.amount || '',
        sortable: true,
        cell: (row: Order) => <span>{row.amount}</span>,
    },
    {
        name: 'Status',
        selector: (row: Order) => row.status || '',
        sortable: true,
        cell: (row: Order) => <span>{row.status}</span>,
    },
    {
        name: 'Payment Status',
        selector: (row: Order) => row.paymentStatus || '',
        sortable: true,
        cell: (row: Order) => (
                <span className={`${row.paymentStatus === 'SUCCESS' ? 'text-success' : row.paymentStatus === 'FAILED' ? 'text-error' : 'text-warning'}`}>
                    {row.paymentStatus}
                </span>
            )
    },
    {
        name: 'Actions',
        selector: (row: Order) => row._id || '',
        sortable: false,
        cell: (row: Order) => (
            <div className='flex gap-2'>
                <Link to={`/order/${row._id}`} className='btn btn-primary btn-outline btn-sm'>
                    View
                </Link>
            </div>
        ),
    },
];

export const userTableColumns = [
    {
        name: 'User ID',
        selector: (row: UserObject) => row.id || '',
        sortable: true,
        cell: (row: UserObject) => <Link to={`/user/${row.id}`}>{row.id}</Link>,
    },
    {
        name: 'Username',
        selector: (row: UserObject) => row.username || '',
        sortable: true,
        cell: (row: UserObject) => <span>{row.username}</span>,
    },
    {
        name: 'Email',
        selector: (row: UserObject) => row.email || '',
        sortable: true,
        cell: (row: UserObject) => <span>{row.email}</span>,
    },
    {
        name: 'Role',
        selector: (row: UserObject) => row.role || '',
        sortable: true,
        cell: (row: UserObject) => <span>{row.role}</span>,
    },
    {
        name: 'Cart Item Count',
        selector: (row: UserObject) => row.cart.length || 0,
        sortable: true,
        cell: (row: UserObject) => <span>{row.cart.length}</span>,
    },
    {
        name: 'Actions',
        selector: (row: UserObject) => row.id || '',
        sortable: false,
        cell: (row: UserObject) => (
            <div className='flex gap-2'>
                <Link to={`/user/${row.id}`} className='btn btn-primary btn-outline btn-sm'>
                    View
                </Link>
            </div>
        ),
    },
];
