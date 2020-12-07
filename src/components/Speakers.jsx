import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import People from 'components/common/People';

import HomePageSections from 'constants/HomePageSections';
import { CurrentSpeakers, PastSpeakers } from 'constants/speakers';

const SpeakersTypeEnum = {
    CURRENT: {
        id: 1,
        name: 'Current',
    },
    PAST: {
        id: 2,
        name: 'Past',
    },
};

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
        const classNames = classnames('Section', 'Speakers', this.props.className);
        return (
            <section className={classNames} id={HomePageSections.SPEAKERS.name}>
                {this._renderSpeakers(CurrentSpeakers, SpeakersTypeEnum.CURRENT)}
                {this._renderSpeakers(PastSpeakers, SpeakersTypeEnum.PAST)}
            </section>
        );
    }

    _renderSpeakers(speakers, speakerType) {
        if (!speakers || speakers.length === 0) {
            return null;
        }

        return (
            <div className="speakers-container">
                <div className="speakers-header">
                    <h3>{speakerType.name} Speakers</h3>
                    <div className="pill-divider" />
                </div>
                <People people={speakers} />
            </div>
        );
    }
}
