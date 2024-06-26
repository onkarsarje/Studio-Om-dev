// represents a single student
// used to check in and read other data

import { Component } from "react";
import React from "react";
import { Student, isStudent } from "./Student";
import { isRecord } from "./record";
import { AdminPaymentPage } from "./AdminPaymentPage";
import "./style.css"

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
        this.state = {currStudent: undefined, page: "student", updating: false}
    }

    componentDidMount(): void {
        this.doRefreshTimeOut()
    }
    

    componentDidUpdate(): void {
        if (this.state.updating) {
            this.doRefreshTimeOut()
        }
    }

    render = (): JSX.Element => {
        if (this.state.currStudent === undefined) {
            return <p>Loading...</p>
        } else if (this.state.page === "student") {
            return <div className="studentCont">
                {this.renderChanges()}
                <div className="buttonDiv">
                    <button onClick={this.doBackClick} className="studentButtons">Back</button> 

                    <button onClick={this.doCheckInClick} className="studentButtons">Check In</button> 

                    <button onClick={this.doPassClick} className="studentButtons">Update Pass</button>
                </div>
               </div>;
        } else {
            return <AdminPaymentPage studentInfo={this.props.id}
                                     onBackClick={this.onBackClick}
                                     onConfirmClick={this.doConfirmClick}/>
        }
    }
    
    renderChanges = (): JSX.Element => {
        if (this.state.currStudent?.numClasses === null) {
            return <div>
            <p className="name">{this.state.currStudent.name}</p>
            <p>Email: {this.state.currStudent.email}</p>
            <p>Phone: {this.state.currStudent.phone}</p>
            <p>Pass Type: {this.state.currStudent.passType}</p>
            <p>Start Date: {this.state.currStudent.startDate}</p>
            <p>End Date: {this.state.currStudent.endDate}</p>
            <p>Sessions Left: Unlimited</p>
           </div>;
        }
        if (this.state.currStudent?.passType==="Drop in" || 
            this.state.currStudent?.passType==="Groove Night" ||
            this.state.currStudent?.passType==="Groove Night Y") {
                return <div>
                <p className="name">{this.state.currStudent.name}</p>
                <p>Email: {this.state.currStudent.email}</p>
                <p>Phone: {this.state.currStudent.phone}</p>
                <p>Pass Type: {this.state.currStudent.passType}</p>
                <p>Sessions Left: {this.state.currStudent.numClasses}</p>
               </div>; 
        } else {
            return <div>
            <p className="name">{this.state.currStudent?.name}</p>
            <p>Email: {this.state.currStudent?.email}</p>
            <p>Phone: {this.state.currStudent?.phone}</p>
            <p>Pass Type: {this.state.currStudent?.passType}</p>
            <p>Start Date: {this.state.currStudent?.startDate}</p>
            <p>End date: {this.state.currStudent?.endDate}</p>
            <p>Sessions Left: {this.state.currStudent?.numClasses}</p>
           </div>;
        }
    }

    doPassClick = (): void => {
        this.setState({page: "payment"})
    }
    
    doCheckInClick = (): void => {
        fetch(`https://studioomfnapp.azurewebsites.net/decrementClasses/${this.props.id}`, {method: "POST"})
            .then(this.doCheckInResp)
            .catch(() => this.doCheckInError("failed to connect to server"))
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
        this.doRefreshTimeOut()
    }

    doCheckInError = (msg: String): void => {
        console.log(msg)
    }

    doRefreshTimeOut = (): void => {
        fetch(`https://studioomfnapp.azurewebsites.net/student/${this.props.id}`)
            .then(this.doStudentResp)
            .catch(() => this.doStudentError("failed to connect to server"))
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
          };
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

        const student: Student = {name: data.student.name,
                                    email: data.student.email,
                                    phone: data.student.phone,
                                    passType: data.student.passType,
                                    startDate: data.student.startDate,
                                    endDate: data.student.endDate,
                                    numClasses: data.student.numClasses}
        this.setState({currStudent: student, updating: false})                            
    }

    doStudentError = (msg: String): void => {
        console.log(msg)
    }
    
    onBackClick = (): void => {
        this.setState({page: "student"})
    }

    doConfirmClick = (): void => {
        this.setState({page: "student", updating: true})
    }

    doBackClick = (): void => {
        this.props.onBackClick();
    }
}