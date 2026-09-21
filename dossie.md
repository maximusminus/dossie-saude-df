---
layout: default
title: "Dossiê — Saúde no Distrito Federal"
---
# Dossiê Saúde no Distrito Federal

**Uma análise do sistema de saúde do DF a partir dos dados que o próprio Estado publica.**

Primeira versão em 2026-08-27; reorganizado em oito blocos de missão em 2026-09-17 —
mesma fonte de verdade, mesma regra de citação; nenhuma tabela foi reescrita pela
reorganização, e o que mudou de figura nesta versão veio de uma tabela nova, nunca da
reorganização em si. Fonte de verdade: este arquivo. O PDF ao lado é **gerado** a partir
dele, e regenerá-lo não produz diferença — as duas cópias não podem divergir, e a primeira
coisa a divergir seria uma citação.

---

## Leia isto antes de qualquer número

**Toda afirmação quantitativa deste documento aponta para uma tabela de `dados/database/saudedf.sqlite`.**
A citação vem escrita ao lado do número, no formato `[tabela]`, e a tabela é consultável. Não há
número neste documento que venha da memória do autor, de um documento de terceiros, ou da prosa da
proposta que o encomendou.

**Onde o dado não existe, o texto diz que não existe, e diz por quê.** Um bloco inteiro deste
dossiê — o Bloco 4, Formação médica — segue sem fundamento empírico para a pergunta que a
proposta original fez: quantos médicos o DF forma e retém. O que ele agora tem é um proxy de
vínculos ativos na rede SES-DF (seção 4.1), uma pergunta vizinha e não a mesma, declarada como
tal. Essa é a diferença entre um documento que pode ser conferido e um que pode apenas ser
acreditado.

**Três limites que valem para o documento inteiro:**

1. **O parâmetro normativo central é transcrito, não extraído — ele foi buscado na fonte,
   em 2026-08-28, e o pedido foi barrado.** Os déficits de leitos são calculados contra a Portaria GM/MS 1.101/2002, cujo
   Anexo — onde os parâmetros estão — não é publicado no HTML que este projeto conseguiu baixar.
   O número do parâmetro chegou aqui digitado à mão por um extrator superado. O Anexo está
   publicado como PDF em `bvsms.saude.gov.br`, host que foi registrado e alcançado:
   **DNS, TCP e TLS completam, e o servidor então fecha a conexão sem enviar um byte** — um WAF
   F5 BigIP ASM, que se identifica pela própria página de bloqueio. O estado é `blocked`
   `[eixos_cobertura]`, a camada é remedida a cada execução `[alcance_hosts]`, e o parâmetro
   continua `estado_fonte: transcrito` em toda linha que o usa `[dimensionamento_df]`.
   O Bloco 3 volta a esse ponto.
2. **A Portaria 1.101/2002 foi revogada.** Ela é usada porque é o parâmetro que a proposta
   pediu e porque nenhuma norma vigente com parâmetro de leito por habitante foi adquirida.
   Um déficit calculado contra ela é aritmética contra uma régua fora de vigência, e é assim
   que deve ser lido.
3. **O denominador populacional é a PDAD-A 2024 do IPEDF**, 2.861.057 habitantes urbanos em
   35 RAs `[populacao_pdad_ra]`. O Censo 2022 do IBGE dá 2.817.381 para 33 RAs
   `[populacao_censo_ra]`, e o Plano Distrital de Saúde usa 3.130.014 sem nenhuma
   desagregação por RA. As três leituras estão na tabela do DF `[dimensionamento_df]`,
   porque a escolha do denominador move o déficit em mais de mil leitos.

---

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
vencimentos continua bloqueada pelo mesmo host que barra o antigo Eixo 4 desde a primeira
tentativa, em 2026-08-27 (seção 5.2).

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

## Bloco 1 — Indicadores de saúde

**Este bloco não existia neste documento até 2026-09-10.** Mortalidade, natalidade, cobertura
vacinal e esperança de vida ao nascer são as quatro séries mais elementares de um diagnóstico de
saúde pública, e nenhuma delas tinha uma linha aqui até aquela data — este bloco é a primeira vez
que elas chegam ao dossiê.

### 1.1 Mortalidade infantil e materna, natalidade

Série completa, 2000-2024, DF, SIM/SINASC `[sim_obitos, sinasc_serie, mortalidade_infantil,
mortalidade_materna]`:

| Ano | Nascidos vivos | Óbitos < 1 ano | Mortalidade infantil (por mil) | Óbitos maternos | Razão de mortalidade materna (por 100 mil) |
|---|---|---|---|---|---|
| 2000 | 47.991 | 691 | 14,3985 ‰ | 17 | 35,4233 |
| 2001 | 46.891 | 712 | 15,1842 ‰ | 14 | 29,8565 |
| 2002 | 45.799 | 625 | 13,6466 ‰ | 16 | 34,9353 |
| 2003 | 46.097 | 613 | 13,2980 ‰ | 10 | 21,6934 |
| 2004 | 45.593 | 636 | 13,9495 ‰ | 20 | 43,8664 |
| 2005 | 45.917 | 626 | 13,6333 ‰ | 19 | 41,3790 |
| 2006 | 45.152 | 578 | 12,8012 ‰ | 21 | 46,5096 |
| 2007 | 44.098 | 489 | 11,0889 ‰ | 17 | 38,5505 |
| 2008 | 44.173 | 525 | 11,8851 ‰ | 26 | 58,8595 |
| 2009 | 43.932 | 522 | 11,8820 ‰ | 23 | 52,3536 |
| 2010 | 44.251 | 559 | 12,6325 ‰ | 20 | 45,1967 |
| 2011 | 43.465 | 499 | 11,4805 ‰ | 19 | 43,7133 |
| 2012 | 43.497 | 506 | 11,6330 ‰ | 19 | 43,6812 |
| 2013 | 44.530 | 567 | 12,7330 ‰ | 25 | 56,1419 |
| 2014 | 44.721 | 510 | 11,4040 ‰ | 20 | 44,7217 |
| 2015 | 46.122 | 488 | 10,5806 ‰ | 16 | 34,6906 |
| 2016 | 43.340 | 447 | 10,3138 ‰ | 24 | 55,3761 |
| 2017 | 44.568 | 494 | 11,0842 ‰ | 23 | 51,6065 |
| 2018 | 44.195 | 453 | 10,2500 ‰ | 24 | 54,3048 |
| 2019 | 42.422 | 362 | 8,5333 ‰ | 9 | 21,2154 |
| 2020 | 39.361 | 384 | 9,7558 ‰ | 22 | 55,8929 |
| 2021 | 38.035 | 402 | 10,5692 ‰ | 41 | 107,7955 |
| 2022 | 35.928 | 362 | 10,0757 ‰ | 21 | 58,4502 |
| 2023 | 35.551 | 386 | 10,8576 ‰ | 21 | 59,0701 |
| 2024 | 33.282 | 349 | 10,4861 ‰ | 18 | 54,0833 |

**As duas séries reconciliam contra o total que o próprio publicador fecha, quase inteiras.**
`sim_reconciliacao` relata **zero linhas divergentes em 25 anos** `[sim_reconciliacao]`.
`sinasc_reconciliacao` relata **1 linha divergente em 25 anos** — 2015, marcada `revisão`, onde
os microdados somam 46.122 nascidos vivos contra 46.120 no total fechado pelo TABNET, uma
diferença de 2 registros não reconciliada e não corrigida por este documento
`[sinasc_reconciliacao]`.

**O que a série não suaviza.** A razão de mortalidade materna não cai de forma monótona: depois de
oscilar entre 21,7 e 58,9 por 100 mil ao longo da década de 2000 e 2010, ela salta para **107,80**
em 2021 — o ano de pico da pandemia de covid-19 no Brasil — antes de recuar para a faixa de
54 a 59 nos três anos seguintes. Este documento publica o pico junto com a série inteira; recortar
só o início e o fim esconderia exatamente o ano que mais precisa de explicação.

### 1.2 Cobertura vacinal e esperança de vida ao nascer

**Esta seção não vira uma tabela, e a razão é o formato do próprio dado.** `cobertura_vacinal`
tem 329 linhas cobrindo 26 imunobiológicos distintos entre 2000 e 2022 `[cobertura_vacinal]` —
reduzi-la a uma tabela por ano exigiria escolher um imunobiológico para representar os outros 25,
ou inventar uma média que a fonte não publica. Este documento não faz nenhuma das duas coisas; o
que segue é uma leitura em prosa, sobre uma vacina, citada por inteiro.

**A cobertura de poliomielite caiu, e ultrapassou 100 % pelo caminho.** Em 2000 ela estava em
**99,53 %**; em 2016, em **136,83 %** — um valor acima de 100 % é uma característica real do
cálculo de cobertura, que divide doses aplicadas pela população-alvo estimada, e não um erro deste
documento a esconder; em 2022, último ano da série, **78,33 %** `[cobertura_vacinal]`. **A série
para em 2022 porque o publicador mudou de painel**: a partir de 2023 os dados do SI-PNI passaram a
um sistema num host (`infoms.saude.gov.br`) que este projeto não tem registrado no seu registro de
acesso, e não foram coletados nesta ordem de serviço — uma lacuna nomeada, não um ano omitido em
silêncio.

**A esperança de vida ao nascer é uma projeção, não uma contagem.** A série do IBGE (SIDRA 7362)
vai de **72,25 anos em 2000** a **79,89 em 2024** `[esperanca_vida]`, mas é explicitamente uma
série de **projeção populacional**, não um dado observado ano a ano — o próprio IBGE a publica
assim, e este documento não a apresenta como se fosse outra coisa.

---

## Bloco 2 — Atenção primária

**A porta de entrada do sistema tinha, até 2026-09-13, zero tabela neste documento** — a seção
0.4 da versão anterior deste dossiê dizia isso explicitamente, e essa afirmação deixou de ser
verdadeira para duas das suas três necessidades. O que mudou e o que continua faltando estão
separados abaixo, e nenhuma das duas coisas é dita pela metade.

### 2.1 Equipes ESF e UBS

Série histórica por competência, CNES, 2007-2026 `[equipes_aps_serie, ubs_serie,
habitantes_por_equipe]`:

| Ano | Equipes ESF | UBS | Habitantes por equipe |
|---|---|---|---|
| 2007 | 33 | 174 | não medido |
| 2008 | 43 | 173 | não medido |
| 2009 | 92 | 171 | não medido |
| 2010 | 119 | 171 | não medido |
| 2011 | 117 | 173 | não medido |
| 2012 | 174 | 165 | não medido |
| 2013 | 205 | 174 | não medido |
| 2014 | 242 | 176 | não medido |
| 2015 | 250 | 187 | não medido |
| 2016 | 248 | 180 | não medido |
| 2017 | 295 | 177 | não medido |
| 2018 | 484 | 175 | não medido |
| 2019 | 375 | 176 | não medido |
| 2020 | 592 | 179 | não medido |
| 2021 | 605 | 180 | não medido |
| 2022 | 615 | 181 | 4.581,11 |
| 2023 | 631 | 178 | não medido |
| 2024 | 639 | 177 | 4.667,70 |
| 2025 | 645 | 182 | não medido |
| 2026 | 649 | 182 | não medido |

**O número de equipes cresceu quase vinte vezes; o de UBS quase não se mexeu.** De 33 equipes de
Saúde da Família em 2007 para 649 em 2026 é um crescimento sustentado; o número de UBS oscila
entre 146 e 187 no mesmo intervalo, sem tendência clara — o crescimento da cobertura, onde
existiu, veio de mais equipes por unidade, não de mais unidades `[equipes_aps_serie, ubs_serie]`.

**A razão de habitantes por equipe só está medida em dois dos vinte anos da série, e a tabela diz
isso em vez de interpolar.** Este projeto só tem população do DF verificada contra o publicador
para o ano do Censo (2022) e o ano da PDAD-A (2024); os demais dezoito anos ficam `não medido`
`[habitantes_por_equipe]`, porque estimar uma população para preencher a lacuna seria exatamente o
tipo de conta que este documento se recusa a fazer.

### 2.2 O que ainda não pode ser medido

**A versão anterior desta seção dizia, por inteiro:** *"Cobertura da APS, equipes de Saúde da
Família e agentes comunitários por RA, e internações por condições sensíveis à atenção primária
(ICSAP): nenhum dos dois está neste repositório."* Isso deixou de ser inteiramente verdade — as
equipes agora estão, na seção anterior — e o que continua faltando é mais estreito do que a frase
antiga dizia.

**A cobertura da APS deixou de estar ausente em 2026-09-20, e o parágrafo que a declarava
ausente fica citado em vez de apagado.** Ele dizia, por inteiro: *"A cobertura percentual da APS
continua ausente, e a causa agora é medida, não presumida. Em 2026-09-13 leu-se por inteiro o pacote JavaScript
da interface pública do e-Gestor APS e não encontrou, em nenhum ponto dele, uma chamada a um
endpoint de cobertura a partir do host que o próprio código declara como base — apenas ativos
estáticos, um blog e uma página institucional `[eixos_cobertura]`. `relatorioaps.saude.gov.br`, o
portal de relatórios que o mesmo pacote referencia, não está autorizado pelo registro de acesso
deste projeto, e alcançá-lo é uma decisão do operador, não deste bloco."*

**A decisão foi do operador, e veio em 2026-09-19**: `relatorioaps.saude.gov.br` e a API que o
próprio pacote daquele portal declara (`relatorioaps-prd.saude.gov.br`) entraram no registro de
acesso antes da primeira requisição a qualquer um dos dois, e a série está na seção seguinte. **O
que se mediu em 2026-09-13 continua verdadeiro**: a interface lida não serve cobertura nenhuma —
o que mudou não foi a leitura, foi o host autorizado.

**O recorte abaixo do DF continua ausente, e essa parte da lacuna não se fechou.** A série é
publicada com o DF como uma unidade geográfica só. Três recortes menores foram pedidos à própria
API e os três foram recusados por ela, cada um com a resposta que devolveu: `REGIAO_SAUDE` (HTTP
400), `REGIAOSAUDE` (HTTP 500) e `MUNICIPIO` (HTTP 200 com zero linhas — o DF é um município
único) `[aps_cobertura_ausencias]`. **Nenhum valor é rateado ou estimado para obter o recorte que
a interface não serve.**

**O ICSAP está classificado como `acquired`, e o rótulo por si só engana.** A função que produz
`icsap_serie` roda a cada execução, mas nenhuma das duas fontes candidatas para a lista de CID-10
da Portaria SAS/MS 221/2008 respondeu quando este bloco foi escrito — nem `www.gov.br`, nem
`bvsms.saude.gov.br` mesmo testado com um navegador real, em 2026-09-11 — de modo que toda linha que a
função produz hoje é uma lacuna nomeada, nunca uma lista de CID-10 transcrita à mão
`[icsap_serie]`. Sem essa lista, este documento não classifica nenhuma internação como sensível à
atenção primária.

### 2.3 Cobertura da atenção primária, como o publicador a mede

**São três métodos e duas tabelas, e a separação é estrutural, não um aviso em prosa.** A API do
e-Gestor APS serve cobertura por três caminhos distintos — `/cobertura/ab`, `/cobertura/acs` e
`/cobertura/aps` — e eles **não medem a mesma coisa**. O método `ab` parametriza a cobertura pela
carga horária das equipes de atenção básica; o método `aps`, que o substitui a partir do Previne
Brasil, parametriza pela **capacidade cadastral** de cada tipo de equipe. Emendar as duas séries
produziria uma curva contínua que nenhum dos dois métodos jamais mediu, e por isso a coluna
`metodo` existe na tabela e as duas séries aparecem aqui separadas `[aps_cobertura_egestor]`.

**Nenhum valor é renomeado.** `pcCoberturaAb`, `pcCoberturaSf`, `qtEsf`, `qtPopulacao`,
`qtCapacidadeEquipe` e `qtCobertura` são os nomes de campo do próprio publicador, e é assim que
cada célula abaixo pode ser conferida contra a API sem passar por este documento.

