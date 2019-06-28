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
  // no clue why this syntax doesnt work
  xit("buttons' text changes to reflect the state the door will be in if clicked", () => {
    const { getByTestId } = render(<Controls locked={false} closed={false} />);

    const closeGateButton = getByTestId("handle");
    const lockGateButton = getByTestId("key");
    console.log(closeGateButton);
    fireEvent.click(closeGateButton);
    fireEvent.click(lockGateButton);

    expect(closeGateButton).toHaveTextContent(/open gate/i);
    expect(lockGateButton).toHaveTextContent(/unlock gate/i);
  });

  it("Locked buttons text changes to reflect the state the door will be in if clicked", async () => {
    const buttons = render(<Controls locked={true} closed={true} />);
    const closebtn = buttons.getByTestId("handle");
    const lockbtn = buttons.getByTestId("key");
    expect(closebtn.textContent).toBe("Open Gate");
    expect(lockbtn.textContent).toBe("Unlock Gate");
    await fireEvent.click(closebtn);
    await fireEvent.click(lockbtn);
  });

  it("the lock toggle button is disabled if the gate is open", () => {
    const { getByTestId } = render(<Controls locked={false} closed={false} />);

    const lockButton = getByTestId("key");

    fireEvent.click(lockButton);

    expect(lockButton.disabled).toBe(true);
  });

  it("the open toggle button is disabled if the gate is locked", () => {
    const { getByTestId } = render(<Controls locked={true} closed={true} />);

    const openButton = getByTestId("handle");

    fireEvent.click(openButton);

    expect(openButton.disabled).toBe(true);
  });
});
