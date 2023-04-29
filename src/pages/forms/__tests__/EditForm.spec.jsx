import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import EditForm from "../EditForm";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("EditForm", () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      console.log(url);
      if (url.includes("Active")) {
        return {
          data: [
            {
              id: 2,
              name: "Darb Darbuotojas2",
              email: "darb2@gmail.com",
              status: "visitable",
            },
            {
              id: 6,
              name: "Piotr Petrowski",
              email: "ppetr@gmail.com",
              status: "visitable",
            },
            {
              id: 8,
              name: "Antanas Antanaitis",
              email: "antant@gmail.com",
              status: "visitable",
            },
          ],
        };
      }
      if (url.includes("Documents")) {
        return {
          data: [
            {
              id: 2,
              title: "Darb Darbuotojas2",
              content: "ajdsovuabovboahvoajhfvjalbjafslbjn",
              status: "active",
            },
            {
              id: 6,
              title: "Piotr Petrowski",
              content: "aavefaofhaovaovrjoraijvpar",
              status: "active",
            },
            {
              id: 8,
              title: "Antanas Antanaitis",
              content: "aadbsgbfawef vservfdabfa",
              status: "inactive",
            },
          ],
        };
      }
      return {
        data: {
          id: 0,
          name: "Justas Justaitis",
          email: "justAS1@gmail.com",
          visitPurpose: "Birthday party",
          signature: "sdvsfvdsfvsvsdcsdv",
          entranceTime: "2023-03-14T11:36:19.913",
          departureTime: null,
          visiteeId: 1,
          wifiAccessStatus: "granted",
        },
      };
    });
    axios.patch.mockResolvedValue({ data: [] });
  });
  describe("Email field", () => {
    it.skip("should display email error when wrong email entered", async () => {
      render(
        <BrowserRouter>
          <EditForm />
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
  it.skip("should submit form if all fields entered correctly", async () => {
    render(
      <BrowserRouter>
        <EditForm />
      </BrowserRouter>
    );
    const nameInput = await screen.findByTestId("guest_name_field");
    const input = await screen.findByTestId("email_field");
    //const purposeInput = await screen.findByTestId("purpose-field");
    const entrTimeDateInput = await screen.findByTestId("entr_time_date_field");
    const entrTimeHourInput = await screen.findByTestId("entr_time_hour_field");
    const entrTimeMinuteInput = await screen.findByTestId(
      "entr_time_min_field"
    );
    const depTimeDateInput = await screen.findByTestId(
      "depart_time_date_field"
    );
    const depTimeHourInput = await screen.findByTestId(
      "depart_time_hour_field"
    );
    const depTimeMinInput = await screen.findByTestId("depart_time_min_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(nameInput, { target: { value: "Tomas Tomukas" } });
    fireEvent.change(input, { target: { value: "Ttom@gmail.com" } });
    //fireEvent.change(purposeInput, { target: { value: "Business" } });
    fireEvent.change(entrTimeDateInput, { target: { value: "2023-04-04" } });
    fireEvent.change(entrTimeHourInput, { target: { value: 5 } });
    fireEvent.change(entrTimeMinuteInput, {
      target: { value: 10 },
    });
    fireEvent.change(depTimeDateInput, { target: { value: "2023-05-04" } });
    fireEvent.change(depTimeHourInput, { target: { value: 5 } });
    fireEvent.change(depTimeMinInput, {
      target: { value: 10 },
    });
    fireEvent.click(button);

    expect(nameInput).toHaveValue("Tomas Tomukas");
    expect(input).toHaveValue("Ttom@gmail.com");
    //expect(purposeInput).toHaveValue("Business");
    expect(entrTimeDateInput).toHaveValue("2023-04-04");
    expect(depTimeDateInput).toHaveValue("2023-05-04");
    expect(axios.patch).toHaveBeenCalled();
  });
});
