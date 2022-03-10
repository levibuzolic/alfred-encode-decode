import type { ScriptFilterItem } from './types';
import type { EncoderType } from './encoders';
import { cwd } from './qjs';

export default class Result {
  constructor(
    private type: EncoderType,
    private value?: string | undefined,
    private error?: Error | unknown
  ) {}

  get item(): ScriptFilterItem {
    return {
      // Sets the order
      // uid: this.type,
      title: this.title,
      subtitle: this.subtitle,
      arg: this.clipboard,
      icon: this.valid ? undefined : { path: `${cwd()}/invalid.png` },
      valid: this.valid,
    };
  }

  get valid(): boolean {
    if (this.error) return false;
    const value = this.value;
    return value != null && value.trim() !== '';
  }

  private get subtitle(): string {
    return this.type.name;
  }

  private get title(): string {
    if (!this.valid) return 'No Result';
    return this.value ?? '';
  }

  private get clipboard() {
    return this.value;
  }
}
