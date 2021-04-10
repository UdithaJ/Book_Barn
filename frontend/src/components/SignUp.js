import React,{useState} from "react";
import axios from "axios";
import NavBar from "./NavBar";
import {useHistory} from 'react-router-dom';

function SignUp(){

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const  history = useHistory();

    function sendUser(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username",username);
        formData.append("email",email);
        formData.append("password",password);

        axios.post("http://localhost:8000/api/signup",formData).then((res) => {
            if(res.data.status === "success") {
                alert("Registered");
                history.push("/login")
            }
            else{
                alert("Registration Failed!");
            }
        }).catch((err) => {
            alert(err);
        })


    }

    return(
        <div>

            <NavBar/>


        <div className="signup">
            <h2>Sign Up</h2>
            <div><br/></div>
            <form onSubmit={sendUser}>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">User Name</label>
                    <input type="text" required="true" className="form-control" name="username" placeholder="User name" onChange={(e) => {setName(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="text" required="true"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" className="form-control" name="email" placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
                </div>


                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" required="true"  className="form-control" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
        </div>
    )
}

export default SignUp;