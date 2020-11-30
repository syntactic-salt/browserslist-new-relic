const getQueryResults = require("../getQueryResults");
jest.mock("node-fetch");
const fetch = require("node-fetch");

describe("getQueryResults module", () => {
    test("returns response JSON", async () => {
        const mockJSON = { mock: "JSON" };
        let resolver = () => {};

        fetch.mockReturnValue(new Promise((resolve) => resolver = resolve));
        resolver({
            json: () => {
                return mockJSON;
            },
        });

        expect(await getQueryResults("", { apiKey: "", accountId: "" })).toBe(mockJSON);
    });

    test("exits when request fails", async () => {
        let rejecter = () => {};

        fetch.mockReturnValue(new Promise((resolve, reject) => rejecter = reject));
        rejecter(new Error());

        const processSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
        await getQueryResults("", { apiKey: "", accountId: "" });

        expect(processSpy).toHaveBeenCalledWith(1);
    });
});
