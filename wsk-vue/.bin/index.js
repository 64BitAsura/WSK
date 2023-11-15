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
  const folder = path.join(process.cwd(), "wsk-app/src");
  renamer(folder);
});
event.on("install", () => {
  const file = path.join(process.cwd(), "wsk-app/package.json");
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    pkg.dependencies["vue-library"] = "*";
    pkg.dependencies["stencil-library"] = "*";
    pkg.scripts["serve"] = "vite --open";
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`Updated package.json`);
  } else {
    console.log("File not found");
  }
});

const args = process.argv.slice(2);
event.emit(args[0].toLowerCase());
