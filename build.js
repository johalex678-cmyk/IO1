import {mkdir,copyFile,cp,writeFile} from 'node:fs/promises';
const output=process.argv.includes('--pages')?'docs':'dist';
await mkdir(output,{recursive:true});
for(const f of ['index.html','style.css'])await copyFile(f,`${output}/${f}`);
await cp('src',`${output}/src`,{recursive:true});
await writeFile(`${output}/.nojekyll`,'');
console.log(`Sitio generado en ${output}/`);
