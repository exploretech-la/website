import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'react-bootstrap/Button';

import LiabilityWaiver from 'static/pdf/exploretech_la_2022_Liability_Waiver.pdf';
import MultimediaRelease from 'static/pdf/exploretech_la_2022_Multimedia_Release_Form.pdf';
import StudentVerification from 'static/pdf/exploretech_la_2022_Student_Verification_Form.pdf';

export default class Waivers extends Component {

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

    // render() {
    //     const classNames = classnames('Waivers', this.props.className);

    //     return (
    //         <section className={classNames}>
    //           <div className="waivers-title">
    //             <h2 className="title">Waivers</h2>
    //             <div className="pill-divider" />
    //             <p>
    //               Please download and sign the following waivers. They are a required part of your registration.
    //             </p>
    //             <p>
    //               <em>Note: For high school students, the waivers require a parent/guardian signature.</em>
    //             </p>
    //           </div>
    //           <div className="buttons">
    //             <div className="button">
    //               <Button variant="info" href={LiabilityWaiver} size="lg">
    //                 Liability Waiver
    //               </Button>
    //             </div>
    //             <div className="button">
    //               <Button variant="info" href={MultimediaRelease} size="lg">
    //                 Multimedia Release Form
    //               </Button>
    //             </div>
    //             <div className="button">
    //               <Button variant="info" href={StudentVerification} size="lg">
    //                 Student Verification Form
    //               </Button>
    //             </div>
    //           </div>
    //         </section>
    //     );
    // }
}
