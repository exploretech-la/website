import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class UnorderedItemList extends PureComponent {

    static get propTypes() {
        return {
            className: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.string).isRequired,
        }
    }

    static get defaultProps() {
        return {
            className: '',
        };
    }

    render() {
        const classnames = classNames('UnorderedItemList', this.props.className);
        const items = this.props.items.map((item, index) => this._getItem(index+1, item));

        return (
            <div className={classnames}>
                {items}
            </div>
        );
    }

    _getItem(number, content) {
        return (
            <div className="item" key={number}>
                <div className="item-indicator" />
                <div className="item-content">{content}</div>
            </div>
        );
    }
};
