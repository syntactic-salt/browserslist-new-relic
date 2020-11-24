const fetch = require("node-fetch");

const getQueryResults = async (query, {apiKey, accountId}) => {
    try {
        const response = await fetch(`https://insights-api.newrelic.com/v1/accounts/${accountId}/query?nrql=${encodeURIComponent(query)}`, {
            headers: {
                Accept: "application/json",
                "X-Query-Key": apiKey,
            },
        });

        return await response.json();
    } catch (error) {
        console.error("Failed to get a response from the New Relic REST API.");
        console.error(error, error.stack);
        process.exit(1);
    }
};

module.exports = getQueryResults;
