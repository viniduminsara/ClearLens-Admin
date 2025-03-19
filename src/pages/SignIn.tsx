import { useState } from "react";

const SignIn = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign In Data:", formData);
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
