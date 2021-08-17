const getQueryResults = require("../getQueryResults");
const fetch = require("node-fetch");

jest.mock("node-fetch");

beforeEach(() => {
    fetch.mockResolvedValue();
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("getQueryResults module", () => {
    test("returns response JSON", async () => {
        const mockJSON = { mock: "JSON" };

        fetch.mockReturnValue({
            json: () => {
                return mockJSON;
            },
        });

        expect(await getQueryResults("", { apiKey: "", accountId: "" })).toBe(mockJSON);
    });

    test("exits when request fails", async () => {
        fetch.mockRejectedValue(new Error("stuff happened"));

        const processSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
        await getQueryResults("", { apiKey: "", accountId: "" });

        expect(processSpy).toHaveBeenCalledWith(1);
    });
});
