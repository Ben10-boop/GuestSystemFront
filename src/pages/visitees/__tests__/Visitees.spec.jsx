import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Visitees from "../Visitees";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("Visitees", () => {
  beforeEach(() => {
    axios.delete.mockResolvedValue({ data: [] });
    axios.get.mockResolvedValue({
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
    });
  });
  it("should display visitee data", async () => {
    render(
      <BrowserRouter>
        <Visitees />
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
          <Visitees />
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
          <Visitees />
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
