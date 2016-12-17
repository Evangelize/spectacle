import React from "react";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import Shape from "./shape";

describe("<Shape />", () => {
  test("should render correctly.", () => {
    const context = { styles: { components: { shape: { fontWeight: 500 } } } };
    const wrapper = mount(
      <Shape
        type="rectangle"
        width={100}
        height={100}
        fill={{ color: "#2409ba" }}
        stroke={{ color: "#fff" }}
        strokeWidth={3}
      />,
    { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
