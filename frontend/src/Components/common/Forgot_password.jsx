import { useState } from "react";

function ForgotPassword() {

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: ""
    });

    return (

        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-md transition-colors duration-300">

            <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">
                Forgot Password
            </h1>

            {step === 1 && (

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                    />

                    <button
                        onClick={() => {
                            // Send OTP later
                            setStep(2);
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.99] text-white rounded-lg p-3 font-semibold transition-all duration-200 shadow-sm"
                    >
                        Send OTP
                    </button>

                </div>

            )}

            {step === 2 && (

                <div className="space-y-4">

                    <input
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                    />

                    <button
                        onClick={() => {
                            // Verify OTP later
                            setStep(3);
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.99] text-white rounded-lg p-3 font-semibold transition-all duration-200 shadow-sm"
                    >
                        Verify OTP
                    </button>

                </div>

            )}

            {step === 3 && (

                <div className="space-y-4">

                    <input
                        type="password"
                        placeholder="New Password"
                        value={passwords.password}
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                password: e.target.value
                            })
                        }
                        className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwords.confirmPassword}
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                confirmPassword: e.target.value
                            })
                        }
                        className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
                    />

                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.99] text-white rounded-lg p-3 font-semibold transition-all duration-200 shadow-sm"
                    >
                        Change Password
                    </button>

                </div>

            )}

        </div>

    );
}

export default ForgotPassword;