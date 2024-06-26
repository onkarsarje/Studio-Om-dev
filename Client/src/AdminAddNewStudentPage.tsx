import { ChangeEvent, Component } from "react";
import React from "react";
import { AdminPaymentPage } from "./AdminPaymentPage";
import "./style.css"

type AdminAddNewStudentPageProps =  {
    onBackClick: () => void;
}

type AdminAddNewStudentPageState = {
    name: string;
    email: string;
    phone: string;
    error: string;
    page: "add" | "payment";
}

export type incompStudentInfo = {
    name: string;
    email: string;
    phone: string;
}

export class AdminAddNewStudentPage extends Component<AdminAddNewStudentPageProps, AdminAddNewStudentPageState> {
    constructor(props: AdminAddNewStudentPageProps) {
        super(props);
        this.state = {name: "",
                    email: "",
                    phone: "",
                    error: "",
                    page: "add"}
    }

    render = (): JSX.Element => {
        if (this.state.page === "add") {
            return <div className="newCont">  
                <button onClick={this.props.onBackClick}>Back</button>
                <p className="register">REGISTER NEW STUDENT</p>
                <p>Full name</p>
                <input value={this.state.name} onChange={this.doNameChange}></input>
                <p>Phone number</p>
                <input value={this.state.phone} onChange={this.doPhoneChange}></input>
                <p>Email</p>
                <input value={this.state.email} onChange={this.doEmailChange}></input>
            {this.renderError()}
            <button onClick={this.doContinueClick} className="studentButtons">Continue</button>
        </div>
        } else {
            const studentInfo: incompStudentInfo = {name: this.state.name.trim(),
                                                    email: this.state.email.trim(),
                                                    phone: this.state.phone.trim()}
            return <AdminPaymentPage studentInfo={studentInfo}
                                     onBackClick={this.doBackClick}
                                     onConfirmClick={this.doConfirmClick}/>
        }
    }  
    renderError = (): JSX.Element => {
        if (this.state.error !== "") {
            return <p className="loginError">Error: {this.state.error}</p>
        }
        return <p></p>
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

        this.setState({phone: evt.target.value, error: ""})
    }

    doEmailChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
        if (!emailPattern.test(evt.target.value)) {
            this.setState({email: evt.target.value, error: "Invalid email address"})
            return
        }

        this.setState({email: evt.target.value, error: ""})
    }

    doContinueClick = (): void => {
        if (this.state.name === "" || this.state.email === "" || this.state.phone === "") {
            this.setState({error: "Please enter all details above"})
            return
        }
        if (this.state.error === "") {
            this.setState({page: "payment"})
            return
        }
    }
    doConfirmClick = (): void => {
        this.setState({name: "", email: "", phone: "", error: "", page: "add"})
    }

    doBackClick = (): void => {
        this.setState({page: "add"})
    }
}