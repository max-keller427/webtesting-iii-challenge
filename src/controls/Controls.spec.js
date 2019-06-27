// Test away!
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import { render, fireEvent } from "@testing-library/react";

import Controls from "./Controls";

describe("<Controls/>", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Controls />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  xit("should toggle the lock button", () => {
    const push = jest.fn();
    const { getByText } = render(<Controls locked={false} />);

    const button = getByText(/lock gate/i);

    fireEvent.click(button);

    expect(push).toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(1);
  });
});
