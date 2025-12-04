// Original problem definitions - completely generic and safe

const problems = [
  {
    id: 1,
    title: "Robot Movement",
    description: `A robot moves on a horizontal line. It understands two commands:
- 'L': Move one step to the left
- 'R': Move one step to the right

The robot starts at position 0. Given a string of commands, determine the robot's final position relative to its starting position.

Task:
Return a string based on the final position:
- If the robot stops to the left of its starting position (final position < 0), return "L"
- If the robot stops at its starting position (final position == 0), return "" (empty string)
- If the robot stops to the right of its starting position (final position > 0), return "R"

Input Format:
A single line containing a string of 'L' and 'R' characters.

Example 1:
Input: "RLLRLL"
Output: "L"

Explanation:
- Start at position 0
- R: position 1
- L: position 0
- L: position -1
- R: position 0
- L: position -1
- L: position -2
Final position is -2 (left of start), so return "L"

Example 2:
Input: "LLRLLLRRRR"
Output: ""

Explanation:
- After executing all commands, the robot returns to position 0
- Final position is 0 (at start), so return "" (empty string)

Example 3:
Input: "RRR"
Output: "R"

Explanation:
- Final position is 3 (right of start), so return "R"`,
    examples: [
      { input: "RLLRLL", output: "L" },
      { input: "LLRLLLRRRR", output: "" },
      { input: "RRR", output: "R" },
    ],
    testcases: [
      { id: 1, input: "RLLRLL", expected: "L" },
      { id: 2, input: "LLRLLLRRRR", expected: "" },
      { id: 3, input: "RRR", expected: "R" },
      { id: 4, input: "LLL", expected: "L" },
      { id: 5, input: "RLRLRL", expected: "" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read command string from input\n    # Track position (start at 0)\n    # Process each command: L decreases, R increases\n    # Return "L", "", or "R" based on final position\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Process commands and track position\n    // Return "L", "", or "R" based on final position\n}`,
    },
  },
  {
    id: 2,
    title: "Sensor Readings",
    description: `Process an array of non-negative integers called readings. Each element must be repeatedly replaced by the sum of its digits until every element becomes a single digit. After this transformation, return the most frequently occurring digit in the final array. If there is a tie (multiple digits occurring with the same maximum frequency), return the highest digit among them.

Input Format:
First line: Number of readings N
Next line: N space-separated integers representing the readings

Output Format:
Return a single integer representing the most frequently occurring digit (or highest digit in case of tie).

Example 1:
Input:
4
123 456 789 101

Output:
6

Explanation:
- 123 → 1+2+3 = 6
- 456 → 4+5+6 = 15 → 1+5 = 6
- 789 → 7+8+9 = 24 → 2+4 = 6
- 101 → 1+0+1 = 2
Final array: [6, 6, 6, 2]. Most occurring digit is 6.

Example 2:
Input:
1
6

Output:
6

Explanation:
- 6 is already a single digit
- Final array: [6]. Most occurring digit is 6.

Example 3:
Input:
5
3 12 23 32 0

Output:
5

Explanation:
- 3 → 3
- 12 → 1+2 = 3
- 23 → 2+3 = 5
- 32 → 3+2 = 5
- 0 → 0
Final array: [3, 3, 5, 5, 0]. Digits 3 and 5 each appear twice. Since there's a tie, return the highest digit: 5.`,
    examples: [
      { input: "4\n123 456 789 101", output: "6" },
      { input: "1\n6", output: "6" },
      { input: "5\n3 12 23 32 0", output: "5" },
    ],
    testcases: [
      { id: 1, input: "4\n123 456 789 101", expected: "6" },
      { id: 2, input: "1\n6", expected: "6" },
      { id: 3, input: "5\n3 12 23 32 0", expected: "5" },
      { id: 4, input: "3\n999 888 777", expected: "9" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read number of readings\n    # Read the readings array\n    # For each reading, reduce to single digit by summing digits repeatedly\n    # Count frequency of each digit in final array\n    # Return most frequent digit (or highest in case of tie)\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse readings array\n    // Reduce each reading to single digit\n    // Count frequencies and return most frequent (or highest if tie)\n}`,
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
        output: "0\n8\n3",
      },
      {
        input: "0000111100001111\n2\n0 4\n0 2",
        output: "0\n-1",
      },
    ],
    testcases: [
      {
        id: 1,
        input: "0000000011111111\n3\n0 3\n0 2\n1 1",
        expected: "0\n8\n3",
      },
      {
        id: 2,
        input: "0000111100001111\n2\n0 4\n0 2",
        expected: "0\n-1",
      },
      {
        id: 3,
        input: "0000000000000000\n2\n0 5\n0 3",
        expected: "0\n0",
      },
      {
        id: 4,
        input: "1111111111111111\n1\n0 1",
        expected: "-1",
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
    title: "Codewriting",
    description: `Format text for a newspaper page according to specific rules.

Input Format:
The input will be provided as follows:
- First line: width (integer)
- Second line: number of paragraphs N
- Next N lines: Each line contains a paragraph represented as space-separated text chunks

For example:
16
3
hello world
How areYou doing
Please look and align to center

Output Format:
Return an array of strings where each string represents a line of the newspaper page.

Rules:
1. Paragraph Start: Each paragraph starts on a new line
2. Text Chunks Order: Add text chunks from each paragraph in order
3. Chunk Separation: When text portions are on the same line, separate them by 1 space
4. Line Wrapping: If adding the next chunk would cause the line to exceed width, start a new line. You cannot break up individual text chunks.
5. Centering: If a line has leftover space (total length < width), center the text:
   - Even leftover space: Add equal spaces before and after
   - Odd leftover space: Add equal spaces before and after, with extra space after
6. Border: Add a rectangular border of asterisks (*) around the entire page. The border does not count towards width.

Example:
Input:
16
3
hello world
How areYou doing
Please look and align to center

Output (each line as separate output):
******************
*   hello world  *
* How areYou doing *
*  Please look   *
*   and align    *
*   to center    *
******************

Note: Output each line on a separate line. The border width is width + 4 (2 asterisks on each side + 2 spaces).`,
    examples: [
      { 
        input: "16\n3\nhello world\nHow areYou doing\nPlease look and align to center", 
        output: "******************\n*   hello world  *\n* How areYou doing *\n*  Please look   *\n*   and align    *\n*   to center    *\n******************" 
      },
      { 
        input: "10\n2\nshort text\nlonger text here", 
        output: "************\n*  short  *\n*  text   *\n*  longer *\n*  text   *\n*  here   *\n************" 
      },
    ],
    testcases: [
      { 
        id: 1, 
        input: "16\n3\nhello world\nHow areYou doing\nPlease look and align to center", 
        expected: "******************\n*   hello world  *\n* How areYou doing *\n*  Please look   *\n*   and align    *\n*   to center    *\n******************" 
      },
      { 
        id: 2, 
        input: "10\n2\nshort text\nlonger text here", 
        expected: "************\n*  short  *\n*  text   *\n*  longer *\n*  text   *\n*  here   *\n************" 
      },
      { 
        id: 3, 
        input: "5\n1\na b c", 
        expected: "*******\n* a b *\n*  c  *\n*******" 
      },
      { 
        id: 4, 
        input: "20\n1\nThis is a single very long word that exceeds", 
        expected: "************************\n* This is a single very *\n*      long word       *\n*      that exceeds    *\n************************" 
      },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read width\n    # Read number of paragraphs\n    # Read each paragraph (space-separated chunks)\n    # Format according to rules\n    # Add border and return lines\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse input: width, paragraphs\n    // Format text with centering and wrapping\n    // Add border and return array of lines\n}`,
    },
  },
  {
    id: 5,
    title: "Phone Number to Words Converter",
    description: `Given a string of digits representing a phone number, find all possible valid words that can be formed using the traditional phone number letter mapping.

Phone Keypad Mapping:
2: 'abc'
3: 'def'
4: 'ghi'
5: 'jkl'
6: 'mno'
7: 'pqrs'
8: 'tuv'
9: 'wxyz'

Input Format:
First line: A string of digits (2-9) representing the phone number
Second line: A dictionary of valid words, space-separated

Output Format:
Return all valid words that can be spelled using the digits, one word per line, in lexicographical order.

Rules:
- Generate all possible letter combinations from the digits
- Only return words that exist in the provided dictionary
- Words should be returned in lexicographical (alphabetical) order
- The phone number can be of any length

Example:
Input:
76278
roast smart snast tree test

Output:
roast
smart
snast

Explanation:
- Digit 7 maps to: p, q, r, s
- Digit 6 maps to: m, n, o
- Digit 2 maps to: a, b, c
- Digit 7 maps to: p, q, r, s
- Digit 8 maps to: t, u, v

Possible combinations include: roast, smart, snast, etc.
Only words present in the dictionary are returned.`,
    examples: [
      { 
        input: "76278\nroast smart snast tree test", 
        output: "roast\nsmart\nsnast" 
      },
      { 
        input: "23\nad ae af bd be bf cd ce cf", 
        output: "ad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf" 
      },
    ],
    testcases: [
      { 
        id: 1, 
        input: "76278\nroast smart snast tree test", 
        expected: "roast\nsmart\nsnast" 
      },
      { 
        id: 2, 
        input: "23\nad ae af bd be bf cd ce cf", 
        expected: "ad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf" 
      },
      { 
        id: 3, 
        input: "2\na b c", 
        expected: "a\nb\nc" 
      },
      { 
        id: 4, 
        input: "999\nwww wwx wwy wwz", 
        expected: "www\nwwx\nwwy\nwwz" 
      },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read phone number digits\n    # Read dictionary words\n    # Map digits to letters\n    # Generate all possible letter combinations\n    # Filter by dictionary and return in sorted order\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse phone number and dictionary\n    // Map digits to letters\n    // Generate combinations and filter by dictionary\n    // Return sorted valid words\n}`,
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
