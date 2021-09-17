#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const getOptions = require('../lib/getOptions');
const browserslistNewRelic = require('../index');

const envVarPrefix = 'BROWSERSLIST_NEW_RELIC_';
const argv = yargs(hideBin(process.argv))
    .option('accountId', {
        describe: 'New Relic account ID',
        demandOption: !process.env[`${envVarPrefix}ACCOUNT_ID`],
        type: 'string',
    })
    .option('apiKey', {
        describe: 'New Relic Insights query API key',
        demandOption: !process.env[`${envVarPrefix}API_KEY`],
        type: 'string',
    })
    .option('appId', {
        describe: 'New Relic Browser application ID',
        demandOption: !process.env[`${envVarPrefix}APP_ID`],
        type: 'string',
    })
    .option('debug', {
        describe: 'Turn on debugging output',
        default: false,
        type: 'boolean',
    })
    .option('duration', {
        describe: 'Days of browser usage to fetch',
        default: 7,
        type: 'number',
    })
    .help().argv;

(async () => {
    try {
        const usageData = await browserslistNewRelic(getOptions(argv));
        const jsonUsageData = JSON.stringify(usageData, null, 2);
        fs.writeFileSync('./browserslist-stats.json', jsonUsageData);
        console.info('\nFinished generating browserslist-stats.json');
    } catch (error) {
        console.error(error, error.stack);
    }
})();
