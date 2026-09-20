---
layout: default
title: "Anexo: sumário executivo"
---
<!-- ANEXO GERADO -- NÃO EDITAR À MÃO.
     Comando: `scripts_extracao/dossie_pdf.py (extrair_sumario)`.
     Fingerprint do corpo (sha256[:16]): 2c8c6415bc113871.
     Uma cópia commitada que diverge de uma geração nova a partir do
     mesmo banco FALHA o gate (`scripts_extracao/run.py`, OS-070 Q3). -->

## Sumário executivo

**Este sumário segue a cadeia causal que o projeto testa, elo por elo — cada parágrafo nomeia o
bloco e a tabela que o sustenta.** Nenhum vínculo entre um elo e o próximo é afirmado aqui: se a
vacância de uma carreira explica a distribuição de leitos, se a opacidade do IGES-DF explica o
custo de SES, é uma leitura que este documento deixa para quem o lê — a inferência de intenção não
é deste documento.

**Elo 1 — indicadores de saúde (Bloco 1).** A mortalidade infantil no DF caiu de 14,40 por mil
nascidos vivos em 2000 para 10,49 em 2024, com um mínimo de 8,53 em 2019 `[mortalidade_infantil]`.
A razão de mortalidade materna não tem a mesma trajetória: 35,42 por 100 mil em 2000, um pico de
**107,80** em 2021 e 54,08 em 2024 `[mortalidade_materna]` — o pico está na série completa da
seção 1.1, não suavizado aqui.

**Elo 2 — atenção primária (Bloco 2).** As equipes de Saúde da Família cresceram de 33 em 2007
para 649 em 2026 `[equipes_aps_serie]`, enquanto o número de UBS oscilou entre 146 e 187 no mesmo
período, sem tendência `[ubs_serie]`. A razão de habitantes por equipe só está medida para dois
anos — 4.581 em 2022 e 4.668 em 2024 `[habitantes_por_equipe]` — porque este projeto só tem
população verificada para o Censo e a PDAD-A, nunca uma terceira fonte para preencher os anos
entre eles.

**O problema mensurável não é o volume. É a distribuição.** O DF tem **3.711 leitos SUS**
dos tipos que a Equação 1 do Caderno do Ministério da Saúde de 2017 cobre — clínico, cirúrgico
e pediátrico `[dimensionamento_df]`. A região de saúde Central concentra **1.568** deles —
**42,3 % dos leitos para 12,6 % da população**. São **4,35** leitos por mil habitantes na
Central contra **0,18** na Centro-Sul: uma razão de **24 para 1** entre duas regiões da mesma
cidade `[dimensionamento_regiao]`.

**Vinte das 35 Regiões Administrativas não têm um único leito SUS desses tipos** — Guará,
Recanto das Emas, Vicente Pires, Sol Nascente/Pôr do Sol, São Sebastião e Águas Claras, entre
outras. Nelas vivem **1.213.813 pessoas, 42,4 % da população do Distrito Federal**
`[dimensionamento_ra]`.

**Somado, o Distrito Federal tem superávit de 579 a 711 leitos** — 18,5 % a 23,7 % acima do que
a Equação 1 pede `[dimensionamento_df]`. **E o agregado é exatamente o que não deve ser lido:**
duas regiões têm superávit e cinco têm déficit, os déficits das cinco somam **796 a 895 leitos**,
e a maior delas em população — a Sudoeste, com 837.326 habitantes — tem 443 leitos para uma
necessidade de 640 a 666. Um leito na Asa Norte não atende uma internação em Recanto das Emas.

**O que este superávit não diz, dito aqui e não em nota de rodapé:** a Equação 1 é calculada
sobre as internações que *aconteceram* — quem não foi internado porque não havia leito não está
no SIH e não está nesta conta. "Superávit" aqui significa *leitos bastantes para continuar
fazendo o que já se faz*, nunca *leitos bastantes para a necessidade do DF* (seção 3.2).

