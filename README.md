# Code Assessment Platform - GCA Practice

A complete web-based coding assessment platform designed for **CodeSignal GCA (General Coding Assessment)** preparation. Built with React, TypeScript, and Node.js, this platform provides a safe environment for code execution and testing that closely mimics the real GCA experience.

## 🎯 Purpose

This platform is specifically designed to help you prepare for CodeSignal's GCA test (like the one for eBay), targeting a **820+ score**. It includes:

- **32 CodeSignal-style problems** covering all GCA patterns
- **12 different GCA assessment versions** (70 minutes, 4 problems each)
- **Realistic assessment mode** with persistent timer and scoring
- **Pattern-focused problem bank** aligned with GCA question types

## ✨ Features

### Core Features
- **Split Layout UI**: Resizable three-panel layout (Problem description, Code editor, Testcases/Output)
- **Monaco Editor**: Full-featured code editor with syntax highlighting for Python and JavaScript
- **Safe Code Execution**: Sandboxed code execution with timeouts (5s) and resource limits
- **Testcase Framework**: JSON-based testcase format with automated evaluation
- **Submission System**: Automated testcase evaluation with scoring (0-100 per problem)
- **Session Persistence**: Code automatically saved to localStorage, assessment state persists across sessions

### Assessment Mode (GCA Simulation)
- **70-minute timed assessments** with 4 problems (Q1, Q2, Q3, Q4)
- **12 different assessment versions** with varying problem sets
- **Persistent timer** that doesn't stop (even if connection flickers)
- **Problem navigation** - switch between Q1-Q4 at any time
- **Automatic scoring** based on testcases passed
- **Results screen** showing total score, time spent, and per-problem breakdown
- **Assessment state persistence** - resume where you left off

### UI/UX Features
- **Multiple Themes**: Light, Dark, and 4 Catppuccin variants (Latte, Frappé, Macchiato, Mocha)
- **Resizable Panels**: Drag dividers to adjust panel widths (saved to localStorage)
- **Keyboard Shortcuts**: Ctrl+Enter (Cmd+Enter on Mac) to run code
- **Responsive Design**: Works on different screen sizes
- **Dark Mode Support**: Full dark mode with theme switching

## 📚 Problem Bank

### 32 Problems Total

**Q1 Problems** (String manipulation, basic math, hashmap, counting):
- Robot Movement
- Character Frequency Counter
- Palindrome Checker
- String Compression
- Anagram Groups
- First Unique Character
- Isomorphic Strings

**Q2 Problems** (Sliding window, stack/queue, two pointers, hashing):
- Count Valid Words from String
- Phone Number to Words Converter
- Longest Substring Without Repeating Characters
- Valid Parentheses
- Two Sum
- Maximum Subarray Sum (Kadane's algorithm)
- Container With Most Water
- Minimum Window Substring
- Next Greater Element

**Q3 Problems** (Graph BFS/DFS, greedy, DP easy variant, sorting):
- Card Hand Validation
- Game Field Matrix Puzzle
- Meeting Rooms
- Coin Change
- BFS Shortest Path
- Merge Intervals
- Course Schedule (cycle detection)
- House Robber

**Q4 Problems** (Hard DP, graph shortest path, backtracking):
- Codewriting (Text formatting)
- Memory Allocation
- Word Break
- N-Queens Count
- Dijkstra Shortest Path
- Longest Increasing Subsequence
- Edit Distance
- Sudoku Solver
- Number of Islands

## 🎮 Assessment Versions

12 different GCA assessment versions, each with 4 problems (Q1, Q2, Q3, Q4):

- **GCA Version 1-4**: Original problem sets
- **GCA Version 5-12**: CodeSignal-style problem combinations covering:
  - String manipulation patterns
  - Sliding window techniques
  - Graph algorithms (BFS/DFS)
  - Dynamic programming
  - Backtracking problems

Each assessment:
- **Time Limit**: 70 minutes (non-stop)
- **Problems**: 4 (Q1, Q2, Q3, Q4)
- **Scoring**: 0-100 per problem based on testcases passed
- **Final Score**: Average of all 4 problem scores

## 🛠 Tech Stack

### Frontend
- React 18
- TypeScript
- TailwindCSS
- Monaco Editor
- Vite

### Backend
- Node.js
- Express
- Child process execution with sandboxing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

Or install separately:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Running the Application

**Option 1: Run both servers separately**

1. Start the backend server:
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:3001`

2. Start the frontend development server (in a new terminal):
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:3000`

**Option 2: Use root scripts**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

3. Open your browser and navigate to `http://localhost:3000`

## 📖 Usage

### Practice Mode
1. **Select a Problem**: Use the dropdown in the header to select a problem
2. **Write Code**: Write your solution in the code editor (Python or JavaScript)
3. **Test with Custom Input**: Use the "Custom Input" tab to test with your own input
4. **Run Code**: Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac) to execute
5. **Submit**: Click "Submit" to run all testcases and see results
6. **View Results**: Check the "Results" tab to see detailed testcase outcomes

