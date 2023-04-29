import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Documents from "../Documents";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("Documents", () => {
  beforeEach(() => {
    axios.delete.mockResolvedValue({ data: [] });
    axios.get.mockResolvedValue({
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
    });
  });
  it("should display document data", async () => {
    render(
      <BrowserRouter>
        <Documents />
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
          <Documents />
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
          <Documents />
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
