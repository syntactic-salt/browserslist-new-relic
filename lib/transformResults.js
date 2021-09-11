const browsers = require('./browsers');
const getOptions = require('./getOptions');

const transformResults = ({ facets, totalResult }) => {
    const { debug } = getOptions();

    if (debug) {
        console.debug('\nNEW RELIC QUERY - TOTAL RESULT COUNT');
        console.debug(totalResult);
        console.debug('\nNEW RELIC QUERY - RECORDS:');
    }

    return facets.reduce((transformedResults, { name, results }) => {
        if (debug) {
            console.debug({ name, results });
        }

        const [browser, version, device] = name;

        if (version !== 'Unknown') {
            const browserCount = results[0].count;
            const totalBrowserCount = totalResult.results[0].count;
            const transformedBrowser = browsers[`${browser}:${device}`];
            let browserPercentage = browserCount / totalBrowserCount * 100;
            browserPercentage = Math.round(browserPercentage * 100) / 100;

            if (
                transformedBrowser &&
                transformedResults[transformedBrowser] &&
                transformedResults[transformedBrowser][version]
            ) {
                transformedResults[transformedBrowser][version] += browserPercentage;
            } else if (transformedBrowser && transformedResults[transformedBrowser]) {
                transformedResults[transformedBrowser][version] = browserPercentage;
            } else if (transformedBrowser) {
                transformedResults[transformedBrowser] = { [version]: browserPercentage };
            }
        }

        return transformedResults;
    }, {});
};

module.exports = transformResults;
