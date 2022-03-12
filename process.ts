import Result from './result';
import { encoders } from './encoders';
import type { Mode, ScriptFilters } from './types';

export default class Process {
  #mode: Mode;
  #value: string;
  #results: Result[];

  constructor(mode: Mode, value: string) {
    this.#mode = mode;
    this.#value = value;
    this.#results = this.#run();
  }

  #run(): Result[] {
    const results = encoders.map((encoder) => {
      let result: string | undefined;
      let error: Error | unknown | undefined;
      try {
        result = encoder[this.#mode](this.#value);
      } catch (e) {
        error = e;
      }
      return new Result(encoder, result, error);
    });

    const valid = results.filter((result) => result.valid);
    const invalid = results.filter((result) => !result.valid);

    return [...valid, ...invalid];
  }

  get scriptFilters(): ScriptFilters {
    return { items: this.#results.map((result) => result.item) };
  }

  get json(): string {
    return JSON.stringify(this.scriptFilters, null, 2);
  }

  get errors(): { name: string; error: Error | unknown }[] {
    return this.#results.filter((r) => r.error != null).map(({ name, error }) => ({ name, error }));
  }
}
