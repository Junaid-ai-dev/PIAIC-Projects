#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
async function welcome() {
    let title = chalkAnimation.rainbow("Starting calculator");
    await sleep();
    title.stop();
}
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};
await welcome();
async function askQuestion() {
    let answer = await inquirer.prompt([
        {
            type: "list",
            name: "operator",
            message: "which operation you want to perform \n",
            choices: ["addition", "subtraction", "multiplication", "division"],
        },
        {
            type: "number",
            name: "num1",
            message: "Enter number 1 : ",
        },
        {
            type: "number",
            name: "num2",
            message: "Enter number 2 : ",
        },
    ]);
    if (answer.operator == "addition") {
        console.log(chalk.redBright(`${answer.num1} + ${answer.num2} = ${answer.num1 + answer.num2}`));
    }
    else if (answer.operator == "subtraction") {
        console.log(chalk.greenBright(`${answer.num1} - ${answer.num2} = ${answer.num1 - answer.num2}`));
    }
    else if (answer.operator == "multiplication") {
        console.log(chalk.greenBright(`${answer.num1} * ${answer.num2} = ${answer.num1 * answer.num2}`));
    }
    else if (answer.operator == "division") {
        console.log(chalk.greenBright(`${answer.num1} / ${answer.num2} = ${answer.num1 / answer.num2}`));
    }
}
async function startAgain() {
    do {
        await askQuestion();
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue ? press y or n : ",
        });
    } while (again.restart == "y" ||
        again.restart == "yes" ||
        again.restart == "Y" ||
        again.restart == "YES");
}
startAgain();
