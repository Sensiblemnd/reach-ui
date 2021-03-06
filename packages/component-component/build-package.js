// this gets run from the package directory
// const fs = require("fs");
const execSync = require("child_process").execSync;
// const prettyBytes = require("pretty-bytes");
// const gzipSize = require("gzip-size");
const path = require("path");

// let pkg = path.basename(process.env.PWD || process.cwd());
let babel = path.resolve(__dirname, "../../node_modules/.bin/babel");
// let rollup = `${__dirname}/../node_modules/.bin/rollup`;
// let rollupConfig = `${__dirname}/rollup-config.js`;

const exec = (command, extraEnv) =>
  execSync(command, {
    env: Object.assign({}, process.env, extraEnv),
    stdio: "inherit"
  });

console.log("\nBuilding ES modules ...");
exec(
  `${babel} src -o dist/component-component.esm.js --ignore src/*.test.js --root-mode upward`,
  {
    MODULE_FORMAT: "esm"
  }
);

console.log("Building CommonJS modules ...");
exec(`${babel} src -d dist --ignore src/*.test.js --root-mode upward`, {
  MODULE_FORMAT: "cjs"
});

// Not building UMD for now...

// console.log("\nBuilding UMD ...");
// exec(`${rollup} -c ${rollupConfig} -f umd -o umd/reach-${pkg}.js`, {
//   BABEL_ENV: "umd",
//   NODE_ENV: "development"
// });

// console.log("\nBuilding UMD min.js ...");
// exec(`${rollup} -c ${rollupConfig} -f umd -o umd/reach-${pkg}.min.js`, {
//   BABEL_ENV: "umd",
//   NODE_ENV: "production"
// });

// const size = gzipSize.sync(fs.readFileSync(`umd/reach-${pkg}.min.js`));
// console.log(`\n${pkg} UMD build is %s`, prettyBytes(size));
