import { Component } from "react";
import React from "react";
import title from "./assets/Rates title.png"
import X from "./assets/X symbol.png"
import montly from "./assets/Monthly passes.png"
import dropIn from "./assets/Drop in.png"
import student from "./assets/Student special.png"
import studentMonthly from "./assets/Student monthly.png"
import regularMontly from "./assets/regular monthly.png"
import studentDropIn from "./assets/Student drop in.png"
import regularDropIn from "./assets/Regular drop in.png"
import studentSpecial from "./assets/1 semester.png"

type PriceContentsProps = {
    onBackClick: () => void
}

export class PriceContents extends Component<PriceContentsProps, {}> {
    constructor(props: PriceContentsProps) {
        super(props);
    }

    render = (): JSX.Element => {
        return <div className="page-contents">
            <div className = "pageHeader">
                <div className="empty"></div>
                <img className="ratesTitle" src={title}/>
                <img className="close" src={X} onClick={this.props.onBackClick}/>
            </div>
            <div className="allTiers">
                <div className="tier">
                    <img className="tierTitle" src={montly}/>
                    <div className="innerTier">
                        <img src={regularMontly}/>
                        <img src={studentMonthly}/>
                    </div>
                    <div>
                        <li>Access to 40+ yoga classes & events</li>
                        <li>Lounge access to study/hangout</li>
                        <li>Plant-based food & drinks</li>
                        <li>1 week of FREE buddy pass</li>
                        <li>Special in-store discounts</li>
                        <li>Less than $4/class for regulars</li>
                        <li>Refer a friend & get $10 off</li>
                    </div>
                </div>
                <div className="tier">
                    <img className="tierTitle" src={dropIn}/>
                    <div className="innerTier">
                        <img src={regularDropIn}/>
                        <img src={studentDropIn}/>
                    </div>
                </div>
                <div className="tier">
                    <img className="tierTitle" src={student}/>
                    <div className="innerTier">
                        <img src={studentSpecial}/>
                        <div className="studentList">
                            <li>Access to 120+ classes & events</li>
                            <li>Lounge access to study/hangout</li>
                            <li>Plant-based food</li>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }  
}