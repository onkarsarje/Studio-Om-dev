import { Component } from "react";
import React from "react";
import "./style.css"
import moreButton from "./assets/Asset 15.png";
import title from "./assets/Asset 31.png"
import X from "./assets/X symbol.png"

type Event = {
    name: string,
    summary: string,
    url: string,
    photoUrl: string
}

type EventContentsProps = {
    onBackClick: () => void
}

type EventContentsState = {
    events: Event[] | undefined;
}

export class EventsContents extends Component<EventContentsProps, EventContentsState> {
    constructor(props: EventContentsProps) {
        super(props);
        this.state = {events: undefined};
    }

    componentDidMount(): void {
        this.getEvents();
    }

    render = (): JSX.Element => {
        if (this.state.events === undefined) {
            return <div>Loading . . .</div>
        }
        return <div className="page-contents">
            <div className = "pageHeader">
                <div className="empty"></div>
                <img className="pageTitle" src={title}/>
                <img className="close" src={X} onClick={this.props.onBackClick}/>
            </div>
            <div className="eventCards">
                {this.renderEventCards()}
            </div>
        </div>;
    }
    
    renderEventCards = (): JSX.Element[] => {
        const eventsList: JSX.Element[] = []

        if (this.state.events) {
            for (let i = 0; i < this.state.events.length; i++) {
                const event: Event = this.state.events[i];
    
                eventsList.push(
                    <div className="eventCard" key={i}>
                        <img src={event.photoUrl} className="eventPhoto"/>
                        <p className="eventTitle">{event.name.toUpperCase()}</p>
                        <p className="eventDesc">{event.summary}...</p>
                        <a href={event.url} target="_blank" className="more"><img src={moreButton} className="moreImg"/></a>
                    </div>
                );
            }
        }
    
        return eventsList;
    }

    getEvents = (): void => {
        fetch("https://www.eventbriteapi.com/v3/organizations/2217949803553/events/?time_filter=current_future&token=GZMR76BFPS3GGJXTB7CV")
            .then(this.doEventsResp)
            .catch(() => this.doEventsError("failed to connect to server"));
    }

    doEventsResp = (res: Response): void => {
        if (res.status === 200) {
            res.json()
                .then(this.doEventsJson)
                .catch(() => this.doEventsError("200 response is not valid JSON"));
        } else if (res.status === 400) {
            res.text()
                .then(this.doEventsError)
                .catch(() => this.doEventsError("400 response is not text"));
        } else {
            this.doEventsError(`bad status code ${res.status}`);
        }
    };

    doEventsJson = (data: any): void => {
        const events: Event[] = [];
        for (let i = 0; i < data.events.length; i++) {
            const name = data.events[i].name.text;
            const summary = data.events[i].summary;
            const url = data.events[i].url;
            const photoUrl = data.events[i].logo.original.url;

            const event: Event = {name: name, summary: summary, url: url, photoUrl: photoUrl};
            events.push(event)
        }

        this.setState({events: events});
    };

    doEventsError = (msg: string): void => {
        console.error(`Error fetching events list: ${msg}`);
    };

}