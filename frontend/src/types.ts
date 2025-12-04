export interface Problem {
  id: number;
  title: string;
  description: string;
  examples: Array<{ input: string; output: string }>;
  testcases: Array<{ id: number; input: string; expected: string }>;
  functionSignature: string;
  starterCode?: {
    python?: string;
    javascript?: string;
  };
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  executionTime: number;
  passed: boolean;
  testResults?: Array<{
    id: number;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    stdout: string;
    stderr: string;
  }>;
}

export interface AssessmentState {
  id: string;
  startTime: number;
  endTime: number;
  timeRemaining: number;
  currentProblemIndex: number;
  problemScores: number[];
  problemSubmissions: Record<number, ExecutionResult | null>;
  completed: boolean;
  versionId?: number;
}

export interface AssessmentResult {
  totalScore: number;
  problemScores: Array<{ problemId: number; score: number; passed: boolean }>;
  timeSpent: number;
  completed: boolean;
}
