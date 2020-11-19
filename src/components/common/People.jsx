import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactGA from 'react-ga';

export default class People extends Component {

    static get propTypes() {
        return {
            className: PropTypes.string,
            people: PropTypes.array.isRequired,
        }
    }

    static get defaultProps() {
        return {
            className: '',
            people: [],
        };
    }

    render() {
        if (!this.props.people || this.props.people.length === 0) {
            return null;
        }

        const peopleElements = this.props.people.map(person => this._renderPerson(person));
        const classnames = classNames('People', this.props.className);

        return (
            <div className={classnames}>
                {peopleElements}
            </div>
        );
    }

    _renderPerson(person) {
        if (!person || !person.name || !person.title || !person.image) {
            return null;
        }

        const { name, title, image, link } = person;
        return (
            <ReactGA.OutboundLink to={link} target="_blank" eventLabel={name} key={name}>
                <div className="person">
                    <img src={image} className="person-image" alt={name} />
                    <h5 className="person-name">{name}</h5>
                    <p className="person-title">{title}</p>
                </div>
            </ReactGA.OutboundLink>
        );
    }
}
