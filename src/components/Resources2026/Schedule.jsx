import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { SCHEDULE2026 } from 'constants/2026schedule';

export default class Schedule extends Component {

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
        const classNames = classnames('Section', 'Schedule', this.props.className);

        return (
            <section className={classNames}>
                  <div className="schedule-content">
                    <div className="schedule-content schedule-title">
                        <h2 className="title">Schedule</h2>
                        <div className="pill-divider" />
                    </div>
                    <div className="schedule-text">
                        <p>
                        {SCHEDULE2026.map(event => {
                            return <h4 key={event.key}><b>{event.time} </b>{event.name}</h4>
                        })}
                        </p>
                    </div>
                  </div>
            </section>
        );
    }
}