**Um desses nomes engana, e o registro disso é parte do método.** No método `aps` o campo
`qtCobertura` é **percentual** — 76,3 em 12/2025 —, apesar do prefixo `qt` que o publicador usa em
todos os demais campos para contagens absolutas; quem é absoluto ali é `qtCapacidadeEquipe`, a
quantidade de pessoas que as equipes cadastradas comportam. A primeira versão desta seção leu o
prefixo em vez do valor e teria publicado *"76 pessoas cobertas"* em uma unidade federativa de
três milhões de habitantes. As duas grandezas saem abaixo em colunas próprias, cada uma com a
unidade no cabeçalho.

**Método `ab` — parametrizado por carga horária, dezembro de cada ano** `[aps_cobertura_egestor]`:

| Ano | População | Equipes ESF | Cobertura AB (%) | Cobertura ESF (%) |
|---|---|---|---|---|
| 2007 | 2.383.784 | 33 | 42,46 % | 4,77 % |
| 2008 | 2.455.903 | 41 | 40,46 % | 5,75 % |
| 2009 | 2.557.158 | 92 | 46,98 % | 12,41 % |
| 2010 | 2.606.885 | 119 | 46,44 % | 15,74 % |
| 2011 | 2.570.160 | 117 | 50,21 % | 15,70 % |
| 2012 | 2.609.997 | 174 | 53,84 % | 23,00 % |
| 2013 | 2.648.532 | 205 | 59,71 % | 26,70 % |
| 2014 | 2.789.761 | 242 | 62,45 % | 29,92 % |
| 2015 | 2.852.372 | 250 | 62,96 % | 30,23 % |
| 2016 | 2.914.830 | 247 | 60,98 % | 29,23 % |
| 2017 | 2.977.216 | 290 | 58,33 % | 33,60 % |
| 2018 | 3.039.444 | 483 | 61,26 % | 54,82 % |
| 2019 | 2.974.703 | 372 | 53,36 % | 43,14 % |
| 2020 | 3.015.268 | 472 | 58,72 % | 54,00 % |

**Método `aps` — parametrizado por capacidade cadastral, última competência de cada ano** `[aps_cobertura_egestor]`:

| Competência | População | Equipes ESF | Capacidade das equipes | Cobertura APS (%) |
|---|---|---|---|---|
| 12/2021 | 3.055.149 | 605 | 2.156.085 | 70,6 % |
| 12/2022 | 3.094.325 | 615 | 2.157.926 | 69,7 % |
| 12/2023 | 2.817.381 | 629 | 2.233.062 | 79,3 % |
| 12/2024 | 2.817.381 | 638 | 2.265.691 | 80,4 % |
| 12/2025 | 2.982.818 | 642 | 2.276.188 | 76,3 % |
| 07/2026 | 2.996.899 | 649 | 2.271.500 | 75,8 % |

**A descontinuidade entre as duas tabelas é do publicador, não deste documento.** A série `ab`
termina em dezembro de 2020 e a série `aps` começa em janeiro de 2021; o que houve entre elas foi
uma mudança de método de financiamento e de contagem, e este documento a registra como corte, não
como queda ou alta.

---

## Bloco 3 — Leitos e hospitais regionais

**Este é o eixo com fundamento empírico mais forte do documento, e o único cujo resultado é
original.** Nenhum documento público sobre saúde no DF fez este cruzamento por região de saúde:
os dados estão no CNES, e o que faltava era cruzá-los com o parâmetro normativo e com a população
por Região Administrativa. O método completo está em [`DIMENSIONAMENTO.md`](metodo/dimensionamento.md);
a atribuição de cada estabelecimento à sua RA está em [`SPINE.md`](metodo/spine.md).

### 3.1 A oferta atual

Leitos SUS existentes no DF, competência 2026-07 `[leitos_internacao, leitos_complementares]`:

| Categoria | Existentes | SUS |
|---|---|---|
| Cirúrgicos | 2.154 | 1.589 |
| Clínicos | 2.751 | 1.534 |
| Obstétricos | 787 | 614 |
| Pediátricos | 682 | 617 |
| Outras especialidades | 951 | 432 |
| Hospital/dia | 562 | 82 |
| **Total** | **7.887** | **4.868** |

**Os seis grupos são os seis que o CNES publica, e a tabela os traz todos porque a linha de
total é a que o resto do documento usa.** Uma versão anterior desta tabela listava quatro
grupos e somava 4.354, enquanto o texto abaixo dela citava 4.868: a diferença eram as 432
camas de *outras especialidades* e as 82 de *hospital/dia*, presentes no consolidado e ausentes
da tabela. Um leitor que somasse a coluna não chegava ao número em que o documento inteiro se
apoia, e é por isso que a linha de total existe.

Consolidado para o dimensionamento `[dimensionamento_df]`: **4.868 leitos SUS de enfermaria**
(adulto e pediátrica em conjunto, que é o escopo do parâmetro), **442 leitos de UTI adulto**,
134 de UTI pediátrica, 86 de UTI neonatal e 82 de cuidados intermediários e isolamento.

**Os dois 82 são grandezas diferentes e coincidem por acaso**: o da tabela é o grupo
*hospital/dia* dos leitos de internação; o do parágrafo é a soma dos leitos complementares de
cuidados intermediários e isolamento `[leitos_complementares]`. Ambos são conferidos
separadamente.

### 3.2 O que o método pede

**Esta seção foi recalculada por inteiro, e os números que ela publicava estão citados abaixo em
vez de apagados.** Até 2026-09-06 o dimensionamento de leitos gerais deste projeto era a Portaria
GM/MS 1.101/2002 — 2,5 a 3 leitos por 1.000 habitantes — aplicada sobre uma população. A norma foi
**revogada em 2015**, e nenhum artefato deste repositório jamais conteve o texto dela: o parâmetro
chegava aqui **digitado à mão**. O que está publicado agora é a **Equação 1 do Caderno de Critérios
e Parâmetros Assistenciais do SUS (MS, 2017)** — o documento que substituiu a 1.101 — medida com os
dados que este projeto adquiriu `[dimensionamento_df]`:

| | |
|---|---|
| População (PDAD-A 2024, 35 RAs) | 2.861.057 |
| Leitos SUS de enfermaria (escopo largo) | 4.868 |
| Leitos SUS comparáveis com a Equação 1 | 3.711 |
| Necessário pela Equação 1 (recusa 5 % a 1 %) | 3.000 a 3.132 |
| **Superávit** | **579 a 711 leitos** |
| **Superávit relativo** | **18,5 % a 23,7 %** |

**O que a tabela anterior dizia, palavra por palavra, porque um leitor que a leu precisa saber o
que leu:** *"Necessário pelo parâmetro | 7.153 a 8.583 · **Déficit** | **2.285 a 3.715 leitos** ·
**Déficit relativo** | **31,9 % a 43,3 %**"*, e, sobre os outros dois denominadores, *"com o Censo
2022 do IBGE (2.817.381) o déficit cai para 2.175–3.584; com a estimativa do PDS (3.130.014) sobe
para 2.957–4.522"*. **O sinal do resultado agregado inverteu-se.**

**Por que inverteu, dito sem suavizar.** Os dois cálculos usam o mesmo CNES e chegam a sinais
opostos porque respondem a perguntas diferentes. A 1.101 aplicava uma razão fixa à população: *se
o DF tivesse 2,5 leitos por mil habitantes, teria 7.153*. A Equação 1 monta a necessidade a partir
da **permanência efetivamente observada** — dias de internação de residentes medidos no SIH de
2024, corrigidos pelo fluxo de não-residentes (Fnre) e divididos pela taxa de ocupação esperada do
Quadro 43 — e responde: *para atender, com fila de 1 % a 5 %, exatamente as internações que
aconteceram, bastam 3.000 a 3.132 leitos dos tipos que a equação cobre*.

**A ressalva que vale mais do que o número, e que o próprio método impõe.** A taxa de internação
usada aqui é **medida**, não normativa: são as internações que o sistema conseguiu fazer. Demanda
reprimida — quem não foi internado porque não havia leito, quem desistiu na fila, quem morreu antes
— **não aparece no SIH e portanto não aparece nesta conta**. O Caderno prevê corrigir isso pelo
fator FRe; o próprio documento (Quadro 44) fixa **FRe = 1** para quem programa com taxas medidas do
SIH, e é o que está aplicado. **Este superávit significa "há leitos suficientes para continuar
fazendo o que já se faz", e não "há leitos suficientes para a necessidade do DF".** As duas frases
são diferentes e o documento não troca uma pela outra.

**Duas mudanças de escopo estão embutidas na tabela e nenhuma é cosmética.** Primeira: o `necessário`
cobre seis categorias — clínica e cirúrgica × <15 / 15-59 / 60+ — e **não** cobre obstetrícia nem
neonatologia, que continuam sem fonte (falta o Fator de Correção do sub-registro do SINASC).
Comparar essa necessidade parcial contra os 4.868 leitos de *enfermaria adulto + pediátrica* somava
614 leitos obstétricos, 432 de outras especialidades e 82 de hospital/dia que a necessidade nunca
foi calculada para cobrir — uma subtração entre coisas diferentes, que fabricava superávit. A linha
`Leitos SUS comparáveis com a Equação 1` é a soma dos tipos CNES 1 (cirúrgico), 2 (clínico) e 5
(pediátrico), os que a equação de fato cobre, **menos os 45 leitos de saúde mental que o CNES
arquiva sob o tipo 2**: a demanda deles é a especialidade SIH 05/87, fora do conjunto 01/03/07 que
a equação calcula, e contá-los como capacidade sem contar sua demanda seria a mesma assimetria
`[dimensionamento_regiao]`. Segunda: **a Equação 1 não divide por população
nenhuma**, então a dependência do denominador que a seção anterior declarava simplesmente não
existe mais aqui. Os três totais oficiais continuam publicados — PDAD-A 2.861.057, Censo 2022
2.817.381, PDS 3.130.014, **11,1 % de divergência entre eles** — porque a discordância entre as
estatísticas do próprio DF continua sendo um achado `[dimensionamento_df]`.

**Nenhum número desta seção é digitado à mão.** Os dias de permanência e o Fnre vêm do SIH/RD 2024;
a taxa de ocupação esperada (92 % a 1 % de recusa, 96 % a 5 %) é **extraída do Quadro 43 do PDF
do Caderno a cada execução** `[taxas_ocupacao_quadro43]`, não transcrita; FRe = 1 é a convenção que
o próprio Quadro 44 declara. Se a extração do quadro parar de funcionar, a derivação falha — não há
literal para o qual cair.

### 3.3 Onde o déficit está — a tabela que importa

Leitos SUS por região de saúde, contra a Equação 1 do Caderno de 2017, PDAD-A 2024
`[dimensionamento_regiao]`. A coluna `Leitos SUS` é o escopo comparável (tipos CNES 1, 2 e 5):

| Região | População | Leitos SUS | Leitos/1.000 | Necessário | Déficit |
|---|---|---|---|---|---|
| Central | 360.482 | 1.568 | **4,35** | 235–244 | superávit de 1.324 a 1.333 |
| Sul | 255.583 | 694 | 2,72 | 438–454 | superávit de 240 a 256 |
| Oeste | 437.685 | 495 | 1,13 | 577–604 | 82 a 109 |
| Norte | 330.604 | 245 | 0,74 | 429–448 | 184 a 203 |
| Leste | 296.755 | 206 | 0,69 | 299–312 | 93 a 106 |
| Sudoeste | 837.326 | 443 | 0,53 | 640–666 | **197 a 223** |
| Centro-Sul | 342.622 | 60 | **0,18** | 300–314 | **240 a 254** |

**ESTE É O ACHADO QUE SOBREVIVEU À TROCA DE MÉTODO, E É POR ISSO QUE ELE IMPORTA.** O resultado
agregado do DF inverteu de déficit para superávit quando a Portaria 1.101/2002 saiu do cálculo
(seção 3.2). **A desigualdade regional não inverteu.** Continuam sendo **duas regiões com
superávit e cinco com déficit**, com os mesmos nomes nos mesmos lados, medidos agora por um método
que não usa nenhum parâmetro digitado à mão e não divide por população. Um achado que resiste à
substituição do método é de outra natureza que um achado que depende dele.

**A tabela anterior, citada porque um leitor a leu:** *"Central | 2.061 | **5,72** | 901–1.081 |
superávit de 980 a 1.160 … Sudoeste | 652 | 0,78 | 2.093–2.512 | **1.441 a 1.860** … Centro-Sul |
60 | **0,18** | 857–1.028 | 797 a 968"*. Os déficits encolheram — a soma das cinco regiões
deficitárias cai de **3.667–4.789** para **796–895** `[dimensionamento_regiao]` — porque a
necessidade total encolheu, não porque a distribuição melhorou.

**A concentração, medida sem nenhum parâmetro:** a Central tem **1.568** dos 3.711 leitos
comparáveis do DF — **42,3 %** — para uma necessidade de 235 a 244 leitos, com **12,6 %** da
população. A Centro-Sul tem **60** leitos para uma necessidade de 300 a 314. A razão entre a
melhor e a pior região é de **24 para 1** em leitos por mil habitantes — era 32 para 1 na leitura
anterior, que media o escopo largo. A região mais populosa do
DF — a Sudoeste, com 837 mil habitantes, 2,3 vezes a população da Central — tem menos de um terço
dos leitos da Central.

**A Central não está "sobrando" no sentido trivial.** Ela abriga os hospitais de referência que
atendem o DF inteiro e parte do Entorno, e um leito de referência não é substituível por um leito
de bairro. O que a tabela mede é que **a capacidade não acompanhou o deslocamento da população**,
e que o custo disso é pago em deslocamento por quem mora longe dela.

### 3.4 Por Região Administrativa: 20 das 35 não têm nenhum leito

`[dimensionamento_ra]` — RAs com **zero** leito SUS dos tipos que a Equação 1 cobre:

> Arapoanga, Arniqueira, Candangolândia, Fercal, Guará, Itapoã, Núcleo Bandeirante, Park Way,
> Recanto das Emas, Riacho Fundo, Riacho Fundo II, SCIA, São Sebastião, Sobradinho II,
> Sol Nascente/Pôr do Sol, Sudoeste/Octogonal, Varjão, Vicente Pires, Água Quente e Águas Claras.

**Somadas, essas 20 RAs abrigam 1.213.813 pessoas — 42,4 % da população do Distrito Federal.**

**Eram 18 e 972.891 pessoas (34,0 %) na versão anterior, e as duas que entraram entraram por
mudança de escopo, não por fechamento de leito**: São Sebastião tinha 4 leitos e Águas Claras 8,
todos de tipos CNES que a Equação 1 não cobre. A lista mede agora *ausência de leito clínico,
cirúrgico ou pediátrico*, que é a pergunta que o método faz.

Os oito maiores déficits absolutos por RA, pela Equação 1:

| RA | População | Leitos SUS | Déficit | Déficit % |
|---|---|---|---|---|
| Samambaia | 227.118 | 82 | 170–181 | 68,8 % |
| Planaltina | 121.856 | 96 | 136–146 | 60,3 % |
| Recanto das Emas | 105.862 | 0 | 130–135 | 100,0 % |
| São Sebastião | 99.050 | 0 | 110–114 | 100,0 % |
| Guará | 127.952 | 0 | 101–105 | 100,0 % |
| Itapoã | 67.021 | 0 | 59–62 | 100,0 % |
| Riacho Fundo II | 70.180 | 0 | 59–62 | 100,0 % |
| SCIA | 38.047 | 0 | 47–50 | 100,0 % |

**A tabela anterior, citada em vez de apagada:** *"Samambaia | 132 | 436–549 | 80,6 % · Águas
Claras | 8 | 347–418 | 98,1 % · Guará | 0 | 320–384 | 100,0 % · Sol Nascente/Pôr do Sol | 0 |
272–326 · Recanto das Emas | 0 | 265–318 · Vicente Pires | 0 | 263–315 · Ceilândia | 550 |
168–311 | 36,1 % · São Sebastião | 4 | 244–293 | 98,7 %"*. **Ceilândia saiu da lista dos oito
maiores déficits** — pelo método medido, suas 550 camas (270 no escopo comparável) cobrem a
demanda observada dos seus próprios residentes.

