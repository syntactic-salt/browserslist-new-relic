const fs = require("fs");

const getConfiguration = () => {
    let configuration = {};

    if (fs.existsSync("./.browserslist-nr.json")) {
        try {
            configuration = JSON.parse(fs.readFileSync("./.browserslist-nr.json"));
        } catch (error) {
            console.error("Your configuration file could not be parsed. Check to make sure it contains valid JSON.");
            process.exit(1);
        }
    }

    return configuration;
};

module.exports = getConfiguration;
