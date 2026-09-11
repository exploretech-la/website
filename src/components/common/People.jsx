import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactGA from "react-ga";

export default class People extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      people: PropTypes.array.isRequired,
      eagerCount: PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      className: "",
      people: [],
      eagerCount: 2,
    };
  }

  render() {
    if (!this.props.people || this.props.people.length === 0) {
      return null;
    }

    const peopleElements = this.props.people.map((person, index) =>
      this._renderPerson(person, index)
    );
    const classNames = classnames("People", this.props.className);

    return <div className={classNames}>{peopleElements}</div>;
  }

  _renderPerson(person, index) {
    if (!person || !person.name) {
      return null;
    }

    const { name, title, descriptions, image, link } = person;
    if (link) {
      return (
        <ReactGA.OutboundLink
          to={link}
          target="_blank"
          eventLabel={name}
          key={name}
        >
          <div className="person">
            {image ? (
              <img
                src={image}
                className="person-image"
                alt={name}
                width="160"
                height="160"
                loading={index < this.props.eagerCount ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <div className="person-image" aria-hidden="true" />
            )}
            <h5 className="person-name">{name}</h5>
            {title ? <p className="person-title">{title}</p> : null}
            {descriptions
              ? descriptions.map((description) => (
                  <p className="person-description">{description}</p>
                ))
              : null}
          </div>
        </ReactGA.OutboundLink>
      );
    }
    return (
      <div className="person" key={name}>
        {image ? (
          <img
            src={image}
            className="person-image"
            alt={name}
            width="160"
            height="160"
            loading={index < this.props.eagerCount ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className="person-image" aria-hidden="true" />
        )}
        <h5 className="person-name">{name}</h5>
        {title ? <p className="person-title">{title}</p> : null}
        {descriptions
          ? descriptions.map((description) => (
              <p className="person-description">{description}</p>
            ))
          : null}
      </div>
    );
  }
}
