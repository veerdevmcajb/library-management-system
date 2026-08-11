
import api from "../api/axoisConfig";

const BorrowService = {

    // ==========================================
    // USER - BORROW BOOK
    // ==========================================

    borrowBook(bookId) {

        return api.post(
            `/borrow/${bookId}`
        );

    },


    // ==========================================
    // USER - MY BORROW HISTORY
    // ==========================================

    getMyHistory() {

        return api.get(
            "/borrow/my-history"
        );

    },


    // ==========================================
    // ADMIN - GET SPECIFIC USER HISTORY
    // ==========================================

    getUserHistory(userId) {

        return api.get(
            `/borrow/user/${userId}`
        );

    },


    // ==========================================
    // USER - RETURN OWN BOOK
    // ==========================================

    returnBook(borrowId) {

        return api.put(
            `/borrow/return/${borrowId}`
        );

    },

    // Admin
    getAllBorrowRecords() {
        return api.get("/borrow/admin/all");
    }
    ,

     getBorrowHistory(userId) {
        return api.get(`/borrow/${userId}`);
    }

};

export default BorrowService;

