var chalk = require('chalk');

module.exports = function fooloader(source) {
  console.log([
    '',
    chalk.bgCyan('INPUT --------------------------------------------'),
    chalk.cyan(source)
  ].join('\n'));
  return source;
}