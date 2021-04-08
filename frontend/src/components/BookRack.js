import React, {Component} from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import Pagination from "react-js-pagination";

class BookRack extends Component{

    constructor() {
        super();
        this.state = {

            books: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed:3
        }
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    componentDidMount() {

        axios.get("http://localhost:8000/api/books").then((res) => {
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

                <div className="d-flex justify-content-center">
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