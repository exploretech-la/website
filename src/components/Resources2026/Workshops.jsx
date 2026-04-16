import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { WORKSHOPS2026 } from "constants/2026workshop";

export default class Workshops extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      className: "",
    };
  }

  render() {
    const classNames = classnames("Section", "Workshops", this.props.className);

    const workshopItems = WORKSHOPS2026.filter((item) => item.type === "workshop");
    const panelItems = WORKSHOPS2026.filter((item) => item.type === "panel");

    return (
      <section className={classNames}>
        <div className="workshops-content">
          <div className="workshops-title">
            <h2>Workshops</h2>
            <div className="pill-divider" />
          </div>
          {this._renderCards(workshopItems)}
        </div>

        <div className="workshops-content">
          <div className="workshops-title">
            <h2>Panels</h2>
            <div className="pill-divider" />
          </div>
          {this._renderCards(panelItems)}
        </div>
      </section>
    );
  }

  _chunkArray(items, size = 2) {
    const rows = [];
    for (let i = 0; i < items.length; i += size) {
      rows.push(items.slice(i, i + size));
    }
    return rows;
  }

  _renderCards(items) {
    const rows = this._chunkArray(items, 2);

    return (
      <div className="workshops-cards">
        {rows.map((row, rowIndex) => (
          <CardDeck className="card-row" key={rowIndex}>
            {row.map((item) => (
              <Card className="text-center" key={item.title}>
                <Card.Body>
                  <Card.Title>
                    <b>{item.title}</b>
                  </Card.Title>

                  {item.instructors && (
                    <Card.Text>
                      {item.type === "panel" ? "Moderators" : "Instructors"}: {item.instructors}
                    </Card.Text>
                  )}
                </Card.Body>

                <ListGroup className="list-group-flush">
                  {item.description && (
                    <ListGroupItem>
                      <Card.Text>{item.description}</Card.Text>
                    </ListGroupItem>
                  )}

                  {item.slidesUrl && (
                    <ListGroupItem>
                      <Card.Link href={item.slidesUrl}>Slides</Card.Link>
                    </ListGroupItem>
                  )}

                  {item.panelistInfoUrl && (
                    <ListGroupItem>
                      <Card.Link href={item.panelistInfoUrl}>Panelist Info</Card.Link>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card>
            ))}
          </CardDeck>
        ))}
      </div>
    );
  }
}