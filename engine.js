export const $=(sel,root=document)=>root.querySelector(sel);
export const html=(s)=>{const div=document.createElement('div');div.innerHTML=s;return div;};
export const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
export const random=(n)=>Math.floor(Math.random()*n);
export function beep(freq=440,duration=.08,type='square',volume=.06){try{const ctx=window.__arcadeAudio||(window.__arcadeAudio=new(window.AudioContext||window.webkitAudioContext)());const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,ctx.currentTime);gain.gain.setValueAtTime(volume,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+duration);osc.connect(gain).connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+duration);}catch{}}
export function explosion(){for(let i=0;i<8;i++)setTimeout(()=>beep(170-i*16,.22,'sawtooth',.12),i*65)}
export function paintText(ctx,t,x,y,size=12,color='#defbde'){ctx.fillStyle=color;ctx.font=`bold ${size}px monospace`;ctx.fillText(t,x,y)}
export function scoreLocal(game,score){let data={};try{data=JSON.parse(localStorage.getItem('energy-arcade-scores')||'{}')}catch{}data[game]=Math.max(data[game]||0,Math.max(0,Math.floor(score)));try{localStorage.setItem('energy-arcade-scores',JSON.stringify(data))}catch{}return data[game]}
export function getLocal(){try{return JSON.parse(localStorage.getItem('energy-arcade-scores')||'{}')}catch{return {}}}
export function seeded(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/4294967296}}
