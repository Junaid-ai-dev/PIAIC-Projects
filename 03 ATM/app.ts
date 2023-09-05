#! /usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { Console } from "console";
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
			type: "password",
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
			when(answers: { accountType: any }) {
				return answers.accountType;
			},
		},
		{
			type: "list",
			name: "fastType",
			message: "Choose amount : ",
			choices: [500, 1000, 2000, 5000, 10000, 20000],
			when(answers: {
				withdrawType: any;
				fastType: any;
				userPin: any;
				userId: any;
				transactionType: string;
			}) {
				return answers.transactionType == "Fast cash";
			},
		},
		{
			type: "number",
			name: "withdrawType",
			message: "Enter your amount : ",
			when(answers: { transactionType: string }) {
				return answers.transactionType == "withdraw";
			},
		},
	]);

	async function start() {
		let title = chalkAnimation.rainbow("Your transaction is being processed");
		await sleep();
		title.stop();
	}
	
	await start();

	if (answers.userId && answers.userPin) {
		const balance = 50000;
		console.log("your previous account balance was ", balance);
		const enteredamount = answers.fastType || answers.withdrawType;
		if (balance >= enteredamount) {
			const remainingAmount = balance - enteredamount;
			console.log(
				"Your remaining account balance is : ",
				remainingAmount
			);
		} else {
			console.log("Insufficient account balance");
		}
	}
}

async function checker() {
	let cred = await inquirer.prompt([
		{
			type: "list",
			name: "form",
			message: "Are you new user ?",
			choices: ["New user", "Already have a account"],
		},
		{
			type: "input",
			name: "newid",
			message: "Enter your new Id",
			when(cred) {
				return (
					cred.form == "New user" ||
					cred.form == "Already have a account"
				);
			},
		},
		{
			type: "input",
			name: "newPwd",
			message: "Enter your new Password",
			when(cred) {
				return cred.form == ("New user" || "Already have a account");
			},
		},
	]);

	let a = cred.newid;
	let b = cred.newPwd;

	let credArray = [a, b];

	async function login() {
		return new Promise((resolve, reject) => {
			if (a && b) {
				resolve({
					success: true,
					message: "succesful login",
				});
			} else {
				reject({
					success: false,
					message: "login failed",
				});
			}
		});
	}

	try {
		const result: any = await login();

		if (result.success) {
			mainFunc();
		}
	} catch (error) {
		console.log("login failed");
	}
}

checker();
