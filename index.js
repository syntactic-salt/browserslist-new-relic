#!/usr/bin/env node

const fs = require("fs");
const { getOptions } = require("./source/getOptions");
const getQueryResults = require("./source/getQueryResults");
const transformResults = require("./source/transformResults");

let options;

try {
    options = getOptions();
} catch (error) {
    process.exit(1);
}

const { apiKey, appId, accountId, days } = options;
const query = `SELECT count(*) FROM PageView FACET userAgentName, userAgentVersion, deviceType SINCE ${days} DAYS AGO WHERE appId = ${appId}`;

if (process.env.DEBUG) {
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
    });
