import { useState, useEffect, useCallback } from 'react';
import type { AssessmentState, ExecutionResult } from '../types';

const ASSESSMENT_STORAGE_KEY = 'assessment_state';
const TIME_LIMIT = 70 * 60 * 1000; // 70 minutes

export interface AssessmentVersion {
  id: number;
  name: string;
  problems: Array<{
    id: number;
    title: string;
    description: string;
    examples: Array<{ input: string; output: string }>;
    functionSignature: string;
    starterCode?: {
      python?: string;
      javascript?: string;
    };
    testcases: Array<{ id: number; input: string; expected: string }>;
  }>;
}

export type { AssessmentVersion };

export function useAssessment() {
  const [assessment, setAssessment] = useState<AssessmentState | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [assessmentVersion, setAssessmentVersion] = useState<AssessmentVersion | null>(null);

  // Load assessment from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const elapsed = now - parsed.startTime;
        const timeRemaining = Math.max(0, TIME_LIMIT - elapsed);

        if (timeRemaining > 0 && !parsed.completed && parsed.versionId) {
          // Load the assessment version
          fetch(`/api/assessments/${parsed.versionId}`)
            .then(res => res.json())
            .then(version => {
              setAssessmentVersion(version);
              setAssessment({
                ...parsed,
                timeRemaining,
              });
              setIsActive(true);
            })
            .catch(e => {
              console.error('Failed to load assessment version:', e);
              localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
            });
        } else {
          // Assessment expired or completed
          localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Failed to load assessment:', e);
      }
    }
  }, []);

  // Update timer every second
  useEffect(() => {
    if (!isActive || !assessment) return;

    const interval = setInterval(() => {
      setAssessment((prev) => {
        if (!prev) return null;

        const newTimeRemaining = Math.max(0, prev.timeRemaining - 1000);
        
        if (newTimeRemaining === 0) {
          // Time expired
          setIsActive(false);
          return {
            ...prev,
            timeRemaining: 0,
            completed: true,
          };
        }

        return {
          ...prev,
          timeRemaining: newTimeRemaining,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, assessment]);

  // Save assessment to localStorage whenever it changes
  useEffect(() => {
    if (assessment) {
      localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(assessment));
    }
  }, [assessment]);

  const startAssessment = useCallback((version: AssessmentVersion) => {
    const newAssessment: AssessmentState = {
      id: `assessment-${Date.now()}`,
      startTime: Date.now(),
      endTime: Date.now() + TIME_LIMIT,
      timeRemaining: TIME_LIMIT,
      currentProblemIndex: 0,
      problemScores: new Array(version.problems.length).fill(0),
      problemSubmissions: {},
      completed: false,
      versionId: version.id,
    };

    setAssessment(newAssessment);
    setAssessmentVersion(version);
    setIsActive(true);
  }, []);

  const submitProblem = useCallback((problemId: number, result: ExecutionResult) => {
    setAssessment((prev) => {
      if (!prev || !assessmentVersion) return null;

      // Find the index of the problem in the assessment version
      const problemIndex = assessmentVersion.problems.findIndex(p => p.id === problemId);
      if (problemIndex === -1) return prev;

      const passed = result.testResults?.every((t) => t.passed) || false;
      const score = passed ? 100 : calculateScore(result.testResults || []);

      const newScores = [...prev.problemScores];
      newScores[problemIndex] = score;

      return {
        ...prev,
        problemSubmissions: {
          ...prev.problemSubmissions,
          [problemId]: result,
        },
        problemScores: newScores,
      };
    });
  }, [assessmentVersion]);

  const setCurrentProblemIndex = useCallback((index: number) => {
    setAssessment((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentProblemIndex: index,
      };
    });
  }, []);

  const completeAssessment = useCallback(() => {
    setAssessment((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        completed: true,
        endTime: Date.now(),
      };
    });
    setIsActive(false);
  }, []);

  const resetAssessment = useCallback(() => {
    localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
    setAssessment(null);
    setAssessmentVersion(null);
    setIsActive(false);
  }, []);

  return {
    assessment,
    assessmentVersion,
    isActive,
    startAssessment,
    submitProblem,
    setCurrentProblemIndex,
    completeAssessment,
    resetAssessment,
  };
}

function calculateScore(testResults: ExecutionResult['testResults']): number {
  if (!testResults || testResults.length === 0) return 0;
  const passed = testResults.filter((t) => t.passed).length;
  return Math.round((passed / testResults.length) * 100);
}

