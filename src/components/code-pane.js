import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";
import isUndefined from "lodash/isUndefined";
import Appear from "./appear";

const format = (str) => {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

@Radium
export default class CodePane extends Component {
  componentDidMount() {
    return window.Prism && window.Prism.highlightAll();
  }
  createMarkup() {
    const { source, children } = this.props;
    const code = (isUndefined(source) || source === "") ? children : source;
    return {
      __html: format(code)
    };
  }
  renderTag() {
    return (
      <pre className={this.props.className} style={[this.context.styles.components.codePane.pre, getStyles.call(this), this.props.style]}>
        <code
          className={`language-${this.props.lang}`}
          style={this.context.styles.components.codePane.code}
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </pre>
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

CodePane.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};

CodePane.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  entry: PropTypes.object,
  lang: PropTypes.string,
  source: PropTypes.string,
  style: PropTypes.object
};

CodePane.defaultProps = {
  entry: {
    index: 0,
    duration: 0,
    easing: "quadInOut",
    direction: "left"
  },
  lang: "markup",
  source: ""
};
