#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require('yargs/helpers')
const getOptions = require("./lib/getOptions");
const getQueryResults = require("./lib/getQueryResults");
const transformResults = require("./lib/transformResults");

const envVarPrefix = "BROWSERSLIST_NEW_RELIC_";
const argv = yargs(hideBin(process.argv))
    .option("accountId", {
        describe: "New Relic account ID",
        demandOption: !process.env[`${envVarPrefix}ACCOUNT_ID`],
        type: "string",
    })
    .option("apiKey", {
        describe: "New Relic Insights query API key",
        demandOption: !process.env[`${envVarPrefix}API_KEY`],
        type: "string",
    })
    .option("appId", {
        describe: "New Relic Browser application ID",
        demandOption: !process.env[`${envVarPrefix}APP_ID`],
        type: "string",
    })
    .option("debug", {
        describe: "Turn on debugging output",
        default: false,
        type: "boolean",
    })
    .option("duration", {
        describe: "Days of browser usage to fetch",
        default: 7,
        type: "number"
    })
    .help()
    .argv;

const { apiKey, appId, accountId, duration, debug } = getOptions(argv);
const query = `SELECT count(*) FROM PageView FACET userAgentName, userAgentVersion, deviceType SINCE ${duration} DAYS AGO WHERE appId = ${appId} LIMIT MAX`;

if (debug) {
    console.debug("\nNEW RELIC QUERY - NRQL");
    console.debug(query);
}

getQueryResults(query, { apiKey, accountId })
    .then((nrResults) => {
        if (nrResults.error) {
            console.error("Error getting results from New Relic.");
            console.error(nrResults.error);
            process.exit(1);
        } else {
            const browserslistStats = JSON.stringify(transformResults(nrResults), null, 2);
            fs.writeFileSync("./browserslist-stats.json", browserslistStats);
            console.log("Finished generating browserslist-stats.json");
        }
    });
