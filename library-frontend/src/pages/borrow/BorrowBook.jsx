import { useEffect, useState } from "react";
import BookService from "../../services/BookService";
import BorrowService from "../../services/BorrowService";

function BorrowBook() {

    const [books, setBooks] = useState([]);

    const [bookId, setBookId] = useState("");

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        loadBooks();

    }, []);


    // Load all available books

    const loadBooks = () => {

        BookService.getAllBooks()

            .then(response => {

                setBooks(response.data);

            })

            .catch(error => {

                console.log(error);

                alert("Unable to load books.");

            });

    };


    // Borrow book

    const borrowBook = () => {

        if (!bookId) {

            alert("Please select a book");

            return;

        }


        setLoading(true);


        BorrowService.borrowBook(bookId)

            .then(() => {

                alert("Book borrowed successfully");

                setBookId("");

            })

            .catch(error => {

                console.log(error);

                alert("Borrow failed");

            })

            .finally(() => {

                setLoading(false);

            });

    };


    return (

        <div className="container mt-4">

            <div className="card">

                <div className="card-header bg-dark text-white">

                    <h3>
                        Borrow Book
                    </h3>

                </div>


                <div className="card-body">


                    <div className="mb-3">

                        <label className="form-label">
                            Select Book
                        </label>


                        <select

                            className="form-select"

                            value={bookId}

                            onChange={(e) =>
                                setBookId(e.target.value)
                            }

                        >

                            <option value="">
                                Select Book
                            </option>


                            {

                                books.map(book => (

                                    <option

                                        key={book.id}

                                        value={book.id}

                                    >

                                        {book.title}

                                    </option>

                                ))

                            }

                        </select>

                    </div>


                    <button

                        className="btn btn-success"

                        onClick={borrowBook}

                        disabled={loading}

                    >

                        {loading
                            ? "Borrowing..."
                            : "Borrow Book"
                        }

                    </button>


                </div>

            </div>

        </div>

    );

}

export default BorrowBook;

