import React,{useState,useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function NavBar(){

    let username = (localStorage.getItem('user-name'));
    let userid = (localStorage.getItem('user-id'));
    const  history = useHistory();

    function logout(){
        localStorage.clear();
        history.push("/login")

    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Book Barn</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>


                    <li className="nav-item">
                        <a className="nav-link" href="/signup">Sign Up</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>


                    <li className="nav-item">
                        <a className="nav-link" href="/mybooks">My Books</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/search">Search Books</a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {username}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" onClick={logout}>Logout</a>
                        </div>

                    </li>


                </ul>

            </div>
        </nav>
    )
}

export default NavBar;