#! /usr/bin/env node
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
function sleep() {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
}
async function start() {
    let title = chalkAnimation.rainbow("Starting ATM plz wait");
    await sleep();
    title.stop();
}
await start();
async function mainFunc() {
    let answers = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: "Enter your id: ",
        },
        {
            type: "number",
            name: "userPin",
            message: "Enter your pin: ",
        },
        {
            type: "list",
            name: "accountType",
            message: "What is your account type : ",
            choices: ["Current", "saving"],
        },
        {
            type: "list",
            name: "transactionType",
            message: "Choose method : ",
            choices: ["Fast cash", "withdraw"],
            when(answers) {
                return answers.accountType;
            },
        },
        {
            type: "list",
            name: "fastType",
            message: "Choose amount : ",
            choices: [500, 1000, 2000, 5000, 10000, 20000],
            when(answers) {
                return answers.transactionType == "Fast cash";
            },
        },
        {
            type: "number",
            name: "withdrawType",
            message: "Enter your amount : ",
            when(answers) {
                return answers.transactionType == "withdraw";
            },
        },
    ]);
    if (answers.userId && answers.userPin) {
        const balance = 50000;
        console.log("your previous account balance was ", balance);
        const enteredamount = answers.fastType || answers.withdrawType;
        if (balance >= enteredamount) {
            const remainingAmount = balance - enteredamount;
            console.log("Your remaining account balance is : ", remainingAmount);
        }
        else {
            console.log("Insufficient account balance");
        }
    }
}
mainFunc();
