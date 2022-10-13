import { renderWithProviders } from "src/utils/test-utils";
import SelectionPage from "./index";
import { rest } from "msw";
import { setupServer } from "msw/node";

jest.mock(
  "src/pages/campaigns/selection/editPanel/columnsConfigurator/index.tsx",
  () => () => <div data-testid="ColumnsConfigurator" />
);

jest.mock("src/pages/campaigns/selection/counter/index.tsx", () => () => (
  <div data-testid="Counter" />
));

jest.mock(
  "src/pages/campaigns/selection/SelectionTable/index.tsx",
  () => () => <div data-testid="SelectionTable" />
);

const handlers = [
  rest.get("http://localhost/users/me", (req, res, ctx) => {
    return res(
      ctx.json({
        role: "administrator",
      }),
      ctx.delay(50)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("selection page", () => {
  it("should exist", function () {
    expect(typeof SelectionPage).toBe("function");
  });

  it("should contain 'Add columns' card", async () => {
    const { findByText } = renderWithProviders(<SelectionPage />);
    expect(await findByText("Add columns")).toBeVisible();
  });

  it("should contain columns configurator", async () => {
    const { findByTestId } = renderWithProviders(<SelectionPage />);
    expect(await findByTestId("ColumnsConfigurator")).toBeInTheDocument();
  });

  it("should contain counter", async () => {
    const { findByTestId } = renderWithProviders(<SelectionPage />);
    expect(await findByTestId("Counter")).toBeInTheDocument();
  });

  it("should contain selection table", async () => {
    const { findByTestId } = renderWithProviders(<SelectionPage />);
    expect(await findByTestId("SelectionTable")).toBeInTheDocument();
  });
});
