import React, {Component} from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import Pagination from "react-js-pagination";

class SearchBook extends Component{

    constructor(props) {
        super(props);

        this.state = {

            books: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed:3,
            key:"",
            genre:""
        }
        this.onChangeKey = this.onChangeKey.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    onChangeKey(e){
        this.setState({key:e.target.value
        });
        axios.get("http://localhost:8000/api/books/search/"+e.target.value).then((res) => {
            console.log(this.state.key);
            console.log(res.data.data);
            this.setState({books:res.data.data});
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

                <div>
                    <form>

                        <input type="text" onChange={this.onChangeKey}/>
                        <select onChange={this.onChangeGenre} value="Sort">
                            <option value="All">All</option>
                            <option value="all">all</option>
                            <option value="children">children</option>
                        </select>

                    </form>


                </div>

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
export default SearchBook;