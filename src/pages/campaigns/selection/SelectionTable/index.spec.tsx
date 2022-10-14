import { renderWithProviders } from "src/utils/test-utils";
import SelectionTable from "src/pages/campaigns/selection/SelectionTable/index";
import { findByTestId, findByText } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.get("http://localhost/campaigns/1/candidates", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            id: 123,
            name: "Pippo",
            surname: "Franco",
            experience: 200,
            level: "Bronze",
            devices: [
              {
                manufacturer: "Apple",
                model: "iPhone",
                os: "iOS",
                osVersion: "9",
              },
              {
                os: "Windows",
                osVersion: "Windows 10 May 2021 Update",
              },
            ],
          },
        ],
        start: 0,
        size: 1,
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

describe("Selection table", () => {
  it("should render an empty state if no data is provided", async function () {
    const { findByText } = renderWithProviders(<SelectionTable id="2" />);
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
    const { findByText, findByTestId } = renderWithProviders(
      <SelectionTable id="1" />
    );
    expect(await findByText("Pippo Franco T123")).toBeVisible();
    expect(await findByText("Bronze")).toBeVisible();
    expect(await findByText("200")).toBeVisible();
    expect(await findByText("iOS 9")).toBeVisible();
    expect(await findByText("Apple iPhone")).toBeVisible();
    expect(await findByTestId("device-select-checkbox")).toBeVisible();
  });
});
