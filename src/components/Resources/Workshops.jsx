import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import YoutubeEmbed from "components/common/YoutubeEmbed";

import { WORKSHOPS } from 'constants/workshops';

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
                      <h2>Panels</h2>
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
                                        {/* <YoutubeEmbed embedId="WaZ2bN8t2cc" />   */}
                                        <Card.Text>{workshop.session}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>
                                            <Card.Text>{workshop.location}</Card.Text>
                                        </ListGroupItem>
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
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Diverse Careers in Computer Science</b></Card.Title>
                        <YoutubeEmbed embedId="xzZzhmeo9_Y" />  
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/18H8XdlIscdZdeLiOUCPtAfu0tuhukW1EfDBH8uDkUXE/edit#slide=id.gc5794a6fcc_0_12">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://padlet.com/bonniebonnielee/nm6pc2j59e5hhigl">Padlet</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1hG6YO9epajDiYqma-j882qRzmUITZdlTFWvvjrTTy44/edit?usp=sharing">Panelist Info and Resources</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Representation in Computer Science</b></Card.Title>
                        <YoutubeEmbed embedId="vrPl7EmwV9A" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/16KnUGORLcdWsVqfCFgGzkqFniVPzHvtL2WyoY22Mgv4/edit#slide=id.gc7ccf7fc99_0_0">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://padlet.com/wsu315/a9fa6pk1k3iodi7o">Padlet</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}
