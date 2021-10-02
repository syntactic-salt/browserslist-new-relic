/**
 * Get options from the command line and environment variables.
 *
 * @param {object} argv - Key (option)/value pairs from the command line.
 * @returns {object} - Finalized key (option)/value pairs.
 */
const getOptions = (argv) => {
    const envVarPrefix = 'BROWSERSLIST_NEW_RELIC_';
    const options = {};

    options.accountId =
        argv.accountId || process.env[`${envVarPrefix}ACCOUNT_ID`];
    options.apiKey = argv.apiKey || process.env[`${envVarPrefix}API_KEY`];
    options.appId = argv.appId || process.env[`${envVarPrefix}APP_ID`];
    options.debug = argv.debug;
    options.duration = argv.duration;

    if (options.debug) {
        console.debug('\nOPTIONS:');
        console.debug(options);
    }

    return options;
};

module.exports = getOptions;
