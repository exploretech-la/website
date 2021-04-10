import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'react-bootstrap/Button';

export default class ImportantLinks extends Component {

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
        const classNames = classnames('ImportantLinks', this.props.className);

        return (
            <section className={classNames}>
              <div className="links-title">
                <h2 className="title">Important Links</h2>
                <div className="pill-divider" />
                <p>
                  Below are some of the important links you need for the event!
                </p>
              </div>
              <div className="button">
                <Button variant="warning" href={`https://tinyurl.com/exploretechla2021`} size="lg">
                  Socio Virtual Platform Access
                </Button>
              </div>
              <div className="buttons">
                <div className="button">
                  <Button variant="info" href={`https://drive.google.com/file/d/1icRfJae9wy8Kld8qSUxsY0pbsyIu9nh2/view?usp=sharing`} size="lg">
                    exploretech.la 2021 Program
                  </Button>
                </div>
                <div className="button">
                  <Button variant="info" href={`https://docs.google.com/document/d/14_eHYyuf4V9BnUUEUijrYEYVxUTPfAUFZrey7blTc9s/edit?usp=sharing`} size="lg">
                    Student Event Day Guide
                  </Button>
                </div>
                <div className="button">
                  <Button variant="info" href={`https://tinyurl.com/contentschedule2021`} size="lg">
                    Workshop/Panel Schedule
                  </Button>
                </div>
              </div>
              <div className="links-text">
                <h2 className="title">Event Support</h2>
                <div className="pill-divider" />
                <p>If you are experiencing any technical difficulties or have any questions about the event, please first refer to the FAQs below. </p>
                <p> If your question is not answered below, please reach out to us at exploretechla@cs.ucla.edu for assistance! </p>
                <br/>
                <h4>Live Event Day Support</h4>
                <p>For the duration of our event, attendees will be able to join a Zoom meeting (link below) to ask any questions live to an exploretech.la 2021 Staff Member.</p>
                <div className="button">
                  <Button variant="info" href={`https://tinyurl.com/exploretechla2021help`} size="lg">
                    Zoom Help Room Link
                  </Button>
                </div>
                <br/>
                <p><b>Zoom Meeting Hours:</b> Saturday and Sunday, 9:30AM to 1:30PM</p>
              </div>
            </section>
        );
    }
}
