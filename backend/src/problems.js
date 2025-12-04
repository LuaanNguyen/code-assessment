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
    title: "Character Cascade from String Array",
    description: `Given an integer array of length n, return a result array of length n-2, where result[i] = 1 if the triplet (array[i], array[i+1], array[i+2]) satisfies any of the three Pythagorean conditions:

1. array[i]^2 + array[i+1]^2 = array[i+2]^2
2. array[i+1]^2 + array[i+2]^2 = array[i]^2
3. array[i]^2 + array[i+2]^2 = array[i+1]^2

Otherwise, result[i] = 0.

Input Format:
First line: Number of elements N
Next line: N space-separated integers

Output Format:
Return n-2 space-separated integers (or one per line) representing the result array.

Example 1:
Input:
5
3 4 5 12 13

Output:
1 0

Explanation:
- For triplet (3, 4, 5): 3^2 + 4^2 = 9 + 16 = 25 = 5^2 ✓ → result[0] = 1
- For triplet (4, 5, 12): Check all three conditions:
  * 4^2 + 5^2 = 16 + 25 = 41 ≠ 12^2 = 144
  * 5^2 + 12^2 = 25 + 144 = 169 ≠ 4^2 = 16
  * 4^2 + 12^2 = 16 + 144 = 160 ≠ 5^2 = 25
  None satisfied → result[1] = 0

Example 2:
Input:
4
5 12 13 3

Output:
1 0

Explanation:
- For triplet (5, 12, 13): 5^2 + 12^2 = 25 + 144 = 169 = 13^2 ✓ → result[0] = 1
- For triplet (12, 13, 3): Check all three conditions:
  * 12^2 + 13^2 = 144 + 169 = 313 ≠ 3^2 = 9
  * 13^2 + 3^2 = 169 + 9 = 178 ≠ 12^2 = 144
  * 12^2 + 3^2 = 144 + 9 = 153 ≠ 13^2 = 169
  None satisfied → result[1] = 0

Example 3:
Input:
4
4 3 5 6

Output:
1 0

Explanation:
- For triplet (4, 3, 5): Check condition 3: 4^2 + 5^2 = 16 + 25 = 41 ≠ 3^2 = 9
  Actually: 3^2 + 4^2 = 9 + 16 = 25 = 5^2 ✓ → result[0] = 1
- For triplet (3, 5, 6): None of the conditions are satisfied → result[1] = 0`,
    examples: [
      { input: "5\n3 4 5 12 13", output: "1 0" },
      { input: "4\n5 12 13 3", output: "1 0" },
      { input: "4\n4 3 5 6", output: "1 0" },
    ],
    testcases: [
      { id: 1, input: "5\n3 4 5 12 13", expected: "1 0" },
      { id: 2, input: "4\n5 12 13 3", expected: "1 0" },
      { id: 3, input: "4\n4 3 5 6", expected: "1 0" },
      { id: 4, input: "6\n6 8 10 5 12 13", expected: "1 0 1" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read number of elements N\n    # Read the array of integers\n    # For each position i from 0 to n-3:\n    #   Check if triplet (array[i], array[i+1], array[i+2]) satisfies any Pythagorean condition\n    #   Set result[i] = 1 if yes, 0 otherwise\n    # Return the result array\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse array of integers\n    // For each triplet, check all three Pythagorean conditions\n    // Return result array of length n-2\n}`,
    },
  },
  {
    id: 3,
    title: "Card Hand Validation",
    description: `You are provided with a set of cards characterized by suits (+, -, =), values (A, B, C), and counts of these values ranging from 1 to 3. Your goal is to identify a valid hand from the given cards.

A valid hand consists of 3 cards where:
1. All the suits are either the same or all different
2. All the values are either the same or all different
3. All the counts are either the same or all different

Card Format:
Each card is represented as: [suit][value repeated count times]
- Suits: +, -, =
- Values: A, B, C
- Count: 1, 2, or 3 (number of times the value appears)

Examples of valid hands:
- { +AA, +AA, +AA }: Same suit, same value, same count
- { -A, -AA, -AAA }: Same suit, same value, different counts (1, 2, 3)
- { -C, -B, -A }: Same suit, different values, same count
- { +AA, -AA, =AA }: Different suits, same value, same count
- { -A, +BB, =CCC }: Different suits, different values, different counts

Input Format:
A single line containing comma-separated cards (e.g., "+AA, -AA, +AA, -C, -B, +AA, -AAA, -A, =AA")

Output Format:
Output any valid hand of 3 cards from the set, formatted as the three cards separated by spaces or commas.

Example 1:
Input:
+AA, -AA, +AA, -C, -B, +AA, -AAA, -A, =AA

Output:
+AA +AA +AA

Explanation:
Suit: Same [+ + +]
Value: Same [A A A]
Count: Same [2 2 2]

Example 2:
Input:
-A, -AA, -AAA, +BB, =CCC

Output:
-A -AA -AAA

Explanation:
Suit: Same [- - -]
Value: Same [A A A]
Count: Different [1 2 3]`,
    examples: [
      {
        input: "+AA, -AA, +AA, -C, -B, +AA, -AAA, -A, =AA",
        output: "+AA +AA +AA",
      },
      {
        input: "-A, -AA, -AAA, +BB, =CCC",
        output: "-A -AA -AAA",
      },
    ],
    testcases: [
      {
        id: 1,
        input: "+AA, -AA, +AA, -C, -B, +AA, -AAA, -A, =AA",
        expected: "+AA +AA +AA",
      },
      {
        id: 2,
        input: "-A, -AA, -AAA, +BB, =CCC",
        expected: "-A -AA -AAA",
      },
      {
        id: 3,
        input: "-C, -B, -A, +AA, =BB",
        expected: "-C -B -A",
      },
      {
        id: 4,
        input: "+AA, -AA, =AA, +BB, -BB",
        expected: "+AA -AA =AA",
      },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read comma-separated cards from input\n    # Parse each card to extract suit, value, and count\n    # Try all combinations of 3 cards\n    # Check if a combination satisfies all three conditions:\n    #   1. Suits: all same OR all different\n    #   2. Values: all same OR all different\n    #   3. Counts: all same OR all different\n    # Return the first valid hand found\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse comma-separated cards\n    // Extract suit, value, and count for each card\n    // Check all combinations of 3 cards for valid hand\n    // Return first valid hand\n}`,
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
