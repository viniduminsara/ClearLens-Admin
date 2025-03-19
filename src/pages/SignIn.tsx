import { useState } from "react";
import {signinService} from "../services/apiServices.ts";
import {TokenResponse} from "../interfaces/api.ts";
import {useNavigate} from "react-router-dom";
import {useToast} from "../context/ToastContext.tsx";

const SignIn = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const {showToast} = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.username && formData.password) {
            const obj = {
                username: formData.username,
                password: formData.password,
            }

            const res = await signinService(obj);
            if (res.success){
                localStorage.setItem('accessToken', (res.body as TokenResponse).token)
                navigate('/');
            } else {
                showToast({ type: "error", message: res.message as string });
            }
        } else {
            showToast({ type: 'error', message: 'Please enter valid data.' });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
            <div className="w-full max-w-4xl flex bg-base-100 shadow-xl rounded-xl overflow-hidden">
                {/* Left Side - Image */}
                <div className="hidden md:flex w-1/2 bg-cover bg-center" >
                    <div className='w-full h-full flex justify-center items-center'>
                        <img src="/logo.png" alt="Shop Logo" className="w-48 h-20"/>
                    </div>
                </div>

                {/* Right Side - Sign In Form */}
                <div className="w-full md:w-1/2 p-8">

                    <h2 className="text-2xl font-bold text-center">Sign In</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full mt-6">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
