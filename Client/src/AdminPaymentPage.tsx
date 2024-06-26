// payment page on admin end
import { ChangeEvent, Component } from "react";
import React from "react";
import { incompStudentInfo } from "./AdminAddNewStudentPage";
import { Student } from "./Student";
import VenmoQRCode from "./assets/VenmoQRCode.jpg"
import ZelleQRCode from "./assets/ZelleQRCode.jpg"
import "./style.css"

type AdminPaymentPageProps = {
    studentInfo: incompStudentInfo | number
    onBackClick: () => void
    onConfirmClick: () => void
}

type AdminPaymentPageState = {
    passType: string,
    method: string,
    numClasses: number | null,
    agreement: boolean
    error: string
}


export class AdminPaymentPage extends Component<AdminPaymentPageProps, AdminPaymentPageState> {
    constructor(props: AdminPaymentPageProps) {
        super(props);
        this.state = {passType: "", method: "", numClasses: 0, agreement: false, error: ""}
    }

    render = (): JSX.Element => {
        return <div className="payCont">
            <button onClick={this.doBackClick}>Back</button>
            <p className="pay">Payment</p>
            <div>
                <label htmlFor="passType">Choose a pass type: </label>
                <select id="passType" onChange={this.doPassChange}>
                    <option value={""}></option>
                    <option value={"Intro"}>Intro $89 (Unlimited access for 1 month)</option>
                    <option value={"Unlimited"}>Unlimited $149 (Unlimited access for 1 month + 1 buddy pass)</option>
                    <option value={"Drop in"}>Drop In $15</option>
                    <option value={"Groove Night"}>Grove Night wihtout yoga $10</option>
                    <option value={"Groove Night Y"}>Grove Night with yoga $15</option>
                    <option value={"5 Yoga"}>5 Yoga $108 (valid for 2 months)</option>
                    <option value={"10 Yoga"}>10 Yoga $196 (valid for 9 months)</option>
                </select>
            </div>
            <div>
                <p>Payment type:</p>
                <div>
                    <input type="radio" value={"Cash"} name="method" onChange={this.doPaymentMethodChange}/>Cash
                    <input type="radio" value={"Card"} name="method" onChange={this.doPaymentMethodChange}/>Card
                    <input type="radio" value={"Venmo"} name="method" onChange={this.doPaymentMethodChange}/>Venmo
                    <input type="radio" value={"Zelle"} name="method" onChange={this.doPaymentMethodChange}/>Zelle
                </div>
                {this.doPaymentRenderChange()}
            </div>
            <div>
                <input type="checkbox" onChange={this.doAgreementChange}/> Agree to the <a href="">Terms and Conditions</a>
            </div>
            {this.renderError()}
            <button onClick={this.doConfirmClick} className="studentButtons">Confirm</button>
        </div>;
    }
    
    renderError = (): JSX.Element => {
        if (this.state.error !== "") {
            return <p className="loginError">Error: {this.state.error}</p>
        }
        return <p></p>
    }

    doPaymentRenderChange = (): JSX.Element => {
        if (this.state.method === "Venmo") {
            return <img src={VenmoQRCode} className="QRCode"/>
        }
        if (this.state.method === "Zelle") {
            return <img src={ZelleQRCode} className="QRCode"/>
        }
        return <p></p>
    }

    doPassChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        if (evt.target.value === "Intro" || evt.target.value === "Unlimited") {
            this.setState({passType: evt.target.value, numClasses: null, error: ""})
            return
        } 
        
        if (evt.target.value === "Drop in" || evt.target.value === "Groove Night Y") {
            this.setState({passType: evt.target.value, numClasses: 1, error: ""})
            return
        } 
        
        if (evt.target.value === "5 Yoga") {
            this.setState({passType: evt.target.value, numClasses: 5, error: ""})
            return
        } 
        
        if (evt.target.value === "10 Yoga") {
            this.setState({passType: evt.target.value, numClasses: 10, error: ""})
            return
        }

