const https = require('https');

/**
 * Request and return data from the New Relic Insights API.
 *
 * @param {string} query - A New Relic Insights query.
 * @param {string} apiKey - A New Relic Insights API key.
 * @param {string} accountId - A New Relic Insights API key.
 * @param {boolean} debug - A flag for enabling debugging output.
 * @returns {object} - The query results.
 * @throws - On request error.
 * @throws - On error from New Relic Insights.
 */
const getQueryResults = async (query, apiKey, accountId, debug = false) => {
    let results;

    try {
        results = await new Promise((resolve, reject) => {
            let data = '';

            const request = https.get(
                `https://insights-api.newrelic.com/v1/accounts/${accountId}/query?nrql=${encodeURIComponent(
                    query
                )}`,
                { headers: { 'X-Query-Key': apiKey } },
                (response) => {
                    response.on('data', (buffer) => {
                        data += buffer;
                    });
                    response.on('end', () => resolve(data));
                }
            );

            request.on('error', reject);
            request.end();
        });
    } catch (error) {
        if (debug) {
            console.debug(error);
        }

        throw new Error(error.message);
    }

    const parsedResults = JSON.parse(results);

    if (parsedResults.error) {
        throw new Error(parsedResults.error);
    }

    return parsedResults;
};

module.exports = getQueryResults;
