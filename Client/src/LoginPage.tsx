import { ChangeEvent, Component } from "react";
import React from "react";
import logo from "./assets/Logo.png"
import "./style.css"

type LoginPageProps = {onLoginClick: () => void,
                       onBackClick: () => void}

type LoginPageState = {
    username: string;
    password: string;
    error: string;
}

export class LoginPage extends Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {username: "", password: "", error: ""}
    }

    render = (): JSX.Element => {
        return <div className="outerdiv">
            <div className="login">
                    <img src={logo} onClick={this.doBackClick} className="logoBack"/>
                    ADMIN LOGIN
                    <p>USERNAME</p>
                    <input id="username" value={this.state.username} 
                           onChange={this.doUsernameChange}></input>
                    <p>PASSWORD</p>
                    <input id="password" value={this.state.password} 
                           onChange={this.doPasswordChange}></input>
                    {this.renderError()}
                    <button onClick={this.doLoginClick} className="loginBut">Login</button>
               </div>
        </div>  
    }
    
    renderError = (): JSX.Element => {
        if (this.state.error !== "") {
            return <p className="loginError">Error: {this.state.error}</p>
        }
        return <p></p>
    }
    
    doUsernameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({username: evt.target.value, error: ""});
    };

    doPasswordChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({password: evt.target.value, error: ""});
    };

    doLoginClick = (): void => {
        if (this.state.username !== "admin" || this.state.password !== "password") {
            this.setState({error: "Incorrect username or password"})
            return
        }
        this.props.onLoginClick(); 
    }

    doBackClick = (): void => {
        this.props.onBackClick();
    };
}