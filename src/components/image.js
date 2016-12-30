import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";
import Appear from "./appear";

@Radium
export default class Image extends Component {
  renderTag() {
    const styles = {
      width: this.props.width || "",
      height: this.props.height || "",
      display: this.props.display || ""
    };
    return (
      <img
        className={this.props.className}
        src={this.props.src}
        style={[
          this.context.styles.components.image,
          getStyles.call(this),
          styles,
          this.props.style
        ]}
      />
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

Image.propTypes = {
  className: PropTypes.string,
  display: PropTypes.string,
  entry: PropTypes.object,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  src: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

Image.defaultProps = {
  entry: {
    index: 0,
    duration: 0,
    easing: "quadInOut",
    direction: "left"
  }
};

Image.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
