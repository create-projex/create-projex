import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("renders welcome message", () => {
    render(<App />);
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });

  it("renders project name", () => {
    render(<App />);
    expect(screen.getByText(/{{projectName}}/i)).toBeInTheDocument();
  });
});
