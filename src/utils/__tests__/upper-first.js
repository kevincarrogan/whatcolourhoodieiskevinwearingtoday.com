import upperFirst from '../upper-first';

describe('upperFirst', () => {
  it('Capitalises the first letter', () => {
    const output = upperFirst('test');
    expect(output).toBe('Test');
  });
});
