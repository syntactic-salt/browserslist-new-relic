const https = require('https');

const getQueryResults = async (query, { apiKey, accountId }, debug = false) => {
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
