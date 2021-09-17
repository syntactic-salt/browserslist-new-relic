const options = {};

const getOptions = (argv = {}) => {
    const envVarPrefix = 'BROWSERSLIST_NEW_RELIC_';

    options.accountId =
        argv.accountId ||
        process.env[`${envVarPrefix}ACCOUNT_ID`] ||
        options.accountId;
    options.apiKey =
        argv.apiKey || process.env[`${envVarPrefix}API_KEY`] || options.apiKey;
    options.appId =
        argv.appId || process.env[`${envVarPrefix}APP_ID`] || options.appId;

    if (typeof argv.debug !== 'undefined') {
        options.debug = argv.debug;
    }

    options.duration = argv.duration || options.duration;

    if (options.debug) {
        console.debug('\nOPTIONS:');
        console.debug(options);
    }

    return options;
};

module.exports = getOptions;
