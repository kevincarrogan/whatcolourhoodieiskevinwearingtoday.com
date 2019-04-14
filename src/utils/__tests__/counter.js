import counter from '../counter';

describe('counter', () => {
  it('Counts items from an array', () => {
    const output = counter(['a', 'b', 'b', 'c', 'c', 'c']);
    expect(output).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
