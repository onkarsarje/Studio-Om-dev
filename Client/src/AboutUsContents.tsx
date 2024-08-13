import { Component } from "react";
import React from "react";
import picture from "./assets/Asset 42.png"
import title from "./assets/Asset 41.png"
import X from "./assets/X symbol.png"

type AboutUsContentsProps = {
    onBackClick: () => void
}

export class AboutUsContents extends Component<AboutUsContentsProps, {}> {
    constructor(props: AboutUsContentsProps) {
        super(props);
    }

    render = (): JSX.Element => {
        return <div className="page-contents">
            <div className = "pageHeader">
                <div className="empty"></div>
                <img className="aboutTitle" src={title}/>
                <img className="close" src={X} onClick={this.props.onBackClick}/>
            </div>
            <div className="aboutContents">
                <p>Hiii we are Vraja & Kunja, the owners of Studio Om.</p>
                <div className="top">
                    <img className="aboutPicture" src={picture}/>
                    <div className="inside">
                        <p>Our vision is to create a space for young people in Los Angeles to care for their inner-wellbeing through yoga, soundbaths, empowering workshops & good food.</p>
                        <p>Not many people know it but yoga is grounded in the timeless science of Bhakti, wisdom for genuine self-growth, happiness and connection to the love supreme.</p>
                    </div>
                </div>
                <p>It’s our goal to combine these elements in a non-judgmental space where you can relax, be your authentic self, deepen your practice and feel connected in a community of like-minded people.</p>
                <p>See you in the studio soon xx</p>
            </div>
        </div>;
    }  
}