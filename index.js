#!/usr/bin/env node

const fs = require("fs");
const getOptions = require("./source/getOptions");
const getQueryResults = require("./source/getQueryResults");
const transformResults = require("./source/transformResults");

const { apiKey, appId, accountId } = getOptions();

getQueryResults(
    `SELECT count(*) FROM PageView FACET userAgentName, userAgentVersion, deviceType SINCE 30 DAYS AGO WHERE appId = ${appId}`,
    { apiKey, accountId }
)
    .then((nrResults) => {
        const browserslistStats = JSON.stringify(transformResults(nrResults), null, 2);
        fs.writeFileSync("./browserslist-stats.json", browserslistStats);
    });
