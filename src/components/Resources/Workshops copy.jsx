import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import YoutubeEmbed from "components/common/YoutubeEmbed";

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
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Coding 101</b></Card.Title>
                        <YoutubeEmbed embedId="WaZ2bN8t2cc" />  
                        <Card.Text>
                            (Session 1 Recording)
                        </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://youtu.be/-NN-O42OleY">Session 2 Recording</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1ElU9F8cRtpw7QWjIj3QkJsBVG8xmE2Ywpd2b8Gxi75w/edit">Student Guide</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1sZ5aDpGpKbjd5CuhOd5hTCljncScBwf3m7FWMb6_jd4/edit#slide=id.gbbd58c2398_0_15">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1UDakvA2lzu5px7Ox20s7E8ZYN17WtcPTcmtoTANRL5o/edit">Solutions</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>ExploreWeb.la: Web Design & Dev</b></Card.Title>
                        <YoutubeEmbed embedId="jP8itIcFFa4" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/u/0/d/1QB4seIW1s97Aqrf-Wn8n9UQq6YNM3opvqzt3ZUZtGOM/edit">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1zAbuNQzRgHYhH9E9sdJudYQ96FJYfXcqfO4qJv736K4/edit">Review Sheet</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://codepen.io/raphaeling/pen/VwmjxzJ">Codepen</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Operating Systems</b></Card.Title>
                        <YoutubeEmbed embedId="u-X1K9Rz75U" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/17Dl1hE1kUmffXtlF8aC_CMuXNvFgTp3IgLADvT9pJmw/edit#slide=id.g7cb5bbd26d_0_20">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="http://copy.sh/v86/?profile=linux26">Linux Emulator</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Draw with Code</b></Card.Title>
                        <YoutubeEmbed embedId="oTzUKgOTEGE" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1yKOG-eBJveoCHa0XX0-JhGSxVLSJ6x4d993uWdySm_I/edit?usp=sharing">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://repl.it/@AlyssaSchimm/Python-Graphics-Skeleton">Repl.it Project</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Less Quantum More Computing</b></Card.Title>
                        <YoutubeEmbed embedId="rC-llUnQt88" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1ceW21j9s6EwD4MtMN8gytIH_ku-sZLy0JnAuQ4pmrlQ/edit#slide=id.gc204a219fe_1_10">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1dbcPxbjI50PYgRMoLolfNP3FGHvBojHuFfYHRtzGNv4/edit?usp=sharing">Definitions Doc</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://colab.research.google.com/drive/1jViSXWVgbFK6GeU2z7VrSxx8PjOF8dOk">Google Colab</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Crack the Code with Cryptography</b></Card.Title>
                        <YoutubeEmbed embedId="HCrLnfs5yqU" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1Z2GZoJtq2IwqjO2Akr9vIv6km_Pc_a1h_0b98HMQNIA/edit?usp=sharing">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://forms.gle/bmewxDNqbuXENENf8">Escape Room Google Form</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/14P2cz0_CLCPlWJFjyXICMdhN_YfoRlUiPSZW0wxvf1w/edit">Escape Room Questions and Solutions</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Escaping Reality with Game Development</b></Card.Title>
                        <YoutubeEmbed embedId="PiDWtEGfgiM" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1-FAlSMU2WDh_qZVjUSUV6bNSShXxCP5IAzx9y3guXW8/edit">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://codepen.io/catpls/pen/QWdgpwe">Codepen Activity</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Murder Mystery!</b></Card.Title>
                        <YoutubeEmbed embedId="RPZqYD4KX9I" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/17QCnC1LfixiFyfCSMTwE-6VUC-NyznB3UHs3Szrx3HQ/edit#slide=id.g7cb5bbd26d_0_20">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1R0Ne_90c7aRuzvtkA5HSPAgBw70GJfwiH6i1-1BCxh0/copy">Worksheet</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>AI Adventures</b></Card.Title>
                        <YoutubeEmbed embedId="YemyR8KdDe0" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1rq2lxcW1MK1pSZZP2bl1-kz5JkvRN0kJ-GpzIXxm1UY/edit#slide=id.g7cb5bbd26d_0_20">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1KQi86CtI4OG2cgEoZLQCDeQk8a_204Ek_yESjdlAAaM/edit?usp=sharing">Worksheet</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Digital Design</b></Card.Title>
                        <YoutubeEmbed embedId="sjHU3FDty68" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1SzxLUCi8xBJRQC4uGt9fIk-gZvdqeS-_HdIG0ToaQpU/edit?usp=sharing">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://miro.com/app/board/o9J_lMyUL1U=/">Miro Whiteboard</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Data Science</b></Card.Title>
                        <YoutubeEmbed embedId="OlKpWAwA32Q" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1WonMzMY2AaReC5yPW94akZaSKOuBV2ci2iYswWIEG5U/edit#slide=id.g7cb5bbd26d_0_20">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/spreadsheets/d/1E6mFcAMfeSlz1B61lInOuTVO1tvR7ggYzXTeqxCxkQQ/edit#gid=1207580287">Spreadsheet</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Tech & Society</b></Card.Title>
                        <YoutubeEmbed embedId="b-bgVV-aEKI" />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/15Kcr7BihmCtBo-l2CxGelzLGCglmXhx0-3L-YtonyDo/edit#slide=id.g7cb5bbd26d_0_20">Slides</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
                <CardDeck className="card-row">
                    <Card className="text-center">
                        <Card.Body>
                        <Card.Title><b>Bot Buddy</b></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Hosted by DIY Girls</Card.Subtitle>
                        <YoutubeEmbed embedId="b2ijVF2aLQs" />
                        <Card.Text>
                            (Session 1 Recording)
                        </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><Card.Link href="https://youtu.be/jhGA1TZG9PA">Session 2 Recording</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://drive.google.com/drive/folders/1aaPdABZMsORNaRHP7EZKMbfST2x6j_bt">Skin Templates</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://www.youtube.com/watch?v=JKoLj8lmkfM">Youtube Tutorial</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/presentation/d/1XNH37Cw5P7_tEWqWckaev5vxETBVVapTIbJXXr-6uNs/edit#slide=id.p">Slides</Card.Link></ListGroupItem>
                            <ListGroupItem><Card.Link href="https://docs.google.com/document/d/1xSpGUjHA2qL8DJjGagBPAolmfcHAdcHvuTpl_lC67po/edit">Follow Up Instructions</Card.Link></ListGroupItem>
                        </ListGroup>
                    </Card>
                </CardDeck>
            </div>
        );
    }

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
