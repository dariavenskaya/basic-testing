import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3, description: 'addition' },
  {
    a: 5,
    b: 3,
    action: Action.Subtract,
    expected: 2,
    description: 'subtraction',
  },
  {
    a: 2,
    b: 3,
    action: Action.Multiply,
    expected: 6,
    description: 'multiplication',
  },
  { a: 9, b: 3, action: Action.Divide, expected: 3, description: 'division' },
  {
    a: 8,
    b: 2,
    action: Action.Subtract,
    expected: 6,
    description: 'subtraction',
  },
  {
    a: 4,
    b: 2,
    action: 'UnknownAction' as Action,
    expected: null,
    description: 'unknown action',
  },
  {
    a: '',
    b: 2,
    action: Action.Add,
    expected: null,
    description: 'invalid argument',
  },
];

describe.each(testCases)('simpleCalculator', (testCase) => {
  test(`should return correct ${testCase.description} calculation`, () => {
    expect(
      simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      }),
    ).toBe(testCase.expected);
  });
});
