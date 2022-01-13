import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactGA from 'react-ga';

import { MdKeyboardArrowRight } from 'react-icons/md';

import HomePageSections from 'constants/HomePageSections';
import { LargeLogoSponsors, SmallLogoSponsors } from 'constants/sponsors';
// import { CommunityPartners } from 'constants/community-partners';

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

        // const commPartnerLogos = CommunityPartners.map(logo => this._renderLogo(logo));

        const classNames = classnames('Section', 'Sponsors', this.props.className);

        return (
            <section className={classNames} id={HomePageSections.SPONSORS.name}>
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
                    {/* <div className="sponsors-header">
                        <h3>Our Community Partners</h3>
                        <div className="pill-divider" />
                    </div>
                    <div className="small-logos">
                        {commPartnerLogos}
                    </div> */}
                    <div className="sponsor-contact">
                        <h5>Interested in sponsoring?</h5>
                        <div className="sponsor-cta">
                            <ReactGA.OutboundLink to="mailto:exploretechla@cs.ucla.edu" target="_blank" eventLabel="email_us_sponsors">
                                <p>Email Us!</p>
                                <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                            </ReactGA.OutboundLink>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    _renderLogo(logo) {
        if (!logo || !logo.name || !logo.src) return null;
        const { name, src, website } = logo;
        return (
            <div className="logo-container" key={name}>
                <ReactGA.OutboundLink to={website} target="_blank" eventLabel={name}>
                    <img src={src} className="logo" alt={name} />
                </ReactGA.OutboundLink>
            </div>
        );
    }
}
