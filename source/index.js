const getConfirguration = require('./getConfiguration');
const getQueryResults = require('./getQueryResults');
const transformResults = require('./transformResults');
const fs = require('fs');

const { apiKey, accountNumber, useUniqueSessions = false } = getConfirguration();

if (!apiKey || !accountNumber) {
    console.error('You must configure your API key and account number.');
    process.exit(1);
}

getQueryResults(
    'SELECT count(*) FROM PageView FACET userAgentName, userAgentVersion, deviceType SINCE 30 DAYS AGO',
    { apiKey, accountNumber }
)
    .then((nrResults) => {
        const browserslistStats = JSON.stringify(transformResults(nrResults), null, 2);
        fs.writeFileSync('./browserslist-stats.json', browserslistStats);
    });
