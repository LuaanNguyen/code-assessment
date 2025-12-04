// Original problem definitions - completely generic and safe

const problems = [
  {
    id: 1,
    title: "Sum of Two Numbers",
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
    title: "Memory Allocation",
    description: `Given an array of 0s and 1s, interpret every 8 bits as one block. A contiguous subarray of 0's that starts at the beginning of each block is considered "free memory".

For example, given [0011111111111100], the free memory in each block is calculated as follows:
- Block 1: [00111111] (Free memory size: 2)
- Block 2: [11111100] (Free memory: 0)

Input Format:
First line: A string of 0s and 1s representing the memory array
Second line: Number of queries N
Next N lines: Each query in format "i j" where:
  - i = 0: Allocate Memory (i, size)
  - i = 1: Release Memory (i, k)

Query Types:
1. Allocate Memory (i = 0): For a query like (0, 5), find the earliest block where 5 consecutive 0's are available at the start of the block. Return the starting index of this block. If no suitable block is found, return -1. When memory is successfully allocated, mark those bits as 1.

2. Release Memory (i = 1): For a query like (1, 3), release the memory of the 3rd successful allocation. Return the size of the memory being released. Mark these bits as 0.

Output:
A list where each element corresponds to one query. Output each result on a separate line.

Example:
Input:
"0011111111111100"
2
"0 5"
"1 1"

Explanation:
- Initial blocks: Block 0 [00111111] has 2 free, Block 1 [11111100] has 0 free
- Query (0,5): Need 5 consecutive 0s at start. Block 0 only has 2, Block 1 has 0. Return -1.
- Query (1,1): Release 1st allocation, but there was no successful allocation, so this wouldn't happen in valid input.

For a valid example:
Input:
"0000000011111111"
3
"0 3"
"0 2"
"1 1"

Output:
0
8
3

Explanation:
- Block 0: [00000000] has 8 free 0s at start
- Block 1: [11111111] has 0 free
- Query (0,3): Find block with 3+ 0s at start -> Block 0, return 0, mark first 3 bits as 1: [11100000]
- Query (0,2): Find block with 2+ 0s at start -> Block 0 still has 5 free, return 0, mark next 2: [11111000]
- Query (1,1): Release 1st allocation (size 3), return 3, mark those bits back to 0: [00011000]`,
    examples: [
      { 
        input: "0000000011111111\n3\n0 3\n0 2\n1 1", 
        output: "0\n8\n3" 
      },
      { 
        input: "0000111100001111\n2\n0 4\n0 2", 
        output: "0\n-1" 
      },
    ],
    testcases: [
      { 
        id: 1, 
        input: "0000000011111111\n3\n0 3\n0 2\n1 1", 
        expected: "0\n8\n3" 
      },
      { 
        id: 2, 
        input: "0000111100001111\n2\n0 4\n0 2", 
        expected: "0\n-1" 
      },
      { 
        id: 3, 
        input: "0000000000000000\n2\n0 5\n0 3", 
        expected: "0\n0" 
      },
      { 
        id: 4, 
        input: "1111111111111111\n1\n0 1", 
        expected: "-1" 
      },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read memory array string\n    # Read number of queries\n    # Process each query and output result\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Process memory allocation queries\n    // Return results for each query\n}`,
    },
  },
  {
    id: 4,
    title: "Reverse String",
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
  }));
}

/**
 * Get problem by ID
 */
export function getProblemById(id) {
  return problems.find((p) => p.id === parseInt(id));
}
