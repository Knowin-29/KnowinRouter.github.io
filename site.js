const tabs = [...document.querySelectorAll('[data-panel]')];
function selectTab(tab) {
  for (const item of tabs) {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(`panel-${item.dataset.panel}`).hidden = !active;
  }
}
for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let index = tabs.indexOf(tab) + (event.key === 'ArrowRight' ? 1 : -1);
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = tabs.length - 1;
    const next = tabs[(index + tabs.length) % tabs.length];
    selectTab(next); next.focus();
  });
}
const steps = [
  ['Select a complete route', 'The router jointly selects the Spatial Reasoning expert, a reference-frame template and grounding. The finite budget is checked before any provider runs.', 'mode: illustrative / synthetic\nexpert: Spatial Reasoning\nknowledge: reference-frame template\ntools: [grounding]\nanswer_generations: 0'],
  ['Acquire each selected provider once', 'A template and a grounding packet return. Each packet records content, coverage, confidence, ambiguity, provenance and cost. There is no second acquisition round.', 'mode: illustrative / synthetic\nprovider_calls: {template: 1, grounding: 1}\npackets: [template, grounding]\nanswer_generations: 0\nretries: 0'],
  ['Inspect packets, not candidate answers', 'In this illustration, ambiguous grounding is rejected while useful knowledge is retained. The verifier compares valid subsets to null with the incurred acquisition cost held fixed.', 'mode: illustrative / synthetic\nretained: [template]\nrejected: [grounding: ambiguous]\nexpert: Spatial Reasoning (unchanged)\ncandidate_answers_generated: 0'],
  ['Generate once from the committed input', 'The selected expert receives the original observation plus retained knowledge. No fabricated answer is shown here. If every packet were rejected, it would receive its original evidence-free input.', 'mode: illustrative / synthetic\ninput: original observation + template\nexpert: Spatial Reasoning (unchanged)\nfinal_answer_calls: 1\nmodel_output: not simulated']
];
for (const button of document.querySelectorAll('[data-step]')) {
  button.addEventListener('click', () => {
    for (const other of document.querySelectorAll('[data-step]')) other.setAttribute('aria-pressed', String(other === button));
    const [title, description, trace] = steps[Number(button.dataset.step)];
    document.getElementById('trace-title').textContent = title;
    document.getElementById('trace-description').textContent = description;
    document.getElementById('trace-code').textContent = trace;
  });
}
document.getElementById('copy-citation').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(document.getElementById('bibtex').textContent);
    status.textContent = 'BibTeX copied.';
  } catch {
    status.textContent = 'Select and copy the BibTeX text above.';
  }
});
