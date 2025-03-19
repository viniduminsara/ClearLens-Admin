import { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useToast } from "../context/ToastContext.tsx";
import {deleteProductService, getProductDetailsService} from "../services/apiServices.ts";
import {Product} from "../interfaces/user.ts";
import {AiFillEdit} from "react-icons/ai";
import {MdDelete} from "react-icons/md";

const ProductDetails = () => {
    const { id } = useParams();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getProductDetailsService(id as string);
            if (res.success) {
                setProduct(res.body as Product);
            } else {
                showToast({ type: "error", message: res.message as string });
            }
        };
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        const res = await deleteProductService(id as string);
        if (res.success) {
            showToast({ type: "success", message: "Product deleted successfully!" });
            navigate("/products");
        } else {
            showToast({ type: "error", message: res.message as string });
        }
    };

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className='px-6 md:px-24'>
            <div className="md:min-h-screen flex justify-center items-center sm:pt-3 relative">
                <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10 ">
                    <section className="relative p-7 bg-black/[0.075]  flex items-center justify-center rounded-lg">
                        <img
                            src={product.image}
                            alt="image"
                            className="w-full object-contain max-w-xs"
                        />
                    </section>

                    <section className="py-7 px-2 rounded-md shadow-sm flex flex-col gap-3 sm:gap-5 ">
                        <div className="flex flex-col gap-2">
                            <h1 className=" text-2xl sm:text-4xl font-bold">{product.name}</h1>
                            <p className=" text-gray-600 text-sm sm:text-base">
                                {product.description}
                            </p>
                            <div className="flex items-center gap-1">
                                {/*<StarRating/>*/}

                                {/*<span className="text-xs text-gray-400">*/}
                                {/*    ({product?.rating}) Rating*/}
                                {/*</span>*/}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2  ">
                            <h2 className="  text-lg font-semibold">About Product</h2>
                            <ul className="flex gap-5">
                                <div>
                                    <li>
                                        <span className="text-gray-500 text-sm">Brand: </span>
                                        {product.brand}
                                    </li>
                                    <li>
                                        <span className="text-gray-500 text-sm">Category: </span>
                                        {product.category}
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <span className="text-gray-500 text-sm">Gender: </span>
                                        {product.gender}
                                    </li>
                                    <li>
                                        <span className="text-gray-500 text-sm">Heavy: </span>
                                        {product.weight}
                                    </li>
                                </div>
                            </ul>
                        </div>

                        <div className="flex gap-2 items-center pb-10 sm:pb-0">
                            Price:
                            <span className="ms-1 text-xl sm:text-2xl text-primary">
                                Rs. {product.newPrice}
                            </span>
                            <span className="text-sm text-gray-600 line-through">
                                Rs. {product.price}
                            </span>
                        </div>

                        <div className="w-full flex gap-4 items-center flex-wrap">
                            <Link to={`/product/${product._id}/edit`} className='btn btn-primary btn-outline'>
                                <AiFillEdit /> Edit
                            </Link>
                            <button className='btn btn-error btn-outline' onClick={handleDelete}>
                                <MdDelete /> Delete
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
};

export default ProductDetails;

