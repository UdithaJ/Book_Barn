import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useHistory, withRouter} from "react-router-dom";
import NavBar from "./NavBar";

function Book(props){
    const  history = useHistory();

    const [book, setBook] = useState([]);
    const [status, setStatus] = useState([]);


    useEffect(() => {
        const getBook = () => {
            let result = axios.get("http://localhost:8000/api/books/"+props.match.params.id).then((res) => {
                setBook(res.data);
                setStatus(res.data[0].status);
                console.log(res.data[0].status);


            }).catch((err) => {
                console.log(err);
            })
        }
        getBook();

    }, [])

    const id = props.match.params.id;
    const uid = (localStorage.getItem('user-id'));

    const isDisabled = () =>{

        return status == "borrowed";

    }


        function borrowBook(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("id",id);
        formData.append("uid",uid);

        console.log(id);
        console.log(uid);

        axios.post("http://localhost:8000/api/borrow",formData).then((res) => {
            console.log(res.data.status);
            if(res.data.status === "success") {
                history.push("/mybooks");
            }

            else if(res.data.status=== "exceeded"){

                alert("You have borrowed maximum number of books allowed!")
            }

            else if(res.data.status=== "unknown"){

                alert("You are not logged In!")
                history.push("/login");
            }
            else {
                alert("Something went wrong");
            }
        }).catch((err) => {
            alert(err);
        })


    }





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

                           <form onSubmit={borrowBook}>
                               <button id="BtnBorrow" disabled={isDisabled()} type="submit" className="btn btn-primary">Borrow</button>
                           </form>
                        </div>
                        <div className="displayBook">
                        <img src={"http://localhost:8000/"+item.cover_image} width="300" height="450"/>
                        <div>
                           <br/>
                        </div>
                        <h6>price: {item.price} /=</h6>
                            <input type="text" id="status" value={item.status}/>

                        </div>


                    </div>


                )
            }


        </div>


    )


}

export default Book;