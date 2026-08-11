
import api from "../api/axoisConfig";

const USER_URL = "/users";

const UserService = {

    // ==========================================
    // GET ALL USERS
    // ADMIN ONLY
    // ==========================================

    getAllUsers() {

        return api.get(USER_URL);

    },


    // ==========================================
    // GET USER BY ID
    // ADMIN ONLY
    // ==========================================

    getUserById(id) {

        return api.get(
            `${USER_URL}/${id}`
        );

    },


    // ==========================================
    // CREATE USER
    // ADMIN ONLY
    // ==========================================

    addUser(user) {

        return api.post(
            USER_URL,
            user
        );

    },


    // ==========================================
    // UPDATE USER
    // ADMIN ONLY
    // ==========================================

    updateUser(id, user) {

        return api.put(
            `${USER_URL}/${id}`,
            user
        );

    },


    // ==========================================
    // DELETE USER
    // ADMIN ONLY
    // ==========================================

    deleteUser(id) {

        return api.delete(
            `${USER_URL}/${id}`
        );

    },


    // ==========================================
    // GET ROLES
    // ==========================================

    getRoles() {

        return api.get("/roles");

    }

};

export default UserService;

