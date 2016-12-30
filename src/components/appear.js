import React, { Component, PropTypes } from "react";
import { findDOMNode } from "react-dom";
import findKey from "lodash/findKey";
import { connect } from "react-redux";
import { VictoryAnimation } from "victory-core";
import { getAnimation } from "../utils/base"

class Appear extends Component {
  state = {
    active: false,
    displayed: false
  };

  componentWillReceiveProps(nextProps) {
    const state = nextProps.fragment;
    const slide = this.props.route.slide;
    const fragment = findDOMNode(this.fragmentRef);
    /*
    const key = findKey(state.fragments[slide], {
      id: parseInt(fragment.dataset.fid)
    });
    */
    const key = this.props.entry.index;

    const shouldDisableAnimation = (
      this.props.route.params.indexOf("export") !== -1 ||
      this.props.route.params.indexOf("overview") !== -1
    );

    if (shouldDisableAnimation) {
      this.setState({
        active: true,
        displayed: false
      });
      return;
    }

    if (slide in state.fragments && state.fragments[slide].hasOwnProperty(key)) {
      const active = state.fragments[slide][key].visible;
      this.setState({ active });
    }
  }

  setDisplayed() {
    this.setState({
      displayed: true
    });
  }

  render() {
    const { easing, duration, direction } = this.props.entry;
    const child = React.Children.only(this.props.children);
    const animation = getAnimation(direction);
    const data = this.state.active ? animation.end : animation.start;
    //this.setDisplayed();

    return (
      <VictoryAnimation
        data={data}
        duration={duration}
        easing={easing}
      >
        {({ opacity, transform }) => (
          React.cloneElement(child,
            {
              className: "fragment",
              style: { opacity, transform },
              ref: (f) => { this.fragmentRef = f; }
            }
          )
        )}
      </VictoryAnimation>
    );
  }
}

Appear.propTypes = {
  entry: PropTypes.object,
  children: PropTypes.node,
  route: PropTypes.object,
  style: PropTypes.object
};

Appear.contextTypes = {
  export: PropTypes.bool,
  overview: PropTypes.bool,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default connect((state) => state)(Appear);
