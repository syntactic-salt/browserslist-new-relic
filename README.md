# browserslist-new-relic

A CLI tool that generates a [custom usage data](https://github.com/browserslist/browserslist#custom-usage-data) file for
[browserslist](https://github.com/browserslist/browserslist) from your
[New Relic Browser](https://newrelic.com/products/browser-monitoring) data.

## How to use

Before you can run the command you'll need to prepare the following information:

- New Relic Browser application ID
- New Relic account ID
- New Relic Insights query API key

Check out the [Options](#options) section for specific details.

__NPM >= 5.2__

Using npx:

In the root of your project run
```
npx browserslist-new-relic --appId=NR_APPLICATION_ID --accountId=NR_ACCOUNT_ID --apiKey=NR_API_KEY
```

__NPM < 5.2__

Install globally
```
npm install -g browserslist-new-relic
```

In the root of your project run
```
browserslist-new-relic --appId=NR_APPLICATION_ID --accountId=NR_ACCOUNT_ID --apiKey=NR_API_KEY
```

Now that you've successfully run the command you'll have generated `browserslist-stats.json` in your project's root
directory. This file contains your custom usage data from New Relic. In your browserslist config you can now do things like:
```
> 0.5% in my stats
```

or
```
> 0.5% in my stats, > 1% in US
```

## Options

### `--accountId`

**Alias:** None

**Default:** None

**Required:** Yes

The New Relic account ID that you want to retrieve data for. For information on
[where to find your account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/account-id),
check the New Relic docs.

### `--apiKey`

**Alias:** None

**Default:** None

**Required:** Yes

A New Relic Insights query API key. For information on
[creating a query API key](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api),
check the New Relic docs.

### `--appId`

**Alias:** None

**Default:** None

**Required:** Yes

The New Relic Browser application ID that you want to retrieve data for. For more information on
[where to find your application ID](https://docs.newrelic.com/docs/browser/browser-monitoring/configuration/browser-license-key-app-id),
check the New Relic docs.

### `--debug`

**Alias:** None

**Default:** `false`

**Required:** No

Turns on various output used for debugging issues.

### `--duration`

**Alias:** None

**Default:** `7`

**Required:** No

The number of days of browser usage data to fetch.

Note that New Relic's data retention period varies depending on your subscription level. At the time of writing, New
Relic's free tier (Lite) has a 1 day retention period for browser usage statistics. That means if you have free tier
(Lite), you will only get usage statistics for the past 1 day regardless of what you set here. For more information on
[data retention periods](https://docs.newrelic.com/docs/accounts/original-accounts-billing/product-based-pricing/overview-data-retention-components),
check the New Relic docs.

### `--help`

**Alias:** `-h`

**Default:** None

**Required:** No

Outputs some helpful information about the command.
