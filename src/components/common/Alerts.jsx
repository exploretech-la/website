import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default class Alerts extends Component {
    render() {
        return (
            <section className="Section Alerts">
                <div className="alerts-container">
                    {this._getAlert()}
                </div>
            </section>
        );
    }

    _getAlert() {
        return (
            <Alert className="team-application-alert" variant='info'>
                <Alert.Heading><b>{this.props.title}</b></Alert.Heading>
                {this.props.messages.map(message => <p>{message}</p>)}
                <hr />
                <div className="buttons">
                    <div className="button">
                        <Button variant='outline-info' href={this.props.primaryLink} target='_blank'>
                            {this.props.primaryText}
                        </Button>
                    </div>
                    {this.props.secondaryLink && 
                        (<div className="button">
                            <Button variant='light' href={this.props.secondaryLink} target='_blank'>
                                {this.props.secondaryText}
                            </Button>
                        </div>
                    )}
                </div>
            </Alert>
        );
    }

    _trackTeamApplicationClick() {
        ReactGA.outboundLink({
            label: 'Team Application'
        }, () => {});
    }

    _trackInfoSessionSlidesClick() {
        ReactGA.outboundLink({
            label: 'Info Session'
        }, () => {});
    }
}
