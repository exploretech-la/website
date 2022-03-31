import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import YoutubeEmbed from "components/common/YoutubeEmbed";
import People from 'components/common/People';

import { WORKSHOPS, PANELS } from 'constants/workshops';

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
                      <h2>Workshops</h2>
                      <div className="pill-divider" />
                    </div>
                    {this._getWorkshopCards()}
                </div>
                <div className="workshops-content">
                    <div className="workshops-title">
                      <h2>Panels &amp; Panelists</h2>
                      <div className="pill-divider" />
                    </div>
                    {this._getPanelCards()}
                </div>
            </section>
        );
    }

    _getWorkshopCards() {
        return (
            <div className="workshops-cards">
                {WORKSHOPS.map(workshopRow => {
                    return (
                        <CardDeck className="card-row">
                            {workshopRow.map(workshop => {
                                return (<Card className="text-center">
                                    <Card.Body>
                                        <Card.Title><b>{workshop.name}</b></Card.Title>
                                        <img src={workshop.logo} alt={`${workshop.name} Logo`} />  
                                        <Card.Text>{workshop.session}</Card.Text>
                                        <Card.Text>{workshop.location}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        {workshop.resources.map(resource => {
                                            return <ListGroupItem>
                                                <Card.Link href={resource.link}>{resource.name}</Card.Link>
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </Card>)
                            })}
                        </CardDeck>
                    )
                })}
            </div>
        );
    }

    // want to include each panelist and their bios
    _getPanelCards() {
        return (
            <div className="workshops-cards">
                {PANELS.map(panel => {
                    return (
                        <div className="panelists-container">
                            <div className="panelists-header">
                                <h3>{panel.name}</h3>
                                <div className="pill-divider" />
                            </div>
                            <People people={panel.panelists} />
                        </div>
                    )
                })}
            </div>
        );
    }
}
