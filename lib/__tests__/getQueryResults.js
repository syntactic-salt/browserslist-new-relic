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
    test("returns response JSON", () => {
        const mockJSON = { mock: "JSON" };

        fetch.mockReturnValueOnce({
            json: () => {
                return mockJSON;
            },
        });

        return expect(getQueryResults("", { apiKey: "", accountId: "" })).resolves.toStrictEqual(mockJSON);
    });

    test("exits when request fails", async () => {
        fetch.mockRejectedValueOnce(new Error("stuff happened"));
        jest.spyOn(process, "exit").mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});

        await getQueryResults("", { apiKey: "", accountId: "" });

        expect(console.error).toHaveBeenCalledTimes(2);
        expect(process.exit).toHaveBeenCalledWith(1);
    });
});
