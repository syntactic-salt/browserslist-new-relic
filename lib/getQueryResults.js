const fetch = require('node-fetch');
const getOptions = require('./getOptions');

const getQueryResults = async (query, { apiKey, accountId }) => {
    const { debug } = getOptions();
    const response = await fetch(
        `https://insights-api.newrelic.com/v1/accounts/${accountId}/query?nrql=${encodeURIComponent(
            query
        )}`,
        {
            headers: {
                Accept: 'application/json',
                'X-Query-Key': apiKey,
            },
        }
    );

    if (debug) {
        console.debug(
            `\nReceived HTTP status ${response.status} from the New Relic API`
        );
    }

    if (response.status !== 200) {
        throw new Error('Cannot connect to New Relic Insights');
    }

    const newRelicData = await response.json();

    if (newRelicData.error) {
        throw new Error(newRelicData.error);
    }

    return newRelicData;
};

module.exports = getQueryResults;
