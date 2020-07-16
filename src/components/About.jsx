import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MicrosoftVRDemo from '../static/images/microsoft-vr-demo.jpg';
import TeamPhoto from '../static/images/team-photo-2020.jpg';

export default class About extends Component {

    static get propTypes() {
        return {
            className: PropTypes.string,
        }
    }

    static get defaultProps() {
        return {
            className: '',
        };
    }

    render() {
        const classnames = classNames('About', this.props.className);

        return (
            <div className={classnames}>
                <div className="about-content about-org">
                    <div className="left-column">
                        <h3 className="section-title">What is exploretech.la?</h3>
                        <div className="pill-divider" />
                        <div className="about-description">
                            <p>exploretech.la is an annual event at UCLA that aims to inspire high school students from underserved communities in the Greater Los Angeles Area to explore computer science, engineering, and technology.</p>
                            <p>In partnership with industry and academic organizations, our event introduce students to the various applications of tech through our panels, interactive workshops, and exhibition hall.</p>
                        </div>
                    </div>
                    <img src={MicrosoftVRDemo} className="workshop-photo right-column" alt="workshop-photo" />
                </div>
                <div className="about-content about-team">
                    <img src={TeamPhoto} className="team-photo left-column" alt="team-photo" />
                    <div className="right-column">
                        <h3 className="section-title">Our Team</h3>
                        <div className="pill-divider" />
                        <p>Founded in 2017 as student organization at UCLA, exploretech.la is run by students for students. We apply our insights as recent high school graduates and current college students to create engaging and impactful learning experiences for our younger peers.</p>
                    </div>
                </div>
            </div>
        );
    }
}
