const fs = require("fs");
const path = require("path");
const events = require("events");

const event = new events.EventEmitter();
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

event.on("css2scss", () => {
  const project = args[1] || "wsk-app/src";
  const folder = path.join(process.cwd(), project);
  renamer(folder);
});
event.on("install", () => {
  const file = path.join(process.cwd(), "wsk-app/package.json");
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    pkg.dependencies["react-library"] = "*";
    pkg.dependencies["stencil-library"] = "*";
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`Updated package.json`);
  } else {
    console.log("File not found");
  }
});
event.on("cra", () => {
  console.log("******************************************************************************************************");
  console.log(`CRA: ${args[1]} | ${args[2]}`);
  const version = args[1] || console.error("Missing Version");
  const project = args[2] || console.error("Missing Project");
  const package = path.join(process.cwd(), `.tmp/cra/${version}/cra-template-typescript/template.json`);
  // const template = path.join(process.cwd(), `.tmp/cra/${version}/cra-template-typescript/template`);
  // const folder = path.join(process.cwd(), project);
  const file = path.join(process.cwd(), `${project}/package.json`);
  console.log(file);
  if (fs.statSync(file).isFile() && fs.statSync(package).isFile()) {
    const file1 = fs.readFileSync(file, "utf8");
    const pkg1 = JSON.parse(file1);
    console.log(pkg1);
    const file2 = fs.readFileSync(package, "utf8");
    const pkg2 = JSON.parse(file2);
    console.log(pkg2);
    const deps1 = pkg1.dependencies;
    const deps2 = pkg2.dependencies;
    const deps = {};
    const pkg = {...pkg1};
    pkg.dependencies = {...deps, ...deps1, ...deps2};
    pkg.scripts = {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    };
    console.log(pkg);
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log("Updated package.json");
  } else {
    console.log("File not found");
  }
  console.log("******************************************************************************************************");
});

const args = process.argv.slice(2);
event.emit(args[0].toLowerCase());
