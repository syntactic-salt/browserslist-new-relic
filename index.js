#!/usr/bin/env node

const fs = require("fs");
const { getOptions, optionDefinitions } = require("./lib/getOptions");
const getQueryResults = require("./lib/getQueryResults");
const transformResults = require("./lib/transformResults");

let options;

try {
    options = getOptions();
} catch (error) {
    console.error(error, error.stack);
    process.exit(1);
}

const { apiKey, appId, accountId, duration } = options;
const query = `SELECT count(*) FROM PageView FACET userAgentName, userAgentVersion, deviceType SINCE ${duration} DAYS AGO WHERE appId = ${appId}`;

if (process.env[optionDefinitions.debug.envVar]) {
    console.debug("\nNEW RELIC QUERY - NRQL");
    console.debug(query);
}

getQueryResults(query, { apiKey, accountId })
    .then((nrResults) => {
        if (nrResults.error) {
            console.error("Error getting results from New Relic.");
            console.error(nrResults.error);
            process.exit(1);
        }

        const browserslistStats = JSON.stringify(transformResults(nrResults), null, 2);
        fs.writeFileSync("./browserslist-stats.json", browserslistStats);
        console.log("Finished generating browserslist-stats.json");
    });
