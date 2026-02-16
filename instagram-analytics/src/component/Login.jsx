import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate()

    function formhandeler(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/login', {  email, password })
            .then(result => {
                console.log(result)
                if (result.data == "success") {
                    navigate("/home")

                }
                else{
                    alert(result.data)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                <form onSubmit={formhandeler}>
                    <div className="form-group">
                        <label>emial</label>
                        <input type="text"
                            placeholder="Enter emial"
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                            placeholder="Enter password"
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>

                    <button className="btn">Login</button>
                </form>

                <p className="register-link">
                    Don’t have an account? <a href="#">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
