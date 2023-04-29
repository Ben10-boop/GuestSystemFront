import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import EndVisit from "../EndVisit";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("EditVisitee", () => {
  beforeEach(() => {
    axios.patch.mockResolvedValue({ data: [] });
    axios.get.mockResolvedValue({
      data: [
        {
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
        {
          id: 1,
          name: "Justinas Justinauskas",
          email: "tomasTomukas@gmail.com",
          visitPurpose: "Business meeting",
          signature: "csdvsdvsfvsdvsdsdv",
          entranceTime: "2023-03-14T11:36:19.913",
          departureTime: "2023-05-31T07:30:00",
          visiteeId: 1,
          wifiAccessStatus: "granted",
        },
        {
          id: 2,
          name: "Tomukas Tomukaitis",
          email: "ttomastomuk@gmail.com",
          visitPurpose: "Business",
          signature: "dvsfvfdbdfbsdbdfbdf",
          entranceTime: "2023-04-16T04:08:00",
          departureTime: "2023-04-19T04:10:00",
          visiteeId: 2,
          wifiAccessStatus: "not requested",
        },
      ],
    });
  });
  it("Should display error when wrong name entered", async () => {
    render(
      <BrowserRouter>
        <EndVisit />
      </BrowserRouter>
    );
    const input = await screen.findByTestId("name_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(input, { target: { value: "Tomas Tomukas" } });
    fireEvent.click(button);
    const errorText = await screen.findByTestId("err_name_not_found");

    expect(errorText).toBeInTheDocument();
    expect(axios.patch).not.toHaveBeenCalled();
  });
  it("Form should get submitted if field entered correctly", async () => {
    render(
      <BrowserRouter>
        <EndVisit />
      </BrowserRouter>
    );
    const input = await screen.findByTestId("name_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(input, { target: { value: "Justas Justaitis" } });
    fireEvent.click(button);
    const errorText = screen.queryByTestId("err_name_not_found");

    expect(errorText).not.toBeInTheDocument();
    expect(axios.patch).toHaveBeenCalled();
  });
});
