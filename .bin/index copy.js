// var exec = require("child_process").spawn;
// var child = spawn("script");

// child.stdin.setEncoding("utf8");

// child.stdout.on("data", function (data) {
//   if (data.toString() === "enter the password:") {
//     child.stdin.write("pass");
//     return child.stdin.end();
//   }
//   console.log("got some other data:");
//   console.log(data.toString());
// });

// child.stderr.on("data", function (data) {
//   console.log("got an error:");
//   console.log(data.toString());
// });

// child.on("close", function (code) {
//   console.log("child process exited with code " + code.toString());
// });

// ? Would you like to share pseudonymous usage data about this project with the Angular Team
// at Google under Google's Privacy Policy at https://policies.google.com/privacy. For more
// details and how to change this setting, see https://angular.io/analytics. No

// const { exec } = require("child_process");

// exec("your-cli-command", (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// const { exec } = require("child_process");

// function execute(command) {
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
//   });
// }

// // // execute("npx -y @stencil/core generate xxx-component");
// execute("npx -y create-stencil");

// require("child_process").execSync("npx -y @stencil/core generate xxx-component", { stdio: "inherit" });
// const result = require("child_process").execSync("npx -y create-stencil", {
//   stdio: "inherit",
// });

// console.log(result.toString());
// process.stdout.on("data", (data) => {
//   console.log(data.toString());
// });

const { spawn } = require("child_process");
const keypress = require("keypress");

// Replace 'npx-command' with the actual npx command you want to execute
const npxCommand = "npx -y create-stencil";
const { spawn } = require('child_process');
const keypress = require('keypress');

// Replace 'create-stencil' with the actual stencil command you want to execute
const stencilCommand = 'create-stencil';

// Replace 'answer2', 'answer3', etc., with the answers you want to provide to the prompts
const answers = ['answer1', 'answer2', 'answer3'];

// Function to simulate keypress events
function simulateKeypress(stream, keys) {
  keys.forEach((key) => {
    stream.write(key);
  });
}

// Create a child process for the stencil command
const childProcess = spawn('npx', ['-y', stencilCommand], {
  stdio: ['pipe', 'pipe', 'inherit'], // 'pipe' stdin, 'pipe' stdout, 'inherit' stderr
});

// Pipe the answers to the child process stdin
answers.forEach((answer, index) => {
  if (index === 0) {
    // Simulate down arrow and enter key for the first answer
    keypress(process.stdin);
    simulateKeypress(process.stdin, ['down', 'return']);
  } else {
    // For other answers, just write the answer and add a newline
    childProcess.stdin.write(answer + '\n');
  }
});

// End the stdin stream to signal that no more input will be provided
childProcess.stdin.end();

// Handle events from the child process
childProcess.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});

// Handle errors from the child process
childProcess.on('error', (err) => {
  console.error(`Error in child process: ${err}`);
});



// ✔ Select a starter project.

// Starters marked as [community] are developed by the Stencil Community,
// rather than Ionic. For more information on the Stencil Community, please see
// https://github.com/stencil-community › app [community]          Minimal starter for building a Stencil app or website
// ✔ Project name … test-project
// ? Confirm? › (Y/n)



// const { spawn } = require("child_process");
// const readline = require("readline");

// // Replace 'create-stencil' with the actual stencil command you want to execute
// const stencilCommand = "create-stencil";

// // Replace 'answer2', 'answer3', etc., with the answers you want to provide to the prompts
// const answers = ["\x1B[B", "\x0D", "stencil-project", "\x0D", "Y", "\x0D"];

// // Create a child process for the stencil command
// const childProcess = spawn("npx", ["-y", stencilCommand], {
//   stdio: ["pipe", "pipe", "pipe"], // 'pipe' stdin, 'pipe' stdout, 'pipe' stderr
// });

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Function to send answers to the child process
// function sendAnswers() {
//   if (answers.length === 0) {
//     // End the stdin stream to signal that no more input will be provided
//     childProcess.stdin.end();
//     rl.close();
//     return;
//   }

//   const answer = answers.shift();

//   // Wait for the child process to be ready for the next input
//   childProcess.stdin.once("drain", () => {
//     // Send the answer to the child process
//     childProcess.stdin.write(answer);

