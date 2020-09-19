import React, { Component } from 'react';

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

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
                            <a className="social-media-link" href={facebookLink} target="_blank" rel="noopener noreferrer">
                                <FaFacebook size="2em" />
                            </a>
                            <a className="social-media-link" href={instagramLink} target="_blank" rel="noopener noreferrer">
                                <FaInstagram size="2em" />
                            </a>
                            <a className="social-media-link" href={linkedinLink} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size="2em" />
                            </a>
                        </div> 
                    </div>
                    <div className="footer-item email">
                        <p>REACH US AT</p>
                        <p><a href="mailto:exploretechla@cs.ucla.edu" target="_blank" rel="noopener noreferrer">exploretechla@cs.ucla.edu</a></p>
                    </div>
                    <div className="footer-item">
                        <p>Made with <span role="img" aria-label="heart">❤️</span>in LA</p>
                    </div>
                </div>
            </section>
        );
    }
}
