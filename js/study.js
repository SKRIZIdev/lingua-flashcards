const $ = id => document.getElementById(id);
const KEY = 'lingua.known';
let known = JSON.parse(localStorage.getItem(KEY) || '{}');   // {deckId:[indices]}
let deckId, queue = [], current = null;

function saveKnown() { localStorage.setItem(KEY, JSON.stringify(known)); }

function buildQueue() {
  const done = known[deckId] || [];
  queue = DECKS[deckId].cards.map((_, i) => i).filter(i => !done.includes(i));
  next();
}
function next() {
  const total = DECKS[deckId].cards.length;
  $('counter').textContent = `${total - queue.length} / ${total}`;
  $('card').classList.remove('flipped');
  $('frontLang').textContent = DECKS[deckId].lang;
  if (!queue.length) {
    $('front').textContent = '🎉 Deck complete!';
    $('back').textContent = 'Nice work.';
    current = null; return;
  }
  current = queue[0];
  const [f, b] = DECKS[deckId].cards[current];
  $('front').textContent = f; $('back').textContent = b;
}
function flip() { if (current !== null) $('card').classList.toggle('flipped'); }
function grade(gotIt) {
  if (current === null) return;
  if (gotIt) { (known[deckId] = known[deckId] || []).push(current); saveKnown(); queue.shift(); }
  else { queue.push(queue.shift()); }               // move to back
  next();
}
$('card').onclick = flip;

// init deck selector
const sel = $('deck');
Object.entries(DECKS).forEach(([id, d]) => sel.add(new Option(d.name, id)));
sel.onchange = () => { deckId = sel.value; buildQueue(); };
deckId = sel.value; buildQueue();
