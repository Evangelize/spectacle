import React, { Component, PropTypes } from "react";
import {
  Rectangle,
  Circle,
  Ellipse,
  Line,
  Polyline,
  CornerBox,
  Triangle
} from "../utils/svg-shapes";
import { getStyles } from "../utils/base";
import Radium from "radium";
import isUndefined from "lodash/isUndefined";

@Radium
export default class Shape extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className={this.props.className} style={[getStyles.call(this)]}>
        {type === "rectangle" &&
          <Rectangle
            width={this.props.width}
            height={this.props.height}
            style={this.props.style}
            x={this.props.x}
            y={this.props.y}
          />
        }
        {type === "circle" &&
          <Circle
            r={this.props.r}
            style={this.props.style}
          />
        }
        {type === "ellipse" &&
          <Ellipse
            rx={this.props.rx}
            ry={this.props.ry}
            style={this.props.style}
          />
        }
        {type === "line" &&
          <Line
            x1={this.props.x1}
            x2={this.props.x2}
            y1={this.props.y1}
            y2={this.props.y2}
            style={this.props.style}
          />
        }
        {type === "polyline" &&
          <Polyline
            points={this.props.points}
            style={this.props.style}
          />
        }
        {type === "cornerBox" &&
          <CornerBox
            width={this.props.width}
            size={this.props.size}
            orientation={this.props.orientation}
            style={this.props.style}
          />
        }
        {type === "triangle" &&
          <Triangle
            width={this.props.width}
            height={this.props.height}
            style={this.props.style}
          />
        }
      </div>
    );
  }
}

Shape.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};

Shape.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.number,
  orientation: PropTypes.string,
  points: PropTypes.string,
  r: PropTypes.number,
  rx: PropTypes.number,
  ry: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  width: PropTypes.number,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

Shape.defaultProps = {
  type: "rectangle",
  width: 100,
  height: 100,
  style: {},
  orientation: "topLeft",
  points: "25,25 25,350 500,350 500,500 305,250 20,15",
  r: 50,
  rx: 300,
  ry: 100,
  x1: 25,
  x2: 350,
  y1: 25,
  y2: 25,
  x: 0,
  y: 0
};
