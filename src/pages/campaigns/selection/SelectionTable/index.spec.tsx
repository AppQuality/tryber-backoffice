import { renderWithProviders, setupMatchMediaMock } from "src/utils/test-utils";
import SelectionTable from "src/pages/campaigns/selection/SelectionTable/index";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getCandidatesMock } from "src/pages/campaigns/selection/SelectionTable/_mocked_data_";
import { renderHook } from "@testing-library/react-hooks";
import useTableRows from "./useTableRows";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { setupStore } from "src/store";
import { initialState } from "../selectionSlice";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import { FC } from "react";

const getWrapper =
  (): FC =>
  ({ children }) =>
    (
      <ThemeProvider theme={aqBootstrapTheme}>
        <Provider
          store={setupStore({
            selection: initialState,
          })}
        >
          {children}
        </Provider>
      </ThemeProvider>
    );

const handlers = [
  rest.get(
    "https://dv-crowd.app-quality.com/api/campaigns/1/candidates",
    async (req, res, ctx) => {
      return res(ctx.json({ results: [] }), ctx.delay(50));
    }
  ),
  rest.get(
    "https://dv-crowd.app-quality.com/api/campaigns/2/candidates",
    async (req, res, ctx) => {
      return res(ctx.json(await getCandidatesMock("example-2")), ctx.delay(50));
    }
  ),
];

const server = setupServer(...handlers);
setupMatchMediaMock();
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Selection table", () => {
  it("should render an empty state if no data is provided", async function () {
    const wrapper = getWrapper();
    const { findByText } = renderWithProviders(<SelectionTable id="1" />);
    const { waitForNextUpdate } = renderHook(() => useTableRows("1"), {
      wrapper,
    });
    await waitForNextUpdate();
    expect(await findByText("There's no data here")).toBeVisible();
  });
  it("should show the column names", async function () {
    const { findByText } = renderWithProviders(<SelectionTable id="1" />);
    expect(await findByText("Name ID")).toBeInTheDocument();
    expect(await findByText("Level")).toBeInTheDocument();
    expect(await findByText("Tot EXP")).toBeInTheDocument();
    expect(await findByText("OS")).toBeInTheDocument();
    expect(await findByText("Devices")).toBeInTheDocument();
  });
  it("should show the device if data are provided", async function () {
    const wrapper = getWrapper();
    const { findByText } = renderWithProviders(<SelectionTable id="2" />);
    const { waitForNextUpdate } = renderHook(() => useTableRows("2"), {
      wrapper,
    });
    await waitForNextUpdate();
    expect(await findByText("Samsung Galaxy M31")).toBeVisible();
  });
});
