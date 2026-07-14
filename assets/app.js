/* Renderização da comparação Tarte — pt-BR */
(function () {
  const D = window.DATA || { pontocomGap: [], elabela: [], lojas: [] };
  const $ = (s, r = document) => r.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

  /* ---------- Categoria da Ela Bela (a partir da URL ou do nome) ---------- */
  function categoria(item) {
    const u = (item.u || '').toLowerCase();
    const n = (item.n || '').toLowerCase();
    if (u.includes('/corretores/')) return 'Corretor';
    if (u.includes('/bases-e-tint-facial/')) return 'Base';
    if (u.includes('/mascaras-e-cilios/')) return 'Máscara';
    if (u.includes('/delineadores/')) return 'Delineador';
    if (u.includes('/blush/')) return 'Blush';
    if (u.includes('/sombras/') || u.includes('/olhos-e-sobrancelhas/')) return 'Sombra/Olhos';
    if (u.includes('/batom-e-gloss/')) return 'Lábios';
    if (u.includes('/bronzeadores/')) return 'Bronzeador';
    if (u.includes('/sobrancelhas/')) return 'Sobrancelha';
    if (u.includes('/pinceis-e-conjuntos/') || u.includes('/toilet/')) return 'Pincel';
    if (u.includes('/cremes/')) return 'Lábios';
    // fallback pelo nome (categoria "cosmeticos")
    if (/corretiv|shape tape corret/.test(n)) return 'Corretor';
    if (/base|serum|sérum/.test(n)) return 'Base';
    if (/máscara|mascara/.test(n) && /cílio|cilio|lash/.test(n)) return 'Máscara';
    if (/máscara labial|lip therap/.test(n)) return 'Lábios';
    if (/delineador/.test(n)) return 'Delineador';
    if (/sombra/.test(n)) return 'Sombra/Olhos';
    if (/blush/.test(n)) return 'Blush';
    if (/pó |po finalizador|colored clay/.test(n)) return 'Pó';
    if (/kit/.test(n)) return 'Kit';
    if (/pincel/.test(n)) return 'Pincel';
    if (/caneta|sobrancelha|big ego/.test(n)) return 'Sobrancelha';
    if (/autobronze|brazillian/.test(n)) return 'Bronzeador';
    if (/massage|criog| sea i/.test(n)) return 'Skincare';
    return 'Diversos';
  }

  /* ---------- Cards Pontocom (PRIORIDADE) ---------- */
  function pontocomCard(p) {
    const c = el('article', 'card');
    const price = p.usd
      ? `<div class="price">US$ ${p.usd} <small>· R$ ${p.brl}</small></div>`
      : `<div class="noprice">Preço sob consulta</div>`;
    c.innerHTML = `
      <div class="ph">
        <span class="tag only">Só na Pontocom</span>
        <img loading="lazy" src="img/pontocom/${p.i}" alt="${p.n}"
             onerror="this.style.display='none'">
      </div>
      <div class="body">
        <span class="tag" style="position:static;align-self:flex-start">${p.cat}</span>
        <div class="name">${p.n}</div>
        ${price}
        <a class="btn" href="${p.u}" target="_blank" rel="noopener">Ver na Pontocom →</a>
      </div>`;
    return c;
  }

  /* ---------- Cards Ela Bela ---------- */
  function elabelaCard(p) {
    const c = el('article', 'card');
    c.dataset.cat = categoria(p);
    c.dataset.name = (p.n || '').toLowerCase();
    c.innerHTML = `
      <div class="ph">
        <span class="tag">${c.dataset.cat}</span>
        <img loading="lazy" src="${p.i}" alt="${p.n}" referrerpolicy="no-referrer"
             onerror="this.parentNode.innerHTML='<div style=\\'color:#b5838d;font-size:12px;text-align:center;padding:20px\\'>imagem indisponível</div>'+this.parentNode.querySelector('.tag').outerHTML">
      </div>
      <div class="body">
        <div class="name">${p.n}</div>
        <div class="price">US$ ${p.p}</div>
        <a class="btn" href="${p.u}" target="_blank" rel="noopener">Ver na Ela Bela →</a>
      </div>`;
    return c;
  }

  /* ---------- Loja (quem vende) ---------- */
  function lojaCard(s) {
    const c = el('div', 'store');
    const map = { sim: ['si', 'VENDE'], nao: ['nao', 'não tem'], nv: ['nv', 'não verif.'] };
    const [cls, label] = map[s.status] || map.nao;
    c.innerHTML = `
      <div class="info"><b>${s.loja}</b><span>${s.cidade} · ${s.canal}</span><span>${s.ev}</span></div>
      <span class="pill ${cls}">${label}</span>`;
    return c;
  }

  /* ---------- Tabela de preços a 3 (Toku / New Zone / Ela Bela) ---------- */
  const LOJA_NOME = { toku: 'Toku', nz: 'New Zone', ela: 'Ela Bela' };
  function precoCell(v, who, min) {
    if (v === '—') return `<td class="na">—</td>`;
    return `<td class="${min === who ? 'win' : ''}">US$ ${v}</td>`;
  }
  function precoRow3(r) {
    return `<tr>
      <td>${r.prod}${r.nota ? `<span class="rnote"> · ${r.nota}</span>` : ''}</td>
      ${precoCell(r.toku, 'toku', r.min)}
      ${precoCell(r.nz, 'nz', r.min)}
      ${precoCell(r.ela, 'ela', r.min)}
      <td class="mincell">${LOJA_NOME[r.min]}</td>
    </tr>`;
  }

  /* ---------- Montagem ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Pontocom
    const pg = $('#pontocom-grid');
    D.pontocomGap.forEach(p => pg.appendChild(pontocomCard(p)));
    $('#pontocom-count').textContent = D.pontocomGap.length;

    // Lojas
    const lg = $('#lojas-grid');
    D.lojas.forEach(s => lg.appendChild(lojaCard(s)));
    $('#vende-count').textContent = D.lojas.filter(s => s.status === 'sim').length;
    const invEl = $('#invest-count'); if (invEl) invEl.textContent = D.lojas.length;

    // Ela Bela
    const eg = $('#elabela-grid');
    D.elabela.forEach(p => eg.appendChild(elabelaCard(p)));
    $('#elabela-count').textContent = D.elabela.length;

    // Filtro de categorias
    const cats = [...new Set(D.elabela.map(categoria))].sort();
    const sel = $('#cat-filter');
    cats.forEach(cat => { const o = el('option'); o.value = cat; o.textContent = cat; sel.appendChild(o); });

    function aplicar() {
      const q = ($('#busca').value || '').toLowerCase().trim();
      const cat = sel.value;
      let vis = 0;
      eg.querySelectorAll('.card').forEach(card => {
        const okCat = !cat || card.dataset.cat === cat;
        const okQ = !q || card.dataset.name.includes(q);
        const show = okCat && okQ;
        card.style.display = show ? '' : 'none';
        if (show) vis++;
      });
      $('#elabela-visivel').textContent = vis;
    }
    $('#busca').addEventListener('input', aplicar);
    sel.addEventListener('change', aplicar);
    $('#elabela-visivel').textContent = D.elabela.length;

    // Preços (comparação a 3)
    if (D.precos) {
      const pb = $('#precos-body'); if (pb) pb.innerHTML = D.precos.linhas.map(precoRow3).join('');
      const nota = $('#pontocom-nota'); if (nota) nota.textContent = D.precos.pontocomNota;
      const tw = $('#toku-win-count'); if (tw) tw.textContent = D.precos.linhas.filter(l => l.min === 'toku').length;
      const ew = $('#ela-win-count'); if (ew) ew.textContent = D.precos.linhas.filter(l => l.min === 'ela').length;
      const nw = $('#nz-count'); if (nw) nw.textContent = D.precos.linhas.filter(l => l.nz !== '—').length;
    }

    // Total de SKUs Ela Bela no resumo do desplegável
    document.querySelectorAll('.js-elabela-total').forEach(e => e.textContent = D.elabela.length);

    // Data
    document.querySelectorAll('.js-date').forEach(e => e.textContent = D.coletadoEm);
  });
})();
