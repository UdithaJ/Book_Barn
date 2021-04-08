import React,{useState,useEffect} from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";


function  AllBooks(){



    const [books, setBooks] = useState([]);
    useEffect(() => {
        const getBooks = () => {
            let result = axios.get("http://localhost:8000/api/books").then((res) => {
                setBooks(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        getBooks();

    }, [])

        console.warn(books);


    return(
        <div>
            <NavBar/>
            <h1>Book Rack</h1>



                {
                    books.map((item) =>
                        <div className="float-left" >
                        <div className="bookWrap">
                            <div className="book">
                                <Link to ={"books/"+item.book_id}>
                                <img className="cover" src={"http://localhost:8000/"+item.cover_image} width="180" height="160"
                               /></Link>
                                <div className="spine"></div>
                            </div>
                        </div>
                            <div className="title">
                                <h6>{item.book_title} </h6>
                                <p>by {item.author}</p>
                            </div>
                        </div>

                    )
                }

        </div>

    )

}

export default AllBooks;