import React,{useState,useEffect} from "react";
import axios from "axios"
import NavBar from "./NavBar";
import {useHistory} from "react-router-dom";


function  MyBooks(){

    const  history = useHistory();

    const id = (localStorage.getItem('user-id'));

    if(id == null){

        history.push("/login");

    }


    const [books, setBooks] = useState([]);
    useEffect(() => {
        const getBooks = () => {
            axios.get("http://localhost:8000/api/books/mybooks/"+id).then((res) => {
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
            <NavBar/>
            <h1>My books</h1>



                {
                    books.map((item) =>
                        <div className="float-left" >
                            <div className="borrowedDate">
                                <p>borrowed {item.borrowed_date}</p>
                            </div>
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

export default MyBooks;