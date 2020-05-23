import React, { Component } from 'react';

import MicrosoftVRDemo from '../static/images/microsoft-vr-demo.jpg';

export default class About extends Component {
    render() {
        return (
            <div className="About">
                <div className="about-container">
                    <h3 className="section-title">What is exploretech.la?</h3>
                    <div className="about-content">
                        <p>exploretech.la is an annual event held at UCLA that aims to inspire high school students from underserved communities in the Greater Los Angeles Area to explore computer science, engineering, and technology.</p>
                        <p>Through our panels, interactive workshops, exhibitor booths, and partnerships with industry and academic organizations, we introduce students to the larger applications of tech outside the classroom.</p>
                    </div>
                </div>
                <img src={MicrosoftVRDemo} className="workshop-photo" alt="workshop-photo" />
            </div>
        );
    }
}
