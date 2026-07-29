import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Login request later

        console.log(formData);
    }

    function handleForgotPassword(){
        navigate("/forgot-password");
    }

    return (

        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-6">
                Log In
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

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
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <button
                    className="w-full bg-indigo-600 text-white rounded-lg p-3"
                >
                    Log In
                </button>
                <button onClick={handleForgotPassword}>Forgot password</button>

            </form>

        </div>

    );
}

export default Login;