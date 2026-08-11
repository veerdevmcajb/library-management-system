import { useNavigate } from "react-router-dom";

import { logout } from "../utils/auth";



function Navbar() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">

                <span
                    className="navbar-brand"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    📚 Library Management
                </span>


                <div className="navbar-nav me-auto">

                    <button
                        className="nav-link btn btn-link text-white"
                        onClick={() => navigate("/")}
                    >
                        Dashboard
                    </button>


                    <button
                        className="nav-link btn btn-link text-white"
                        onClick={() => navigate("/books")}
                    >
                        Books
                    </button>


                    {role === "ROLE_ADMIN" && (

                        <button
                            className="nav-link btn btn-link text-white"
                            onClick={() => navigate("/users")}
                        >
                            Users
                        </button>

                    )}


                    <button
                        className="nav-link btn btn-link text-white"
                        onClick={() => navigate("/borrow")}
                    >
                        Borrow Book
                    </button>


                    <button
                        className="nav-link btn btn-link text-white"
                        onClick={() => navigate("/history")}
                    >
                        My History
                    </button>

                </div>


                <div className="d-flex align-items-center">

                    <span className="text-white me-3">

                        {email}

                        {" "}

                        <span className="badge bg-primary">
                            {role}
                        </span>

                    </span>


                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}


export default Navbar;