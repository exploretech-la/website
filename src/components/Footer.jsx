import React, { Component } from 'react';
import ReactGA from 'react-ga';

import { FaFacebook, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

import LogoWithIcons from '../static/svg/logo-with-icons-white.svg';

const facebookLink = "https://www.facebook.com/exploretech.la/";
const instagramLink = "https://www.instagram.com/exploretech.la/";
const linkedinLink = "https://www.linkedin.com/company/exploretech-la/";

export default class Footer extends Component {
    render() {
        return (
            <section className="Section Footer">
                <div className="footer-inner">
                    <div className="footer-item logo">
                        <img src={LogoWithIcons} className="logo-with-icons" alt="logo-with-icons" />
                    </div>
                    <div className="footer-item social-media">
                        <p>FIND US ON</p>
                        <div className="social-media-list">
                            <ReactGA.OutboundLink className="social-media-link" to={facebookLink} target="_blank" eventLabel="facebook">
                                <FaFacebook size="2em" />
                            </ReactGA.OutboundLink>
                            <ReactGA.OutboundLink className="social-media-link" to={instagramLink} target="_blank" eventLabel="instagram">
                                <FaInstagram size="2em" />
                            </ReactGA.OutboundLink>
                            <ReactGA.OutboundLink className="social-media-link" to={linkedinLink} target="_blank" eventLabel="linkedin">
                                <FaLinkedin size="2em" />
                            </ReactGA.OutboundLink>
                        </div> 
                    </div>
                    <div className="footer-item email">
                        <p>REACH US AT</p>
                        <p><ReactGA.OutboundLink to="mailto:exploretechla@cs.ucla.edu" target="_blank" eventLabel="email_us_footer">exploretechla@cs.ucla.edu</ReactGA.OutboundLink></p>
                    </div>
                    <div className="footer-item">
                        <p>Made with <FaHeart className="FaHeart" /> in LA</p>
                    </div>
                </div>
            </section>
        );
    }
}
