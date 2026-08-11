import api from "../api/axoisConfig";


const AUTH_URL = "/auth";

const AuthService = {

    register(user) {

        return api.post(
            `${AUTH_URL}/register`,
            user
        );
    },


    login(loginData) {

        return api.post(
            `${AUTH_URL}/login`,
            loginData
        );
    },


    logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
    },


    getToken() {

        return localStorage.getItem("token");
    },


    getEmail() {

        return localStorage.getItem("email");
    },


    getRole() {

        return localStorage.getItem("role");
    },


    isLoggedIn() {

        return !!localStorage.getItem("token");
    }

};

export default AuthService;