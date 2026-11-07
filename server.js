import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(), port=Number(process.env.PORT||5173);
http.createServer(async(req,res)=>{try{
const url=decodeURIComponent(req.url.split('?')[0]);
if(!['/','/index.html','/style.css'].includes(url)&&!/^\/src\/[a-z-]+\.js$/.test(url))throw Error();
const file=path.resolve(root,'.'+(url==='/'?'/index.html':url));
const data=await readFile(file);
res.setHeader('Content-Type',({'html':'text/html; charset=utf-8','js':'text/javascript; charset=utf-8','css':'text/css; charset=utf-8'})[file.split('.').pop()]||'application/octet-stream');
res.setHeader('X-Content-Type-Options','nosniff');res.end(data);
}catch{res.writeHead(404);res.end('No encontrado');}}).listen(port,'0.0.0.0',()=>console.log(`Simplex Aula en puerto ${port}`));
