import { useState, useEffect, useCallback } from 'react';
import type { AssessmentState, ExecutionResult } from '../types';

const ASSESSMENT_STORAGE_KEY = 'assessment_state';
const TIME_LIMIT = 70 * 60 * 1000; // 70 minutes

export function useAssessment() {
  const [assessment, setAssessment] = useState<AssessmentState | null>(null);
  const [isActive, setIsActive] = useState(false);

  // Load assessment from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const elapsed = now - parsed.startTime;
        const timeRemaining = Math.max(0, TIME_LIMIT - elapsed);

        if (timeRemaining > 0 && !parsed.completed) {
          setAssessment({
            ...parsed,
            timeRemaining,
          });
          setIsActive(true);
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

  const startAssessment = useCallback(() => {
    const newAssessment: AssessmentState = {
      id: `assessment-${Date.now()}`,
      startTime: Date.now(),
      endTime: Date.now() + TIME_LIMIT,
      timeRemaining: TIME_LIMIT,
      currentProblemIndex: 0,
      problemScores: [0, 0, 0, 0],
      problemSubmissions: {},
      completed: false,
    };

    setAssessment(newAssessment);
    setIsActive(true);
  }, []);

  const submitProblem = useCallback((problemId: number, result: ExecutionResult) => {
    setAssessment((prev) => {
      if (!prev) return null;

      const problemIndex = problemId - 1; // Problem IDs are 1-indexed
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
  }, []);

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
    setIsActive(false);
  }, []);

  return {
    assessment,
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

