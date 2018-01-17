'use strict';
const werdino = require('werdino');
const chalk = require('chalk');
const translate = require('google-translate-api');
const boxen = require('boxen');
const condense = require('condense-whitespace');
const titleize = require('titleize');
const ora = require('ora');
const zp = require('simple-zeropad');

const today = new Date();

// A key in the form of 2018-01-17
const todaysItem = `${today.getFullYear()}-${zp(today.getMonth() + 1)}-${zp(today.getDate())}`;

const spinner = ora(`Fetching menu for ${chalk.yellow(todaysItem)}`).start();

function print(text) {
	const parts = text.split('\n');

	let str = '';

	parts.forEach(s => {
		const title = '[TITLE] ';
		const price = '[MEAL PRICES] ';
		const descr = '[MEAL DESCRIPTION] ';
		const mealTitle = '[MEAL TITLE] ';

		if (s.indexOf(title) === 0) {
			str += boxen(chalk.magenta(titleize(s.replace(title, ''))), { padding: 0, margin: 0, borderStyle: 'round', dimBorder: true });
			str += '\n\n';
		}

		else if (s.indexOf(mealTitle) === 0) {
			str += chalk.cyan(`    ${titleize(s.replace(mealTitle, ''))}`);
			str += chalk.gray(' | ');
			//str += '\n';
		}

		else if (s.indexOf(descr) === 0) {
			str += chalk.white(`${s.replace(descr, '')}`);
			str += '\n';
		}

		else if (s.indexOf(price) === 0) {
			str += chalk.gray(`    ${s.replace(price, '')}`);
			str += '\n';
		}

		else if (s.indexOf('---' === 0)) {
			str += '\n';
		}
	});

	console.log();
	console.log(str);
}

module.exports = (input, opts) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	opts = opts || {};

	let german = '';
	
	werdino().then((data) => {
		// console.log(JSON.stringify(data, null, 2));

		data.forEach(item => {

			const title = condense(item.title);

			german += `[TITLE] ${title}\n`;

			const mealTitle = condense(item.meals[todaysItem].title);
			const mealDescription = condense(item.meals[todaysItem].description);

			german += `[MEAL TITLE] ${mealTitle}\n`;
			german += `[MEAL DESCRIPTION] ${mealDescription}\n`;
			german += `[MEAL PRICES] ${item.meals[todaysItem].prices.join(' | ')}\n`;
			german += '---\n';
		});

		// print(german);

		translate(german).then(data => {
			spinner.succeed();

			print(data.text);
		});
	});
};
