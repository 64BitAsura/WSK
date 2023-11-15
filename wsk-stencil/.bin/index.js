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
  const folders = [
    path.join(process.cwd(), "wsk-app/packages/stencil-library/src"),
    path.join(process.cwd(), "wsk-app/packages/stencil-library/src/components"),
    path.join(
      process.cwd(),
      "wsk-app/packages/stencil-library/src/components/my-component"
    ),
  ];
  for (const folder of folders) {
    renamer(folder);
  }
});
event.on("stencil", () => {
  const project = args[1] || "stencil-library";
  const file = path.join(
    process.cwd(),
    `wsk-app/packages/${project}/package.json`
  );
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    const build = pkg?.scripts?.build || "stencil build --docs";
    pkg["version"] = "1.0.0";
    pkg.scripts["build"] = `${build} --prod --stats --log --verbose`;
    pkg.scripts["lint"] = "eslint src/**/*{.ts,.tsx}";
    // pkg.scripts["coverage"] = "npx -y jest --coverage";
    pkg.scripts["coverage"] = "npm test -- --coverage";
    pkg.scripts["serve:coverage"] = "npx -y http-server ./coverage/lcov-report -o";
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`${args[0]} package.json updated`);
  } else {
    console.log("File not found");
  }
});
event.on("angular", () => {
  const project = args[1] || "angular-workspace";
  const library = args[2] || "angular-library";
  const file = path.join(
    process.cwd(),
    `wsk-app/packages/${project}/projects/${library}/package.json`
  );
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    pkg["version"] = "1.0.0";
    pkg.peerDependencies["stencil-library"] = "*";
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`${args[0]} peerDependencies updated`);
  } else {
    console.log("File not found");
  }
  const rootPkg = path.join(
    process.cwd(),
    `wsk-app/packages/${project}/package.json`
  );
  if (fs.statSync(rootPkg).isFile()) {
    const content = fs.readFileSync(rootPkg, "utf8");
    const pkg = JSON.parse(content);
    pkg["version"] = "1.0.0";
    pkg.scripts["build:lib"] = "ng build angular-library";
    pkg.dependencies["stencil-library"] = "*";
    fs.writeFileSync(rootPkg, JSON.stringify(pkg, null, 2));
    console.log(`${args[0]} dependencies updated`);
  } else {
    console.log("File not found");
  }
});
event.on("react", () => {
  const project = args[1] || "react-library";
  const file = path.join(
    process.cwd(),
    `wsk-app/packages/${project}/package.json`
  );
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    pkg["main"] = "dist/index.js";
    pkg["module"] = "dist/index.js";
    pkg["types"] = "dist/types/index.d.ts";
    pkg.scripts["build"] = "npm run tsc";
    pkg.scripts["tsc"] = "tsc -p . --outDir ./dist";
    pkg.files = ["dist"];
    pkg["publishConfig"] = { access: "public" };
    pkg["dependencies"] = { "stencil-library": "*" };
    // TODO: update dev deps versions
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`${args[0]} package.json updated`);
  } else {
    console.log("File not found");
  }
});
event.on("react-dist", () => {
  const project = args[1] || "react-library";
  const file = path.join(
    process.cwd(),
    `wsk-app/packages/${project}/dist/package.json`
  );
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    pkg["main"] = "index.js";
    pkg["module"] = "index.js";
    pkg["types"] = "types/index.d.ts";
    delete pkg.scripts.build;
    delete pkg.scripts.tsc;
    delete pkg.files;
    // pkg["publishConfig"] = { access: "public" };
    // pkg["dependencies"] = { "stencil-library": "*" };
    // TODO: move dev deps to peer deps
    // const deps = pkg["devDependencies"];
    // pkg["peerDependencies"] = deps;
    // delete pkg.devDependencies;
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`${args[0]} package.json updated`);
  } else {
    console.log("File not found");
  }
});
event.on("vue", () => {
  const project = args[1] || "vue-library";
  const file = path.join(
    process.cwd(),
    `wsk-app/packages/${project}/package.json`
  );
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    pkg["main"] = "dist/index.js";
    pkg["types"] = "dist/types/index.d.ts";
    pkg.scripts["build"] = "npm run tsc";
    pkg.scripts["tsc"] = "tsc -p . --outDir ./dist";
    pkg.files = ["dist"];
    pkg["publishConfig"] = { access: "public" };
    pkg["dependencies"] = { "stencil-library": "*" };
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`${args[0]} package.json updated`);
  } else {
    console.log("File not found");
  }
});
event.on("vue-dist", () => {
  const project = args[1] || "vue-library";
  const file = path.join(
    process.cwd(),
    `wsk-app/packages/${project}/dist/package.json`
  );
  if (fs.statSync(file).isFile()) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);
    pkg["main"] = "index.js";
    pkg["types"] = "types/index.d.ts";
    delete pkg.scripts.build;
    delete pkg.scripts.tsc;
    delete pkg.files;
    // pkg["publishConfig"] = { access: "public" };
    // pkg["dependencies"] = { "stencil-library": "*" };
    // TODO: move dev deps to peer deps
    // const deps = pkg["devDependencies"];
    // pkg["peerDependencies"] = deps;
    // delete pkg.devDependencies;
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log(`${args[0]} package.json updated`);
  } else {
    console.log("File not found");
  }
});

const args = process.argv.slice(2);
event.emit(args[0].toLowerCase());
