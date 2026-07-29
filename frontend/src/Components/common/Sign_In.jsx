import { useState } from "react";

function SignIn() {

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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-6">
                Sign In
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Set Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <button
                    className="w-full bg-indigo-600 text-white rounded-lg p-3"
                >
                    Create Account
                </button>

            </form>

        </div>
    );
}

export default SignIn;