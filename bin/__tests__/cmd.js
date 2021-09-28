const fs = require('fs');
const browserslistNewRelic = require('../../index');

jest.mock('../../index');

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
});

beforeEach(() => {
    browserslistNewRelic.mockResolvedValue({ chrome: { 90: 100 } });
    process.argv = [
        'node.exe',
        '/browserslist-new-relic/bin/cmd',
        '--accountId',
        '34521432',
        '--appId',
        '6543',
        '--apiKey',
        '08sf9'
    ];
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('command file', () => {
    test('outputs an error when failing to process usage data', async () => {
        browserslistNewRelic.mockRejectedValueOnce(
            new Error('Have you tried turning it off and on again?')
        );
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.isolateModules(() => {
            require('../cmd');
        });
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    test('writes a custom usage data file', async () => {
        jest.isolateModules(() => {
            require('../cmd');
        });
        await new Promise((resolve) => setTimeout(resolve, 50));
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    test('initiates debugging', () => {
        process.argv.push('--debug');
        process.argv.push('true');
        jest.isolateModules(() => {
            require('../cmd');
        });
        expect(browserslistNewRelic).toHaveBeenCalledWith(
            expect.objectContaining({ debug: true })
        );
    });
});