### Assessment Mode (GCA Practice)
1. **Switch to Assessment Mode**: Click "Assessment Mode" button
2. **Select Assessment Version**: Choose from 12 different GCA versions
3. **Review Problems**: See which Q1, Q2, Q3, Q4 problems are included
4. **Start Assessment**: Click "Start Assessment" - timer begins immediately
5. **Solve Problems**: Navigate between Q1-Q4 using the header buttons
6. **Submit Solutions**: Click "Submit" for each problem (you can resubmit)
7. **Complete Assessment**: Click "Complete Assessment" when done (or timer expires)
8. **View Results**: See your total score, time spent, and per-problem breakdown

### Resizing Panels
- **Drag the dividers** between panels to resize
- Panel widths are **automatically saved** to localStorage
- Each panel has a minimum width to prevent it from becoming too small

### Themes
- Click the theme selector in the header
- Choose from: Light, Dark, or Catppuccin variants
- Theme preference is saved automatically

## 📁 Project Structure

```
code-assessment/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server with API endpoints
│   │   ├── executor.js         # Code execution sandbox
│   │   ├── problems.js         # 32 problem definitions
│   │   └── assessments.js      # 12 GCA assessment versions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── ProblemPanel.tsx
│   │   │   ├── TestcasePanel.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── AssessmentHeader.tsx
│   │   │   ├── AssessmentStart.tsx
│   │   │   └── AssessmentResults.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useTheme.ts
│   │   │   ├── useProblems.ts
│   │   │   ├── useAssessment.ts
│   │   │   ├── useAssessmentVersions.ts
│   │   │   └── useResizablePanels.ts
│   │   ├── types.ts            # TypeScript type definitions
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   └── package.json
├── package.json                # Root scripts
└── README.md
```

## 🔒 Security

The code execution system includes:
- **Execution timeouts**: 5 seconds default
- **Output length limits**: 10KB max
- **Isolated process execution**: Each run in separate child process
- **Error handling**: Comprehensive error catching and sanitization
- **Resource limits**: Memory and CPU constraints

## 🎯 GCA Preparation Tips

Based on CodeSignal GCA patterns:

**Q1 (5 minutes max)**:
- String manipulation
- Basic math
- Simple hashmap
- Counting frequency
- If taking >5 minutes, restart

**Q2**:
- Sliding window
- Stack or queue
- Two pointers
- Hashing with small logic twist

**Q3**:
- Graph BFS/DFS
- Greedy algorithms
- Dynamic Programming (easy variant)
- Sorting + scanning

**Q4 (Don't need to fully solve for 820+)**:
- Hard DP
- Graph shortest path
- Backtracking with pruning
- Multiple constraints (boil down to known patterns)

## 📝 Notes

- All problems are **original and generic** - safe for open source
- Code is **automatically saved** as you type
- Assessment state **persists** across page refreshes
- Timer **does not stop** - simulates real GCA conditions
- You can **switch between problems** during assessment
- **Resubmissions allowed** - you can improve your solutions

## 🐛 Troubleshooting

**Backend won't start:**
- Check if port 3001 is available: `lsof -ti:3001`
- Verify Node.js version: `node --version` (should be 18+)
- Check backend dependencies: `cd backend && npm install`

**Frontend can't connect to backend:**
- Ensure backend is running on port 3001
- Check browser console for errors
- Verify Vite proxy configuration in `frontend/vite.config.ts`

**Syntax errors in problems.js:**
- Run: `cd backend && node -c src/problems.js` to check syntax
- Ensure all problem objects are properly closed with `},`

## 📄 License

This project is open source and safe for use.

---

**Ready to practice?** Start with Practice Mode to familiarize yourself with problems, then try Assessment Mode to simulate the real GCA experience!
