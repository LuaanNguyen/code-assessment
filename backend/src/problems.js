// Original problem definitions - completely generic and safe

const problems = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    difficulty: "Easy",
    description: `Given two integers a and b, return their sum.

Write a function solve() that takes no parameters. The function should read two space-separated integers from standard input and return their sum.

Example:
Input: "1 2"
Output: "3"`,
    examples: [
      { input: "1 2", output: "3" },
      { input: "5 7", output: "12" },
    ],
    testcases: [
      { id: 1, input: "3 4", expected: "7" },
      { id: 2, input: "10 12", expected: "22" },
      { id: 3, input: "-5 8", expected: "3" },
      { id: 4, input: "0 0", expected: "0" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read two integers from input\n    # Return their sum\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    const input = global.__input__ || '';\n    const values = input.split(' ').map(Number);\n    const a = values[0];\n    const b = values[1];\n    // Return their sum\n    return a + b;\n}`,
    },
  },
  {
    id: 2,
    title: "Find Maximum Value",
    difficulty: "Easy-Medium",
    description: `Given a list of integers, find and return the maximum value.

Write a function solve() that reads space-separated integers from standard input and returns the maximum value.

Example:
Input: "3 7 2 9 1"
Output: "9"`,
    examples: [
      { input: "3 7 2 9 1", output: "9" },
      { input: "10 5 8", output: "10" },
    ],
    testcases: [
      { id: 1, input: "3 7 2 9 1", expected: "9" },
      { id: 2, input: "10 5 8", expected: "10" },
      { id: 3, input: "-1 -5 -3", expected: "-1" },
      { id: 4, input: "42", expected: "42" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read space-separated integers from input\n    # Return the maximum value\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    const input = global.__input__ || '';\n    const values = input.split(' ').map(Number);\n    // Return the maximum value\n    return Math.max(...values);\n}`,
    },
  },
  {
    id: 3,
    title: "Count Even Numbers",
    difficulty: "Medium",
    description: `Given a list of integers, count how many even numbers are in the list.

Write a function solve() that reads space-separated integers from standard input and returns the count of even numbers.

Example:
Input: "1 2 3 4 5 6"
Output: "3"`,
    examples: [
      { input: "1 2 3 4 5 6", output: "3" },
      { input: "2 4 6 8", output: "4" },
    ],
    testcases: [
      { id: 1, input: "1 2 3 4 5 6", expected: "3" },
      { id: 2, input: "2 4 6 8", expected: "4" },
      { id: 3, input: "1 3 5 7", expected: "0" },
      { id: 4, input: "10", expected: "1" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read space-separated integers from input\n    # Count and return the number of even integers\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    const input = global.__input__ || '';\n    const values = input.split(' ').map(Number);\n    // Count and return the number of even integers\n    return values.filter(n => n % 2 === 0).length;\n}`,
    },
  },
  {
    id: 4,
    title: "Reverse String",
    difficulty: "Medium-Hard",
    description: `Given a string, reverse it and return the reversed string.

Write a function solve() that reads a string from standard input and returns the reversed string.

Example:
Input: "hello"
Output: "olleh"`,
    examples: [
      { input: "hello", output: "olleh" },
      { input: "world", output: "dlrow" },
    ],
    testcases: [
      { id: 1, input: "hello", expected: "olleh" },
      { id: 2, input: "world", expected: "dlrow" },
      { id: 3, input: "abc", expected: "cba" },
      { id: 4, input: "12345", expected: "54321" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read a string from input\n    # Return the reversed string\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    const input = global.__input__ || '';\n    // Return the reversed string\n    return input.split('').reverse().join('');\n}`,
    },
  },
];

/**
 * Get all problems
 */
export function getProblems() {
  return problems.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    examples: p.examples,
    functionSignature: p.functionSignature,
    difficulty: p.difficulty,
  }));
}

/**
 * Get problem by ID
 */
export function getProblemById(id) {
  return problems.find((p) => p.id === parseInt(id));
}
