import React, {Component} from "react";
import "./style.css"
import logo from "./assets/Asset 6.png"
import igIcon from "./assets/Asset 3.png"
import mailIcon from "./assets/Asset 4.png" 
import { ClassContents } from "./ClassContents";
import { AboutUsContents } from "./AboutUsContents";
import { PriceContents } from "./PriceContents";
import { ContactContents } from "./ContactContents";
import { FaqContents } from "./FaqContents";
import { LoginPage } from "./LoginPage";
import { AdminLandingPage } from "./AdminLandingPage";
import loginIcon from "./assets/Asset 2.png"
import { SignUpPage } from "./SignUpPage";
import description from "./assets/Asset 1.png"
import classesIcon from "./assets/classes.png"
import eventsIcon from "./assets/events.png"
import ratesIcon from "./assets/rates.png"
import contactIcon from "./assets/for menu.png"
import faqIcon from "./assets/faqs.png"
import aboutIcon from "./assets/about us.png"
import { EventsContents } from "./EventsContent";

type Page = "home" | "classes" | "prices" | "studio" | "about" | "faq" | "login" | "signup" | "payment" | "events"
type YogaAppState = {page: Page, loggedIn: boolean};

export class YogaApp extends Component<{}, YogaAppState> {
    constructor(props: {}) {
        super(props);
        this.state = {page: "home", loggedIn: false};
    }

    render = (): JSX.Element => {
        if (this.state.page === "home") {
            return <div id="main">
            {this.renderHeader()}
                <div className="home-page-body">
                    <div className="homePages">
                        <div className="sidebyside">
                            <img src={classesIcon} className="class" onClick={this.doClassesClick}/>
                            <img src={eventsIcon} className="events" onClick={this.doEventsClick}/>
                        </div>
                        <img src={ratesIcon} className="price" onClick={this.doPricesClick}/>
                        <img src={contactIcon} className="contact" onClick={this.doStudioClick}/>
                        <div className="sidebyside">
                            <img src={faqIcon} className="faq" onClick={this.doFaqClick}/>
                            <img src={aboutIcon} className="about" onClick={this.doAboutClick}/>
                        </div >
                    </div>
                </div>
            {this.renderFooter()}
          </div>;
        }
        if (this.state.page === "about") {
            return <div id="main">
                {this.renderHeader()}
                <AboutUsContents onBackClick={this.doBackClick}/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "classes") {
            return <div id="main">
                {this.renderHeader()}
                <ClassContents onBackClick={this.doBackClick}/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "events") {
            return <div id="main">
                {this.renderHeader()}
                <EventsContents onBackClick={this.doBackClick}/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "prices") {
            return <div id="main">
                {this.renderHeader()}
                <PriceContents onBackClick={this.doBackClick}/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "studio") {
            return <div id="main">
                {this.renderHeader()}
                <ContactContents onBackClick={this.doBackClick}/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "faq") {
            return <div id="main">
                {this.renderHeader()}
                <FaqContents onBackClick={this.doBackClick}/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "login" && !this.state.loggedIn) {
            return <div>
                <LoginPage onBackClick={this.doBackClick} 
                           onLoginClick={this.doLoginClick}
                           onSignUpClick={this.doSignUpClick}/>
            </div>
        } if (this.state.page === "login" && this.state.loggedIn) {
            return <div>
               <AdminLandingPage onBackToHomeClick={this.doBackClick}/>
            </div>
        } if (this.state.page === "signup" && !this.state.loggedIn) {
            return <div>
                <SignUpPage onBackClick={this.doBackClick}
                            onLoginClick={this.doLoginPageClick}/>
            </div>
        } else {
            throw new Error("How did u even get here u hacker >:(");
       }
    }

    renderHeader = (): JSX.Element => {
        return (
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt="Studio OM Logo" className="logo" onClick={this.doBackClick}/>
                </div>
                <div className="description-bar-container" id="hidden">
                    <a href="https://www.instagram.com/studioomla/" target="_blank">
                        <img src={igIcon} alt="Instagram Logo" className="insta-logo"/>
                    </a> 
                    <div className="descriptions-container">
                        <hr/>
                            <img className="descriptions" src= {description}/>
                        <hr/>
                    </div>
                    <img className="loginIcon" src= {loginIcon} onClick={this.doLoginPageClick}/>
                </div>
                <div className="description-bar-container" id="hidden1">
                    <hr/>
                    <p>2316 1/2 S UNION AVE, SUITE 1, LOS ANGELES</p>
                    <hr/>
                </div>
            </div>
        );
    } 

    renderFooter = (): JSX.Element => {
        return (<div className="footer-container">
            <hr/> 
            <div className="footer-info-container" id="hidden">
                <div className="left">
                    <p>(+1) 213-357-7323</p>
                    <a href="mailto: Studio.om.losangeles@gmail.com">
                        <img src={mailIcon} alt="email icon" className="mail-icon"/>
                    </a>
                </div>
                <div className="right">
                    <p>2316 1/2 S Union Ave, Suite 1, Los Angeles</p>
                </div>
            </div>
            <div className="footer-info-container" id="hidden1">
                <p>(+1) 213-357-7323</p>
                <div className="left">
                    <a href="https://www.instagram.com/studioomla/" >
                        <img src={igIcon} alt="Instagram Logo" className="insta-logo"/>
                    </a>
                    <a href="mailto: Studio.om.losangeles@gmail.com">
                        <img src={mailIcon} alt="email icon" className="mail-icon"/>
                    </a>
                </div>
            </div>
        </div>)
    }

    doSignUpClick = (): void => {
        this.setState({page: "signup"});
    }

    doClassesClick = (): void => {
        this.setState({page: "classes"});
    }

    doEventsClick = (): void => {
        this.setState({page: "events"});
    }

    doPricesClick = (): void => {
        this.setState({page: "prices"});
    }

    doStudioClick = (): void => {
        this.setState({page: "studio"});
    }

    doAboutClick = (): void => {
        this.setState({page: "about"});
    }

    doFaqClick = (): void => {
        this.setState({page: "faq"});
    }

    doBackClick = (): void => {
        this.setState({page: "home"});
    }

    doLoginPageClick = (): void => {
        this.setState({page: "login"});
    }

    doLoginClick = (): void => {
        this.setState({loggedIn: true});
        console.log(this.state.loggedIn)
        console.log(this.state.page)
    }

    doContinueClick = (): void => {
        this.setState({page: "payment"})
    }
}