import SelectionFilters from ".";
import { renderWithProviders } from "src/utils/test-utils";
import { fireEvent } from "@testing-library/react";

describe("selection filters", () => {
  it("should show card title", async () => {
    const { findByText } = renderWithProviders(<SelectionFilters id={"10"} />);
    expect(await findByText("Add filters")).toBeVisible();
  });

  it("should show add filters button", async () => {
    const { findByTestId } = renderWithProviders(
      <SelectionFilters id={"10"} />
    );
    expect(await findByTestId("selectionFilters_add")).toBeVisible();
  });

  it("should show apply button", async () => {
    const { findByTestId } = renderWithProviders(
      <SelectionFilters id={"10"} />
    );
    expect(await findByTestId("selectionFilters_apply")).toBeVisible();
  });

  it("apply button should be disabled", async () => {
    const { findByTestId } = renderWithProviders(
      <SelectionFilters id={"10"} />
    );
    expect(await findByTestId("selectionFilters_apply")).toBeDisabled();
  });

  it("should show filter row when click add new", async () => {
    const { findByTestId, findByText, findByPlaceholderText } =
      renderWithProviders(<SelectionFilters id={"10"} />);
    fireEvent.click(await findByTestId("selectionFilters_add"));
    expect(await findByText("Filter by")).toBeVisible();
    expect(await findByText("Include")).toBeVisible();
    expect(await findByPlaceholderText("Search")).toBeVisible();
    expect(await findByTestId("filterRow_delete")).toBeVisible();
  });
});
