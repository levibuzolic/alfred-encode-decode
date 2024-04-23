import Process from './process';
import type { Mode } from 'types';

try {
  const [_script, modeArg, ...values] = scriptArgs;
  const mode: Mode = /encode/i.test(modeArg) ? 'encode' : 'decode';
  const value = values.join(' ');
  const result = new Process(mode, value);
  console.log(result.json);
} catch (error) {
  console.log(error);
}
