import React, { ChangeEvent } from "react";
import { Component } from "react";
import logo from "./assets/Logo.png"
import "./style.css"
import { PaymentPage } from "./PaymentPage";

type SignUpPageState = {
    name: string,
    email: string,
    phone: string,
    page: "info" | "payment",
    error: string
}

type SignUpPageProps = {
    onBackClick: () => void,
    onLoginClick: () => void,
}

export class SignUpPage extends Component<SignUpPageProps, SignUpPageState> {
    constructor(props: SignUpPageProps) {
        super(props)
        this.state = {name: "", email: "", phone: "", page: "info", error: ""}
    }

    render = (): JSX.Element => {
        if (this.state.page === "info") {
            return <div className="outerdiv">
            <img src={logo} onClick={this.props.onBackClick} className="logoBack"/>
            <div className="login">
                <p>FULL NAME</p>
                <input value={this.state.name} onChange={this.doNameChange}></input>
                <p>PHONE</p>
                <input value={this.state.phone} onChange={this.doPhoneChange}></input>
                <p>EMAIL</p>
                <input value={this.state.email} onChange={this.doEmailChange}></input>
                <button onClick={this.doContinueClick} className="loginBut">CONTINUE</button>
                {this.renderError()}
            </div>
            <p onClick={this.props.onLoginClick}> HAVE AN ACCOUNT? LOGIN</p>
        </div>
        } else {
            return <PaymentPage/>
        }
    }
    
    renderError = (): JSX.Element | null => {
        if (this.state.error !== "") {
            return <p className="loginError">Error: {this.state.error}</p>
        }
        return null;
    }

    doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        if (this.state.name === "") {
            this.setState({name: evt.target.value, error: "Please enter a name"})
            return
        }
        this.setState({name: evt.target.value, error: ""})
    }

    doPhoneChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const phonePattern = /^\d{10}$/;

        if(!phonePattern.test(evt.target.value)) {
            this.setState({phone: evt.target.value, error: "Invalid phone number"})
            return
        }

        //Check that phone number doesnt already exist

        this.setState({phone: evt.target.value, error: ""})
    }

    doEmailChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
        if (!emailPattern.test(evt.target.value)) {
            this.setState({email: evt.target.value, error: "Invalid email address"})
            return
        }

        //Check that email doesnt already exist

        this.setState({email: evt.target.value, error: ""})
    }

    doContinueClick = (): void => {
        if (this.state.name === "" || this.state.email === "" || this.state.phone === "" ) {
            this.setState({error: "Please enter all details above"})
            return
        }
        if (this.state.error === "") {
            this.setState({page: "payment"})
            return
        }
    }

    doConfirmClick = (): void => {

    }

    

}