**23 das 35 RAs ficam em déficit** `[dimensionamento_ra]`, e a leitura correta disso é
*concentração*, não escassez: o DF tem no agregado mais leitos do que a demanda observada exige, e
mesmo assim dois terços das suas Regiões Administrativas ficam abaixo do que a demanda dos seus
próprios moradores pediria.

**A tabela por RA exige duas ressalvas que a tabela por região não exige, e a segunda é nova.**
Primeira: um leito atende uma região, não um bairro — aplicar o método a uma RA isolada trata cada
RA como se devesse ser autossuficiente, o que nenhuma norma pede. Ela está aqui porque mostra *onde
a distância é maior*, não porque Guará devesse ter 105 leitos próprios. Segunda, e é o preço de ter
conseguido a desagregação: **a necessidade é calculada por RA de RESIDÊNCIA e a capacidade por RA
de LOCALIZAÇÃO do hospital.** As duas colunas da tabela respondem a perguntas diferentes sobre a
mesma linha. É deliberado — é exatamente a distância entre onde as pessoas moram e onde os leitos
estão que a tabela existe para medir — mas um `0` na coluna de leitos não significa que os
moradores daquela RA não foram internados: significa que foram internados em outro lugar.

### 3.5 UTI — onde o resultado se inverte

Aplicado como a norma o escreve — de 4 % a 10 % do total de leitos hospitalares SUS — o DF tem
**662 leitos de UTI contra 224 a 561 exigidos: um superávit** `[dimensionamento_df]`.

Esse resultado merece desconfiança e recebe. Uma versão anterior do cálculo estreitava o
parâmetro para "UTI adulto sobre leitos de enfermaria" e produzia o resultado oposto — um déficit.
O estreitamento era invenção do projeto, não da norma, e foi removido `[dimensionamento_df]`.
**O superávit é o que a norma diz quando lida como está escrita**, e o documento prefere publicar
um resultado incômodo a publicar um resultado conveniente obtido por leitura enviesada.

O único parâmetro deste documento **extraído** de um documento que o repositório possui — e não
transcrito — é o da UTI neonatal: 2 leitos por 1.000 nascidos vivos, Quadro 5 do Caderno de
Critérios e Parâmetros do MS de 2017, lido do PDF a cada execução `[parametros_caderno_2017]`.
Contra 33.282 nascidos vivos em 2024 `[nascidos_vivos_peso]`, exige 67 leitos; existem 86.
**Superávit de 19.**

**Uma segunda leitura, publicada AO LADO desta e NUNCA a substituindo, mede UTI adulto e UTI
pediátrica pelas Equações 2 e 3 do mesmo Caderno 2017** — as duas grandezas que uma revisão
deste documento, em 2026-09-06, apontou como sub-medidas por ele: o SIH **marca sim** se uma internação usou UTI e por quantos
dias (campos `MARCA_UTI` e `UTI_MES_TO`, presentes no leiaute reduzido desde sempre); o que
faltava era só a tabela de códigos do `MARCA_UTI`, que separa UTI adulto de pediátrica e de
neonatal — agora **extraída** de um documento fetchado (DATASUS `ftp.datasus.gov.br`,
`TAB_SIH.zip`, membro `CNV/MARCAUTI.CNV`), nunca digitada `[leitos_uti_caderno2017]`. Pelo SIH
de 2024: **UTI adulto** tem 9,48 % das internações gerais residentes (exclui Obstetrícia,
UNSOURCED) com dia de UTI, média de 8,78 dias — exige entre 294 e 306 leitos contra os **442**
instalados, **superávit de 136 a 148**. **UTI pediátrica** tem 6,06 %, média de 9,25 dias —
exige entre 105 e 113 leitos contra os **134** instalados, **superávit de 21 a 29**. As duas
leituras concordam no sinal com a faixa da Portaria acima — nenhuma aponta déficit — e os dois
totais de leitos somados à UTI neonatal (442 + 134 + 86) fecham exatamente nos **662** leitos de
UTI do parágrafo anterior. **UTI neonatal não entra nesta segunda leitura**: falta o NIe
(internações gerais) de Neonatologia, ela própria `UNSOURCED` (§3.6) por um motivo que não tem
nada a ver com o `MARCA_UTI` — um bloqueio herdado, não um dado que falte no SIH.

### 3.6 O que este bloco não conseguiu calcular

`[dimensionamento_df]`, linhas com `estado: UNSOURCED` — quatro parâmetros que a proposta pedia
e que este documento se recusa a inventar:

| Parâmetro | Por que não foi calculado |
|---|---|
| UTI adulto por mil habitantes | o número chega pela prosa da proposta, não por artefato; não está na transcrição da portaria |
| UTI pediátrica | a proposta manda contar e não fornece parâmetro |
| UTI neonatal por partos de risco | exigiria este projeto definir "parto de risco" por conta própria |
| Hemodiálise | o parâmetro **existe** e é extraível (Quadro 28B do Caderno de 2017); falta o denominador — população de 20 anos ou mais por RA, que este repositório não tem |

### 3.7 O SIH entrou, e com ele o termo que ninguém publica

**A seção 3.6 dizia, até 2026-09-03, que rodar o método de 2017 exigiria dados do SIH que este
projeto não tinha. Não é mais verdade.** A série do SIH foi adquirida em **duas interfaces**,
e a razão de terem sido duas é o achado: o Quadro 38 do caderno de 2017 pede internações cruzando
**faixa etária** com **especialidade do leito**, e o TABNET não faz esse cruzamento — as duas
dimensões vivem em arquivos `.def` diferentes, e o TABNET só cruza dimensões dentro de um mesmo
arquivo. Isso foi **medido** contra as quatro famílias `.def` do SIH que este projeto alcança, não
suposto `[sih_probes_def]`. O registro da AIH, nos microdados reduzidos, carrega os dois campos na
mesma linha `[sih_microdados_espec_faixa]`.

**As duas leituras do SIH são um par, e nenhuma é "a" figura.** Uma conta internações de
**residentes** do DF onde quer que tenham acontecido; a outra conta internações que **aconteceram
no DF**, de quem quer que fosse. Em 2024 foram **183.422** e **234.446** `[sih_serie_tabnet]`.

**Essas duas não se dividem uma pela outra, e vale dizer por quê.** A razão entre elas não é o PIr:
o numerador inclui residentes do DF internados **fora** do DF, que por definição não estão no
denominador. O PIr do caderno de 2017 é o percentual de residentes **entre as internações que
aconteceram aqui**, e é isso que este projeto calcula, registro a registro, pelo município de
residência de cada AIH `[sih_residencia_fnr]`. A conta pela subtração das duas leituras dá
1,2782 e está errada por construção; a conta certa dá **1,2887**.

**A diferença é o achado que muda o dimensionamento.** Em 17 anos, **733.271 internações
ocorridas no DF foram de pessoas que não moram no DF — 21,4 % do total**
`[sih_residencia_fnr]`. O caderno converte o PIr no fator `Fnr = 100/PIr`, que multiplica todo
requisito de leitos. Em 2024 o PIr do DF é **77,60 %**, ou seja **Fnr = 1,2887**
`[sih_residencia_fnr]`: **cerca de 29 % a mais de leitos** do que a população residente sozinha
pediria.

**E é estrutural, não conjuntural.** O PIr fica entre **76,04 %** (2013) e **82,44 %** (2011) em
todos os 17 anos, sem tendência `[sih_residencia_fnr]`. O DF é o núcleo de uma RIDE e interna
gente de Goiás e de Minas por desenho; qualquer conta de leitos para o DF feita só sobre a
população residente subestima a necessidade por um fator que este documento agora mede em vez de
supor.

**O que isto passou a permitir, e o que ainda não.** O termo da ANS que faltava foi adquirido
— a população de referência do Quadro 37, *"× proporção sem plano de saúde"*, por faixa etária — e
computou a Equação 1 para **seis das onze** combinações tipo-leito/especialidade do Quadro 38:
pediatria clínica e cirúrgica, e clínica/cirúrgica adulto nas duas faixas etárias. As outras
cinco — Obstetrícia, Neonatologia e as três categorias de UTI — continuam `UNSOURCED` **nesta
tabela**, que só cobre leitos gerais (Equação 1); nenhuma por um número inventado.
Obstetrícia e Neonatologia, porque falta o fator de correção do sub-registro do SINASC. **A
frase que estava aqui até 2026-09-18 dizia que as três categorias de UTI ficavam UNSOURCED
porque "o SIH não marca internação com UTI nem sua duração" — isso era FALSO, corrigido na
revisão de 2026-09-18: o SIH marca as duas
coisas (`MARCA_UTI`, `UTI_MES_TO`); o que faltava era a tabela de códigos do `MARCA_UTI`, agora
extraída, nunca digitada.** UTI adulto e UTI pediátrica **são calculadas**, pelas Equações 2 e 3,
na tabela `leitos_uti_caderno2017` (§3.5), publicada ao lado da faixa da Portaria 1.101/2002,
nunca a substituindo; só a UTI neonatal permanece sem essa segunda leitura, por um motivo
herdado de Neonatologia. Os valores e a metodologia
completa estão em `docs/DIMENSIONAMENTO.md`, seção *Leitos gerais pelo método do Caderno 2017*; a
tabela ali publicada não substitui a linha calculada sobre a Portaria 1.101/2002 — as duas são
publicadas lado a lado.

**Nada aqui vem de uma interface só.** Tudo que foi agregado dos microdados é conferido contra a
contagem que o próprio TABNET publica para a mesma competência e a mesma leitura
`[sih_reconciliacao]`. **194 das 204 competências batem exatamente**; as outras 10 diferem de +1
a +4 internações (no máximo 0,02 %), todas entre setembro de 2023 e setembro de 2024, e cada uma
está registrada com sua diferença exata. É o formato da **revisão retrospectiva** que o próprio
DATASUS avisa fazer — as duas interfaces são publicações distintas lidas em pontos de atualização
distintos. Qualquer diferença maior que isso **derruba a execução**, e os três defeitos de leitura
que este trabalho de fato cometeu moveriam 100 %, 20 % e 0,1 % da série: todos muito acima do que
esta tolerância admite.

**Taxa de ocupação não está aqui, e a ausência é deliberada.** O SIH não a publica: o seletor
`Incremento` do formulário oferece quinze medidas e ocupação não é uma delas. Este documento não
publica taxa que a fonte não publica.

### 3.8 CNES histórico: leitos SUS e a razão por mil habitantes, 2005-2026

Série completa, todos os anos que o publicador serve `[cnes_historico_ausencias]`:

| Ano | Leitos SUS (CNES histórico) | População (SIDRA 6579) | Leitos por mil (série) |
|---|---|---|---|
| 2005 | 4.748 | 2.333.108 | 2,035 |
| 2006 | 4.874 | 2.383.784 | 2,045 |
| 2007 | 4.849 | não medido | não medido |
| 2008 | 5.258 | 2.557.159 | 2,056 |
| 2009 | 4.935 | 2.606.885 | 1,893 |
| 2010 | 5.406 | não medido | não medido |
| 2011 | 5.207 | 2.609.998 | 1,995 |
| 2012 | 5.108 | 2.648.532 | 1,929 |
| 2013 | 4.908 | 2.789.761 | 1,759 |
| 2014 | 5.022 | 2.852.372 | 1,761 |
| 2015 | 4.409 | 2.914.830 | 1,513 |
| 2016 | 4.472 | 2.977.216 | 1,502 |
| 2017 | 4.482 | 3.039.444 | 1,475 |
| 2018 | 4.630 | 2.974.703 | 1,556 |
| 2019 | 4.430 | 3.015.268 | 1,469 |
| 2020 | 5.324 | 3.055.149 | 1,743 |
| 2021 | 5.329 | 3.094.325 | 1,722 |
| 2022 | 5.063 | não medido | não medido |
| 2023 | 5.243 | não medido | não medido |
| 2024 | 5.601 | 2.982.818 | 1,878 |
| 2025 | 5.604 | 2.996.899 | 1,870 |
| 2026 | 5.612 | 3.009.996 | 1,864 |

**Quatro dos vinte e dois anos não têm razão por mil habitantes, e a tabela diz isso em vez de
interpolar.** 2007, 2010, 2022 e 2023 não têm população do DF verificada contra o publicador para
aquele ano exato — o mesmo limite que a seção 2.1 já registra para `habitantes_por_equipe` —, então
a razão fica `não medido` para esses quatro anos, nunca calculada sobre uma população estimada
`[cnes_historico_ausencias]`.

**Um atalho foi testado e descartado, e vale registrar por quê.** Um arquivo competência-recente
retroagido a uma competência anterior lê 31 equipes onde o arquivo daquela própria competência lê
119 — a diferença mostra que um arquivo recente não pode substituir o arquivo do próprio ano, e
por isso cada ano desta série é lido do seu próprio arquivo histórico, nunca projetado de um ano
vizinho.

**O que segue é aritmética sobre as seções anteriores deste bloco e não introduz nenhuma
fonte nova**, conforme a proposta pedia. Onde um custo não pode ser derivado de dado deste
repositório, ele não é estimado.

### 3.9 Síntese do déficit

Deste bloco, sem repetir a conta `[dimensionamento_df, dimensionamento_regiao]`:

| | Déficit mínimo | Déficit máximo |
|---|---|---|
| Distrito Federal, leitos de enfermaria | -711 | -579 |
| Centro-Sul | 240 | 254 |
| Sudoeste | 197 | 223 |
| Norte | 184 | 203 |
| Leste | 93 | 106 |
| Oeste | 82 | 109 |
| **Soma das cinco regiões deficitárias** | **796** | **895** |

**A primeira linha é negativa e as cinco seguintes são positivas, e é exatamente isso que esta
tabela existe para mostrar.** O Distrito Federal, somado, tem **superávit** de 579 a 711 leitos
pela Equação 1 do Caderno de 2017 (seção 3.2). Cinco das suas sete regiões de saúde têm
**déficit**, e somados esses déficits dão **796 a 895 leitos**. O agregado distrital subtrai o
superávit da Central e da Sul do déficit das outras cinco, como se um leito na Asa Norte cobrisse
uma internação em Recanto das Emas. **Ele não cobre.** Entre 796 e 895 leitos é o que faltaria
para que nenhuma região ficasse abaixo do que a demanda observada dos seus próprios moradores
pede — e é o número que uma política de recomposição teria de enfrentar.

**A tabela anterior, citada porque um leitor a leu:** *"Distrito Federal, leitos de enfermaria |
2.285 | 3.715 · Sudoeste | 1.441 | 1.860 · Centro-Sul | 797 | 968 · Leste | 507 | 655 · Norte |
462 | 627 · Oeste | 460 | 679 · **Soma das cinco regiões deficitárias** | **3.667** | **4.789**"*.
Aquela leitura aplicava a Portaria GM/MS 1.101/2002, revogada em 2015 e nunca lida por este
projeto; esta aplica o método do documento que a substituiu, medido com o SIH de 2024. **A
recomposição necessária caiu por um fator de quase cinco. Quais regiões precisam dela não mudou.**

**E o que a conta continua sem enxergar.** 796 leitos é o que basta para atender, em cada região,
as internações que *aconteceram*. Quem não foi internado porque não havia leito não está no SIH e
não está nesta linha (seção 3.2). Este é o piso da recomposição, não o seu teto.

### 3.10 O custo — o que este documento se recusa a estimar

**Não há neste repositório nenhum parâmetro de custo por leito**, e nenhum foi adquirido. Este
documento poderia multiplicar 796 leitos por um custo médio publicado em algum lugar e produzir
um número grande e citável. **Não vai.** Um custo tirado de fora do repositório, num documento
cuja única promessa é que todo número é rastreável, contaminaria o documento inteiro.

