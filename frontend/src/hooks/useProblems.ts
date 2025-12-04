import { useState, useEffect } from 'react';
import type { Problem } from '../types';

export function useProblems() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems');
      const data = await response.json();
      setProblems(data);
      if (data.length > 0 && !currentProblem) {
        fetchProblemDetails(data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProblemDetails = async (id: number) => {
    try {
      const response = await fetch(`/api/problems/${id}`);
      const data = await response.json();
      setCurrentProblem(data);
    } catch (error) {
      console.error('Failed to fetch problem details:', error);
    }
  };

  const handleSetCurrentProblem = (problem: Problem | null) => {
    if (problem) {
      fetchProblemDetails(problem.id);
    } else {
      setCurrentProblem(null);
    }
  };

  return {
    problems,
    currentProblem,
    setCurrentProblem: handleSetCurrentProblem,
    loading
  };
}


