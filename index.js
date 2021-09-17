const getQueryResults = require('./lib/getQueryResults');
const transformResults = require('./lib/transformResults');

const main = async ({ accountId, appId, apiKey, debug, duration }) => {
    const query = `SELECT count(*) FROM PageView FACET userAgentName, userAgentVersion, deviceType SINCE ${duration} DAYS AGO WHERE appId = ${appId} LIMIT MAX`;

    if (debug) {
        console.debug('\nNEW RELIC QUERY - NRQL');
        console.debug(query);
    }

    const newRelicResults = await getQueryResults(
        query,
        {
            apiKey,
            accountId,
        },
        debug
    );

    return transformResults(newRelicResults, debug);
};

module.exports = main;
