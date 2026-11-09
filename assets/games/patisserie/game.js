import { Puzzle, COLS, ROWS } from './engine.mjs';
const $ = id => document.getElementById(id);
const board = $('board'), ctx = board.getContext('2d'), preview = $('next').getContext('2d');
const game = new Puzzle();
const words = {
 ja: {intro:'フランスの小さなお菓子屋さんへ。スイーツのピースを並べて、横一列を完成させましょう。',score:'スコア',lines:'消した列',level:'レベル',next:'つぎのお菓子',start:'あそぶ',resume:'つづける',pause:'一時停止',restart:'はじめから',drop:'一気に落とす',ready:'ケーキ、ドーナツ、パフェ。甘いパズルの時間です。',paused:'ちょっとひと休み',over:'ショーケースがいっぱい！',again:'もう一度あそぶ',help:'← → 移動 · ↑ 回転 · ↓ ゆっくり落とす · Space 一気に落とす · P 一時停止。キーボード操作は盤面を選んでから。下のボタンでも遊べます。',foot:'横一列で消去。同じお菓子をそろえる必要はありません。デモ版・音なし。',left:'左へ',right:'右へ',rotate:'回転',down:'下へ',board:'お菓子の落ちものパズルの盤面'},
 es: {intro:'Una pequeña pastelería francesa. Acomoda los dulces y completa filas horizontales.',score:'Puntos',lines:'Filas',level:'Nivel',next:'Siguiente',start:'Jugar',resume:'Continuar',pause:'Pausa',restart:'Reiniciar',drop:'Soltar',ready:'Pasteles, donuts y parfaits. Es hora de un dulce rompecabezas.',paused:'Un pequeño descanso',over:'¡La vitrina está llena!',again:'Volver a jugar',help:'← → mover · ↑ girar · ↓ bajar · Espacio soltar · P pausa. Selecciona el tablero para usar el teclado, o juega con los botones.',foot:'Completa filas; no necesitas juntar dulces iguales. Demo sin sonido.',left:'Izquierda',right:'Derecha',rotate:'Girar',down:'Bajar',board:'Tablero del rompecabezas de dulces'},
 en: {intro:'A little French pâtisserie. Arrange the sweets and complete horizontal rows.',score:'Score',lines:'Lines',level:'Level',next:'Next sweet',start:'Play',resume:'Resume',pause:'Pause',restart:'Restart',drop:'Drop',ready:'Cakes, doughnuts and parfaits. Time for a sweet little puzzle.',paused:'A little tea break',over:'The showcase is full!',again:'Play again',help:'← → move · ↑ rotate · ↓ soft drop · Space drop · P pause. Select the board to use the keyboard, or use the buttons.',foot:'Complete rows; sweets do not need to match. Silent playable demo.',left:'Left',right:'Right',rotate:'Rotate',down:'Down',board:'Falling sweets puzzle board'}
};
let lang = 'ja', state = 'ready', elapsed = 0, last = 0, frame = null;
let repeat = null;
const palettes = ['#f6b8c9','#bce0d4','#c7b8ec','#eed39c','#e8aa8a','#a9cee9','#edb4db'];
function round(c,x,y,w,h,r,fill) {c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function ellipse(c,x,y,rx,ry,fill) {c.fillStyle=fill;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
// Original vector sweets, drawn locally: no fonts, image downloads or third-party assets.
function sweet(c, type, x, y, size) {
 c.save(); c.translate(x,y); c.scale(size/32,size/32);
 round(c,1,1,30,30,5,palettes[type-1]);
 round(c,3,3,26,25,4,'#ffffff35');
 if(type===1 || type===3 || type===7) {
  round(c,6,15,20,11,2,type===3?'#78503d':'#c79363');
  round(c,6,18,20,3,1,'#fff1cf');
  round(c,5,11,22,7,3,type===3?'#573224':'#fff7e1');
  for(let i=0;i<3;i++) ellipse(c,9+i*7,11,4,3,'#fff6ea');
  ellipse(c,16,7,3,4,'#d94665'); ellipse(c,17,6,1,1,'#ffb3af');
  c.fillStyle='#6a8f58'; c.fillRect(15,2,2,3);
 } else if(type===2) {
  ellipse(c,16,17,11,9,'#bc7c41'); ellipse(c,16,15,11,8,'#f59caf');
  ellipse(c,16,15,4,3,'#bce0d4');
  for(let i=0;i<7;i++){c.fillStyle=['#fff8d4','#8e689f','#7eafaa'][i%3];c.fillRect(8+(i*7)%17,10+(i*3)%11,3,1.5);}
 } else if(type===4) {
  round(c,6,7,20,20,3,'#653e32');
  for(let j=0;j<2;j++)for(let i=0;i<2;i++)round(c,8+i*9,9+j*8,7,6,1,'#9d6950');
  round(c,6,23,20,5,1,'#e7b657');
 } else if(type===5) {
  c.fillStyle='#e6f8ff';c.beginPath();c.moveTo(7,12);c.lineTo(25,12);c.lineTo(20,26);c.lineTo(12,26);c.fill();
  round(c,11,15,10,4,1,'#dd728f');round(c,12,20,8,3,1,'#c89353');
  ellipse(c,16,11,10,4,'#fff9e7');ellipse(c,16,7,6,4,'#fff9e7');
  ellipse(c,19,5,3,3,'#d94c60');c.fillStyle='#c4a16a';c.fillRect(15,25,2,3);c.fillRect(11,28,10,2);
 } else {
  ellipse(c,16,12,11,6,'#d8bc8e');round(c,5,13,22,6,2,'#fff2d6');ellipse(c,16,19,11,6,'#d8bc8e');ellipse(c,16,11,9,4,'#fff6d8');
  for(let i=0;i<3;i++)ellipse(c,10+i*6,11,2,2,'#8b6a9f');
 }
 c.restore();
}
function draw() {
 ctx.fillStyle='#38253b';ctx.fillRect(0,0,320,576);
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++) {
  round(ctx,x*32+1,y*32+1,30,30,4,(x+y)%2?'#493249':'#422c43');
  if(game.board[y][x])sweet(ctx,game.board[y][x],x*32,y*32,32);
 }
 if(!game.over) {
  const p=game.piece, gy=game.ghostY();
  ctx.save();ctx.globalAlpha=.23;
  p.cells.forEach((r,dy)=>r.forEach((v,dx)=>{if(v)sweet(ctx,p.color,(p.x+dx)*32,(gy+dy)*32,32);}));ctx.restore();
  p.cells.forEach((r,dy)=>r.forEach((v,dx)=>{if(v)sweet(ctx,p.color,(p.x+dx)*32,(p.y+dy)*32,32);}));
 }
 preview.clearRect(0,0,144,96);
 const n=game.next, ox=(144-n.cells[0].length*28)/2, oy=(96-n.cells.length*28)/2;
 n.cells.forEach((r,y)=>r.forEach((v,x)=>{if(v)sweet(preview,n.color,ox+x*28,oy+y*28,28);}));
 $('score').textContent=game.score; $('lines').textContent=game.lines; $('level').textContent=game.level;
}
function labels() {
 const w=words[lang];document.documentElement.lang=lang;
 for(const id of ['intro','help','foot','restart','drop'])$(id).textContent=w[id];
 document.querySelectorAll('[data-copy]').forEach(n=>n.textContent=w[n.dataset.copy]);
 document.querySelectorAll('[data-action]').forEach(n=>n.setAttribute('aria-label',w[n.dataset.action]||w.drop));
 board.setAttribute('aria-label',w.board);$('next').setAttribute('aria-label',w.next);
 document.querySelectorAll('[data-lang]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.lang===lang)));
 $('pause').textContent=state==='paused'?w.resume:w.pause;
 $('pause').disabled=state==='ready'||state==='over';
 $('veil').hidden=state==='running';
 $('message').textContent=w[state]||'';
 $('start').textContent=state==='over'?w.again:state==='paused'?w.resume:w.start;
}
function stopRepeat(){clearInterval(repeat);repeat=null;}
function setState(value) {
 state=value;stopRepeat();cancelAnimationFrame(frame);frame=null;labels();
 if(state==='running'){last=performance.now();elapsed=0;frame=requestAnimationFrame(tick);}
}
function tick(time) {
 if(state!=='running')return;
 elapsed+=Math.min(time-last,100);last=time;
 if(elapsed>=game.delay){elapsed=0;game.step();draw();if(game.over){setState('over');return;}}
 frame=requestAnimationFrame(tick);
}
function action(name) {
 if(state!=='running')return;
 if(name==='left')game.move(-1,0);
 if(name==='right')game.move(1,0);
 if(name==='rotate')game.rotate();
 if(name==='down')game.step(true);
 if(name==='drop'){game.drop();elapsed=0;}
 draw();if(game.over)setState('over');
}
function start() {if(state==='over')game.reset();setState('running');draw();board.focus({preventScroll:true});}
$('start').addEventListener('click',start);
$('pause').addEventListener('click',()=>{setState(state==='running'?'paused':'running');board.focus({preventScroll:true});});
$('restart').addEventListener('click',()=>{game.reset();draw();setState('running');board.focus({preventScroll:true});});
board.addEventListener('keydown',e=>{
 const mapping={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'rotate',ArrowDown:'down',' ':'drop'};
 if(mapping[e.key]){e.preventDefault();if(!e.repeat||![' ','ArrowUp'].includes(e.key))action(mapping[e.key]);}
 if(e.key.toLowerCase()==='p'&&!e.repeat){e.preventDefault();if(state==='running'||state==='paused')setState(state==='running'?'paused':'running');}
});
// Native clicks support keyboard and assistive technology; pointer holds repeat movement.
let suppressClick=false;
document.querySelectorAll('[data-action]').forEach(button=>{
 button.addEventListener('pointerdown',e=>{
  if(e.button!==0)return;
  stopRepeat();suppressClick=true;button.setPointerCapture(e.pointerId);action(button.dataset.action);
  if(['left','right','down'].includes(button.dataset.action))repeat=setInterval(()=>action(button.dataset.action),125);
 });
 button.addEventListener('click',()=>{if(!suppressClick)action(button.dataset.action);suppressClick=false;board.focus({preventScroll:true});});
 button.addEventListener('pointerup',stopRepeat);
 button.addEventListener('pointercancel',()=>{stopRepeat();suppressClick=false;});
 button.addEventListener('lostpointercapture',stopRepeat);
});
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{lang=button.dataset.lang;labels();}));
function autoPause(){if(state==='running')setState('paused');}
window.addEventListener('blur',autoPause);
document.addEventListener('visibilitychange',()=>{if(document.hidden)autoPause();});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)autoPause();},{threshold:0}).observe(board);
window.addEventListener('pagehide',()=>{stopRepeat();cancelAnimationFrame(frame);});
labels();draw();
