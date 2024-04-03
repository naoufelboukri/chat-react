import * as fs from 'fs';
import { program } from 'commander';
import { log, generateTsx } from './function.mjs';

program
    .version('1.0.0')
    .option('-d, --dto', 'Use DTO interface')
    .option('-s, --style', 'Add scss file')
    .arguments('<directory>')
    .arguments('<componentName>')
    .parse(process.argv);

const directory = program.args[0];
const componentName = program.args[1];

if (!componentName || !directory) {
    log('Usage: node createComponent.js <ComponentName> <directory>', 'error');
}
const dto = program.opts().dto;
const style = program.opts().style;

let dirPath = process.cwd()+'/src/'+directory;
if (style) {
    dirPath += '/'+componentName;
}

if (fs.existsSync(dirPath) && style) {
    log('Error: Component '+componentName+' already exists in '+ dirPath, 'error');
}
if (style) {
    const arrayPath = Array(directory.split('/').length).fill('..').join('/');
    const relativePath = arrayPath.endsWith('/') ? arrayPath : arrayPath + '/';
    fs.mkdirSync(dirPath);
    fs.writeFileSync(dirPath+'/'+componentName+'.css',
        `.${componentName} {\n\n}`);
}
fs.writeFileSync(dirPath+'/'+componentName+'.jsx', generateTsx(componentName, dto, style));

log(`Component "${componentName}" created successfully.`, 'success');