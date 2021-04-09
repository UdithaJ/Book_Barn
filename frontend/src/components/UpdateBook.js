import React,{useState,useEffect} from "react";
import axios from "axios";
import NavBar from "./NavBar";
import {Link, useHistory} from "react-router-dom";
import AdminNavBar from "./AdminNavBar";


function UpdateBook(props){

    const  history = useHistory();

    const [book, setBook] = useState([]);
    useEffect(() => {
        const getBook = () => {
            let result = axios.get("http://localhost:8000/api/books/"+props.match.params.id).then((res) => {
                setBook(res.data);
                setTitle(res.data[0].book_title)
                setDescription(res.data[0].book_description)
                setAuthor(res.data[0].author)
                setGenre(res.data[0].genre)
                setPrice(res.data[0].price)
                setStatus(res.data[0].status)

            }).catch((err) => {
                console.log(err);
            })
        }
        getBook();

    }, [])

    const id = props.match.params.id;

    const [book_title, setTitle] = useState("");
    const [book_description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [cover_image, setCover] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");

    function update(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("book_title",book_title);
        formData.append("book_description",book_description);
        formData.append("author",author);
        formData.append("genre",genre);
        formData.append("cover_image",cover_image);
        formData.append("price",price);


        axios.post("http://localhost:8000/api/books/update/"+id,formData).then((res) => {
            if(res.data.status === "success") {
                alert("Book updated")
                history.push("/borrowedbooks");
            }

            else{

                alert("Something went Wrong!")
            }
        }).catch((err) => {
            alert(err);
        })


    }

    function Delete(e) {

        axios.delete("http://localhost:8000/api/books/delete/"+id).then((res) => {

            if(res.data.status === "success") {
                history.push("/borrowedbooks");
            }

            else{

                alert("Something went Wrong!")
            }
        }).catch((err) => {
            alert(err);
        })
    }

    function Return(e) {

        axios.put("http://localhost:8000/api/books/return/"+id).then((res) => {
            if(res.data.status === "success"){
            alert("Book Returned");
            history.push("/borrowedbooks")
                }
            else {
                alert("Something went Wrong!")
            }
        }).catch((err) => {
            alert(err);
        })
    }

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    const isDisabled = () =>{

        return status == "available"; //simplified if else

    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        setCover(e.target.files[0])
    }

    return(

        <div>

            <AdminNavBar/>

            {
                book.map((item) =>

                    <div className="col-sm-6 offset-sm-5">

                        <div className="bookForm">

                        <form onSubmit={update}>

                            <div className="oldCover">
                                <div className="book">
                                    <Link to ={"books/"+item.book_id}>
                                        <img className="cover" src={"http://localhost:8000/"+item.cover_image} width="300" height="430"/>
                                    </Link>
                                </div>

                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Title</label>
                                <input type="text" className="form-control" defaultValue={item.book_title} placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <input type="text" className="form-control" defaultValue={item.book_description} placeholder="Description" onChange={(e) =>{setDescription(e.target.value)}}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Author</label>
                                <input type="text" className="form-control" defaultValue={item.author} placeholder="Author" onChange={(e) => {setAuthor(e.target.value)}}/>
                            </div>

                            <div> <br/></div>
                            
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Genre</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01" onChange={(e) => {setGenre(e.target.value)}}>
                                    <option selected>Choose...</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Children's">Children's</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Novel">Novel</option>
                                    <option value="Translations">Translations</option>
                                </select>
                            </div>

                            <div className="fileInput">
                                <input type="file" className="form-control" name="cover" placeholder="Cover Image" onChange={onSelectFile}/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Price</label>
                                <input type="text" className="form-control" defaultValue={item.price} placeholder="Price" onChange={(e) => {setPrice(e.target.value)}}/>
                            </div>


                            <button type="submit" style={{marginRight:"15px"}} className="btn btn-warning">Update</button>

                            <button type="button" style={{marginRight:"15px"}}  onClick={Delete} className="btn btn-danger">Delete</button>

                            <button type="button" style={{marginRight:"15px"}} disabled={isDisabled()} onClick={Return} className="btn btn-primary">Mark as Returned</button>


                            <div className="spine"></div>
                        </form>
                        </div>
                        <div className="newCover">
                            {selectedFile &&  <div className="book">
                                <Link to ={"books/"+item.book_id}>
                                    <img className="cover" src={preview} width="300" height="430"/>
                                </Link>
                            </div> }
                        </div>

                    </div>



                )
            }


        </div>
    )
}

export default UpdateBook;