
export const getRole = () => {

    return localStorage.getItem("role");

};


export const isAdmin = () => {

    return getRole() === "ROLE_ADMIN";

};


export const isUser = () => {

    return getRole() === "ROLE_USER";

};


export const isLoggedIn = () => {

    const token = localStorage.getItem("token");

    return token !== null && token !== "";

};


export const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("email");

    localStorage.removeItem("role");

};

