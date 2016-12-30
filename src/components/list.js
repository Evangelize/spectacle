import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";
import Appear from "./appear";

@Radium
export default class List extends Component {
  renderTag() {
    return this.props.ordered ? (
      <ol reversed={this.props.reversed} start={this.props.start} type={this.props.type} className={this.props.className} style={[this.context.styles.components.list, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </ol>) : (
      <ul className={this.props.className} style={[this.context.styles.components.list, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </ul>);
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

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  entry: PropTypes.object,
  ordered: PropTypes.bool,
  reversed: PropTypes.bool,
  start: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string
};

List.defaultProps = {
  entry: {
    index: 0,
    duration: 0,
    easing: "quadInOut",
    direction: "left"
  },
  ordered: false,
  reversed: false,
  start: 1,
  type: "1"
};

List.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
