import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import EditVisitee from "../EditVisitee";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("EditVisitee", () => {
  beforeEach(() => {
    axios.patch.mockResolvedValue({ data: [] });
    axios.get.mockResolvedValue({
      data: {
        id: 1,
        name: "Petras Petraitis",
        email: "darb1@gmail.com",
        status: "visitable",
      },
    });
  });
  describe("Email field", () => {
    it("Should display email error when wrong email entered", async () => {
      render(
        <BrowserRouter>
          <EditVisitee />
        </BrowserRouter>
      );
      const input = await screen.findByTestId("email_field");
      const button = await screen.findByTestId("submit_button");

      fireEvent.change(input, { target: { value: "Tomas Tomukas" } });
      fireEvent.click(button);
      const errorText = await screen.findByTestId("err_invalid_email");

      expect(errorText).toBeInTheDocument();
      expect(axios.patch).not.toHaveBeenCalled();
    });
  });
  it("Form should get submitted if all fields entered correctly", async () => {
    render(
      <BrowserRouter>
        <EditVisitee />
      </BrowserRouter>
    );
    const nameInput = await screen.findByTestId("name_field");
    const input = await screen.findByTestId("email_field");
    const statusInput = await screen.findByTestId("status_field");

    fireEvent.change(nameInput, { target: { value: "Tomas Tomukas" } });
    fireEvent.change(input, { target: { value: "Tomas@Tomukas.com" } });
    fireEvent.change(statusInput, { target: { value: "unvisitable" } });
    const button = await screen.findByTestId("submit_button");
    fireEvent.click(button);
    const errorText = screen.queryByTestId("invalid_email_err");

    expect(errorText).not.toBeInTheDocument();
    expect(axios.patch).toHaveBeenCalled();
  });
});
