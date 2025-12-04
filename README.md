# Code Assessment Platform

A complete web-based coding assessment platform built with React, TypeScript, and Node.js. This platform provides a safe environment for code execution and testing.

## Features

- **Split Layout UI**: Problem description, code editor, and testcase runner in a three-panel layout
- **Monaco Editor**: Full-featured code editor with syntax highlighting for Python and JavaScript
- **Safe Code Execution**: Sandboxed code execution with timeouts and resource limits
- **Testcase Framework**: Original JSON-based testcase format
- **Submission System**: Automated testcase evaluation with scoring
- **Dark/Light Mode**: Theme switching support
- **Session Persistence**: Code is automatically saved to localStorage
- **Keyboard Shortcuts**: Ctrl+Enter (Cmd+Enter on Mac) to run code

## Tech Stack

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

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:3001`

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
code-assessment/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server
│   │   ├── executor.js         # Code execution sandbox
│   │   └── problems.js         # Problem definitions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── types.ts            # TypeScript types
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   └── package.json
└── README.md
```

## Usage

1. **Select a Problem**: Use the dropdown in the header to select a problem
2. **Write Code**: Write your solution in the code editor
3. **Test with Custom Input**: Use the "Custom Input" tab to test with your own input
4. **Run Code**: Click "Run" or press Ctrl+Enter to execute with custom input
5. **Submit**: Click "Submit" to run all testcases and see results
6. **View Results**: Check the "Results" tab to see detailed testcase outcomes

## Security

The code execution system includes:
- Execution timeouts (5 seconds default)
- Output length limits (10KB max)
- Isolated process execution
- Error handling and sanitization

## License

This project is open source and safe for use.


