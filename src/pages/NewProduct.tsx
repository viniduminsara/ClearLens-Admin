import { ChangeEvent, FormEvent, useState } from "react";
import { createNewProductService } from "../services/apiServices.ts";
import { useToast } from "../context/ToastContext.tsx";
import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/user.ts";

const NewProduct = () => {
    const [product, setProduct] = useState<Product>({
        name: "",
        description: "",
        brand: "",
        category: "SPORTS",
        gender: "MALE",
        weight: "",
        quantity: 0,
        price: 0,
        newPrice: 0,
        image: null, // Ensure it's File | null
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) || 0 : value, // Convert number fields
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setProduct((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!product.name) newErrors.name = "Product Name is required.";
        if (!product.description) newErrors.description = "Description is required.";
        if (!product.brand) newErrors.brand = "Brand is required.";
        if (!product.weight) newErrors.weight = "Weight is required.";
        if (product.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0.";
        if (product.price <= 0) newErrors.price = "Price must be greater than 0.";
        if (product.newPrice <= 0) newErrors.newPrice = "New Price must be greater than 0.";
        if (!product.image) newErrors.image = "Product image is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            if (key === "image" && value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === "number") {
                formData.append(key, value.toString());
            } else if (typeof value === "string") {
                formData.append(key, value);
            }
        });

        const res = await createNewProductService(formData);
        if (res.success) {
            showToast({ type: "success", message: "Product Added Successfully" });
            navigate("/products");
        } else {
            showToast({ type: "error", message: res.message as string });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Add New Product</h2>
            <div className="card bg-base-100 shadow-xl p-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div className="form-control">
                        <label className="label font-semibold">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={product.name}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    {/* Description */}
                    <div className="form-control lg:col-span-2">
                        <label className="label font-semibold">Description</label>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={product.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered"
                            required
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                    </div>

                    {/* Other fields omitted for brevity */}
                    {/* Brand */}
                    <div className="form-control">
                        <label className="label font-semibold">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            value={product.brand}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.brand && <span className="text-red-500 text-sm">{errors.brand}</span>}
                    </div>

                    {/* Category */}
                    <div className="form-control">
                        <label className="label font-semibold">Category</label>
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="select select-bordered"
                        >
                            <option value="SPORTS">Sports</option>
                            <option value="VISION">Vision</option>
                            <option value="SUNGLASSES">Sunglasses</option>
                        </select>
                    </div>

                    {/* Gender */}
                    <div className="form-control">
                        <label className="label font-semibold">Gender</label>
                        <select
                            name="gender"
                            value={product.gender}
                            onChange={handleChange}
                            className="select select-bordered"
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>

                    {/* Weight */}
                    <div className="form-control">
                        <label className="label font-semibold">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            placeholder="Weight"
                            value={product.weight}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.weight && <span className="text-red-500 text-sm">{errors.weight}</span>}
                    </div>

                    {/* Quantity */}
                    <div className="form-control">
                        <label className="label font-semibold">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity}</span>}
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label font-semibold">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={product.price}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                    </div>

                    {/* New Price */}
                    <div className="form-control">
                        <label className="label font-semibold">New Price</label>
                        <input
                            type="number"
                            name="newPrice"
                            placeholder="New Price"
                            value={product.newPrice}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.newPrice && <span className="text-red-500 text-sm">{errors.newPrice}</span>}
                    </div>

                    {/* Image Upload */}
                    <div className="form-control lg:col-span-2">
                        <label className="label font-semibold">Product Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                            required
                        />
                        {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
                        {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow mt-2 mx-auto" />}
                    </div>

                    {/* Submit Button */}
                    <div className="lg:col-span-2">
                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProduct;
