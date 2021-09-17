# browserslist-new-relic

A CLI tool that generates a [custom usage data](https://github.com/browserslist/browserslist#custom-usage-data) file for
[Browserslist](https://github.com/browserslist/browserslist) from your
[New Relic Browser](https://newrelic.com/products/browser-monitoring) data.

[![npm package][npm-badge]][npm-link]
[![node version][node-badge]][node-link]
[![total downloads][downloads-badge]][downloads-link]
[![license][license-badge]][license-link]
[![open issues][issues-badge]][issues-link]

## How to use

Before you can run the command you'll need to prepare the following information:

- New Relic Browser application ID
- New Relic account ID
- New Relic Insights query API key

Check out the [Options](#options) section for specific details.

In the root of your project run

```
npx browserslist-new-relic --appId <application id> --accountId <account id> --apiKey <api key>
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

```
--version    Show version number                                     [boolean]
--accountId  New Relic account ID                          [string] [required]
--apiKey     New Relic Insights query API key              [string] [required]
--appId      New Relic Browser application ID              [string] [required]
--debug      Turn on debugging output               [boolean] [default: false]
--duration   Days of browser usage to fetch              [number] [default: 7]
--help       Show help                                               [boolean]
```

### `--accountId`

The New Relic account ID that you want to retrieve data for. For information on
[where to find your account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/account-id),
check the New Relic docs.


- **Default:** None
- **Environment Variable:** `BROWSERSLIST_NEW_RELIC_ACCOUNT_ID`
- **Required:** Yes

### `--apiKey`

A New Relic Insights query API key. For information on
[creating a query API key](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api),
check the New Relic docs.

- **Default:** None
- **Environment Variable:** `BROWSERSLIST_NEW_RELIC_API_KEY`
- **Required:** Yes

### `--appId`

The New Relic Browser application ID that you want to retrieve data for. For more information on
[where to find your application ID](https://docs.newrelic.com/docs/browser/browser-monitoring/configuration/browser-license-key-app-id),
check the New Relic docs.

- **Default:** None
- **Environment Variable:** `BROWSERSLIST_NEW_RELIC_APP_ID`
- **Required:** Yes

### `--debug`

Turns on output used for debugging issues.

- **Default:** `false`
- **Environment Variable:** None
- **Required:** No

### `--duration`

The number of days of browser usage data to fetch.

- **Default:** `7`
- **Environment Variable:** None
- **Required:** No

### `--help`

**Outputs information about the options.**

- **Default:** None
- **Environment Variable:** None
- **Required:** No

### `--version`

**Outputs some helpful information about the command.**

- **Default:** None
- **Environment Variable:** None
- **Required:** No

## Example Usage

**With all required options**

```
browserslist-new-relic --appId 48927374561 --accountId 45182429 --apiKey Hus4-hsSDFjls802dsSfjI82-PZhsqotm2H86
```

**With all required options as environment variables**

```
browserslist-new-relic
```

**With duration of 2 days**

```
browserslist-new-relic --duration 2 --appId 48927374561 --accountId 45182429 --apiKey Hus4-hsSDFjls802dsSfjI82-PZhsqotm2H86
```

**With debugging output**

```
browserslist-new-relic --debug --appId 48927374561 --accountId 45182429 --apiKey Hus4-hsSDFjls802dsSfjI82-PZhsqotm2H86
```

## Issues

Please report any issues on [GitHub](https://github.com/syntactic-salt/browserslist-new-relic/issues).

[npm-badge]: https://flat.badgen.net/npm/v/browserslist-new-relic?color=blue&icon=npm&cache=300&label
[npm-link]: https://www.npmjs.com/package/browserslist-new-relic

[node-badge]: https://flat.badgen.net/npm/node/browserslist-new-relic?color=blue&cache=300
[node-link]: https://www.npmjs.com/package/browserslist-new-relic

[downloads-badge]: https://flat.badgen.net/npm/dt/browserslist-new-relic?color=blue&cache=300
[downloads-link]: https://www.npmjs.com/package/browserslist-new-relic

[license-badge]: https://flat.badgen.net/github/license/syntactic-salt/browserslist-new-relic?color=blue&cache=300
[license-link]: https://github.com/syntactic-salt/browserslist-new-relic/blob/master/LICENSE

[issues-badge]: https://flat.badgen.net/github/open-issues/syntactic-salt/browserslist-new-relic?cache=300
[issues-link]: https://github.com/syntactic-salt/browserslist-new-relic/issues
