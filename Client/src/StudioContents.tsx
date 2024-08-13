import { Component } from "react";
import React from "react";
import yoga from "./assets/yoga space.jpg"
import reception from "./assets/reception.jpg"
import lounge from "./assets/lotus lounge.jpg"

type StudioContentsProps = {
    onBackClick: () => void
}

export class StudioContents extends Component<StudioContentsProps, {}> {
    constructor(props: StudioContentsProps) {
        super(props);
    }

    render = (): JSX.Element => {
        return <div className="page-contents">
            <div className="titleS">
                <p>THE STUDIO</p>
                <button onClick={this.props.onBackClick} className="close-buttonS">X</button>
            </div>
            <div className="studioDescription">
            CHECK OUT OUR STUDIO SPACES BELOW! OUR YOGA SPACE IS OUR BIG LIGHT FILLED 
            ROOM FOR YOGA BY DAY AND MANTRA PARTIES BY NIGHT. THE WARM SUNRISE WALLS 
            TINT THE LOTUS LOUNGE WITH A GOLDEN HUE ALL DAY. MAKE THE LOUNGE YOUR SPACE FOR 
            LOUNGING BEFORE OR AFTER CLASS, OR GRAB A SNACK OR DRINK FROM OUR DRY BAR IN 
            THE EVENINGS.
            </div>
            <div className="cards">
                <div className="card">
                    <h1>YOGA SPACE</h1>
                    <img src={yoga} className="studioPhoto"/>
                </div>
                <div className="card">
                    <h1>RECEPTION</h1>
                    <img src={reception} className="studioPhoto"/>
                </div>
                <div className="card">
                    <h1>THE LOTUS LOUNGE</h1>
                    <img src={lounge} className="studioPhoto"/>
                </div>
            </div>
        </div>;
    }  
}