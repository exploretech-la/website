import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
        const currentSpeakers = CurrentSpeakers.map(speaker => this._renderSpeaker(speaker));
        const pastSpeakers = PastSpeakers.map(speaker => this._renderSpeaker(speaker));

        const classnames = classNames('Speakers', this.props.className);

        return (
            <div className={classnames}>
                {this._renderSpeakers(currentSpeakers, SpeakersTypeEnum.CURRENT)}
                {this._renderSpeakers(pastSpeakers, SpeakersTypeEnum.PAST)}
            </div>
        );
    }

    _renderSpeakers(speakersElements, speakerType) {
        if (!speakersElements || speakersElements.length === 0) {
            return null;
        }

        return (
            <div className="speakers-container">
                <div className="speakers-header">
                    <h3>{speakerType.name} Speakers</h3>
                    <div className="pill-divider" />
                </div>
                <div className="speakers-list">
                    {speakersElements}
                </div>
            </div>
        );
    }

    _renderSpeaker(speaker) {
        if (!speaker || !speaker.name || !speaker.title || !speaker.org || !speaker.image) {
            return null;
        }

        const { name, title, org, image, link } = speaker;
        return (
            <a href={link} target="_blank">
                <div className="speaker" key={name}>
                    <img src={image} className="speaker-image" alt={name} />
                    <h5 className="speaker-name">{name}</h5>
                    <p className="speaker-title">{title}, {org}</p>
                </div>
            </a>
        );
    }
}
