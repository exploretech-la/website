import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import { MdKeyboardArrowRight } from "react-icons/md";

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
};

const defaultProps = {
  className: "",
  to: null,
};

function LinkWithArrow(props) {
  const { className, text, to } = props;
  const classNames = classnames("LinkWithArrow", className);
  return (
    <div className={classNames}>
      <Link to={to}>
        <span className="link-text">{text}</span>
        <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
      </Link>
    </div>
  );
}

LinkWithArrow.displayName = "LinkWithArrow";
LinkWithArrow.propTypes = propTypes;
LinkWithArrow.defaultProps = defaultProps;
export default LinkWithArrow;
