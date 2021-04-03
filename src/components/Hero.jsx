import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import GA from 'util/GoogleAnalytics';
import HomePageSections from 'constants/HomePageSections';
import LogoWithIconGroup from 'static/svg/logo-navy-with-icon-group-white.svg';

export default class Hero extends Component {
    render() {
        return (
            <section className="Section Hero">
                <img src={LogoWithIconGroup} className="logo-with-icon-group" alt="logo-with-icon-group" />
                <div className="hero-content">
                    <h1 className="h1-title">Inspire the Future&nbsp;of&nbsp;Tech</h1>
                    <h2 className="h2-title">Inspire the Future&nbsp;of&nbsp;Tech</h2>
                    <p>Hosted virtually April 10-11, 2021</p>
                    <p>10:00AM - 1:30PM PDT</p>
                    <p>University of California, Los Angeles</p>
                    <div className="hero-cta">
                        <Button variant="info" href={`/register`} onClick={this._trackRegisterTodayClick}>
                            Register Today!
                        </Button>
                        <Button variant="light" href={`#${HomePageSections.ABOUT.name}`} onClick={this._trackLearnMoreClick}>
                            Learn More
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
}
