import { useState, useEffect } from 'react';
import type { Theme } from '../hooks/useTheme';
import { useAssessmentVersions } from '../hooks/useAssessmentVersions';

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

interface AssessmentStartProps {
  onStart: (version: AssessmentVersion) => void;
  theme: Theme;
}

export function AssessmentStart({ onStart, theme }: AssessmentStartProps) {
  const { versions, loading } = useAssessmentVersions();
  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<AssessmentVersion | null>(null);

  useEffect(() => {
    if (versions.length > 0 && !selectedVersionId) {
      setSelectedVersionId(versions[0].id);
    }
  }, [versions, selectedVersionId]);

  useEffect(() => {
    if (selectedVersionId) {
      fetchVersionDetails(selectedVersionId);
    }
  }, [selectedVersionId]);

  const fetchVersionDetails = async (id: number) => {
    try {
      const response = await fetch(`/api/assessments/${id}`);
      const data = await response.json();
      setSelectedVersion(data);
    } catch (error) {
      console.error('Failed to fetch assessment version:', error);
    }
  };

  const handleStart = () => {
    if (selectedVersion) {
      onStart(selectedVersion);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div
        className="max-w-2xl w-full p-8 rounded-lg shadow-lg"
        style={
          theme.startsWith('catppuccin-')
            ? {
                backgroundColor: 'var(--ctp-surface0)',
                color: 'var(--ctp-text)',
              }
            : {
                backgroundColor: 'white',
              }
        }
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Coding Assessment</h1>
        
        {!loading && versions.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Select Assessment Version:
            </label>
            <select
              value={selectedVersionId || ''}
              onChange={(e) => setSelectedVersionId(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {versions.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedVersion && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Problems in this assessment:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {selectedVersion.problems.map((p, idx) => (
                <li key={p.id}>Q{idx + 1}: {p.title}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>You will have 70 minutes to complete 4 coding problems</li>
              <li>There are no breaks - the timer runs continuously</li>
              <li>The timer does not stop even if your connection flickers</li>
              <li>Each problem has multiple testcases that must pass</li>
              <li>You can switch between problems at any time</li>
              <li>Your progress is automatically saved</li>
              <li>Once you submit a problem, you can still modify your solution</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Scoring</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Each problem is worth 100 points</li>
              <li>Points are awarded based on testcases passed</li>
              <li>Your final score is the average of all problem scores</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStart}
            disabled={!selectedVersion}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={
              theme.startsWith('catppuccin-')
                ? {
                    backgroundColor: 'var(--ctp-blue)',
                    color: 'var(--ctp-base)',
                  }
                : {}
            }
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

