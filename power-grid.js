import {beep,scoreLocal,paintText,seeded} from './engine.js';
const D=[[0,-1],[1,0],[0,1],[-1,0]];
const rot=(mask,angle)=>((mask<<angle)|(mask>>(4-angle)))&15;
function generate(level){
 const N=level<=3?5:level<=7?7:9,rng=seeded(500+level*19);
 const cells=Array.from({length:N*N},()=>({bits:0,angle:0,locked:false,solution:0}));
 // A guaranteed solvable single path with vertical detours.
 const row=Math.floor(N/2),path=[];
 for(let x=0;x<N;x++){
  if(x===0){path.push(row*N);continue}
  if(x>0&&x<N-1&&x%2===1){const r=row+(x%4===1?-1:1);path.push(r*N+x)}
  else path.push(row*N+x);
 }
 // Fill any diagonal change with its vertical/horizontal intermediate cells.
 const routed=[path[0]];
 for(let k=1;k<path.length;k++){
  const a=routed[routed.length-1],b=path[k],ax=a%N,ay=Math.floor(a/N),bx=b%N,by=Math.floor(b/N);
  if(ax!==bx)routed.push(ay*N+bx);
  const ystep=Math.sign(by-ay);
  for(let y=ay+ystep;ystep&&((ystep>0&&y<=by)||(ystep<0&&y>=by));y+=ystep)routed.push(y*N+bx);
 }
 if(routed[routed.length-1]!==row*N+N-1){const current=routed[routed.length-1];let y=Math.floor(current/N),x=current%N;while(y!==row){y+=Math.sign(row-y);routed.push(y*N+x)}while(x<N-1){x++;routed.push(y*N+x)}}
 for(let i=0;i<routed.length-1;i++){
  const a=routed[i],b=routed[i+1],dx=b%N-a%N,dy=Math.floor(b/N)-Math.floor(a/N),d=D.findIndex(([xx,yy])=>xx===dx&&yy===dy);
  if(d<0)continue;cells[a].bits|=1<<d;cells[b].bits|=1<<((d+2)%4);
 }
 for(let i=0;i<cells.length;i++){
  if(!cells[i].bits){cells[i].bits=[3,5,6,9,12][Math.floor(rng()*5)];if(level>4&&rng()<.08){cells[i].locked=true;cells[i].angle=0;continue}}
  cells[i].angle=Math.floor(rng()*4);cells[i].solution=0;
 }
 const source=routed[0],sink=routed[routed.length-1];
 cells[source].angle=0;cells[source].solution=0;cells[sink].angle=0;cells[sink].solution=0;
 // Edges are implicit: only the source -> destination path matters.
 return {N,cells,source,sink,rotations:0,routed};
}
export function startPower(root,onComplete){
 let level=1,total=0,state=generate(1),start=performance.now(),stopped=false,hints=0;
 root.innerHTML=`<div class="arcade-stats" id="grid-stats"></div><div class="power-board"><canvas width="540" height="540" class="arcade-canvas" aria-label="Электрическая схема" role="img"></canvas><div class="power-hitgrid" role="group" aria-label="Поворачиваемые клетки схемы"></div></div><div class="arcade-actions"><button type="button" class="arcade-btn" id="grid-check">⚡ ПОДАТЬ ТОК</button><button type="button" class="arcade-btn" id="grid-hint">💡 ПОДСКАЗКА</button><button type="button" class="arcade-btn" id="grid-reset">↻ ЗАНОВО</button></div><p class="arcade-note" id="grid-msg" role="status">Поворачивай плитки, соедини ЖЁЛТУЮ S с РОЗОВОЙ E. Светящиеся провода под напряжением.</p>`;
 const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d'),msg=root.querySelector('#grid-msg'),stats=root.querySelector('#grid-stats'),hitgrid=root.querySelector('.power-hitgrid');ctx.imageSmoothingEnabled=false;
 function flow(){const {N,cells,source,sink}=state,q=[source],seen=new Set([source]);for(let k=0;k<q.length;k++){
  const i=q[k],x=i%N,y=Math.floor(i/N),m=rot(cells[i].bits,cells[i].angle);
  for(let d=0;d<4;d++)if(m&(1<<d)){const xx=x+D[d][0],yy=y+D[d][1];if(xx<0||xx>=N||yy<0||yy>=N)continue;const j=yy*N+xx;if(!seen.has(j)&&(rot(cells[j].bits,cells[j].angle)&(1<<((d+2)%4)))){seen.add(j);q.push(j)}}
 }return {seen,success:seen.has(sink)}}
 function draw(){if(stopped)return;const {N,cells,source,sink}=state,size=540/N,active=flow();ctx.fillStyle='#081925';ctx.fillRect(0,0,540,540);
  cells.forEach((c,i)=>{const x=i%N*size,y=Math.floor(i/N)*size,cx=x+size/2,cy=y+size/2,lit=active.seen.has(i);ctx.fillStyle=c.locked?'#303a43':lit?'#174b40':'#142b3c';ctx.fillRect(x+2,y+2,size-4,size-4);ctx.strokeStyle=i===source?'#f7d867':i===sink?'#fa90d2':'#36556e';ctx.lineWidth=i===source||i===sink?3:1;ctx.strokeRect(x+4,y+4,size-8,size-8);ctx.lineWidth=Math.max(6,size/9);ctx.strokeStyle=lit?'#80f6ac':'#8bb5db';ctx.beginPath();let m=rot(c.bits,c.angle);for(let d=0;d<4;d++)if(m&(1<<d)){ctx.moveTo(cx,cy);ctx.lineTo(cx+D[d][0]*size*.47,cy+D[d][1]*size*.47)}ctx.stroke();ctx.fillStyle=i===source?'#ffe977':i===sink?'#f48bd1':'#e4fbf4';ctx.fillRect(cx-5,cy-5,10,10);if(i===source||i===sink)paintText(ctx,i===source?'S':'E',cx-5,cy+size*.34,Math.max(12,size*.2),'#fff')});
  stats.textContent=`УРОВЕНЬ ${level}/10  ·  ОЧКИ ${total}  ·  ПОВОРОТЫ ${state.rotations}  ·  ТОК ${active.seen.size}/${N*N}`;
 }
 function rotateCell(i){if(stopped)return;const c=state.cells[i];if(!c||c.locked){msg.textContent='Эта клетка заблокирована.';return}c.angle=(c.angle+1)%4;state.rotations++;beep(390,.04);draw();msg.textContent=flow().success?'Цепь соединена! Нажми «ПОДАТЬ ТОК», чтобы перейти дальше.':`Клетка ${Math.floor(i/state.N)+1}:${i%state.N+1} повёрнута. Поворотов: ${state.rotations}.`}
 function mountGrid(){hitgrid.replaceChildren();hitgrid.style.gridTemplateColumns=`repeat(${state.N},1fr)`;hitgrid.style.gridTemplateRows=`repeat(${state.N},1fr)`;state.cells.forEach((c,i)=>{const button=document.createElement('button');button.type='button';button.className='power-cell-button';button.setAttribute('aria-label',`Повернуть клетку ${Math.floor(i/state.N)+1}, ${i%state.N+1}`);button.title=`Повернуть клетку (${Math.floor(i/state.N)+1}, ${i%state.N+1})`;button.disabled=!!c.locked;button.addEventListener('click',()=>rotateCell(i));hitgrid.append(button)})}
 mountGrid();
 function check(){if(stopped)return;if(!flow().success){msg.textContent='Ток не доходит до E. Проверь повороты и воспользуйся подсказкой.';beep(140,.15);return}let secs=(performance.now()-start)/1000,pts=Math.max(200,Math.min(1000,920-Math.floor(secs*2)-state.rotations*5-hints*70));total+=pts;beep(720,.17);if(level===10){stopped=true;scoreLocal('power',total);msg.textContent=`ПОБЕДА! ${total} очков.`;onComplete('power',total);return}level++;state=generate(level);mountGrid();start=performance.now();hints=0;msg.textContent=`Верно! +${pts} очков. Уровень ${level}: соединяй S → E.`;draw()}
 function hint(){if(stopped)return;const target=state.routed.find(i=>!state.cells[i].locked&&state.cells[i].angle!==state.cells[i].solution);if(target===undefined){msg.textContent='Правильный путь уже собран. Нажми «ПОДАТЬ ТОК».';return}const c=state.cells[target];c.angle=c.solution;state.rotations++;hints++;beep(600,.08);draw();msg.textContent=`Подсказка: плитка в ряду ${Math.floor(target/state.N)+1}, столбце ${target%state.N+1} повернута правильно (штраф к бонусу).`}
 const a=root.querySelector('#grid-check'),b=root.querySelector('#grid-hint'),c=root.querySelector('#grid-reset');a.addEventListener('click',check);b.addEventListener('click',hint);c.addEventListener('click',()=>{state=generate(level);mountGrid();start=performance.now();hints=0;draw();msg.textContent='Уровень сброшен. Соедини S → E.'});draw();return()=>{stopped=true;hitgrid.replaceChildren()};
}
