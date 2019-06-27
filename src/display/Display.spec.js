// Test away!
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import * as rtl from "@testing-library/react";

import Display from "./Display";

describe("<Display/>", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Display />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("matches the snapshot with changed state", () => {
    const tree = renderer.create(<Display locked={true} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("displays if gate is open/closed", () => {
    const { getByText } = render(<Display />);

    const unlocked = getByText(/unlocked/i);
    const open = getByText(/open/i);

    expect(unlocked).toBeTruthy();
    expect(open).toBeTruthy();
  });

  it("displays 'Closed' if the closed prop is true", () => {
    const { getByText } = render(<Display closed={true} />);

    const closed = getByText(/closed/i);

    expect(closed).toBeTruthy();
  });

  xit("displays 'Locked' if the locked prop is true", () => {
    const { getByTestId } = render(<Display locked={true} />);

    const locked = getByTestId(/lock/i);

    expect(locked).toHaveTextContent(/locked/i);
  });

  it("when locked or closed use the red-led class", () => {
    const wrapper = rtl.render(<Display closed={true} locked={true} />);

    expect(wrapper.container.firstChild.firstChild.classList[1]).toBe(
      "red-led"
    );
  });

  it("when unlocked or open use the green-led class", () => {
    const wrapper = rtl.render(<Display closed={false} locked={false} />);

    expect(wrapper.container.firstChild.firstChild.classList[1]).toBe(
      "green-led"
    );
  });
});
