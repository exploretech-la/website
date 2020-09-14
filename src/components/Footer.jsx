import React, { Component } from 'react';

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import LogoWithIcons from '../static/svg/logo-with-icons-white.svg';

export default class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <div className="footer-inner">
                    <div className="footer-item">
                        <img src={LogoWithIcons} className="logo-with-icons" alt="logo-with-icons" />
                    </div>
                    <div className="footer-item contact">
                        <div className="social-media">
                            <p>FIND US ON</p>
                            <div className="social-media-list">
                                <a className="social-media-link" href="https://www.facebook.com/exploretech.la/" target="_blank">
                                    <FaFacebook size="2em" />
                                </a>
                                <a className="social-media-link" href="https://www.instagram.com/exploretech.la/" target="_blank">
                                    <FaInstagram size="2em" />
                                </a>
                                <a className="social-media-link" href="https://www.linkedin.com/company/exploretech-la/" target="_blank">
                                    <FaLinkedin size="2em" />
                                </a>
                            </div> 
                        </div>
                        <div className="email">
                            <p>REACH US AT</p>
                            <p><a href="mailto:exploretechla@cs.ucla.edu" target="_blank">exploretechla@cs.ucla.edu</a></p>
                        </div>
                    </div>
                    <div className="footer-item">
                        <p>Made with <span role="img" aria-label="heart">❤️</span>in LA</p>
                    </div>
                </div>
            </div>
        );
    }
}
