import React from "react";
import _ from "lodash";

const parseStyle = (style) => {
  const svgStyle = _.pickBy(style, (value, key) => {
    const keys = ["fill", "stroke", "strokeWidth"];
    return keys.indexOf(key) > -1;
  });
  const divStyle = _.omitBy(style, (value, key) => {
    const keys = ["fill", "stroke", "strokeWidth"];
    return keys.indexOf(key) > -1;
  });
  return {
    svgStyle,
    divStyle
  };
};

export class SVGComponent extends React.Component {
  render() {
    const { height, width, style } = this.props;
    const divStyle = Object.assign(
      {
        top: "0px",
        left: "0px",
        position: "absolute"
      },
      style
    );
    return (
      <div style={divStyle}>
        <svg height={height} width={width}>{this.props.children}</svg>
      </div>
    );
  }
}
export class Rectangle extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const strokeWidth = this.props.style.strokeWidth || 0;
    const height = (this.props.height || 0) + 2 * strokeWidth;
    const width = (this.props.width || 0) + 2 * strokeWidth;

    return (
      <SVGComponent height={height} width={width} style={divStyle}>
        <rect
          style={svgStyle}
          x={strokeWidth}
          y={strokeWidth}
          height={this.props.height}
          width={this.props.width}
        >
          {this.props.children}
        </rect>
      </SVGComponent>
    );
  }
}
export class Circle extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const strokeWidth = this.props.style.strokeWidth || 0;
    const r = this.props.r || 0;
    const height = (r * 2) + 2 * strokeWidth;
    const width = (r * 2) + 2 * strokeWidth;
    const cx = r + (strokeWidth / 2);
    const cy = r + (strokeWidth / 2);

    return (
      <SVGComponent height={height} width={width} style={divStyle}>
          <circle
            r={r}
            cx={cx}
            cy={cy}
            style={svgStyle}
          >
            {this.props.children}
          </circle>
      </SVGComponent>
    );
  }
}
export class Ellipse extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const strokeWidth = this.props.style.strokeWidth || 0;
    const rx = this.props.rx || 0;
    const ry = this.props.ry || 0;
    const height = (ry * 2) + 2 * strokeWidth;
    const width = (rx * 2) + 2 * strokeWidth;
    const cx = rx + (strokeWidth / 2);
    const cy = ry + (strokeWidth / 2);

    return (
      <SVGComponent height={height} width={width} style={divStyle}>
        <ellipse
          rx={rx}
          ry={ry}
          cx={cx}
          cy={cy}
          style={svgStyle}
        >
          {this.props.children}
        </ellipse>
      </SVGComponent>
    );
  }
}

export class Line extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const strokeWidth = this.props.style.strokeWidth || 0;
    const x = _.max([this.props.x1, this.props.x2]);
    const y = _.max([this.props.y1, this.props.y2]);

    const height = y + (2 * strokeWidth);
    const width = x + (2 * strokeWidth);

    return (
      <SVGComponent height={height} width={width} style={divStyle}>
        <line {...this.props}>{this.props.children}</line>
      </SVGComponent>
    );
  }
}
export class Polyline extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const strokeWidth = this.props.style.strokeWidth || 0;
    const points = _.map(this.props.points.split(" "), (point) => {
      const xy = point.split(",");
      return {
        x: parseInt(xy[0], 10),
        y: parseInt(xy[1], 10)
      };
    });
    const x = _.max(_.map(points, (point) => {return point.x;}));
    const y = _.max(_.map(points, (point) => {return point.y;}));
    const height = y + (2 * strokeWidth);
    const width = x + (2 * strokeWidth);

    return (
      <SVGComponent height={height} width={width} style={divStyle}>
        <polyline {...this.props}>{this.props.children}</polyline>
      </SVGComponent>
    );
  }
}
export class Triangle extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const strokeWidth = this.props.style.strokeWidth || 0;
    const height = this.props.height || 0;
    const width = this.props.width || 0;
    const innerHeight = height - strokeWidth / 2;
    const innerWidth = width - strokeWidth / 2;
    const points = `0,${innerHeight} ${innerWidth / 2}, 0 ${innerWidth}, ${innerHeight}`;

    return (
      <SVGComponent
        height={height + strokeWidth}
        width={width + strokeWidth}
        style={divStyle}
      >
        <polygon
          transform={`translate(${3 * strokeWidth / 4},${11 * strokeWidth / 10})`}
          points={points}
          style={svgStyle}
        >
          {this.props.children}
        </polygon>
      </SVGComponent>
    );
  }
}

export class CornerLine extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const size = this.props.size || 150;
    const cornerWidth = this.props.width || 50;
    const strokeWidth = this.props.strokeWidth || 0;
    const max = size;
    const min = 0;
    const diff = max - cornerWidth;
    const up = this.props.up ? true : false;
    const point = up ? [[max, min], [min, max], [min, diff], [diff, min], [max, min]] : [[max, max], [min, min], [cornerWidth, min], [max, diff], [max, max]];
    const points = _.reduce(point, function (memo, num) {
      return memo + " " + num[0] + "," + num[1];
    }, "");
    const text = this.props.text;
    const x = this.props.x || max;
    const y = this.props.y || max;
    const rotate = up ? 315 : 45;
    const transform = "rotate(" + rotate.toString() + ")";

    return (
      <SVGComponent height={size} width={size} style={divStyle}>
        <polyline points={points} {...this.props} />
        <text x={x} y={y} transform={transform}>{this.props.text}</text>
      </SVGComponent>
    );
  }
}

