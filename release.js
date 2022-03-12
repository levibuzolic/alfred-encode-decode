import plist from 'simple-plist';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const run = (command) =>
  execSync(command, (error, stdout, stderr) => {
    if (stdout) console.log(reset, stdout);
    if (stderr) console.error(red, stderr, reset);
  });

const PLIST = 'info.plist';
const packageJSON = JSON.parse(readFileSync('package.json', 'utf8'));
const data = plist.readFileSync('info.plist');
plist.writeFileSync('info.plist', { ...data, version: packageJSON.version });

run(`zip encode-decode.alfredworkflow -r info.plist dist quickjs/qjs`);
