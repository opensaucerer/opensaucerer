const { readFileSync } = require('fs');
const { resolve } = require('path');

const { argv } = require('process');

const path = resolve('./app.txt');

const data = readFileSync(path, 'utf8');

const a = /([0-9])/gi;

console.log(Number(data.match(a).join('')));

// const a = /([0-9])/gi;

// // if (argv.includes('-rate')) {
// //   const rate = argv[argv.indexOf('-rate') + 1];
// //   console.log(String(data).match(a));
// //   const value = Number(String(data).match(a).join(''));

// //   const price = value / Number(rate);

// //   console.log(price);
// // }
