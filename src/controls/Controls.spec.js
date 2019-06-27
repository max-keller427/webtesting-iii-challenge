// Test away!
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import * as rtl from "@testing-library/react";
import "jest-dom/extend-expect";

afterEach(rtl.cleanup);

import Controls from "./Controls";

describe("<Controls/>", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Controls />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should provide buttons to toggle the closed and locked states.", () => {
    const { getByText } = render(<Controls />);

    const lockGateButton = getByText(/lock gate/i);
    const closeGateButton = getByText(/close gate/i);

    expect(lockGateButton).toBeTruthy();
    expect(closeGateButton).toBeTruthy();
  });

  it("buttons' text changes to reflect the state the door will be in if clicked", () => {
    const { getByTestId } = render(<Controls locked={false} closed={false} />);

    const closeGateButton = getByTestId("handle");
    const lockGateButton = getByTestId("key");

    fireEvent.click(closeGateButton);
    fireEvent.click(lockGateButton);

    expect(closeGateButton).toHaveTextContent(/open gate/i);
    expect(lockGateButton).toHaveTextContent(/unlock gate/i);
  });

  xit("the closed toggle button is disabled if the gate is locked", () => {});
});
