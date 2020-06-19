import React, { Component } from 'react';

import MicrosoftVRDemo from '../static/images/microsoft-vr-demo.jpg';
import TeamPhoto from '../static/images/team-photo-2020.jpg';

export default class About extends Component {
    render() {
        return (
            <div className="About">
                <div className="about-content about-org">
                    <div className="left-column">
                        <h3 className="section-title">What is exploretech.la?</h3>
                        <div className="pill-divider" />
                        <div className="about-description">
                            <p>exploretech.la is an annual event that aims to inspire high school students from underserved communities in the Greater Los Angeles Area to explore computer science, engineering, and technology.</p>
                            <p>Through our panels, interactive workshops, and exhibition hall, we introduce students to the larger applications of tech outside the classroom.</p>
                        </div>
                    </div>
                    <img src={MicrosoftVRDemo} className="workshop-photo right-column" alt="workshop-photo" />
                </div>
                <div className="about-content about-team">
                    <img src={TeamPhoto} className="team-photo left-column" alt="team-photo" />
                    <div className="right-column">
                        <p>Founded in 2017, exploretech.la started as an idea to increase access to computer science education in underserved communities. In partnership with industry, academic, and student organizations, we bring students to UCLA to explore the various applications of technology outside the classroom.</p>
                        <p>As a student organization at UCLA, our event is run by students for students. We apply our recent time as high school students and our current experience as college students to ensure our content is engaging and impactful for our younger peers.</p>
                    </div>
                </div>
            </div>
        );
    }
}
