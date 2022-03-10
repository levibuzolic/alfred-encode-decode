export const types = {
  base64: 'Base64',
  html_entities: 'HTML Entities',
} as const;

export type Type = keyof typeof types;
