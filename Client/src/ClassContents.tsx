import React from "react";
import { Component } from "react";
import title from "./assets/Asset 32.png";
import X from "./assets/X symbol.png";
import tue from "./assets/Asset 34.png"
import wed from "./assets/Asset 35.png"
import fri from "./assets/Asset 36.png"
import sat from "./assets/Asset 37.png"
import sun from "./assets/Asset 5.png"


type ClassContentsProps = {
    onBackClick: () => void
}

type ClassContentsState = {
    day: "t" | "w" | "f" | "s" | "su"
}

export class ClassContents extends Component<ClassContentsProps, ClassContentsState> {
    constructor(props: ClassContentsProps) {
        super(props);
        this.state = {day: "t"}
    }

    render = (): JSX.Element => {
        return <div className="page-contents">
            <div className = "pageHeader">
                <div className="empty"></div>
                <img className="classesTitle" src={title}/>
                <img className="close" src={X} onClick={this.props.onBackClick}/>
            </div>
            {this.renderDay()}
        </div>;
    }  

    renderDay = (): JSX.Element => {
        if (this.state.day === "w") {
            return <div>
                <div className="days">
                    <img src={tue} onClick={this.doTClick} className="tue"/>
                    <img src={wed} onClick={this.doWClick} className="wed" id = "selected"/>
                    <img src={fri} onClick={this.doFClick} className="fri"/>
                    <img src={sat} onClick={this.doSClick} className="sat"/>
                    <img src={sun} onClick={this.doSuClick} className="sun"/>
                </div>
                <div className="classes">
                    <div className="classCard">
                        <div>
                            <p>5 PM</p>
                        </div>
                        <p>YOGA FOR STRENGTH</p>
                        <p>Strong body = strong mind. A hatha vinyasa flow with a focus on muscle work, holding poses and challenging the mind's obstacles. </p>
                    </div>
                    <div className="classCard">
                        <div>
                            <p>6 PM</p>
                        </div>
                        <p>YOGA FOR BALANCE</p>
                        <p> Feel grounded in your mind and body with this all-over hatha vinyasa flow for balance.</p>
                    </div>
                    <div className="classCard">
                        <div>
                            <p>7.30 PM</p>
                        </div>
                        <p>BEST-SELF WORKSHOPS</p>
                        <p>Workshops designed to empower you through creativity, knowledge, expression, mindful insights, psychology and inspiration. We invite new speakers, teachers and guides every week to host workshops and help you unlock your best-self.</p>
                    </div>
                </div>
            </div>
        }
    
        else if (this.state.day === "t") {
            return <div>
                <div className="days">
                    <img src={tue} onClick={this.doTClick} className="tue" id = "selected"/>
                    <img src={wed} onClick={this.doWClick} className="wed"/>
                    <img src={fri} onClick={this.doFClick} className="fri"/>
                    <img src={sat} onClick={this.doSClick} className="sat"/>
                    <img src={sun} onClick={this.doSuClick} className="sun"/>
                </div>
                <div className="classes">
                    <div className="classCard">
                        <div>
                            <p>5 PM</p>
                        </div>
                        <p>YOGA FOR CALMING</p>
                        <p>Slow down, move calmly and breathe deeply to reset the nervous system in this all-levels hatha vinyasa class.</p>
                    </div>
                    <div className="classCard">
                        <div>
                            <p>6 PM</p>
                        </div>
                        <p>YOGA FOR ENERGY</p>
                        <p>Flow with focus and build energy and endurance in this more quick-paced hatha vinyasa class.</p>
                    </div>
                    <div className="classCard">
                        <div>
                            <p>7.30 PM</p>
                        </div>
                        <p>SELF CARE X SOUND</p>
                        <p>Take time to invest in loving yourself through our Soundbaths which combine yoga nidra and sound frequency healing to help you reset and deeply relax. A unique new theme every week.</p>
                    </div>
                </div>
            </div>
        }
    
        else if (this.state.day === "f") {
            return <div>
                <div className="days">
                    <img src={tue} onClick={this.doTClick} className="tue"/>
                    <img src={wed} onClick={this.doWClick} className="wed"/>
                    <img src={fri} onClick={this.doFClick} className="fri" id = "selected"/>
                    <img src={sat} onClick={this.doSClick} className="sat"/>
                    <img src={sun} onClick={this.doSuClick} className="sun"/>
                </div>
                <div className="classes">
                    <div className="classCard">
                        <div>
                            <p>6 PM</p>
                        </div>
                        <p>YOGA FOR GOOD VIBES</p>
                        <p>Release stress and muscle tension and harness positivity in this all-levels hatha vinyasa flow.</p>
                    </div>
                </div>
            </div>
        }
        else if (this.state.day === "su") {
            return <div>
                <div className="days">
                    <img src={tue} onClick={this.doTClick} className="tue"/>
                    <img src={wed} onClick={this.doWClick} className="wed"/>
                    <img src={fri} onClick={this.doFClick} className="fri"/>
                    <img src={sat} onClick={this.doSClick} className="sat"/>
                    <img src={sun} onClick={this.doSuClick} className="sun" id = "selected"/>
                </div>
                <div className="classes">
                    <div className="classCard">
                        <div>
                            <p>7.30 PM</p>
                        </div>
                        <p>SOULFEAST</p>
                        <p>A conscious night lounge event combining mantra music meditation (kirtan) with wisdom talks and a delicious plant-based dinner and dessert.</p>
                    </div>
                </div>
            </div>
        }
        else {
            return <div>
                <div className="days">
                    <img src={tue} onClick={this.doTClick} className="tue"/>
                    <img src={wed} onClick={this.doWClick} className="wed"/>
                    <img src={fri} onClick={this.doFClick} className="fri"/>
                    <img src={sat} onClick={this.doSClick} className="sat" id = "selected"/>
                    <img src={sun} onClick={this.doSuClick} className="sun"/>
                </div>
                <div className="classes">
                    <div className="classCard">
                        <div>
                            <p>10 AM</p>
                        </div>
                        <p>YOGA FOR PRESENCE</p>
                        <p> Discover yourself in the present moment. Begin with grounding breathwork and move up to a peak flow and deep stretch in this all-levels hatha vinyasa flow.</p>
                    </div>
                    <div className="classCard">
                        <div>
                            <p>11 AM</p>
                        </div>
                        <p>YOGA FOR DEEP STRETCH DETOX</p>
                        <p>Release tension and align the body in this deep-stretch restorative class. From athlete's to beginners, this class will help relieve and prevent chronic pain caused by tight muscles.</p>
                    </div>
                    <div className="classCard">
                        <div>
                            <p>12 PM</p>
                        </div>
                        <p>HIIT YOGA FUSION</p>
                        <p>Combining the power of High Intensity Interval Training with the flow-like feel of a yoga class. Challenge yourself and walk out feeling stronger and more alive than ever.</p>
                    </div>
                </div>
            </div>
        }
    }
    

    doTClick = (): void => {
        this.setState({day: "t"})
    }

    doWClick = (): void => {
        this.setState({day: "w"})
    }

    doFClick = (): void => {
        this.setState({day: "f"})
    }

    doSClick = (): void => {
        this.setState({day: "s"})
    }

    doSuClick = (): void => {
        this.setState({day: "su"})
    }
}