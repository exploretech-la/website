import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const TeamApplicationLink = 'https://tinyurl.com/exploretechla2022application';
const InfoSessionSlidesLink = 'https://tinyurl.com/exploretechla2022slides';

export default class Alerts extends Component {
    render() {
        return (
            <section className="Section Alerts">
                <div className="alerts-container">
                    {this._getTeamApplicationAlert()}
                </div>
            </section>
        );
    }

    _getTeamApplicationAlert() {
        return (
            <Alert className="team-application-alert" variant='info'>
                <Alert.Heading>UCLA Students: Content & Operations Team applications are open!</Alert.Heading>
                <p>
                    Interested in joining our team? Our 2022 team applications are now open!
                    Apply by Friday, October 8th at 11:59 PM PDT.
                </p>
                <hr />
                <div className="buttons">
                    <div className="button">
                        <Button variant='info' href={TeamApplicationLink} target='_blank' onClick={this._trackTeamApplicationClick}>
                            Apply now!
                        </Button>
                    </div>
                    <div className="button">
                        <Button variant='light' href={InfoSessionSlidesLink} target='_blank' onClick={this._trackInfoSessionSlidesClick}>
                            Info Session
                        </Button>
                    </div>
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
