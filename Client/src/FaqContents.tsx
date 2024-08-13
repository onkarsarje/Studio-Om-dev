import { Component } from "react";
import React from "react";
import "./style.css"
import title from "./assets/Asset 30.png"
import X from "./assets/X symbol.png"

type FaqContentsProps = {
    onBackClick: () => void
}

type FaqContentsState = {
    q1: boolean,
    q2: boolean,
    q3: boolean,
    q4: boolean,
    q5: boolean,
    q6: boolean
}

export class FaqContents extends Component<FaqContentsProps, FaqContentsState> {
    constructor(props: FaqContentsProps) {
        super(props);
        this.state = {q1: false, q2: false, q3: false, q4: false, q5: false, q6: false}
    }

    render = (): JSX.Element => {
        return <div className="page-contents">
            <div className = "pageHeader">
                <div className="empty"></div>
                <img className="faqTitle" src={title}/>
                <img className="close" src={X} onClick={this.props.onBackClick}/>
            </div>
            <div className="questions">
                <div onClick={this.doQ1Click} className="question">WHAT LEVEL ARE YOUR YOGA CLASSES?</div>
                {this.renderQ1()}
                <div onClick={this.doQ2Click} className="question">DO YOU PROVIDE MATS?</div>
                {this.renderQ2()}
                <div onClick={this.doQ3Click} className="question">DO YOU HAVE A SHOWER IN THE STUDIO?</div>
                {this.renderQ3()}
                <div onClick={this.doQ4Click} className="question">CAN I HOST MY EVENT IN YOUR SPACE OR HIRE IT OUT?</div>
                {this.renderQ4()}
                <div onClick={this.doQ5Click} className="question">CAN I TEACH IN YOUR STUDIO?</div>
                {this.renderQ5()}
                <div onClick={this.doQ6Click} className="question">HOW CAN I VOLUNTEER/GET INVOLVED?</div>
                {this.renderQ6()}
            </div>
        </div>;
    }

    renderQ1 = (): JSX.Element => {
        if (this.state.q1) {
            return <div className="answer">ALL OF OUR YOGA TEACHERS ARE HERE TO CATER FOR ALL LEVELS, FROM BEGINNER TO ADVANCED.
                                            FOR EACH POSE WE OFFER VARIATIONS TO MEET YOU WHERE YOU'RE AT. IF YOU HAVE ANY INJURY OR MEDICAL CONDITIONS, 
                                            PLEASE NOTIFY THE TEACHER BEFORE CLASS.</div>
        }
        return <br></br>
    }

    renderQ2 = (): JSX.Element => {
        if (this.state.q2) {
            return <div className="answer">YES, WE HAVE 15 YOGA MATS AVAILABLE FOR $1 PURCHASE
                                            PER DROP-IN CLASS. MEMBERSHIP PASSES INCLUDE THE PRICE OF MAT HIRE.</div>
        }
        return <br></br>
    }

    renderQ3 = (): JSX.Element => {
        if (this.state.q3) {
            return <div className="answer">NO WE DO NOT HAVE A SHOWER AVAILABLE, BUT WE HAVE A RESTROOM WHERE YOU CAN GET
                                            CHANGED BEFORE OR AFTER CLASS.</div>
        }
        return <br></br>
    }

    renderQ4 = (): JSX.Element => {
        if (this.state.q4) {
            return <div className="answer">WE ARE ALWAYS OPEN TO COLLABORATIONS AND SHARING THE SPACE FOR OTHER CONSCIOUS EVENTS.
                                            JUST SEND US A MESSAGE WITH YOUR DETIALS AND WHAT YOU ARE INTERESTED IN DOING AND WE
                                            WILL GET BACK TO YOU AS SOON AS WE CAN.</div>
        }
        return <br></br>
    }

    renderQ5 = (): JSX.Element => {
        if (this.state.q5) {
            return <div className="answer">WE ARE A FULLY VOLUNTEER RUN STUDIO SO IF YOU HAVE THE VOLUNTEER SPIRIT WE'D LOVE TO HEAR FROM YOU!</div>
        }
        return <br></br>
    }

    renderQ6 = (): JSX.Element => {
        if (this.state.q6) {
            return <div className="answer">SEND US A MESSAGE! WE ARE ALWAYS HAPPY TO HEAR FROM PEOPLE WHO WANT TO HELP OUT IN ANYWAY POSSIBLE.</div>
        }
        return <br></br>
    }

    doQ1Click = (): void => {
        this.state.q1 ? this.setState({q1: false}) : this.setState({q1: true})
    }

    doQ2Click = (): void => {
        this.state.q2 ? this.setState({q2: false}) : this.setState({q2: true})
    }

    doQ3Click = (): void => {
        this.state.q3 ? this.setState({q3: false}) : this.setState({q3: true})
    }

    doQ4Click = (): void => {
        this.state.q4 ? this.setState({q4: false}) : this.setState({q4: true})
    }

    doQ5Click = (): void => {
        this.state.q5 ? this.setState({q5: false}) : this.setState({q5: true})
    }

    doQ6Click = (): void => {
        this.state.q6 ? this.setState({q6: false}) : this.setState({q6: true})
    }
}