**O que pode ser dito sobre ordem de grandeza, sem inventar parâmetro:** a função Saúde liquidou
R$ 7,359 bilhões em 2025 `[orcamento_saude]`. Qualquer proposta de recomposição de 796 a 895
leitos deve ser avaliada contra esse orçamento anual, e a conta que falta para fechá-la é o custo
unitário — **um dado, não uma opinião**, e o próximo a ser adquirido.

**Os números que esta seção trazia, citados e não apagados:** *"multiplicar 3.667 leitos"* e
*"recomposição de 3.667 a 4.789 leitos"* — a soma das regiões deficitárias sob a Portaria
1.101/2002. A recomposição caiu por um fator de quase cinco com a troca de método (seção 3.9); a
recusa de estimar o custo dela não mudou.

### 3.11 Critérios para um modelo sustentável

Derivados do que foi medido, e apenas disso:

1. **O critério de alocação tem de ser regional, não distrital.** O agregado do DF esconde uma
   razão de 24 para 1 entre regiões. Qualquer meta expressa em leitos por mil habitantes para o
   "Distrito Federal" pode ser cumprida sem mover nada onde falta.
2. **A prioridade é populacional, não histórica.** A Sudoeste responde por 29,3 % da população
   e 13,4 % dos leitos SUS de enfermaria `[dimensionamento_regiao]`. É onde um leito novo produz
   mais efeito, e é onde a rede menos cresceu.
3. **Vinte RAs com zero leito é um indicador de acesso, não de capacidade.** Elas não precisam
   cada uma de um hospital; precisam de distância até um. A medida correta é tempo de
   deslocamento, que este projeto **não tem** e que deveria ser a próxima aquisição deste bloco.
4. **Contrato de gestão precisa de série financeira publicada em forma legível por máquina.**
   A série está em PDF documento a documento, e não em forma tabular. **O IGES-DF publica** — 385
   documentos indexados, o que uma versão anterior desta lista negava — e o Bloco 6 mostra o custo
   disso: foi preciso abrir os arquivos e rodar OCR sobre digitalizações para chegar a um fato de
   uma linha, que **cinco exercícios seguidos têm parecer com ressalva**. Esse é um critério de
   contrato, não uma queixa de método: publicar 385 PDFs não é o mesmo que ser auditável por
   terceiros. **Do lado do HCB nem isso existe** — não há demonstração contábil publicada.
5. **O parâmetro normativo precisa ser substituído.** Este documento calcula contra uma portaria
   revogada de 2002 porque não achou substituta adquirível. Uma política de leitos que se apoie
   nela apoia-se numa régua fora de vigência.
---

## Bloco 4 — Formação médica

### 4.1 Vínculos médicos ativos na rede SES-DF, um proxy de força de trabalho

**Isto não é a série de médicos formados ou retidos pelo DF — é o número de vínculos ativos que o
CNES registra para a rede SES-DF, ano a ano.** Não é a mesma pergunta que a seção 4.2 declara sem
resposta, e este documento não deixa a semelhança dos números confundir as duas.

| Ano | Vínculos médicos (proxy) | Médicos deduplicados (proxy) | Ambiguidade de CNS |
|---|---|---|---|
| 2022 | 5.805 | 4.816 | 0,0000 |
| 2023 | 5.521 | 4.780 | 0,0000 |
| 2024 | 5.806 | 4.996 | 0,0000 |
| 2025 | 5.341 | 4.691 | 0,0000 |
| 2026 | 5.516 | 4.824 | 0,0000 |

**A deduplicação é por CNS, e a ambiguidade dela está publicada, não escondida.** Um profissional
pode ter mais de um vínculo (mais de um estabelecimento, mais de um CBO); a coluna
`medicos_deduplicados_proxy` conta pessoas físicas distintas por número de CNS, e
`taxa_ambiguidade_cns` mede a fração de registros em que essa contagem é incerta — **0,0000 em
todos os cinco anos medidos**, ou seja, sem ambiguidade detectada nesta janela
`[vinculos_medicos_ses]`.

**A janela é 2022-2026, não a série completa que o CNES permite.** Uma janela mais longa existe e
não muda o ponto que a formação médica (seção 4.2) deixa sem resposta; ela fica registrada aqui
como uma extensão possível de um trabalho futuro, não como algo que faltou fazer.

### 4.2 O que a formação médica não pode mostrar

**A versão anterior desta seção abria dizendo, por inteiro:** *"Este bloco não tem fundamento
empírico para a pergunta que o abre, e é o único bloco do documento nessa condição. Três
necessidades foram tentadas em 2026-09-17, cada uma por uma tentativa contra sua própria fonte
antes de declarar lacuna — nunca um atalho por um espelho de terceiro."* **Uma das três deixou de
ser lacuna em 2026-09-20**, e a frase fica citada em vez de apagada: o bloco continua sem fundamento
para a pergunta de formação e retenção, e passou a ter um número para a densidade médica.

Das três necessidades tentadas em 2026-09-17, duas continuam lacuna e a terceira foi medida em
2026-09-19 — cada uma por uma tentativa contra sua própria fonte, nunca por um atalho num espelho
de terceiro `[cursos_medicina_df, medicina_ingressantes_egressos, medicos_por_mil]`:

| Necessidade | Estado | Causa medida |
|---|---|---|
| Cursos de medicina no DF e ano de autorização (e-MEC) | `lacuna` | `emec.mec.gov.br` respondeu HTTP 403 a um navegador real, testado em 2026-09-11 — um WAF recusando um navegador de verdade é controle, não ausência de rede, e nada aqui tenta contorná-lo: um controle é medido e declarado, nunca burlado |
| Ingressantes e egressos do curso de medicina, censo do INEP | `lacuna` | `download.inep.gov.br` derruba a conexão na camada HTTP ao pedir o arquivo, e o índice do próprio publicador não lista nenhum arquivo do censo da educação superior nesta execução. Nenhum espelho de terceiro é citado como fonte — apenas cruzamento independente, nunca a origem de uma linha publicada |
| Médicos por mil habitantes no DF | **medida em 2026-09-19** | O host de terceiro que servia o livro em PDF entrou no registro de acesso por ordem do operador, e a tabela é lida dele a cada execução. **A causa que esta linha registrava até 2026-09-20, citada e não apagada:** *"18.494 URLs no índice do próprio publicador, 42 casam com 'demografia' e nenhuma é um arquivo de dados legível por máquina — o que casa são notícias e um livro em PDF servido por um host de terceiro fora do registro de acesso. O numerador (médicos ativos no DF) não existe em nenhum host que este projeto tenha autorização para ler"* |

**As lacunas são remedidas a cada execução, não declaradas uma vez e herdadas.** Cada uma carrega,
na sua própria coluna `motivo`, a data e o resultado exato da tentativa daquela execução — nunca um
estado congelado num dia anterior. **A linha medida obedece à mesma regra na direção
contrária**: se a rota da AMB cair, `medicos_por_mil` volta a publicar a lacuna citada acima, com
a degradação registrada em `tabelas_degradadas`, em vez de repetir o número do dia em que a rota
respondeu.

**Consequência para o documento.** Nada é afirmado aqui sobre quantos médicos o DF forma, quantos
retém, ou para onde vão. A proposta que motivou este projeto pedia "anos de investimento e o
retorno que não ficou" — uma hipótese que este documento não testou, e apresentá-la como achado
seria a falha que este dossiê inteiro foi desenhado para evitar. O que existe é o proxy da seção
4.1, e ele responde a uma pergunta vizinha, não a esta.

### 4.3 Densidade médica: o DF contra o país

**A ressalva vem antes do número, porque ela muda o que o número significa.** A razão publicada
abaixo é por **registro profissional**, não por médico: o próprio estudo declara, no rodapé da
tabela de onde estes valores saem, que as inscrições excedem os indivíduos porque um médico
registrado em mais de uma UF é contado em cada uma delas `[demografia_medica_amb]`. **O DF é
precisamente o lugar onde essa distorção mais pesa** — um médico com registro no DF e em Goiás
aparece nas duas colunas —, de modo que a razão do DF é um **teto**, não uma medida da força de
trabalho que atende no DF. Este documento publica o número do publicador e publica a ressalva
dele; não corrige um pelo outro, porque a correção exigiria um dado que ninguém publica.

A tabela é extraída do PDF a cada execução e nunca digitada. **Só unidades federativas entram no
ranking**: a Tabela 3 mistura na mesma coluna as 27 UFs, as cinco regiões e o Brasil, e deixar uma
região entrar seria comparar um agregado com as suas próprias partes — a primeira versão desta
seção publicou "Região Sudeste" entre o Rio de Janeiro e São Paulo, e o erro fica dito aqui em vez
de apagado. As cinco maiores razões, o Brasil como linha de referência declarada, e as três
menores `[demografia_medica_amb]`:

| UF | Registros médicos | População | Razão por 1.000 |
|---|---|---|---|
| Distrito Federal | 18.729 | 2.982.818 | 6,28 |
| Rio de Janeiro | 72.388 | 17.219.679 | 4,20 |
| São Paulo | 172.721 | 45.973.194 | 3,76 |
| Espírito Santo | 14.564 | 4.102.129 | 3,55 |
| Minas Gerais | 74.431 | 21.322.691 | 3,49 |
| Brasil | 653.945 | 212.583.750 | 3,08 |
| Amapá | 1.176 | 802.837 | 1,46 |
| Pará | 11.865 | 8.664.306 | 1,37 |
| Maranhão | 8.871 | 7.010.960 | 1,27 |

**O que isto sustenta e o que não sustenta.** Sustenta que o DF tem a maior densidade de registros
médicos do país, com folga sobre o segundo colocado, e muito acima da média nacional. **Não
sustenta nada sobre a rede pública**: registro é habilitação para exercer, não vínculo com a
SES-DF, e a distância entre os dois é justamente o que a seção 4.1 mede por outro caminho e o
Bloco 5 mede por um terceiro. Um documento que passasse desta linha para "faltam médicos no DF"
ou para "sobram médicos no DF" estaria usando o dado para uma pergunta que ele não responde.

---

## Bloco 5 — Carreiras e remuneração

### 5.1 Força de trabalho: uma série que precisa ser lida com cuidado

O Portal da Transparência do GDF publica servidores por carreira. As carreiras da saúde
`[pessoal_carreira]`, em dezembro de cada ano:

| Ano | Carreira | Servidores |
|---|---|---|
| 2017 | Assistência Pública à Saúde | 31.966 |
| 2018 | Assistência Pública à Saúde | 33.248 |
| 2019 | Assistência Pública à Saúde | 32.962 |
| 2020 | Assistência Pública à Saúde | 32.787 |
| 2021 | Gestão e Assistência Pública à Saúde | 14.000 |
| 2021 | Técnica em Enfermagem | 14.893 |
| 2022 | Técnica em Enfermagem | 14.609 |
| 2023 | Gestão e Assistência Pública à Saúde | 13.563 |
| 2023 | Técnica em Enfermagem | 14.464 |
| 2024 | Assistência Pública à Saúde | 13.347 |
| 2024 | Técnica em Enfermagem | 14.631 |
| 2025 | Assistência Pública à Saúde | 13.179 |
| 2025 | Técnica em Enfermagem | 14.546 |

**Esta tabela não deve ser lida como uma série temporal, e o motivo é o achado.** Entre 2020 e
2021 a carreira muda de nome e se parte em duas. Lida ingenuamente, a série mostra o quadro
caindo de 32.787 para 14.000 em um ano — uma perda de 57 % que **não aconteceu**: o que aconteceu
foi que os técnicos em enfermagem passaram a ser contados numa carreira própria.

**Pior:** a fonte publica os cinco maiores cargos por competência, e não todas as carreiras. Em
2022 a carreira de gestão **não aparece** porque saiu do top 5 — não porque zerou. Por isso 2022
não é somável, e a linha está na tabela sem total.

**O que é possível afirmar com honestidade:** nos anos em que as duas componentes aparecem —
2021, 2023, 2024 e 2025 — os totais são 28.893, 28.027, 27.978 e 27.725. É uma queda de **4,0 %
em quatro anos**, num período em que a população cresceu. Comparar qualquer um desses números
com os 32.962 de 2019 seria comparar recortes diferentes, e este documento não faz isso.

### 5.2 A carreira pública da saúde

**Parcialmente lacunar: em 2026-09-20 a lacuna estreitou sem se fechar.** A frase que abria esta
seção — *"Parcialmente lacunar. O deflator existe; a série de vencimentos, não."* — fica citada:
duas pontas da série de vencimentos passaram a existir e o meio dela continua não existindo.

**O que existe:** o IPCA mensal completo do período `[ipca_mensal]`, que é a metade da conta —
qualquer série salarial nominal pode ser convertida em poder de compra real assim que a série
existir. E a contagem de servidores das carreiras da saúde, com a ressalva de descontinuidade
explicada na seção 5.1 `[pessoal_carreira]`.

**O que passou a existir em 2026-09-20, e o parágrafo que dizia o contrário, citado e não apagado.**
Esta seção declarava: *"A série histórica do vencimento básico da carreira médica da SES-DF. A
tabela de vencimentos é anexo de lei, publicada no SINJ-DF, e `sinj.df.gov.br` responde HTTP 403
em http e em https. Em https ele apresenta certificado de `*.tc.df.gov.br` — nome que não confere,
falha que um navegador também recusa. (...) A LC 840/2011 e a Lei 6.137/2018, necessárias para
documentar a mudança na Taxa de Permanência em Disponibilidade. Mesmo obstáculo, mesmo host."*
**A medição continua verdadeira do host que ela nomeia**: `sinj.df.gov.br` segue com o certificado
trocado, e nada aqui o contorna. O que mudou é que o operador registrou um segundo nome do mesmo
publicador, `www.sinj.df.gov.br`, e é dele que os textos foram lidos — **seis normas declaradas,
cada página lida conferida contra a própria epígrafe que ela serve antes de qualquer cifra sair
dela** `[carreira_medica_normas]`. A LC 840/2011 e a Lei 6.137/2018 estão entre elas.

**O que continua não existindo** `[eixos_cobertura, vencimento_medico_lacunas]`:

- **O meio da série salarial: de 2006-07 a 2025-06.** As duas pontas estão na seção 5.4. O
  intervalo entre elas é **lacuna nomeada, nunca interpolada** a partir dos percentuais de
  reajuste — uma série salarial reconstruída por regra de três é uma série inventada, e este
  documento não a publica.
- **Os anexos de três das seis normas.** A Lei 2.585/2000 diz, no seu próprio texto, que *"os
  anexos constam no DODF"*, e não publica cifra nenhuma na página; a Lei 5.181/2013 traz o título
  *"ANEXO II TABELA DE VENCIMENTOS"* e nada depois dele; a Lei 7.253/2023 é servida como uma casca
  de "Arquivo da Norma", vazia. **A busca de normas do SINJ é um formulário atrás de reCAPTCHA, e
  ela é recusada, não contornada** — um controle é medido e declarado, nunca burlado. Por isso a
  Lei 7.253/2023 não tem nem URL nesta tabela: um identificador plausível chutado para preencher a
  célula é exatamente o defeito que a revisão de 2026-09-20 encontrou e corrigiu.

**O que se pode afirmar sem a série salarial.** Que o quadro das carreiras da saúde caiu 4,0 %
entre 2021 e 2025 nos anos comparáveis `[pessoal_carreira]`, num período em que o gasto real com
saúde subiu 25,9 % `[orcamento_saude, ipca_mensal]`. **Mais dinheiro real, menos servidores
efetivos** é um fato composto de dois dados que este repositório tem, e é o achado deste eixo.
Para onde foi a diferença — contratos de gestão, terceirização, custeio, investimento — é
precisamente o que a seção 7.1 registra como não adquirido.

### 5.3 Cargos vagos, dezembro de 2025

As cinco carreiras da saúde com mais cargos vagos, competência 2025-12 `[cargos_vagos]`:

