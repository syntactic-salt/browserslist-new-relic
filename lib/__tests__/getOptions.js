let mockArgs;

beforeEach(() => {
    mockArgs = {
        accountId: "12345",
        apiKey: "d7fsa890s7df9a8",
        appId: "9876",
        duration: 28,
    };
});

afterEach(() => {
    jest.resetAllMocks();
    delete process.env.BROWSERSLIST_NEW_RELIC_ACCOUNT_ID;
    delete process.env.BROWSERSLIST_NEW_RELIC_API_KEY;
    delete process.env.BROWSERSLIST_NEW_RELIC_APP_ID;

});

describe("#getOptions()", () => {
    test("logs debugging info", () => {
        mockArgs.debug = true;
        jest.spyOn(console, "debug").mockImplementation(() => {});

        let getOptions;
        jest.isolateModules(() => {
            getOptions = require("../getOptions");
        });

        getOptions(mockArgs);

        expect(console.debug).toHaveBeenCalledTimes(2);
    });

    test("returns all options from argv parameter", () => {
        let getOptions;
        jest.isolateModules(() => {
            getOptions = require("../getOptions");
        });

        const { debug, duration, appId, apiKey, accountId } = getOptions(mockArgs);

        expect(debug).toBe(mockArgs.debug);
        expect(duration).toBe(mockArgs.duration);
        expect(appId).toBe(mockArgs.appId);
        expect(apiKey).toBe(mockArgs.apiKey);
        expect(accountId).toBe(mockArgs.accountId);
    });

    test("returns all options available as environment variables", () => {
        const mockEnvVars = {
            accountId: "345678",
            apiKey: "65gvk43ln76bl3",
            appId: "98235",
        };

        process.env.BROWSERSLIST_NEW_RELIC_ACCOUNT_ID = mockEnvVars.accountId;
        process.env.BROWSERSLIST_NEW_RELIC_API_KEY = mockEnvVars.apiKey;
        process.env.BROWSERSLIST_NEW_RELIC_APP_ID = mockEnvVars.appId;

        let getOptions;
        jest.isolateModules(() => {
            getOptions = require("../getOptions");
        });

        const { debug, duration, appId, apiKey, accountId } = getOptions(mockArgs);

        expect(debug).toBe(mockArgs.debug);
        expect(duration).toBe(mockArgs.duration);
        expect(appId).toBe(mockEnvVars.appId);
        expect(apiKey).toBe(mockEnvVars.apiKey);
        expect(accountId).toBe(mockEnvVars.accountId);
    });

    test("returns singleton options when no environment variable or parameter is available", () => {
        let getOptions;
        jest.isolateModules(() => {
            getOptions = require("../getOptions");
        });

        getOptions(mockArgs);

        const { debug, duration, appId, apiKey, accountId } = getOptions();

        expect(debug).toBe(mockArgs.debug);
        expect(duration).toBe(mockArgs.duration);
        expect(appId).toBe(mockArgs.appId);
        expect(apiKey).toBe(mockArgs.apiKey);
        expect(accountId).toBe(mockArgs.accountId);
    });
});
