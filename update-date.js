import fs from 'fs';
// Actualiza la versión y fecha en un archivo separado
const versionFilePath = './src/version.js';
const version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
const updatedDate = new Date().toISOString().split('T')[0];

const content = `export const appVersion = "${version}";\nexport const updatedDate = "${updatedDate}";\n`;
fs.writeFileSync(versionFilePath, content);

console.log('¡Archivo de versión actualizado con éxito!');