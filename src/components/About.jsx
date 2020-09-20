import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Carousel from 'react-bootstrap/Carousel'
import { MdKeyboardArrowRight } from 'react-icons/md';

import HomePageSections from 'constants/HomePageSections';
import CaourselImages from 'constants/carousel';

import TeamPhoto from 'static/images/team-photo-2020.jpg';

const FoundingStoryLink = 'https://medium.com/@nathan_yang/5-reasons-why-i-loved-ucla-de9d0704126e';

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
        const classnames = classNames('Section', 'About', this.props.className);

        return (
            <section className={classnames} id={HomePageSections.ABOUT.name}>
                <div className="about-content about-org">
                    <div className="left-column text">
                        <div className="section-title">
                            <h3 className="title">What is exploretech.la?</h3>
                            <div className="pill-divider" />
                        </div>
                        <div className="about-description">
                            <p>exploretech.la is an annual event hosted by UCLA students that aims to inspire high school students from underserved communities in the Greater Los Angeles Area to explore computer science, engineering, and technology.</p>
                            <p>In partnership with industry and academic organizations, our event introduces students to the various applications of tech through our panels, interactive workshops, and exhibition hall.</p>
                        </div>
                    </div>
                    {this._renderCarousel({ className: 'right-column' })}
                </div>
                <div className="about-content about-team">
                    <img src={TeamPhoto} className="team-photo left-column" alt="Our Team" />
                    <div className="right-column text">
                        <div className="section-title">
                            <h3 className="title">Our Team</h3>
                            <div className="pill-divider" />
                        </div>
                        <p>
                            Founded in 2017 as student organization at UCLA, exploretech.la is run by students for students.
                            We apply our insights as recent high school graduates to create engaging and impactful learning experiences for our younger peers.
                            We believe that every student should have equal access to STEM education and opportunities.
                        </p>
                        <div className="founding-story">
                            <p><a href={FoundingStoryLink} target="_blank" rel="noopener noreferrer">Read about our founding story</a></p>
                            <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                        </div>
                    </div>
                </div>
                {this._getCovid19Update()}
            </section>
        );
    }

    _getCovid19Update() {
        return (
            <div className="about-content covid19-update">
                <div className="text">
                    <div className="section-title">
                        <h3 className="title">COVID-19 Update</h3>
                        <div className="pill-divider" />
                    </div>
                    <p>
                        With the ongoing pandemic, our team has decided to move exploretech.la 2021 to a virtual format for the safety of our attendees, partners, and staff members.
                        exploretech.la 2021 will be a virtual event with interactive, live-streamed activities that will take place over the course of two days.
                    </p>
                </div>
            </div>
        );
    }

    /**
     * WARNING: CaourselImages with different heights causes the Carousel to be buggy.
     * As of this comment being written, all the pre-selected images are the same height.
     * To fix this, we need to use images with all the same height or do some styling with
     * object-fit.
     */
    _renderCarousel({ className }) {
        const carouselItems = CaourselImages.map(img => this._renderCarouselItem(img))
        return (
            <Carousel className={className}>
                {carouselItems}
            </Carousel>
        );
    }

    _renderCarouselItem(img) {
        if (!img || !img.src || !img.alt) {
            return null;
        }

        return (
            <Carousel.Item key={img.alt}>
                <img src={img.src} alt={img.alt} />
            </Carousel.Item>
        );
    }
}
