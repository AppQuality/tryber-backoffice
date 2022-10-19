import ColumnsConfigurator from ".";
import { renderWithProviders } from "src/utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, waitFor } from "@testing-library/react";
import { mapCampaingFormData, mapSelectedQuestions } from "./mapData";

const mockedFormsResponse = [
  { id: 1, question: "Question 1" },
  { id: 2, question: "Question 2" },
  { id: 3, question: "Question 3" },
  { id: 4, question: "Question 4" },
  { id: 5, question: "Question 5" },
  { id: 6, question: "Question six with short name", shortName: "Quest_6" },
];

const mockedSelectedOptions = [
  { value: "2", label: "Question 2" },
  { value: "5", label: "Question 5" },
  { value: "6", label: "Quest_6" },
];

export const handlers = [
  rest.get("http://localhost/campaigns/10/forms", (req, res, ctx) => {
    return res(ctx.json(mockedFormsResponse), ctx.delay(50));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("columns configurator", () => {
  it("should show a multiselect label with campaign ID", async () => {
    const { findByText } = renderWithProviders(
      <ColumnsConfigurator id={"10"} />
    );
    expect(await findByText("Add columns by Form Campaign 10")).toBeVisible();
  });

  it("should map the campaign form response and return multiselect options", () => {
    const result = mapCampaingFormData(mockedFormsResponse);
    expect(result).toEqual([
      { value: "1", label: "Question 1" },
      { value: "2", label: "Question 2" },
      { value: "3", label: "Question 3" },
      { value: "4", label: "Question 4" },
      { value: "5", label: "Question 5" },
      { value: "6", label: "Quest_6" },
    ]);
  });

  it("should map selected columns (questions) and return array of id", () => {
    const result = mapSelectedQuestions(mockedSelectedOptions);
    expect(result).toEqual(["question2", "question5", "question6"]);
  });

  it("should show multiselect options with question", async () => {
    const { container, getByText } = renderWithProviders(
      <ColumnsConfigurator id={"10"} />
    );
    const columns = container.querySelector(".css-1hb7zxy-IndicatorsContainer");
    if (!columns) throw new Error("columns not found");
    expect(columns).not.toBeNull();
    fireEvent.mouseDown(columns, { button: 0 });
    await waitFor(() => expect(getByText("Question 1")).toBeVisible());
  });

  it("should show multiselect options with shortName", async () => {
    const { container, getByText } = renderWithProviders(
      <ColumnsConfigurator id={"10"} />
    );
    const columns = container.querySelector(".css-1hb7zxy-IndicatorsContainer");
    if (!columns) throw new Error("columns not found");
    expect(columns).not.toBeNull();
    fireEvent.mouseDown(columns, { button: 0 });
    await waitFor(() => expect(getByText("Quest_6")).toBeVisible());
  });

  it("should show apply button", async () => {
    const { findByTestId } = renderWithProviders(
      <ColumnsConfigurator id={"10"} />
    );
    expect(await findByTestId("columnsConfigurator_apply")).toBeVisible();
  });
});
