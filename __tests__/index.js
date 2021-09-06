const fs = require("fs");
const getQueryResults = require("../lib/getQueryResults");
const getOptions = require("../lib/getOptions");

jest.mock("yargs/yargs", () => {
    const mockYargs = () => {
        return {
            option: mockYargs,
            help: mockYargs,
            argv: {},
        };
    };

    return jest.fn().mockImplementation(mockYargs);
});
jest.mock("../lib/getQueryResults");
jest.mock("../lib/getOptions", () => {
    return jest.fn().mockImplementation(() => {
        return {
            debug: false,
            apiKey: "08sf9",
            accountId: "34521432",
            appId: "6543",
            duration: 7,
        };
    });
});

beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "debug").mockImplementation(() => {});
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
});

beforeEach(() => {
    getQueryResults.mockResolvedValue({
        totalResult: { results: [{ count: 100 }] },
        facets: [
            { name: ["Chrome", "86", "Desktop"], results: [{ count: 25 }] },
            { name: ["Chrome", "84", "Desktop"], results: [{ count: 75 }] },
        ],
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("main file", () => {
    test("exits when failing to get new relic results", async () => {
        getQueryResults.mockResolvedValueOnce({ error: 'Invalid query' });
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(process, 'exit'). mockImplementationOnce(() => {});
        jest.isolateModules(() => {
            require("../index");
        });
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(console.error).toHaveBeenCalledTimes(2);
        expect(process.exit).toHaveBeenCalledTimes(1);
    });

    test("writes a custom usage data file", async () => {
        jest.isolateModules(() => {
            require("../index");
        });
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    test("outputs debugging info", () => {
        getOptions.mockReturnValueOnce({ ...getOptions(), ...{ debug: true } });
        jest.isolateModules(() => {
            require("../index");
        });
        expect(console.debug).toHaveBeenCalledTimes(2);
    });
});
