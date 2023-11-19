const { spawn } = require("child_process");
const events = require("events");

const event = new events.EventEmitter();

const command = (cnf) => {
  const keystrokes = {
    "ctrl+c": "\u0018", // ctrl + c
    "ctrl+v": "\u0016", // ctrl + v
    "alt+tab": "\u001b\u005b\u0043", // alt + tab
    "down-arrow": String.fromCharCode(0x1b, 0x5b, 0x42),
    enter: String.fromCharCode(0x0d),
    "left-arrow": String.fromCharCode(0x1b, 0x5b, 0x44),
    "right-arrow": String.fromCharCode(0x1b, 0x5b, 0x43),
    spacebar: String.fromCharCode(0x20),
    "up-arrow": String.fromCharCode(0x1b, 0x5b, 0x41),
  };

  const childProcess = spawn(cnf.cmd, cnf.args, {
    stdio: ["pipe", "pipe", "pipe"], // 'pipe' stdin, 'pipe' stdout, 'pipe' stderr
  });
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
  childProcess.stdout.on("data", async (data) => {
    const prompt = data.toString();
    const template = cnf?.prompts?.template || {};
    const project = cnf?.prompts?.project || {};
    const confirm = cnf?.prompts?.confirm || {};
    const component = cnf?.prompts?.component || {};
    if (prompt.includes(template.includes)) {
      if (!template.answered) {
        template.answered = true;
        setTimeout(() => {
          childProcess.stdin.write(keystrokes.enter);
        }, 0);
      }
    } else if (prompt.includes(project.includes)) {
      if (!project.answered) {
        project.answered = true;
        setTimeout(() => {
          childProcess.stdin.write(project.input + keystrokes.enter);
        }, 0);
      }
    } else if (prompt.includes(confirm.includes)) {
      if (!confirm.answered) {
        confirm.answered = true;
        setTimeout(() => {
          childProcess.stdin.write(confirm.input);
        }, 0);
      }
    } else if (prompt.includes(component.includes)) {
        if (!component.answered) {
            component.answered = true;
          setTimeout(() => {
            childProcess.stdin.write(keystrokes.enter);
            setTimeout(() => {
                childProcess.stdin.end();
              }, 1000);
          }, 0);
        }
      }
  });
};

event.on("stencil-create", () => {
  command({
    cmd: "npx",
    args: ["-y", "create-stencil"],
    prompts: {
      template: {
        includes: "Select a starter project",
        input: "",
      },
      project: {
        includes: "Project name",
        input: "web-component-lib",
      },
      confirm: {
        includes: "Confirm?",
        input: "Y",
      },
    },
  });
});
// 
event.on("stencil-generate", () => {
  command({
    cmd: "npx",
    args: ["-y", "@stencil/core", "generate", "xxx-component"],
    prompts: {
      component: {
        includes: "Which additional files do you want to generate?",
        input: "",
      },
    },
  });
});
event.on("storybook-init", () => {
    command({
      cmd: "npx",
      args: ["-y", "@angular/cli", "", ""],
      prompts: {
        component: {
          includes: "Would you like to share pseudonymous usage data about this project",
          input: "N",
        },
      },
    });
  });
event.on("ng-cli", () => {
    command({
      cmd: "npx",
      args: ["-y", "@angular/cli", "", ""],
      prompts: {
        component: {
          includes: "Would you like to share pseudonymous usage data about this project",
          input: "N",
        },
      },
    });
  });

const args = process.argv.slice(2);
event.emit(args[0].toLowerCase());
