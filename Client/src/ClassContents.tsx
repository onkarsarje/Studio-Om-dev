import React from "react";
import { Component } from "react";

export class ClassContents extends Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render = (): JSX.Element => {
        return <div className="page-contents">This is the classes and events page!</div>;
    }  
}