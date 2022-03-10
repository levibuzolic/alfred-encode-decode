import Process from './process';
import type { Mode } from 'types';

try {
  const [_script, modeArg, ...values] = scriptArgs;
  // TODO: make the flag required and error if unexpected args
  const mode: Mode = /encode/i.test(modeArg) ? 'encode' : 'decode';
  const value = values.join(' ');
  const result = new Process(mode, value);
  console.log(result.xml);
} catch (error) {
  console.log(error);
}
