import React, {Component} from "react";
import "./style.css"
import logo from "./assets/Logo.png"
import igIcon from "./assets/IG icon.png"
import mailIcon from "./assets/Envelope icon.png" 
import { ClassContents } from "./ClassContents";
import { AboutUsContents } from "./AboutUsContents";
import { PriceContents } from "./PriceContents";
import { StudioContents } from "./StudioContents";
import { FaqContents } from "./FaqContents";
import { LoginPage } from "./LoginPage";
import { AdminLandingPage } from "./AdminLandingPage";

type Page = "home" | "classes" | "prices" | "studio" | "about" | "faq" | "login"
type YogaAppState = {page: Page, loggedIn: boolean};

export class YogaApp extends Component<{}, YogaAppState> {
    constructor(props: {}) {
        super(props);
        this.state = {page: "home", loggedIn: false};
    }

    render = (): JSX.Element => {
        if (this.state.page === "home") {
            return <div>
            {this.renderHeader()}
                <div className="home-page-body">
                    <p className="class" onClick={this.doClassesClick}>CLASSES & EVENTS</p>
                    <p className="price" onClick={this.doPricesClick}>PRICES & PASSES</p>
                    <p className="studio" onClick={this.doStudioClick}>THE STUDIO</p>
                    <p className="about" onClick={this.doAboutClick}>ABOUT US</p>
                    <p className="faq" onClick={this.doFaqClick}>FAQS</p>
                </div>
            {this.renderFooter()}
          </div>;
        }
        if (this.state.page === "about") {
            return <div>
                {this.renderHeader()}
                <AboutUsContents/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "classes") {
            return <div>
                {this.renderHeader()}
                <ClassContents/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "prices") {
            return <div>
                {this.renderHeader()}
                <PriceContents/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "studio") {
            return <div>
                {this.renderHeader()}
                <StudioContents/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "faq") {
            return <div>
                {this.renderHeader()}
                <FaqContents/>
                {this.renderFooter()}
            </div>
        } if (this.state.page === "login" && !this.state.loggedIn) {
            return <div>
                <LoginPage onBackClick={this.doBackClick} 
                           onLoginClick={this.doLoginClick}/>
            </div>
        } if (this.state.page === "login" && this.state.loggedIn) {
            return <div>
               <AdminLandingPage onBackToHomeClick={this.doBackClick}/>
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
                <div className="description-bar-container">
                    <a href="https://www.instagram.com/studioomla/">
                        <img src={igIcon} alt="Instagram Logo" className="insta-logo"/>
                    </a> 
                    <div className="descriptions-container">
                        <hr/>
                        <div className="description-components-container">
                            <p>Yoga</p>
                            <p>Meditation</p>
                            <p>Wisdom</p>
                            <p>Connection</p>
                            <p onClick={this.doLoginPageClick}>Yoga</p>
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>
        );
    } 

    renderFooter = (): JSX.Element => {
        return (<div className="footer-container">
            <div><hr/></div>
            <div className="footer-info-container">
                <div className="left">
                    <p>(+1) 213-357-7323</p>
                    <img src={mailIcon} alt="email icon" className="mail-icon"/>
                </div>
                <p>2316 1/2 S Union Avenue, LA</p>
            </div>
        </div>)
    }

    doClassesClick = (): void => {
        this.setState({page: "classes"});
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
    }
}