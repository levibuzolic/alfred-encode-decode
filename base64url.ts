import base64 from 'base-64';

export default {
  encode: (value: string): string =>
    base64
      .encode(value)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, ''),
  decode: (value: string): string => {
    let adjusted = value.replace(/-/g, '+').replace(/_/g, '/');
    const mod4 = adjusted.length % 4;
    if (mod4) adjusted += '===='.substring(mod4);
    return base64.decode(adjusted);
  },
};
