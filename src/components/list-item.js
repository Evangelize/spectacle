import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";
import Appear from "./appear";

@Radium
export default class ListItem extends Component {
  render() {
    const { entry } = this.props;
    const typefaceStyle = this.context.typeface || {};
    return (entry.index > 0) ?
    (
      <Appear entry={entry}>
        <li
          className={this.props.className}
          style={[this.context.styles.components.listItem, getStyles.call(this), this.props.style, typefaceStyle]}
        >
          {this.props.children}
        </li>
      </Appear>
    ) : (
      <li
        className={this.props.className}
        style={[this.context.styles.components.listItem, getStyles.call(this), this.props.style, typefaceStyle]}
      >
        {this.props.children}
      </li>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  entry: PropTypes.object,
  style: PropTypes.object
};

ListItem.defaultProps = {
  entry: {
    index: 0,
    duration: 0,
    easing: "quadInOut",
    direction: "left"
  }
};

ListItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};

