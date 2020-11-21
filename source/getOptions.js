const commandLineArgs = require("command-line-args");

const optionDefinitions = [
    { name: "accountId", type: Number, required: true },
    { name: "appId", type: Number, required: true },
    { name: "apiKey", type: String, required: true },
];

const getOptions = () => {
    const options = commandLineArgs(optionDefinitions);

    optionDefinitions.forEach(({ name, required }) => {
        if (required && options[name] === undefined) {
            console.error(`You did not pass a required command line argument: ${name}`);
            throw new Error();
        }
    });

    return options;
};

module.exports = {
    optionDefinitions,
    getOptions,
};
