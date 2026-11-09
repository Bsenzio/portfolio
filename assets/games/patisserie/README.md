# Pâtisserie Puzzle

Self-contained falling-block demo, with original Canvas illustrations and no external dependencies.
Open through a local HTTP server. The board receives keyboard input only when focused; the game
starts on request and pauses when hidden or when its window loses focus.

- `engine.mjs`: board, seven-piece bag, rotation, collision, scoring and levels.
- `game.js`: rendering, Japanese/Spanish/English labels, keyboard and pointer controls.
- `style.css` and `index.html`: responsive layout and accessible HTML controls.

Run the engine regression checks from the repository root:

```sh
node tests/patisserie-engine.mjs
```

The trusted demo registry in `js/blog.js` embeds this page after the article body only for
`retroarcdo-four-game-ideas`. The iframe is removed when the article changes, which ends its game
and listeners. Keep future demos in their own asset directories and register them by article slug;
TXT story files remain content only.
