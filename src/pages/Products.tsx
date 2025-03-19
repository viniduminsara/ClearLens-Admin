import { FaPlus } from "react-icons/fa6";
import { Product } from "../interfaces/user.ts";
import { useEffect, useState } from "react";
import { getProductsService } from "../services/apiServices.ts";
import { useToast } from "../context/ToastContext.tsx";
import DataTable from "react-data-table-component";
import { productTableColumns } from "../constant/tableHeaders.tsx";
import { PaginatedProductResponse } from "../interfaces/api.ts";
import {customStyles} from "../constant/tableCustomStyles.ts";
import {Link} from "react-router-dom";

const Products = () => {
    const { showToast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);

    const fetchProducts = async (page: number, limit: number) => {
        const res = await getProductsService(page, limit);
        if (res.success) {
            const { docs, totalDocs } = res.body as PaginatedProductResponse;
            setProducts(docs);
            setTotalRows(totalDocs);
        } else {
            showToast({ type: "error", message: res.message as string });
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, rowsPerPage);
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
                <h1 className="text-2xl font-semibold">Products</h1>
                <Link to='/new-product' className="btn btn-primary">
                    <FaPlus /> Add Product
                </Link>
            </div>
            <div className='p-4 shadow-lg rounded-xl'>
                <DataTable
                    pagination
                    paginationServer
                    paginationRowsPerPageOptions={[5, 10, 25]}
                    columns={productTableColumns}
                    data={products}
                    paginationTotalRows={totalRows}
                    paginationPerPage={rowsPerPage}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
};

export default Products;
