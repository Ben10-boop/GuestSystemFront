import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import AddDocument from "../AddDocument";
import axios from "axios";
import "../../../i18nextInit";

jest.mock("axios");

describe("AddDocument", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: [] });
  });
  describe("File field", () => {
    it("Should display no file error when no file uploaded", async () => {
      render(
        <BrowserRouter>
          <AddDocument />
        </BrowserRouter>
      );
      const input = await screen.findByTestId("title_field");
      const statusInput = await screen.findByTestId("status_field");
      const button = await screen.findByTestId("submit_button");

      fireEvent.change(input, { target: { value: "Tomas Tomukas" } });
      fireEvent.change(statusInput, { target: { value: "active" } });
      fireEvent.click(button);
      const errorText = await screen.findByTestId("err_no_file");

      expect(errorText).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("Should display wrong file err when file type not .pdf", async () => {
      render(
        <BrowserRouter>
          <AddDocument />
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
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
  it("Should display all fields req error when not all fields filled", async () => {
    render(
      <BrowserRouter>
        <AddDocument />
      </BrowserRouter>
    );
    const button = await screen.findByTestId("submit_button");

    fireEvent.click(button);
    const errorText = await screen.findByTestId("err_all_fields_req");

    expect(errorText).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
  it("Form should get submitted if all fields entered correctly", async () => {
    render(
      <BrowserRouter>
        <AddDocument />
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

    expect(axios.post).toHaveBeenCalled();
  });
});
