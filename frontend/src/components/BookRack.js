import React, {Component} from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import Pagination from "react-js-pagination";

class BookRack extends Component{

    constructor(props) {
        super(props);

        this.state = {

            books: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed:3,
            key:"the",
            genre:""
        }
        this.onChangeKey = this.onChangeKey.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    async onChangeKey(e){
        await this.setState({key:e.target.value});
        axios.get("http://localhost:8000/api/books/search/"+this.state.key).then((res) => {
            console.log(res.data.data);
            if(res.data.data.length ) {
                this.setState({books: res.data.data});
            }

        }).catch((err) => {
            console.log(err);
        })

    }

    onChangeGenre(e){
        this.setState({genre:e.target.value
        });
        axios.get("http://localhost:8000/api/books/sort/"+e.target.value).then((res) => {
            console.log(this.state.genre);
            console.log(res.data.data);
            this.setState({books:res.data.data});
        }).catch((err) => {
            console.log(err);
        })

    }

    componentDidMount() {


        axios.get("http://localhost:8000/api/books").then((res) => {
            console.log(res.data.data);
            this.setState({books:res.data.data}
            );
        }).catch((err) => {
            console.log(err);
        })

    }



    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        axios.get("http://localhost:8000/api/books?page="+pageNumber).then((res) => {

            console.log(res.data.data);

            this.setState({
                books:res.data.data,
                itemsCountPerPage:res.data.per_page,
                totalItemCount: res.data.total,
                activePage:res.data.current_page
            });
        }).catch((err) => {
            console.log(err);
        })
    }






    render() {

        return(
            <div>


                <NavBar/>

                <div>

                    <div className="sort">
                        <select className="custom-select" id="inputGroupSelect01" style={{width: "250px"}} onChange={this.onChangeGenre}>
                            <option selected>Genre</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Children's">Children's</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Novel">Novel</option>
                            <option value="Translations">Translations</option>
                        </select>
                    </div>

                    <div className="search">
                        <input type="text" placeholder="Type anything to Search" style={{width: "450px"}} className="form-control" onChange={this.onChangeKey}/>
                    </div>


                </div>
                <div className="d-flex justify-content-center" style={{marginTop:"10px"}}>

                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass= 'page-item'
                        linkClass= 'page-link'
                    />
                </div>



                {

                    this.state.books.map((item) =>
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


}
export default BookRack;