//     // Recursively call sendAnswers for the next input
//     sendAnswers();
//   });
// }

// // Display stdout and stderr of the child process
// childProcess.stdout.pipe(process.stdout);
// childProcess.stderr.pipe(process.stderr);

// // Call sendAnswers to start sending the answers
// sendAnswers();

// // Handle events from the child process
// childProcess.on("close", (code) => {
//   console.log(`Child process exited with code ${code}`);
// });

// // Handle errors from the child process
// childProcess.on("error", (err) => {
//   console.error(`Error in child process: ${err}`);
// });




// const readline = require('readline');

// const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
// });

// const enterDownArrowAndEnter = () => {
//  // Emulating down arrow key press
//  rl.write(String.fromCharCode(0x1B, 0x5B, 0x42));

//  // Emulating enter key press
//  rl.write(String.fromCharCode(0x0D));

//  rl.close();
// };

// enterDownArrowAndEnter();





// const { spawn } = require('child_process');
// const keypress = require('keypress');

// Replace 'create-stencil' with the actual stencil command you want to execute
// const stencilCommand = 'create-stencil';

// Replace 'answer2', 'answer3', etc., with the answers you want to provide to the prompts
// const answers = ['answer1', 'stencil-project', 'Y'];

// Function to simulate keypress events
// function simulateKeypress(stream, keys) {
//   keys.forEach((key) => {
//     stream.write(key);
//   });
// }
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++');

// Create a child process for the stencil command
const childProcess = require('child_process').spawn('npx', ['-y', 'create-stencil'], {
  stdio: ['pipe', 'pipe', 'pipe'], // 'pipe' stdin, 'pipe' stdout, 'pipe' stderr
});

// Pipe the answers to the child process stdin
// answers.forEach((answer, index) => {
//   if (index === 0) {
//     // Simulate down arrow and enter key for the first answer
//     // keypress(process.stdin);
//     // simulateKeypress(process.stdin, ['down', 'return']);

//     childProcess.stdin.write(String.fromCharCode(0x1B, 0x5B, 0x42) + String.fromCharCode(0x0D));
//   } else if (index === 1) {
//     // Simulate down arrow and enter key for the first answer
//     // keypress(process.stdin);
//     // simulateKeypress(process.stdin, ['down', 'return']);
    
//     childProcess.stdin.write(answer + String.fromCharCode(0x0D));
//   } else {
//     // For other answers, just write the answer and add a newline
//     childProcess.stdin.write(answer);
//   }
// });

// Display stdout and stderr of the child process
// childProcess.stdout.pipe(process.stdout);
// childProcess.stderr.pipe(process.stderr);

// End the stdin stream to signal that no more input will be provided
// childProcess.stdin.end();

// Handle events from the child process
// childProcess.on('data', (data) => {
//   console.log(`data: ${data}`);
// });

 // Attach a listener to the child process's stdout stream
 const flags = {
    template: true,
    project: true,
    confirm: true
 };
 childProcess.stdout.on('data', async (data) => {
    console.log('************************************************');
    const prompt = data.toString();
    console.log(prompt);
    if (prompt.includes('Select a starter project')) {
        if (flags.template) {
            flags.template = false;
            console.log("template");
            setTimeout(() => {
                childProcess.stdin.write(String.fromCharCode(0x1B, 0x5B, 0x42, 0x0D) + String.fromCharCode(0x0D));
            }, 0);
        }
    } else if (prompt.includes('Project name')) {
        if (flags.project) {
            flags.project = false;
            console.log("project");
            setTimeout(() => {
                childProcess.stdin.write("stencil-app" + String.fromCharCode(0x0D));
            }, 1000);
        }
    } else if (prompt.includes('Confirm?')) {
        if (flags.confirm) {
            flags.confirm = false;
            console.log("confirm");
            setTimeout(() => {
                childProcess.stdin.write(String.fromCharCode(89));
            }, 1000);
        }
    }
    console.log('************************************************');
 });

// Handle events from the child process
// childProcess.on('close', (code) => {
//   console.log(`close: ${code}`);
// });

// Handle errors from the child process
// childProcess.on('error', (err) => {
//   console.error(`error: ${err}`);
// });

