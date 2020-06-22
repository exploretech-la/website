import React, { Component, Fragment } from 'react';

import { LargeLogoSponsors, SmallLogoSponsors } from 'constants/sponsors';

export default class Sponsors extends Component {
    render() {
        const largeLogos = LargeLogoSponsors.map(logo => this._renderLogo(logo.name, logo.src));
        const smallLogos = SmallLogoSponsors.map(logo => this._renderLogo(logo.name, logo.src));

        return (
            <div className="Sponsors">
                <div className="sponsors-container">
                    <div className="sponsors-header">
                        <h3>Our Sponsors</h3>
                        <div className="pill-divider" />
                    </div>
                    <div className="large-logos">
                        {largeLogos}
                    </div>
                    <div className="small-logos">
                        {smallLogos}
                    </div>
                </div>
            </div>
        );
    }

    _renderLogo(name, src) {
        return (
            <div className="logo-container" key={name}>
                <img src={src} className="logo" alt={name} />
            </div>
        );
    }
}
