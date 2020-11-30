const browsers = require("./browsers");

const transformResults = ({ facets, totalResult }) => {
    if (process.env.DEBUG) {
        console.debug("\nNEW RELIC QUERY - TOTAL RESULT COUNT");
        console.debug(totalResult);
        console.debug("\nNEW RELIC QUERY - RECORDS:");
    }

    return browserslistStats = facets.reduce((newResults, { name, results }) => {
        if (process.env.DEBUG) {
            console.debug({ name, results });
        }

        const [browser, version, device] = name;

        if (version !== "Unknown") {
            const browserCount = results[0].count;
            const totalBrowserCount = totalResult.results[0].count;
            const blBrowser = browsers[`${browser}:${device}`];
            let browserPercentage = browserCount / totalBrowserCount * 100;
            browserPercentage = Math.round(browserPercentage * 100) / 100;

            if (blBrowser && newResults[blBrowser] && newResults[blBrowser][version]) {
                newResults[blBrowser][version] += browserPercentage;
            } else if (blBrowser && newResults[blBrowser]) {
                newResults[blBrowser][version] = browserPercentage;
            } else if (blBrowser) {
                newResults[blBrowser] = {[version]: browserPercentage};
            }
        }

        return newResults;
    }, {});
};

module.exports = transformResults;
