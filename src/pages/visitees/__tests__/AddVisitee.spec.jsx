import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import AddVisitee from "../AddVisitee";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("AddVisitee", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: [] });
  });
  describe("Email field", () => {
    it("Should display email error when wrong email entered", async () => {
      render(
        <BrowserRouter>
          <AddVisitee />
        </BrowserRouter>
      );
      const input = await screen.findByTestId("email_field");
      const button = await screen.findByTestId("submit_button");

      fireEvent.change(input, { target: { value: "Tomas Tomukas" } });
      fireEvent.click(button);
      const errorText = await screen.findByTestId("err_invalid_email");

      expect(errorText).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
  it("Should display all fields req error when not all fields filled", async () => {
    render(
      <BrowserRouter>
        <AddVisitee />
      </BrowserRouter>
    );
    const button = await screen.findByTestId("submit_button");

    fireEvent.click(button);
    const errorText = await screen.findByTestId("err_all_fields_req");

    expect(errorText).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
  it("Form should get submitted if all fields entered correctly", async () => {
    render(
      <BrowserRouter>
        <AddVisitee />
      </BrowserRouter>
    );
    const nameInput = await screen.findByTestId("name_field");
    const input = await screen.findByTestId("email_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(nameInput, { target: { value: "Tomas Tomukas" } });
    fireEvent.change(input, { target: { value: "Tomas@Tomukas.com" } });
    fireEvent.click(button);
    const errorText = screen.queryByTestId("invalid_email_err");

    expect(errorText).not.toBeInTheDocument();
    expect(axios.post).toHaveBeenCalled();
  });
});
