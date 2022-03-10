import Process from './process';

jest.mock('./qjs', () => ({
  cwd: () => '/mock/cwd',
}));

describe('decode', () => {
  ['SGVsbG8=', 'x'].forEach((input) => {
    test(`input: ${input}`, () => {
      const result = new Process('decode', input);
      expect(result.scriptFilters).toMatchSnapshot();
    });
  });
});

describe('encode', () => {
  ['Hello'].forEach((input) => {
    test(`input: ${input}`, () => {
      const result = new Process('encode', input);
      expect(result.scriptFilters).toMatchSnapshot();
    });
  });
});
