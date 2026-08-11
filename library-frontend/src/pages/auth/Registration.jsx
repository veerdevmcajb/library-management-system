import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../services/AuthService";


function Register() {

    const navigate = useNavigate();


    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const [error, setError] = useState("");


    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };


    const registerUser = async (e) => {

        e.preventDefault();

        setError("");


        if (user.password !== user.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }


        try {

            const registerData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            };


            await AuthService.register(registerData);


            alert("Registration successful! Please login.");


            navigate("/login");


        } catch (error) {

            console.error(error);

            if (error.response?.status === 409) {

                setError("Email already exists.");

            } else {

                setError("Registration failed. Please try again.");

            }

        }

    };


    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-5">


                    <div className="card shadow">


                        <div className="card-header bg-primary text-white text-center">

                            <h3 className="mb-0">
                                Create Account
                            </h3>

                        </div>


                        <div className="card-body p-4">


                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}


                            <form onSubmit={registerUser}>


                                {/* First Name */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Last Name */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Email */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Password */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        minLength="6"
                                        required
                                    />

                                </div>


                                {/* Confirm Password */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                        minLength="6"
                                        required
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Register
                                </button>


                            </form>


                            <hr />


                            <div className="text-center">

                                <p className="mb-0">

                                    Already have an account?

                                    {" "}

                                    <Link to="/login">
                                        Login
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


export default Register;