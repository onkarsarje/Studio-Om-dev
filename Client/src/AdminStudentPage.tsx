// represents a single student
// used to check in and read other data

import { Component } from "react";
import React from "react";
import { Student, isStudent } from "./Student";
import { isRecord } from "./record";
import { AdminPaymentPage } from "./AdminPaymentPage";
import "./style.css";

type AdminStudentPageProps = {
    id: number
    onBackClick: () => void
}

type AdminStudentPageState = {
    currStudent: Student | undefined
    page: "student" | "payment"
    updating: boolean
}

export class AdminStudentPage extends Component<AdminStudentPageProps, AdminStudentPageState> {
    constructor(props: AdminStudentPageProps) {
        super(props);
        this.state = { currStudent: undefined, page: "student", updating: false };
    }

    componentDidMount(): void {
        this.doRefreshTimeOut();
    }

    componentDidUpdate(): void {
        if (this.state.updating) {
            this.doRefreshTimeOut();
        }
    }

    render = (): JSX.Element => {
        if (this.state.currStudent === undefined) {
            return <p>Loading...</p>;
        } else if (this.state.page === "student") {
            return <div className="studentPage">
                <div className="studentCont">
                    {this.renderChanges()}
                </div>
                <div className="buttonDiv">
                        <button onClick={this.doBackClick} className="studentButtons">BACK</button>
                        <button onClick={this.doCheckInClick} className="studentButtons">CHECK IN</button>
                        <button onClick={this.doPassClick} className="studentButtons">UPDATE PASS</button>
                    </div>
            </div>;
        } else {
            return <AdminPaymentPage studentInfo={this.props.id}
                onBackClick={this.onBackClick}
                onConfirmClick={this.doConfirmClick} />;
        }
    }

    renderChanges = (): JSX.Element => {
        const { currStudent } = this.state;

        if (currStudent?.startDate === "null") {
            return <div>
                <p className="name">{currStudent.name}</p>
                <p>Email: {currStudent.email}</p>
                <p>Phone: {currStudent.phone}</p>
                <p>Pass Type: {currStudent.passType}</p>
                <p>Sessions Attended: {currStudent.numClasses}</p>
            </div>;
        } else {
            return <div>
                <p className="name">{currStudent?.name}</p>
                <p>Email: {currStudent?.email}</p>
                <p>Phone: {currStudent?.phone}</p>
                <p>Pass Type: {currStudent?.passType}</p>
                <p>Start Date: {currStudent?.startDate ? currStudent.startDate : "N/A"}</p>
                <p>End date: {currStudent?.endDate ? currStudent.endDate : "N/A"}</p>
                <p>Sessions Attended: {currStudent?.numClasses}</p>
            </div>;
        }
    }

    doPassClick = (): void => {
        this.setState({ page: "payment" });
    }

    doCheckInClick = (): void => {
        fetch(`https://studioomfnapp.azurewebsites.net/decrementClasses/${this.props.id}`, { method: "POST" })
            .then(this.doCheckInResp)
            .catch(() => this.doCheckInError("failed to connect to server"));
    }

    doCheckInResp = (resp: Response): void => {
        if (resp.status === 200) {
            resp.text().then(this.doCheckInText)
                .catch(() => this.doCheckInError("200 response is not text"));
        } else if (resp.status === 400) {
            resp.text().then(this.doCheckInError)
                .catch(() => this.doCheckInError("400 response is not text"));
        } else {
            this.doCheckInError(`bad status code from /api/decrementClasses: ${resp.status}`);
        }
    }

    doCheckInText = (_data: unknown): void => {
        this.doRefreshTimeOut();
    }

    doCheckInError = (msg: String): void => {
        console.log(msg);
    }

    doRefreshTimeOut = (): void => {
        fetch(`https://studioomfnapp.azurewebsites.net/student/${this.props.id}`)
            .then(this.doStudentResp)
            .catch(() => this.doStudentError("failed to connect to server"));
    }

    doStudentResp = (resp: Response): void => {
        if (resp.status === 200) {
            resp.json().then(this.doStudentJson)
                .catch(() => this.doStudentError("200 response is not JSON"));
        } else if (resp.status === 400) {
            resp.text().then(this.doStudentError)
                .catch(() => this.doStudentError("400 response is not text"));
        } else {
            this.doStudentError(`bad status code from /api/student: ${resp.status}`);
        }
    }

    doStudentJson = (data: unknown): void => {
        if (!isRecord(data)) {
            console.error("bad data from /api/student: not a record", data);
            return;
        }

        if (!isStudent(data.student)) {
            console.error("bad data from /api/student: invalid student data", data.student);
            return;
        }

        const student: Student = {
            name: data.student.name,
            email: data.student.email,
            phone: data.student.phone,
            passType: data.student.passType,
            startDate: data.student.startDate,
            endDate: data.student.endDate,
            numClasses: data.student.numClasses
        };
        this.setState({ currStudent: student, updating: false });
    }

    doStudentError = (msg: String): void => {
        console.log(msg);
    }

    onBackClick = (): void => {
        this.setState({ page: "student" });
    }

    doConfirmClick = (): void => {
        this.setState({ page: "student", updating: true });
    }

    doBackClick = (): void => {
        this.props.onBackClick();
    }

    formatDate = (date: string): string => {
        const [year, month, day] = date.split('-');
        return `${month}-${day}-${year}`;
    }
}
