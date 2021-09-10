const options = {};

const getOptions = (argv = {}) => {
    const envVarPrefix = "BROWSERSLIST_NEW_RELIC_";

    options.accountId = process.env[`${envVarPrefix}ACCOUNT_ID`] || argv.accountId || options.accountId;
    options.apiKey = process.env[`${envVarPrefix}API_KEY`] || argv.apiKey || options.apiKey;
    options.appId = process.env[`${envVarPrefix}APP_ID`] || argv.appId || options.appId;

    if (typeof argv.debug !== "undefined") {
        options.debug = argv.debug;
    }

    options.duration = argv.duration || options.duration;

    if (options.debug) {
        console.debug("\nOPTIONS:");
        console.debug(options);
    }

    return options;
};

module.exports = getOptions;