**A leitura anterior deste sumário, citada porque um leitor a leu:** *"O DF tem 4.868 leitos SUS
de enfermaria … a Central concentra 2.061 deles — 42,3 % … 5,72 leitos por mil na Central contra
0,18 na Centro-Sul: uma razão de 32 para 1 … Dezoito das 35 Regiões Administrativas não têm um
único leito SUS de enfermaria … 972.891 pessoas, 34,0 % … O déficit agregado é de 2.285 a 3.715
leitos, 31,9 % a 43,3 %"*. Aquela leitura aplicava a Portaria GM/MS 1.101/2002, **revogada em
2015**; esta aplica o método do documento que a substituiu (seções 3.2 a 3.4). **O sinal do
agregado inverteu-se; a desigualdade regional não.**

**Elo 4 — formação médica (Bloco 4).** Os vínculos médicos ativos na rede SES-DF, contados no
CNES e não deduplicados por profissional, foram 5.805 em 2022 e 5.516 em 2026; deduplicados por
CNS, 4.816 e 4.824 `[vinculos_medicos_ses]` — um proxy de força de trabalho, não de formação.
Sobre quantos médicos o DF forma e retém, três necessidades continuam sem fundamento, medidas a
cada execução em vez de declaradas uma vez: os cursos autorizados pelo e-MEC, os ingressantes e
egressos do censo do INEP e a série de médicos ativos por mil habitantes do CFM
`[cursos_medicina_df, medicina_ingressantes_egressos, medicos_por_mil]` — a seção 4.2 detalha por
quê.

**Elo 5 — carreiras e remuneração (Bloco 5).** O quadro das carreiras da saúde caiu 4,0 % entre
2021 e 2025 `[pessoal_carreira]`. Em dezembro de 2025, das cinco carreiras com mais cargos vagos,
a carreira médica tinha 5.144 vagas de 10.000 cargos `[cargos_vagos]`. A série histórica de
vencimentos continua bloqueada pelo mesmo host que barra o antigo Eixo 4 desde o `OS-012`
(seção 5.2).

**Elo 6 — IGES-DF e HCB (Bloco 6).** Medido pelo próprio inventário de tipos de documento que
este projeto declarou antes de contar qualquer célula, o IGES-DF publica 3 de 3 categorias e o
HCB 1 de 3 `[transparencia_indice_publicacao]` — não é um índice oficial, é uma medida própria
deste projeto, declarada como tal. Do lado que tem demonstração contábil publicada, cinco
exercícios seguidos saem com parecer de auditoria com ressalva `[opinioes_auditoria]`.

**Elo 7 — prometido, orçado e executado (Bloco 7).** O gasto com saúde cresceu 25,9 % em termos
reais entre 2017 e 2025 `[orcamento_saude, ipca_mensal]` (seção 7.1). Do que a Lei Orçamentária de
2025 previa nos cinco estágios da despesa — aprovado, autorizado, empenhado, liquidado, pago —
apenas o **liquidado** está publicado em forma legível por máquina; os outros quatro são lacuna
declarada, não zero `[orcamento_saude_etapas]`. As metas do Plano Distrital de Saúde 2024-2027
também são lacuna: a extração da tabela de metas contra o PDF do plano não separa os campos com
confiabilidade suficiente — `[pds_metas]` diz por quê.

**Elo 8 — o registro da CLDF (Bloco 8).** Entre 2017 e 2026 a Casa recebeu **3.067 proposições**
classificadas como saúde pela sua própria plenária, das quais 1.131 indicações, 784 requerimentos
de informação e 668 projetos de lei `[cldf_proposicoes_saude]`. Nas 39 viradas de indicador que o
cruzamento com o Bloco 1 mede, nenhuma cai numa janela com convocação de secretário ou CPI
registrada `[momentos_de_virada]` — a seção 8 explica por que isso é a muralha medida pelas seis
colunas do próprio registro da CLDF, não a prova de que a Casa nunca convocou ou nunca investigou.

**A tese deste documento:** o Distrito Federal não escolheu gastar menos com saúde. Escolheu um
modelo de Estado em que a capacidade instalada permaneceu onde a cidade foi fundada, enquanto a
população foi para onde não há capacidade. Isso é uma escolha com consequências mensuráveis, e
elas estão medidas abaixo.

---
