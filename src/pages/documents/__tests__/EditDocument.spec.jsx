import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import EditDocument from "../EditDocument";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("EditDocument", () => {
  beforeEach(() => {
    axios.patch.mockResolvedValue({ data: [] });
    axios.get.mockResolvedValue({
      data: {
        id: 8,
        title: "Antanas Antanaitis",
        content: "aadbsgbfawef vservfdabfa",
        status: "inactive",
      },
    });
  });
  describe("File field", () => {
    it("Should display wrong file err when file type not .pdf", async () => {
      render(
        <BrowserRouter>
          <EditDocument />
        </BrowserRouter>
      );
      const content = new File(["stuff"], "document.png", {
        type: "image/png",
      });
      const input = await screen.findByTestId("title_field");
      const statusInput = await screen.findByTestId("status_field");
      const fileInput = await screen.findByTestId("file_upload_field");
      const button = await screen.findByTestId("submit_button");

      fireEvent.change(input, { target: { value: "Tomas Tomukas" } });
      fireEvent.change(statusInput, { target: { value: "active" } });
      fireEvent.change(fileInput, {
        target: { files: [content] },
      });
      fireEvent.click(button);
      const errorText = await screen.findByTestId("err_file_must_be_pdf");

      expect(errorText).toBeInTheDocument();
      expect(axios.patch).not.toHaveBeenCalled();
    });
  });
  it("Form should get submitted if all fields entered correctly", async () => {
    render(
      <BrowserRouter>
        <EditDocument />
      </BrowserRouter>
    );
    const content = new File(["stuff"], "document.pdf", {
      type: "application/pdf",
    });
    const input = await screen.findByTestId("title_field");
    const statusInput = await screen.findByTestId("status_field");
    const fileInput = await screen.findByTestId("file_upload_field");
    const button = await screen.findByTestId("submit_button");

    fireEvent.change(input, { target: { value: "Tomas Tomukas" } });
    fireEvent.change(statusInput, { target: { value: "active" } });
    fireEvent.change(fileInput, {
      target: { files: [content] },
    });
    fireEvent.click(button);

    expect(axios.patch).toHaveBeenCalled();
  });
});
