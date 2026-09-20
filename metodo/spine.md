---
layout: default
title: "Method: the acquisition spine and its known failure cases"
---
# SPINE.md — the RA → região de saúde spine, and how each row got there

**What this is.** The join key every per-region figure in this project rests on: each of the
DF's **35 Regiões Administrativas** placed in one of its **seven Regiões de Saúde**, population
attached to the same key, and every CNES establishment placed on an RA — or marked `UNASSIGNED`
with a reason.

Built by `OS-010`. Written in English for the same reason
`PROVENANCE.md` is: it is a note about method, not a deliverable for the
DF's public. The *dossiê* is Portuguese, and the citation strings carried inside the data
itself are Portuguese, because those travel into it.

**The tables.** `ras_regioes` (35 rows: RA, região, macrorregião, population, geometry flag,
per-row citation), `estabelecimento_ra` (12.473 rows: establishment → RA, with the method that
placed it), `ras_ibge` (the key), `cnes_ra_lookup`, `leitos_por_estabelecimento`.

---

## The result

| | |
|---|---|
| Active establishments placed | **5.475 of 5.495 — 99,6 %** |
| Active establishments **carrying beds** placed | **110 of 110 — 100 %** |
| Beds placed on an RA | **10.518 of 10.518 — none stranded** |
| Placements where a second published signal disagreed | **433**, recorded in `conflito` |
| RAs with a região de saúde | 35 of 35 |
| RAs with population | 33 of 35 |
| RAs with IBGE geometry | 33 of 35 |

## What the join says

Population from IBGE Censo 2022 / IPEDF; beds from CNES `202607`, active establishments only.

| Região de Saúde | População | Estab. | c/ leito | Leitos | SUS | **Leitos/1.000 hab** |
|---|---:|---:|---:|---:|---:|---:|
| Central | 336.024 | 2.965 | 67 | 5.434 | 2.520 | **16,17** |
| Sul | 256.089 | 262 | 4 | 1.230 | 992 | **4,80** |
| Norte | 345.286 | 238 | 5 | 776 | 375 | **2,25** |
| Oeste | 444.450 | 267 | 7 | 929 | 692 | **2,09** |
| Sudoeste | 795.434 | 1.286 | 20 | 1.515 | 698 | **1,90** |
| Leste | 305.710 | 173 | 5 | 331 | 262 | **1,08** |
| Centro-Sul | 324.989 | 284 | 2 | 303 | 73 | **0,93** |

**Central holds 12 % of the population and 52 % of the beds.** The spread between the
best-served and worst-served região de saúde is **seventeen-fold**. This file states that as
arithmetic over two sourced quantities and stops there — what it means for access, and what any
of it should be, is `OS-011`'s work, not this note's.

---

## The one thing that would have broken every figure above

**CNES never removes a closed establishment, and more than half the DF's rows are closed.**
`tbEstabelecimento` carries 12.473 DF rows; **6.978 of them carry a `CO_MOTIVO_DESAB`** — a
deactivation reason. TABNET counts only the others, which its own footnote says outright:
*"os dados … referem-se aos registros constantes no Banco de Dados Nacional do CNES com status
ATIVO."*

It was found by refusing to accept a number that did not tie out. The per-establishment bed
table summed to **12.719**; TABNET's two bed tables summed to **10.518**. Filtering to
establishments with no deactivation reason gives:

```
active establishments      : 10.518 beds   ← exactly TABNET's 7.887 + 2.631
deactivated establishments :  2.201 beds
```

An exact reconciliation, to the bed. Every count in this file is therefore over **active**
establishments, and `estabelecimento_ra.ativo` carries the flag so no later query has to
remember. **A per-region establishment count that ignores it is roughly double what it should
be.**

---

## The ladder: how each establishment was placed

Signals are tried in descending order of how much the *source itself* asserts, and
`estabelecimento_ra.metodo` records which rung succeeded. That column is the point — an
establishment placed by a code CNES published is a different kind of fact from one placed by
matching a string, and a reader must be able to tell them apart without asking.

| Rung | Signal | Active establishments placed |
|---|---|---:|
| 1 | Coordinates inside an IBGE Censo 2022 RA polygon | **5.413** |
| 2 | `CO_DISTRITO_SANITARIO`, resolved against CNES's own DF place table | 39 |
| 3 | `CO_MUNICIPIO_GESTOR`, where it is a legacy RA pseudo-município | 0 (all such rows are deactivated) |
| 4 | `NO_BAIRRO` exactly equal to an RA name, ignoring accents | 10 |
| 5 | `NO_BAIRRO` equal to a place **CNES itself lists** for the DF | 13 |
| — | `UNASSIGNED` | 20 |

### Why coordinates outrank the distrito sanitário

