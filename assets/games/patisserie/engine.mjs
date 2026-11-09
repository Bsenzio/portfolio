export const COLS = 10, ROWS = 18;
const SHAPES = [
 [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]],
 [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]],
 [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]],
];
export class Puzzle {
 constructor(random = Math.random) { this.random = random; this.reset(); }
 reset() {
  this.board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  this.bag = []; this.score = 0; this.lines = 0; this.over = false;
  this.next = this.take(); this.spawn();
 }
 take() {
  if (!this.bag.length) {
   this.bag = SHAPES.map((_, i) => i);
   for (let i = this.bag.length - 1; i > 0; i--) {
    const j = Math.floor(this.random() * (i + 1));
    [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
   }
  }
  const type = this.bag.pop();
  return {cells: SHAPES[type].map(r => [...r]), color: type + 1};
 }
 spawn() {
  this.piece = this.next; this.next = this.take();
  this.piece.x = Math.floor((COLS - this.piece.cells[0].length) / 2);
  this.piece.y = 0;
  if (!this.fits(this.piece.cells, this.piece.x, 0)) this.over = true;
 }
 fits(cells, x, y) {
  return cells.every((r, dy) => r.every((v, dx) => !v ||
   (x + dx >= 0 && x + dx < COLS && y + dy >= 0 && y + dy < ROWS && !this.board[y + dy][x + dx])));
 }
 move(dx, dy) {
  if (this.over || !this.fits(this.piece.cells, this.piece.x + dx, this.piece.y + dy)) return false;
  this.piece.x += dx; this.piece.y += dy; return true;
 }
 rotate() {
  if (this.over) return false;
  const cells = this.piece.cells[0].map((_, x) => this.piece.cells.map(r => r[x]).reverse());
  for (const kick of [0, -1, 1, -2, 2, -3, 3]) {
   if (this.fits(cells, this.piece.x + kick, this.piece.y)) {
    this.piece.cells = cells; this.piece.x += kick; return true;
   }
  }
  return false;
 }
 get level() { return 1 + Math.floor(this.lines / 10); }
 get delay() { return Math.max(120, 850 - (this.level - 1) * 65); }
 ghostY() {
  let y = this.piece.y;
  while (this.fits(this.piece.cells, this.piece.x, y + 1)) y++;
  return y;
 }
 clearLines() {
  const remaining = this.board.filter(r => r.some(v => !v));
  const count = ROWS - remaining.length;
  this.score += [0, 100, 300, 500, 800][count] * this.level;
  this.lines += count;
  this.board = [...Array.from({length: count}, () => Array(COLS).fill(0)), ...remaining];
  return count;
 }
 lock() {
  if (this.over) return 0;
  const p = this.piece;
  p.cells.forEach((r, dy) => r.forEach((v, dx) => { if (v) this.board[p.y + dy][p.x + dx] = p.color; }));
  const cleared = this.clearLines(); this.spawn(); return cleared;
 }
 step(soft = false) {
  if (this.over) return 0;
  if (this.move(0, 1)) { if (soft) this.score++; return 0; }
  return this.lock();
 }
 drop() {
  if (this.over) return 0;
  const y = this.ghostY(); this.score += (y - this.piece.y) * 2;
  this.piece.y = y; return this.lock();
 }
}
