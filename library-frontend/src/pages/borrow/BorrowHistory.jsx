
import { useEffect, useState } from "react";

import BorrowService from "../../services/BorrowService";
import UserService from "../../services/UserService";
import { isAdmin } from "../../utils/auth";

function BorrowHistory() {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");

    const [borrowRecords, setBorrowRecords] = useState([]);

    const [loading, setLoading] = useState(true);


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        if (isAdmin()) {

            loadUsers();

        } else {

            loadMyHistory();

        }

    }, []);


    // ==========================================
    // ADMIN - LOAD USERS
    // ==========================================

    const loadUsers = () => {

        setLoading(true);

        UserService.getAllUsers()

            .then((response) => {

                setUsers(response.data);

            })

            .catch((error) => {

                console.error(
                    "Error loading users:",
                    error
                );

            })

            .finally(() => {

                setLoading(false);

            });

    };


    // ==========================================
    // NORMAL USER - MY HISTORY
    // ==========================================

    const loadMyHistory = () => {

        setLoading(true);

        BorrowService.getMyHistory()

            .then((response) => {

                setBorrowRecords(
                    response.data
                );

            })

            .catch((error) => {

                console.error(
                    "Error loading my history:",
                    error
                );

                setBorrowRecords([]);

            })

            .finally(() => {

                setLoading(false);

            });

    };


    // ==========================================
    // ADMIN - SELECT USER
    // ==========================================

    const handleUserChange = (e) => {

        const userId = e.target.value;

        setSelectedUser(userId);

        if (!userId) {

            setBorrowRecords([]);

            return;

        }

        loadUserHistory(userId);

    };


    // ==========================================
    // ADMIN - USER HISTORY
    // ==========================================

    const loadUserHistory = (userId) => {

        setLoading(true);

        BorrowService.getUserHistory(userId)

            .then((response) => {

                setBorrowRecords(
                    response.data
                );

            })

            .catch((error) => {

                console.error(
                    "Error loading user history:",
                    error
                );

                setBorrowRecords([]);

            })

            .finally(() => {

                setLoading(false);

            });

    };


    // ==========================================
    // RETURN BOOK
    // ==========================================

    const returnBook = (borrowId) => {

        const confirmReturn =
            window.confirm(
                "Are you sure you want to return this book?"
            );

        if (!confirmReturn) {

            return;

        }


        BorrowService.returnBook(borrowId)

            .then(() => {

                alert(
                    "Book returned successfully"
                );

                if (isAdmin()) {

                    loadUserHistory(
                        selectedUser
                    );

                } else {

                    loadMyHistory();

                }

            })

            .catch((error) => {

                console.error(
                    "Error returning book:",
                    error
                );

                alert(
                    error.response?.data ||
                    "Unable to return book"
                );

            });

    };


    return (

        <div className="container mt-4">

            <div className="card">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="card-header bg-dark text-white">

                    <h3 className="mb-0">

                        {isAdmin()
                            ? "Borrow History"
                            : "My Borrow History"
                        }

                    </h3>

                </div>


                <div className="card-body">


                    {/* =================================
                        ADMIN USER SELECT
                    ================================= */}

                    {isAdmin() && (

                        <div className="mb-4">

                            <label className="form-label">

                                Select User

                            </label>


                            <select
                                className="form-select"
                                value={selectedUser}
                                onChange={handleUserChange}
                            >

                                <option value="">

                                    Select User

                                </option>


                                {users.map((user) => (

                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >

                                        {user.firstName}{" "}
                                        {user.lastName}
                                        {" - "}
                                        {user.email}

                                    </option>

                                ))}

                            </select>

                        </div>

                    )}


                    {/* =================================
                        LOADING
                    ================================= */}

                    {loading ? (

                        <div className="text-center">

                            <p>
                                Loading borrow history...
                            </p>

                        </div>

                    ) : (

                        <>
                            {/* =================================
                                ADMIN HAS NOT SELECTED USER
                            ================================= */}

                            {isAdmin() &&
                                !selectedUser && (

                                <div className="alert alert-info">

                                    Please select a user
                                    to view their borrow history.

                                </div>

                            )}


                            {/* =================================
                                TABLE
                            ================================= */}

                            {borrowRecords.length > 0 && (

                                <div className="table-responsive">

                                    <table className="table table-bordered table-striped">

                                        <thead className="table-dark">

                                            <tr>

                                                <th>
                                                    ID
                                                </th>


                                                {isAdmin() && (

                                                    <th>
                                                        User
                                                    </th>

                                                )}


                                                <th>
                                                    Book
                                                </th>


                                                <th>
                                                    Issue Date
                                                </th>


                                                <th>
                                                    Return Date
                                                </th>


                                                <th>
                                                    Status
                                                </th>


                                                <th>
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {borrowRecords.map(
                                                (record) => (

                                                    <tr
                                                        key={
                                                            record.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                record.id
                                                            }
                                                        </td>


                                                        {isAdmin() && (

                                                            <td>

                                                                {
                                                                    record.user?.firstName
                                                                }{" "}

                                                                {
                                                                    record.user?.lastName
                                                                }

                                                                <br />

                                                                <small className="text-muted">

                                                                    {
                                                                        record.user?.email
                                                                    }

                                                                </small>

                                                            </td>

                                                        )}


                                                        <td>

                                                            {
                                                                record.book?.title
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                record.issueDate
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                record.returnDate
                                                                    || "-"
                                                            }

                                                        </td>


                                                        <td>

                                                            {record.returned ? (

                                                                <span className="badge bg-success">

                                                                    Returned

                                                                </span>

                                                            ) : (

                                                                <span className="badge bg-warning text-dark">

                                                                    Borrowed

                                                                </span>

                                                            )}

                                                        </td>


                                                        <td>

                                                            {!record.returned && (

                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() =>
                                                                        returnBook(
                                                                            record.id
                                                                        )
                                                                    }
                                                                >

                                                                    Return Book

                                                                </button>

                                                            )}

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}


                            {/* =================================
                                NO RECORDS
                            ================================= */}

                            {(
                                !isAdmin() ||
                                selectedUser
                            ) &&
                            borrowRecords.length === 0 && (

                                <div className="alert alert-info">

                                    No borrow records found.

                                </div>

                            )}

                        </>

                    )}

                </div>

            </div>

        </div>

    );
}

export default BorrowHistory;

