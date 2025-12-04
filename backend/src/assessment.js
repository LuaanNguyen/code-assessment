// Assessment configuration and scoring logic

export const ASSESSMENT_CONFIG = {
  totalProblems: 4,
  timeLimit: 70 * 60 * 1000, // 70 minutes in milliseconds
  problemIds: [1, 2, 3, 4], // IDs of problems in the assessment
  difficulties: ['Easy', 'Easy-Medium', 'Medium', 'Medium-Hard'], // Difficulty levels
};

/**
 * Calculate score for a problem based on testcase results
 */
export function calculateProblemScore(testResults) {
  if (!testResults || testResults.length === 0) {
    return 0;
  }

  const passed = testResults.filter((t) => t.passed).length;
  const total = testResults.length;
  
  // Score is percentage of testcases passed
  return Math.round((passed / total) * 100);
}

/**
 * Calculate total assessment score
 */
export function calculateTotalScore(problemScores) {
  if (!problemScores || problemScores.length === 0) {
    return 0;
  }

  const total = problemScores.reduce((sum, score) => sum + score, 0);
  const average = total / problemScores.length;
  
  return Math.round(average);
}

/**
 * Get assessment status
 */
export function getAssessmentStatus(assessment) {
  if (!assessment) {
    return 'not_started';
  }

  if (assessment.completed) {
    return 'completed';
  }

  if (assessment.timeRemaining <= 0) {
    return 'time_expired';
  }

  return 'in_progress';
}

