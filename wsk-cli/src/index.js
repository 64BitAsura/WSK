const fs = require("fs");
const path = require("path");
const events = require("events");
const event = new events.EventEmitter();

const { spawn, spawnSync } = require("child_process");

const { argv } = require("yargs");
const rimraf = require("rimraf");
const prompts = require("prompts");

const args = process.argv.slice(2);
const env = process.env;

const cli = {
  static: (req, res, next) => {
    const callback = null;
    const cmd = req.cmd;
    const args = req.args;
    const opts = req.opts;
    const thread = spawnSync(cmd, args, opts);
    res[req.results] = thread;
    if (typeof next === "function") {
      return next(req, res, callback);
    } else if (typeof next === "string") {
      event.emit(next, req, res, callback);
    } else {
      //
    }
  },
  interactive: (req, res, next) => {},
};
const convert = {
  update: function (dir, reg, name) {
    // TODO: should search recursively for all references to the css files
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const f = path.join(dir, file);
        if (fs.statSync(f).isFile()) {
          const content = fs.readFileSync(f, "utf8");
          const edited = content.replace(new RegExp(reg, "g"), name);
          if (content !== edited) {
            fs.writeFileSync(f, edited);
            console.log(`Updated references in ${file}`);
          }
        }
      }
    }
  },
  css: function (dir) {
    // TODO: should search recursively for all css files
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const f = path.join(dir, file);
        if (fs.statSync(f).isFile() && path.extname(file) === ".css") {
          const name = `${path.basename(file, ".css")}.scss`;
          fs.renameSync(f, path.join(dir, name));
          console.log(`Renamed ${file} to ${name}`);
          this.update(dir, file, name);
        }
      }
    }
  },
};
const renamer = (folder) => {
  const files = fs.readdirSync(folder);
  for (const file of files) {
    const f = path.join(folder, file);
    if (fs.statSync(f).isFile() && path.extname(file) === ".css") {
      const name = `${path.basename(file, ".css")}.scss`;
      fs.renameSync(f, path.join(folder, name));
      console.log(`Renamed ${file} to ${name}`);
      updater(folder, file, name);
    }
  }
};
const updater = (folder, ref, name) => {
  const files = fs.readdirSync(folder);
  for (const file of files) {
    const f = path.join(folder, file);
    if (fs.statSync(f).isFile()) {
      const content = fs.readFileSync(f, "utf8");
      const edited = content.replace(new RegExp(ref, "g"), name);
      if (content !== edited) {
        fs.writeFileSync(f, edited);
        console.log(`Updated references in ${file}`);
      }
    }
  }
};

