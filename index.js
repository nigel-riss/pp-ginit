'use strict';

const chalk = require(`chalk`);
const clear = require(`clear`);
const figlet = require(`figlet`);

const files = require(`./lib/files`);
// const inquirer = require(`./lib/inquirer`);
const github = require(`./lib/github`);


clear();

console.info(
  chalk.yellow(
    figlet.textSync(`gInit`, { horizontalLayout: `full` })
  )
);

// if (files.directoryExists(`.git`)) {
//   console.error(chalk.red(`Already a Git repository!`));
//   process.exit();
// }

const run = async () => {
  let token = github.getStoredGithubToken();
  if (!token) {
    token = await github.getPersonalAccesToken();
  }
  console.log(token);
};

run();
