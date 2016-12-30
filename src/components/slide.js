import React, { Component, PropTypes } from "react";
import isUndefined from "lodash/isUndefined";
import { getStyles } from "../utils/base";
import Radium from "radium";
import { addFragment } from "../actions";
import { Transitionable, renderTransition } from "./transitionable";

@Transitionable
@Radium
class Slide extends Component {
  contentRef;
  slideRef;

  state = {
    contentScale: 1,
    transitioning: true,
    z: 1,
    zoom: 1
  };

  componentDidMount() {
    this.setZoom();
    const slide = this.slideRef;
    //const frags = slide.querySelectorAll(".fragment");
    const frags = this.findUniqueOrder(this.props);
    if (frags && frags.length && !this.context.overview) {
      const lastAction = this.context.store.getState().lastAction;
      frags.forEach((frag, i) => {
        //frag.dataset.fid = i;
        return this.props.dispatch && this.props.dispatch(addFragment({
          slide: this.props.hash,
          id: frag,
          visible: (frag === 0) ? true : this.props.lastSlide > this.props.slideIndex,
          remote: lastAction.type === "REMOTE_STATE"
        }));
      });
    }
    window.addEventListener("load", (...props) => { this.setZoom(...props); });
    window.addEventListener("resize", (...props) => { this.setZoom(...props); });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setZoom);
  }

  findUniqueOrder() {
    const findOccurrences = (children, occurrences) => {
      React.Children.forEach(children, (el) => {
        if (el.props.children && Array.isArray(el.props.children)) {
          findOccurrences(el.props.children, occurrences);
        } else if (typeof el.props.children === "object" && el.props.children.props.entry && el.props.children.props.entry.index > 0) {
          occurrences.push(el.props.children.props.entry.index);
        } else if (el.props && el.props.entry && el.props.entry.index > 0) {
          occurrences.push(el.props.entry.index);
        }
      });
    };
    let occurrences = [];
    findOccurrences(this.props.children, occurrences);
    occurrences = occurrences.filter((x, i, a) => a.indexOf(x) === i);
    return occurrences;
  }

  setZoom(e) {
    const mobile = window.matchMedia("(max-width: 628px)").matches;
    const content = this.contentRef;
    if (content) {
      const zoom = this.props.viewerScaleMode ? 1
        : (content.offsetWidth / 1000);

      const contentScaleY = (content.parentNode.offsetHeight / 700);
      const contentScaleX = this.props.viewerScaleMode ?
        (content.parentNode.offsetWidth / 1000) :
        (content.parentNode.offsetWidth / 700);
      const minScale = Math.min(contentScaleY, contentScaleX);

      //let contentScale = minScale < 1 ? minScale : 1;
      let contentScale = minScale;
      if (mobile && this.props.viewerScaleMode !== true) {
        contentScale = 1;
      }

      this.setState({
        zoom: zoom > 0.6 ? zoom : 0.6,
        contentScale
      });
    }
  }

  allStyles() {
    const { align, print } = this.props;

    const styles = {
      outer: {
        position: this.props.export ? "relative" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        backgroundColor: this.context.styles.global.body.background ?
          this.context.styles.global.body.background : "",
        ...this.props.style
      },
      inner: {
        display: "flex",
        position: "relative",
        flex: 1,
        alignItems: align ? align.split(" ")[1] : "center",
        justifyContent: align ? align.split(" ")[0] : "center"
      },
      content: {
        flex: 1,
        maxHeight: this.props.maxHeight || 700,
        maxWidth: this.props.maxWidth || 1000,
        transform: `scale(${this.state.contentScale})`,
        padding: this.state.zoom > 0.6 ? this.props.margin || 40 : 10
      }
    };

    const overViewStyles = {
      inner: {
        flexDirection: "column"
      },
      content: {
        width: "100%"
      }
    };

    const printStyles = print ? {
      backgroundColor: "white",
      backgroundImage: "none"
    } : {};

    return { styles, overViewStyles, printStyles };
  }

  @renderTransition
  render() {
    const self = this;
    const { presenterStyle, children } = this.props;
    const { styles, overViewStyles, printStyles } = this.allStyles();

    if (!this.props.viewerScaleMode) {
      document.documentElement.style.fontSize = `${16 * this.state.zoom}px`;
    }

    const contentClass = isUndefined(this.props.className) ? "" : this.props.className;
    return (
      <div className="spectacle-slide"
        ref={(s) => { self.slideRef = s; }}
        style={[
          styles.outer,
          getStyles.call(this),
          printStyles,
          presenterStyle
        ]}
      >
        <div style={[styles.inner, this.context.overview && overViewStyles.inner]}>
          <div ref={(c) => { self.contentRef = c; }}
            className={`${contentClass} spectacle-content`}
            style={[
              styles.content,
              this.context.styles.components.content,
              this.context.overview && overViewStyles.content
            ]}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Slide.defaultProps = {
  align: "center center",
  presenterStyle: {},
  style: {},
  viewerScaleMode: false
};

Slide.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func,
  export: PropTypes.bool,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastSlide: PropTypes.number,
  margin: PropTypes.number,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  notes: PropTypes.any,
  presenterStyle: PropTypes.object,
  print: PropTypes.bool,
  slideIndex: PropTypes.number,
  style: PropTypes.object,
  viewerScaleMode: PropTypes.bool
};

Slide.contextTypes = {
  styles: PropTypes.object,
  export: PropTypes.bool,
  print: PropTypes.object,
  overview: PropTypes.bool,
  store: PropTypes.object
};

export default Slide;
