const { resolve } = require('path');

const INPUT_PATH = resolve(__dirname, '..', 'src');
const OUTPUT_PATH = resolve(__dirname, '..', 'build');

const DEFAULT_PORT = 8000;

module.exports = {
  INPUT_PATH,
  OUTPUT_PATH,
  DEFAULT_PORT,
};
