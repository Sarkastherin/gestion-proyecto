import fs from 'fs';
const versionFilePath = './src/version.js';
const version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
const updatedDate = new Date().toISOString().split('T')[0];
console.log(updatedDate)
const content = `export const appVersion = "${version}";\nexport const updatedDate = "${updatedDate}";\n`;
fs.writeFileSync(versionFilePath, content);

console.log('¡Archivo de versión actualizado con éxito!');