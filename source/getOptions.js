const commandLineArgs = require("command-line-args");

const getOptions = () => {
    const optionDefinitions = [
        { name: "accountId", type: Number, required: true },
        { name: "appId", type: Number, required: true },
        { name: "apiKey", type: String, required: true },
    ];

    const options = commandLineArgs(optionDefinitions);

    optionDefinitions.forEach(({ name, required }) => {
        if (required && options[name] === undefined) {
            console.error(`You did not pass a required command line argument: ${name}`);
            process.exit(1);
        }
    });

    return options;
};

module.exports = getOptions;
