import { Component } from "react";
import React from "react";

export class StudioContents extends Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render = (): JSX.Element => {
        return <div className="page-contents">This is the about the studio page!</div>;
    }  
}