| Carreira | Cargo | Total | Vagos | Ocupados |
|---|---|---|---|---|
| GESTÃO E ASSISTÊNCIA PUBLICA A SAÚDE | Analista em Gestão e Assistência Pública à Saúde | 6.500 | 6.500 | 0 |
| TÉCNICA EM ENFERMAGEM | Técnico em Enfermagem | 15.000 | 6.046 | 8.954 |
| ASSISTÊNCIA PÚBLICA À SAÚDE | Técnico em Saúde | 10.000 | 5.404 | 4.596 |
| MÉDICA | Médico | 10.000 | 5.144 | 4.856 |
| GESTÃO E ASSISTÊNCIA PUBLICA A SAÚDE | Técnico em Gestão e Assistência Pública à Saúde | 4.500 | 4.500 | 0 |

**A carreira médica sozinha responde por 5.144 vagas de um total de 10.000 cargos** — mais da
metade do quadro previsto para a carreira não está ocupada `[cargos_vagos]`. Duas das cinco linhas
— Gestão e Assistência Pública à Saúde, nas duas categorias — mostram o cargo inteiro vago: 6.500
e 4.500 cargos, zero ocupados, o que sugere um cargo criado e nunca provido, não um cargo esvaziado
por saída de servidores; este documento registra o número e não decide qual dos dois é o caso.

**Esta é uma fotografia de uma competência, não uma série.** `cargos_vagos` tem granularidade
mensal desde 2017; o recorte de dezembro de 2025 aqui publicado é o mais recente medido, e uma
série mensal completa fica registrada como uma extensão possível de trabalho futuro, não como algo
que faltou fazer nesta ordem de serviço.

### 5.4 Vencimento básico da carreira médica: duas pontas e um buraco

**Duas fontes, e o intervalo entre elas fica declarado como lacuna.** As vigências mais antigas
vêm dos Anexos II e III da Lei 3.323/2004, lidos da página da própria norma no SINJ-DF; a vigência
corrente vem da tabela de escalonamento vertical publicada pela SEEC-DF, que cita a Lei 7.253/2023
como base `[vencimento_medico, carreira_medica_normas]`.

| Vigência | Jornada | Norma | Cifras publicadas | Menor vencimento | Maior vencimento |
|---|---|---|---|---|---|
| 2004-03 | 20 h | Lei 3.323/2004 | 25 | R$ 808,00 | R$ 1.046,49 |
| 2004-03 | 40 h | Lei 3.323/2004 | 25 | R$ 1.616,00 | R$ 2.092,99 |
| 2005-03 | 20 h | Lei 3.323/2004 | 25 | R$ 828,00 | R$ 1.109,23 |
| 2005-03 | 40 h | Lei 3.323/2004 | 25 | R$ 1.656,00 | R$ 2.218,47 |
| 2005-09 | 20 h | Lei 3.323/2004 | 25 | R$ 875,00 | R$ 1.222,22 |
| 2005-09 | 40 h | Lei 3.323/2004 | 25 | R$ 1.750,00 | R$ 2.444,44 |
| 2006-03 | 20 h | Lei 3.323/2004 | 25 | R$ 878,00 | R$ 1.367,16 |
| 2006-03 | 40 h | Lei 3.323/2004 | 25 | R$ 1.756,00 | R$ 2.734,32 |
| 2006-07 | 20 h | Lei 3.323/2004 | 25 | R$ 895,00 | R$ 1.508,48 |
| 2006-07 | 40 h | Lei 3.323/2004 | 25 | R$ 1.790,00 | R$ 3.016,97 |
| 2025-07 | 20 h | Lei 7.253/2023 (tabela SEEC-DF, vigência 07/2025) | 18 | R$ 7.912,32 | R$ 9.651,71 |
| 2025-07 | 40 h | Lei 7.253/2023 (tabela SEEC-DF, vigência 07/2025) | 18 | R$ 15.824,66 | R$ 19.303,43 |

**O que este quadro não permite fazer, dito porque a tentação é evidente.** Entre a última
vigência de 2006 e a tabela de 2025 há quase vinte anos sem uma única cifra lida de documento. **A
série real de poder de compra da carreira médica não é calculável daqui**, e interpolá-la a partir
dos percentuais de reajuste que as leis do período anunciam produziria uma curva que nenhum
documento publica — exatamente o tipo de número que este dossiê se recusa a produzir. O IPCA
mensal completo está no repositório e continua esperando a série que falta
`[ipca_mensal, vencimento_medico_lacunas]`.

**Como as cifras foram lidas, porque o modo de ler já falhou uma vez.** O Anexo II é uma tabela
cujas células de cargo e classe são mescladas verticalmente: as linhas abaixo da primeira têm
menos colunas do que o cabeçalho. Lidas pelos índices do cabeçalho, elas publicavam a cifra de uma
vigência sob o rótulo de outra. Os valores são alinhados **pela direita**, na ordem do próprio
cabeçalho, e uma linha curta demais ou com célula não numérica **interrompe a leitura** em vez de
salvar o que couber — a contagem resultante bate com a contagem de cifras que o documento imprime.

**E falhou uma segunda vez, no outro documento, pelo mesmo motivo de fundo.** A tabela da SEEC-DF
também mescla células verticalmente: a linha da primeira classe de cada bloco começa pelo rótulo
do bloco, e não pelo padrão. O leitor exigia o padrão no começo da linha e por isso descartava
exatamente essas cinco — publicava **13 padrões onde o documento imprime 18**, sem erro nenhum e
com aparência de tabela completa. A revisão independente desta ordem de serviço encontrou o
defeito antes da publicação; o padrão passou a ser reconhecido onde quer que esteja na linha, e
uma guarda compara agora o número de cifras lidas com o número de cifras que a página imprime,
interrompendo a leitura se os dois não baterem. **Ler parte de uma tabela e publicá-la como a
tabela é o defeito que essa guarda existe para impedir.** As duas pontas da faixa não se moveram —
R$ 7.912,32 e R$ 9.651,71 na jornada de 20 h — porque as cinco linhas perdidas estavam no meio;
o que se moveu foi a quantidade de documento que este dossiê pode dizer ter lido.

### 5.5 A folha da SES-DF, 2013-2026

**Nenhum nome é publicado, e isso é uma regra do processamento, não uma escolha de redação.** Os
arquivos anuais de remuneração do GDF trazem a folha nominal servidor a servidor. O que sai deles
para este repositório é **agregado por (ano, mês, cargo)**, com o número de servidores atrás de
cada linha; nada abaixo do nível de cargo deixa a máquina `[remuneracao_ses_carreira]`.

**Cada competência é conferida contra o próprio arquivo de onde saiu**: linhas lidas, linhas com
órgão igual à Secretaria de Estado de Saúde, linhas publicadas. Uma competência em que a conta não
fechasse seria uma linha com `confere = 0`, publicada e não escondida
`[remuneracao_ses_reconciliacao]`.

| Ano | Competências | Última competência | Servidores SES-DF | Cargos médicos | Remuneração básica média |
|---|---|---|---|---|---|
| 2013 | 12 | 12/2013 | 47.613 | 7.423 | R$ 6.673,47 |
| 2014 | 12 | 12/2014 | 48.256 | 7.426 | R$ 7.810,53 |
| 2015 | 12 | 12/2015 | 47.552 | 7.214 | R$ 7.761,17 |
| 2016 | 12 | 12/2016 | 48.363 | 7.437 | R$ 7.889,50 |
| 2017 | 12 | 12/2017 | 49.410 | 7.579 | R$ 7.881,47 |
| 2018 | 12 | 12/2018 | 51.511 | 7.933 | R$ 7.873,37 |
| 2019 | 12 | 12/2019 | 51.035 | 7.786 | R$ 8.046,66 |
| 2020 | 12 | 12/2020 | 52.186 | 8.116 | R$ 8.237,40 |
| 2021 | 12 | 12/2021 | 53.027 | 8.158 | R$ 8.436,98 |
| 2022 | 12 | 12/2022 | 52.824 | 7.916 | R$ 9.712,56 |
| 2023 | 12 | 12/2023 | 52.424 | 7.880 | R$ 10.512,07 |
| 2024 | 12 | 12/2024 | 52.631 | 8.023 | R$ 11.775,86 |
| 2025 | 12 | 12/2025 | 52.938 | 8.046 | R$ 12.871,66 |
| 2026 | 7 | 07/2026 | 53.675 | 7.999 | R$ 12.905,96 |

**A coluna de cargos médicos é derivada, e a regra dela está na própria tabela.** Ela marca os
cargos cujo rótulo do publicador começa por médico **e que não são residência**: os cargos de
residente casam com a primeira regra e são explicitamente excluídos, porque residência é formação
remunerada e não provimento da carreira. As duas marcas são disjuntas por construção — nenhuma
linha carrega as duas. **Esta é a segunda vez, na mesma apuração de 2026-09-20, que uma regra de
classificação foi corrigida antes de publicar**: a primeira foi a identidade das normas do SINJ.

**O que esta série sustenta e o que não sustenta.** Ela é a contagem de quem estava na folha, por
cargo, mês a mês — não o vencimento básico da carreira, que é a seção 5.4, e não o quadro previsto
em lei, que é a seção 5.3. **Remuneração básica média não é salário de ninguém**: é um total
dividido por um número de servidores, e serve para comparar meses entre si, nunca para descrever
um contracheque.

---

## Bloco 6 — IGES-DF e HCB

### 6.1 O que existe hoje, de cada lado

**Esta seção é uma lacuna declarada, e a lacuna é assimétrica.**

Do lado do **HCB**, este repositório tem o índice completo de documentos do contrato de gestão
publicado pelo próprio hospital: **154 documentos** — o Contrato de Gestão 076/2019 e seus termos
aditivos, com data e número de DODF `[hcb_contratos]`. É um índice de documentos, não uma série
financeira: dá para dizer *quantos aditivos existem e quando*, não *quanto custaram*.

Do lado do **IGES-DF** há o índice, e não os números — mas agora há dois índices, não um. **385
documentos** de prestação de contas, relatórios de gestão e demonstrações contábeis
`[igesdf_prestacao_contas]` — entre eles os **75 relatórios quadrimestrais** e o Relatório do
Auditor Independente de 31/12/2022. E, desde 2026-09-04, o **próprio contrato de gestão**: **113
documentos** — o Contrato de Gestão 001/2018, seus termos aditivos, termos de apostilamento,
extratos de publicação e os sete contratos de UPA `[igesdf_contratos_gestao]`, o análogo direto de
`hcb_contratos` que faltava neste lado da comparação. **A assimetria estreita sem fechar**: todos
os 113 documentos deste índice já estavam, verificados, entre os 385 de cima — indexados sob um
nome de página diferente — de modo que o que esse segundo índice acrescenta não é conteúdo novo, é a
primeira linha própria que responde "o contrato de gestão do IGES-DF está indexado?" sem exigir
que quem pergunta já soubesse onde procurar. **O que este dossiê não tem é o conteúdo desses PDFs**:
os documentos não são baixados nem lidos, então a série financeira que uma comparação exigiria
continua ausente deste repositório, embora não do publicador.

**Uma comparação entre duas organizações quando só uma delas tem dado não é uma comparação.**
A proposta pedia seis dimensões de contraste; as seções seguintes deste bloco explicam por que elas
não podem ser preenchidas, em vez de preenchê-las pela metade.

### 6.2 O que existe e o que falta, por índice documental

**Este eixo está declarado como lacuna, e a declaração é o conteúdo.**

A proposta pedia seis dimensões de contraste entre duas organizações sociais de saúde com a mesma
natureza jurídica e resultados diferentes, e cinco critérios de contrato derivados desse
contraste. Fazer isso exige dado **financeiro** dos dois lados. Este repositório passou a ter
**índice documental dos dois** e continua sem o dado financeiro de qualquer um — o que estreita a
lacuna sem fechá-la, e é dito assim em vez de ser apresentado como progresso maior do que é.

**O que existe, do lado do HCB:** o índice de documentos do contrato de gestão — 154 documentos,
contrato e termos aditivos, cada um com sua referência de DODF `[hcb_contratos]`. O que se pode
afirmar a partir dele é estrutural, não financeiro: existe um Contrato de Gestão 076/2019,
publicado no DODF 182 de 24/09/2019, e uma sequência longa de termos aditivos que se estende por
anos. **Um contrato que precisa de dezenas de aditivos é um fato sobre governança contratual**, e
é o mais forte que este dado sustenta.

**O que existe, do lado do IGES-DF, e que uma versão anterior deste documento afirmava não
existir.** A leitura de 2026-08-28 encontrou **385 documentos distintos**
`[igesdf_prestacao_contas]`, lidos pela **API REST documentada que o próprio site do IGES-DF
serve**. A primeira medição, de 2026-08-27, havia registrado
esta necessidade como ausente dizendo que os relatórios eram *"anexos de páginas de notícia, sem
índice legível por máquina"* — **era falso**, e a correção está no registro de cobertura em vez de
aparecer aqui como se sempre tivesse sido assim.

**As páginas não são uma lista escrita à mão, e não são porque duas listas escritas à mão
falharam.** A rota paginada da API enumera todas as páginas publicadas do site — a contagem
conferida contra o `X-WP-Total` do próprio servidor — e uma regra declarada sobre o caminho da URL
seleciona as **9** que são índices de prestação de contas, das quais **8** trazem documentos.
A primeira leitura desta série leu **uma** página; a segunda fixou **três** e ainda assim perdia
**30 documentos** em duas páginas que estavam no mesmo sitemap já lido, entre eles três *Relatório
de Gestão* quadrimestrais de 2023 e as *Demonstrações Contábeis 2018 Auditadas*. Cada erro foi
apanhado por revisão independente, não pelo código. Hoje o número de páginas que trazem documentos
é ele próprio uma afirmação conferida a cada execução: um décimo índice **que essa regra reconheça**
quebra o build pelo nome em vez de ficar de fora em silêncio. **A ressalva é literal**: um índice
que o instituto batize fora da regra continuaria de fora, e é por isso que a enumeração inteira das
814 páginas é gravada em `dados/raw/igesdf_paginas.json` — para que a completude da regra seja
conferível sem refazer nenhuma requisição. Para que isso funcione, a tabela tem **uma linha por
par (página, documento)** — 939
linhas para 385 documentos distintos, porque um documento listado em três índices é listado em
três índices, e dizer o contrário fazia da coluna `pagina` um fato sobre a ordem de leitura em vez
de um fato sobre o publicador.

**A mesma correção teve de ser feita duas vezes, e a segunda está registrada em vez de apagada.**
A primeira leitura não encontrou nenhuma peça contábil de 2022 e escreveu neste documento que o
IGES-DF não publicava as demonstrações auditadas de 2022 — pelo mesmo motivo pelo qual a medição
de 2026-08-27 errara antes: parar antes de esgotar a interface. O estado dessa necessidade é hoje `acquired`, e
o índice traz o conjunto de 2022 completo — Balanço Patrimonial, DRP, DFC, DMPL, DRA e Notas
Explicativas — mais o **IGESDF-RAI-31.12.2022**, o Relatório do Auditor Independente.

**O que este índice sustenta é, de novo, estrutural**: a série existe, é contínua e é citável
documento a documento. **Os números dentro dos PDFs não foram extraídos**, e por isso nenhuma
comparação financeira entre as duas organizações aparece abaixo.

