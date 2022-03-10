import base64 from 'base-64';
import Result from './result';
import type { Encoders, Mode, Type } from './types';

const encoders: Encoders = [
  { type: 'base64', encode: base64.encode, decode: base64.decode },
];

export default class Process {
  #errors: (Error | unknown)[] = [];
  #mode: Mode;
  #value: string;
  results: Result[];

  constructor(mode: Mode, value: string) {
    this.#mode = mode;
    this.#value = value;
    this.results = this.run();
  }

  run(): Result[] {
    const results = encoders.map((encoder) => {
      try {
        const result = encoder[this.#mode](this.#value);
        return new Result(encoder.type, result);
      } catch (error) {
        this.#errors.push(error);
        return new Result(encoder.type);
      }
    });

    const valid = results.filter((result) => result.valid);
    const invalid = results.filter((result) => !result.valid);

    return [...valid, ...invalid];
  }

  get xml(): string {
    return `
      <?xml version='1.0'?>
      <items>
        ${this.results.map((result) => result.xml).join('\n')}
      </items>
    `;
  }

  get entries(): [Type, string | undefined][] {
    return this.results.map((result) => [result.type, result.value]);
  }

  get errors(): void | (Error | unknown)[] {
    if (this.#errors.length === 0) return;
    return this.#errors;
  }
}
