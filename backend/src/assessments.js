// Multiple GCA assessment versions - each with 4 problems (Q1, Q2, Q3, Q4)

export const ASSESSMENT_VERSIONS = [
  {
    id: 1,
    name: "GCA Version 1",
    problemIds: [1, 2, 3, 4], // Q1: Robot Movement, Q2: Count Valid Words, Q3: Card Hand Validation, Q4: Codewriting
  },
  {
    id: 2,
    name: "GCA Version 2",
    problemIds: [1, 5, 3, 4], // Q1: Robot Movement, Q2: Phone Number to Words, Q3: Card Hand Validation, Q4: Codewriting
  },
  {
    id: 3,
    name: "GCA Version 3",
    problemIds: [1, 2, 6, 4], // Q1: Robot Movement, Q2: Count Valid Words, Q3: Game Field Matrix Puzzle, Q4: Codewriting
  },
  {
    id: 4,
    name: "GCA Version 4",
    problemIds: [1, 5, 6, 4], // Q1: Robot Movement, Q2: Phone Number to Words, Q3: Game Field Matrix Puzzle, Q4: Codewriting
  },
  // New assessment versions with CodeSignal-style problems
  {
    id: 5,
    name: "GCA Version 5",
    problemIds: [7, 10, 14, 17], // Q1: Character Frequency Counter, Q2: Longest Substring Without Repeating, Q3: Meeting Rooms, Q4: Word Break
  },
  {
    id: 6,
    name: "GCA Version 6",
    problemIds: [8, 11, 15, 18], // Q1: Palindrome Checker, Q2: Valid Parentheses, Q3: Coin Change, Q4: N-Queens Count
  },
  {
    id: 7,
    name: "GCA Version 7",
    problemIds: [9, 12, 16, 19], // Q1: String Compression, Q2: Two Sum, Q3: BFS Shortest Path, Q4: Dijkstra Shortest Path
  },
  {
    id: 8,
    name: "GCA Version 8",
    problemIds: [21, 13, 27, 20], // Q1: Anagram Groups, Q2: Maximum Subarray Sum, Q3: Merge Intervals, Q4: Longest Increasing Subsequence
  },
  {
    id: 9,
    name: "GCA Version 9",
    problemIds: [22, 24, 28, 30], // Q1: First Unique Character, Q2: Container With Most Water, Q3: Course Schedule, Q4: Edit Distance
  },
  {
    id: 10,
    name: "GCA Version 10",
    problemIds: [23, 25, 29, 32], // Q1: Isomorphic Strings, Q2: Minimum Window Substring, Q3: House Robber, Q4: Number of Islands
  },
  {
    id: 11,
    name: "GCA Version 11",
    problemIds: [7, 26, 14, 17], // Q1: Character Frequency Counter, Q2: Next Greater Element, Q3: Meeting Rooms, Q4: Word Break
  },
  {
    id: 12,
    name: "GCA Version 12",
    problemIds: [8, 10, 15, 19], // Q1: Palindrome Checker, Q2: Longest Substring Without Repeating, Q3: Coin Change, Q4: Dijkstra Shortest Path
  },
];

export const ASSESSMENT_CONFIG = {
  totalProblems: 4,
  timeLimit: 70 * 60 * 1000, // 70 minutes in milliseconds
};

/**
 * Get assessment version by ID
 */
export function getAssessmentVersion(id) {
  return ASSESSMENT_VERSIONS.find(v => v.id === parseInt(id));
}

/**
 * Get all assessment versions
 */
export function getAllAssessmentVersions() {
  return ASSESSMENT_VERSIONS.map(v => ({
    id: v.id,
    name: v.name,
  }));
}

