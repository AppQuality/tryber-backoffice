import { renderWithProviders } from "src/utils/test-utils";
import SelectionTable from "src/pages/campaigns/selection/SelectionTable/index";

describe("Selection table", () => {
  it("should render an empty state if no data is provided", async function () {
    const { findByText } = renderWithProviders(<SelectionTable />);
    expect(await findByText("There's no data here")).toBeVisible();
  });
  it("should show the column name", async function () {
    const { findByText } = renderWithProviders(<SelectionTable />);
    expect(await findByText("Name ID")).toBeInTheDocument();
    expect(await findByText("Level")).toBeInTheDocument();
    expect(await findByText("Tot EXP")).toBeInTheDocument();
    expect(await findByText("OS")).toBeInTheDocument();
    expect(await findByText("Devices")).toBeInTheDocument();
  });
});
