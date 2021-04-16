import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Workshops extends Component {

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
        const classNames = classnames('Section', 'Workshops', this.props.className);

        return (
            <section className={classNames}>
                <div className="workshops-content">
                    <div className="workshops-title">
                      <h2>Ceremonies</h2>
                      <div className="pill-divider" />
                    </div>
                </div>
            </section>
        );
    }
}
