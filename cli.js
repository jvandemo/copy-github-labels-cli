#!/usr/bin/env node
'use strict';
var meow = require('meow');
var chalk = require('chalk');

var source,
    destination,
    count = 0;

var cli = meow({
  help: [
    'Usage',
    '  $ copy-github-labels -t <token> <source-repo> <destination-repo>',
    '',
    'Options',
    '  -d           Dry run, don\'t actually copy anything' ,
    '  -t, --token  Token to authenticate with GitHub API' ,
    '',
    'Examples',
    '  $ copy-github-labels -t token jvandemo/source-repo jvandemo/destination-repo',
  ]
}, {
  boolean: [
    'd'
  ],
  alias: {
    t: 'token'
  }
});

if (!cli.flags.token) {
  cli.showHelp(1);
}

if (cli.input.length < 2) {
  cli.showHelp(1);
}

source = cli.input[0];
destination = cli.input[1];

var options = {
  dryRun: cli.flags.d
};
var copyGitHubLabels = require('copy-github-labels')(options);

copyGitHubLabels.authenticate({
  type: "token",
  token: cli.flags.token
});

if(cli.flags.d){
  console.log(chalk.yellow('Dry run, no labels are copied for real:'));
}


/**
 * Copy labels.
 *
 * The returned label looks like this:
 * {
 *   "url":"https://api.github.com/repos/jvandemo/testje/labels/effort2:%20medium%20(day)",
 *   "name":"effort2: medium (day)",
 *   "color":"bfe5bf",
 *   "meta":{
 *     "x-ratelimit-limit":"5000",
 *     "x-ratelimit-remaining":"4832",
 *     "x-ratelimit-reset":"1444192372",
 *     "x-oauth-scopes":"gist, repo, user",
 *     "location":"https://api.github.com/repos/jvandemo/testje/labels/effort2:%20medium%20(day)",
 *     "etag":"\"87c21039795ca6752192f8cfe5954ecb\"",
 *     "status":"201 Created"
 *   }
 * }
 */

copyGitHubLabels.copy(source, destination, function (err, label){

  var error = JSON.parse(err);
  var labelName = 'Unknown label';

  if(label && label.name){
    labelName = label.name;
  }

  count++;

  if(err){

    // If error occurs during first iteration and no label is returned,
    // it is probably a general error like an invalid token so we should exit
    // while we still can.
    // if((!label) && (count === 1)){
    //   console.error(error.message);
    //   process.exit(1);
    // }
    return console.log(chalk.dim(count + '. ') + chalk.bold(labelName) + ': ' + chalk.red('failed (' + error.message) + ')');
  }

  console.log(chalk.dim(count + '. ') + chalk.bold(labelName) + ': ' + chalk.green('ok'));
});
