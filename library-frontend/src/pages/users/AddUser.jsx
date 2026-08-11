import { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

function AddUser() {

    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    useEffect(() => {

        UserService.getRoles()
            .then((response) => {
                setRoles(response.data);
            });

    }, []);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const saveUser = (e) => {

    e.preventDefault();

    const userData = {

        ...user,

        roles: [
            {
                id: Number(selectedRole)
            }
        ]

    };

    UserService.addUser(userData)

        .then(() => {

            alert("User Added Successfully");

            navigate("/users");

        })

        .catch((error) => {

            console.error(error);

            alert("Unable to save user.");

        });

};

    return (

        <div className="container mt-4">

            <div className="card">

                <div className="card-header bg-dark text-white">

                    <h3>Add User</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={saveUser}>

                        <div className="mb-3">

                            <label>First Name</label>

                            <input
                                className="form-control"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Last Name</label>

                            <input
                                className="form-control"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

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

                            <label>Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Role
                            </label>

                            <select
                                className="form-select"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                required
                            >

                                <option value="">
                                    Select Role
                                </option>

                                {
                                    roles.map((role) => (

                                        <option
                                            key={role.id}
                                            value={role.id}
                                        >
                                            {role.roleName}
                                        </option>

                                    ))
                                }

                            </select>

                        </div>

                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            Save User
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

export default AddUser;