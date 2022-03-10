import Process from './process';

test('process', () => {
  expect(new Process('decode', 'SGVsbG8=').entries).toEqual([
    ['base64', 'Hello'],
  ]);
});
