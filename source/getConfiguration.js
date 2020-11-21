const fs = require("fs");

const getConfiguration = () => {
    let configuration = {};

    if (fs.existsSync("./.browserslist-new-relic.json")) {
        try {
            configuration = JSON.parse(fs.readFileSync("./.browserslist-new-relic.json"));
        } catch (error) {
            console.error("Your configuration file could not be parsed. Check to make sure it contains valid JSON.");
            process.exit(1);
        }
    } else {
        console.error("Your configuration file is missing (.browserslist-new-relic.json).");
        process.exit(1);
    }

    return configuration;
};

module.exports = getConfiguration;
