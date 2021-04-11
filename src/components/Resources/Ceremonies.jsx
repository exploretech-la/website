import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import YoutubeEmbed from "components/common/YoutubeEmbed";

export default class Ceremonies extends Component {

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
        const classNames = classnames('Section', 'Ceremonies', this.props.className);

        return (
            <section className={classNames}>
                <div className="ceremonies-content">
                    <div className="ceremonies-title">
                      <h2>Ceremonies</h2>
                      <div className="pill-divider" />
                    </div>
                    <div className="ceremonies-videos">
                      <div className="ceremonies-videos left-column">
                        <h3>Opening Ceremony</h3>
                        <p>video goes here later bc i'm dumb rn</p>
                        <YoutubeEmbed embedId="rokGy0huYEA" />
                      </div>
                      <div className="ceremonies-videos right-column">
                        <h3>Closing Ceremony</h3>
                        <p>video goes here later bc i'm dumb rn</p>
                        <YoutubeEmbed embedId="rokGy0huYEA" />
                      </div>
                    </div>
                </div>
            </section>
        );
    }
}
