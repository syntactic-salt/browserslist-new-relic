const getOptions = require('../getOptions');

let mockArgs;
let mockEnvVars;

beforeEach(() => {
    mockArgs = {
        accountId: '12345',
        apiKey: 'd7fsa890s7df9a8',
        appId: '9876',
        duration: 28,
    };

    mockEnvVars = {
        accountId: '345678',
        apiKey: '65gvk43ln76bl3',
        appId: '98235',
    };

    process.env.BROWSERSLIST_NEW_RELIC_ACCOUNT_ID = mockEnvVars.accountId;
    process.env.BROWSERSLIST_NEW_RELIC_API_KEY = mockEnvVars.apiKey;
    process.env.BROWSERSLIST_NEW_RELIC_APP_ID = mockEnvVars.appId;
});

afterEach(() => {
    jest.resetAllMocks();
    delete process.env.BROWSERSLIST_NEW_RELIC_ACCOUNT_ID;
    delete process.env.BROWSERSLIST_NEW_RELIC_API_KEY;
    delete process.env.BROWSERSLIST_NEW_RELIC_APP_ID;
});

describe('#getOptions()', () => {
    test('logs debugging info', () => {
        mockArgs.debug = true;
        jest.spyOn(console, 'debug').mockImplementation(() => {});

        getOptions(mockArgs);
        expect(console.debug).toHaveBeenCalledTimes(2);
    });

    test('returns all options from argv parameter', () => {
        const { debug, duration, appId, apiKey, accountId } =
            getOptions(mockArgs);
        expect(debug).toBe(mockArgs.debug);
        expect(duration).toBe(mockArgs.duration);
        expect(appId).toBe(mockArgs.appId);
        expect(apiKey).toBe(mockArgs.apiKey);
        expect(accountId).toBe(mockArgs.accountId);
    });

    test('returns all options available as environment variables', () => {
        const { debug, duration, appId, apiKey, accountId } = getOptions({
            debug: mockArgs.debug,
            duration: mockArgs.duration,
        });

        expect(debug).toBe(mockArgs.debug);
        expect(duration).toBe(mockArgs.duration);
        expect(appId).toBe(mockEnvVars.appId);
        expect(apiKey).toBe(mockEnvVars.apiKey);
        expect(accountId).toBe(mockEnvVars.accountId);
    });
});
