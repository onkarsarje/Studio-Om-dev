import { ChangeEvent, Component } from "react";
import React from "react";
import { incompStudentInfo } from "./AdminAddNewStudentPage";
import { Student } from "./Student";
import VenmoQRCode from "./assets/VenmoQRCode.jpg";
import ZelleQRCode from "./assets/ZelleQRCode.jpg";
import "./style.css";

type AdminPaymentPageProps = {
    studentInfo: incompStudentInfo | number;
    onBackClick: () => void;
    onConfirmClick: () => void;
};

type PassType = "Drop in" | "2 Week Trial" | "Monthly" | "Semester Special" | "Third Party";

type PassTypes = {
    [key in PassType]: {
        duration: number;
        classes: number | null;
    };
};

type AdminPaymentPageState = {
    passType: PassType | "";
    method: string;
    numClasses: number | null;
    error: string;
};

const passTypes: PassTypes = {
    "Drop in": { duration: 0, classes: 1 },
    "2 Week Trial": { duration: 2, classes: 1 },
    "Monthly": { duration: 4, classes: 1 },
    "Semester Special": { duration: 16, classes: 1 }, 
    "Third Party": { duration: 0, classes: 1 }
};

export class AdminPaymentPage extends Component<AdminPaymentPageProps, AdminPaymentPageState> {
    constructor(props: AdminPaymentPageProps) {
        super(props);
        this.state = { passType: "", method: "", numClasses: 0, error: "" };
    }

    render = (): JSX.Element => {
        return (
            <div className="payCont">
                <button onClick={this.doBackClick}>Back</button>

                <div className="newDiv">
                    <p className="pay">Payment</p>
                    <div>
                        <label htmlFor="passType">CHOOSE A PASS TYPE: </label>
                        <select id="passType" onChange={this.doPassChange}>
                            <option value={""}></option>
                            {Object.keys(passTypes).map((key) => (
                                <option key={key} value={key}>{`${key}`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="payP">PAYMENT TYPE:</p>
                        <div>
                            <input type="radio" value={"Cash"} name="method" onChange={this.doPaymentMethodChange} />CASH
                            <input type="radio" value={"Card"} name="method" onChange={this.doPaymentMethodChange} />CARD
                            <input type="radio" value={"Venmo"} name="method" onChange={this.doPaymentMethodChange} />VENMO
                            <input type="radio" value={"Zelle"} name="method" onChange={this.doPaymentMethodChange} />ZELLE
                            <input type="radio" value={"Third Party"} name="method" onChange={this.doPaymentMethodChange} />THIRD PARTY
                        </div>
                        {this.doPaymentRenderChange()}
                    </div>
                    {this.renderError()}
                    <button onClick={this.doConfirmClick} className="studentButtons">Confirm</button>
                </div>
            </div>
        );
    };

    renderError = (): JSX.Element => {
        if (this.state.error !== "") {
            return <p className="loginError">Error: {this.state.error}</p>;
        }
        return <p></p>;
    };

    doPaymentRenderChange = (): JSX.Element => {
        if (this.state.method === "Venmo") {
            return <img src={VenmoQRCode} className="QRCode" />;
        }
        if (this.state.method === "Zelle") {
            return <img src={ZelleQRCode} className="QRCode" />;
        }
        return <p></p>;
    };

    doPassChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        const passType = evt.target.value as PassType;
        const passInfo = passTypes[passType] || { duration: 0, classes: 0 };
        this.setState({ passType: passType, numClasses: passInfo.classes, error: "" });
    };

    doPaymentMethodChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ method: evt.target.value, error: "" });
    };

    doConfirmClick = (): void => {
        if (this.state.method === "" || this.state.passType === "") {
            this.setState({ error: "Please enter a pass and payment type" });
            return;
        }

        // Move on to post to db
        const formatDate = (date: Date): string => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        };

        const addWeeks = (date: Date, weeks: number): Date => {
            const result = new Date(date);
            result.setDate(result.getDate() + weeks * 7);
            return result;
        };

        const passInfo = passTypes[this.state.passType];
        const currentDate = new Date();
        const endDate = addWeeks(currentDate, passInfo.duration);
        let passStartDate;
        let passEndDate;

        if (this.state.passType === "Semester Special") {
            passStartDate = "08-21-2024";
            passEndDate = "12-14-2024";
        } else {
            passStartDate = passInfo.duration ? formatDate(currentDate) : null;
            passEndDate = passInfo.duration ? formatDate(endDate) : null;
        }

        const updates: Partial<Student> = {
            passType: this.state.passType,
            startDate: passStartDate,
            endDate: passEndDate,
            numClasses: this.state.numClasses
        };

        if (typeof this.props.studentInfo === "number") {
            fetch(`https://studioomfnapp.azurewebsites.net/updateStudent/${this.props.studentInfo}`, {
                method: "PUT",
                body: JSON.stringify(updates),
                headers: { "Content-Type": "application/json" }
            })
                .then(this.doUpdateResp)
                .catch(() => this.doUpdateError("failed to connect to server."));
        } else {
            const newStudent: Student = {
                name: this.props.studentInfo.name,
                email: this.props.studentInfo.email,
                phone: this.props.studentInfo.phone,
                passType: this.state.passType,
                startDate: passStartDate,
                endDate: passEndDate,
                numClasses: this.state.numClasses
            };

            fetch("https://studioomfnapp.azurewebsites.net/addStudent", {
                method: "POST",
                body: JSON.stringify(newStudent),
                headers: { "Content-Type": "application/json" }
            })
                .then(this.doAddStudentResp)
                .catch(() => this.doAddStudentError("failed to connect to server."));
        }
    };

    doUpdateResp = (resp: Response): void => {
        if (resp.status === 200) {
            resp.text().then(this.doUpdateText).catch(() => this.doUpdateError("200 response is not text"));
        } else if (resp.status === 400) {
            resp.text().then(this.doUpdateError).catch(() => this.doUpdateError("400 response is not text"));
        } else {
            this.doUpdateError(`bad status code from /api/updateStudent: ${resp.status}`);
        }
    };

    doUpdateText = (_data: unknown): void => {
        this.setState({ passType: "", method: "", numClasses: 0, error: "" });
        this.props.onConfirmClick();
    };

    doUpdateError = (msg: String): void => {
        console.log(msg);
    };

    doAddStudentResp = (resp: Response): void => {
        if (resp.status === 200) {
            resp.text().then(this.doAddStudentText).catch(() => this.doAddStudentError("200 response is not text"));
        } else if (resp.status === 400) {
            resp.text().then(this.doAddStudentError).catch(() => this.doAddStudentError("400 response is not text"));
        } else {
            this.doAddStudentError(`bad status code from /api/addStudent: ${resp.status}`);
        }
    };

    doAddStudentText = (_data: unknown): void => {
        this.setState({ passType: "", method: "", numClasses: 0, error: "" });
        this.props.onConfirmClick();
    };

    doAddStudentError = (msg: string): void => {
        console.error(msg);
    };

    doBackClick = (): void => {
        this.props.onBackClick();
    };
}
