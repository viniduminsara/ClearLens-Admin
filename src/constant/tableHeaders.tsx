import { Product } from "../interfaces/user.ts";
import {Link} from "react-router-dom";

export const productTableColumns = [
    {
        name: 'Product Name',
        selector: (row: Product) => row.name,
        sortable: true,
        cell: (row: Product) => <Link to={`/product/${row._id}`}>{row.name}</Link>,
    },
    {
        name: 'Image',
        selector: (row: Product) => row.image,
        cell: (row: Product) => <img src={row.image} className="w-24 h-18" alt="image" />,
    },
    {
        name: 'Stock',
        selector: (row: Product) => row.quantity,
        sortable: true,
        cell: (row: Product) => <span>{row.quantity}</span>,
    },
    {
        name: 'Price',
        selector: (row: Product) => row.price,
        sortable: true,
        cell: (row: Product) => <span>{row.price}</span>,
    },
    {
        name: 'New Price',
        selector: (row: Product) => row.newPrice,
        sortable: true,
        cell: (row: Product) => <span>{row.newPrice}</span>,
    },
    {
        name: 'Actions',
        selector: (row: Product) => row.newPrice,
        sortable: false,
        cell: (row: Product) => (
            <div className='flex gap-2'>
                <Link to={`/product/${row._id}`} className='btn btn-primary btn-outline'>
                    View
                </Link>
            </div>
        ),
    },
];
