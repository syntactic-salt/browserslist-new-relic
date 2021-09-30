const https = require('https');
const getQueryResults = require('../getQueryResults');

jest.mock('https');

beforeEach(() => {
    https.get.mockImplementation((url, opts, callback) => {
        callback({
            on: (type, handler) => {
                if (type === 'data') {
                    handler('{}');
                } else if (type === 'end') {
                    handler();
                }
            },
        });
        return { on: () => {}, end: () => {} };
    });
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('getQueryResults module', () => {
    test('logs debugging info', async () => {
        https.get.mockImplementationOnce((url, opts, callback) => {
            callback({
                on: () => {},
            });
            return {
                on: (type, handler) => handler({ message: 'it broke' }),
                end: () => {},
            };
        });
        jest.spyOn(console, 'debug').mockImplementation(() => {});

        await expect(getQueryResults('', '', '', true)).rejects.toThrow();
        expect(console.debug).toHaveBeenCalledTimes(1);
    });

    test('returns response JSON', () => {
        const mockJSON = { mock: 'JSON' };

        https.get.mockImplementationOnce((url, opts, callback) => {
            callback({
                on: (type, handler) => {
                    if (type === 'data') {
                        handler(JSON.stringify(mockJSON));
                    } else if (type === 'end') {
                        handler();
                    }
                },
            });
            return {
                on: () => {},
                end: () => {},
            };
        });

        return expect(getQueryResults('', '', '')).resolves.toStrictEqual(
            mockJSON
        );
    });

    test('throws on http error', () => {
        https.get.mockImplementationOnce((url, opts, callback) => {
            callback({
                on: () => {},
            });
            return {
                on: (type, handler) => handler({ message: 'it broke' }),
                end: () => {},
            };
        });

        return expect(getQueryResults('', '', '')).rejects.toThrow();
    });

    test('throws on error from New Relic', () => {
        https.get.mockImplementationOnce((url, opts, callback) => {
            callback({
                on: (type, handler) => {
                    if (type === 'data') {
                        handler('{"error":"It broke"}');
                    } else if (type === 'end') {
                        handler();
                    }
                },
            });
            return {
                on: () => {},
                end: () => {},
            };
        });

        return expect(getQueryResults('', '', '')).rejects.toThrow();
    });
});
