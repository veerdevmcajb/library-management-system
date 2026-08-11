import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserService from "../../services/UserService";


function EditUser() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [user, setUser] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: ""

    });



    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = () => {
        UserService.getUserById(id)
           .then((response) => {
                setUser(response.data);
            })

            .catch((error) => {
                console.log(error);
            });
    };




    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };





    const updateUser = (e) => {
        e.preventDefault();

        UserService.updateUser(id, user)
            .then(() => {
                alert("User updated successfully");
                navigate("/users");
            })
            .catch((error) => {
                console.log(error);
                alert("Update failed");
            });

    };





    return (


        <div className="container mt-4">


            <div className="card">


                <div className="card-header bg-primary text-white">

                    <h3>
                        Edit User
                    </h3>

                </div>



                <div className="card-body">


                    <form onSubmit={updateUser}>


                        <div className="mb-3">

                            <label>
                                First Name
                            </label>


                            <input

                                className="form-control"

                                name="firstName"

                                value={user.firstName}

                                onChange={handleChange}

                                required

                            />


                        </div>





                        <div className="mb-3">

                            <label>
                                Last Name
                            </label>


                            <input

                                className="form-control"

                                name="lastName"

                                value={user.lastName}

                                onChange={handleChange}

                                required

                            />


                        </div>





                        <div className="mb-3">

                            <label>
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





                        <div className="mb-3">

                            <label>
                                Password
                            </label>


                            <input

                                type="password"

                                className="form-control"

                                name="password"

                                value={user.password}

                                onChange={handleChange}

                            />


                        </div>





                        <button

                            className="btn btn-success"

                            type="submit"

                        >

                            Update User

                        </button>




                        <button

                            type="button"

                            className="btn btn-secondary ms-2"

                            onClick={() => navigate("/users")}

                        >

                            Cancel

                        </button>



                    </form>


                </div>


            </div>


        </div>


    );


}


export default EditUser;