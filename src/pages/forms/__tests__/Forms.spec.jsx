import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Forms from "../Forms";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");
let mockUser = {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "super",
};
jest.mock("../../../hooks/UseUser", () => {
  return {
    useUser: () => ({
      getUser: () => {
        console.log("test");
        return mockUser;
      },
    }),
  };
});

describe("Forms", () => {
  beforeEach(() => {
    axios.delete.mockResolvedValue({ data: [] });
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
  it("should display visitee data", async () => {
    render(
      <BrowserRouter>
        <Forms />
      </BrowserRouter>
    );
    const tableRow2 = await screen.findByTestId("table_row_2");

    expect(tableRow2).toBeInTheDocument();
    expect(axios.delete).not.toHaveBeenCalled();
  });
  describe("Delete dialog", () => {
    it("Should display when clicking 'delete'", async () => {
      render(
        <BrowserRouter>
          <Forms />
        </BrowserRouter>
      );
      const openDialogButton = await screen.findByTestId(
        "table_delete_dialog_btn_2"
      );

      fireEvent.click(openDialogButton);
      const confirmDeleteButton = await screen.findByTestId(
        "table_delete_conf_btn_2"
      );

      expect(confirmDeleteButton).toBeInTheDocument();
      expect(axios.delete).not.toHaveBeenCalled();
    });
    it("Should call delete when clicking 'delete confirmation'", async () => {
      render(
        <BrowserRouter>
          <Forms />
        </BrowserRouter>
      );
      const openDialogButton = await screen.findByTestId(
        "table_delete_dialog_btn_2"
      );

      fireEvent.click(openDialogButton);
      const confirmDeleteButton = await screen.findByTestId(
        "table_delete_conf_btn_2"
      );
      fireEvent.click(confirmDeleteButton);

      expect(axios.delete).toHaveBeenCalled();
    });
  });
});