**A leitura de 2026-08-28 deixou um análogo por declarar, e a de 2026-09-04 o declara.** O
registro daquela leitura já dizia que `/transparencia/contratos/contratos-de-gestao/` publica 119 documentos e que
nenhuma necessidade do IGES-DF o nomeava — a mesma assimetria que `hcb_contratos` expõe do outro
lado desta comparação. Contado de novo em 2026-09-04, e não herdado: a página carrega **119
âncoras de PDF**, número que reproduz o de 2026-08-28 ao dígito, das quais **113 são URLs
distintas** — seis âncoras repetem um arquivo já ancorado antes na mesma página, e a tabela grava
uma linha por par (página, documento), o formato que `igesdf_prestacao_contas` já usa
`[igesdf_contratos_gestao]`. Classificados pelo próprio título publicado: **1** contrato de gestão
base, **63** termos aditivos e **7** contratos de UPA — os três reproduzem a leitura de
2026-08-28 —, mais **26** extratos de publicação que aquele registro não separara. Os termos de apostilamento
**divergem**: a numeração publicada vai de 1 a 17 sem nunca publicar um 2º, o que são **16**
documentos distintos, não os 17 contados em 2026-08-28 — achado desta contagem, não erro daquela,
porque uma foi feita por leitura e esta por regra sobre o título. Os sete contratos de UPA ficam
na mesma necessidade que o contrato-mãe, com um campo próprio os distinguindo, por decisão do
operador de 2026-09-04.

**O quase-acerto que a leitura de 2026-09-04 foi desenhada para tratar se revelou ser a tabela
inteira.** O que se pretendia tratar era um único documento — um termo aditivo já indexado por
`igesdf_prestacao_contas` sob outra página — como o risco de um leitor concluir "temos termos
aditivos" e estar enganado sobre a cobertura. Medido, não é um documento: **os 113 documentos
distintos deste índice já estavam, todos, entre os 385 de `igesdf_prestacao_contas`**, sob três
páginas de prestação de contas diferentes. Nenhum foi deduplicado — a chave de cada tabela é (a
própria página, o documento), não o documento isolado — e o que a nova necessidade acrescenta não
é conteúdo bruto: é a primeira linha própria que responde à pergunta sem exigir que quem a faz já
saiba que a resposta está espalhada sob um nome diferente.

### 6.3 Os pareceres de auditoria, lidos

**Este documento afirmava, até a versão anterior, que não podia dizer se o parecer de 2022 tinha
ressalva.** Agora pode: em 2026-08-28 os documentos que até então só eram endereçados passaram a
ser abertos e lidos. O recorte é declarado e é pequeno — dos 385 PDFs indexados, uma regra
publicada seleciona **35** `[documentos_leitura]`, os pareceres de auditoria e as peças contábeis,
e deixa **350** de fora, entre eles os **311** documentos do índice de relatórios de gestão que a
regra não seleciona. Ler o corpus inteiro é outro trabalho; dizer que ele foi lido seria falso.

**Dos 35, 28 tinham camada de texto e 7 não tinham nenhuma** — zero caractere extraível — **e
foram lidos por OCR; nenhum falhou** `[documentos_leitura]`. O critério é medido, não presumido: um
documento vai para OCR quando o extrator devolve menos de 500 caracteres, e estes sete devolveram
zero. Dois dos sete são o mesmo arquivo, indexado duas vezes pelo publicador, e o segundo
reaproveita o texto do primeiro em vez de repetir o OCR. A coluna `metodo` diz qual leitor produziu cada
texto, porque um caractere reconhecido por OCR e um caractere extraído não são o mesmo tipo de
fato. **Nenhuma cifra financeira deste dossiê vem de OCR**: OCR erra dígitos, e estes são balanços.

**O resultado é uma série, não um ano.** Foram classificadas **8 leituras de parecer** — sobre 7
documentos distintos e 6 exercícios, porque o publicador indexa um deles duas vezes — e a
classificação é
uma consulta às formas fixas da NBC TA 700/705 com **o trecho literal do auditor gravado ao lado**
`[opinioes_auditoria]` — nunca uma inferência, e **ancorada**: uma forma modificada só conta onde
*Examinamos* a segue de perto e onde ela vem antes de qualquer frase de opinião não modificada,
porque uma busca solta num PDF de 51 páginas leria o parágrafo *Outros assuntos* — em que um
parecer limpo diz que o exercício **anterior** teve ressalva — como se fosse o parecer deste ano.
Um parecer em que nenhuma forma apareça ancorada fica `nao_localizada`, e um cujo texto não pôde
ser extraído fica `nao_lida`: são falhas diferentes e nenhuma se parece com um parecer limpo.
**Nenhuma leitura ficou em qualquer das duas condições.**

| Exercício | Opinião | Método | Peças lidas |
|---|---|---|---|
| 2018 | sem ressalva | ocr | 3 |
| 2019 | com ressalva | pypdf | 1 |
| 2020 | com ressalva | pypdf | 1 |
| 2021 | com ressalva | pypdf | 1 |
| 2022 | com ressalva | pypdf | 1 |
| 2023 | com ressalva | pypdf | 1 |

O exercício de 2018 é do **IHB — Instituto Hospital de Base**, a entidade anterior; os demais são
do IGES-DF. As três peças de 2018 são dois documentos distintos — o parecer avulso e o caderno
*Demonstrações Contábeis 2018 Auditadas*, este indexado duas vezes pelo publicador, uma em `http`
e outra em `https` — e **concordam entre si**, o que é a segunda leitura que uma classificação
vinda de OCR exige.

**Cinco exercícios seguidos com ressalva** `[opinioes_auditoria]`, e **um único parecer limpo na
série — o de 2018, do IHB, a entidade que existia antes do IGES-DF.** É o achado deste eixo, e ele
não é sobre 2022: a necessidade de fonte batizada em 2026-08-27 como *"demonstrações auditadas
2022 (parecer com ressalva)"* estava com o nome certo **por acaso, não por leitura** — um rótulo
que atravessou toda a sequência de apurações desde aquela data sem que ninguém o conferisse, e o próprio registro de cobertura dizia por
escrito que o índice não permitia conferi-lo. Recortar 2022 sozinho também teria escondido o que
importa, que é a repetição.

**O que a ressalva de 2022 diz, nas palavras do auditor.** As bases declaradas são três — a
**Operação Escudeiro** da Polícia Civil do DF, que investiga suspeita de pagamento de propina por
empresa contratada para renovação de contrato de **R$ 300 milhões**, com processo em curso; o saldo
de **estoques** sem inventário levantado na data-base; e a aplicação da **NBC TG 06 (R3)** apenas a
partir de 2022 para contratos de arrendamento vigentes desde 2019. O parecer traz ainda **ênfase**
sobre incerteza quanto à continuidade operacional. Cada um desses fatos está no trecho literal
gravado na tabela: as três bases em `trecho_base`, a ênfase em `trecho_enfase`, colunas separadas
porque o parágrafo da opinião não contém nem uma nem outra — a base começa cerca de 800 caracteres
depois dele e a ênfase, outros 2.700 adiante. Tudo veio de camada de texto, não de OCR.

**O que isto não é.** Não é a série financeira. Um parecer com ressalva é uma afirmação do auditor
sobre as demonstrações, não uma comparação de custo entre IGES-DF e HCB — que continua impossível,
porque do lado do HCB não há demonstração contábil publicada.

**O que a tabela cobre e o que não cobre, dito porque o recorte é uma decisão.** O ano em
`ano_upload` é o ano em que o arquivo foi **carregado no site**, não o exercício a que se refere:
há peças de 2018 carregadas em 2025, e nenhum upload em 2021. E a regra deixa de fora,
deliberadamente, os despejos mensais de contratos (~1.400 PDFs), os **relatórios de auditoria de
fornecedores** e os acordos coletivos — documentos reais, e nenhum deles prestação de contas ou
relatório de gestão do instituto.

**O que continua não existindo** `[eixos_cobertura]`:

| Necessidade | Estado | Motivo medido |
|---|---|---|
| HCB, demonstrações contábeis | `absent` | `/transparencia/relatorios/` responde 200 com 127 links, dos quais **zero** apontam para arquivo, e ele enumera **23 páginas de detalhe** sob caminho estável — **todas as 23 foram buscadas**, e somadas dão zero links para arquivo e zero ocorrências de *demonstra*, *contábil*, *balanço*, *auditad*, *parecer* e *ressalva*. O host não é WordPress: `/robots.txt`, `/wp-sitemap.xml` e `/sitemap.xml` devolvem 404, e `/wp-json` devolve 200 servindo a home — um catch-all, não uma API. A enumeração está em `dados/raw/hcb_relatorios_enumeracao.json` |

**Por que isto não foi preenchido com o que se sabe publicamente.** Porque a proposta que
encomendou este dossiê pediu explicitamente um documento cujo diferencial fosse a rastreabilidade,
e porque este bloco é exatamente onde um documento adversário já existe. Repetir as conclusões dele
sem ter os dados dele seria adotar as conclusões de terceiros com a aparência de análise própria.

**O que destravaria este eixo:** do lado do HCB não falta leitura e sim publicação — não há
demonstração contábil no site para abrir. Do lado do IGES-DF, a série financeira foi extraída e
está na seção seguinte; o que ela encontrou é que a peça de um exercício não sustenta a leitura.

### 6.4 A série financeira, e o documento que não fecha

**As peças que aqueles pareceres auditam foram lidas como números.** São **29 documentos de
demonstrações contábeis** `[demonstracoes_documentos]`, seis exercícios, cinco tipos de peça —
balanço, DRE/DRP, DRA, DMPL e DFC — dos quais **12 foram parseados integralmente**, **7
parcialmente** e **10 o parser recusou** `[demonstracoes_documentos]`. As recusas não são falhas
escondidas: o `metodo` de extração do PDF entrega, em vários desses documentos, os valores em uma
ordem e os rótulos em outra — o DFC de 2021 traz seus 46 valores em 23 linhas primeiro e seus 24
rótulos no fim, embaralhados — e **parear rótulo e valor por posição produziria uma demonstração
completa e errada**. Cada recusa é uma linha com o motivo, e há três contadores publicados em vez
de uma palavra de estado: linhas só de valores, linhas com contagem de colunas divergente e
**117 linhas que carregam dinheiro e não casaram com nenhuma regra** `[demonstracoes_documentos]`.
Ao todo, **1.585 linhas de demonstração** `[demonstracoes_linhas]`, cada uma com o trecho de
origem ao lado.

**A regra de publicação é a unanimidade, e ela existe porque estas demonstrações são
comparativas.** Todo exercício, menos o último, é reapresentado por um documento posterior,
produzido depois, por outro contador — então quase toda cifra é lida duas vezes, em documentos
independentes — e um documento é identificado pelo seu `sha256`, não pela URL, porque as
demonstrações de 2018 estão publicadas duas vezes sob o mesmo conteúdo e um arquivo concordando
consigo mesmo não é conferência nenhuma. Das **279 conferências** entre documentos, **182 batem
ao centavo** e **97 divergem** `[demonstracoes_conferencia]`. Não há tolerância: são cifras
contábeis publicadas, e um centavo de diferença significa que um dos documentos foi lido errado —
ou que um deles está errado.

**As divergências têm uma origem quase única, e essa é a constatação desta seção: 96 das 97
envolvem o Balanço Patrimonial de 2021** `[demonstracoes_conferencia]`. **A 97ª não** — é uma
rubrica, *valores em contingência*, que os balanços de 2022 e 2023 imprimem dos dois lados do
balanço com o mesmo nome, e que esta verificação portanto compara consigo mesma
`[demonstracoes_conferencia]`. Tirando o documento de 2021, os pares batem integralmente: 2019
contra 2020, 2022 contra 2023. O mesmo documento é também o único que **não fecha consigo mesmo**:
das **11 colunas de balanço verificadas**, **8 fecham ao centavo** e **3 não fecham**
`[demonstracoes_balanco]`, e as três são as três colunas daquele documento — **um único documento**
entre os **cinco cujo balanço pôde ser verificado** `[demonstracoes_balanco]`, porque o balanço de
2018 é digitalizado e o parser o recusou inteiro, de modo que nunca foi testado. Ativo contra
passivo é aritmética que o próprio documento afirma sobre si; quando não fecha, ou a leitura está
errada ou a peça está.

**Por isso 2019 e 2020 aparecem majoritariamente como *não publicável* na tabela abaixo.** A
descrição honesta é uma combinação: **o documento de 2021 declara suas colunas `DEZ/2019 DEZ/2020
DEZ/2021` e as duas primeiras contêm, medido contra os documentos de 2019 e de 2020, 2020 e 2019** —
e esta extração arquiva cada coluna sob o cabeçalho que o documento declara, sem consertar o
documento por inferência. A divergência é, portanto, um documento cujo cabeçalho não corresponde às
suas colunas somado a uma regra que se recusa a reparar isso em silêncio. Dois documentos concordando não derrubam um terceiro por maioria —
uma discordância de três vias sobre um número contábil publicado **é** o achado, e desfazê-la em
silêncio seria apagá-lo. Das **36 linhas da série**, **23 são publicáveis** `[demonstracoes_serie]`.

| Balanço em | Ativo total | Patrimônio líquido | Estoques |
|---|---|---|---|
| 2018 | R$ 160.529.744,88 | R$ 15.967.370,59 | R$ 18.956.336,32 |
| 2019 | não publicável | R$ -45.749.115,59 | não publicável |
| 2020 | não publicável | não publicável | não publicável |
| 2021 | R$ 235.076.045,92 | não publicável | R$ 43.959.076,22 |
| 2022 | R$ 331.322.817,30 | R$ -129.721.162,12 | R$ 72.510.235,06 |
| 2023 | R$ 358.123.567,98 | R$ -87.963.335,23 | R$ 89.087.283,30 |

**Uma cifra desta tabela confere por um caminho totalmente independente.** O patrimônio líquido de
2022 — **-R$ 129.721.162,12** `[demonstracoes_serie]` — é exatamente o valor que o auditor cita na
ênfase sobre continuidade operacional, lido na seção anterior de outro documento, por outro parser,
em outra ordem de serviço `[opinioes_auditoria]`. Duas leituras independentes, o mesmo número.

**O que esta seção não afirma.** Nenhuma cifra aqui é uma opinião sobre a gestão do instituto: são
as linhas que o próprio IGES-DF publicou, conferidas contra as que ele publicou depois. Nenhuma
sai de OCR — **as peças de 2018 são digitalizações e o pareamento posicional delas foi recusado**,
de modo que a coluna de 2018 acima vem do balanço de 2019, que é camada de texto e reapresenta
2018 `[demonstracoes_serie]`. E a série é de balanço: **DRE, DFC e DRA estão no banco linha a
linha e não são publicados aqui**, porque metade dos seus documentos caiu nas recusas descritas
acima e uma série incompleta apresentada como série seria pior do que nenhuma. **O DMPL não está
no banco de forma alguma**: os seis documentos de mutações do patrimônio líquido são matrizes que
nenhuma das regras desta extração lê, e as seis foram recusadas — **zero linhas**
`[demonstracoes_linhas]`.

### 6.5 Índice de publicação documental

**Uma medida própria deste projeto, declarada como tal e não como um índice oficial.** Em
2026-09-14 declarou-se, antes de contar qualquer célula, um inventário fixo de tipos de documento que
uma entidade que gere um contrato de gestão de saúde pública deveria, em princípio, publicar —
contrato de gestão, relatório de prestação de contas e demonstração contábil — e mediu quantas
dessas categorias cada entidade efetivamente publica `[transparencia_matriz,
transparencia_indice_publicacao]`:

| Entidade | Células publicadas | Células totais | Índice de publicação |
|---|---|---|---|
| IGES-DF | 3 | 3 | 1,000 |
| HCB | 1 | 3 | 0,333 |

**A tabela do IGES-DF, por si só, não é o contraponto que a seção 6.2 registra como impossível.**
O índice mede publicação de índices documentais, não conteúdo financeiro comparável célula a
célula — a limitação que a seção 6.2 já declara sobre os 385 documentos do IGES-DF continua
valendo integralmente aqui.

**A fragmentação da rede, por instrumento contratual.** `fragmentacao_rede_indice` lista, sem
nenhuma coluna de narrativa, cada contrato, termo aditivo, termo de apostilamento e extrato de
publicação do IGES-DF encontrado pelo próprio índice de documentos — mais de cem instrumentos
distintos regendo uma única rede de saúde `[fragmentacao_rede_indice]`. O número de instrumentos
não é, por si só, uma medida de má gestão; é uma medida de quantos atos formais foram necessários
para manter um único contrato em vigor, e fica ao lado da comparação, não como veredicto sobre ela.

