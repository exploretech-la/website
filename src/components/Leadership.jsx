import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import People from 'components/common/People';

import HomePageSections from 'constants/HomePageSections';
import { Leadership } from 'constants/leadership';

export default class Speakers extends Component {

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
        const classnames = classNames('Section', 'Leadership', this.props.className);
        return (
            <section className={classnames} id={HomePageSections.LEADERSHIP.name}>
                <div className="leadership-container">
                    <div className="leadership-header">
                        <h3>Our Leadership</h3>
                        <div className="pill-divider" />
                    </div>
                    <People people={Leadership}/>
                </div>
            </section>
        );
    }
}
