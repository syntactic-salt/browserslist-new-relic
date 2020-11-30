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

The New Relic account ID that you want to retrieve data for. For information on
[where to find your account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/account-id),
check the New Relic docs.

- **Alias:** None
- **Default:** None
- **Environment Variable:** `BROWSERSLIST_NEW_RELIC_ACCOUNT_ID`
- **Required:** Yes

### `--apiKey`

A New Relic Insights query API key. For information on
[creating a query API key](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api),
check the New Relic docs.

- **Alias:** None
- **Default:** None
- **Environment Variable:** `BROWSERSLIST_NEW_RELIC_API_KEY`
- **Required:** Yes

### `--appId`

The New Relic Browser application ID that you want to retrieve data for. For more information on
[where to find your application ID](https://docs.newrelic.com/docs/browser/browser-monitoring/configuration/browser-license-key-app-id),
check the New Relic docs.

- **Alias:** None
- **Default:** None
- **Environment Variable:** `BROWSERSLIST_NEW_RELIC_APP_ID`
- **Required:** Yes

### `--debug`

Turns on various output used for debugging issues.

- **Alias:** None
- **Default:** `false`
- **Environment Variable:** None
- **Required:** No

### `--duration`

The number of days of browser usage data to fetch.

Note that New Relic's data retention period varies depending on your subscription level. At the time of writing, New
Relic's free tier (Lite) has a 1 day retention period for browser usage statistics. That means if you have free tier
(Lite), you will only get usage statistics for the past 1 day regardless of what you set here. For more information on
[data retention periods](https://docs.newrelic.com/docs/accounts/original-accounts-billing/product-based-pricing/overview-data-retention-components),
check the New Relic docs.

- **Alias:** None
- **Default:** `7`
- **Environment Variable:** None
- **Required:** No

### `--help`

**Alias:** `-h`

**Default:** None

**Environment Variable:** None

**Required:** No

Outputs some helpful information about the command.

- **Alias:** `-h`
- **Default:** None
- **Environment Variable:** None
- **Required:** No

## Example Usage

With all required options

```
browserslist-new-relic --appId=48927374561 --accountId=45182429 --apiKey=Hus4-hsSDFjls802dsSfjI82-PZhsqotm2H86
```

With all required options as environment variables

```
browserslist-new-relic
```

With custom duration of 2 days

```
browserslist-new-relic --duration=2 --appId=48927374561 --accountId=45182429 --apiKey=Hus4-hsSDFjls802dsSfjI82-PZhsqotm2H86
```

With debugging output

```
browserslist-new-relic --debug --appId=48927374561 --accountId=45182429 --apiKey=Hus4-hsSDFjls802dsSfjI82-PZhsqotm2H86
```
