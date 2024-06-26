import { Component } from "react";
import React from "react";

export class PriceContents extends Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render = (): JSX.Element => {
        return <div className="page-contents">This is the pricing and passes page!</div>;
    }  
}