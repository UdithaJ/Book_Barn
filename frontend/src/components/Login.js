import React,{useState,useEffect} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NavBar from "./NavBar";


function Login(){

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const  history = useHistory();


function validate(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email",email);
    formData.append("password",password);

    axios.post("http://localhost:8000/api/login",formData).then((response) =>{

        if(response.data.status === "valid"){
            let username = response.data.user.username;
            let userid = JSON.stringify(response.data.user.id);
            localStorage.setItem("user-id",userid);
            localStorage.setItem("user-name",username);
            alert("logged in");
            history.push("/")

        }
        else {

            alert("Login failed!")
        }

    })



}

return(
<div>
    <NavBar/>
    <div className="col-sm-6 offset-sm-3">

        <form onSubmit={validate}>


            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Email</label>
                <input type="text" className="form-control" name="email" placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
            </div>


            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="text" className="form-control" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
</div>
)

}

export  default  Login;