        this.setState({passType: evt.target.value, numClasses: 0, error: ""})
    }
    
    doPaymentMethodChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({method: evt.target.value, error: ""})
    }

    doAgreementChange = (_evt: ChangeEvent<HTMLInputElement>): void => {
        this.state.agreement ? this.setState({agreement: false, error: "Please agree to the terms and conditions"}) :
                               this.setState({agreement: true, error: ""})
    }

    doConfirmClick = (): void => {
        if (this.state.method === "" || this.state.passType === "") {
            this.setState({error:"Please enter a pass and payment type"})
            return
        }
        if (!this.state.agreement) {
            this.setState({error: "Please agree to the terms and conditions"})
            return
        }

        //Move on to post to db
        const formatDate = (date: Date): string => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        if (typeof(this.props.studentInfo) === "number") {
           let updates: Partial<Student>

           if (this.state.passType === "Drop in" || this.state.passType === "Groove Night" || this.state.passType === "Groove Night Y"){
                updates = {
                passType: this.state.passType,
                startDate: null,
                endDate: null,
                numClasses: this.state.numClasses}
            } else if (this.state.passType === "Unlimited" || this.state.passType === "Intro") {
                const currentDate = new Date();
                const endDate = new Date();
                endDate.setMonth(currentDate.getMonth() + 1);
            
                const passStartDate = formatDate(currentDate);
                const passEndDate = formatDate(endDate);
                
                updates = {
                    passType: this.state.passType,
                    startDate: passStartDate,
                    endDate: passEndDate,
                    numClasses: this.state.numClasses}
            } else if (this.state.passType === "5 Yoga") {
                const currentDate = new Date();
                const endDate = new Date();
                endDate.setMonth(currentDate.getMonth() + 2);
            
                const passStartDate = formatDate(currentDate);
                const passEndDate = formatDate(endDate);
                
                updates = {
                    passType: this.state.passType,
                    startDate: passStartDate,
                    endDate: passEndDate,
                    numClasses: this.state.numClasses}
            } else {
                const currentDate = new Date();
                const endDate = new Date();
                endDate.setMonth(currentDate.getMonth() + 9);
            
                const passStartDate = formatDate(currentDate);
                const passEndDate = formatDate(endDate);
                
                updates = {
                    passType: this.state.passType,
                    startDate: passStartDate,
                    endDate: passEndDate,
                    numClasses: this.state.numClasses}
            }

            fetch(`https://studioomfnapp.azurewebsites.net/updateStudent/${this.props.studentInfo}`, {
                method: "PUT", body: JSON.stringify(updates),
                headers: {"Content-Type": "application/json"}})
                .then(this.doUpdateResp)
                .catch(() => this.doUpdateError("failed to connect to server."))

        } else {
            let newStudent: Student;

            if (this.state.passType === "Drop in" || this.state.passType === "Groove Night" || this.state.passType === "Groove Night Y"){
                newStudent = {name: this.props.studentInfo.name,
                    email: this.props.studentInfo.email,
                    phone: this.props.studentInfo.phone,
                    passType: this.state.passType,
                    startDate: null,
                    endDate: null,
                    numClasses: this.state.numClasses}
            } else if (this.state.passType === "Unlimited" || this.state.passType === "Intro") {
                const currentDate = new Date();
                const endDate = new Date();
                endDate.setMonth(currentDate.getMonth() + 1);
            
                const passStartDate = formatDate(currentDate);
                const passEndDate = formatDate(endDate);
                
                newStudent = {name: this.props.studentInfo.name,
                    email: this.props.studentInfo.email,
                    phone: this.props.studentInfo.phone,
                    passType: this.state.passType,
                    startDate: passStartDate,
                    endDate: passEndDate,
                    numClasses: this.state.numClasses}
            } else if (this.state.passType === "5 Yoga") {
                const currentDate = new Date();
                const endDate = new Date();
                endDate.setMonth(currentDate.getMonth() + 2);
            
                const passStartDate = formatDate(currentDate);
                const passEndDate = formatDate(endDate);
                
                newStudent = {name: this.props.studentInfo.name,
                    email: this.props.studentInfo.email,
                    phone: this.props.studentInfo.phone,
                    passType: this.state.passType,
                    startDate: passStartDate,
                    endDate: passEndDate,
                    numClasses: this.state.numClasses}
            } else {
                const currentDate = new Date();
                const endDate = new Date();
                endDate.setMonth(currentDate.getMonth() + 9);
            
                const passStartDate = formatDate(currentDate);
                const passEndDate = formatDate(endDate);
                
                newStudent = {name: this.props.studentInfo.name,
                    email: this.props.studentInfo.email,
                    phone: this.props.studentInfo.phone,
                    passType: this.state.passType,
                    startDate: passStartDate,
                    endDate: passEndDate,
                    numClasses: this.state.numClasses}
            } 
            
            fetch("https://studioomfnapp.azurewebsites.net/addStudent", {
                method: "POST", body: JSON.stringify(newStudent),
                headers: {"Content-Type": "application/json"}})
                .then(this.doAddStudentResp)
                .catch(() => this.doAddStudentError("failed to connect to server.")); 
        }
    }

    doUpdateResp = (resp: Response): void => {
        if (resp.status === 200) {
            resp.text().then(this.doUpdateText)
                .catch(() => this.doUpdateError("200 response is not text"));
        } else if (resp.status === 400) {
            resp.text().then(this.doUpdateError)
                .catch(() => this.doUpdateError("400 response is not text"));
        } else {
            this.doUpdateError(`bad status code from /api/updateStudent: ${resp.status}`);
        }
    }

    doUpdateText = (_data: unknown): void => {
        this.setState({passType: "", method: "", numClasses: 0, agreement: false, error: ""})
        this.props.onConfirmClick()
    }

    doUpdateError = (msg: String): void => {
        console.log(msg)
    }

    doAddStudentResp = (resp: Response): void => {
        if (resp.status === 200) {
            resp.text().then(this.doAddStudentText)
                .catch(() => this.doAddStudentError("200 response is not text"));
        } else if (resp.status === 400) {
            resp.text().then(this.doAddStudentError)
                .catch(() => this.doAddStudentError("400 response is not text"));
        } else {
            this.doAddStudentError(`bad status code from /api/addStudent: ${resp.status}`);
        }
    }; 

    doAddStudentText = (_data: unknown): void => {
        this.setState({passType: "", method: "", numClasses: 0, agreement: false, error: ""})
        this.props.onConfirmClick() 
    };

    doAddStudentError = (msg: string): void => {
        console.error(msg);
    };

    doBackClick = (): void => {
        this.props.onBackClick()
    }
}