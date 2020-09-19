import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UnorderedItemList from './common/UnorderedItemList';

const scheduleItems = [
    'Opening Ceremony',
    'Exhbition Hall',
    'Workshops',
    'Closing Ceremony',
];

export default class Schedule extends Component {
    render() {
        return (
            <section className="Section Schedule">
                {/* <UnorderedItemList items={scheduleItems} /> */}
            </section>
        );
    }
}
