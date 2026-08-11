import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookService from "../../services/BookService";


function AddBook() {


    const navigate = useNavigate();


    const [book, setBook] = useState({

        title:"",
        author:"",
        price:"",
        quantity:""

    });



    const handleChange = (event) => {


        const value = event.target.value;


        setBook({

            ...book,

            [event.target.name]: value

        });


    };



    const saveBook = (event) => {


        event.preventDefault();


        BookService.addBook(book)

        .then(() => {


            alert("Book added successfully");


            navigate("/books");


        })

        .catch((error)=>{


            console.log(error);


            alert("Something went wrong");


        });


    };



    return (

        <div className="container mt-4">


            <div className="card">


                <div className="card-header bg-dark text-white">

                    <h3>Add New Book</h3>

                </div>



                <div className="card-body">


                    <form onSubmit={saveBook}>


                        <div className="mb-3">


                            <label className="form-label">
                                Title
                            </label>


                            <input

                                type="text"

                                className="form-control"

                                name="title"

                                value={book.title}

                                onChange={handleChange}

                                required

                            />


                        </div>




                        <div className="mb-3">


                            <label className="form-label">
                                Author
                            </label>


                            <input

                                type="text"

                                className="form-control"

                                name="author"

                                value={book.author}

                                onChange={handleChange}

                                required

                            />


                        </div>




                        <div className="mb-3">


                            <label className="form-label">
                                Price
                            </label>


                            <input

                                type="number"

                                className="form-control"

                                name="price"

                                value={book.price}

                                onChange={handleChange}

                                required

                            />


                        </div>





                        <div className="mb-3">


                            <label className="form-label">
                                Quantity
                            </label>


                            <input

                                type="number"

                                className="form-control"

                                name="quantity"

                                value={book.quantity}

                                onChange={handleChange}

                                required

                            />


                        </div>




                        <button

                            type="submit"

                            className="btn btn-success"

                        >

                            Save Book

                        </button>



                        <button

                            type="button"

                            className="btn btn-secondary ms-2"

                            onClick={() => navigate("/books")}

                        >

                            Cancel

                        </button>



                    </form>


                </div>


            </div>


        </div>

    );


}


export default AddBook;