event.on("create-stencil-component", () => {
  const handler = (response) => {
    const workspace = path.join(process.cwd(), response.project);
    // console.log(response);
    const remove = rimraf.rimrafSync(workspace);
    // console.log(remove);
    const result = spawnSync(
      "npx",
      ["-y", "create-stencil", response.template, response.project],
      { stdio: ["ignore", process.stdout, process.stderr] }
    );
    // const result = spawnSync("npx", ["-y", "create-stencil", response.template, response.project], {shell: true});
    // console.log(result);
    if (result?.status === 0) {
      //pkg set dependencies['stencil-library']='*'
      const update = spawnSync(
        "npm",
        [
          "pkg",
          "set",
          "scripts[test.coverage]=stencil test --spec --e2e --coverage",
        ],
        {
          cwd: workspace,
          stdio: ["ignore", process.stdout, process.stderr],
        }
      );
      // console.log(cleanup);
      const answers = {
        "Which additional files do you want to generate?": () => {
          //   console.log();
          thread.stdin.write(String.fromCharCode(0x0d));
          //   console.log("answered");
          setTimeout(() => {
            // console.log("ended");
            callback(response);
            thread.stdin.end();
          }, 1000);
        },
      };
      const thread = spawn(
        "npx",
        [
          "-y",
          "@stencil/core",
          "generate",
          `${response.namespace}-${response.component}`,
        ],
        {
          cwd: workspace,
          //   stdio: ["ignore", process.stdout, process.stderr],
          stdio: ["pipe", "pipe", "pipe"], // "pipe" stdin, "pipe" stdout, "pipe" stderr
        }
      );
      thread.stdout.pipe(process.stdout);
      thread.stderr.pipe(process.stderr);
      thread.stdout.on("data", async (data) => {
        const prompt = data.toString();
        for (answer in answers) {
          if (prompt.includes(answer)) {
            if (
              // typeof answers[answer] === "function"
              answers[answer] instanceof Function
            ) {
              answers[answer]();
              answers[answer] = null;
            }
          }
        }
        /*
        if (
          prompt.includes("Which additional files do you want to generate?") &&
          prompt.includes("Instructions:")
          //   prompt.startsWith("Which additional files do you want to generate?")
          //   prompt.indexOf("Which additional files do you want to generate?") === 0
        ) {
          console.log();
          thread.stdin.write(String.fromCharCode(0x0d));
          console.log("answered");
          setTimeout(() => {
            console.log("ended");
            return thread.stdin.end();
          }, 0);
        }
        */
      });
    }
    prompts.override(); // clear previous answers
    // TODO: Run Callback
  };
  const callback = (response) => {
    const workspace = path.join(process.cwd(), response.project);
    // Remove default component
    /*
    const cleanup = rimraf.rimrafSync(
      path.join(workspace, "src/components/my-component")
    );
    */
    // Convert CSS > SCSS
    // convert.css(path.join(workspace, `src/components`));
    // /*
    const folders = [
      path.join(workspace, "src/components/my-component"),
      path.join(
        workspace,
        `src/components/${response.namespace}-${response.component}`
      ),
    ];
    for (folder in folders) {
      convert.css(folder);
    }
    // */
    // Update Stencil Config use SCSS
    const find = `import { Config } from '@stencil/core';

export const config: Config = {`;
    const replace = `import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [ sass() ],`;
    const config = path.join(workspace, "stencil.config.ts");
    if (fs.statSync(config).isFile()) {
      const cnf = fs.readFileSync(config, "utf8");
      const cfg = cnf.replace(find, replace);
      fs.writeFileSync(config, cfg);
      console.log("Updated stencil.config.ts");
    }
    const install = spawnSync("npm", ["i", "@stencil/sass", "--save-dev"], {
      cwd: workspace,
      stdio: ["ignore", process.stdout, process.stderr],
    });
    const build = spawnSync("npm", ["run", "build"], {
      cwd: workspace,
      stdio: ["ignore", process.stdout, process.stderr],
    });
    const test = spawnSync("npm", ["run", "test.coverage"], {
      cwd: workspace,
      stdio: ["ignore", process.stdout, process.stderr],
    });
    const start = spawnSync("npm", ["start"], {
      cwd: workspace,
      stdio: [process.stdin, process.stdout, process.stderr],
    });
  };

  //   console.log(argv);
  //   console.log(args);
  //   console.log(env);
  //   console.log(prompts);

  //   // Preanswer questions with CLI args
  //   prompts.override(argv);
  //   console.log(prompts);
  //   const template = "component";
  //   prompts.override({ template });
  //   console.log(prompts);
  //   prompts._override.template = template;
  //   prompts.override({ ...argv, template });
  //   console.log(prompts);
  //   prompts.inject(["component"]); // used when skipping questions
  //   prompts.override();
  //   console.log(prompts);

  prompts.override(); // clear previous answers
  prompts.override({ ...argv, template: "component" }); // preset answers
  (async () => {
    const response = await prompts([
      {
        type: "text",
        name: "template",
        message: "Project template:",
      },
      {
        type: "text",
        name: "namespace",
        message: "Project namespace:",
      },
      {
        type: "text",
        name: "project",
        message: "Project name:",
      },
      {
        type: "text",
        name: "component",
        message: "Component name:",
      },
      //   {
      //     type: "multiselect",
      //     name: "includes",
      //     message: "Include addtional Component files:",
      //     choices: [
      //       { title: "Stylesheet", value: "css", selected: true },
      //       { title: "Spec Test", value: "spec", selected: true },
      //       { title: "E2E Test", value: "e2e", selected: true },
      //     ],
      //   },
    ]);

    handler(response);
  })();
});

const cmd = ((args || [])[0] || "").toLowerCase();
event.emit(cmd);
