import api from "../api/axoisConfig";

const BOOK_URL = "/books";

const BookService = {

    getAllBooks() {

        return api.get(BOOK_URL);

    },

    getBookById(id) {

        return api.get(`${BOOK_URL}/${id}`);

    },

    addBook(book) {

        return api.post(BOOK_URL, book);

    },

    updateBook(id, book) {

        return api.put(
            `${BOOK_URL}/${id}`,
            book
        );

    },

    deleteBook(id) {

        return api.delete(
            `${BOOK_URL}/${id}`
        );

    }

};

export default BookService;