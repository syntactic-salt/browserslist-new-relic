const { getOptions, optionDefinitions } = require("../getOptions");
jest.mock("command-line-args");
const commandLineArgs = require("command-line-args");

describe("getOptions module", () => {
    test("returns all defined options from the command line", () => {
        // setup mock command line arguments
        const optionDefinitionsArray = Object.entries(optionDefinitions).map(([, definition]) => definition);
        commandLineArgs.mockReturnValue(optionDefinitionsArray.reduce((mock, { name }) => {
            mock[name] = "mock value";
            return mock;
        }, {}));

        const options = getOptions();

        // expect that all options have a value
        optionDefinitionsArray.forEach(({ name }) => {
            expect(options[name]).toBeDefined();
        });
    });

    test("returns all default option values", () => {
        // setup mock command line arguments
        const optionDefinitionsArray = Object.entries(optionDefinitions).map(([, definition]) => definition);
        commandLineArgs.mockReturnValue(optionDefinitionsArray.reduce((mock, { name, defaultValue }) => {
            // only add the ones that don't have default values
            if (defaultValue === undefined) {
                mock[name] = "mock value";
            }

            return mock;
        }, {}));

        const options = getOptions();

        // expect all options with default values returned the default
        optionDefinitionsArray.forEach(({ name, defaultValue }) => {
            if (defaultValue !== undefined) {
                expect(options[name]).toBe(defaultValue);
            }
        });
    });

    test("returns options from environment variables", () => {
        // the key we'll stash in an environment variable
        const mockKey = "I open things";

        // setup mock command line arguments
        const optionDefinitionsArray = Object.entries(optionDefinitions).map(([, definition]) => definition);
        commandLineArgs.mockReturnValue(optionDefinitionsArray.reduce((mock, { name }) => {
            // exclude the key since it would take precedence
            if (name !== optionDefinitions.apiKey.name) {
                mock[name] = "mock value";
            }

            return mock;
        }, {}));

        // stash the key in the place
        process.env[optionDefinitions.apiKey.envVar] = mockKey;

        const options = getOptions();

        // expect that the key was returned in the options
        expect(options[optionDefinitions.apiKey.name]).toBe(mockKey);
    });

    test("throw an error when all required options haven't been provided", () => {
        // return no options from the command the line arguments
        commandLineArgs.mockReturnValue({});

        // expect an error to be thrown
        expect(() => getOptions()).toThrow();
    });

    test("output an error message when commandlineArgs throws", () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        // commandLineArgs should throw
        commandLineArgs.mockImplementation(() => {
            throw new Error();
        });

        getOptions();

        // expect a console.error
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
});
