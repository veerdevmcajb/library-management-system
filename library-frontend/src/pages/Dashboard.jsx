import { useEffect, useState } from "react";

import BookService from "../services/BookService";
import BorrowService from "../services/BorrowService";
import UserService from "../services/UserService";
import { isAdmin } from "../utils/auth";

function Dashboard() {

    const [totalBooks, setTotalBooks] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [borrowedBooks, setBorrowedBooks] = useState(0);
    const [returnedBooks, setReturnedBooks] = useState(0);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadDashboardData();

    }, []);


    // ==========================================
    // LOAD DASHBOARD DATA
    // ==========================================

    const loadDashboardData = async () => {

        try {

            setLoading(true);


            // ==========================================
            // TOTAL BOOKS
            // ADMIN + USER
            // ==========================================

            const booksResponse =
                await BookService.getAllBooks();

            setTotalBooks(
                booksResponse.data.length
            );


            // ==========================================
            // ADMIN DASHBOARD
            // ==========================================

            if (isAdmin()) {

                // ------------------------------------------
                // TOTAL USERS
                // ------------------------------------------

                const usersResponse =
                    await UserService.getAllUsers();

                setTotalUsers(
                    usersResponse.data.length
                );


                // ------------------------------------------
                // ALL BORROW RECORDS
                // ------------------------------------------

                const borrowResponse =
                    await BorrowService.getAllBorrowRecords();

                const records =
                    borrowResponse.data || [];


                console.log(
                    "ADMIN ALL BORROW RECORDS:",
                    records
                );


                // ------------------------------------------
                // CURRENTLY BORROWED
                // ------------------------------------------

                const borrowedCount =
                    records.filter(
                        record =>
                            record.returned === false
                    ).length;


                // ------------------------------------------
                // RETURNED
                // ------------------------------------------

                const returnedCount =
                    records.filter(
                        record =>
                            record.returned === true
                    ).length;


                console.log(
                    "ADMIN BORROWED COUNT:",
                    borrowedCount
                );

                console.log(
                    "ADMIN RETURNED COUNT:",
                    returnedCount
                );


                setBorrowedBooks(
                    borrowedCount
                );

                setReturnedBooks(
                    returnedCount
                );

            }


            // ==========================================
            // NORMAL USER DASHBOARD
            // ==========================================

            else {

                const response =
                    await BorrowService.getMyHistory();


                const records =
                    response.data || [];


                console.log(
                    "MY BORROW HISTORY:",
                    records
                );


                // ------------------------------------------
                // MY CURRENTLY BORROWED BOOKS
                // ------------------------------------------

                const borrowedCount =
                    records.filter(
                        record =>
                            record.returned === false
                    ).length;


                // ------------------------------------------
                // MY RETURNED BOOKS
                // ------------------------------------------

                const returnedCount =
                    records.filter(
                        record =>
                            record.returned === true
                    ).length;


                console.log(
                    "MY BORROWED COUNT:",
                    borrowedCount
                );

                console.log(
                    "MY RETURNED COUNT:",
                    returnedCount
                );


                setBorrowedBooks(
                    borrowedCount
                );

                setReturnedBooks(
                    returnedCount
                );

            }


        } catch (error) {

            console.error(
                "Error loading dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="container-fluid mt-4">


            {/* ==========================================
                DASHBOARD TITLE
            ========================================== */}

            <h2 className="mb-4">
                Dashboard
            </h2>


            {/* ==========================================
                DASHBOARD CARDS
            ========================================== */}

            <div className="row g-4">


                {/* ======================================
                    TOTAL BOOKS
                ====================================== */}

                <div className="col-md-6 col-lg-3">

                    <div className="card text-white bg-primary shadow">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6>
                                        Total Books
                                    </h6>

                                    <h2>

                                        {loading
                                            ? "..."
                                            : totalBooks
                                        }

                                    </h2>

                                </div>


                                <div
                                    style={{
                                        fontSize: "40px"
                                    }}
                                >
                                    📚
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    TOTAL USERS
                    ADMIN ONLY
                ====================================== */}

                {isAdmin() && (

                    <div className="col-md-6 col-lg-3">

                        <div className="card text-white bg-success shadow">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <h6>
                                            Total Users
                                        </h6>

                                        <h2>

                                            {loading
                                                ? "..."
                                                : totalUsers
                                            }

                                        </h2>

                                    </div>


                                    <div
                                        style={{
                                            fontSize: "40px"
                                        }}
                                    >
                                        👥
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                )}


                {/* ======================================
                    BORROWED BOOKS
                ====================================== */}

                <div className="col-md-6 col-lg-3">

                    <div className="card text-dark bg-warning shadow">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6>

                                        {isAdmin()
                                            ? "Borrowed Books"
                                            : "My Borrowed Books"
                                        }

                                    </h6>


                                    <h2>

                                        {loading
                                            ? "..."
                                            : borrowedBooks
                                        }

                                    </h2>

                                </div>


                                <div
                                    style={{
                                        fontSize: "40px"
                                    }}
                                >
                                    📖
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    RETURNED BOOKS
                ====================================== */}

                <div className="col-md-6 col-lg-3">

                    <div className="card text-white bg-danger shadow">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6>

                                        {isAdmin()
                                            ? "Returned Books"
                                            : "My Returned Books"
                                        }

                                    </h6>


                                    <h2>

                                        {loading
                                            ? "..."
                                            : returnedBooks
                                        }

                                    </h2>

                                </div>


                                <div
                                    style={{
                                        fontSize: "40px"
                                    }}
                                >
                                    ↩️
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


            </div>


            {/* ==========================================
                WELCOME SECTION
            ========================================== */}

            <div className="card mt-5">

                <div className="card-body">

                    <h4>
                        Welcome to Library Management System 📚
                    </h4>


                    <p className="text-muted mb-0">

                        {isAdmin()

                            ? "Manage books, users, borrowing and returning records from one place."

                            : "Browse books, borrow books and manage your borrowing history."

                        }

                    </p>

                </div>

            </div>


        </div>

    );

}

export default Dashboard;

