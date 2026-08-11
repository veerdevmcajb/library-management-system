import { Navigate, Outlet } from "react-router-dom";

function RoleRoute({ allowedRoles }) {

    const role =
        localStorage.getItem("role");


    if (!allowedRoles.includes(role)) {

        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    return <Outlet />;
}

export default RoleRoute;