import { types, type Type } from "./types";

export default class Result {
  type: Type;
  value: string | undefined;

  constructor(type: Type, value?: string) {
    this.type = type;
    this.value = value;
  }

  get xml(): string {
    const type = types[this.type];

    // TODO: Formatting for invalid/missing values, maybe change icon too?
    // TODO: escape `uid` argument

    return `
      <item arg="${this.type}" uid="${this.value}">
        <title><![CDATA[${this.value}]]></title>
        <subtitle>${type}</subtitle>
      </item>
    `;
  }

  get valid(): boolean {
    const value = this.value;
    return value != null && value.trim() !== "";
  }
}
