import express from 'express';
import cors from 'cors';
import { executeCode } from './executor.js';
import { getProblems, getProblemById } from './problems.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all problems
app.get('/api/problems', (req, res) => {
  try {
    const problems = getProblems();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get problem by ID
app.get('/api/problems/:id', (req, res) => {
  try {
    const problem = getProblemById(req.params.id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute code
app.post('/api/execute', async (req, res) => {
  try {
    const { code, language, testcases, customInput } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    const result = await executeCode(code, language, testcases, customInput);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Execution failed',
      stdout: '',
      stderr: error.message,
      executionTime: 0,
      passed: false
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


