import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/UserService";


function UsersList() {


    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadUsers();

    }, []);



    const loadUsers = () => {


        UserService.getAllUsers()

            .then((response) => {


                setUsers(response.data);

                setLoading(false);


            })

            .catch((error) => {


                console.log(error);

                setLoading(false);


            });


    };




    const deleteUser = (id) => {


        let confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );



        if (!confirmDelete)
            return;



        UserService.deleteUser(id)

            .then(() => {


                alert("User deleted successfully");

                loadUsers();


            })

            .catch((error) => {


                console.log(error);


            });


    };




    if (loading) {

        return <h3>Loading...</h3>;

    }




    return (

        <div className="container mt-4">


            <div className="d-flex justify-content-between mb-3">


                <h2>
                    Users
                </h2>


                <Link
                    to="/users/add"
                    className="btn btn-success"
                >

                    Add User

                </Link>


            </div>




            <table className="table table-bordered table-striped">


                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>First Name</th>

                        <th>Last Name</th>

                        <th>Email</th>

                        <th>Actions</th>

                    </tr>

                </thead>




                <tbody>


                    {

                        users.length === 0 ?


                            <tr>

                                <td colSpan="5"
                                    className="text-center">

                                    No Users Found

                                </td>

                            </tr>


                            :


                            users.map((user) => (


                                <tr key={user.id}>


                                    <td>
                                        {user.id}
                                    </td>


                                    <td>
                                        {user.firstName}
                                    </td>


                                    <td>
                                        {user.lastName}
                                    </td>


                                    <td>
                                        {user.email}
                                    </td>



                                    <td>


                                        <Link

                                            to={`/users/edit/${user.id}`}

                                            className="btn btn-primary btn-sm me-2"

                                        >

                                            Edit

                                        </Link>



                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() => deleteUser(user.id)}

                                        >

                                            Delete

                                        </button>


                                    </td>



                                </tr>


                            ))


                    }



                </tbody>


            </table>


        </div>


    );


}


export default UsersList;