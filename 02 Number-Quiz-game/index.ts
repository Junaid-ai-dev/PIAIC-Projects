#! /usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";

function sleep() {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
}
async function start() {
  let title = chalkAnimation.rainbow("Starting the game ");
  await sleep();
  title.stop();
}

await start();

async function startGame() {
  let systemNum = Math.floor(Math.random() * 10);
  let userNum = await inquirer.prompt([
    {
      type: "number",
      name: "userGuess",
      message: chalk.redBright("Enter your number between 1 to 10: "),
    },
  ]);
  let userGuess = userNum;

  console.log("Your guess: ", userNum, "\nsystem number: ", systemNum);

  if (userGuess === systemNum) {
    console.log("Your guess is correct \nyou win !!");
  } else {
    console.log("Better luck next time !!");
  }
}

async function restart() {
  do {
    await startGame();
    var again = await inquirer.prompt({
      type: "input",
      name: "continue",
      message: "Do you want to continue? press y or n: ",
    });
  } while (
    again.continue === "y" ||
    again.continue === "Y" ||
    again.continue === "yes"
  );
}

restart();
