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
                                <FaFacebook className="social-media-icon" size="2em" />
                                <FaInstagram className="social-media-icon" size="2em" />
                                <FaLinkedin className="social-media-icon" size="2em" />
                            </div> 
                        </div>
                        <div className="email">
                            <p>REACH US AT</p>
                            <p><a href="mailto:info@exploretech.la">info@exploretech.la</a></p>
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
