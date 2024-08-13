import React, { Component, ChangeEvent } from "react";
import { basicStudent } from "./Student";
import { AdminStudentPage } from "./AdminStudentPage";
import { isRecord } from "./record";
import { AdminAddNewStudentPage } from "./AdminAddNewStudentPage";
import logo from "./assets/Asset 6.png";
import "./style.css";

type AdminLandingPageProps = {
    onBackToHomeClick: () => void;
};

type AdminLandingPageState = {
    students: basicStudent[] | undefined;
    filteredStudents: basicStudent[] | undefined;
    page: "landing" | { kind: "student"; id: number } | "new";
    addingStudent: boolean;
    searchQuery: string;
    sortKey: "name" | "phone";
};

export class AdminLandingPage extends Component<AdminLandingPageProps, AdminLandingPageState> {
    constructor(props: AdminLandingPageProps) {
        super(props);
        this.state = {
            students: undefined,
            filteredStudents: undefined,
            page: "landing",
            addingStudent: false,
            searchQuery: "",
            sortKey: "name",
        };
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
            return <p>Loading . . .</p>;
        } else {
            if (this.state.page === "landing") {
                return (
                    <div className="landingCont">
                        <div className="leftLanding">
                            <p>STUDENTS:</p>
                            <div className="studentContainer">{this.renderStudentsList()}</div>
                        </div>
                        <div className = "rightLanding">
                            <img src={logo} onClick={this.props.onBackToHomeClick} className="landingBack" />
                            <div className="searchContainer">
                            <p>SEARCH CURRENT STUDENTS</p>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={this.state.searchQuery}
                                    onChange={this.handleSearchChange}
                                    className="searchInput"
                                />
                                <select value={this.state.sortKey} onChange={this.handleSortChange} className="sortSelect">
                                    <option value="name">Sort by Name</option>
                                    <option value="phone">Sort by Phone</option>
                                </select>
                            </div>
                            <p>OR</p>
                            <button onClick={this.doAddNewStudentClick} className="Rbutton">
                                REGISTER NEW STUDENT
                            </button>
                        </div>
                    </div>
                );
            }
            if (this.state.page === "new") {
                return <AdminAddNewStudentPage onBackClick={this.doBackClick} />;
            } else {
                const id = this.state.page.id;
                return <AdminStudentPage onBackClick={this.doBackClick} id={id} />;
            }
        }
    };

    renderStudentsList = (): JSX.Element[] => {
        const studentsList: JSX.Element[] = [];
        const studentsToRender = this.state.filteredStudents || this.state.students;
        if (studentsToRender) {
            for (let i = 0; i < studentsToRender.length; i++) {
                const student = studentsToRender[i];
                studentsList.push(
                    <ul key={student.id}>
                        <a href="#" onClick={(evt) => this.doStudentClick(evt, student.id)}>
                            {student.name} - {student.phone}
                        </a>
                    </ul>
                );
            }
        }
        return studentsList;
    };

    handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const searchQuery = event.target.value.toLowerCase();
        this.setState(
            { searchQuery },
            this.filterAndSortStudents
        );
    };

    handleSortChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const sortKey = event.target.value as "name" | "phone";
        this.setState(
            { sortKey },
            this.filterAndSortStudents
        );
    };

    filterAndSortStudents = (): void => {
        if (!this.state.students) return;
        const { searchQuery, sortKey } = this.state;

        const filteredStudents = this.state.students.filter((student) => {
            return (
                student.name.toLowerCase().includes(searchQuery) ||
                student.phone.toLowerCase().includes(searchQuery)
            );
        });

        filteredStudents.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return -1;
            if (a[sortKey] > b[sortKey]) return 1;
            return 0;
        });

        this.setState({ filteredStudents });
    };

    doAddNewStudentClick = (): void => {
        this.setState({ page: "new" });
    };

    doStudentClick = (evt: React.MouseEvent<HTMLAnchorElement>, id: number): void => {
        evt.preventDefault();
        this.setState({ page: { kind: "student", id: id } });
    };

    doBackClick = (): void => {
        this.setState({ page: "landing", addingStudent: true });
    };

    doBackToHomeClick = (): void => {
        this.props.onBackToHomeClick();
    };

    doRefreshTimeout = (): void => {
        fetch("https://studioomfnapp.azurewebsites.net/studentList")
            .then(this.doStudentListResp)
            .catch(() => this.doStudentListError("failed to connect to server"));
    };

    doStudentListResp = (res: Response): void => {
        if (res.status === 200) {
            res.json()
                .then(this.doStudentListJson)
                .catch(() => this.doStudentListError("200 response is not valid JSON"));
        } else if (res.status === 400) {
            res.text()
                .then(this.doStudentListError)
                .catch(() => this.doStudentListError("400 response is not text"));
        } else {
            this.doStudentListError(`bad status code ${res.status}`);
        }
    };

    doStudentListJson = (data: any): void => {
        if (!isRecord(data) || !Array.isArray(data.students)) {
            this.doStudentListError("Invalid data format");
            return;
        }

        const students: basicStudent[] = [];
        for (let i = 0; i < data.students.length; i++) {
            const name = data.students[i].name;
            const id = data.students[i].id;
            const phone = data.students[i].phone;
            const student: basicStudent = { id: id, name: name, phone: phone };
            students.push(student);
        }

        this.setState({ students: students, filteredStudents: students, addingStudent: false });
    };

    doStudentListError = (msg: string): void => {
        console.error(`Error fetching /list: ${msg}`);
    };
}
