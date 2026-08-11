import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../services/AuthService";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });

    };


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response =
                await AuthService.login(loginData);

            const data = response.data;


            // Save authentication data

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "email",
                data.email
            );

            localStorage.setItem(
                "role",
                data.role
            );


            alert("Login successful!");


            // Go to dashboard

            navigate("/");


        } catch (error) {

            console.error(error);

            if (
                error.response &&
                error.response.status === 401
            ) {

                setError(
                    "Invalid email or password."
                );

            } else {

                setError(
                    "Unable to login. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }

    };


    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-4">

                    <div className="card shadow">

                        <div className="card-header bg-dark text-white text-center">

                            <h3 className="mb-0">
                                Library Login
                            </h3>

                        </div>


                        <div className="card-body p-4">

                            {error && (

                                <div className="alert alert-danger">
                                    {error}
                                </div>

                            )}


                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Logging in..."
                                        : "Login"
                                    }

                                </button>

                            </form>


                            <hr />


                            <div className="text-center">

                                <p className="mb-0">

                                    Don't have an account?

                                    {" "}

                                    <Link to="/register">
                                        Register
                                    </Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;

