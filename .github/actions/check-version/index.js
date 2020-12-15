const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const fs = require('fs');

const run = async () => {
    const getTags = await fetch(github.context.payload.repository.tags_url);
    const tags = await getTags.json();

    if (tags.length) {
        const thisPackageJSON = JSON.parse(fs.readFileSync('./package.json'));
        console.log('This version is:', thisPackageJSON.version);
    }
};

run();
