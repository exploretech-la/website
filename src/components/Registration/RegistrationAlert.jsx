import React, { Component } from 'react';
// import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'react-bootstrap/Button';
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
                <b>To attendees:</b> Access our virtual event platform via the link below!
              </h3>
              <div className="button">
                <Button variant="outline-light" href={`https://tinyurl.com/exploretechla2021`} size="lg" onClick={this._trackEventPlatformClick}>
                  Click here to log into the event!
                </Button>
              </div>
              <div className="notes">
                <h5>All event info can be accessed under "Event Info" on our website!</h5>
                <h5><b>IMPORTANT:</b> If you registered and did not receive any emails from us, please reach out to us ASAP so we can resolve this.</h5>
              </div>
            </div>
        );
    }

    _trackEventPlatformClick() {
      GA.trackEvent({
          category: 'RegistrationAlert',
          action: 'Click',
          label: 'Event Platform Link'
      });
    }

}
