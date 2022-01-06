import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        showError: "",
        mm:""

    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    SignUp = () => {
        axios.get("http://localhost:8989/create_account", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({
                        showError: "the user create, now go to login in our site!"
                    })
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data);
                    window.location.reload();
                } else {
                    this.setState({
                        showError: "the username exist - change your username!"
                    })
                }
            })
    }



    isNumeric = (text) => {
        return !isNaN(text);
    }

    render() {
        return (
            <div >
                <div className={"title"}>
                    Enter password and userName to sign-up
                </div>
                <div >
                    <input className={"button"}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <input className={"button"}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    <button className={"button"} onClick={this.SignUp}>sign-up</button>
                </div>
                <div className={"showEror"}>
                    {this.state.showError}
                </div>
                <div>
                    <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                        <button className={"button"}>back to logIn</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}
export default SignUp;

