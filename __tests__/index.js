const getQueryResults = require('../lib/getQueryResults');
const transformResults = require('../lib/transformResults');
const browserslistNewRelic = require('../index');

jest.mock('../lib/getQueryResults');
jest.mock('../lib/transformResults');

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
});

let mockOptions;

beforeEach(() => {
    mockOptions = {
        debug: false,
        apiKey: '08sf9',
        accountId: '34521432',
        appId: '6543',
        duration: 7,
    };

    getQueryResults.mockResolvedValue({
        totalResult: { results: [{ count: 100 }] },
        facets: [
            { name: ['Chrome', '86', 'Desktop'], results: [{ count: 25 }] },
            { name: ['Chrome', '84', 'Desktop'], results: [{ count: 75 }] },
        ],
    });
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('main file', () => {
    test('throws when failing to get results from new relic', () => {
        getQueryResults.mockRejectedValueOnce(
            new Error('Have you tried turning it off and on again?')
        );
        return expect(browserslistNewRelic(mockOptions)).rejects.toThrow();
    });

    test('returns usage data', () => {
        const mockUsageData = { chrome: { 90: 100 } };
        transformResults.mockReturnValueOnce(mockUsageData);
        return expect(browserslistNewRelic(mockOptions)).resolves.toStrictEqual(
            mockUsageData
        );
    });

    test('outputs debugging info', async () => {
        await browserslistNewRelic({ ...mockOptions, debug: true });
        expect(console.debug).toHaveBeenCalledTimes(2);
    });
});
