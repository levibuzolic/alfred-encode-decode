import {types, type Type} from './types';

export default class Result {
  type: Type;
  value: string;

  constructor(type: Type, value: string) {
    this.type = type;
    this.value = value;
  }

  get xml(): string {
    const type = types[this.type];

    return `
      <item arg="${this.type}" uid="${this.type}">
        <title><![CDATA[${this.value}]]></title>
        <subtitle>${type}</subtitle>
      </item>
    `;
  }

  get valid(): boolean {
    return this.value.trim() !== '';
  }
}
