const { optionDefinitions } = require("../getOptions");
const transformResults = require("../transformResults");

describe("transformResults module", () => {
    test("sum the count when encountering a dupe", () => {
        const givenData = {
            totalResult: { results: [{ count: 100 }] },
            facets: [
                { name: ["Chrome", "86", "Desktop"], results: [{ count: 25 }] },
                { name: ["Chrome", "86", "Desktop"], results: [{ count: 75 }] },
            ]
        };
        const expectedData = { chrome: { "86": 100 } };
        const actualData = transformResults(givenData);

        expect(actualData).toStrictEqual(expectedData);
    });

    test("adds a new version when a browser already exists", () => {
        const givenData = {
            totalResult: { results: [{ count: 100 }] },
            facets: [
                { name: ["Chrome", "86", "Desktop"], results: [{ count: 25 }] },
                { name: ["Chrome", "84", "Desktop"], results: [{ count: 75 }] },
            ]
        };
        const expectedData = { chrome: { "86": 25, "84": 75 } };
        const actualData = transformResults(givenData);

        expect(actualData).toStrictEqual(expectedData);
    });

    test("adds a new browser that doesn't exist", () => {
        const givenData = {
            totalResult: { results: [{ count: 100 }] },
            facets: [
                { name: ["Chrome", "86", "Desktop"], results: [{ count: 100 }] },
            ]
        };
        const expectedData = { chrome: { "86": 100 } };
        const actualData = transformResults(givenData);

        expect(actualData).toStrictEqual(expectedData);
    });

    test("outputs debug messages", () => {
        const givenData = {
            totalResult: { results: [{ count: 100 }] },
            facets: [
                { name: ["Chrome", "86", "Desktop"], results: [{ count: 100 }] },
            ]
        };
        const debugSpy = jest.spyOn(console, 'debug');
        process.env[optionDefinitions.debug.envVar] = true;
        transformResults(givenData);
        expect(debugSpy).toHaveBeenCalled();
    });
});
