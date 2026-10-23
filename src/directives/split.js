// Divide o texto do elemento em palavras e caracteres (<span>) para animações
// caractere a caractere, preservando filhos como <em> e <strong>.
//
// Modos (valor da diretiva):
//   'reveal' (padrão) — os caracteres entram em onda quando o elemento aparece;
//   'scroll' — a entrada acompanha o progresso --p (usar junto com v-progress);
//   'manual' — só divide; o CSS do componente decide quando revelar.
//
// O HTML estático mantém o texto inteiro (bom para SEO); a divisão acontece
// só no navegador. Leitores de tela recebem o texto original.

const PUNCTUATION = /^[.,;:!?…)\]"”’]+/;

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(onIntersect, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' })
    : null;

function onIntersect(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.dataset.splitShown = '';
    observer.unobserve(entry.target);
  });
}

function makeChar(ch, state) {
  const char = document.createElement('span');
  char.className = 'split-char';
  char.style.setProperty('--i', state.i++);
  char.textContent = ch;
  return char;
}

function makeWord(text, state) {
  const word = document.createElement('span');
  word.className = 'split-word';
  for (const ch of text) word.appendChild(makeChar(ch, state));
  return word;
}

function splitText(textNode, state) {
  let text = textNode.textContent;
  const prev = textNode.previousSibling;

  // Pontuação colada a um elemento anterior (ex.: "<em>matemática</em>.")
  // não pode cair sozinha na linha seguinte: entra na última palavra do
  // elemento, mas com a cor do texto ao redor (--split-color).
  const punct = text.match(PUNCTUATION);
  const lastWord = prev?.nodeType === Node.ELEMENT_NODE
    ? [...prev.querySelectorAll('.split-word')].pop()
    : null;
  if (punct && lastWord) {
    for (const ch of punct[0]) {
      const char = makeChar(ch, state);
      char.style.color = 'var(--split-color)';
      lastWord.appendChild(char);
    }
    text = text.slice(punct[0].length);
  }

  const frag = document.createDocumentFragment();
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(' ') : makeWord(part, state));
  });
  textNode.replaceWith(frag);
}

function splitNode(node, state) {
  [...node.childNodes].forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      splitText(child, state);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      splitNode(child, state);
    }
  });
}

export const split = {
  mounted(el, binding) {
    const mode = binding.value || 'reveal';
    const text = el.textContent.replace(/\s+/g, ' ').trim();

    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    while (el.firstChild) visual.appendChild(el.firstChild);
    el.appendChild(visual);

    const state = { i: 0 };
    splitNode(visual, state);

    // Títulos aceitam nome acessível; nos demais, uma cópia escondida.
    if (/^H[1-6]$/.test(el.tagName)) {
      el.setAttribute('aria-label', text);
    } else {
      const copy = document.createElement('span');
      copy.className = 'sr-only';
      copy.textContent = text;
      el.insertBefore(copy, visual);
    }

    el.style.setProperty('--n', state.i);
    el.style.setProperty('--split-color', getComputedStyle(el).color);
    el.dataset.split = mode;
    if (mode === 'reveal') {
      observer ? observer.observe(el) : (el.dataset.splitShown = '');
    }
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
