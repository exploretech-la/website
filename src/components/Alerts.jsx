import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const TeamApplicationLink = 'https://forms.gle/hK69nfPBghkbXwVY6';

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
                <Alert.Heading>UCLA Students: Team applications are open!</Alert.Heading>
                <p>
                    Interested in joining our team? Our 2021 team applications are now open!
                    Apply by Saturday, October 17th at 11:59 PM PDT.
                </p>
                <hr />
                <Button variant='outline-info' href={TeamApplicationLink} target='_blank' onClick={this._trackTeamApplicationClick}>
                    Apply now!
                </Button>
            </Alert>
        );
    }

    _trackTeamApplicationClick() {
        ReactGA.outboundLink({
            label: 'Team Application'
        }, () => {});
    }
}
