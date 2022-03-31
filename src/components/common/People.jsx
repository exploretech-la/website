import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
        const classNames = classnames('People', this.props.className);

        return (
            <div className={classNames}>
                {peopleElements}
            </div>
        );
    }

    _renderPerson(person) {
        if (!person || !person.name || !person.image) {
            return null;
        }

        const { key, name, title, descriptions, image, link } = person;
        if (link) {
            return (
                <ReactGA.OutboundLink to={link} target="_blank" eventLabel={name} key={key}>
                    <div className="person">
                        <img src={image} className="person-image" alt={name} />
                        <h5 className="person-name">{name}</h5>
                        {title ? <p className="person-title">{title}</p> : null}
                        {descriptions ? descriptions.map(description => <p className="person-description">{description}</p>) : null}
                    </div>
                </ReactGA.OutboundLink>
            );
        }
        return (
            <div className="person" key={key}>
                <img src={image} className="person-image" alt={name} />
                <h5 className="person-name">{name}</h5>
                {title ? <p className="person-title">{title}</p> : null}
                {descriptions ? descriptions.map(description => <p className="person-description">{description}</p>) : null}
            </div>
        );
    }
}
