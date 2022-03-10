export type Mode = 'encode' | 'decode';

export const types = {
  base64: 'Base64',
  base64url: 'Base64 URL Safe',
  html_entities: 'HTML Entities',
} as const;

export type Type = keyof typeof types;

export type Encoder = {
  type: Type;
  encode: (value: string) => string;
  decode: (value: string) => string;
};
export type Encoders = Encoder[];
