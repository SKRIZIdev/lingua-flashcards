const known = JSON.parse(localStorage.getItem('lingua.known') || '{}');
const box = document.getElementById('deckList');
box.innerHTML = Object.entries(DECKS).map(([id, d]) => {
  const done = (known[id] || []).length;
  const total = d.cards.length;
  const pct = Math.round(done / total * 100);
  return `<div class="deck-row"><h3>${d.name}</h3>
    <div class="bar"><div style="width:${pct}%"></div></div>
    <small>${done} / ${total} learned · ${pct}%</small></div>`;
}).join('');
function resetAll() {
  UI.confirm('Reset progress for all decks? This can\'t be undone.', { danger: true, ok: 'Reset all' })
    .then(yes => { if (yes) { localStorage.removeItem('lingua.known'); UI.toast('Progress reset', 'info'); setTimeout(() => location.reload(), 500); } });
}
