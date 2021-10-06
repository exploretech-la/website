import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import GA from 'util/GoogleAnalytics';
// import HomePageSections from 'constants/HomePageSections';
import LogoWithIconGroup from 'static/svg/logo-navy-with-icon-group-white.svg';

const TeamApplicationLink = 'https://tinyurl.com/exploretechla2022application';
const InfoSessionSlidesLink = 'https://tinyurl.com/exploretechla2022slides';

export default class Hero extends Component {
    render() {
        return (
            <section className="Section Hero">
                <img src={LogoWithIconGroup} className="logo-with-icon-group" alt="logo-with-icon-group" />
                <div className="hero-content">
                    <h1 className="h1-title">Inspire the Future&nbsp;of&nbsp;Tech</h1>
                    <h2 className="h2-title">Inspire the Future&nbsp;of&nbsp;Tech</h2>
                    <p>Interested in joining our team?</p>
                    <p>Our 2022 applications are open!</p>
                    <p>Apply by Friday, October 8th at 11:59 PM PDT.</p>
                    <div className="hero-cta">
                        <Button variant="info" href={TeamApplicationLink} target='_blank' onClick={this._trackTeamApplicationClick}>
                            Apply now!
                        </Button>
                        <Button variant="light" href={InfoSessionSlidesLink} target='_blank' onClick={this._trackInfoSessionSlidesClick}>
                            Info session
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    _trackGetInvolvedClick() {
        GA.trackEvent({
            category: 'Hero',
            action: 'Click',
            label: 'Get Involved'
        });
    }

    _trackRegisterTodayClick() {
        GA.trackEvent({
            category: 'Hero',
            action: 'Click',
            label: 'Register Today'
        });
    }

    _trackLearnMoreClick() {
        GA.trackEvent({
            category: 'Hero',
            action: 'Click',
            label: 'Learn More'
        });
    }

    _trackTeamApplicationClick() {
        GA.trackEvent({
            category: 'Hero',
            action: 'Click',
            label: 'Team Application'
        });
    }

    _trackInfoSessionSlidesClick() {
        GA.trackEvent({
            category: 'Hero',
            action: 'Click',
            label: 'Info Session'
        });
    }
}
