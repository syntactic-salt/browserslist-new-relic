const commandLineArgs = require("command-line-args");

const envVarPrefix = "BROWSERSLIST_NEW_RELIC_";
const optionDefinitions = {
    accountId: { name: "accountId", envVar: `${envVarPrefix}ACCOUNT_ID`, type: Number, required: true },
    appId: { name: "appId", envVar: `${envVarPrefix}APP_ID`, type: Number, required: true },
    apiKey: { name: "apiKey", envVar: `${envVarPrefix}API_KEY`, type: String, required: true },
    duration: { name: "duration", type: Number, defaultValue: 7 },
    debug: { name: "debug", type: Boolean, defaultValue: false },
};

const getOptions = () => {
    const optionDefinitionsArray = Object.entries(optionDefinitions).map(([, definition]) => definition);

    const defaultOptions = optionDefinitionsArray.reduce((tempOptions, { name, defaultValue }) => {
        if (defaultValue !== undefined) {
            tempOptions[name] = defaultValue;
        }

        return tempOptions;
    }, {});

    const envVariableOptions = optionDefinitionsArray.reduce((tempOptions, { name, envVar }) => {
        if (envVar !== undefined && process.env[envVar] !== undefined) {
            tempOptions[name] = process.env[envVar];
        }

        return tempOptions;
    }, {});

    let commandLineOptions = {};

    try {
        commandLineOptions = commandLineArgs(optionDefinitionsArray.map(({ name, type }) => {
            return { name, type };
        }), { partial: true });
    } catch (error) {
        console.error(error);
        return;
    }

    const options = { ...defaultOptions, ...envVariableOptions, ...commandLineOptions };

    if (options.debug) {
        process.env[optionDefinitions.debug.envVar] = true;
    }

    if (process.env[optionDefinitions.debug.envVar]) {
        console.debug("\nDEFAULT OPTIONS:");
        console.debug(defaultOptions);
        console.debug("\nENVIRONMENT VARIABLE OPTIONS:");
        console.debug(envVariableOptions);
        console.debug("\nCOMMAND LINE OPTIONS:");
        console.debug(commandLineOptions);
    }

    optionDefinitionsArray.forEach(({ name, required }) => {
        if (required && options[name] === undefined) {
            console.error(`Missing --${name} option.`);
            console.error("Try 'browserslist-new-relic --help' for more information.");
            throw new Error();
        }
    });

    return options;
};

module.exports = {
    optionDefinitions,
    getOptions,
};
