import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import AddAdmin from "../AddAdmin";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("AddAdmin", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: [] });
  });
  it("Should display email error when wrong email entered", async () => {
    render(
      <BrowserRouter>
        <AddAdmin />
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
  it("Should display all fields req error when not all fields filled", async () => {
    render(
      <BrowserRouter>
        <AddAdmin />
      </BrowserRouter>
    );
    const button = await screen.findByTestId("submit_button");

    fireEvent.click(button);
    const errorText = await screen.findByTestId("err_all_fields_req");

    expect(errorText).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
  it("Should display password match error when passwords don't match", async () => {
    render(
      <BrowserRouter>
        <AddAdmin />
      </BrowserRouter>
    );
    const passwordInput = await screen.findByTestId("password_field");
    const passwordConfInput = await screen.findByTestId("password_conf_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(passwordInput, { target: { value: "sdvfvdfbsfv" } });
    fireEvent.change(passwordConfInput, {
      target: { value: "avsdfbstvddsava" },
    });
    fireEvent.click(button);
    const errorText = await screen.findByTestId("err_passwords_match");

    expect(errorText).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
  it("Form should get submitted if all fields entered correctly", async () => {
    render(
      <BrowserRouter>
        <AddAdmin />
      </BrowserRouter>
    );
    const nameInput = await screen.findByTestId("name_field");
    const input = await screen.findByTestId("email_field");
    const passwordInput = await screen.findByTestId("password_field");
    const passwordConfInput = await screen.findByTestId("password_conf_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(nameInput, { target: { value: "Tomas Tomukas" } });
    fireEvent.change(input, { target: { value: "Tomas@Tomukas.com" } });
    fireEvent.change(passwordInput, { target: { value: "acsdvsd3564.vfdv" } });
    fireEvent.change(passwordConfInput, {
      target: { value: "acsdvsd3564.vfdv" },
    });
    fireEvent.click(button);

    expect(axios.post).toHaveBeenCalled();
  });
});
