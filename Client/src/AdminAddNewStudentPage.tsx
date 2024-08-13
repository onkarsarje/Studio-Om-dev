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
    agreement: boolean;
    errors: {
        name: string;
        email: string;
        phone: string;
        agreement: string;
    };
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
        this.state = {
            name: "",
            email: "",
            phone: "",
            agreement: false,
            errors: {
                name: "",
                email: "",
                phone: "",
                agreement: ""
            },
            page: "add"
        }
    }

    render = (): JSX.Element => {
        if (this.state.page === "add") {
            return <div className="newCont">  
                <button onClick={this.props.onBackClick}>Back</button>
                <div className="newDiv">
                    <p className="register">REGISTER NEW STUDENT</p>
                    <p className="registerP">FULL NAME</p>
                    <input className="registerDiv" value={this.state.name} onChange={this.doNameChange}></input>
                    {this.renderError("name")}
                    <p className="registerP">PHONE NUMBER</p>
                    <input className="registerDiv" value={this.state.phone} onChange={this.doPhoneChange}></input>
                    {this.renderError("phone")}
                    <p className="registerP">EMAIL</p>
                    <input className="registerDiv" value={this.state.email} onChange={this.doEmailChange}></input>
                    {this.renderError("email")}
                    <div className="agreement">
                        <input type="checkbox" onChange={this.doAgreementChange}/> AGREE TO THE <a href="">TERMS AND CONDITIONS</a>
                        {this.renderError("agreement")}
                    </div>
                    <button onClick={this.doContinueClick} className="studentButtons">Continue</button>
                </div>
            </div>
        } else {
            const studentInfo: incompStudentInfo = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            }
            return <AdminPaymentPage
                studentInfo={studentInfo}
                onBackClick={this.doBackClick}
                onConfirmClick={this.doConfirmClick}
            />
        }
    }

    renderError = (field: string): JSX.Element => {
        const error = this.state.errors[field as keyof typeof this.state.errors];
        if (error) {
            return <p className="loginError">Error: {error}</p>
        }
        return <p></p>
    }

    doAgreementChange = (_evt: ChangeEvent<HTMLInputElement>): void => {
        if (this.state.agreement) {
            this.setState({ agreement: false, errors: { ...this.state.errors, agreement: "Please agree to the terms and conditions" } });
        } else {
            this.setState({ agreement: true, errors: { ...this.state.errors, agreement: "" } });
        }
    }

    doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value;
        const error = value.trim() === "" ? "Please enter a name" : "";
        this.setState({ name: value, errors: { ...this.state.errors, name: error } });
    }

    doPhoneChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value;
        const phonePattern = /^\d{10}$/;
        const error = !phonePattern.test(value) ? "Invalid phone number" : "";
        this.setState({ phone: value, errors: { ...this.state.errors, phone: error } });
    }

    doEmailChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const error = !emailPattern.test(value) ? "Invalid email address" : "";
        this.setState({ email: value, errors: { ...this.state.errors, email: error } });
    }

    doContinueClick = (): void => {
        const { name, email, phone, agreement, errors } = this.state;
        if (name === "") {
            errors.name = "Please enter a name";
        }
        if (phone === "") {
            errors.phone = "Please enter a phone number";
        }
        if (email === "") {
            errors.email = "Please enter an email address";
        }
        if (!agreement) {
            errors.agreement = "Please agree to the terms and conditions";
        }

        this.setState({ errors });

        if (!Object.values(errors).some(error => error !== "")) {
            this.setState({ page: "payment" });
        }
    }

    doConfirmClick = (): void => {
        this.setState({
            name: "",
            email: "",
            phone: "",
            agreement: false,
            errors: {
                name: "",
                email: "",
                phone: "",
                agreement: ""
            },
            page: "add"
        });
    }

    doBackClick = (): void => {
        this.setState({ page: "add" });
    }
}
