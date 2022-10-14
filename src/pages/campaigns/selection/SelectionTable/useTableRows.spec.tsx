import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import { rest } from "msw";
import { renderHook } from "@testing-library/react-hooks";
import { getCandidatesMock } from "src/pages/campaigns/selection/SelectionTable/_mocked_data_";
import { setupStore } from "src/store";
import { Provider } from "react-redux";
import { FC } from "react";

rest.get(
  "https://dv-crowd.app-quality.com/api/campaigns/2/candidates",
  async (req, res, ctx) => {
    return res(ctx.json(await getCandidatesMock("example-2")), ctx.delay(50));
  }
);

describe("useTableRows", () => {
  it("should return a list of rows", async function () {
    const wrapper: FC = ({ children }) => (
      <Provider store={setupStore()}>{children}</Provider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useTableRows("2"), {
      wrapper,
    });
    if (result.current.isLoading) {
      expect(result.current.rows).toEqual([]);
    }
    await waitForNextUpdate();
    expect(result.current).toEqual(
      expect.objectContaining({
        rows: expect.arrayContaining([
          {
            devices: "-",
            exp: "21541",
            key: "34463_0",
            level: "Diamond",
            nameId: "Sara Galasso T34463",
            os: "Windows Windows 10 May 2021 Update (19043)",
          },
          {
            devices: "Samsung Galaxy M31",
            key: "34463_1",
            os: "Android 12 (12)",
          },
          {
            devices: "Apple iPad",
            key: "34463_2",
            os: "iOS iOS 15.6 (15.6)",
          },
          {
            devices: "Apple iPhone SE (2020)",
            key: "34463_3",
            os: "iOS iOS 15.6 (15.6)",
          },
          {
            devices: "-",
            key: "34463_4",
            os: "Windows Windows 11",
          },
          {
            devices: "Google Pixel 6",
            key: "34463_5",
            os: "Android 13(beta) (13(beta))",
          },
        ]),
      })
    );
  });
});
