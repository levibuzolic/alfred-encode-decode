// https://formulae.brew.sh/api/bottle/quickjs.json
// curl -L -H "Authorization: Bearer QQ==" -o x.tar.gz https://ghcr.io/v2/homebrew/core/NAME/blobs/sha256:HASH

import https from 'https';
import { mkdirSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import glob from 'glob';

const reset = '\x1b[0m';
const red = '\x1b[31m';
const cyan = '\x1b[36m';

const log = (...args) => console.log('ℹ️ ', cyan, ...args, reset);

function fetchJSON(urlOrOptions) {
  return new Promise((resolve, reject) => {
    https
      .get(urlOrOptions, (res) => {
        let body = '';
        res.on('data', (data) => {
          body += data;
        });
        res.on('end', () => {
          resolve(JSON.parse(body));
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

const run = (command) =>
  execSync(command, (error, stdout, stderr) => {
    if (stdout) console.log(reset, stdout);
    if (stderr) console.error(red, stderr, reset);
  });

log('Fetching bottle list...');
const formula = await fetchJSON('https://formulae.brew.sh/api/bottle/quickjs.json');
const bottles = {
  arm64: {
    url: formula.bottles.arm64_monterey.url,
    binaries: {},
  },
  x86_64: {
    url: formula.bottles.monterey.url,
    binaries: {},
  },
};

log('Cleaning up old files...');
rmSync('./quickjs', { recursive: true, force: true });
mkdirSync('./quickjs');

Object.entries(bottles).forEach(([arch, { url, binaries }]) => {
  mkdirSync(`./quickjs/${arch}`);

  log(`Downloading ${arch} build...`);
  run(`curl -L -H "Authorization: Bearer QQ==" -o ./quickjs/${arch}/quickjs.tar.gz "${url}"`);

  log(`Extracting ${arch}...`);
  run(`cd quickjs/${arch} && tar -xvf quickjs.tar.gz`);

  glob.sync(`./quickjs/${arch}/**/bin/*`).forEach((path) => {
    const fileName = path.split('/').pop();
    binaries[fileName] = path;
  });
});

const archs = Object.keys(bottles);

['qjs', 'qjsc', 'qjscalc'].forEach((bin) => {
  const inputs = archs.map((arch) => bottles[arch].binaries[bin]);
  log(`Creating universal binary for ${bin}...`);
  run(`lipo -create ${inputs.join(' ')} -o ./quickjs/${bin}`);
  // To get the arch format of a binary: lipo -archs ./quickjs/qjs
});

log('Cleaning up...');
archs.forEach((arch) => {
  rmSync(`./quickjs/${arch}`, { recursive: true, force: true });
});

log('Done!');
