const getQueryResults = require('../getQueryResults');
const getOptions = require('../getOptions');
const fetch = require('node-fetch');

jest.mock('node-fetch');
jest.mock('../getOptions');

beforeEach(() => {
    fetch.mockResolvedValue();
    getOptions.mockReturnValue({ debug: false });
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('getQueryResults module', () => {
    test('logs debugging info', async () => {
        const mockStatus = 200;
        fetch.mockReturnValueOnce({
            status: mockStatus,
            json: () => {
                return {};
            },
        });

        jest.spyOn(console, 'debug').mockImplementation(() => {});
        getOptions.mockReturnValueOnce({ debug: true });

        await getQueryResults('', { apiKey: '', accountId: '' });
        expect(console.debug).toHaveBeenCalledWith(expect.stringContaining(`${mockStatus}`));
    });

    test('returns response JSON', () => {
        const mockJSON = { mock: 'JSON' };

        fetch.mockReturnValueOnce({
            status: 200,
            json: () => {
                return mockJSON;
            },
        });

        return expect(getQueryResults('', { apiKey: '', accountId: '' })).resolves.toStrictEqual(mockJSON);
    });

    test('throws on non 200 status', () => {
        fetch.mockReturnValueOnce({ status: 500 });
        return expect(getQueryResults('', { apiKey: '', accountId: '' })).rejects.toThrow();
    });

    test('throws on error from New Relic', () => {
        fetch.mockReturnValueOnce({
            status: 200,
            json: () => {
                return { error: 'Danger!' };
            },
        });

        return expect(getQueryResults('', { apiKey: '', accountId: '' })).rejects.toThrow();
    });
});
