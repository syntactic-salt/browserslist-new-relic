const commandLineArgs = require("command-line-args");

const optionDefinitions = [
    { name: "accountId", type: Number, required: true },
    { name: "appId", type: Number, required: true },
    { name: "apiKey", type: String, required: true },
    { name: "days", type: Number, defaultValue: 7},
    { name: "debug", type: Boolean },
];

const getOptions = (debug = false) => {
    let options = {};

    try {
        options = commandLineArgs(optionDefinitions, { partial: true });
    } catch (error) {
        console.error(error);
    }

    if (options.debug) {
        process.env.DEBUG = true;
    }

    if (process.env.DEBUG) {
        console.debug("\nCOMMAND LINE OPTIONS:");
        console.debug(options);
    }

    optionDefinitions.forEach(({ name, required }) => {
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
