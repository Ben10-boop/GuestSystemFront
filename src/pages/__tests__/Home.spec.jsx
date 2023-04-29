import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../Home";
import axios from "axios";
import "../../i18nextInit";

jest.mock("axios");

describe("Home", () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes("ActiveGuests")) {
        return {
          data: [
            {
              name: "string",
              guestType: "string",
              status: "string",
              personBeingVisited: "string",
              guestInfo: {
                userName: "string",
                password: "string",
                emailAddress: "string",
              },
              guestAccessInfo: {
                validDays: 0,
                fromDate: "string",
                toDate: "string",
              },
              portalId: "string",
            },
            {
              name: "string",
              guestType: "string",
              status: "string",
              personBeingVisited: "string",
              guestInfo: {
                userName: "string",
                password: "string",
                emailAddress: "string",
              },
              guestAccessInfo: {
                validDays: 0,
                fromDate: "string",
                toDate: "string",
              },
              portalId: "string",
            },
            {
              name: "string",
              guestType: "string",
              status: "string",
              personBeingVisited: "string",
              guestInfo: {
                userName: "string",
                password: "string",
                emailAddress: "string",
              },
              guestAccessInfo: {
                validDays: 0,
                fromDate: "string",
                toDate: "string",
              },
              portalId: "string",
            },
          ],
        };
      }
      return {
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
      };
    });
    axios.post.mockResolvedValue({ data: [] });
  });
  it("should display forms data", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const tableRow2 = await screen.findByTestId("table_row_2");

    expect(tableRow2).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
  it("should display guests data", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const tableRow2 = await screen.findByTestId("guest_table_row_2");

    expect(tableRow2).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
  describe("Alarm dialog", () => {
    it("Should display when clicking 'alarm'", async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      const openDialogButton = await screen.findByTestId(
        "table_alarm_dialog_btn"
      );

      fireEvent.click(openDialogButton);
      const confirmAlarmButton = screen.queryByTestId("alarm_dialog_conf_btn");

      expect(confirmAlarmButton).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("Should call post when clicking 'alarm confirmation'", async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      const openDialogButton = await screen.findByTestId(
        "table_alarm_dialog_btn"
      );

      fireEvent.click(openDialogButton);
      //await timeout(500);
      const confirmAlarmButton = screen.queryByTestId("alarm_dialog_conf_btn");
      fireEvent.click(confirmAlarmButton);

      expect(axios.post).toHaveBeenCalled();
    });
  });
});