export class CornerBox extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const type = this.props.orientation;
    const up = (type === "topLeft" || type === "bottomRight") ? true : false;
    const size = this.props.size;
    let cornerWidth = this.props.width;
    if (type === "bottomLeft" || type === "bottomRight") {
      cornerWidth = -1 * cornerWidth;
    }
    const offset = 20;
    let x = offset;
    let y = -1 * (cornerWidth / 2);
    if (up) {
      x = -(cornerWidth / 2);
      y = size - offset;
    }

    return (
      <CornerLine
        {...this.props}
        size={this.props.size}
        width={cornerWidth}
        text={this.props.text}
        x={x}
        y={y}
        up={up}
      />
    );
  }
}

export class Dimension extends React.Component {
  render() {
    const { divStyle, svgStyle } = parseStyle(this.props.style);
    const strokeWidth = this.props.style.strokeWidth || 0;
    const height = (this.props.height || 0) + 2 * strokeWidth;
    const width = (this.props.width || 0) + 2 * strokeWidth;
    const l = [strokeWidth, this.props.height];
    const x = [strokeWidth, strokeWidth];
    const y = [this.props.width, strokeWidth];
    const r = [this.props.width, this.props.height];
    const d = "M" + l.join(",") + " L" + x.join(",") + " L" + y.join(", ") + " L" + r.join(", ");

    return (
      <SVGComponent height={height} width={width} style={divStyle}>
        <path {...props} style={svgStyle} d={d} />
      </SVGComponent>
    );
  }
}

const sharedFields = {
  fill: { type: "colorPicker" },
  stroke: { type: "colorPicker" },
  strokeWidth: { type: "number" }
};
const sharedShapeMetaData = {
  defaultColors: {
    fill: { color: "#2409ba" },
    stroke: { color: "#E65243" },
    strokeWidth: 20
  }
};
export default {
  SVGComponent,
  Rectangle: _.extend(Rectangle, {
    metaData: {
      props: _.extend({
        width: 500,
        height: 300
      }, sharedShapeMetaData.defaultColors),
      settings: { fields: _.extend({
        width: { type: "number" },
        height: { type: "number" }
      }, sharedFields) }
    }
  }),
  Circle: _.extend(Circle, {
    metaData: {
      props: _.extend({
        r: 200
      }, sharedShapeMetaData.defaultColors),
      settings: { fields: _.extend({
        r: { type: "number" }
      }, sharedFields) }
    }
  }),
  Ellipse: _.extend(Ellipse, {
    metaData: {
      props: _.extend({
        rx: 300,
        ry: 100
      }, sharedShapeMetaData.defaultColors),
      settings: { fields: _.extend({
        rx: { type: "number" },
        ry: { type: "number" }
      }, sharedFields) }

    }
  }),
  Line: _.extend(Line, {
    metaData: {
      props: _.omit(_.extend({
        x1: 25,
        y1: 25,
        x2: 350,
        y2: 350
      }, sharedShapeMetaData.defaultColors), "fill"),
      settings: { fields: _.extend({
        x1: { type: "number" },
        y1: { type: "number" },
        x2: { type: "number" },
        y2: { type: "number" }
      }, sharedFields) }
    }
  }),
  Polyline: _.extend(Polyline, {
    metaData: {
      props: _.extend({
        points: "25,25 25,350 500,350 500,500 305,250 20,15"
      }, sharedShapeMetaData.defaultColors),
      settings: { fields: sharedFields }
    }
  }),
  Triangle: _.extend(Triangle, {
    metaData: {
      props: _.extend({
        width: 200,
        height: 200
      }, sharedShapeMetaData.defaultColors),
      settings: { fields: _.extend({
        width: { type: "number" },
        height: { type: "number" }
      }, sharedFields) }
    }
  }),
  CornerBox: _.extend(CornerBox, {
    metaData: {
      props: _.extend({
        size: 400,
        width: 150,
        text: "type your text",
        orientation: "topLeft"
      }, sharedShapeMetaData.defaultColors),
      settings: { fields: _.extend({
        width: { type: "number" },
        size: { type: "number" },
        orientation: {
          type: "select",
          settings: { options: ["topRight", "topLeft", "bottomRight", "bottomLeft"] }
        }
      }, sharedFields) }
    }
  }),
  CornerLine: _.extend(CornerLine, {
    metaData: {
      props: _.extend({
        size: 150,
        width: 50,
        text: "type your text",
        x: 25,
        y: 25,
        up: false
      }, sharedShapeMetaData.defaultColors),
      settings: { fields: _.extend({
        width: { type: "number" },
        size: { type: "number" },
        x: { type: "number" },
        y: { type: "number" },
        up: { type: "boolean" }
      }, sharedFields) }
    }
  }),
  Dimension: _.extend(Dimension, {
    metaData: {
      props: _.omit(_.extend({
        width: 250,
        height: 100
      }, sharedShapeMetaData.defaultColors), "fill"),
      settings: { fields: _.extend({
        width: { type: "number" },
        height: { type: "number" }
      }, sharedFields) }
    }
  })
};
