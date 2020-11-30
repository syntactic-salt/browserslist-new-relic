const { getOptions, optionDefinitions } = require("../getOptions");
jest.mock("command-line-args");
const commandLineArgs = require("command-line-args");

describe("getOptions module", () => {
    test("returns all defined options", () => {
        commandLineArgs.mockReturnValue(optionDefinitions.reduce((mock, { name }) => {
            mock[name] = "mock value";
            return mock;
        }, {}));
        const options = getOptions();
        optionDefinitions.forEach(({ name }) => {
            expect(options[name]).toBeDefined();
        });
    });

    test("throw an error when all required options haven't been provided", () => {
        commandLineArgs.mockReturnValue({});
        expect(() => getOptions()).toThrow();
    });
});
