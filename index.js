const getQueryResults = require('./lib/getQueryResults');
const transformResults = require('./lib/transformResults');

/**
 * Generates browser usage data, from New Relic, in a format consistent with
 * Browserslist's custom usage data.
 *
 * @param {object} options - Pairs of option names and option values.
 * @param {string} options.accountId - A New Relic account ID.
 * @param {string} options.appId - A New Relic application ID.
 * @param {string} options.apiKey - A New Relic API key.
 * @param {boolean} options.debug - A flag for enabling debugging output.
 * @param {number} options.duration - The number of days worth of data to fetch.
 * @returns {Promise<object>} - Browser usage data.
 */
const main = async ({ accountId, appId, apiKey, debug, duration }) => {
    const query = `SELECT count(*) FROM PageView FACET userAgentName, userAgentVersion, deviceType SINCE ${duration} DAYS AGO WHERE appId = ${appId} LIMIT MAX`;

    if (debug) {
        console.debug('\nNEW RELIC QUERY - NRQL');
        console.debug(query);
    }

    const newRelicResults = await getQueryResults(
        query,
        apiKey,
        accountId,
        debug
    );

    return transformResults(newRelicResults, debug);
};

module.exports = main;
