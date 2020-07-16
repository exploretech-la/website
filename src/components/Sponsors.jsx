import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { LargeLogoSponsors, SmallLogoSponsors } from 'constants/sponsors';

export default class Sponsors extends Component {

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
        const largeLogos = LargeLogoSponsors.map(logo => this._renderLogo(logo));
        const smallLogos = SmallLogoSponsors.map(logo => this._renderLogo(logo));

        const classnames = classNames('Sponsors', this.props.className);

        return (
            <div className={classnames}>
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

    _renderLogo(logo) {
        if (!logo || !logo.name || !logo.src) return null;
        const { name, src } = logo;
        return (
            <div className="logo-container" key={name}>
                <img src={src} className="logo" alt={name} />
            </div>
        );
    }
}
