'use strict';

const chalk = require(`chalk`);
const clear = require(`clear`);
const figlet = require(`figlet`);

const files = require(`./lib/files`);
const inquirer = require(`./lib/inquirer`);


clear();

console.info(
  chalk.yellow(
    figlet.textSync(`yuriy kurenkov`, { horizontalLayout: `full` })
  )
);

if (files.directoryExists(`.git`)) {
  console.error(chalk.red(`Already a Git repository!`));
  process.exit();
}

const run = async () => {
  const credentials = await inquirer.askGithubCredentials();
  console.log(credentials);
};

run();
