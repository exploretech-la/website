import React, { Component } from 'react';
// import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import Button from 'react-bootstrap/Button';
import GA from 'util/GoogleAnalytics';

export default class RegistrationAlert extends Component {

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
        const classNames = classnames('RegistrationAlert', this.props.className);

        return (
            <div className={classNames}>
              <h3>
                Registration is now closed - confirmations and shipping details have been sent out to all attendees!
              </h3>
              <div className="notes">
                <h5><b>IMPORTANT:</b> If you registered and did not receive any emails from us, please reach out to us ASAP so we can resolve this.</h5>
                <h5>And if you are still interested in attending our event, please email us at exploretechla@cs.ucla.edu</h5>
              </div>
              {/* <div className="buttons">
                <div className="button">
                  <Button variant="outline-light" href={`https://forms.gle/oNH7tx4kufoKSAoa9`} size="lg" onClick={this._trackStudentRegistrationFormClick}>
                    Student Registration Form
                  </Button>
                </div>
                <div className="button">
                  <Button variant="outline-light" href={`https://forms.gle/p3CxXh2dZjMJWd7V9`} size="lg" onClick={this._trackTeacherRegistrationFormClick}>
                    Teacher Registration Form
                  </Button>
                </div>
              </div> */}
            </div>
        );
    }

    _trackStudentRegistrationFormClick() {
      GA.trackEvent({
          category: 'RegistrationAlert',
          action: 'Click',
          label: 'Student Registration Form'
      });
    }

    _trackTeacherRegistrationFormClick() {
      GA.trackEvent({
          category: 'RegistrationAlert',
          action: 'Click',
          label: 'Teacher Registration Form'
      });
  }

}
