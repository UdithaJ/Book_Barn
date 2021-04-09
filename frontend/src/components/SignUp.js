import React,{useState} from "react";
import axios from "axios";

function SignUp(){

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function sendUser(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username",username);
        formData.append("email",email);
        formData.append("password",password);

        axios.post("http://localhost:8000/api/signup",formData).then(() => {
            alert("Registered");
        }).catch((err) => {
            alert(err);
        })


    }

    return(

        <div className="col-sm-6 offset-sm-3">
            <form onSubmit={sendUser}>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">User Name</label>
                    <input type="text" className="form-control" name="username" placeholder="User name" onChange={(e) => {setName(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
                </div>


                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;