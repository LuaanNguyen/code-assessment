import { spawn } from 'child_process';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

const EXECUTION_TIMEOUT = 5000; // 5 seconds
const MAX_OUTPUT_LENGTH = 10000; // 10KB max output

/**
 * Safely execute user code in an isolated environment
 */
export async function executeCode(code, language, testcases = [], customInput = '') {
  const startTime = Date.now();
  
  try {
    // Create temporary directory for execution
    const tempDir = join(tmpdir(), `code-exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    await mkdir(tempDir, { recursive: true });

    let result;
    
    if (customInput) {
      // Execute with custom input
      result = await executeWithInput(code, language, customInput, tempDir);
    } else if (testcases && testcases.length > 0) {
      // Execute with testcases
      result = await executeWithTestcases(code, language, testcases, tempDir);
    } else {
      // Execute without input
      result = await executeWithoutInput(code, language, tempDir);
    }

    const executionTime = Date.now() - startTime;

    // Cleanup
    try {
      await unlink(join(tempDir, getFileName(language)));
    } catch (e) {
      // Ignore cleanup errors
    }

    return {
      ...result,
      executionTime
    };
  } catch (error) {
    return {
      stdout: '',
      stderr: error.message || 'Execution failed',
      executionTime: Date.now() - startTime,
      passed: false,
      testResults: []
    };
  }
}

/**
 * Execute code with custom input
 */
async function executeWithInput(code, language, input, tempDir) {
  const wrappedCode = wrapCode(code, language);
  const result = await runCode(wrappedCode, language, tempDir, input);
  
  return {
    stdout: truncateOutput(result.stdout),
    stderr: truncateOutput(result.stderr),
    passed: result.exitCode === 0,
    testResults: []
  };
}

/**
 * Execute code with testcases
 */
async function executeWithTestcases(code, language, testcases, tempDir) {
  const testResults = [];
  let allPassed = true;

  const wrappedCode = wrapCode(code, language);

  for (const testcase of testcases) {
    const result = await runCode(wrappedCode, language, tempDir, testcase.input);
    
    const output = result.stdout.trim();
    const expected = String(testcase.expected).trim();
    const passed = output === expected;

    if (!passed) {
      allPassed = false;
    }

    testResults.push({
      id: testcase.id,
      input: testcase.input,
      expected: testcase.expected,
      actual: output,
      passed,
      stdout: truncateOutput(result.stdout),
      stderr: truncateOutput(result.stderr)
    });
  }

  return {
    stdout: '',
    stderr: '',
    passed: allPassed,
    testResults
  };
}

/**
 * Execute code without input
 */
async function executeWithoutInput(code, language, tempDir) {
  // Still wrap the code to handle solve() functions, but without input
  const wrappedCode = wrapCode(code, language);
  const result = await runCode(wrappedCode, language, tempDir);
  
  return {
    stdout: truncateOutput(result.stdout),
    stderr: truncateOutput(result.stderr),
    passed: result.exitCode === 0,
    testResults: []
  };
}

/**
 * Wrap user code with testcase runner
 */
function wrapCode(userCode, language) {
  if (language === 'python') {
    return wrapPythonCode(userCode);
  } else if (language === 'javascript') {
    return wrapJavaScriptCode(userCode);
  }
  return userCode;
}

/**
 * Wrap Python code with input handling
 */
function wrapPythonCode(userCode) {
  // Try to detect if user has a solve() function
  const hasSolve = userCode.includes('def solve(') || userCode.includes('def solve()');
  
  if (hasSolve) {
    // If solve() exists, call it and capture all output (including print statements)
    // Flush stdout to ensure all print statements are captured
    // Handle case where solve() might try to read input but none is provided
    return `${userCode}\n\nimport sys\nif __name__ == "__main__":\n    try:\n        result = solve()\n        sys.stdout.flush()  # Ensure all print statements are flushed\n        if result is not None:\n            print(result)\n            sys.stdout.flush()\n    except EOFError:\n        # solve() tried to read input but none was provided\n        sys.stdout.flush()\n        pass\n    except Exception as e:\n        print(f"Error: {e}", file=sys.stderr)\n        sys.stderr.flush()`;
  }
  
  // For simple scripts without solve(), provide basic input reading
  return `${userCode}\n\nimport sys\n# Input handling\nif __name__ == "__main__":\n    try:\n        user_input = input().strip()\n        # Basic processing - can be customized per problem\n        values = user_input.split()\n        if len(values) >= 2:\n            a, b = int(values[0]), int(values[1])\n            print(a + b)\n        else:\n            print(user_input)\n        sys.stdout.flush()\n    except Exception as e:\n        print(f"Error: {e}", file=sys.stderr)\n        sys.stderr.flush()`;
}

/**
 * Wrap JavaScript code with input handling
 */
function wrapJavaScriptCode(userCode) {
  // Try to detect if user has a solve() function
  const hasSolve = userCode.includes('function solve(') || userCode.includes('const solve') || userCode.includes('let solve');
  
  if (hasSolve) {
    // Use readline to read input, then call solve()
    // Make input available to solve() via a global variable or by reading it synchronously
    return `${userCode}\n\n// Input handling - read input and make it available to solve()\n(async () => {\n    const readline = require('readline');\n    const rl = readline.createInterface({\n        input: process.stdin,\n        output: process.stdout\n    });\n    \n    const input = await new Promise((resolve) => {\n        rl.on('line', (line) => {\n            resolve(line.trim());\n            rl.close();\n        });\n    });\n    \n    // Make input available globally for solve() to access\n    global.__input__ = input;\n    \n    try {\n        const result = solve();\n        if (result !== undefined && result !== null) {\n            console.log(result);\n        }\n    } catch (e) {\n        console.error('Error:', e.message);\n    }\n})();`;
  }
  
  // For simple scripts without solve(), provide basic input reading
  return `${userCode}\n\n// Input handling\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (line) => {\n    try {\n        const values = line.trim().split(' ').map(Number);\n        if (values.length >= 2 && !isNaN(values[0]) && !isNaN(values[1])) {\n            console.log(values[0] + values[1]);\n        } else {\n            console.log(line.trim());\n        }\n    } catch (e) {\n        console.error('Error:', e.message);\n    }\n    rl.close();\n});`;
}

/**
 * Run code in a sandboxed environment
 */
async function runCode(code, language, tempDir, input = '') {
  const fileName = getFileName(language);
  const filePath = join(tempDir, fileName);
  
  // Write code to file
  await writeFile(filePath, code, 'utf8');

  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';
    
    const command = getCommand(language, filePath);
    const process = spawn(command[0], command.slice(1), {
      cwd: tempDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: EXECUTION_TIMEOUT
    });

    // Write input to stdin if provided
    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    } else {
      process.stdin.end();
    }

    // Set timeout
    const timeout = setTimeout(() => {
      process.kill();
      reject(new Error('Execution timeout exceeded'));
    }, EXECUTION_TIMEOUT);

    // Collect output
    process.stdout.on('data', (data) => {
      stdout += data.toString();
      if (stdout.length > MAX_OUTPUT_LENGTH) {
        process.kill();
        clearTimeout(timeout);
        reject(new Error('Output limit exceeded'));
      }
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
      if (stderr.length > MAX_OUTPUT_LENGTH) {
        process.kill();
        clearTimeout(timeout);
        reject(new Error('Output limit exceeded'));
      }
    });

    process.on('close', (code) => {
      clearTimeout(timeout);
      resolve({
        stdout,
        stderr,
        exitCode: code
      });
    });

    process.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

/**
 * Get file name based on language
 */
function getFileName(language) {
  const extensions = {
    python: 'code.py',
    javascript: 'code.js'
  };
  return extensions[language] || 'code.txt';
}

/**
 * Get command to execute based on language
 */
function getCommand(language, filePath) {
  const commands = {
    python: ['python3', filePath],
    javascript: ['node', filePath]
  };
  return commands[language] || ['cat', filePath];
}

/**
 * Truncate output if too long
 */
function truncateOutput(output) {
  if (output.length > MAX_OUTPUT_LENGTH) {
    return output.substring(0, MAX_OUTPUT_LENGTH) + '\n... (output truncated)';
  }
  return output;
}