The question this table answers is **where an establishment is**. A coordinate answers it;
`CO_DISTRITO_SANITARIO` is an SES-DF *management* assignment, which is a different question that
usually has the same answer and sometimes does not. **The two disagree on 433 active
establishments, ten of which carry beds.**

That is not a theoretical worry. `CO_DISTRITO_SANITARIO = 0010` resolves through CNES's place
table to `530010 BRASILIA` — which is the DF's single IBGE **município**, meaning *the whole
Distrito Federal*, not the Plano Piloto. Reading it as an RA placed 590 establishments in Central
on a code that carries no RA at all, among them **`0010545` HRBZ, the Hospital Regional de
Brazlândia** and its 90 beds. `CNES_PARA_IBGE` now maps that name to nothing, and the ladder moves
on to the coordinate — which puts HRBZ inside IBGE's Brazlândia polygon, in Oeste, where it is.

**Every rung is evaluated, not just the first that answers.** Where a lower rung reaches a
different RA, `estabelecimento_ra.conflito` records it (`distrito_sanitario=53001080508`, and so
on). A placement two published signals disagree about is still a placement, but a table that
hides the disagreement states it as settled when it is not.

**Nothing was placed by this author's knowledge of Brasília.** Rung 5 resolves `ASA SUL`
because CNES publishes `530015 BRASILIA - ASA SUL` as a DF place — not because anyone here knows
where Asa Sul is. No neighbourhood this project invented gets a rung, and the three names CNES
lists that do not denote an RA (`DRAC/CGSOS` and `SAS`, SES-DF administrative units; `BRASILIA`,
the município) are declared as such and resolve to nothing.

### Coordinates: why 4 decimal places

**1.274 DF establishments share the exact coordinate `-15.78, -47.93`.** It is a CNES
placeholder, and it lands in Cruzeiro — so an establishment in Lago Sul or Sobradinho carrying it
would be confidently placed in the wrong RA. Two decimal places is about a kilometre, which in
the DF crosses boundaries. **Coordinates with fewer than four decimals on either axis are
refused**, and the row says so in `observacao` rather than accepting a location the source does
not actually know.

### The point-in-polygon has no dependency

IBGE's `DF_subdistritos_CD2022.gpkg` is a **GeoPackage, which is a SQLite file**, so it reads
with the standard library this project already limits itself to. The geometry is OGC WKB behind
a 40-byte header; containment is even-odd ray casting, with the file's own bounding boxes as a
cheap reject first. **No geocoding provider was adopted**, which would have needed a `Providers`
row this project does not have.

---

## The six lists, reconciled

Six sources name the DF's Regiões Administrativas and **four of them disagree on how many there
are**. IBGE's coded list of 35 is the key; every other list joins onto it, and every difference
is named below rather than normalised away.

| List | Count | Difference against the IBGE key |
|---|---:|---|
| **IBGE localidades API** | **35** | — *the key* |
| PDS 2024–2027 p. 36 | 35 | Same 35 places, two spelled differently: `Arniqueiras` (IBGE: `Arniqueira`) and `Estrutural/SCIA` (IBGE: `SCIA`). Both are declared joins in `regioes_saude.py`, not string-normalised |
| `pdad_ipe_df.html` | 35 | States 35 in prose; consistent |
| CNES `tbMunicipio` | 34 | Resolves to **30** of the 35 RAs. See below |
| IBGE geometry (Censo 2022) | 33 | **Arapoanga** and **Água Quente** have no polygon — created after the 2022 mesh, so they sit inside Planaltina and Recanto das Emas |
| `pdad_censo.json` | 33 | **Arapoanga** and **Água Quente** have no population row — same two, same reason |

**CNES's 34, in detail.** Two of its names are the Plano Piloto under other names
(`BRASILIA - ASA NORTE`, `BRASILIA - ASA SUL`); `SCIA-ESTRUTURAL` is `SCIA` and
`SETOR DE INDUSTRIA E ABASTECIMENTO` is `SIA`. Three denote no RA at all: `DRAC/CGSOS` and `SAS`
are SES-DF administrative units, and **`BRASILIA` is the DF's IBGE município** — the whole
Distrito Federal. After those dispositions CNES covers **30 of the 35 RAs**; it has no code for
`Sol Nascente/Pôr do Sol`, `Arniqueira`, `Fercal`, `Arapoanga` or `Água Quente`.

**Arapoanga and Água Quente are the same two RAs in every gap.** They are recent creations, they
have no geometry, no population row and no CNES code, and they carry a região de saúde only
because the PDS names them. Anything computed per-RA is silent about them, and that is a
property of the sources rather than of this build.

---

## Known failure cases

1. **20 active establishments are `UNASSIGNED`** — no usable coordinate, no distrito sanitário,
   and a bairro string matching nothing CNES or IBGE publishes. **None of them carries a bed**,
   so no bed figure is affected. Their reasons are in `estabelecimento_ra.observacao`.
   Separately, **six deactivated establishments holding 326 beds are also `UNASSIGNED`** — they
   are excluded from every figure here by the `ativo` filter, and are named so the exclusion is
   visible rather than assumed.
