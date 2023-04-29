import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Admins from "../Admins";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("Admins", () => {
  beforeEach(() => {
    axios.delete.mockResolvedValue({ data: [] });
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Vardaitis Pavardaitienis",
          email: "admin1@gmail.com",
          role: "regular",
        },
        {
          id: 2,
          name: "Antanas Antanaitis",
          email: "admin0@gmail.com",
          role: "super",
        },
        {
          id: 3,
          name: "Tomas Petraitis",
          email: "admin2@gmail.com",
          role: "removed",
        },
      ],
    });
  });
  it("should display admin data", async () => {
    render(
      <BrowserRouter>
        <Admins />
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
          <Admins />
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
          <Admins />
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
