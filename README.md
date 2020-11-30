# browserslist-new-relic

A CLI tool that generates [custom usage data](https://github.com/browserslist/browserslist#custom-usage-data) for
[browserslist](https://github.com/browserslist/browserslist) from your
[New Relic Browser](https://newrelic.com/products/browser-monitoring) data.

## How to use

Before you can run the command you'll need to prepare the following information:

- New Relic application ID
- New Relic account ID
- New Relic API key

Check out the [Options](#options) section for specific details.

__NPM >= 5.2__

Using npx:

In the root of your project run
```
npx browserslist-new-relic --appId={new relic application id} --accountId={new relic account id} --apiKey={new relic api key}
```

__NPM < 5.2__

Install globally
```
npm install -g browserslist-new-relic
```

In the root of your project run
```
browserslist-new-relic --appId={new relic application id} --accountId={new relic account id} --apiKey={new relic api key}
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

| Option | Alias | Required | Description |
|---|---|---|---|
| --accountId | | Yes | Coming soon |
| --apiKey | | Yes | Coming soon |
| --appId | | Yes | Coming soon |
| --debug | -d | No | Coming soon |
| --help | -h | No | Coming soon |
