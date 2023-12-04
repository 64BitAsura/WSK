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
event.on("update-pkg", () => {
  const project = args[1] || "wsk-app";
  const folder = path.join(process.cwd(), project);
  const pkg = path.join(folder, "package.json");
  const tmp = path.join(folder, "template.json");
  // const package = Object.assign(
  //   JSON.parse(fs.readFileSync(pkg, "utf8")),
  //   JSON.parse(fs.readFileSync(tmp, "utf8")).package
  // );
  const content = {
    pkg: JSON.parse(fs.readFileSync(pkg, "utf8")),
    tmp: JSON.parse(fs.readFileSync(tmp, "utf8")).package
  };
  const package = content.pkg;
  package.dependencies = {
    ...content.pkg.dependencies,
    ...content.tmp.dependencies
  };
  package.scripts = {
    ...content.pkg.scripts,
    ...content.tmp.scripts
  };
  package.eslintConfig = content.tmp.eslintConfig;
  package.browserslist = content.tmp.browserslist;
  fs.writeFileSync(pkg, JSON.stringify(package, null, 2));
  fs.unlinkSync(tmp);
});
event.on("merge", () => {
  const project = args[1] || "wsk-app";
  const folder = path.join(process.cwd(), project);
  const pkg = path.join(folder, "package.json");
  const tmp = path.join(folder, "template.json");
  const package = Object.assign(
    JSON.parse(fs.readFileSync(pkg, "utf8")),
    JSON.parse(fs.readFileSync(tmp, "utf8")).package
  );
  fs.writeFileSync(pkg, JSON.stringify(package, null, 2));
  fs.unlinkSync(tmp);
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
event.on("pkg", () => {
  // TODO: find the react, react-dom, & react-script versions
  // TODO: copy template.json from cra-template-typescript
  // TODO: add package object wrapper to the template.json 
  // TODO: add version and private to template.json
  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
  // Installing ${chalk.cyan('react')}
  // Installing react, react-dom, and react-scripts...
  allDependencies.push(
    '@types/node',
    '@types/react',
    '@types/react-dom',
    '@types/jest',
    'typescript'
  );
  // template.json
  // "dependencies": {
  //   "@types/node": "^12.0.0",
  //   "@types/react": "^16.9.0",
  //   "@types/react-dom": "^16.9.0",
  //   "@types/jest": "^24.0.0",
  //   "typescript": "^3.6.0"
  // }
  const appPackage = require(path.join(appPath, 'package.json'));
  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};

  // Setup the script rules
  appPackage.scripts = {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
    eject: 'react-scripts eject',
  };

  // Setup the eslint config
  appPackage.eslintConfig = {
    extends: 'react-app',
  };

  // "react-dev-utils": "^9.1.0",
  const { defaultBrowsers } = require('react-dev-utils/browsersHelper');
  // Setup the browsers list
  appPackage.browserslist = defaultBrowsers;

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2) + os.EOL
  );

  fs.moveSync(
    path.join(appPath, 'gitignore'),
    path.join(appPath, '.gitignore'),
    []
  );

  // Install additional template dependencies, if present
  let templateJsonPath;
  if (templateName) {
    templateJsonPath = path.join(templatePath, 'template.json');
  } else {
    templateJsonPath = path.join(appPath, '.template.dependencies.json');
  }

  if (fs.existsSync(templateJsonPath)) {
    const templateDependencies = require(templateJsonPath).dependencies;
    args = args.concat(
      Object.keys(templateDependencies).map(key => {
        return `${key}@${templateDependencies[key]}`;
      })
    );
    fs.unlinkSync(templateJsonPath);
  }
  // TODO: TS Setup

});

const args = process.argv.slice(2);
event.emit(args[0].toLowerCase());
