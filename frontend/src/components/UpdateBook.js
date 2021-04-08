import React,{useState,useEffect} from "react";
import axios from "axios";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";


function UpdateBook(props){

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

    function update(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("book_title",book_title);
        formData.append("book_description",book_description);
        formData.append("author",author);
        formData.append("genre",genre);
        formData.append("cover_image",cover_image);
        formData.append("price",price);


        axios.post("http://localhost:8000/api/books/update/"+id,formData).then(() => {
            alert("book Updated");
        }).catch((err) => {
            alert(err);
        })


    }

    function Delete(e) {


        axios.delete("http://localhost:8000/api/books/delete/"+id).then(() => {
            alert("book Deleted");
        }).catch((err) => {
            alert(err);
        })


    }

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
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

            <NavBar/>

            {
                book.map((item) =>

                    <div className="col-sm-6 offset-sm-3">

                        <form onSubmit={update}>

                            <div className="bookWrap">
                                <div className="book">
                                    <Link to ={"books/"+item.book_id}>
                                        <img className="cover" src={"http://localhost:8000/"+item.cover_image} width="180" height="160"
                                        /></Link>
                                    <div className="spine"></div>
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

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Genre</label>
                                <input type="text" className="form-control" defaultValue={item.genre} placeholder="Genre" onChange={(e) => {setGenre(e.target.value)}}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Cover Image</label>
                                <input type="file" className="form-control" name="cover" placeholder="Cover Image" onChange={onSelectFile}/>
                                {selectedFile &&  <img src={preview} /> }
                            </div>


                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Price</label>
                                <input type="text" className="form-control" defaultValue={item.price} placeholder="Price" onChange={(e) => {setPrice(e.target.value)}}/>
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>

                                <button type="button"  onClick={Delete} className="btn btn-danger">Delete</button>

                            <div className="spine"></div>
                        </form>


                    </div>



                )
            }


        </div>
    )
}

export default UpdateBook;