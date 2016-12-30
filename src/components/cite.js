import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";
import Appear from "./appear";

@Radium
export default class Cite extends Component {
  renderTag() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <cite className={this.props.className} style={[this.context.styles.components.cite, getStyles.call(this), this.props.style, typefaceStyle]}>
        - {this.props.children}
      </cite>
    );
  }
  render() {
    const { entry } = this.props;
    return (entry.index > 0) ? (
      <Appear entry={entry}>
        {this.renderTag()}
      </Appear>
    ) : this.renderTag();
  }
}

Cite.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  entry: PropTypes.object,
  style: PropTypes.object
};

Cite.defaultProps = {
  entry: {
    index: 0,
    duration: 0,
    easing: "quadInOut",
    direction: "left"
  }
};

Cite.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
