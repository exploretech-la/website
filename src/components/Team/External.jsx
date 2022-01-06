import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import People from 'components/common/People';

import { External } from 'constants/external';

export default class ExternalComponent extends Component {

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
        const classNames = classnames('Section', 'External', this.props.className);
        return (
            <section className={classNames} id="external">
                <div className="external-container">
                    <div className="external-header">
                        <h3>External</h3>
                        <div className="pill-divider" />
                    </div>
                    <People people={External}/>
                </div>
            </section>
        );
    }
}
