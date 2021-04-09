import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import NavBar from "./NavBar";

function AddBook(){
    const  history = useHistory();

    const [book_title, setTitle] = useState("");
    const [book_description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [cover_image, setCover] = useState("");
    const [price, setPrice] = useState("");

     function sendBook(e) {
         e.preventDefault();

         const formData = new FormData();
         formData.append("book_title",book_title);
         formData.append("book_description",book_description);
         formData.append("author",author);
         formData.append("genre",genre);
         formData.append("cover_image",cover_image);
         formData.append("price",price);

         axios.post("http://localhost:8000/api/addBook",formData).then((res) => {
             if(res.data.status === "success") {
                 history.push("borrowedbooks/");
             }
             else {
                 alert("oops! something went wrong");
             }
         }).catch((err) => {
             alert("oops! something went wrong");
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

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
        setCover(e.target.files[0])
    }


    return(

        <div>

            <NavBar/>

        <div className="col-sm-6 offset-sm-5">
            <div className="bookForm">
            <form onSubmit={sendBook}>

                <div className="form-group">
                    <label className="float-left">Title</label>
                    <input type="text" className="form-control" name="title" placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label className="float-left">Description</label>
                    <input type="text" className="form-control" name="description" placeholder="Description" onChange={(e) =>{setDescription(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label className="float-left">Author</label>
                    <input type="text" className="form-control" name="author" placeholder="Author" onChange={(e) => {setAuthor(e.target.value)}}/>
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
                    <input type="file" className="form-control" name="cover" placeholder="Cover Image"  onChange={onSelectFile}/>
                </div>

                <div className="form-group">
                    <label className="float-left">Price</label>
                    <input type="text" className="form-control" name="price" placeholder="Price" onChange={(e) => {setPrice(e.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-primary">Add to Rack</button>
            </form>
            </div>

            <div className="preview">
                {selectedFile &&  <img src={preview} width="300" height="430"/> }
            </div>
        </div>
        </div>
    )
}

export default AddBook;