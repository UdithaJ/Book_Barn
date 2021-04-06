import React,{useState} from "react";
import axios from "axios";

function AddBook(){

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

         axios.post("http://localhost:8000/api/addBook",formData).then(() => {
             alert("book Added");
         }).catch((err) => {
             alert(err);
         })


    }

    return(

        <div className="col-sm-6 offset-sm-3">
            <form onSubmit={sendBook}>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control" name="title" placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" className="form-control" name="description" placeholder="Description" onChange={(e) =>{setDescription(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Author</label>
                    <input type="text" className="form-control" name="author" placeholder="Author" onChange={(e) => {setAuthor(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Genre</label>
                    <input type="text" className="form-control" name="genre" placeholder="Genre" onChange={(e) => {setGenre(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Cover Image</label>
                    <input type="file" className="form-control" name="cover" placeholder="Cover Image" onChange={(e) => setCover(e.target.files[0])}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Price</label>
                    <input type="text" className="form-control" name="price" placeholder="Price" onChange={(e) => {setPrice(e.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddBook;