/* O painel. Sem biblioteca, sem framework, sem pedido a outro endereço:
   a página carrega o seu proprio manifesto e, para cada visão, o mesmo arquivo
   de dados que qualquer pessoa pode baixar do link mostrado ao lado da tabela.
   Nenhum número é calculado aqui que não possa ser refeito a partir deles. */
(function () {
  'use strict';

  var M = null;            /* o manifesto */
  var CACHE = {};          /* tabela -> linhas, buscadas uma vez */
  var E = {aba: 0, ano: 'todos', busca: '', exportaveis: [], desenho: 0};
  var POR_PAGINA = 100;

  /* ---------- formatação ---------- */

  function inteiro(v) {
    if (v === null || v === undefined || v === '') { return '—'; }
    var n = Number(v);
    if (!isFinite(n)) { return String(v); }
    return n.toLocaleString('pt-BR', {maximumFractionDigits: 0});
  }
  function decimal(v, casas) {
    if (v === null || v === undefined || v === '') { return '—'; }
    var n = Number(v);
    if (!isFinite(n)) { return String(v); }
    return n.toLocaleString('pt-BR', {minimumFractionDigits: casas,
                                      maximumFractionDigits: casas});
  }
  function moeda(v) {
    if (v === null || v === undefined || v === '') { return '—'; }
    var n = Number(v);
    if (!isFinite(n)) { return String(v); }
    return n.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  }
  /* A honestidade da página: toda proporção aparece com os dois números que a
     produziram, no mesmo lugar. Quem desconfiar da porcentagem pode dividir. */
  function razao(n, d) {
    if (n === null || n === undefined || d === null || d === undefined) { return ''; }
    var p = Number(d) > 0
      ? (100 * Number(n) / Number(d)).toFixed(1).replace('.', ',') + '%'
      : '—';
    return '<span class="razao"><b>' + inteiro(n) + '</b> de <b>' + inteiro(d) +
      '</b> <i>(' + p + ')</i></span>';
  }
  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function semAcento(s) {
    return String(s === null || s === undefined ? '' : s)
      .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  var SELOS = {
    ok: /^(ok|acquired|lido|extraido|extraído|confere|sim|true|publicado|alcancado|alcançado)$/i,
    falta: /^(absent|ausente|blocked|bloqueado|unreachable|inalcancavel|inalcançável|lacuna|falhou|nao|não|false|degradado)$/i,
    alerta: /^(pending|parcial|revisar|estimado|proxy|indefinido)$/i
  };
  function selo(v) {
    var s = String(v);
    var cl = SELOS.ok.test(s) ? 'ok' : SELOS.falta.test(s) ? 'falta'
           : SELOS.alerta.test(s) ? 'alerta' : '';
    return '<span class="sel ' + cl + '">' + esc(s) + '</span>';
  }

  function celula(valor, col) {
    if (valor === null || valor === undefined || valor === '') { return '—'; }
    if (col.t === 'int') { return inteiro(valor); }
    if (col.t === 'dec') { return decimal(valor, col.casas); }
    if (col.t === 'moeda') { return moeda(valor); }
    if (col.t === 'url') {
      var u = String(valor);
      return /^https?:\/\//.test(u)
        ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">abrir documento</a>'
        : esc(u);
    }
    if (col.c === 'estado' || col.c === 'confere' || col.c === 'resultado' ||
        col.c === 'camada' || col.c === 'publicavel' || col.c === 'opiniao') {
      return selo(valor);
    }
    return esc(valor);
  }
  function classeCelula(col) {
    if (col.t === 'int' || col.t === 'dec' || col.t === 'moeda') { return ' class="num"'; }
    if (col.t === 'longo') { return ' class="longo"'; }
    return '';
  }

  /* ---------- ano ---------- */

  function anoDe(linha, decl) {
    if (!decl) { return null; }
    var v = linha[decl[0]];
    if (v === null || v === undefined || v === '') { return null; }
    var s = String(v);
    if (decl[1] === 'competencia') { return s.slice(0, 4); }
    if (decl[1] === 'data' || decl[1] === 'vigencia') {
      var m = s.match(/(\d{4})/);
      return m ? m[1] : null;
    }
    return s.slice(0, 4);
  }

  /* ---------- dados ---------- */

  function buscarTabela(nome) {
    if (CACHE[nome]) { return Promise.resolve(CACHE[nome]); }
    return fetch('dados/' + nome + '.json').then(function (r) {
      if (!r.ok) { throw new Error('HTTP ' + r.status); }
      return r.json();
    }).then(function (bruto) {
      var linhas = bruto && bruto.dados ? bruto.dados : bruto;
      if (!Array.isArray(linhas)) { linhas = []; }
      CACHE[nome] = {linhas: linhas, meta: bruto && bruto.dados ? bruto : {}};
      return CACHE[nome];
    });
  }

  function filtrar(linhas, painel) {
    var fora = [];
    var i, l, ok;
    var termo = semAcento(E.busca).trim();
    for (i = 0; i < linhas.length; i++) {
      l = linhas[i];
      if (E.ano !== 'todos' && painel.ano) {
        if (anoDe(l, painel.ano) !== E.ano) { continue; }
      }
      if (termo) {
        ok = false;
        for (var k in l) {
          if (Object.prototype.hasOwnProperty.call(l, k) &&
              semAcento(l[k]).indexOf(termo) >= 0) { ok = true; break; }
        }
        if (!ok) { continue; }
      }
      fora.push(l);
    }
    return fora;
  }

  function ordenar(linhas, coluna, desc) {
    if (!coluna) { return linhas; }
    var copia = linhas.slice();
    copia.sort(function (a, b) {
      var x = a[coluna], y = b[coluna];
      if (x === null || x === undefined || x === '') { return 1; }
      if (y === null || y === undefined || y === '') { return -1; }
      var nx = Number(x), ny = Number(y);
      var r = (isFinite(nx) && isFinite(ny) && x !== '' && y !== '')
        ? nx - ny
        : String(x).localeCompare(String(y), 'pt-BR');
      return desc ? -r : r;
    });
    return copia;
  }

  /* ---------- exportação ---------- */

  /* Uma célula que começa com =, +, - ou @ é prefixada com apóstrofo: um
     programa de planilha a trataria como fórmula, e um dado publicado não é
     uma fórmula. */
  function celulaCsv(v) {
    var s = (v === null || v === undefined) ? '' : String(v);
    if (/^[=+\-@\t\r]/.test(s)) { s = "'" + s; }
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function baixarCsv(nome, colunas, linhas) {
    var texto = '﻿' + [colunas].concat(linhas).map(function (l) {
      return l.map(celulaCsv).join(',');
    }).join('\r\n') + '\r\n';
    var blob = new Blob([texto], {type: 'text/csv;charset=utf-8'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nome + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function sufixo() {
    return (E.ano === 'todos' ? 'todos-os-anos' : E.ano);
  }
  function exportarPainel(i) {
    var x = E.exportaveis[i];
    if (!x) { return; }
    baixarCsv(x.tabela + '-' + sufixo(),
              x.colunas.map(function (c) { return c.r; }),
              x.linhas.map(function (l) {
                return x.colunas.map(function (c) { return l[c.c]; });
              }));
  }
  function exportarVisao() {
    if (!E.exportaveis.length) { return; }
    var colunas = ['Visão', 'Tabela', 'Campo', 'Valor'];
    var linhas = [];
    E.exportaveis.forEach(function (x) {
      x.linhas.forEach(function (l) {
        x.colunas.forEach(function (c) {
          linhas.push([x.titulo, x.tabela, c.r, l[c.c]]);
        });
      });
    });
    baixarCsv('painel-' + M.abas[E.aba].id + '-' + sufixo(), colunas, linhas);
  }

  /* ---------- detalhe ---------- */

  function abrirDetalhe(painelIdx, linhaIdx) {
    var x = E.exportaveis[painelIdx];
    if (!x) { return; }
    var l = x.linhas[linhaIdx];
    if (!l) { return; }
    var html = '<div class="caixa"><div class="cab"><h2>' + esc(x.titulo) +
      '</h2><button class="botao" id="fecharDetalhe">Fechar</button></div><dl>';
    Object.keys(l).forEach(function (k) {
      var v = l[k];
      if (v === null || v === undefined || v === '') { return; }
      var texto = /^https?:\/\//.test(String(v))
        ? '<a href="' + esc(v) + '" target="_blank" rel="noopener">' + esc(v) + '</a>'
        : esc(v);
      html += '<dt>' + esc(x.rotulos[k] || k.replace(/_/g, ' ')) + '</dt><dd>' +
        texto + '</dd>';
    });
    html += '</dl></div>';
    var m = document.getElementById('detalhe');
    m.innerHTML = html;
    m.hidden = false;
    document.getElementById('fecharDetalhe').onclick = fecharDetalhe;
  }
  function fecharDetalhe() {
    var m = document.getElementById('detalhe');
    m.hidden = true;
    m.innerHTML = '';
  }

  /* ---------- desenho ---------- */

  function barras(painel, linhas) {
    var g = painel.grafico;
    if (!g || !linhas.length) { return ''; }
    var series = {};
    linhas.forEach(function (l) {
      var s = g.serie ? String(l[g.serie]) : '';
      var v = Number(l[g.y]);
      if (!isFinite(v)) { return; }
      var chave = String(l[g.x]);
      if (!series[chave]) { series[chave] = 0; }
      series[chave] += v;
    });
    var chaves = Object.keys(series).sort();
    if (chaves.length < 2) { return ''; }
    var max = 0;
    chaves.forEach(function (k) { if (series[k] > max) { max = series[k]; } });
    if (max <= 0) { return ''; }
    var html = '<div class="barras">';
    chaves.forEach(function (k) {
      var pct = Math.max(0.4, 100 * series[k] / max);
      html += '<div class="barra"><span>' + esc(k) + '</span>' +
        '<span><span class="t" style="width:' + pct.toFixed(2) + '%"></span></span>' +
        '<span class="v">' + decimal(series[k], series[k] % 1 ? 2 : 0) + '</span></div>';
    });
    html += '</div><div class="legenda">Soma de ' + esc(g.rotulo) +
      (g.serie ? ', todas as séries somadas por ' + esc(g.x) : '') +
      '. Os valores exatos estão na tabela abaixo.</div>';
    return html;
  }

  function desenharPainel(painel, alvo, idx, meu) {
    return buscarTabela(painel.tabela).then(function (pack) {
      // A fetch left over from a superseded draw writes NOTHING. The heading it
      // would write into is already detached and harmless, but `E.exportaveis`
      // is the live array the CSV button and the row-detail view read at click
      // time, and `idx` is only a position -- panel 3 of one view is a
      // different table from panel 3 of the next. A late write there hands the
      // reader another table's rows under the title in front of them, which is
      // the one thing an export must never do.
      if (meu !== E.desenho) { return; }
      var linhas = filtrar(pack.linhas, painel);
      linhas = ordenar(linhas, painel.ordenar, painel.ordenar === 'ano' ||
                       painel.ordenar === 'competencia' || painel.ordenar === 'exercicio' ||
                       painel.ordenar === 'data');
      var rotulos = {};
      painel.colunas.forEach(function (c) { rotulos[c.c] = c.r; });
      E.exportaveis[idx] = {tabela: painel.tabela, titulo: painel.titulo,
                            colunas: painel.colunas, linhas: linhas, rotulos: rotulos};

      var html = '<div class="cab"><h2>' + esc(painel.titulo) + '</h2>' +
        '<span class="conta">' + razao(linhas.length, pack.linhas.length) +
        ' linhas</span>' +
        '<button class="botao" data-csv="' + idx + '">Exportar esta visão (CSV)</button>' +
        '</div>';
      if (painel.nota) { html += '<div class="nota">' + esc(painel.nota) + '</div>'; }

      var fontes = (painel.fontes || []).slice();
      var comUrl = [];
      linhas.forEach(function (l) {
        if (comUrl.length < 6 && l.url && /^https?:\/\//.test(String(l.url))) {
          comUrl.push(l.url);
        }
      });
      html += '<div class="fontes"><b>Documentos</b>';
      fontes.forEach(function (f) {
        html += '<a href="' + esc(f.url) + '" target="_blank" rel="noopener">' +
          esc(f.rot) + '</a>';
      });
      html += '<a href="dados/' + esc(painel.tabela) +
        '.json" target="_blank" rel="noopener">os dados desta tabela</a>';
      if (comUrl.length) {
        html += '<a href="' + esc(comUrl[0]) + '" target="_blank" rel="noopener">' +
          'um documento desta lista</a>';
      }
      html += '</div>';

      if (painel.destaque) {
        html += '<div class="barras">';
        linhas.forEach(function (l) {
          html += '<div class="barra"><span>' + esc(l[painel.destaque.rot]) + '</span>' +
            '<span><span class="t" style="width:' +
            (Number(l[painel.destaque.d]) > 0
              ? Math.max(0.4, 100 * Number(l[painel.destaque.n]) /
                              Number(l[painel.destaque.d])).toFixed(2)
              : '0.4') + '%"></span></span><span class="v">' +
            razao(l[painel.destaque.n], l[painel.destaque.d]) + '</span></div>';
        });
        html += '</div>';
      }

      html += barras(painel, linhas);

      if (!linhas.length) {
        html += '<div class="vazio">' + (pack.linhas.length
          ? 'Nenhuma linha atende ao filtro desta visão.'
          : 'Esta tabela não tem nenhuma linha nesta execução — o que, aqui, é um resultado e não um erro.') +
          '</div>';
      } else {
        var mostrar = linhas.slice(0, POR_PAGINA);
        html += '<div class="rolagem"><table><thead><tr>';
        painel.colunas.forEach(function (c) {
          html += '<th data-ord="' + esc(c.c) + '" data-p="' + idx + '"' +
            (painel.ordenar === c.c ? ' aria-sort="ascending"' : '') + '>' +
            esc(c.r) + '</th>';
        });
        html += '</tr></thead><tbody>';
        mostrar.forEach(function (l, li) {
          html += '<tr data-p="' + idx + '" data-l="' + li + '">';
          painel.colunas.forEach(function (c) {
            html += '<td' + classeCelula(c) + '>' + celula(l[c.c], c) + '</td>';
          });
          html += '</tr>';
        });
        html += '</tbody></table></div>';
        if (linhas.length > POR_PAGINA) {
          html += '<div class="pag">Mostrando as ' + POR_PAGINA + ' primeiras de ' +
            inteiro(linhas.length) +
            ' linhas. A exportação leva todas. Use a busca para estreitar.</div>';
        }
        html += '<div class="pag">Clique em uma linha para ver todos os campos dela.</div>';
      }
      alvo.innerHTML = html;
    }).catch(function (err) {
      if (meu !== E.desenho) { return; }
      alvo.innerHTML = '<div class="vazio">Não foi possível carregar ' +
        esc(painel.tabela) + ': ' + esc(err.message) + '</div>';
    });
  }

  function anosDisponiveis(aba) {
    var anos = {};
    aba.paineis.forEach(function (p) {
      if (!p.ano) { return; }
      var pack = CACHE[p.tabela];
      if (!pack) { return; }
      pack.linhas.forEach(function (l) {
        var a = anoDe(l, p.ano);
        if (a && /^\d{4}$/.test(a)) { anos[a] = true; }
      });
    });
    return Object.keys(anos).sort();
  }

  function desenharKpis() {
    var aba = M.abas[E.aba];
    if (aba.id !== 'visao') { return ''; }
    var html = '<div class="kpis">';
    M.kpis.forEach(function (k) {
      var v;
      if (typeof k.valor !== 'number') { v = esc(k.valor); }
      else if (k.fmt === 'moeda') { v = moeda(k.valor); }
      else if (k.fmt === 'pct') { v = decimal(k.valor, 1) + '%'; }
      else if (k.fmt === 'dec3') { v = decimal(k.valor, 3); }
      else if (k.fmt === 'dec2') { v = decimal(k.valor, 2); }
      else if (k.fmt === 'dec1') { v = decimal(k.valor, 1); }
      else { v = inteiro(k.valor); }
      html += '<div class="kpi"><div class="rot">' + esc(k.rot) + '</div>' +
        '<div class="val">' + v + '</div><div class="sub">' + esc(k.sub) + ' · ' +
        (k.n !== null && k.n !== undefined ? razao(k.n, k.d) + ' · ' : '') +
        '<a href="dados/' + esc(k.tabela) + '.json" target="_blank" rel="noopener">' +
        esc(k.tabela) + '</a></div></div>';
    });
    return html + '</div>';
  }

  // Rebuilt on every redraw rather than once at load: a reader reports on the
  // view in front of them, and a message naming the view they opened first
  // would send us looking at the wrong table.
  function atualizarRelato() {
    var aba = M.abas[E.aba];
    document.getElementById('relatar').href =
      'mailto:' + M.email + '?subject=' +
      encodeURIComponent('Painel de dados de saúde do DF — relato: ' + aba.rotulo) +
      '&body=' + encodeURIComponent(
        'Descreva o problema encontrado ou a sugestão.\n\n' +
        'Se for sobre um número específico, copie a linha da tabela ' +
        '(clique nela para ver todos os campos).\n\n' +
        '---\nVisão: ' + aba.rotulo +
        '\nAno: ' + (E.ano === 'todos' ? 'todos os anos' : E.ano) +
        '\nPágina: ' + location.href + '\n');
  }

  function desenhar() {
    var meu = ++E.desenho;
    var aba = M.abas[E.aba];
    var raiz = document.getElementById('conteudo');
    E.exportaveis = [];

    var cabecalho = '<p class="intro">' + esc(aba.intro) + '</p>' + desenharKpis();
    var corpo = document.createElement('div');
    raiz.innerHTML = cabecalho;
    raiz.appendChild(corpo);

    var alvos = aba.paineis.map(function (p) {
      var d = document.createElement('section');
      d.className = 'cartao';
      d.innerHTML = '<div class="vazio">Carregando ' + esc(p.titulo) + '…</div>';
      corpo.appendChild(d);
      return d;
    });

    Promise.all(aba.paineis.map(function (p, i) {
      return desenharPainel(p, alvos[i], i, meu);
    })).then(function () {
      if (meu !== E.desenho) { return; }
      preencherAnos();
    });

    document.querySelectorAll('.aba').forEach(function (b, i) {
      b.setAttribute('aria-selected', i === E.aba ? 'true' : 'false');
    });
    history.replaceState(null, '', '#' + aba.id + '/' + E.ano);
    // After the hash moves, never before: the message carries `location.href`,
    // and a link to the previous view would send us to the wrong table.
    atualizarRelato();
  }

  function preencherAnos() {
    var sel = document.getElementById('ano');
    var anos = anosDisponiveis(M.abas[E.aba]);
    var atual = E.ano;
    sel.innerHTML = '<option value="todos">todos os anos</option>' +
      anos.map(function (a) {
        return '<option value="' + a + '"' + (a === atual ? ' selected' : '') +
          '>' + a + '</option>';
      }).join('');
    sel.disabled = !anos.length;
    if (atual !== 'todos' && anos.indexOf(atual) < 0) {
      E.ano = 'todos';
      sel.value = 'todos';
    }
  }

  /* ---------- ligação ---------- */

  function lerHash() {
    var h = (location.hash || '').replace(/^#/, '').split('/');
    var i = 0;
    if (h[0]) {
      M.abas.forEach(function (a, k) { if (a.id === h[0]) { i = k; } });
    }
    E.aba = i;
    E.ano = h[1] && /^(todos|\d{4})$/.test(h[1]) ? h[1] : 'todos';
  }

  function iniciar(manifesto) {
    M = manifesto;
    document.getElementById('abas').innerHTML = M.abas.map(function (a, i) {
      return '<button class="aba" role="tab" data-i="' + i + '" ' +
        'aria-selected="' + (i === 0) + '">' + esc(a.rotulo) + '</button>';
    }).join('');
    lerHash();
    desenhar();

    document.getElementById('abas').addEventListener('click', function (ev) {
      var b = ev.target.closest('.aba');
      if (!b) { return; }
      E.aba = Number(b.getAttribute('data-i'));
      desenhar();
    });
    document.getElementById('ano').addEventListener('change', function (ev) {
      E.ano = ev.target.value;
      desenhar();
    });
    var t = null;
    document.getElementById('busca').addEventListener('input', function (ev) {
      clearTimeout(t);
      var v = ev.target.value;
      t = setTimeout(function () { E.busca = v; desenhar(); }, 220);
    });
    document.getElementById('exportar').addEventListener('click', exportarVisao);
    document.getElementById('imprimir').addEventListener('click', function () {
      window.print();
    });
    document.getElementById('conteudo').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-csv]');
      if (b) { exportarPainel(Number(b.getAttribute('data-csv'))); return; }
      var th = ev.target.closest('th[data-ord]');
      if (th) {
        var i = Number(th.getAttribute('data-p'));
        var p = M.abas[E.aba].paineis[i];
        var col = th.getAttribute('data-ord');
        p.ordenar = (p.ordenar === col) ? null : col;
        desenhar();
        return;
      }
      var tr = ev.target.closest('tr[data-l]');
      if (tr) {
        abrirDetalhe(Number(tr.getAttribute('data-p')), Number(tr.getAttribute('data-l')));
      }
    });
    document.getElementById('detalhe').addEventListener('click', function (ev) {
      if (ev.target.id === 'detalhe') { fecharDetalhe(); }
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { fecharDetalhe(); }
    });
    window.addEventListener('hashchange', function () { lerHash(); desenhar(); });
  }

  fetch('painel.json').then(function (r) { return r.json(); }).then(iniciar)
    .catch(function (err) {
      document.getElementById('conteudo').innerHTML =
        '<div class="cartao"><div class="vazio">Não foi possível carregar o painel: ' +
        esc(err.message) + '</div></div>';
    });
}());
