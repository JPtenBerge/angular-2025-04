import fs from 'fs/promises';

if(process.argv.length < 3) {
  console.error('Usage: node switch-test-runner.mjs <jest|karma>');
  process.exit(1);
}

const angularJsonUrl = new URL('../angular.json', import.meta.url);
const angularJson = JSON.parse(await fs.readFile(angularJsonUrl, "utf-8"));
angularJson.projects.datepicker.architect.test.builder = `@angular-devkit/build-angular:${process.argv[2]}`;
await fs.writeFile(angularJsonUrl, JSON.stringify(angularJson, null, 2));