2. **Every rung is separable.** `metodo` is a column, so any rung can be excluded from a query
   without rebuilding anything — `WHERE metodo <> 'bairro_lugar_cnes'` drops the weakest 13
   placements, `WHERE conflito = ''` drops the 433 where two signals disagreed.
3. **Six composition rows rest on a planning document, not a decree**, and
   `ras_regioes.base_citacao` says which kind each is — see *The norm chain* below. The other 29
   cite Decreto 37.515/2016 Art. 3, and they cite it because the decree's own text was
   transcribed and compared row by row, not because a constant was pasted onto every row.
4. **CEP was not used.** No published CEP → RA correspondence was obtainable, so rung 4 of the
   BRIEF's plan does not exist here. It would mostly help the deactivated establishments.
5. **Population and beds come from different years.** Population is Censo 2022; beds are CNES
   `202607`. Both are named on the row. `OS-011` has to decide whether that is acceptable for a
   rate, and it also has other DF population figures to choose between — 2.807.982 here,
   2,99 milhões in the analysis documents, 3.130.014 in the PDS itself.
6. **The population figures have no artifact behind them, and the spine says so.** The 33 numbers
   come from `dados/processed/pdad_censo.json`, which a pre-`OS-009` script produced from a
   **hardcoded Python literal** — no URL, no page reference, nothing in `dados/raw/`.
   `ras_regioes.populacao_procedencia` carries that sentence on every row rather than letting
   `populacao_fonte`'s "IBGE Censo 2022 / IPEDF" imply more than this repository can show. The
   2.807.982 total is this project's own sum of those 33 rows, not a published figure.
   **Acquiring population from a citable source is `OS-012`'s**, and until it does, criterion (b)
   of this work order is met by a named source whose provenance is weaker than its name.
7. **A coordinate placement cannot see Arapoanga or Água Quente.** The Censo 2022 mesh predates
   both, so their ground still belongs to whichever RA covered it in 2022 and a point inside them
   resolves to that RA with no error raised. Every coordinate-placed row therefore carries this
   caveat in `observacao`; which RA absorbs which is not asserted, because no source consulted
   here states it.

---

## The norm chain, because the names moved

- **Decreto nº 37.057/2016** creates the Regiões de Saúde.
- **Decreto nº 37.515/2016, Art. 3** enumerates all seven with their member RAs. Item VII is
  **`Região Centro-Norte`** — the word "Central" does not appear in it.
- **Decreto nº 38.982/2018, Art. 10, I**: *"a Superintendência da Região de Saúde Centro-Norte
  passa a denominar-se Superintendência da Região de Saúde Central"*.
- **PDS 2024–2027 p. 36** (SES-DF, 2023) states the current composition, citing 37.515/2016
  *"e alterações posteriores"*. CNES codes the region `53006 Central`.

**`originais/Proposta de elaboração.pdf` says Centro-Norte, and it is not wrong — it is stale.**
It quotes the 2016 decree correctly. `OS-008` recorded the disagreement; this is its resolution,
and the distinction matters: "the input document is wrong" and "the input document is eight years
old and here is the decree that superseded it" are different findings.

### The citation each row earns

**Both compositions are transcribed** — the decree's Art. 3 and the PDS's page 36 — and
`regioes_saude.py` derives each row's citation by comparing them. A row's citation is therefore a
computed comparison, not a constant pasted onto 35 rows.

| `base_citacao` | Rows | What it means |
|---|---:|---|
| `decreto` | **29** | The 2016 decree puts this RA in this region. Cited to Art. 3, with the 2018 rename noted where it applies |
| `pds_ra_nova` | 4 | The RA postdates the decree, which cannot name it: `Sol Nascente/Pôr do Sol`, `Arniqueira`, `Arapoanga`, `Água Quente` |
| `pds_ra_transferida` | 1 | **`Lago Sul`.** The decree puts it in **Centro-Sul**; the PDS puts it in **Central**. No norm making that move was found |
| `pds_ra_unificada` | 1 | **`Plano Piloto`.** In 2016 it was two RAs in two different regions — Asa Norte in Centro-Norte, Asa Sul in Centro-Sul. IBGE now carries one RA, so its region cannot be read off the decree at all |

**The last two rows are the interesting ones**, and they were invisible until the decree's own
text was read: the composition did not merely gain RAs between 2016 and 2023, it moved territory
between regions. Whatever norm did that has not been located, and both rows say so in the data.

## Reproducing this

```
python3 scripts_extracao/run.py
```

Acquisition and derivation are separate phases; the derivation is `scripts_extracao/spine.py` and
consumes only what acquisition wrote. Everything above can be re-derived from the database with
`--skip-acquire`.
