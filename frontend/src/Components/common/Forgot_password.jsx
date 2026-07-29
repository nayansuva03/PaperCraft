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

        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-6">
                Forgot Password
            </h1>

            {step === 1 && (

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        onClick={() => {
                            // Send OTP later
                            setStep(2);
                        }}
                        className="w-full bg-indigo-600 text-white rounded-lg p-3"
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
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        onClick={() => {
                            // Verify OTP later
                            setStep(3);
                        }}
                        className="w-full bg-indigo-600 text-white rounded-lg p-3"
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
                        className="w-full border rounded-lg p-3"
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
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        className="w-full bg-indigo-600 text-white rounded-lg p-3"
                    >
                        Change Password
                    </button>

                </div>

            )}

        </div>

    );
}

export default ForgotPassword;