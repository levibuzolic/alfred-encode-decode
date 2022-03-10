import base64 from 'base-64';
import base64url from './base64url';
import * as html from 'html-entities';

export class EncoderType {
  constructor(
    public name: string,
    public encode: (value: string) => string,
    public decode: (value: string) => string
  ) {}
}

export const encoders = [
  new EncoderType('Base64', base64.encode, base64.decode),
  new EncoderType('Base64 URL Safe', base64url.encode, base64url.decode),
  new EncoderType('HTML Entities', html.encode, html.decode),
];