---

## Bloco 7 — Prometido, orçado e executado

### 7.1 Orçamento e modelo de gestão

A função Saúde liquidada pelo GDF, 2017 a 2025, em valores nominais e deflacionados pelo IPCA
para reais de dezembro de 2025 `[orcamento_saude, orcamento_df_total, ipca_mensal]`:

| Ano | Saúde liquidada (nominal) | Em R$ de 2025 | Despesa total do DF | Saúde / total |
|---|---|---|---|---|
| 2017 | R$ 3,930 bi | R$ 6,093 bi | R$ 22,295 bi | 17,63 % |
| 2018 | R$ 4,090 bi | R$ 6,159 bi | R$ 23,757 bi | 17,22 % |
| 2019 | R$ 3,747 bi | R$ 5,439 bi | R$ 23,554 bi | 15,91 % |
| 2020 | R$ 4,328 bi | R$ 6,023 bi | R$ 24,230 bi | 17,86 % |
| 2021 | R$ 5,308 bi | R$ 7,067 bi | R$ 27,737 bi | 19,14 % |
| 2022 | R$ 6,080 bi | R$ 7,355 bi | R$ 32,519 bi | 18,70 % |
| 2023 | R$ 5,039 bi | R$ 5,763 bi | R$ 32,104 bi | 15,70 % |
| 2024 | R$ 6,153 bi | R$ 6,726 bi | R$ 38,624 bi | 15,93 % |
| 2025 | R$ 7,359 bi | R$ 7,673 bi | R$ 42,370 bi | 17,37 % |

**O que a série mostra.** Crescimento real de **25,9 %** em nove anos, com dois recuos nítidos:
2019 (−11,7 % real sobre 2018) e 2023 (−21,6 % real sobre 2022). A participação da saúde na
despesa do GDF oscila numa faixa estreita, entre 15,70 % e 19,14 %, e termina onde começou.

**O que a série não mostra, e é preciso dizer.** Esta é a despesa **liquidada da função Saúde**,
tal como o Portal da Transparência do GDF a publica. Ela não separa administração direta de
contratos de gestão. **A migração orçamentária da SES direta para contratos de gestão — o número
que a proposta original pedia — não está neste repositório**: exigiria a despesa por ação ou por
credor, e o que foi adquirido é o agregado por função. É uma lacuna de dado, não uma conclusão.

**O deflator.** IPCA mensal do IBGE, série SIDRA tabela 1737, 108 competências de 2017-01 a
2025-12 `[ipca_mensal]`. O fator acumulado do período é 1,5502. A proposta original indicava a
tabela 2938, que está descontinuada e termina em 2011 — a correção foi feita em 2026-08-27.

### 7.2 Estágio orçamentário, exercício 2025

Dos cinco estágios da despesa pública, o que a Lei Orçamentária de 2025 permite reconstruir em
forma legível por máquina, função Saúde `[orcamento_saude_etapas]`:

| Estágio | Valor (2025) | Estado |
|---|---|---|
| Aprovado | não medido | lacuna |
| Autorizado | não medido | lacuna |
| Empenhado | não medido | lacuna |
| Liquidado | R$ 7.359.164.175,01 | medido |
| Pago | não medido | lacuna |

**Apenas um dos cinco estágios está publicado em forma que este projeto pôde extrair.** Aprovado,
autorizado, empenhado e pago são lacunas declaradas para 2025, não zeros — o valor liquidado, R$
7.359.164.175,01, é o mesmo número que a seção 7.1 já publica para a despesa liquidada do ano
`[orcamento_saude_etapas, orcamento_saude]`. Sem os outros quatro estágios, este documento não
pode medir a distância entre o que foi previsto e o que foi de fato pago — só entre o que foi
liquidado e o que a seção 7.1 já mostrava.

### 7.3 Metas do Plano Distrital de Saúde 2024-2027

**Esta seção é uma lacuna declarada, e a causa é uma falha de extração medida, não de leitura.**
O Plano Distrital de Saúde 2024-2027 publica suas metas num quadro de páginas 203 a 209, e a
fronteira de cada linha é confiável — todas as 69 âncoras de valores-ano por meta batem uma a uma
contra o mesmo número de finais de polaridade "Melhor". **O que não é confiável é a separação de
campos dentro da linha**: o fluxo de texto do extrator de PDF não preserva a ordem das colunas
visuais (meta, indicador, instrumento, responsável), e 26 das 69 linhas reconstruídas ainda trazem
um pedaço de cabeçalho ou um código de órgão vazado para dentro do texto da própria meta, mesmo
depois de uma limpeza declarada `[pds_metas]`. **Por decisão de método deste projeto, isso publica
uma lacuna inteira, nunca uma extração de qualidade inferior apresentada como dado.** O que este
bloco mede do lado orçamentário está na seção 7.2.

### 7.4 Promessas de campanha e relatórios de gestão — índice, não conteúdo

**Esta seção é um índice: URL, título e data de cada documento, nunca o conteúdo de dentro dele**
`[promessas]`. Duas fontes, dois resultados diferentes:

- O **Plano de Governo** dos candidatos ao governo do DF em 2018 e 2022, via TSE DivulgaCandContas,
  está `lacuna` para os dois anos: o host responde com bloqueio de um WAF Akamai, medido a cada
  execução — se o bloqueio for suspenso, a próxima execução o encontra e publica o índice, nunca a
  prosa antiga congelada `[promessas]`.
- O **Relatório Anual de Gestão (RAG)** da SES-DF, via DigiSUS Gestor, está `medido`: quinze
  relatórios indexados, cada um com sua própria URL e data de publicação `[promessas]`.

**Nada além do índice é lido.** Nenhum dos quinze relatórios do RAG teve seu conteúdo extraído
nesta ordem de serviço, e nenhuma meta ou compromisso de um Plano de Governo é citado aqui —
fazer isso é trabalho de uma ordem de serviço futura, sobre um índice que já existe.

---

## Bloco 8 — O registro da CLDF

**Este bloco não existia neste documento até 2026-09-13.** A Câmara Legislativa do DF publica sua
própria API de proposições, e este projeto passou a lê-la — com autor, data, número e tramitação
em cada linha, nunca inferidos.

### 8.1 Proposições sobre saúde, 2017-2026

| Tipo | Quantidade (2017–2026) |
|---|---|
| Indicação | 1.131 |
| Requerimento | 784 |
| Projeto de Lei | 668 |
| Moção | 443 |
| Projeto de Decreto Legislativo | 29 |
| Proposta de Emenda à Lei Orgânica | 4 |
| Proc | 4 |
| Projeto de Resolução | 3 |
| Projeto de Lei Complementar | 1 |

**O total de 3.067 é conferido contra a contagem que o próprio portal da CLDF publica para a
mesma busca, ano a ano, e confere em todos os dez anos** `[cldf_proposicoes_reconciliacao]`: zero
proposições descartadas, zero diferença entre o total buscado por este projeto e o
`totalElements` que o portal devolve para `tema=24` naquele ano.

**A classificação `tema=24` é da própria plenária da CLDF, não deste projeto.** Este documento não
decide o que conta como proposição de saúde; herda a classificação de quem a fez.

### 8.2 Anos sem nenhuma proposição

Em três dos dez anos medidos, a busca por `tema=24` devolve zero proposições — medido, não
assumido de uma lacuna na paginação `[cldf_proposicoes_ausencias]`: 2017, 2018 e 2020. O portal
confirma `totalElements=0` para cada um desses três anos.

### 8.3 Emendas parlamentares à saúde, 2017-2025

Valores autorizados, empenhados e pagos por ano `[emendas_saude]`. De 2017 a 2020 o valor
empenhado é publicado como `SQL NULL`, não como zero — o próprio valor pago desses anos é maior
que zero, o que torna um "empenhado igual a zero" uma contradição lida como fato em vez de
publicada como lacuna. A partir de 2021 os três estágios estão publicados e coerentes entre si.

### 8.4 O que continua fora de alcance

**Esta seção dizia, por inteiro:** *"Dois registros de fiscalização externa foram tentados e
nenhum respondeu. | Pareceres prévios do TCDF sobre as contas do GDF | `unreachable` |
`www2.tc.df.gov.br` falha na camada TLS — a cadeia de certificado não fecha contra nenhuma das
duas autoridades certificadoras que este projeto tem registradas | Julgamento de contas pela
própria CLDF | `unreachable` | `dadosabertos.cl.df.gov.br` recusa a conexão |"* **Os dois
responderam em 2026-09-20, e a seção 8.5 publica o que eles servem.**

**O que destravou cada um, dito porque nenhum dos dois obstáculos foi contornado.** A falha de TLS
do TCDF era real e tinha uma causa nomeável: o host serve um certificado da Let's Encrypt sem
enviar o intermediário que ele próprio declara. O intermediário foi buscado no endereço que a
extensão AIA do certificado nomeia, e o dele em seguida, **exatamente o reparo que um navegador
faz** — a verificação continua ligada e nada é aceito na chegada. O julgamento de contas não veio
de `dadosabertos.cl.df.gov.br`, que segue recusando a conexão: veio da mesma API de proposições
que o Bloco 8 inteiro já lia, filtrando os Projetos de Decreto Legislativo pela ementa do próprio
publicador.

**Um `unreachable` medido a cada execução é remedido, nunca herdado de uma leitura antiga** — foi
o que aconteceu aqui: os hosts não mudaram de posição, a rota até eles é que passou a existir.

### 8.5 Contas do Governo: o parecer do TCDF e o decreto da CLDF, exercício a exercício

**São dois atos de instituições diferentes e a tabela os mantém em colunas diferentes.** O TCDF
emite um **parecer prévio** sobre as contas anuais do Governador; a CLDF as **julga**, por Decreto
Legislativo. Um não é o outro, e um exercício com parecer e sem decreto é precisamente o registro
que o Bloco 8 existe para medir `[tcdf_contas_governo, cldf_contas_governo]`.

**Só o índice, e isso é do registro de acesso, não de preguiça.** Do TCDF este documento lê
exercício, título e endereço de cada parecer — nunca o conteúdo de um parecer analisado. O
exercício e o relator vêm do **título do link**, nunca da URL: as URLs deste publicador mentem
sobre o ano.

**A coluna `Natureza` separa dois atos que a ementa do publicador distingue.** Um Projeto de
Decreto Legislativo que **aprova** as contas e um que apenas as **encaminha** à Casa são atos
diferentes; ler o segundo como o primeiro faria este documento afirmar que a CLDF julgou um
exercício que ela não julgou.

| Exercício | Parecer prévio do TCDF | Decreto da CLDF | Natureza |
|---|---|---|---|
| 2004 | publicado | PDL 154/2012 | Aprovação |
| 2005 | publicado | PDL 136/2012 | Aprovação |
| 2006 | publicado | PDL 135/2012 | Aprovação |
| 2007 | publicado | PDL 134/2012 | Aprovação |
| 2008 | publicado | PDL 226/2013 | Aprovação |
| 2009 | publicado | sem decreto | — |
| 2010 | publicado | PDL 235/2013 | Aprovação |
| 2011 | publicado | PDL 227/2013 | Aprovação |
| 2012 | publicado | PDL 236/2013 | Aprovação |
| 2013 | publicado | PDL 282/2014 | Aprovação |
| 2014 | ausente do índice | sem decreto | — |
| 2015 | publicado | PDL 415/2018 | Aprovação |
| 2016 | publicado | PDL 416/2018 | Aprovação |
| 2017 | publicado | PDL 417/2018 | Aprovação |
| 2018 | publicado | sem decreto | — |
| 2019 | publicado | sem decreto | — |
| 2020 | publicado | PDL 297/2022 | Aprovação |
| 2021 | publicado | PDL 263/2025 | Aprovação |
| 2022 | publicado | PDL 262/2025 | Aprovação |
| 2023 | publicado | sem decreto | — |
| 2024 | publicado | sem decreto | — |

**Um exercício sem decreto é publicado como linha, nunca omitido.** A omissão é o achado; uma
tabela que só mostrasse os anos julgados esconderia exatamente aquilo que este bloco mede.

---

## Procedência: o que este documento pode e não pode provar

**Toda tabela citada acima é publicada ao lado deste documento** e sai do mesmo processamento
que o gera, a cada execução.

**A rastreabilidade é verificada a cada execução, e o denominador é deste documento, não da
verificação**: **1.279 afirmações quantitativas,
1.279 conferem** — 185 em prosa,
enumeradas uma a uma, e **1.094 células de tabela lidas deste próprio arquivo** e reconstruídas do
banco. **Eram 891 e 706 até 2026-09-20**, quando entraram seis tabelas novas — cobertura da APS por
competência, registros médicos por unidade da federação, o menor vencimento da carreira médica
por vigência, a folha da SES-DF por ano, o parecer prévio do TCDF por exercício e a cobertura da
atenção básica de 2007 a 2020 — cada célula conferida contra o banco como qualquer outra. **Estes quatro números são eles próprios conferidos**: até 2026-08-28 estavam declarados
fora do denominador por serem circulares, o que não procede — a verificação **calcula** os totais e
este documento os **declara**, e comparar os dois é o mesmo ato que confere qualquer outra
afirmação. Eram os únicos números aqui mantidos à mão, e um número mantido à mão é um número que
sai do lugar: um índice interno publicou `281` muito depois de a auditoria medir 298. Uma linha
acrescentada a uma tabela publicada passa a ser conferida sem que ninguém a registre; uma linha
removida falha como linha faltante. Se qualquer uma deixar de seguir do banco, o processamento
para com erro, nomeia a afirmação e **não regera o PDF**.

