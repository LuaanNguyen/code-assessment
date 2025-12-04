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
    title: "Count Valid Words from String",
    description: `Given a string and a list of valid letters, count how many words in the string can be formed using the letters in the valid letters list.

Rules:
- Words are split using spaces
- Punctuation and numbers are always considered valid (they don't need to be in the valid letters list)
- Both uppercase and lowercase versions of a letter are valid if the lowercase letter is in the valid letters list
- A word is valid if all its alphabetic characters (ignoring case) are present in the valid letters list

Input Format:
First line: The input string
Second line: The valid letters (as a string of lowercase letters)

Output Format:
Return an integer representing the count of valid words.

Example:
Input:
Hello, I am h2ere!
heloiar

Output:
3

Explanation:
- "Hello," - H, e, l, l, o are all in "heloiar", comma is always valid → Valid
- "I" - I (lowercase 'i') is in "heloiar" → Valid
- "am" - 'a' is in list, but 'm' is NOT in "heloiar" → Invalid
- "h2ere!" - h, e, r, e are all in "heloiar", '2' and '!' are always valid → Valid
Total: 3 valid words`,
    examples: [
      { input: "Hello, I am h2ere!\nheloiar", output: "3" },
      { input: "Test 123 test!\nabc", output: "1" },
      { input: "Hello World\nhelowrld", output: "2" },
    ],
    testcases: [
      { id: 1, input: "Hello, I am h2ere!\nheloiar", expected: "3" },
      { id: 2, input: "Test 123 test!\nabc", expected: "1" },
      { id: 3, input: "Hello World\nhelowrld", expected: "2" },
      { id: 4, input: "a1b2c3 d4e5f6\nabcdef", expected: "2" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read the input string\n    # Read the valid letters string\n    # Split the input string by spaces to get words\n    # For each word:\n    #   Check if all alphabetic characters (case-insensitive) are in valid letters\n    #   Punctuation and digits are always valid\n    # Count and return the number of valid words\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse input string and valid letters\n    // Split string into words\n    // Check each word: all alphabetic chars must be in valid letters (case-insensitive)\n    // Punctuation and digits are always valid\n    // Return count of valid words\n}`,
    },
  },
  {
    id: 3,
    title: "Game Field Matrix Puzzle",
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
        input:
          "16\n3\nhello world\nHow areYou doing\nPlease look and align to center",
        output:
          "******************\n*   hello world  *\n* How areYou doing *\n*  Please look   *\n*   and align    *\n*   to center    *\n******************",
      },
      {
        input: "10\n2\nshort text\nlonger text here",
        output:
          "************\n*  short  *\n*  text   *\n*  longer *\n*  text   *\n*  here   *\n************",
      },
    ],
    testcases: [
      {
        id: 1,
        input:
          "16\n3\nhello world\nHow areYou doing\nPlease look and align to center",
        expected:
          "******************\n*   hello world  *\n* How areYou doing *\n*  Please look   *\n*   and align    *\n*   to center    *\n******************",
      },
      {
        id: 2,
        input: "10\n2\nshort text\nlonger text here",
        expected:
          "************\n*  short  *\n*  text   *\n*  longer *\n*  text   *\n*  here   *\n************",
      },
      {
        id: 3,
        input: "5\n1\na b c",
        expected: "*******\n* a b *\n*  c  *\n*******",
      },
      {
        id: 4,
        input: "20\n1\nThis is a single very long word that exceeds",
        expected:
          "************************\n* This is a single very *\n*      long word       *\n*      that exceeds    *\n************************",
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
        output: "roast\nsmart\nsnast",
      },
      {
        input: "23\nad ae af bd be bf cd ce cf",
        output: "ad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf",
      },
    ],
    testcases: [
      {
        id: 1,
        input: "76278\nroast smart snast tree test",
        expected: "roast\nsmart\nsnast",
      },
      {
        id: 2,
        input: "23\nad ae af bd be bf cd ce cf",
        expected: "ad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf",
      },
      {
        id: 3,
        input: "2\na b c",
        expected: "a\nb\nc",
      },
      {
        id: 4,
        input: "999\nwww wwx wwy wwz",
        expected: "www\nwwx\nwwy\nwwz",
      },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read phone number digits\n    # Read dictionary words\n    # Map digits to letters\n    # Generate all possible letter combinations\n    # Filter by dictionary and return in sorted order\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse phone number and dictionary\n    // Map digits to letters\n    // Generate combinations and filter by dictionary\n    // Return sorted valid words\n}`,
    },
  },
  {
    id: 6,
    title: "Game Field Matrix Puzzle",
    description: `You are given a matrix of integers field of size n × m representing a game field, and a matrix of integers figure of size 3 × 3 representing a figure. Both matrices contain only 0s (free cell) and 1s (occupied cell).

Your task is to drop the figure onto the field from a position at the top such that it descends straight down until it reaches the bottom of the field or lands on a cell that is occupied. Your goal is to find a dropping position that results in at least one fully occupied row. The dropping position corresponds to the column index of the cell in the field that aligns with the top-left corner of the figure.

If multiple positions satisfy the condition, any one of them is an acceptable output. If no such positions exist, return -1.

Note: The 3 × 3 figure matrix must be entirely inside the game field during the drop, even if parts of the figure are unoccupied.

Input Format:
First line: n m (dimensions of field)
Next n lines: Each line has m space-separated integers (0 or 1) representing a row of the field
Next 3 lines: Each line has 3 space-separated integers (0 or 1) representing a row of the figure

Output Format:
Return an integer: the column index (0-indexed) where the top-left corner of the figure should be dropped, or -1 if no valid position exists.

Example:
Input:
5 5
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
1 1 0 1 0
1 0 1 0 1
1 1 1
1 0 1
1 0 1

Output:
2

Explanation:
- Field is 5×5
- Figure is 3×3
- The figure can be dropped at column 2 (0-indexed)
- When dropped, it will fall and land, potentially creating a full row
- Column 2 is a valid position that results in at least one fully occupied row`,
    examples: [
      {
        input:
          "5 5\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n1 1 0 1 0\n1 0 1 0 1\n1 1 1\n1 0 1\n1 0 1",
        output: "2",
      },
    ],
    testcases: [
      {
        id: 1,
        input:
          "5 5\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n1 1 0 1 0\n1 0 1 0 1\n1 1 1\n1 0 1\n1 0 1",
        expected: "2",
      },
      {
        id: 2,
        input: "4 4\n0 0 0 0\n0 0 0 0\n1 1 1 1\n0 0 0 0\n1 1 1\n1 1 1\n1 1 1",
        expected: "0",
      },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read field dimensions n, m\n    # Read n lines for the field matrix\n    # Read 3 lines for the figure matrix\n    # For each possible dropping column position:\n    #   Simulate dropping the figure from top\n    #   Check if it creates at least one fully occupied row\n    # Return the first valid column position, or -1\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Parse field and figure matrices\n    // Try each possible dropping position\n    // Simulate the drop and check for full rows\n    // Return valid position or -1\n}`,
    },
  },
  // Q1 Problems - String manipulation, basic math, simple hashmap, counting frequency
  {
    id: 7,
    title: "Character Frequency Counter",
    description: `Given a string, count the frequency of each character and return the character that appears most frequently. If there's a tie, return the lexicographically smallest character.
    
Input Format:
A single line containing a string.

Output Format:
Return a single character (the most frequent, or lexicographically smallest if tied).

Example:
Input: "hello"
Output: "l"

Explanation:
- 'h': 1, 'e': 1, 'l': 2, 'o': 1
- 'l' appears most frequently`,
    examples: [
      { input: "hello", output: "l" },
      { input: "aabbcc", output: "a" },
    ],
    testcases: [
      { id: 1, input: "hello", expected: "l" },
      { id: 2, input: "aabbcc", expected: "a" },
      { id: 3, input: "programming", expected: "g" },
      { id: 4, input: "test", expected: "t" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read string from input\n    # Count frequency of each character\n    # Return most frequent (or lexicographically smallest if tie)\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Count character frequencies\n    // Return most frequent character\n}`,
    },
  },
  {
    id: 8,
    title: "Palindrome Checker",
    description: `Given a string, determine if it can be rearranged to form a palindrome. Return "YES" if possible, "NO" otherwise.

A string can form a palindrome if at most one character has an odd frequency.

Input Format:
A single line containing a string.

Output Format:
Return "YES" or "NO".

Example:
Input: "aabb"
Output: "YES"

Explanation:
Can be rearranged to "abba" which is a palindrome.

Input: "abc"
Output: "NO"

Explanation:
Cannot form a palindrome (all characters have odd frequency).`,
    examples: [
      { input: "aabb", output: "YES" },
      { input: "abc", output: "NO" },
    ],
    testcases: [
      { id: 1, input: "aabb", expected: "YES" },
      { id: 2, input: "abc", expected: "NO" },
      { id: 3, input: "racecar", expected: "YES" },
      { id: 4, input: "hello", expected: "NO" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read string from input\n    # Count character frequencies\n    # Check if at most one character has odd frequency\n    # Return "YES" or "NO"\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Check if string can form palindrome\n    // Return "YES" or "NO"\n}`,
    },
  },
  {
    id: 9,
    title: "String Compression",
    description: `Given a string, compress it by replacing consecutive duplicate characters with the character followed by its count. If the count is 1, don't include it.

Input Format:
A single line containing a string.

Output Format:
Return the compressed string.

Example:
Input: "aaabbbcc"
Output: "a3b3c2"

Input: "abcd"
Output: "abcd"

Explanation:
- "aaabbbcc" → "a3b3c2" (3 a's, 3 b's, 2 c's)
- "abcd" → "abcd" (all counts are 1, so no numbers)`,
    examples: [
      { input: "aaabbbcc", output: "a3b3c2" },
      { input: "abcd", output: "abcd" },
    ],
    testcases: [
      { id: 1, input: "aaabbbcc", expected: "a3b3c2" },
      { id: 2, input: "abcd", expected: "abcd" },
      { id: 3, input: "aabbcc", expected: "a2b2c2" },
      { id: 4, input: "aaaa", expected: "a4" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read string from input\n    # Compress consecutive duplicates\n    # Return compressed string\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Compress string with run-length encoding\n    // Return compressed string\n}`,
    },
  },
  // Q2 Problems - Sliding window, stack/queue, two pointers, hashing with logic twist
  {
    id: 10,
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string, find the length of the longest substring without repeating characters.

Input Format:
A single line containing a string.

Output Format:
Return an integer representing the length of the longest substring without repeating characters.

Example:
Input: "abcabcbb"
Output: 3

Explanation:
The longest substring without repeating characters is "abc" with length 3.

Input: "bbbbb"
Output: 1

Explanation:
The longest substring is "b" with length 1.`,
    examples: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
    ],
    testcases: [
      { id: 1, input: "abcabcbb", expected: "3" },
      { id: 2, input: "bbbbb", expected: "1" },
      { id: 3, input: "pwwkew", expected: "3" },
      { id: 4, input: "abcdef", expected: "6" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read string from input\n    # Use sliding window technique\n    # Track characters in current window\n    # Return length of longest substring without repeats\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use sliding window with hashmap\n    // Return longest substring length\n}`,
    },
  },
  {
    id: 11,
    title: "Valid Parentheses",
    description: `Given a string containing only '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Input Format:
A single line containing a string of brackets.

Output Format:
Return "YES" if valid, "NO" otherwise.

Example:
Input: "()"
Output: "YES"

Input: "()[]{}"
Output: "YES"

Input: "(]"
Output: "NO"

Input: "([)]"
Output: "NO"`,
    examples: [
      { input: "()", output: "YES" },
      { input: "()[]{}", output: "YES" },
      { input: "(]", output: "NO" },
    ],
    testcases: [
      { id: 1, input: "()", expected: "YES" },
      { id: 2, input: "()[]{}", expected: "YES" },
      { id: 3, input: "(]", expected: "NO" },
      { id: 4, input: "([)]", expected: "NO" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read bracket string from input\n    # Use stack to track opening brackets\n    # Check if all brackets are properly closed\n    # Return "YES" or "NO"\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use stack to validate parentheses\n    // Return "YES" or "NO"\n}`,
    },
  },
  {
    id: 12,
    title: "Two Sum",
    description: `Given an array of integers and a target sum, find two numbers that add up to the target. Return the indices of these two numbers (0-indexed). You may assume that each input has exactly one solution, and you may not use the same element twice.

Input Format:
First line: target sum (integer)
Second line: n (number of elements)
Third line: n space-separated integers

Output Format:
Return two space-separated integers representing the indices.

Example:
Input:
9
4
2 7 11 15

Output:
0 1

Explanation:
nums[0] + nums[1] = 2 + 7 = 9`,
    examples: [
      { input: "9\n4\n2 7 11 15", output: "0 1" },
      { input: "6\n3\n3 2 4", output: "1 2" },
    ],
    testcases: [
      { id: 1, input: "9\n4\n2 7 11 15", expected: "0 1" },
      { id: 2, input: "6\n3\n3 2 4", expected: "1 2" },
      { id: 3, input: "6\n3\n3 3", expected: "0 1" },
      { id: 4, input: "0\n4\n-1 0 1 2", expected: "1 2" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read target sum\n    # Read array of integers\n    # Use hashmap to find two numbers that sum to target\n    # Return their indices\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use hashmap for O(n) solution\n    // Return indices of two numbers\n}`,
    },
  },
  {
    id: 13,
    title: "Maximum Subarray Sum",
    description: `Given an array of integers, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Input Format:
First line: n (number of elements)
Second line: n space-separated integers

Output Format:
Return the maximum subarray sum.

Example:
Input:
5
-2 1 -3 4 -1 2 1 -5 4

Output:
6

Explanation:
The subarray [4, -1, 2, 1] has the largest sum = 6.`,
    examples: [
      { input: "5\n-2 1 -3 4 -1 2 1 -5 4", output: "6" },
      { input: "1\n1", output: "1" },
    ],
    testcases: [
      { id: 1, input: "5\n-2 1 -3 4 -1 2 1 -5 4", expected: "6" },
      { id: 2, input: "1\n1", expected: "1" },
      { id: 3, input: "3\n-1 -2 -3", expected: "-1" },
      { id: 4, input: "4\n1 2 3 4", expected: "10" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read array of integers\n    # Use Kadane's algorithm (dynamic programming)\n    # Track maximum sum ending at each position\n    # Return maximum subarray sum\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use Kadane's algorithm\n    // Return maximum subarray sum\n}`,
    },
  },
  // Q3 Problems - Graph BFS/DFS, greedy, DP easy variant, sorting + scanning
  {
    id: 14,
    title: "Meeting Rooms",
    description: `Given an array of meeting time intervals where intervals[i] = [start, end], determine if a person could attend all meetings.

Input Format:
First line: n (number of meetings)
Next n lines: Each line has two space-separated integers (start end)

Output Format:
Return "YES" if all meetings can be attended, "NO" otherwise.

Example:
Input:
3
0 30
5 10
15 20

Output:
NO

Explanation:
Meeting [0,30] and [5,10] overlap, so cannot attend both.

Input:
2
7 10
2 4

Output:
YES

Explanation:
No overlaps, can attend both.`,
    examples: [
      { input: "3\n0 30\n5 10\n15 20", output: "NO" },
      { input: "2\n7 10\n2 4", output: "YES" },
    ],
    testcases: [
      { id: 1, input: "3\n0 30\n5 10\n15 20", expected: "NO" },
      { id: 2, input: "2\n7 10\n2 4", expected: "YES" },
      { id: 3, input: "2\n0 5\n5 10", expected: "YES" },
      { id: 4, input: "3\n1 3\n2 4\n3 5", expected: "NO" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read number of meetings\n    # Read meeting intervals\n    # Sort by start time\n    # Check if any adjacent meetings overlap\n    # Return "YES" or "NO"\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Sort intervals and check for overlaps\n    // Return "YES" or "NO"\n}`,
    },
  },
  {
    id: 15,
    title: "Coin Change",
    description: `You are given coins of different denominations and a total amount. Find the minimum number of coins needed to make that amount. If it's not possible, return -1.

You may assume you have an infinite number of each coin.

Input Format:
First line: amount (target amount)
Second line: n (number of coin types)
Third line: n space-separated integers (coin denominations)

Output Format:
Return the minimum number of coins needed, or -1 if impossible.

Example:
Input:
11
3
1 2 5

Output:
3

Explanation:
11 = 5 + 5 + 1 (3 coins)`,
    examples: [
      { input: "11\n3\n1 2 5", output: "3" },
      { input: "3\n2\n2", output: "-1" },
    ],
    testcases: [
      { id: 1, input: "11\n3\n1 2 5", expected: "3" },
      { id: 2, input: "3\n2\n2", expected: "-1" },
      { id: 3, input: "0\n1\n1", expected: "0" },
      { id: 4, input: "6\n3\n1 3 4", expected: "2" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read target amount and coin denominations\n    # Use dynamic programming\n    # dp[i] = minimum coins needed for amount i\n    # Return minimum coins or -1\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use DP to find minimum coins\n    // Return minimum coins or -1\n}`,
    },
  },
  {
    id: 16,
    title: "BFS Shortest Path",
    description: `Given a 2D grid where 0 represents a free cell and 1 represents a wall, find the shortest path from top-left (0,0) to bottom-right (n-1, m-1). You can only move up, down, left, or right.

Input Format:
First line: n m (grid dimensions)
Next n lines: Each line has m space-separated integers (0 or 1)

Output Format:
Return the length of the shortest path, or -1 if no path exists.

Example:
Input:
3 3
0 0 0
0 1 0
0 0 0

Output:
4

Explanation:
Path: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Length: 4 steps`,
    examples: [
      { input: "3 3\n0 0 0\n0 1 0\n0 0 0", output: "4" },
      { input: "2 2\n0 1\n1 0", output: "-1" },
    ],
    testcases: [
      { id: 1, input: "3 3\n0 0 0\n0 1 0\n0 0 0", expected: "4" },
      { id: 2, input: "2 2\n0 1\n1 0", expected: "-1" },
      { id: 3, input: "2 2\n0 0\n0 0", expected: "2" },
      { id: 4, input: "3 3\n0 0 0\n1 1 0\n0 0 0", expected: "6" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read grid dimensions and grid\n    # Use BFS to find shortest path\n    # Track visited cells and distance\n    # Return shortest path length or -1\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use BFS to find shortest path in grid\n    // Return path length or -1\n}`,
    },
  },
  // Q4 Problems - Hard DP, graph shortest path, backtracking with pruning, multiple constraints
  {
    id: 17,
    title: "Word Break",
    description: `Given a string and a dictionary of words, determine if the string can be segmented into a space-separated sequence of dictionary words.

Input Format:
First line: The string to check
Second line: n (number of words in dictionary)
Next n lines: Dictionary words (one per line)

Output Format:
Return "YES" if the string can be segmented, "NO" otherwise.

Example:
Input:
leetcode
2
leet
code

Output:
YES

Explanation:
"leetcode" can be segmented as "leet code".

Input:
applepenapple
2
apple
pen

Output:
YES

Explanation:
"applepenapple" can be segmented as "apple pen apple".`,
    examples: [
      { input: "leetcode\n2\nleet\ncode", output: "YES" },
      { input: "applepenapple\n2\napple\npen", output: "YES" },
    ],
    testcases: [
      { id: 1, input: "leetcode\n2\nleet\ncode", expected: "YES" },
      { id: 2, input: "applepenapple\n2\napple\npen", expected: "YES" },
      { id: 3, input: "catsandog\n4\ncats\ndog\nsand\nand", expected: "NO" },
      { id: 4, input: "a\n1\na", expected: "YES" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read string and dictionary\n    # Use dynamic programming\n    # dp[i] = True if s[0:i] can be segmented\n    # Return "YES" or "NO"\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use DP to check if string can be segmented\n    // Return "YES" or "NO"\n}`,
    },
  },
  {
    id: 18,
    title: "N-Queens Count",
    description: `Given an integer n, return the number of distinct solutions to the n-queens puzzle.

The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Input Format:
A single integer n.

Output Format:
Return the number of distinct solutions.

Example:
Input:
4

Output:
2

Explanation:
There are 2 distinct solutions for 4-queens problem.`,
    examples: [
      { input: "4", output: "2" },
      { input: "1", output: "1" },
    ],
    testcases: [
      { id: 1, input: "4", expected: "2" },
      { id: 2, input: "1", expected: "1" },
      { id: 3, input: "2", expected: "0" },
      { id: 4, input: "3", expected: "0" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read n\n    # Use backtracking to place queens\n    # Check for conflicts (same row, column, diagonal)\n    # Count valid solutions\n    # Return count\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use backtracking to solve n-queens\n    // Return number of solutions\n}`,
    },
  },
  {
    id: 19,
    title: "Dijkstra Shortest Path",
    description: `Given a weighted graph represented as an adjacency list, find the shortest path from node 0 to all other nodes using Dijkstra's algorithm. Return the shortest distance to the last node (node n-1).

Input Format:
First line: n m (number of nodes and edges)
Next m lines: Each line has u v w (edge from u to v with weight w)

Output Format:
Return the shortest distance from node 0 to node n-1, or -1 if unreachable.

Example:
Input:
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1

Output:
4

Explanation:
Shortest path: 0 → 1 → 2 → 3 with total weight 1 + 2 + 1 = 4`,
    examples: [
      { input: "4 5\n0 1 1\n0 2 4\n1 2 2\n1 3 5\n2 3 1", output: "4" },
      { input: "2 1\n0 1 5", output: "5" },
    ],
    testcases: [
      { id: 1, input: "4 5\n0 1 1\n0 2 4\n1 2 2\n1 3 5\n2 3 1", expected: "4" },
      { id: 2, input: "2 1\n0 1 5", expected: "5" },
      { id: 3, input: "3 2\n0 1 1\n1 2 2", expected: "3" },
      { id: 4, input: "2 0", expected: "-1" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read graph (nodes, edges, weights)\n    # Use Dijkstra's algorithm with priority queue\n    # Find shortest path from node 0 to node n-1\n    # Return shortest distance or -1\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Implement Dijkstra's algorithm\n    // Return shortest distance to last node\n}`,
    },
  },
  {
    id: 20,
    title: "Longest Increasing Subsequence",
    description: `Given an array of integers, find the length of the longest strictly increasing subsequence.

Input Format:
First line: n (number of elements)
Second line: n space-separated integers

Output Format:
Return the length of the longest increasing subsequence.

Example:
Input:
8
10 9 2 5 3 7 101 18

Output:
4

Explanation:
The longest increasing subsequence is [2, 3, 7, 18] with length 4.`,
    examples: [
      { input: "8\n10 9 2 5 3 7 101 18", output: "4" },
      { input: "4\n0 1 0 3 2 3", output: "4" },
    ],
    testcases: [
      { id: 1, input: "8\n10 9 2 5 3 7 101 18", expected: "4" },
      { id: 2, input: "6\n0 1 0 3 2 3", expected: "4" },
      { id: 3, input: "1\n1", expected: "1" },
      { id: 4, input: "5\n7 7 7 7 7", expected: "1" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read array of integers\n    # Use dynamic programming or binary search approach\n    # Track longest increasing subsequence\n    # Return length\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Find longest increasing subsequence\n    // Return length\n}`,
    },
  },
  // More Q1 Problems
  {
    id: 21,
    title: "Anagram Groups",
    description: `Given an array of strings, group the anagrams together. Return the number of groups.

Two strings are anagrams if they contain the same characters in different order.

Input Format:
First line: n (number of strings)
Next n lines: One string per line

Output Format:
Return the number of anagram groups.

Example:
Input:
6
eat
tea
tan
ate
nat
bat

Output:
3

Explanation:
Groups: ["eat","tea","ate"], ["tan","nat"], ["bat"]`,
    examples: [{ input: "6\neat\ntea\ntan\nate\nnat\nbat", output: "3" }],
    testcases: [
      { id: 1, input: "6\neat\ntea\ntan\nate\nnat\nbat", expected: "3" },
      { id: 2, input: "1\na", expected: "1" },
      { id: 3, input: "2\nab\nba", expected: "1" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read strings\n    # Group anagrams using sorted string as key\n    # Return number of groups\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Group anagrams\n    // Return number of groups\n}`,
    },
  },
  {
    id: 22,
    title: "First Unique Character",
    description: `Given a string, find the first non-repeating character and return its index. If it doesn't exist, return -1.

Input Format:
A single line containing a string.

Output Format:
Return the index of the first unique character, or -1.

Example:
Input: "leetcode"
Output: 0

Explanation:
'l' is the first character that doesn't repeat.

Input: "loveleetcode"
Output: 2

Explanation:
'v' is the first unique character.`,
    examples: [
      { input: "leetcode", output: "0" },
      { input: "loveleetcode", output: "2" },
    ],
    testcases: [
      { id: 1, input: "leetcode", expected: "0" },
      { id: 2, input: "loveleetcode", expected: "2" },
      { id: 3, input: "aabb", expected: "-1" },
      { id: 4, input: "abc", expected: "0" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read string\n    # Count character frequencies\n    # Find first character with count 1\n    # Return index or -1\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Find first unique character\n    // Return index or -1\n}`,
    },
  },
  {
    id: 23,
    title: "Isomorphic Strings",
    description: `Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with another character while preserving the order. No two characters may map to the same character, but a character may map to itself.

Input Format:
First line: string s
Second line: string t

Output Format:
Return "YES" if isomorphic, "NO" otherwise.

Example:
Input:
egg
add

Output:
YES

Explanation:
e → a, g → d

Input:
foo
bar

Output:
NO

Explanation:
o cannot map to both a and r.`,
    examples: [
      { input: "egg\nadd", output: "YES" },
      { input: "foo\nbar", output: "NO" },
    ],
    testcases: [
      { id: 1, input: "egg\nadd", expected: "YES" },
      { id: 2, input: "foo\nbar", expected: "NO" },
      { id: 3, input: "paper\ntitle", expected: "YES" },
      { id: 4, input: "ab\naa", expected: "NO" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read two strings\n    # Check if they are isomorphic\n    # Use two hashmaps to track mappings\n    # Return "YES" or "NO"\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Check isomorphic strings\n    // Return "YES" or "NO"\n}`,
    },
  },
  // More Q2 Problems
  {
    id: 24,
    title: "Container With Most Water",
    description: `Given n non-negative integers representing heights, find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum area of water that can be contained.

Input Format:
First line: n (number of heights)
Second line: n space-separated integers (heights)

Output Format:
Return the maximum area.

Example:
Input:
9
1 8 6 2 5 4 8 3 7

Output:
49

Explanation:
The maximum area is between indices 1 and 8: min(8,7) * (8-1) = 7 * 7 = 49`,
    examples: [
      { input: "9\n1 8 6 2 5 4 8 3 7", output: "49" },
      { input: "2\n1 1", output: "1" },
    ],
    testcases: [
      { id: 1, input: "9\n1 8 6 2 5 4 8 3 7", expected: "49" },
      { id: 2, input: "2\n1 1", expected: "1" },
      { id: 3, input: "4\n1 2 1", expected: "2" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read heights array\n    # Use two pointers (left and right)\n    # Calculate area and move pointer with smaller height\n    # Return maximum area\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use two pointers technique\n    // Return maximum water area\n}`,
    },
  },
  {
    id: 25,
    title: "Minimum Window Substring",
    description: `Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such window, return an empty string.

Input Format:
First line: string s
Second line: string t

Output Format:
Return the minimum window substring, or empty string.

Example:
Input:
ADOBECODEBANC
ABC

Output:
BANC

Explanation:
The minimum window substring "BANC" contains 'A', 'B', and 'C' from string t.`,
    examples: [
      { input: "ADOBECODEBANC\nABC", output: "BANC" },
      { input: "a\na", output: "a" },
    ],
    testcases: [
      { id: 1, input: "ADOBECODEBANC\nABC", expected: "BANC" },
      { id: 2, input: "a\na", expected: "a" },
      { id: 3, input: "a\nb", expected: "" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read strings s and t\n    # Use sliding window technique\n    # Expand right until all chars in t are covered\n    # Shrink left to find minimum window\n    # Return minimum window substring\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use sliding window\n    // Return minimum window substring\n}`,
    },
  },
  {
    id: 26,
    title: "Next Greater Element",
    description: `Given an array of integers, for each element find the next greater element. The next greater element of an element is the first greater element to its right. If no such element exists, return -1 for that element.

Input Format:
First line: n (number of elements)
Second line: n space-separated integers

Output Format:
Return n space-separated integers representing the next greater element for each position.

Example:
Input:
4
4 5 2 25

Output:
5 25 25 -1

Explanation:
- For 4, next greater is 5
- For 5, next greater is 25
- For 2, next greater is 25
- For 25, no greater element exists`,
    examples: [
      { input: "4\n4 5 2 25", output: "5 25 25 -1" },
      { input: "3\n1 2 3", output: "2 3 -1" },
    ],
    testcases: [
      { id: 1, input: "4\n4 5 2 25", expected: "5 25 25 -1" },
      { id: 2, input: "3\n1 2 3", expected: "2 3 -1" },
      { id: 3, input: "3\n3 2 1", expected: "-1 -1 -1" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read array\n    # Use stack to find next greater element\n    # Process from right to left or use monotonic stack\n    # Return array of next greater elements\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use stack to find next greater element\n    // Return result array\n}`,
    },
  },
  // More Q3 Problems
  {
    id: 27,
    title: "Merge Intervals",
    description: `Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Input Format:
First line: n (number of intervals)
Next n lines: Each line has two space-separated integers (start end)

Output Format:
Return merged intervals, one per line, each with two space-separated integers.

Example:
Input:
4
1 3
2 6
8 10
15 18

Output:
1 6
8 10
15 18

Explanation:
Intervals [1,3] and [2,6] overlap, merge into [1,6].`,
    examples: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", output: "1 6\n8 10\n15 18" },
      { input: "2\n1 4\n4 5", output: "1 5" },
    ],
    testcases: [
      {
        id: 1,
        input: "4\n1 3\n2 6\n8 10\n15 18",
        expected: "1 6\n8 10\n15 18",
      },
      { id: 2, input: "2\n1 4\n4 5", expected: "1 5" },
      { id: 3, input: "1\n1 4", expected: "1 4" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read intervals\n    # Sort by start time\n    # Merge overlapping intervals\n    # Return merged intervals\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Sort and merge intervals\n    // Return merged intervals\n}`,
    },
  },
  {
    id: 28,
    title: "Course Schedule",
    description: `There are a total of n courses you have to take. Some courses have prerequisites. Given the total number of courses and a list of prerequisite pairs, determine if you can finish all courses.

Input Format:
First line: n (number of courses)
Second line: m (number of prerequisites)
Next m lines: Each line has two integers (prerequisite course, course)

Output Format:
Return "YES" if you can finish all courses, "NO" otherwise.

Example:
Input:
2
2
1 0
0 1

Output:
NO

Explanation:
There is a cycle: course 0 requires course 1, and course 1 requires course 0.

Input:
2
1
1 0

Output:
YES

Explanation:
You can take course 1 first, then course 0.`,
    examples: [
      { input: "2\n2\n1 0\n0 1", output: "NO" },
      { input: "2\n1\n1 0", output: "YES" },
    ],
    testcases: [
      { id: 1, input: "2\n2\n1 0\n0 1", expected: "NO" },
      { id: 2, input: "2\n1\n1 0", expected: "YES" },
      { id: 3, input: "3\n3\n0 1\n1 2\n2 0", expected: "NO" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read courses and prerequisites\n    # Build graph and check for cycles using DFS or topological sort\n    # Return "YES" if no cycle, "NO" otherwise\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Check for cycles in directed graph\n    // Return "YES" or "NO"\n}`,
    },
  },
  {
    id: 29,
    title: "House Robber",
    description: `You are a robber planning to rob houses along a street. Each house has a certain amount of money. The only constraint is that adjacent houses have security systems connected, so you cannot rob two adjacent houses.

Given an array representing the amount of money in each house, determine the maximum amount of money you can rob.

Input Format:
First line: n (number of houses)
Second line: n space-separated integers (money in each house)

Output Format:
Return the maximum amount of money you can rob.

Example:
Input:
4
2 7 9 3

Output:
11

Explanation:
Rob house 0 (money = 2) and house 2 (money = 9). Total = 2 + 9 = 11.`,
    examples: [
      { input: "4\n2 7 9 3", output: "11" },
      { input: "3\n1 2 3", output: "4" },
    ],
    testcases: [
      { id: 1, input: "4\n2 7 9 3", expected: "11" },
      { id: 2, input: "3\n1 2 3", expected: "4" },
      { id: 3, input: "2\n2 1", expected: "2" },
      { id: 4, input: "1\n1", expected: "1" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read array of house values\n    # Use dynamic programming\n    # dp[i] = max money robbing up to house i\n    # Return maximum amount\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use DP to find maximum money\n    // Return maximum amount\n}`,
    },
  },
  // More Q4 Problems
  {
    id: 30,
    title: "Edit Distance",
    description: `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

Input Format:
First line: word1
Second line: word2

Output Format:
Return the minimum edit distance.

Example:
Input:
horse
ros

Output:
3

Explanation:
horse → rorse (replace 'h' with 'r')
rorse → rose (remove 'r')
rose → ros (remove 'e')`,
    examples: [
      { input: "horse\nros", output: "3" },
      { input: "intention\nexecution", output: "5" },
    ],
    testcases: [
      { id: 1, input: "horse\nros", expected: "3" },
      { id: 2, input: "intention\nexecution", expected: "5" },
      { id: 3, input: "a\nb", expected: "1" },
      { id: 4, input: "abc\nabc", expected: "0" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read two strings\n    # Use dynamic programming\n    # dp[i][j] = edit distance between word1[0:i] and word2[0:j]\n    # Return minimum edit distance\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use DP for edit distance\n    // Return minimum operations\n}`,
    },
  },
  {
    id: 31,
    title: "Sudoku Solver",
    description: `Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules:
1. Each of the digits 1-9 must occur exactly once in each row.
2. Each of the digits 1-9 must occur exactly once in each column.
3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes.

Empty cells are represented by 0.

Input Format:
9 lines, each with 9 space-separated integers (0-9)

Output Format:
Return "YES" if solvable, "NO" otherwise.

Example:
Input:
5 3 0 0 7 0 0 0 0
6 0 0 1 9 5 0 0 0
0 9 8 0 0 0 0 6 0
8 0 0 0 6 0 0 0 3
4 0 0 8 0 3 0 0 1
7 0 0 0 2 0 0 0 6
0 6 0 0 0 0 2 8 0
0 0 0 4 1 9 0 0 5
0 0 0 0 8 0 0 7 9

Output:
YES

Explanation:
This is a valid solvable Sudoku puzzle.`,
    examples: [
      {
        input:
          "5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9",
        output: "YES",
      },
    ],
    testcases: [
      {
        id: 1,
        input:
          "5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9",
        expected: "YES",
      },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read 9x9 Sudoku grid\n    # Use backtracking to solve\n    # Check row, column, and 3x3 box constraints\n    # Return "YES" if solvable, "NO" otherwise\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use backtracking to solve Sudoku\n    // Return "YES" or "NO"\n}`,
    },
  },
  {
    id: 32,
    title: "Number of Islands",
    description: `Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Input Format:
First line: n m (grid dimensions)
Next n lines: Each line has m space-separated characters ('0' or '1')

Output Format:
Return the number of islands.

Example:
Input:
4 5
1 1 1 1 0
1 1 0 1 0
1 1 0 0 0
0 0 0 0 0

Output:
1

Explanation:
There is one connected island.`,
    examples: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1" },
      { input: "3 3\n1 1 0\n0 1 0\n0 0 1", output: "2" },
    ],
    testcases: [
      {
        id: 1,
        input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
        expected: "1",
      },
      { id: 2, input: "3 3\n1 1 0\n0 1 0\n0 0 1", expected: "2" },
      { id: 3, input: "2 2\n1 0\n0 1", expected: "2" },
    ],
    functionSignature: "def solve():",
    starterCode: {
      python: `def solve():\n    # Read grid\n    # Use DFS or BFS to mark connected components\n    # Count number of islands\n    # Return count\n    pass`,
      javascript: `function solve() {\n    // Input is available via global.__input__\n    // Use DFS/BFS to count islands\n    // Return number of islands\n}`,
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
