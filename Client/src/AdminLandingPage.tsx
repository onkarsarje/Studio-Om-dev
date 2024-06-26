import { Component } from "react";
import React from "react";
import { basicStudent } from "./Student";
import { AdminStudentPage } from "./AdminStudentPage";
import { isRecord } from "./record";
import { AdminAddNewStudentPage } from "./AdminAddNewStudentPage";
import logo from "./assets/Logo.png"
import "./style.css"

type AdminLandingPageProps = {
    onBackToHomeClick: () => void
}

type AdminLandingPageState = {
    students: basicStudent[] | undefined;
    page: "landing" | {kind: "student", id: number} | "new",
    addingStudent: boolean
}

export class AdminLandingPage extends Component<AdminLandingPageProps, AdminLandingPageState> {
    constructor(props: AdminLandingPageProps) {
        super(props);
        this.state = {students: undefined, page: "landing", addingStudent: false}
    }

    componentDidMount(): void {
        this.doRefreshTimeout();
    }

    componentDidUpdate(): void {
        if (this.state.addingStudent) {
            this.doRefreshTimeout();
        }
    }

    render = (): JSX.Element => {
        if (this.state.students === undefined) {
            return <p>Loading . . .</p>
        } else {
            if (this.state.page === "landing") {
                return <div className="landingCont"> 
                        <img src={logo} onClick={this.props.onBackToHomeClick} className="landingBack"/> 
                        <br></br>
                        <button onClick={this.doAddNewStudentClick} className="Rbutton">REGISTER NEW STUDENT</button>
                        <p>EXISTING STUDENTS:</p>
                        <div className="studentContainer">
                            {this.renderStudentsList()}
                        </div>
                   </div>;
            } if (this.state.page === "new") {
                return <AdminAddNewStudentPage onBackClick={this.doBackClick}/>
            } 
            else {
                const id = this.state.page.id
                return <AdminStudentPage onBackClick = {this.doBackClick}
                                         id = {id}/>
            }
        }        
    }  

    renderStudentsList = (): JSX.Element[] => {
        const studentsList: JSX.Element[] = []
        if (this.state.students) {
            for (let i=0; i<this.state.students.length; i++) {
                const student = this.state.students[i]
                studentsList.push(<ul key={student.id}>
                                    <a href="#" onClick={(evt) => this.doStudentClick(evt, student.id)}>
                                        {student.name}
                                    </a>
                                </ul>)
            }
        }
        return studentsList;  
    }

    doAddNewStudentClick = () : void => {
        this.setState({page: "new"})
    }

    doStudentClick = (evt: React.MouseEvent<HTMLAnchorElement>, id: number) : void => {
        evt.preventDefault();
        this.setState({page: {kind: "student", id: id}})
    }

    doBackClick = (): void => {
        this.setState({page: "landing", addingStudent: true})
    }

    doBackToHomeClick = (): void => {
        this.props.onBackToHomeClick()
    }

    doRefreshTimeout = (): void => {
        fetch("https://studioomfnapp.azurewebsites.net/studentList")
            .then(this.doStudentListResp)
            .catch (() => this.doStudentListError("failed to connect to server"))
    }

    doStudentListResp = (res: Response): void => {
        if (res.status === 200) {
            res.json().then(this.doStudentListJson)
               .catch(() => this.doStudentListError("200 response is not valid JSON"));
          } else if (res.status === 400) {
            res.text().then(this.doStudentListError)
               .catch(() => this.doStudentListError("400 response is not text"));
          } else {
            this.doStudentListError(`bad status code ${res.status}`);
          }
    }

    doStudentListJson = (data: any): void => {
        if (!isRecord(data) || !Array.isArray(data.students)) {
            this.doStudentListError("Invalid data format");
            return;
        }

        const students: basicStudent[] = []
        for (let i=0; i<data.students.length; i++) {
            const name = data.students[i].name
            const id = data.students[i].id
            const student: basicStudent = {id: id, name: name}
            students.push(student)
        }
        
        this.setState({students: students, addingStudent: false})
    }

    doStudentListError = (msg: string): void => {
        console.error(`Error fetching /list: ${msg}`);
    }

}