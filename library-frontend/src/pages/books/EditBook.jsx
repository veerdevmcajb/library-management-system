import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BookService from "../../services/BookService";


function EditBook() {


    const { id } = useParams();

    const navigate = useNavigate();



    const [book, setBook] = useState({

        title:"",
        author:"",
        price:"",
        quantity:""

    });



    useEffect(() => {


        loadBook();


    }, []);



    const loadBook = () => {


        BookService.getBookById(id)

        .then((response)=>{


            setBook(response.data);


        })

        .catch((error)=>{


            console.log(error);


        });


    };





    const handleChange = (event)=>{


        setBook({

            ...book,

            [event.target.name]: event.target.value

        });


    };






    const updateBook = (event)=>{


        event.preventDefault();


        BookService.updateBook(id, book)

        .then(()=>{


            alert("Book updated successfully");


            navigate("/books");


        })

        .catch((error)=>{


            console.log(error);


            alert("Update failed");


        });



    };





    return (


        <div className="container mt-4">


            <div className="card">


                <div className="card-header bg-primary text-white">

                    <h3>
                        Edit Book
                    </h3>

                </div>



                <div className="card-body">


                    <form onSubmit={updateBook}>


                        <div className="mb-3">


                            <label>
                                Title
                            </label>


                            <input

                                className="form-control"

                                type="text"

                                name="title"

                                value={book.title}

                                onChange={handleChange}

                            />


                        </div>




                        <div className="mb-3">


                            <label>
                                Author
                            </label>


                            <input

                                className="form-control"

                                type="text"

                                name="author"

                                value={book.author}

                                onChange={handleChange}

                            />


                        </div>





                        <div className="mb-3">


                            <label>
                                Price
                            </label>


                            <input

                                className="form-control"

                                type="number"

                                name="price"

                                value={book.price}

                                onChange={handleChange}

                            />


                        </div>





                        <div className="mb-3">


                            <label>
                                Quantity
                            </label>


                            <input

                                className="form-control"

                                type="number"

                                name="quantity"

                                value={book.quantity}

                                onChange={handleChange}

                            />


                        </div>





                        <button

                            className="btn btn-success"

                            type="submit"

                        >

                            Update Book

                        </button>



                        <button

                            type="button"

                            className="btn btn-secondary ms-2"

                            onClick={()=>navigate("/books")}

                        >

                            Cancel

                        </button>



                    </form>


                </div>


            </div>


        </div>


    );


}


export default EditBook;