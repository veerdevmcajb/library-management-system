
import { useEffect, useState } from "react";

import UserService from "../../services/UserService";
import BorrowService from "../../services/BorrowService";

function AdminBorrowHistory() {

    const [users, setUsers] = useState([]);

    const [borrowRecords, setBorrowRecords] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");

    const [loading, setLoading] = useState(false);


    // ==========================================
    // LOAD USERS
    // ==========================================

    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers = () => {

        UserService.getAllUsers()

            .then((response) => {

                setUsers(response.data);

            })

            .catch((error) => {

                console.error(
                    "Error loading users:",
                    error
                );

            });

    };


    // ==========================================
    // LOAD SELECTED USER HISTORY
    // ==========================================

    const loadBorrowHistory = (userId) => {

        if (!userId) {

            setBorrowRecords([]);

            return;

        }


        setLoading(true);


        BorrowService.getBorrowHistoryByUser(userId)

            .then((response) => {

                setBorrowRecords(response.data);

            })

            .catch((error) => {

                console.error(
                    "Error loading borrow history:",
                    error
                );

                setBorrowRecords([]);

            })

            .finally(() => {

                setLoading(false);

            });

    };


    // ==========================================
    // USER CHANGE
    // ==========================================

    const handleUserChange = (e) => {

        const userId = e.target.value;

        setSelectedUser(userId);

        loadBorrowHistory(userId);

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


        /*
         * IMPORTANT:
         *
         * Your current return endpoint checks
         * the logged-in user.
         *
         * Therefore an ADMIN cannot return
         * another user's book using that endpoint.
         *
         * For now we only display the history here.
         */

        alert(
            "Admin return operation needs a separate admin endpoint."
        );

    };


    return (

        <div className="container mt-4">

            <div className="card">


                {/* HEADER */}

                <div className="card-header bg-dark text-white">

                    <h3 className="mb-0">

                        User Borrow History

                    </h3>

                </div>


                <div className="card-body">


                    {/* USER SELECT */}

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


                    {/* LOADING */}

                    {loading && (

                        <div className="text-center">

                            <p>
                                Loading borrow history...
                            </p>

                        </div>

                    )}


                    {/* TABLE */}

                    {!loading &&
                        selectedUser &&
                        (

                            borrowRecords.length === 0 ? (

                                <div className="alert alert-info">

                                    This user has no borrow
                                    history.

                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table table-bordered table-striped">

                                        <thead className="table-dark">

                                            <tr>

                                                <th>
                                                    ID
                                                </th>

                                                <th>
                                                    User
                                                </th>

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

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {borrowRecords.map(
                                                (record) => (

                                                    <tr
                                                        key={record.id}
                                                    >

                                                        <td>
                                                            {record.id}
                                                        </td>


                                                        <td>

                                                            {record.user?.firstName}{" "}

                                                            {record.user?.lastName}

                                                        </td>


                                                        <td>

                                                            {record.book?.title || "-"}

                                                        </td>


                                                        <td>

                                                            {record.issueDate || "-"}

                                                        </td>


                                                        <td>

                                                            {record.returnDate || "-"}

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

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )

                        )}

                </div>

            </div>

        </div>

    );

}

export default AdminBorrowHistory;

