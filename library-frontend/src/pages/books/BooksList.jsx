import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookService from "../../services/BookService";

function BooksList() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        BookService.getAllBooks()
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const deleteBook = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        BookService.deleteBook(id)
            .then(() => {
                alert("Book deleted successfully.");
                loadBooks();
            })
            .catch((error) => {
                console.error(error);
                alert("Unable to delete book.");
            });
    };

    if (loading) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>Books</h2>

                <Link
                    to="/books/add"
                    className="btn btn-success"
                >
                    Add Book
                </Link>

            </div>

            <table className="table table-bordered table-striped">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th width="180">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        books.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="6" className="text-center">

                                        No Books Found

                                    </td>

                                </tr>

                            )

                            :

                            books.map((book) => (

                                <tr key={book.id}>

                                    <td>{book.id}</td>

                                    <td>{book.title}</td>

                                    <td>{book.author}</td>

                                    <td>{book.price}</td>

                                    <td>{book.quantity}</td>

                                    <td>

                                        <Link
                                            to={`/books/edit/${book.id}`}
                                            className="btn btn-primary btn-sm me-2"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteBook(book.id)}
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

export default BooksList;