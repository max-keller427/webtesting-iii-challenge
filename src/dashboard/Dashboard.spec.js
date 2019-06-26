// Test away
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import Dashboard from "./Dashboard";

describe("the dashboard component", () => {
  it("renders without crashing", () => {
    const renderTest = render(<Dashboard />);
  });
});
