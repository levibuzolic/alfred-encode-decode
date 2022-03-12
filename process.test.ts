import Process from './process';

jest.mock('./qjs', () => ({
  cwd: () => '/mock/cwd',
}));

describe('decode', () => {
  ['SGVsbG8=', 'x', '', 'https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'].forEach((input) => {
    test(`input: "${input}"`, () => {
      const result = new Process('decode', input);
      expect(result.json).toMatchSnapshot();
    });
  });
});

describe('encode', () => {
  ['Hello', '', 'https://mozilla.org/?x=шеллы'].forEach((input) => {
    test(`input: "${input}"`, () => {
      const result = new Process('encode', input);
      expect(result.json).toMatchSnapshot();
    });
  });
});

test('json output', () => {
  const result = new Process('encode', 'Hello');
  expect(result.json).toEqual(JSON.stringify(result.scriptFilters, null, 2));
});
