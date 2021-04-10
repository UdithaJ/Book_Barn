import React,{useState,useEffect} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import NavBar from "./NavBar";



function Login(){

const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
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



    function adminLogin(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);

        axios.post("http://localhost:8000/api/adminlogin",formData).then((res) =>{

            if(res.data.status === "valid"){
                let username = res.data.user.username;
                let adminid = JSON.stringify(res.data.user.id);
                localStorage.setItem("user-id",adminid);
                localStorage.setItem("user-name",username);
                alert("logged in");
                history.push("/borrowedbooks")

            }
            else {

                alert("Login failed!")
            }

        })
    }

return(
<div>

    <NavBar/>

    <div className="adminLogin" style={{marginTop:"100px"}}>
        <h1>Admin Login</h1>
        <form onSubmit={adminLogin}>

            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Username</label>
                <input type="text" className="form-control" name="email" placeholder="Username" onChange={(e) =>{setUsername(e.target.value)}}/>
            </div>


            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>



    <div className="userLogin" style={{marginTop:"100px"}}>
        <h1>User Login</h1>
            <form onSubmit={validate}>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
                </div>


                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>

    </div>
</div>
)

}

export  default  Login;