**A cobertura de fontes, medida e não descrita** `[eixos_cobertura]`: 45 necessidades declaradas
(fora as `pending` — três linhas com host registrado e aquisição ainda de outra ordem de serviço:
o histórico de equipes CNES por competência, a população residente estimada por faixa etária
(IBGE SIDRA 6579) e o índice de concursos e nomeações da SES-DF. Esta última mudou de motivo e
não de estado em 2026-09-20: em 2026-09-13 ela foi declarada sem ser adquirida porque **nenhum host do DODF existia
no registro de acesso**, e desde 2026-09-19 `dodf.df.gov.br` está registrado, somente índice, por
ordem do próprio operador. O que falta agora é a aquisição, que é ordem de serviço própria — e
dizer que o host não existe quando ele já existe seria uma lacuna descrita com a razão errada),
**37 adquiridas, 4 ausentes na origem, 4 bloqueadas por controle anti-automação, 0 inalcançáveis**.
Nenhuma silenciosa. **Eram 45 e 30 até 2026-09-20**, que **não acrescentou necessidade nenhuma** e
mudou o estado de sete, todas para `acquired`: deixaram de ser `absent` a cobertura da APS
(e-Gestor AB) e a demografia médica do CFM; deixaram de ser `bloqueadas` o vencimento básico da
carreira médica SES-DF, as duas leis que mudaram a carreira (LC 840/2011 e Lei 6.137/2018, no
SINJ-DF) e o painel de folha de pagamento por carreira; e deixaram de ser `inalcançáveis` o
parecer prévio do TCDF e o julgamento das contas do DF pela CLDF. **Nenhum controle foi vencido**:
em 2026-09-19 o operador indicou, uma a uma, rotas que este projeto não tinha — um segundo
publicador da tabela de vencimentos (SEEC-DF), o host `www2.tc.df.gov.br` com o intermediário TLS
que faltava, a API de relatórios da APS, o PDF da AMB e os zips anuais da folha —, e cada host
entrou no registro de acesso antes da primeira requisição. **A linha da APS mudou de rótulo, e o
rótulo caiu de propósito**: era "por RA" e passou a ser só "Cobertura da APS, equipes ESF e ACS
(e-Gestor AB)", porque a interface que responde publica por competência e por município, nunca por
Região Administrativa — prometer o recorte que não se obtém seria a lacuna descrita com a razão
errada. O total declarado segue 45: o que mudou foi de que lado da conta cada necessidade está. **Eram 44 e 29 até 2026-09-18**, que acrescentou a tabela de códigos do
`MARCA_UTI` (issue #77) — extraída de `ftp.datasus.gov.br/.../SIHSUS/.../Auxiliar/TAB_SIH.zip`,
nunca digitada — como necessidade própria e adquirida de imediato, o insumo que corrige a
afirmação, até então falsa, de que o SIH não marca uso nem duração de UTI (§3.5). **Eram 41 e 26
até 2026-09-17**, que deu linha própria a três necessidades do
Eixo 1 que o `acquire.py` já adquiria sem nenhuma linha de cobertura — leitos de internação por
especialidade, leitos complementares e equipamentos (TABNET CNES) —, para que uma indisponibilidade do
TABNET apareça aqui como lacuna nomeada e nunca como `acquired` sobre tabela vazia. **Eram 38 e 23 até 2026-09-15** (Bloco 3, rota R2.1), que acrescentou três
necessidades do Eixo 1, todas adquiridas de imediato: a série histórica de leitos SUS por estabelecimento
e categoria (CNES, LT), a capacidade de hemodiálise (CNES, SR/EQ, serviço 004 até 2008-02, 130 desde então) e a população
estimada do DF por ano (IBGE SIDRA 6579) para o novo indicador leitos/1.000 habitantes. **Eram 19
e 7 até 2026-09-03**, que acrescentou duas necessidades ao Eixo 1 —
a série do SIH nas duas leituras e o cruzamento do Quadro 38 — e adquiriu as duas. **Eram 21 e 9 até
2026-09-04**, quando se declarou e adquiriu o índice de contrato de gestão do próprio IGES-DF, o
análogo que faltava a `hcb_contratos` do outro lado do Eixo 2. **Eram 22 e 10 até 2026-09-04**, que
declarou e adquiriu a proporção sem plano de saúde por faixa etária (Quadro 37, ANS) — o termo que
faltava para computar a Equação 1 do Caderno 2017 sem parâmetro transcrito à mão. **Eram 23 e 11 até
2026-09-10**, quando quatro necessidades do Bloco 1 passaram de `pending`/novo para `acquired` — óbitos
(SIM), nascidos vivos (SINASC), cobertura vacinal (SI-PNI, uma linha nova) e esperança de vida ao
nascer (IBGE SIDRA) — e acrescentou a própria linha de cobertura vacinal, que a declaração de
2026-09-09 não trazia. **Eram 27 e 15, com 0 inalcançáveis, até 2026-09-13**, que moveu o registro da CLDF de
`pending` para `acquired` (`cldf_proposicoes_saude`, selecionado pela própria classificação de tema
do portal, tema=24 — nenhum filtro deste projeto) e o do TCDF de `pending` para `unreachable`
(cadeia TLS incompleta em `www2.tc.df.gov.br`, medida 2026-09-13) — e separou do TCDF, para sua
própria linha, a necessidade do julgamento de contas pela CLDF, também `unreachable`
(`dadosabertos.cl.df.gov.br` recusa a conexão). **É a primeira vez que este projeto mede um
`unreachable` de verdade** — até aqui a palavra existia no vocabulário e nunca uma linha a
carregava. **Eram 30 e 16 até 2026-09-13**, apurado ao lado do registro da CLDF e integrado
junto com ele: resolveu duas das linhas `pending` do Bloco 7 — o índice do
Plano de Governo via TSE DivulgaCand, medido bloqueado por WAF Akamai, e o índice do RAG via
DigiSUS Gestor, adquirido pela API JSON privada da própria SPA — e declarou, já adquiridas, duas
necessidades novas do mesmo bloco: a cadeia orçamentária aprovado/autorizado/empenhado/liquidado/
pago da função saúde e as metas do PDS 2024-2027. **Os números do primeiro parágrafo são a leitura
da execução integrada**, não a soma de duas leituras de ramos que nunca rodaram juntos.

**`momentos_de_virada` (medido em 2026-09-14) não é uma necessidade de cobertura e não move os números acima —
é o cruzamento entre o Bloco 1 (quando um indicador virou) e o Bloco 8 (o que a CLDF registrou),
sem contatar nenhuma fonte nova.** 39 linhas medidas em 2026-09-14, uma por (indicador, ano de
giro), sobre os seis indicadores do Bloco 1. Duas regras de giro, declaradas uma vez e aplicadas
identicamente a todo indicador e todo ano — nunca ajustadas depois de olhar onde uma proposição
cai: mudança de sinal sustentada por pelo menos dois anos, e variação acima do desvio-padrão da
própria série (`statistics.pstdev`) — um limiar que é a própria série quem fixa, nunca um número
escolhido por indicador. A janela de busca por proposições não é uniforme (decisão do operador,
2026-09-14): requerimento de informação e convocação tomam o ano do giro mais 1 ano seguinte;
PL/PDL e CPI tomam o ano do giro mais 2 anos seguintes, porque uma CPI leva mais tempo para se
instalar que um requerimento — uma janela mais larga não torna a presença ou a ausência de um
instrumento numa afirmação mais forte, apenas altera o que conta como "dentro do prazo". **Das
39 linhas, 15 são medidas e 24 são lacunas declaradas** (giros datados antes de 2017, início
medido da cobertura de `cldf_proposicoes_saude` — a janela não é buscada para eles, por
razão declarada, nunca deixada parecer um zero). **`instrumento_convocacao` e `instrumento_cpi`
são 0 nas 39 linhas** — não porque a CLDF nunca convocou um secretário ou nunca abriu uma CPI
sobre saúde, mas porque nenhuma das seis colunas de `cldf_proposicoes_saude` (autor, data, número,
tipo, tramitação, url) distingue esses dois instrumentos de um requerimento de informação comum, e
uma CPI é uma comissão, não uma proposição, sem `tipo` próprio nesse registro. Um zero nessas duas
colunas é a muralha medida, não a ausência que ele pareceria ser lida sozinho — e é exatamente por
isso que esta frase existe. **`proposicoes_ids` cita apenas proposições cujo `tipo` mapeia para um
dos quatro instrumentos declarados e cuja data cai na janela própria daquele instrumento** — nunca
qualquer proposição apenas por estar no intervalo de anos: o corte tema=24 também carrega tipos que
esta tabela nunca mapeia (Indicação, Moção, Proc, Projeto de Resolução, Proposta de Emenda à Lei
Orgânica), e listá-los ao lado de um `instrumento_convocacao`/`instrumento_cpi` estruturalmente 0
seria exatamente a aparência de engajamento legislativo que esta tabela existe para não fabricar
(achado na revisão independente de 2026-09-14, corrigido antes de publicar). **O desvio-padrão da RULE B é
calculado uma vez sobre toda a série de níveis do indicador** (`statistics.pstdev`), não sobre uma
janela móvel nem apenas sobre os anos anteriores ao giro — o mesmo limiar, fixado pela série inteira,
é comparado contra cada variação ano a ano dela.

**E são 19 adquiridas, não as 20 que a integração leu na primeira vez — a diferença é um defeito
achado antes de virar número publicado.** Uma mesma função de aquisição pode servir mais de uma
necessidade: `promessas` serve as duas linhas novas do Bloco 7, e `acquire.py` registra o resultado
sob o nome da **função**, não sob o da necessidade. A metade DigiSUS voltou, a metade TSE não —
e a palavra única `acquired` promovia, na tabela publicada, a linha declarada `blocked`, aquela em
que o WAF Akamai responde 403 e toda linha emitida é `lacuna`. A revisão independente da integração
achou isso antes de publicar. A regra agora é explícita no código: **uma função compartilhada pode
rebaixar uma linha e nunca promovê-la** — a mesma postura que a tabela já tinha diante de uma
sondagem, e pelo mesmo motivo, porque uma cobertura que exagera o alcance é exatamente a falha que
esta tabela existe para impedir. A linha do TSE lê `blocked` e diz, no seu próprio `motivo`, por que
manteve o estado declarado.

**Eram 34 e 19 até 2026-09-13**, que acrescentou duas necessidades novas do Bloco 2 já adquiridas —
equipes ESF (`equipes_aps_serie`) e UBS (`ubs_serie`), ambas séries históricas por competência lidas
da árvore CNES (`ftp.datasus.gov.br`), sem corte por Região Administrativa porque os arquivos
históricos só carregam `COD_CEP` como sinal de endereço, o mesmo problema estrutural que a apuração de 2026-09-06
já mediu para o CNES em massa — e moveu a necessidade do ICSAP de `absent` para `acquired`: a função
`icsap_serie` agora existe e roda a cada execução, mas **`acquired` aqui não significa que a lista de
CID-10 da Portaria SAS/MS 221/2008 foi obtida** — nem `www.gov.br` nem `bvsms.saude.gov.br` (por um
Chromium real, em 2026-09-11) responderam quando esta tabela foi escrita, então toda linha que ela produz
é uma lacuna nomeada, nunca uma lista transcrita à mão. A necessidade da cobertura por e-Gestor
(`aps_cobertura_egestor`) permanece `absent`: o host da API que a própria emenda deste trabalho
concedeu (`apiegestoraps.saude.gov.br`) mediu-se completamente inalcançável, por urllib puro e por um
Chromium real, em todo caminho testado — o stop que a AMENDMENT já havia autorizado de antemão, não
uma lacuna adivinhada.

**E eram 36 e 22 até 2026-09-13**, que declarou duas necessidades novas do Bloco 5 — os cargos vagos
das carreiras de saúde (`cargos_vagos`, adquirida) e o índice de concursos e nomeações da SES-DF
(`concursos_nomeacoes`, `pending`: nenhum host do DODF existe no registro de acesso e nenhum foi
concedido para obter um) — e **moveu o painel de folha de pagamento por carreira de `pending` para
`blocked`**, sobre uma medição e não uma estimativa: o painel serve 262.422 linhas para UMA
competência com todo parâmetro de filtro silenciosamente ignorado, sob um limite publicado de
10/minuto e 250/hora. As bloqueadas vão de 6 para 7 por essa linha. **A série de pagamento não é
publicada**, e a decisão de não publicá-la é do operador, de 2026-09-13.

**A apuração de 2026-09-16 não move nenhum número desta seção, e mesmo assim precisa ser dito: em 2026-09-15 o
IBGE ligou um controle anti-automação sobre uma das suas duas interfaces públicas.**
`apisidra.ibge.gov.br` — a interface de onde saem o IPCA que deflaciona toda série nominal deste
documento e a esperança de vida ao nascer do Bloco 1 — passou a responder HTTP 403 com a
interstitial "Just a moment..." da Cloudflare, tendo servido normalmente às 04:53Z do mesmo dia.
Não é uma postura permanente do publicador: é um controle que foi ligado. **A resposta deste
projeto não foi contorná-lo.** Nenhuma requisição é moldada para passar por ele — sem repetição de
token, sem disfarce de navegador, sem escada de repetições feita para cansá-lo, e sem navegador
real (mediu-se em 2026-09-11 que um Chromium não muda esta classe de resposta). O que este projeto fez
foi perguntar ao **mesmo publicador pela outra porta**: `servicodados.ibge.gov.br`, a API de
agregados que o próprio IBGE documenta, e que serve os mesmos três agregados (1737 IPCA, 6579
população, 7362 esperança de vida). **Os valores conferem linha a linha com o que já estava
publicado** — 552 meses de IPCA de 1980-01 a 2025-12, e a esperança de vida de 2000 em 72,25 anos,
idêntica. A linha do registro de acesso para o novo host foi escrita **antes** da primeira
requisição a ele, como manda a regra de ordenação deste projeto, e limitada a esses três agregados.

**As duas interfaces são medidas a cada execução, e a degradação não sobrevive ao controle**
`[fontes_desafiadas]`. A que responder primeiro é a publicada; no dia em que as duas responderem
com um controle, a tabela sai **vazia com a lacuna nomeada** — host, código HTTP, como o controle
se identifica e a data em que **esta** execução o mediu — em vez de sair com um número velho
vestido de recente. E há uma trava a mais, encontrada antes de ela custar um
número errado: uma série de IPCA vazia multiplicaria por 1,0 e publicaria o **nominal** com o nome
do **real**. O deflator agora **recusa** uma série vazia ou com buraco, em vez de devolver 1,0.

**Estas duas contagens já estiveram erradas neste documento, por um dia, e a correção fica dita
aqui em vez de apagada.** A integração das duas apurações de 2026-09-13 re-derivou `ausentes` e `bloqueadas` da
declaração ESTÁTICA em `eixos.COBERTURA` e publicou 7 e 6. A tabela não é a declaração: a
necessidade do vencimento da SES-DF é declarada `absent` no código e a sondagem de 2026-09-03 a
rebaixa para `blocked` a cada execução, sobre a recusa medida do próprio host. A leitura publicada
é 6 e 7 — a que as duas apurações já tinham escrito, cada uma do seu lado, antes de serem
integradas. A conferência pegou a divergência e **não regerou o PDF**, que é exatamente o que ela
existe para fazer.

**E até 2026-09-03 a palavra `absent` era herdada, não medida** `[cobertura_sondas]`. Cada uma
dessas linhas era uma afirmação sobre o que um publicador publica, escrita uma vez, num dia, por
uma leitura — e repetida por toda execução seguinte sem ser reconferida. O que a execução conferia
era `alcance_hosts`, que mede **hosts**, não necessidades; e quase todas essas necessidades estavam
em hosts que respondem normalmente, de modo que o único instrumento que rodava a cada execução media
justamente aquilo que nunca esteve em dúvida. Agora cada `absent` é **contado**: o índice do próprio
publicador é enumerado a cada execução e a tabela `cobertura_sondas` guarda o que ele listou e
quanto.

**A contagem confirmou a ausência em todos os casos, e isso é o resultado — não uma decepção.**
Dois achados, porém, mudaram o que está publicado. O primeiro: **a série de vencimentos da carreira
médica da SES-DF deixou de ser `absent` e passou a ser `blocked`**, o que move os números do
parágrafo acima (eram 8 e 4). Ela falha porque a sua fonte — o SINJ-DF — está bloqueada, e a linha
imediatamente abaixo dela nesta mesma tabela, mesmo host e mesmo motivo, sempre foi `blocked`: duas
palavras diferentes para o mesmo fato, a um espaço de distância, porque cada uma foi escrita uma vez
e nenhuma foi relida. **O total de 21 não muda**, o que é o que faz disso uma reclassificação e não
uma perda. O segundo: **a linha do ICSAP diz `absent` sobre um publicador que publica os insumos** —
as dimensões de CID-10 estão no formulário do TABNET, e o que falta é a *derivação*, que este
projeto não fez. Isso não é ausência do publicador, e o vocabulário de quatro palavras não tem termo
para "derivável e não derivado". Fica registrado como achado, não corrigido por analogia.

**Duas fontes tinham interface legível por máquina que este projeto nunca havia consultado**, e as
duas foram consultadas antes de a ausência ser reafirmada: `www.escs.edu.br` serve uma API REST
aberta do WordPress, e `portal.cfm.org.br` serve um índice de sitemap em várias partes que o próprio
`robots.txt` anuncia. É a mesma forma de interface encontrada no IGES-DF, em 2026-08-28, depois de
esta tabela ter registrado `absent` por ninguém ter procurado. Aqui procurou-se: nenhuma das duas
lista série alguma do que estas necessidades pedem, e agora isso é uma contagem refeita a cada
execução em vez de uma leitura de um dia.

**Os documentos anteriores deste projeto estão superados por este, e foram mantidos.** Os cinco
PDFs em `docs/` são a análise deste projeto como ela estava **antes de conseguir se sustentar**:
a auditoria de 2026-08-22 mediu que 3 de 58 afirmações quantitativas deles eram rastreáveis a um
artefato de `dados/` — 5,2 %. Eles não foram editados nem apagados; cada um recebeu um ponteiro
para este documento. São a evidência da lacuna que este dossiê fecha.

---

*Fim do dossiê. Primeira versão em 2026-08-27, reorganizado em 2026-09-17. Fonte de verdade: este arquivo.*
