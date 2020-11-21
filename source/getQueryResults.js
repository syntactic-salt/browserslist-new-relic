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
    } catch (err) {
        console.error("Response failed");
        console.error(err, err.stack);
        process.exit(1);
    }
};

module.exports = getQueryResults;
