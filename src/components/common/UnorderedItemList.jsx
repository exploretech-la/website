import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class UnorderedItemList extends PureComponent {
  static get propTypes() {
    return {
      className: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    };
  }

  static get defaultProps() {
    return {
      className: "",
    };
  }

  render() {
    const classNames = classnames("UnorderedItemList", this.props.className);
    const items = this.props.items.map((item, index) =>
      this._getItem(index + 1, item)
    );

    return <div className={classNames}>{items}</div>;
  }

  _getItem(number, content) {
    return (
      <div className="item" key={number}>
        <div className="item-indicator" />
        <div className="item-content">{content}</div>
      </div>
    );
  }
}
