'use strict';

const chalk = require(`chalk`);
const clear = require(`clear`);
const figlet = require(`figlet`);

const github = require(`./lib/github`);
const repo = require(`./lib/repo`);


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

const getGithubToken = async () => {
  let token = github.getStoredGithubToken();
  if (token) {
    return token;
  }

  token = await github.getPersonalAccesToken();
  return token;
};

const run = async () => {
  try {
    const token = await getGithubToken();
    github.githubAuth(token);

    const url = await repo.createRemoteRepo();

    await repo.createGitignore();

    await repo.setupRepo(url);

    console.log(chalk.green(`All done!`));
  } catch (err) {
    if (err) {
      switch (err.status) {
        case 401:
          console.log(chalk.red(`Couldn't log you in. Please provide correct credentials/token`));
          break;
        case 422:
          console.log(chalk.red(`There is already a remote repository or token with the same name`));
          break;
        default:
          console.log(chalk.red(err));
      }
    }
  }
};

run();
