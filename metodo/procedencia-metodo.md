---
layout: default
title: "Method: what the provenance annex proves, and what it cannot"
---
# PROCEDÊNCIA-METODO.md — the method behind the procedência annex

**Produced by `OS-070`, 2026-09-18**, superseding [`DOSSIE-PROVENANCE.md`](DOSSIE-PROVENANCE.md)
(frozen; see the sidecar `.SUPERSEDED.md` beside it). That file mixed two things that age at
different rates — the *reasoning* for why the audit is built the way it is, and the *counts* a
given run of it produces. Mixing them is what made it go stale: the reasoning below has not
changed since `OS-013` first wrote it; the counts moved on every OS that touched the dossiê, and
a hand-maintained file could not keep up (OS-070's own reason for existing). The counts now live
in [`ANEXO-PROCEDENCIA.md`](ANEXO-PROCEDENCIA.md), regenerated every build; this file holds the
reasoning, which does not need regenerating because it is not a measurement.

**Language.** English, per [`../CLAUDE.md`](../CLAUDE.md) → Language policy, amended by `OS-070`
Q1: this file stands alone — read by whoever audits the METHOD, not by whoever reads the dossiê —
so it keeps the corpus's own language. `ANEXO-PROCEDENCIA.md`, `ANEXO-LACUNAS.md` and
`ANEXO-SUMARIO.md`/`.pdf`, by contrast, are bound into the deliverable — appendices the dossiê's
own Portuguese-speaking audience reads to check a claim or a gap — and are Portuguese for that
reason.

## What the denominator is, and why a self-selected one is not a measurement

**The count must be the DOCUMENT's, never the checker's own worklist.** An early draft of the
provenance audit (`OS-013`) reported "46 of 46 (100 %)" against a denominator that was simply
whatever `dossie_verifica.py` happened to enumerate — so a claim nobody had gotten around to
entering could never lower the score, and the number measured the auditor's effort rather than the
document's honesty. **A ratio whose denominator is the audit's own worklist measures nothing.**

The fix, unchanged since, is a denominator built in two halves that both read the DOCUMENT rather
than the checker:

| Half | How the denominator is fixed |
|---|---|
| Prose claims | Hand-enumerated — a figure inside a sentence has no machine-readable shape, so this half is a list, swept against every numeric token in the dossiê's non-table lines |
| Table cells | **Read out of `docs/DOSSIE.md` itself.** Every cell of every quantitative table is rebuilt from the database and compared against the table parsed out of the document. Adding a column or a row to a published table checks it automatically; dropping one fails as a missing row |

**The table half is what makes the claim falsifiable.** The header row, the row count and every
individual cell are separate claims, so a table that gains a column, loses a row, or is reordered
away from the query that produces it fails by name rather than passing silently.

`ANEXO-PROCEDENCIA.md`'s own denominator is now `dossie_verifica.listar_claims`'s full return —
the exact same computation `verificar()` uses to fail the gate, never a second, hand-curated list
riding alongside it. That equality is what `tests/` pins for OS-070 (criterion e): the annex cannot
under-report without the gate itself also going quiet.

## What is deliberately outside the denominator

- **Cells whose contents are sentences, not figures** — a declared reason
  (`não publicados em forma legível por máquina`) is not a number to re-derive, and is named as a
  gap rather than counted as a pass.
- **Identifiers that look like numbers**: work-order tags, portaria numbers, SIDRA table codes,
  contract numbers, law numbers, HTTP status codes quoted in prose. They are labels, not
  measurements.
- **Prose judgement**, which no check reaches — see *What this cannot check*, below.

## Why this is a different kind of claim from a search-based audit

The audit this method replaced (`OS-008`, over the five PDFs `docs/DOSSIE.md` itself superseded)
measured old documents by **searching** `dados/` for each figure and inspecting every hit by hand —
because a literal substring match is not provenance. That audit found a 57 % "hit rate" that fell
to 5 % once each hit was read in context: a figure matching a CSS coordinate, another matching an
unrelated line in a medicines budget.

**This method cannot produce that failure mode, because it does not search.** Each claim is paired
with the query that computes it — a claim is not "a number that appears somewhere in the data," it
is a named SQL expression over a named table. A coincidental match is not available as an answer.

**But it can produce a different one, and did.** The predecessor's failure was a denominator too
generous — a substring match counted as provenance. The failure available to this method is a
denominator too narrow — checking only what the checker happens to contain. Both report a number
that is not about the document. The fix is the table half above.

**Verified both ways.** The check confirms every claim against the current database; and with one
published cell deliberately altered, the run exits non-zero and names the claim by table, row and
column, with both the derived and the published value. A check that cannot fail proves nothing, so
it was made to fail once, on purpose, and stays testable that way (`tests/`).

**And it has caught changes nobody planted.** Adding a coverage row that moves a count the dossiê
states in prose — a "N necessidades declaradas" sentence, for instance — makes the run fail until
the sentence is updated, not because anyone remembered it was there but because the check demanded
it. That is the mechanism working on a change it was not written for, which is the only kind of
evidence that counts for it.

## What "100 %" does and does not mean

**It means:** no number in the dossiê came from the author's knowledge, from the adversary's
dossier, or from the prose of the proposal that commissioned it. Every one is arithmetic over a
table this repository built from a source it fetched.

**It does not mean the dossiê is complete**, and the document says so in its own text, in the
coverage table and in [`ANEXO-LACUNAS.md`](ANEXO-LACUNAS.md) — a declared gap is a finding, never
filled by estimate.

## Method, so this can be repeated

1. Every quantitative claim in the dossiê's **prose** is entered in
   `scripts_extracao/dossie_verifica.py` as `(label, derived, published)`.
2. Every quantitative **table** in `docs/DOSSIE.md` is rebuilt from the database — rows, order,
   formatting and all — and compared cell by cell against the table parsed out of the document.
   Nobody enumerates those cells by hand; the document supplies them.
3. `dossie_verifica.verificar()` runs both halves against the database the same run just built;
   `dossie_verifica.listar_claims()` returns the same set as a flat list, for the annex.
4. `scripts_extracao/run.py` prints the count, prints every divergence with both values, and
   **exits non-zero** if any claim diverges. It also refuses to regenerate `DOSSIE.pdf` — and, since
   `OS-070`, refuses to let a stale `ANEXO-PROCEDENCIA.md`/`ANEXO-LACUNAS.md`/`ANEXO-SUMARIO.md`
   pass unnoticed — on a failing or degraded run.
5. The counts in `ANEXO-PROCEDENCIA.md` are that run's output, generated by
   `scripts_extracao/anexos.py`, never a transcription of it.

**What this method cannot check:** prose. It confirms that a division rounds the way a sentence
says it does; it cannot confirm that the sentence is a fair way to describe what the division
means. Judgement stays with the reader, and that boundary is deliberate.
