import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import AddForm from "../AddForm";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("AddForm", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 0,
          name: "Darb Darbuotojas2",
          email: "darb2@gmail.com",
          status: "visitable",
        },
        {
          id: 1,
          name: "Piotr Petrowski",
          email: "ppetr@gmail.com",
          status: "visitable",
        },
        {
          id: 2,
          name: "Antanas Antanaitis",
          email: "antant@gmail.com",
          status: "visitable",
        },
      ],
    });
    axios.post.mockResolvedValue({ data: [] });
  });
  describe("Email field", () => {
    it("should display email error when wrong email entered", async () => {
      render(
        <BrowserRouter>
          <AddForm />
        </BrowserRouter>
      );
      const input = await screen.findByTestId("email_field");
      const button = await screen.findByTestId("submit_button");

      fireEvent.change(input, { target: { value: "Tomas Tomukas" } });
      fireEvent.click(button);

      const errorText = await screen.findByTestId("invalid_email_err");
      expect(errorText).toBeInTheDocument();
    });
  });
  it("Should display all fields req error when not all fields filled", async () => {
    render(
      <BrowserRouter>
        <AddForm />
      </BrowserRouter>
    );
    const input = await screen.findByTestId("email_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(input, { target: { value: "Ttom@gmail.com" } });
    fireEvent.click(button);
    const errorText = await screen.findByTestId("err_all_fields_req");

    expect(errorText).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
  //Does not work because MUI is incompatible

  // it("should submit form if all fields entered correctly", async () => {
  //   render(
  //     <BrowserRouter>
  //       <AddForm />
  //     </BrowserRouter>
  //   );
  //   const nameInput = await screen.findByTestId("guest_name_field");
  //   const input = await screen.findByTestId("email_field");
  //   const purposeInput = await screen.findByTestId("purpose_field");
  //   const entrTimeDateInput = await screen.findByTestId("entr_time_date_field");
  //   const entrTimeHourInput = await screen.findByTestId("entr_time_hour_field");
  //   const entrTimeMinuteInput = await screen.findByTestId(
  //     "entr_time_min_field"
  //   );
  //   const depTimeDateInput = await screen.findByTestId(
  //     "depart_time_date_field"
  //   );
  //   const depTimeHourInput = await screen.findByTestId(
  //     "depart_time_hour_field"
  //   );
  //   const depTimeMinInput = await screen.findByTestId("depart_time_min_field");
  //   const visiteeInput = await screen.findByTestId("visitee_field");
  //   const button = await screen.findByTestId("submit_button");

  //   fireEvent.change(nameInput, { target: { value: "Tomas Tomukas" } });
  //   fireEvent.change(input, { target: { value: "Ttom@gmail.com" } });
  //   fireEvent.change(purposeInput, { target: { value: "Business" } });
  //   fireEvent.change(entrTimeDateInput, { target: { value: "2023-04-04" } });
  //   // fireEvent.change(entrTimeHourInput, { target: { value: 5 } });
  //   // fireEvent.change(entrTimeMinuteInput, {
  //   //   target: { value: 10 },
  //   // });
  //   fireEvent.change(depTimeDateInput, { target: { value: "2023-05-04" } });
  //   // fireEvent.change(depTimeHourInput, { target: { value: 5 } });
  //   // fireEvent.change(depTimeMinInput, {
  //   //   target: { value: 10 },
  //   // });
  //   const selectNode = visiteeInput.childNodes[0].childNodes[0];
  //   fireEvent.change(selectNode, { target: { value: "1" } });
  //   fireEvent.click(button);
  //   const errorText = screen.queryByTestId("err_all_fields_req");

  //   expect(nameInput).toHaveValue("Tomas Tomukas");
  //   expect(input).toHaveValue("Ttom@gmail.com");
  //   expect(purposeInput).toHaveValue("Business");
  //   expect(entrTimeDateInput).toHaveValue("2023-04-04");
  //   // expect(entrTimeHourInput).toHaveValue("5");
  //   // expect(entrTimeMinuteInput).toHaveValue("10");
  //   expect(depTimeDateInput).toHaveValue("2023-05-04");
  //   // expect(depTimeHourInput).toHaveValue("5");
  //   // expect(depTimeMinInput).toHaveValue("10");
  //   expect(selectNode).toHaveValue("1");
  //   expect(errorText).not.toBeInTheDocument();
  //   expect(axios.post).toHaveBeenCalled();
  // });
});
