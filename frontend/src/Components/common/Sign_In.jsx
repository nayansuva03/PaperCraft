import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const handleOnLogin = () => navigate("/LogIn");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // MongoDB request later

        console.log(formData);
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-md transition-colors duration-300">

            <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">
                Sign In
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Set Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.99] text-white rounded-lg p-3 font-semibold transition-all duration-200 shadow-sm"
                >
                    Create Account
                </button>

                <div className="text-center pt-2">
                    <button
                        type="button"
                        onClick={handleOnLogin}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors font-medium"
                    >
                        Already have an account? Log in
                    </button>
                </div>

            </form>

        </div>
    );
}

export default SignIn;