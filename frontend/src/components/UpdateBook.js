import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import NavBar from "./NavBar";

function UpdateBook(props){

    const [book, setBook] = useState([]);
    useEffect(() => {
        const getBook = () => {
            let result = axios.get("http://localhost:8000/api/books/"+props.match.params.id).then((res) => {
                setBook(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        getBook();

    }, [])


    return(
        <div>
            <NavBar/>

            {
                book.map((item) =>

                    <div className="singleView" >
                        <div className="displayTitle">
                            <h2>{item.book_title}</h2>
                            <p>by {item.author}</p>
                        </div>
                        <div><br/><br/></div>
                        <div className="description">
                            <textarea disabled={true}  rows="4" cols="80">{item.book_description}
                            </textarea>

                            <Link to ={"books/update/"+item.book_id}>

                                <button type="button" className="btn btn-warning">Update</button>

                            </Link>

                            <Link to ={"books/delete/"+item.book_id}>

                                <button type="button" className="btn btn-danger">Delete</button>

                            </Link>

                            <Link to ={"books/return/"+item.book_id}>

                                <button type="button" className="btn btn-success">Mark as returned</button>

                            </Link>

                        </div>
                        <div className="displayBook">
                            <img src={"http://localhost:8000/"+item.cover_image} width="300" height="450"/>
                            <div>
                                <br/>
                            </div>
                            <h6>price: {item.price} /=</h6>
                        </div>


                    </div>




                )
            }

        </div>


    )


}

export default UpdateBook;