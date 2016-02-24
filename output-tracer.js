var chalk = require('chalk');

module.exports = function fooloader(source) {
  console.log([
    '',
    chalk.bgYellow('OUTPUT -------------------------------------------'),
    chalk.yellow(source)
  ].join('\n'));
  return source;
}