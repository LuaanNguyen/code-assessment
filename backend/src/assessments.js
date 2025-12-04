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

