import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { FAQS } from 'constants/faq';

export default class FAQ extends Component {

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
        const classNames = classnames('Section', 'FAQ', this.props.className);

        return (
            <section className={classNames}>
              <div className="faq-content">
                <div className="faq-content faq-centered-title">
                  <h2 className="title">FAQs</h2>
                  <div className="pill-divider" />
                  <p>
                    If your question is not answered below, please reach out to us 
                    at <a href="mailto:exploretechla@cs.ucla.edu" target="_blank" rel="noopener noreferrer">exploretechla@cs.ucla.edu</a> for 
                    more information!
                  </p>
                </div>
                {this._getStudentFAQ()}
              </div>
            </section>
        );
    }

    _getStudentFAQ() {
      return (
        <div className="faq-student">
          <div className="faq-section-title">
            <h3 className="title">Student FAQs</h3>
            <div className="pill-divider" />
          </div>
          <Accordion>
            {FAQS.map(faq => {
              return (<Card>
                  <Accordion.Toggle as={Card.Header} eventKey={faq.key}>
                    <h5><b>{faq.question}</b></h5>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={faq.key}>
                    <Card.Body>
                      <h5>{faq.answer}</h5>
                      {faq.note && (
                        <p>Note: {faq.note}</p>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            })}
          </Accordion>
        </div>
      );
    }
}
