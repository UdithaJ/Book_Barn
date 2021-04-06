import React,{useState,useEffect} from "react";
import axios from "axios";

function  AllBooks(){

    const [books, setBooks] = useState([]);
    useEffect(() => {
        const getBooks = () => {
            let result = axios.get("http://localhost:8000/api/books").then((res) => {
                setBooks(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        getBooks();

    }, [])

        console.warn(books);
    return(
        <div>
            <h1>Book List</h1>

                {
                    books.map((item) =>
                        <div className="float-left" >

                        <div className="bookWrap">
                            <div className="book">
                                <img className="cover" src={"http://localhost:8000/"+item.cover_image} width="180" height="160"/>
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