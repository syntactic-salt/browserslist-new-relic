const browsers = require('./browsers');

const transformResults = ({ facets, totalResult }) => {
    const browserslistStats = {};

    facets.forEach(({ name, results }) => {
        const [browser, version, device] = name;
        const browserCount = results[0].count;
        const totalBrowserCount = totalResult.results[0].count;
        const blBrowser = browsers[`${browser}:${device}`];
        let browserPercentage = browserCount / totalBrowserCount * 100;
        browserPercentage = Math.round(browserPercentage * 100) / 100;

        if (blBrowser && browserslistStats[blBrowser] && browserslistStats[blBrowser][version]) {
            browserslistStats[blBrowser][version] += browserPercentage;
        } else if (blBrowser && browserslistStats[blBrowser]) {
            browserslistStats[blBrowser][version] = browserPercentage;
        } else if (blBrowser) {
            browserslistStats[blBrowser] = { [version]: browserPercentage };
        }
    });

    return browserslistStats;
};

module.exports = transformResults;
