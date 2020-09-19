import React, { Component } from 'react';

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import { MdKeyboardArrowRight } from 'react-icons/md';

import HomePageSections from 'constants/HomePageSections';

import SpeakerConnie from 'static/images/speaker-connie.jpg';
import TaboolaBooth from 'static/images/taboola-booth.jpg';
import TEALS_VR from 'static/images/teals-vr.jpg';

const mailingListLink = "http://eepurl.com/gEFmPX";

export default class GetInvolved extends Component {
	render() {
		return (
			<section className="Section GetInvolved" id={`${HomePageSections.GET_INVOLVED.name}`}>
				<div className="cards-container">
					<div className="cards-header">
						<h3>Get Involved</h3>
						<div className="pill-divider" />
					</div>
					<CardDeck>
						<Card className="high-schools">
							<Card.Img variant="top" src={TEALS_VR} />
							<a href="mailto:exploretechla@cs.ucla.edu" target="_blank" rel="noopener noreferrer">
								<Card.ImgOverlay>
									<div className="card-content">
										<Card.Title>For High Schools</Card.Title>
										<Card.Text>Inspire your students</Card.Text>
										<div className="get-involved-cta">
											<MdKeyboardArrowRight className="MdKeyboardArrowRight" />
											<Card.Text className="cta-text">Email us</Card.Text>
										</div>
									</div>
									<div className="gradient-back" />
								</Card.ImgOverlay>
							</a>	
						</Card>
						<Card className="companies">
							<Card.Img variant="top" src={TaboolaBooth} />
							<a href="mailto:exploretechla@cs.ucla.edu" target="_blank" rel="noopener noreferrer">
								<Card.ImgOverlay>
									<div className="card-content">
										<Card.Title>For Companies</Card.Title>
										<Card.Text className="full-content">Become an industry partner</Card.Text>
										<Card.Text className="short-content">Partner with us</Card.Text>
										<div className="get-involved-cta">
											<MdKeyboardArrowRight className="MdKeyboardArrowRight" />
											<Card.Text className="cta-text">Email us</Card.Text>
										</div>
									</div>
									<div className="gradient-back" />
								</Card.ImgOverlay>
							</a>
						</Card>
						<Card className="ucla-students">
							<Card.Img variant="top" src={SpeakerConnie} />
							<a href={mailingListLink} target="_blank" rel="noopener noreferrer">
								<Card.ImgOverlay>
									<div className="card-content">
										<Card.Title>For UCLA Students</Card.Title>
										<Card.Text>Join our team</Card.Text>
										<div className="get-involved-cta">
											<MdKeyboardArrowRight className="MdKeyboardArrowRight" />
											<Card.Text className="cta-text short-content">Get our newsletter</Card.Text>
											<Card.Text className="cta-text full-content">Sign up for our newsletter</Card.Text>
										</div>
									</div>
									<div className="gradient-back" />
								</Card.ImgOverlay>
							</a>
						</Card>
					</CardDeck>
				</div>
			</section>
		);
	}

	_openMailingList() {
		window.open('', '_blank');
	}
}
