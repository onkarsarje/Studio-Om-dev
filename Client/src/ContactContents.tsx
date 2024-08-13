import { ChangeEvent, Component } from "react";
import React from "react";
import title from "./assets/Asset 43.png";
import X from "./assets/X symbol.png";
import text from "./assets/Asset 39.png";
import emailjs from "emailjs-com";

type ContactContentsProps = {
    onBackClick: () => void;
};

type ContactContentsState = {
    name: string;
    email: string;
    phone: string;
    msg: string;
    errors: {
        name: string;
        email: string;
        phone: string;
        msg: string;
    };
    successMessage: string;
};

export class ContactContents extends Component<ContactContentsProps, ContactContentsState> {
    constructor(props: ContactContentsProps) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            msg: "",
            errors: {
                name: "",
                email: "",
                phone: "",
                msg: ""
            },
            successMessage: ""
        };
    }

    render = (): JSX.Element => {
        return (
            <div className="page-contents">
                <div className="pageHeader">
                    <div className="empty"></div>
                    <img className="contactTitle" src={title} alt="Contact Title" />
                    <img className="close" src={X} alt="Close" onClick={this.props.onBackClick} />
                </div>
                <div className="contactContents">
                    <img src={text} className="contactText" alt="Contact Text" />
                    <div className="field">
                        <p>NAME: {this.renderError("name")}</p>
                        <input
                            className="contactInput"
                            value={this.state.name}
                            onChange={this.doNameChange}
                        />
                    </div>
                    <div className="field">
                        <p>EMAIL: {this.renderError("email")}</p>
                        <input
                            className="contactInput"
                            value={this.state.email}
                            onChange={this.doEmailChange}
                        />
                    </div>
                    <div className="field">
                        <p>PHONE NUMBER: {this.renderError("phone")}</p>
                        <input
                            className="contactInput"
                            value={this.state.phone}
                            onChange={this.doPhoneChange}
                        />
                    </div>
                    <div className="field">
                        <p>YOUR MESSAGE: {this.renderError("msg")}</p>
                        <textarea
                            className="contactTextarea"
                            value={this.state.msg}
                            onChange={this.doMsgChange}
                        ></textarea>
                    </div>
                    {this.state.successMessage && <p className="successMessage">{this.state.successMessage}</p>}
                    <button onClick={this.doSendClick} className="contactButton">SEND</button>
                </div>
            </div>
        );
    };

    renderError = (field: string): JSX.Element => {
        const error = this.state.errors[field as keyof typeof this.state.errors];
        if (error) {
            return <p className="contactError">Error: {error}</p>;
        }
        return <p></p>;
    };

    doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value;
        const error = value.trim() === "" ? "Please enter a name" : "";
        this.setState({ name: value, errors: { ...this.state.errors, name: error } });
    };

    doEmailChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const error = !emailPattern.test(value) ? "Invalid email address" : "";
        this.setState({ email: value, errors: { ...this.state.errors, email: error } });
    };

    doPhoneChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value;
        const phonePattern = /^\d{10}$/;
        const error = !phonePattern.test(value) ? "Invalid phone number, use XXXXXXXXXX format!" : "";
        this.setState({ phone: value, errors: { ...this.state.errors, phone: error } });
    };

    doMsgChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
        const value = evt.target.value;
        const error = value.trim() === "" ? "Please enter a message" : "";
        this.setState({ msg: value, errors: { ...this.state.errors, msg: error } });
    };

    doSendClick = (): void => {
        const { name, email, phone, msg, errors } = this.state;

        if (name === "") {
            errors.name = "Please enter a name";
        }
        if (email === "") {
            errors.email = "Please enter an email address";
        }
        if (phone === "") {
            errors.phone = "Please enter a phone number";
        }
        if (msg === "") {
            errors.msg = "Please enter a message";
        }

        this.setState({ errors });

        if (!Object.values(errors).some(error => error !== "")) {
             // Sends email using EmailJS
             const templateParams = {
                name: name,
                from_email: email,
                phone_number: phone,
                message: msg
            };

            emailjs.send('service_nkvegoq', 'template_s3a2fma', templateParams, 'w-_FUFVh9qI6bK96n')
                .then((response) => {
                    console.log('Success:', response);
                    this.setState({
                        name: "",
                        email: "",
                        phone: "",
                        msg: "",
                        errors: {
                            name: "",
                            email: "",
                            phone: "",
                            msg: ""
                        },
                        successMessage: "Successfully submitted!"
                    });
                    setTimeout(() => {
                        this.setState({ successMessage: "" });
                    }, 3000); 
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.setState({ successMessage: "Failed to send. Please try again." });
                });
        }
    };
}
