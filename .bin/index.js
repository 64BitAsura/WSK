const childProcess = require("child_process").spawn(
  "npx",
  ["-y", "create-stencil"],
  {
    stdio: ["pipe", "pipe", "pipe"], // 'pipe' stdin, 'pipe' stdout, 'pipe' stderr
  }
);
childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);

const flags = {
  template: true,
  project: true,
  confirm: true,
};
const downArrowKey = String.fromCharCode(0x1b, 0x5b, 0x42);
const enterKey = String.fromCharCode(0x0d);
childProcess.stdout.on("data", async (data) => {
  const prompt = data.toString();
  if (prompt.includes("Select a starter project")) {
    if (flags.template) {
      flags.template = false;
      setTimeout(() => {
        childProcess.stdin.write(enterKey);
      }, 0);
    }
  } else if (prompt.includes("Project name")) {
    if (flags.project) {
      flags.project = false;
      setTimeout(() => {
        childProcess.stdin.write("stencil-app" + enterKey);
      }, 0);
    }
  } else if (prompt.includes("Confirm?")) {
    if (flags.confirm) {
      flags.confirm = false;
      setTimeout(() => {
        childProcess.stdin.write("Y");
      }, 0);
    }
  }
});
