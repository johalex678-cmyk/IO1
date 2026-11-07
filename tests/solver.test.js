import {test} from 'node:test';import assert from 'node:assert/strict';import {model,dual,Q} from '../src/math.js';import {solve} from '../src/solver.js';
const cls=()=>model({direction:'max',c:[5,2,4],A:[[1,2,1],[2,-1,3]],b:[10,8],senses:['<=','='],domains:['pos','pos','pos']});
test('Ejemplo completo y tres tablas exactas',()=>{const p=cls(),d=dual(p),s=solve(d);assert.equal(d.A[1].join(','),'2,-1');assert.equal(d.domains[1],'free');assert.equal(s.status,'optimal');assert.equal(s.value.toString(),'154/5');assert.equal(s.x.join(','),'9/5,8/5');assert.equal(s.history.length,3);assert.equal(s.history[1].pivot.toString(),'-2');assert.equal(s.history[1].table.map(r=>r.at(-1)).join(','),'20,5/2,-9/2,7/2');assert.equal(s.history[2].pivot.toString(),'-5/2');assert.equal(s.history[2].candidates.find(c=>c.eligible).ratio.toString(),'12/5');assert.equal(solve(p,'x').x.join(','),'26/5,12/5,0');});
for(const [label,raw,expect]of [
 ['MAX simple',{direction:'max',c:[1],A:[[1]],b:[2],senses:['<='],domains:['pos']},'2'],
 ['MIN simple',{direction:'min',c:[1],A:[[1]],b:[3],senses:['>='],domains:['pos']},'3'],
 ['Variable libre e igualdad negativa',{direction:'max',c:[1],A:[[1]],b:[-1],senses:['='],domains:['free']},'-1'],
 ['No positivo',{direction:'max',c:[-1],A:[[1]],b:[-3],senses:['>='],domains:['neg']},'3'],
 ['Constante',{direction:'min',c:[1],A:[[1]],b:[3],senses:['>='],domains:['pos'],k:'1/3'},'10/3'],
 ['Igualdad redundante',{direction:'min',c:[1],A:[[1],[2]],b:[3,6],senses:['=','='],domains:['free']},'3']])test(label,()=>{const p=model(raw);for(const v of [p,dual(p)]){const s=solve(v);assert.equal(s.status,'optimal');assert.equal(String(s.value),expect);assert.ok(s.check.rows.every(x=>x.ok));}});
test('Infactible',()=>{assert.equal(solve(model({direction:'min',c:[1],A:[[1]],b:[1],senses:['>='],domains:['neg']})).status,'infeasible');});
test('No acotado con variable ausente',()=>{assert.equal(solve(model({direction:'min',c:[-1],A:[],b:[],senses:[],domains:['pos']})).status,'unbounded');assert.equal(solve(model({direction:'min',c:[1],A:[[0]],b:[0],senses:['='],domains:['free']})).status,'unbounded');});
test('Bland resuelve ciclo clásico de Beale',()=>{const s=solve(model({direction:'max',c:[10,-57,-9,-24],A:[['1/2','-11/2','-5/2',9],['1/2','-3/2','-1/2',1],[1,0,0,0]],b:[0,0,1],senses:['<=','<=','<='],domains:['pos','pos','pos','pos']}));assert.equal(s.status,'optimal');assert.equal(String(s.value),'1');});
test('Identidad y objetivo canónico tras cada pivote',()=>{for(const h of solve(dual(cls())).history.slice(1))h.basis.forEach((c,i)=>h.table.forEach((row,j)=>assert.equal(String(row[c]),j===i+1?'1':'0')));});
test('Validación numérica exacta',()=>{assert.equal(String(Q.of('0.1').add('1/5')),'3/10');for(const x of ['', '1/0','NaN','Infinity','2/3/4'])assert.throws(()=>Q.of(x));});
