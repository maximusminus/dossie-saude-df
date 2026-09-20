---
layout: default
title: "Method: bed-requirement parameters and where each one comes from"
---
# DIMENSIONAMENTO — capacidade SUS contra parâmetro normativo

> Nota de método do `OS-011`. É a tabela que a `Proposta de elaboração` chama de *o coração do
> eixo*: o que o DF tem, contra o que a norma diz que precisaria ter.

**Um déficit aqui é aritmética — capacidade menos parâmetro — e não uma afirmação sobre adequação
clínica.** A frase está aqui porque o número será lido como a afirmação mais forte.

## O que mudou em 2026-09-06, e por que esta página inteira mudou de sinal

**A linha de leitos gerais saiu da Portaria GM/MS 1.101/2002.** Até esta data, o número mais
importante deste projeto — quantos leitos de enfermaria faltam ao DF — era calculado sobre **2,5 a
3 leitos por 1.000 habitantes**, um parâmetro de uma norma **revogada em 2015** cujo texto nenhum
artefato deste repositório jamais conteve: ele chegava aqui **digitado à mão**. O `OS-024` o
substituiu pela **Equação 1 do Caderno de Critérios e Parâmetros Assistenciais do SUS (MS, 2017)**,
o documento que substituiu a 1.101, medida com o SIH de 2024 e sem nenhum número digitado.

**O resultado agregado do DF inverteu de déficit para superávit, e a desigualdade regional não
inverteu.** Os números estão na seção *A Equação 1 do Caderno de 2017* abaixo e no
[dossiê](../dossie.md) §1.2–1.4; as tabelas antigas desta página, calculadas sobre a 1.101, seguem
publicadas mais abaixo com esta advertência, **citadas e não apagadas**, porque um leitor que as
leu precisa saber o que leu.

**O que exatamente sobrou de transcrito.** A frase logo abaixo — *"os dois que produzem quase todos
os números abaixo estão transcritos"* — **valia até 2026-09-06 e não vale mais**. Sobrou **um**: a
faixa de **4 % a 10 % do total de leitos hospitalares** aplicada à UTI, que continua vindo da
1.101/2002 digitada à mão — e continua publicada, porque a leitura abaixo é **ao lado dela, nunca a
substituindo** (`OS-082`, Q2).

**Corrigido em 2026-09-18 pelo `OS-082` ([issue #77](https://github.com/maximusminus/saudedf/issues/77)).**
O parágrafo acima, até essa data, terminava dizendo que faltava a tabela de códigos do `MARCA_UTI` e
que a rota estava aberta e sem resultado — **isso não é mais verdade**. O leiaute reduzido do SIH
**carrega** `MARCA_UTI` e `UTI_MES_TO` (a marca de UTI e os dias de permanência em UTI); a tabela de
códigos que faltava foi **extraída** de um documento fetchado do próprio DATASUS
(`ftp.datasus.gov.br`, `TAB_SIH.zip`, membro `CNV/MARCAUTI.CNV`), nunca digitada. As Equações 2 e 3
agora são calculadas para **UTI adulto** e **UTI pediátrica** — ver a nova seção *UTI pelas
Equações 2 e 3 do Caderno 2017 — OS-082* mais abaixo nesta página e [dossiê](../dossie.md) §3.5. **UTI
neonatal continua sem essa leitura**, por um motivo herdado de Neonatologia (falta o fator de
correção do sub-registro do SINASC), não por uma limitação do SIH.

## Leia isto antes de qualquer número desta página

**De oito parâmetros, dois foram lidos de documentos que este repositório contém. Os outros seis,
não.** O que resta **transcrito** — alguém digitou o valor à mão — é a proporção de UTI da
Portaria 1.101/2002.

**A frase que esta substitui, citada em vez de apagada:** *"De oito parâmetros, um foi lido de um
documento que este repositório contém. Os outros sete, não. Os dois que produzem quase todos os
números abaixo estão transcritos: alguém digitou o valor à mão."*

`dados/processed/parametro_portaria_1101.json` parece uma extração e não é uma.
`scripts_extracao/03_portaria_1101_2002.py` — um dos 24 extratores superados — baixou a
página da Portaria GM/MS 1.101/2002, **não leu nada dela**, e gravou um dicionário digitado à mão,
com uma observação do próprio autor mandando conferir o HTML bruto. O HTML está guardado em
`dados/raw/portaria_1101_2002.html`: o corpo normativo dela termina na palavra **ANEXO** (o que vem
depois é rodapé do site), e o Anexo, que é onde os parâmetros estão, **não é publicado naquela
página**. As sequências `leito`, `2,5`, `4%`, `10%` e
`0,15` aparecem **zero vezes** nesse arquivo.

**A página LINKA o Anexo**, como PDF separado em
`bvsms.saude.gov.br/bvs/saudelegis/gm/2002/anexo/anexo_prt1101_12_06_2002.pdf`. Uma versão anterior
desta nota afirmava que a página não tinha link nenhum — era falso, e a revisão independente do
`OS-011` derrubou a afirmação antes do commit.

**O `OS-019` abriu esse caminho e ele não leva a lugar nenhum, e agora isso está medido em vez de
suposto.** O operador aprovou a linha de registro para `bvsms.saude.gov.br` em **2026-08-28**,
escrita antes da primeira requisição; o host foi então alcançado camada a camada. **DNS resolve.
TCP completa. TLS 1.3 completa, com certificado válido para o nome.** E aí o servidor **fecha a
conexão sem enviar um byte** — em todo caminho testado, inclusive `/`, **nove tentativas, zero
bytes nas nove**.

**Não é falha de rede, e a diferença importa.** Quem o recusa se identifica. Uma única
requisição — o preâmbulo de conexão HTTP/2 (`PRI * HTTP/2.0`) enviado sem ALPN ter negociado h2,
que o servidor leu como método `PRI` sobre alvo `*` — devolveu a página de bloqueio **renderizada**
em vez de derrubada: *"The requested URL was rejected. Please consult with your administrator"*,
com support ID, que é a página do **F5 BigIP ASM**. Está em
`../dados/raw/bvsms_f5_block.html`; a porta 80 responde 302
assinado `Server: BigIP`, em
`../dados/raw/bvsms_port80_302.txt`. **As duas requisições
estão transcritas por inteiro** em
`../dados/raw/bvsms_f5_block.README.md`, porque evidência
que ninguém consegue auditar é afirmação. **Nenhuma delas foi moldada para passar pelo controle**:
a que respondeu é a que o descreve, não a que o burla. **É um WAF**, e um WAF não é contornado aqui
(assunção 3 do BRIEF do `OS-012`, a mesma linha que deixa o e-MEC e o CRM-DF onde estão). O estado
é `blocked`, está em `eixos_cobertura` como linha do Eixo 1, e `alcance_hosts` **remede a camada a
cada execução** em vez de repetir esta frase de memória.

**O degrau mais alto continua fora de alcance, e a consequência é a que já estava escrita: os dois
parâmetros continuam `transcrito`.** O que mudou não é o estado — é que ele agora tem data,
camada e evidência, em vez de ser um rodapé apoiado numa sondagem que ninguém refez.

A escala tem três degraus:

| `estado_fonte` | O que significa | Quantos parâmetros |
|---|---|---:|
| `extraído` | lido de um documento que este repositório contém, **a cada execução** | **2** — UTI neonatal (Quadro 5) e **leitos gerais** (Equação 1 + Quadro 43, novo no `OS-024`) |
| `transcrito` | está em `dados/` como valor digitado à mão; a norma é nomeada e seu texto nunca foi lido aqui | **1** — a proporção de UTI da 1.101/2002 |
| `sem fonte` | chega só pela prosa do documento de entrada, ou não chega — publicado como `UNSOURCED`, nunca calculado | 5 |

**A contagem anterior, citada:** *"`extraído` | 1 — UTI neonatal … `transcrito` | 2 — leitos
gerais e a proporção de UTI"*. O que moveu a linha de leitos gerais está na seção seguinte.

Isto não é uma ressalva de rodapé: é a condição que o `OS-008` mediu, encontrada
outra vez, agora dentro do próprio cálculo. Uma versão anterior deste módulo marcava os dois
parâmetros da 1.101 como **sourced**, e a revisão independente derrubou a marcação antes do commit.

### O parâmetro que está extraído, e como ele foi encontrado

O Caderno de 2017 — o documento que **substituiu** a Portaria 1.101 — traz, no seu **Quadro 5
(Rede Cegonha)**, requisitos de leito por **1.000 nascidos vivos**:

> **02 leitos de UTI neonatal para cada 1.000 nascidos vivos na região**
> 03 leitos de UCI neonatal para cada 1.000 nascidos vivos na região
> 01 leito Canguru para cada 1.000 nascidos vivos na região

O denominador é **nascidos vivos**, e este projeto tem uma série do SINASC
(`nascidos_vivos_peso`, TABNET). Logo o requisito de UTI neonatal é **calculável a partir de um
documento que está em `dados/raw/`** — e a extração roda a cada execução, com o trecho literal
gravado em `parametros_caderno_2017.texto_extraido`. Se o documento deixar de trazer a frase, a
aquisição falha em vez de continuar publicando o número velho.

**Uma versão anterior desta nota dizia que o Caderno de 2017 não continha nenhum parâmetro de leito
por 1.000 e que rodá-lo exigiria dados do SIH.** Era falso, e o arquivo estava em `dados/raw/`,
baixado por este mesmo trabalho. Foi a revisão independente que o abriu e encontrou o Quadro 5.
Dizer "não conseguimos obter" sobre um documento que já está no repositório é exatamente a falha
que o `OS-008` mediu, e ela apareceu aqui.

## O que entra na conta

| | |
|---|---|
| **Capacidade** | leitos **SUS** de estabelecimentos **ativos**, competência CNES 202607 |
| **Denominador** | **PDAD-A 2024** (`ras_regioes.populacao_pdad`), por decisão do operador em 2026-08-23 |
| **Chaves** | região de saúde (7), Região Administrativa (35), e a linha do DF |
| **Conferência** | **6 grupos de internação e 4 categorias de complementares**, cada um igual ao que o TABNET publica |
| **Sinal** | `déficit = necessário − existente`: **positivo é déficit, negativo é excedente**; `%` é `déficit / necessário` |

**Duas das seis categorias são o `TP_LEITO` do próprio CNES; as outras quatro são um recorte deste
módulo, e o que as autoriza é o TABNET.** Enfermaria pediátrica é `TP_LEITO` 5 e enfermaria adulto
é tudo o mais que não é complementar. As quatro restantes — UTI adulto, UTI pediátrica, UTI
neonatal e cuidados intermediários — vivem todas dentro de um único `TP_LEITO` (`3`), e a partição
entre elas é feita por `co_leito` neste módulo. **A autoridade sobre esse recorte é o TABNET**, que
publica os complementares em 25 tipos nomeados: `conferencia()` reconcilia as quatro categorias
contra eles, e a execução para se qualquer uma divergir. A conferência é grupo a grupo — os seis grupos de internação do TABNET contra o
`TP_LEITO`, **e as quatro categorias dentro dos complementares separadamente**. As duas verificações
são necessárias e nenhuma basta sozinha: um total agregado não enxerga um leito trocado de UTI para
cuidado intermediário, porque os dois são complementares e a soma não muda. Inclui o único código em
que as duas fontes discordam (`66`, *unidade de isolamento*, que o TABNET conta entre os
complementares e o `tbLeito` classifica como clínico: são 16 leitos, reconciliados explicitamente e
não diluídos). Um código complementar que se descreva como UTI e não esteja em nenhum dos três
conjuntos **faz a execução parar**, em vez de cair na categoria residual — e o mesmo vale para um
código complementar novo que não esteja na lista dos intermediários.

**"Enfermaria adulto" é um agregado que este documento nomeia, não uma categoria do CNES.** Ela
absorve `TP_LEITO` 1, 2, 4, 6 e 7 — cirúrgicos, clínicos, **obstétricos**, outras especialidades e
**hospital/dia**. Isso significa que a base do parâmetro de 2,5–3/1.000 inclui **614 leitos SUS
obstétricos**, **82 de hospital/dia** e **432 de outras especialidades**, que não são leitos de
enfermaria adulta em nenhum sentido clínico. São até **1.128** leitos, e quem ler "enfermaria
adulto" como *enfermaria clínica de adulto* erra por esse tanto. A alternativa seria inventar uma partição que o `TP_LEITO` não dá.

## A norma que este cálculo usa foi revogada

**A Portaria GM/MS 1.101/2002 foi revogada em 2015.** O documento que a substituiu — *Critérios e
Parâmetros Assistenciais para o Planejamento e Programação de Ações e Serviços de Saúde no âmbito
do SUS*, MS, 2017, em `dados/raw/MS-criterios-parametros-assistenciais-2017.pdf` — cita a Portaria
1.101 três vezes e **não repete nenhum dos dois parâmetros transcritos usados aqui**. Isso é
verificado a cada execução, não afirmado: a aquisição falha se algum dia passar a contê-los.

Para **leitos gerais**, o caderno de 2017 usa outro método: taxas de internação esperadas, tempo
médio de permanência e taxa de ocupação por especialidade.

**Até 2026-09-03 esta seção dizia que rodá-lo "exigiria dados do SIH que este projeto não tem".
Deixou de ser verdade, e a frase é corrigida em vez de apagada — o `OS-023` adquiriu esses
dados.** O SIH está aqui em duas interfaces: a série do TABNET nas **duas leituras publicadas**
(por local de residência e por local de internação), 2008-2024, competência de atendimento
`[sih_serie_tabnet]`; e os **microdados reduzidos** (arquivos RD), de onde sai o cruzamento
especialidade do leito × faixa etária que o Quadro 38 exige e **que o TABNET não é capaz de
produzir** — as duas dimensões vivem em arquivos `.def` diferentes e o TABNET só cruza dimensões
dentro de um mesmo arquivo, o que foi medido contra as quatro famílias `.def` do SIH que este
projeto alcança `[sih_probes_def, sih_microdados_espec_faixa]`.

**O termo que só o par de leituras produz, e que muda o resultado:** o Fnr do caderno é
`100/PIr`, onde PIr é o percentual de internações de residentes. No DF ele **não é termo de
arredondamento**. Em 17 anos, **733.271 internações ocorridas no DF foram de não residentes —
21,4 % do total** —, e o PIr fica entre 76,04 % (2013) e 82,44 % (2011) em todos os anos da série,
sem tendência `[sih_residencia_fnr]`. Em 2024, PIr = 77,60 % e **Fnr = 1,2887**: qualquer requisito
de leitos calculado pelo método de 2017 para o DF é multiplicado por cerca de **1,29**.
O PIr é medido registro a registro pelo município de residência de cada AIH, **não** pela divisão
das duas leituras do TABNET — essa divisão mistura universos (o numerador inclui residentes
internados fora do DF) e dá 1,2782, errado por construção. O DF é o núcleo de
uma RIDE e interna gente de Goiás e de Minas por desenho, e é isso que esse número mede.

**CORRIGIDO EM 2026-09-06: a linha de leitos gerais NÃO está mais na 1.101 — a Equação 1 do
Caderno 2017 a substituiu.** A frase que estava aqui, citada em vez de apagada: *"A linha de leitos
gerais publicada acima continua na 1.101, e agora há uma segunda, pelo método do Caderno 2017, ao
lado dela — nunca uma sobre a outra."* Isso valeu enquanto o método do Caderno só produzia linha do
DF; desde que ele produz linha por RA (ver abaixo), a razão que mantinha a 1.101 no lugar acabou. O `OS-024` adquiriu o termo que faltava
— a população de referência do Quadro 37, *"× proporção sem plano de saúde"*, dado da ANS — e
computou seis das onze combinações tipo-leito/especialidade do Quadro 38 a partir do SIH e da ANS.
As outras cinco (Obstetrícia, Neonatologia e as três UTI) permanecem `UNSOURCED`, cada uma por um
motivo nomeado, nunca por um proxy inventado. Ver a seção *Leitos gerais pelo método do Caderno
2017* abaixo.

**Mas o caderno de 2017 não é só evidência de que a 1.101 caiu.** Seu Quadro 5 traz parâmetros de
leito por 1.000 nascidos vivos, e um deles é calculável aqui — ver a seção acima. Este documento
afirmou o contrário até a revisão independente abrir o arquivo.

**A 1.101 é usada, agora para UMA linha só — a proporção de UTI —, porque a Proposta a especifica
e porque continua sendo o comparador que o debate público usa.** Não é apresentada como vigente.
A frase anterior dizia *"para as duas linhas em que é usada"*; a linha de leitos gerais saiu.

## Leitos gerais pelo método do Caderno 2017 (Equação 1) — `OS-024`

**ESTE MÉTODO SUBSTITUIU A TABELA ACIMA EM 2026-09-06, e a frase que dizia o contrário está
citada aqui em vez de apagada:** *"Este método não substitui a tabela acima — os dois ficam lado a
lado. A tabela de leitos gerais por região/RA/DF, no topo desta página, continua calculada sobre a
Portaria 1.101/2002 (`transcrito`)."* `dimensionamento_df`, `dimensionamento_regiao` e
`dimensionamento_ra` publicam agora a Equação 1 na linha de leitos gerais, com
`estado_fonte: extraído`. Esta seção é a Equação 1 do Caderno de 2017, medida com os dados que este
projeto adquiriu — a série do SIH (`OS-023`) e a proporção sem plano de saúde da ANS (`OS-024`) — em vez
da tabela de referência dos Quadros 39–42, que o próprio Caderno oferece como alternativa quando a
localidade não tem dado próprio (Quadro 44). O DF tem.

**HÁ LINHA POR RA DESDE 2026-09-05, e a frase que dizia o contrário está citada aqui em vez de
apagada:** *"Só há linha do DF. O SIH não carrega estabelecimento nem município de residência
dentro do DF — só um sinalizador residente/não-residente — e por isso este método não produz linha
por região de saúde nem por RA."* Ela era verdadeira sobre o campo `MUNIC_RES`, que é `530010` em
toda linha do DF, e falsa sobre o registro inteiro: o **CEP** está em 96,8 % das AIH, e resolvê-lo
contra a base postal dá a Região Administrativa de residência para **98,72 %** das internações de
residentes do DF `[sih_residencia_ra]`. `leitos_gerais_caderno2017_ra` publica 210 linhas — as 35
RAs oficiais x 6 categorias — e é o insumo da tabela por RA acima.

**O que continua sendo medido no nível DF e não por RA:** o **Fnre**. Ele corrige a demanda que
chega de fora da população residente, e o cruzamento por RA é chaveado por onde o paciente *mora*,
não por qual hospital o internou — não existe, nesse insumo, noção de "não-residente de uma RA".
O Fnre medido no DF por especialidade/faixa é aplicado a todas as RAs, e cada linha diz isso em
`fnr_procedencia`. A **taxa de ocupação esperada** também é a do nível DF: o Quadro 43 escolhe a
taxa pela capacidade instalada, e aplicá-lo por RA — onde toda RA cai numa faixa baixa, logo numa
ocupação esperada menor, logo num requisito *maior* — seria mudar o modelo e a geografia no mesmo
passo. Está registrado com condição de virada em `_verifica_bracket`.

**Seis das onze combinações tipo-leito/especialidade do Quadro 38 são computáveis; cinco não.**
Obstetrícia e Neonatologia exigem um "Fator de Correção do sub-registro" do SINASC que nenhum
artefato deste projeto contém (Obstetrícia exige também um recorte por segmento de cobertura que
o arquivo da ANS não publica). As três categorias de UTI (Equações 2 e 3) exigem a proporção de
internações que evoluem para UTI e o tempo médio de permanência em UTI. **A frase que estava aqui
era FALSA e está corrigida no lugar:** *"o SIH não marca, no leiaute reduzido que este projeto lê,
se uma internação usou UTI nem por quantos dias."* Ele marca as duas coisas — o leiaute RD tem
`MARCA_UTI`, `UTI_MES_TO` e `UTI_INT_TO`, e em janeiro de 2024 no DF 1.494 das 19.950 internações
(7,49 %) tiveram dia de UTI, com média de 9,52 dias. **Faltava a tabela de códigos do `MARCA_UTI`**,
que separa UTI adulto de pediátrica e de neonatal; escrevê-la de memória teria sido publicar uma
asserção como medição, e por isso este parágrafo, até 2026-09-18, terminava aqui, com a rota aberta
como [issue #77](https://github.com/maximusminus/saudedf/issues/77). **Corrigido pelo `OS-082`: a
tabela foi extraída** de um documento fetchado do DATASUS (`ftp.datasus.gov.br`, `TAB_SIH.zip`,
membro `CNV/MARCAUTI.CNV`), nunca digitada, e **UTI adulto e UTI pediátrica agora saem calculadas**
pelas Equações 2 e 3, na tabela `leitos_uti_caderno2017` — ver a seção logo abaixo. Nenhuma é
publicada com um proxy inventado; **três das cinco continuam `UNSOURCED`** em
`leitos_gerais_caderno2017` (Obstetrícia, Neonatologia, UTI neonatal), cada uma com o motivo
nomeado — a de UTI neonatal herdada do mesmo bloqueio de Neonatologia, não de uma limitação do
SIH.

| Tipo de leito | Internações residentes 2024 | TMP (dias) | Fnr | Necessário (recusa 1%–5%) |
|---|---:|---:|---:|---:|
| Pediatria clínica | 40.529 | 4,32 | 1,3761 | 688 – 718 |
| Pediatria cirúrgica | 5.264 | 3,44 | 1,4398 | 74 – 78 |
| Clínica 15-59 anos | 35.518 | 6,86 | 1,2092 | 841 – 878 |
| Clínica 60 anos ou mais | 23.421 | 9,63 | 1,1225 | 723 – 754 |
| Cirúrgica 15-59 anos | 31.187 | 4,10 | 1,2720 | 464 – 484 |
| Cirúrgica 60 anos ou mais | 12.859 | 4,99 | 1,1478 | 210 – 220 |
| **Total (seis categorias)** | | | | **3.000 – 3.132** |

Contra os **4.868 leitos SUS de enfermaria** que o topo desta página conta, as seis categorias
computáveis somam a **um excedente**, não a um déficit — o oposto da conclusão que a 1.101
produz (déficit de 2.175–4.522, a depender do denominador). **As duas contas partem do mesmo
CNES e chegam a sinais opostos porque medem coisas diferentes**: a 1.101 aplica um parâmetro
populacional fixo (2,5–3 leitos por 1.000 habitantes) e o Caderno 2017 aplica a taxa de
internação e o tempo de permanência que o próprio DF mede. As duas ficam publicadas, nenhuma
escolhida.

**Achado medido e não explicado nesta sessão, publicado porque escondê-lo seria pior: quatro das
seis taxas de internação computadas excedem substancialmente a faixa de referência do próprio
Quadro 39.** Pediatria clínica mede 135,4 por mil contra uma faixa de referência de 27,8–48,8;
Clínica 15-59 mede 52,0 contra 13,8–24,6; Clínica 60+ mede 143,0 contra 72,4–116,8; Cirúrgica
15-59 mede 45,6 contra 21,5–35,7. As duas linhas de Cirúrgica ficam perto ou dentro da faixa
(Pediatria cirúrgica, 17,6, dentro de 8,4–19,4; Cirúrgica 60+, 78,5, pouco acima de 44,0–72,6).
**O padrão — ESPEC=03/07 (clínica) diverge muito mais que ESPEC=01 (cirúrgica), com o mesmo
denominador populacional** — aponta para o numerador, não para a população de referência, mas
não foi investigado a fundo. Candidatos, nenhum descartado:

1. a correspondência `ESPEC=07 -> Pediatria clínica` e `ESPEC=03 -> Clínica` (a leitura deste
   projeto do vocabulário do SIH, não uma tabela do Caderno) pode ser mais larga do que o "leito
   clínico" que o Quadro 39 mediu nacionalmente;
2. a correspondência código→faixa etária do arquivo da ANS (`transcrita`, não extraída — ver
   `scripts_extracao/ans.py`) pode subestimar a população de referência;
3. o DF pode genuinamente internar sua própria população residente sem plano a uma taxa mais alta
   que a média nacional que o Quadro 39 reflete — o filtro `residente_df` já exclui quem não mora
   no DF, então isto **não** é efeito de polo regional (a mesma RIDE que produz o Fnr de 1,29 aqui
   não entra: só residentes são contados no numerador);
4. **achado da revisão independente desta sessão**: `internacoes_residentes_2024` vem do SIH
   fixado em 2024, mas a ANS entra pelo arquivo `tb_tx_*.dbc` **mais recente** que o índice
   publica — nesta execução, quase dois anos à frente do numerador (ver
   `defasagem_ans` em `leitos_gerais_caderno2017`). A defasagem cresce a cada execução futura
   enquanto o ano do SIH ficar fixo.

As seis linhas ficam `calculado` porque a aritmética e a fórmula estão corretas sobre dados
medidos — mas um leitor não deve tratar as quatro divergentes como validadas contra a própria
referência do método. Candidato a achado de uma OS futura.

**A população de referência da ANS não alimenta os leitos publicados, só a taxa de comparação
acima.** `taxa_internacao_por_mil` é a única coluna que a proporção sem plano de saúde afeta:
`leitos_necessarios_recusa_1pct/5pct` dependem apenas de dias de permanência, Fnr, FRe e TOe —
porque a taxa de internação, aqui, é medida diretamente do SIH em vez de escolhida de um Quadro
de referência (a convenção do próprio Quadro 44, FRe=1). Não é um defeito desta implementação,
mas não estava dito antes desta revisão independente (`inercia_algebrica` no mesmo campo).

## UTI pelas Equações 2 e 3 do Caderno 2017 — `OS-082`

**Publicada ao lado da faixa de 4 %–10 % da Portaria 1.101/2002 (topo desta página), nunca a
substituindo** (`OS-082`, Q2) — a tabela `leitos_uti_caderno2017`, medida sobre o SIH de 2024 com a
tabela de códigos do `MARCA_UTI` agora extraída (ver acima). NIe é a internação geral residente
(exclui Obstetrícia, ela própria `UNSOURCED`); pe é a proporção dessas internações com dia de UTI;
TMP UTI é o tempo médio de permanência só nos dias de UTI; Fnre é recalculado no nível do grupo, não
uma média das linhas individuais do Quadro 38; TOe é escolhido pelo Quadro 43 contra os leitos SUS
**da própria categoria de UTI**, não os de enfermaria.

**Convenção de arredondamento, a mesma que os leitos gerais desta página já usam**
(`dimensionamento.py`, `deficit_min/max = round(lo/hi) - escopo`): o banco guarda
`leitos_uti_necessarios_recusa_1pct/5pct` como fração de leito (4 casas decimais); a coluna
"Necessário" abaixo arredonda **cada extremo** para o leito inteiro mais próximo antes de compor a
faixa, e o superávit é a diferença entre os leitos instalados e **esse mesmo extremo já
arredondado** — nunca a diferença arredondada depois. `pe` e `TMP UTI` são exibidos com duas casas
decimais, a mesma precisão que a tabela já usava.

**Corrigido em 2026-09-18 pelo `OS-082`**: a linha `_cruzar_atendimento` de `sih_uti.py` passou a
usar o mesmo filtro de NIe que `leitos_gerais_caderno2017` (IDENT=1, exclui Obstetrícia) para casar
internação com marca de UTI — antes deste ajuste, `pe`, `TMP UTI`, "Internações c/ UTI" e a faixa
"Necessário" vinham de um universo de internações diferente do NIe da mesma linha, e a tabela abaixo
publicava os valores de antes do ajuste. Os números abaixo são os que o banco guarda agora; `NIe` e
`Fnre` não mudaram (o ajuste não os afeta).

| Categoria | NIe | pe | Internações c/ UTI | TMP UTI (dias) | Fnre | Leitos SUS instalados | Necessário (recusa 1%–5%) |
|---|---:|---:|---:|---:|---:|---:|---:|
| UTI adulto | 102.985 | 9,48 % | 9.760 | 8,78 | 1,2008 | 442 | 294 – 306 |
| UTI pediátrica | 45.793 | 6,06 % | 2.775 | 9,25 | 1,3834 | 134 | 105 – 113 |
| UTI neonatal | `UNSOURCED` | — | — | — | — | 86 | — |

Contra os leitos instalados, as duas categorias calculadas fecham em **superávit**: UTI adulto,
136–148 leitos; UTI pediátrica, 21–29 leitos — o mesmo sinal da faixa da Portaria acima, nenhuma das
duas leituras aponta déficit. **Verificação de consistência**: 442 + 134 + 86 (UTI neonatal, já
publicado) somam exatamente aos **662 leitos de UTI** que o dossiê já publica como total — as duas
categorias novas não contradizem o total já existente, só o decompõem.

**UTI neonatal não sai desta tabela.** Falta o NIe (internações gerais) de Neonatologia, ela própria
`UNSOURCED` por um motivo que não tem nada a ver com `MARCA_UTI` — o fator de correção do
sub-registro do SINASC que nenhum artefato deste repositório contém — e essa dependência bloqueia a
linha de UTI neonatal do mesmo jeito.

## Os parâmetros, e o que este repositório consegue mostrar de cada um

`fonte_declarada` é a norma a que o parâmetro é atribuído. `procedencia` é **onde este repositório
realmente o obteve**. `estado_fonte` é a força disso. São três campos porque são três afirmações.

| Parâmetro | Valor | Procedência | `estado_fonte` | Linha |
|---|---|---|---|---|
| **UTI neonatal — Rede Cegonha** | **2 leitos por 1.000 nascidos vivos** | **`parametros_caderno_2017.json` — lido do PDF em `dados/raw/` a cada execução, com o trecho literal** | **`extraído`** | **calculada, só no DF** |
| Leitos gerais | 2,5 a 3 por 1.000 hab | `parametro_portaria_1101.json` — **literal digitado à mão**, não extração | `transcrito` | **calculada** |
| UTI, proporção | 4 % a 10 % **do total de leitos hospitalares** | idem | `transcrito` | **calculada** |
| UTI adulto, por mil | 0,15 por 1.000 hab | **prosa da `Proposta de elaboração.pdf`**, que atribui o número à portaria. Não está no artefato acima | `sem fonte` | UNSOURCED |
| UTI neonatal — partos de risco | 1 leito para cada 6 partos de risco | prosa da Proposta. E "parto de risco" não é publicado pelo SINASC — teria de ser definido por nós | `sem fonte` | UNSOURCED |
| UTI pediátrica | — | a Proposta manda contar o leito e **não dá parâmetro** | `sem fonte` | UNSOURCED |
| Cuidados intermediários | — | categoria criada para que nenhum leito complementar seja descartado em silêncio | `sem fonte` | UNSOURCED |
| Hemodiálise | — | `censo_sbn.json` contém o menu de navegação do site, não dados | `sem fonte` | UNSOURCED |

**Cinco dos oito parâmetros saem UNSOURCED, e isso é o resultado, não uma falha da execução.** A
suposição 4 do BRIEF previu que a hemodiálise cairia; caíram outras quatro junto. Uma linha que não
consegue citar seu parâmetro é publicada como UNSOURCED com o motivo, nunca calculada assim mesmo.

**O parâmetro extraído só produz linha no DF.** O denominador dele são nascidos vivos, e a série
que este projeto tem (`nascidos_vivos_peso`, SINASC **2024**, **33.282 nascidos vivos**) é do DF
inteiro, sem quebra por RA. As 35 linhas por RA e as 7 por região saem com
`estado = "sem geografia"` e dizem isso — **não** com o número do DF rateado, que seria uma
alocação sem base. A suposição 9 do BRIEF antecipou exatamente esta situação.

| | Existente SUS | Necessário (2/1.000 NV) | Déficit |
|---|---:|---:|---:|
| **UTI neonatal, DF** | **86** | **67** | **−19 (excedente)** |

**O ano do denominador é escolhido, não herdado.** O TABNET publica prévias do SINASC para anos
ainda não fechados — 2025 está na **3ª prévia** e 2026 na 1ª — e uma prévia subconta, o que
subestima o requisito, o que **infla o excedente publicado**. Este projeto usa **2024**, o último
ano que a própria fonte declara com *dados finais*. Uma versão anterior desta nota publicava
34.878 (2025, 3ª prévia) sem dizer que era prévia.

### O parâmetro de 4 % a 10 % é aplicado como está escrito, e isso mudou o resultado

A linha transcrita diz, literalmente: **`uti | 4% a 10% do total de leitos hospitalares`**. Ela não
diz *adulto* e não diz *enfermaria*.

Uma versão anterior deste módulo aplicava esse parâmetro **só à UTI adulto** e **só sobre os leitos
de enfermaria**. Os dois estreitamentos eram invenção deste projeto, não da norma, e juntos
invertiam a conclusão: contra 442 leitos de UTI adulto sobre uma base de 4.868 enfermarias, o DF
aparecia com a faixa atravessando o zero. Aplicado como está escrito — **todos os leitos de UTI**
contra **todos os leitos hospitalares SUS** — o DF aparece com excedente. É o mesmo dado e o mesmo
parâmetro; a diferença era inteiramente interpretativa, e a interpretação não estava declarada.

## A forma da tabela

São **11 linhas por chave**, não as 6 que o critério (a) enumera, e a diferença está declarada aqui
porque muda como a tabela se soma:

- há uma **sexta categoria de leito** — *cuidados intermediários e isolamento* — para que os 82
  leitos complementares SUS que não são UTI não sumam entre as bordas das outras;
- **três tipos são reivindicados por mais de um parâmetro**, e por isso aparecem mais de uma vez:
  **UTI neonatal 3×** (a proporção de 4–10 %, a Rede Cegonha extraída, e os partos de risco
  UNSOURCED), **UTI adulto 2×** (a proporção e o 0,15 por mil UNSOURCED) e **UTI pediátrica 2×**
  (a proporção e a linha sem parâmetro próprio). 6 categorias + 5 linhas repetidas = 11;
- `existente_sus` é sempre a capacidade **do tipo daquela linha**. Quando um parâmetro vale para um
  conjunto de tipos em conjunto, a soma do conjunto vai em `existente_sus_escopo`, e é contra ela
  que o requisito é comparado. Nenhuma coluna publica o rótulo de um tipo sobre o número de outro;
- por isso **somar `existente_sus` coluna abaixo conta leitos duas vezes**: ele só soma entre tipos
  distintos.

## A linha do DF, nos três denominadores

> **TABELA SUPERADA — publicada como registro, não como resultado corrente.**
> Os números abaixo são a Portaria GM/MS 1.101/2002 (2,5 a 3 leitos/1.000 hab), que **saiu do
> cálculo em 2026-09-06** (`OS-024`). O que este projeto publica hoje é a Equação 1 do Caderno de
> 2017 — ver a seção *Leitos gerais pelo método do Caderno 2017* acima e o [dossiê](../dossie.md)
> §1.2–1.4. Esta tabela fica aqui **citada e não apagada**, porque um leitor que a leu precisa
> saber o que leu; ela **não é regerada** do banco e não deve ser lida como estado atual.


Os três totais são todos oficiais, todos publicados, e estão **11 % distantes entre si**. Nenhum é
escolhido aqui.

| Denominador | População | Existente SUS<br>(`existente_sus_escopo`) | Necessário (2,5–3/1.000) | **Déficit** |
|---|---:|---:|---:|---:|
| IBGE Censo 2022 | 2.817.381 | 4.868 | 7.043 – 8.452 | **2.175 – 3.584** |
| PDAD-A 2024 (urbana) | 2.861.057 | 4.868 | 7.153 – 8.583 | **2.285 – 3.715** |
| PDS 2024-2027, p. 36 | 3.130.014 | 4.868 | 7.825 – 9.390 | **2.957 – 4.522** |

**A escolha do denominador move a resposta em 782 leitos na ponta de 2,5 e 938 na de 3,0.** Publicar um número só
esconderia isso.

## Por região de saúde — leitos gerais (o recorte que interessa)

> **TABELA SUPERADA — publicada como registro, não como resultado corrente.**
> Os números abaixo são a Portaria GM/MS 1.101/2002 (2,5 a 3 leitos/1.000 hab), que **saiu do
> cálculo em 2026-09-06** (`OS-024`). O que este projeto publica hoje é a Equação 1 do Caderno de
> 2017 — ver a seção *Leitos gerais pelo método do Caderno 2017* acima e o [dossiê](../dossie.md)
> §1.2–1.4. Esta tabela fica aqui **citada e não apagada**, porque um leitor que a leu precisa
> saber o que leu; ela **não é regerada** do banco e não deve ser lida como estado atual.


Denominador PDAD-A 2024. **As duas pontas do parâmetro estão publicadas**: uma faixa que a norma
deixou aberta não é resolvida escolhendo uma ponta, e escolher a de cima seria escolher a que
maximiza o déficit.

| Região de saúde | População | Existente SUS<br>(`existente_sus_escopo`) | Necessário (2,5–3/1.000) | Déficit | % |
|---|---:|---:|---:|---:|---:|
| **Centro-Sul** | 342.622 | **60** | 857 – 1.028 | **+797 a +968** | **93,0 – 94,2 %** |
| Sudoeste | 837.326 | 652 | 2.093 – 2.512 | +1.441 a +1.860 | 68,8 – 74,0 % |
| Leste | 296.755 | 235 | 742 – 890 | +507 a +655 | 68,3 – 73,6 % |
| Norte | 330.604 | 365 | 827 – 992 | +462 a +627 | 55,9 – 63,2 % |
| Oeste | 437.685 | 634 | 1.094 – 1.313 | +460 a +679 | 42,0 – 51,7 % |
| Sul | 255.583 | 861 | 639 – 767 | −222 a −94 | −34,7 a −12,3 % |
| **Central** | 360.482 | **2.061** | 901 – 1.081 | **−1.160 a −980** | **−128,7 a −90,7 %** |

**Cinco das sete regiões estão abaixo do parâmetro nas duas pontas e duas estão acima dele nas
duas.** A Centro-Sul, com 342 mil habitantes, tem 60 leitos SUS de internação — entre 5,8 % e 7,0 %
do que o parâmetro pede.

### A tabela completa por região de saúde

As 77 linhas — 7 regiões × 11 — exatamente como estão em `dimensionamento_regiao` e em
`dados/processed/dimensionamento_regiao.json`. *Existente SUS* é a capacidade **do tipo daquela
linha**; *Do escopo* é a soma do conjunto de tipos que o parâmetro governa, e é contra ela que o
requisito é comparado.

| Região de saúde | Tipo de leito | Parâmetro | Existente SUS | Do escopo | Necessário | Déficit | % |
|---|---|---|---:|---:|---:|---:|---:|
| Central | enfermaria adulto | leitos gerais | 1.752 | 2.061 | 901 – 1.081 | -1.160 a -980 | -128,7 % a -90,7 % |
| Central | enfermaria pediátrica | leitos gerais | 309 | 2.061 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Central | UTI adulto | UTI adulto — por mil habitantes | 267 | 267 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Central | UTI adulto | UTI — proporção dos leitos hospitalares | 267 | 440 | 101 – 252 | -339 a -188 | -335,6 % a -74,6 % |
| Central | UTI pediátrica | UTI pediátrica | 123 | 123 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Central | UTI pediátrica | UTI — proporção dos leitos hospitalares | 123 | 440 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Central | UTI neonatal | UTI neonatal — Rede Cegonha 2017 | 50 | 50 | *sem geografia* | *sem geografia* | *sem geografia* |
| Central | UTI neonatal | UTI neonatal — partos de risco | 50 | 50 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Central | UTI neonatal | UTI — proporção dos leitos hospitalares | 50 | 440 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Central | cuidados intermediários e isolamento | cuidados intermediários | 19 | 19 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Central | hemodiálise | hemodiálise | — | — | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Centro-Sul | enfermaria adulto | leitos gerais | 60 | 60 | 857 – 1.028 | +797 a +968 | +93,0 % a +94,2 % |
| Centro-Sul | enfermaria pediátrica | leitos gerais | 0 | 60 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Centro-Sul | UTI adulto | UTI adulto — por mil habitantes | 13 | 13 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Centro-Sul | UTI adulto | UTI — proporção dos leitos hospitalares | 13 | 13 | 3 – 7 | -10 a -6 | -333,3 % a -85,7 % |
| Centro-Sul | UTI pediátrica | UTI pediátrica | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Centro-Sul | UTI pediátrica | UTI — proporção dos leitos hospitalares | 0 | 13 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Centro-Sul | UTI neonatal | UTI neonatal — Rede Cegonha 2017 | 0 | 0 | *sem geografia* | *sem geografia* | *sem geografia* |
| Centro-Sul | UTI neonatal | UTI neonatal — partos de risco | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Centro-Sul | UTI neonatal | UTI — proporção dos leitos hospitalares | 0 | 13 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Centro-Sul | cuidados intermediários e isolamento | cuidados intermediários | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Centro-Sul | hemodiálise | hemodiálise | — | — | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Leste | enfermaria adulto | leitos gerais | 207 | 235 | 742 – 890 | +507 a +655 | +68,3 % a +73,6 % |
| Leste | enfermaria pediátrica | leitos gerais | 28 | 235 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Leste | UTI adulto | UTI adulto — por mil habitantes | 10 | 10 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Leste | UTI adulto | UTI — proporção dos leitos hospitalares | 10 | 10 | 10 – 26 | +0 a +16 | +0,0 % a +61,5 % |
| Leste | UTI pediátrica | UTI pediátrica | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Leste | UTI pediátrica | UTI — proporção dos leitos hospitalares | 0 | 10 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Leste | UTI neonatal | UTI neonatal — Rede Cegonha 2017 | 0 | 0 | *sem geografia* | *sem geografia* | *sem geografia* |
| Leste | UTI neonatal | UTI neonatal — partos de risco | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Leste | UTI neonatal | UTI — proporção dos leitos hospitalares | 0 | 10 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Leste | cuidados intermediários e isolamento | cuidados intermediários | 17 | 17 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Leste | hemodiálise | hemodiálise | — | — | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Norte | enfermaria adulto | leitos gerais | 330 | 365 | 827 – 992 | +462 a +627 | +55,9 % a +63,2 % |
| Norte | enfermaria pediátrica | leitos gerais | 35 | 365 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Norte | UTI adulto | UTI adulto — por mil habitantes | 6 | 6 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Norte | UTI adulto | UTI — proporção dos leitos hospitalares | 6 | 6 | 15 – 38 | +9 a +32 | +60,0 % a +84,2 % |
| Norte | UTI pediátrica | UTI pediátrica | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Norte | UTI pediátrica | UTI — proporção dos leitos hospitalares | 0 | 6 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Norte | UTI neonatal | UTI neonatal — Rede Cegonha 2017 | 0 | 0 | *sem geografia* | *sem geografia* | *sem geografia* |
| Norte | UTI neonatal | UTI neonatal — partos de risco | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Norte | UTI neonatal | UTI — proporção dos leitos hospitalares | 0 | 6 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Norte | cuidados intermediários e isolamento | cuidados intermediários | 4 | 4 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Norte | hemodiálise | hemodiálise | — | — | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Oeste | enfermaria adulto | leitos gerais | 574 | 634 | 1.094 – 1.313 | +460 a +679 | +42,0 % a +51,7 % |
| Oeste | enfermaria pediátrica | leitos gerais | 60 | 634 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Oeste | UTI adulto | UTI adulto — por mil habitantes | 16 | 16 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Oeste | UTI adulto | UTI — proporção dos leitos hospitalares | 16 | 38 | 28 – 69 | -10 a +31 | -35,7 % a +44,9 % |
| Oeste | UTI pediátrica | UTI pediátrica | 9 | 9 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Oeste | UTI pediátrica | UTI — proporção dos leitos hospitalares | 9 | 38 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Oeste | UTI neonatal | UTI neonatal — Rede Cegonha 2017 | 13 | 13 | *sem geografia* | *sem geografia* | *sem geografia* |
| Oeste | UTI neonatal | UTI neonatal — partos de risco | 13 | 13 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Oeste | UTI neonatal | UTI — proporção dos leitos hospitalares | 13 | 38 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Oeste | cuidados intermediários e isolamento | cuidados intermediários | 20 | 20 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Oeste | hemodiálise | hemodiálise | — | — | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sudoeste | enfermaria adulto | leitos gerais | 577 | 652 | 2.093 – 2.512 | +1.441 a +1.860 | +68,8 % a +74,0 % |
| Sudoeste | enfermaria pediátrica | leitos gerais | 75 | 652 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Sudoeste | UTI adulto | UTI adulto — por mil habitantes | 40 | 40 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sudoeste | UTI adulto | UTI — proporção dos leitos hospitalares | 40 | 45 | 28 – 70 | -17 a +25 | -60,7 % a +35,7 % |
| Sudoeste | UTI pediátrica | UTI pediátrica | 2 | 2 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sudoeste | UTI pediátrica | UTI — proporção dos leitos hospitalares | 2 | 45 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Sudoeste | UTI neonatal | UTI neonatal — Rede Cegonha 2017 | 3 | 3 | *sem geografia* | *sem geografia* | *sem geografia* |
| Sudoeste | UTI neonatal | UTI neonatal — partos de risco | 3 | 3 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sudoeste | UTI neonatal | UTI — proporção dos leitos hospitalares | 3 | 45 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Sudoeste | cuidados intermediários e isolamento | cuidados intermediários | 1 | 1 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sudoeste | hemodiálise | hemodiálise | — | — | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sul | enfermaria adulto | leitos gerais | 751 | 861 | 639 – 767 | -222 a -94 | -34,7 % a -12,3 % |
| Sul | enfermaria pediátrica | leitos gerais | 110 | 861 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Sul | UTI adulto | UTI adulto — por mil habitantes | 90 | 90 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sul | UTI adulto | UTI — proporção dos leitos hospitalares | 90 | 110 | 40 – 99 | -70 a -11 | -175,0 % a -11,1 % |
| Sul | UTI pediátrica | UTI pediátrica | 0 | 0 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sul | UTI pediátrica | UTI — proporção dos leitos hospitalares | 0 | 110 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Sul | UTI neonatal | UTI neonatal — Rede Cegonha 2017 | 20 | 20 | *sem geografia* | *sem geografia* | *sem geografia* |
| Sul | UTI neonatal | UTI neonatal — partos de risco | 20 | 20 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sul | UTI neonatal | UTI — proporção dos leitos hospitalares | 20 | 110 | *sem requisito próprio* | *sem requisito próprio* | *sem requisito próprio* |
| Sul | cuidados intermediários e isolamento | cuidados intermediários | 21 | 21 | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |
| Sul | hemodiálise | hemodiálise | — | — | *UNSOURCED* | *UNSOURCED* | *UNSOURCED* |

## Por RA — e a ressalva que essa tabela exige

> **TABELA SUPERADA — publicada como registro, não como resultado corrente.**
> Os números abaixo são a Portaria GM/MS 1.101/2002 (2,5 a 3 leitos/1.000 hab), que **saiu do
> cálculo em 2026-09-06** (`OS-024`). O que este projeto publica hoje é a Equação 1 do Caderno de
> 2017 — ver a seção *Leitos gerais pelo método do Caderno 2017* acima e o [dossiê](../dossie.md)
> §1.2–1.4. Esta tabela fica aqui **citada e não apagada**, porque um leitor que a leu precisa
> saber o que leu; ela **não é regerada** do banco e não deve ser lida como estado atual.


**18 das 35 Regiões Administrativas têm zero leitos SUS de internação**, entre elas o Guará
(127.952 habitantes), o Recanto das Emas (105.862), Vicente Pires (105.062) e o
Sol Nascente/Pôr do Sol (108.713).

**Zero leitos numa RA não significa que sua população esteja sem atendimento.** Ninguém é internado
por endereço: a rede é regional, e é por isso que a tabela por região de saúde é a unidade que
significa alguma coisa e a tabela por RA é uma medida de **onde os leitos estão**, não de quem é
atendido. As duas estão publicadas porque o critério de aceitação pede as duas.

| RA | População | Existente SUS<br>(`existente_sus_escopo`) | Necessário (2,5–3/1.000) | Déficit | Desvio PDAD/Censo |
|---|---:|---:|---:|---:|---:|
| Samambaia | 227.118 | 132 | 568 – 681 | +436 a +549 | +3,8 % |
| Águas Claras | 141.872 | 8 | 355 – 426 | +347 a +418 | +10,4 % |
| Guará | 127.952 | **0** | 320 – 384 | +320 a +384 | +6,1 % |
| Sol Nascente/Pôr do Sol | 108.713 | **0** | 272 – 326 | +272 a +326 | +6,7 % |
| Recanto das Emas | 105.862 | **0** | 265 – 318 | +265 a +318 | **−8,4 %** |
| Vicente Pires | 105.062 | **0** | 263 – 315 | +263 a +315 | +8,5 % |
| Ceilândia | 287.113 | 550 | 718 – 861 | +168 a +311 | 0,0 % |

A última coluna é o desvio entre a população PDAD daquela RA e a do Censo 2022, e está ali porque
**o desvio agregado do DF (~1,6 %) não limita o de cada RA** — chega a **−32,3 % em Planaltina**
(Arapoanga foi desdobrada dela depois do Censo, então as duas colunas não medem o mesmo
território) e a **−24,7 % em Brazlândia** (exclusão da população rural).
Quem lê uma linha lê o custo dela, não uma média do Distrito Federal.

### As 35 RAs, leitos gerais

A tabela acima é um recorte das sete maiores diferenças. Esta é completa para o parâmetro de
leitos gerais. **As 385 linhas da tabela por RA — 35 × 11, com todos os parâmetros — estão em
`dimensionamento_ra` e em `dados/processed/dimensionamento_ra.json`**; renderizá-las aqui seria
transcrever um banco.

| RA | População PDAD | Existente SUS | Necessário (2,5–3/1.000) | Déficit | % | Desvio PDAD/Censo |
|---|---:|---:|---:|---:|---:|---:|
| Samambaia | 227.118 | 132 | 568 – 681 | +436 a +549 | +76,8 % a +80,6 % | +3,8 % |
| Águas Claras | 141.872 | 8 | 355 – 426 | +347 a +418 | +97,7 % a +98,1 % | +10,4 % |
| Guará | 127.952 | 0 | 320 – 384 | +320 a +384 | +100,0 % a +100,0 % | +6,1 % |
| Sol Nascente/Pôr do Sol | 108.713 | 0 | 272 – 326 | +272 a +326 | +100,0 % a +100,0 % | +6,7 % |
| Recanto das Emas | 105.862 | 0 | 265 – 318 | +265 a +318 | +100,0 % a +100,0 % | -8,4 % |
| Vicente Pires | 105.062 | 0 | 263 – 315 | +263 a +315 | +100,0 % a +100,0 % | +8,5 % |
| Ceilândia | 287.113 | 550 | 718 – 861 | +168 a +311 | +23,4 % a +36,1 % | +0,0 % |
| São Sebastião | 99.050 | 4 | 248 – 297 | +244 a +293 | +98,4 % a +98,7 % | +0,4 % |
| Sobradinho II | 79.932 | 0 | 200 – 240 | +200 a +240 | +100,0 % a +100,0 % | -3,4 % |
| Planaltina | 121.856 | 132 | 305 – 366 | +173 a +234 | +56,7 % a +63,9 % | -32,3 % |
| Jardim Botânico | 75.133 | 12 | 188 – 225 | +176 a +213 | +93,6 % a +94,7 % | -3,4 % |
| Riacho Fundo II | 70.180 | 0 | 175 – 211 | +175 a +211 | +100,0 % a +100,0 % | +6,9 % |
| Itapoã | 67.021 | 0 | 168 – 201 | +168 a +201 | +100,0 % a +100,0 % | +2,5 % |
| Arapoanga | 49.067 | 0 | 123 – 147 | +123 a +147 | +100,0 % a +100,0 % | — |
| Sudoeste/Octogonal | 46.004 | 0 | 115 – 138 | +115 a +138 | +100,0 % a +100,0 % | +3,7 % |
| Arniqueira | 44.774 | 0 | 112 – 134 | +112 a +134 | +100,0 % a +100,0 % | +5,8 % |
| Lago Norte | 43.817 | 2 | 110 – 131 | +108 a +129 | +98,2 % a +98,5 % | +4,9 % |
| Riacho Fundo | 41.040 | 0 | 103 – 123 | +103 a +123 | +100,0 % a +100,0 % | +3,8 % |
| SCIA | 38.047 | 0 | 95 – 114 | +95 a +114 | +100,0 % a +100,0 % | +5,6 % |
| Taguatinga | 201.332 | 512 | 503 – 604 | -9 a +92 | -1,8 % a +15,2 % | +4,1 % |
| Núcleo Bandeirante | 22.566 | 0 | 56 – 68 | +56 a +68 | +100,0 % a +100,0 % | +4,3 % |
| Park Way | 22.667 | 0 | 57 – 68 | +57 a +68 | +100,0 % a +100,0 % | +1,7 % |
| Candangolândia | 14.540 | 0 | 36 – 44 | +36 a +44 | +100,0 % a +100,0 % | +3,6 % |
| Brazlândia | 41.859 | 84 | 105 – 126 | +21 a +42 | +20,0 % a +33,3 % | -24,7 % |
| Lago Sul | 27.213 | 43 | 68 – 82 | +25 a +39 | +36,8 % a +47,6 % | +3,7 % |
| Água Quente | 11.306 | 0 | 28 – 34 | +28 a +34 | +100,0 % a +100,0 % | — |
| Fercal | 9.141 | 0 | 23 – 27 | +23 a +27 | +100,0 % a +100,0 % | -11,0 % |
| Varjão | 9.017 | 0 | 23 – 27 | +23 a +27 | +100,0 % a +100,0 % | +4,7 % |
| Gama | 133.948 | 419 | 335 – 402 | -84 a -17 | -25,1 % a -4,2 % | -4,0 % |
| Sobradinho | 70.608 | 233 | 177 – 212 | -56 a -21 | -31,6 % a -9,9 % | -2,3 % |
| SIA | 5.630 | 60 | 14 – 17 | -46 a -43 | -328,6 % a -252,9 % | +9,7 % |
| Paranoá | 55.551 | 219 | 139 – 167 | -80 a -52 | -57,6 % a -31,1 % | -13,1 % |
| Cruzeiro | 26.435 | 142 | 66 – 79 | -76 a -63 | -115,2 % a -79,7 % | +2,7 % |
| Santa Maria | 121.635 | 442 | 304 – 365 | -138 a -77 | -45,4 % a -21,1 % | +4,3 % |
| Plano Piloto | 207.996 | 1.874 | 520 – 624 | -1.354 a -1.250 | -260,4 % a -200,3 % | +4,7 % |

## UTI — o único parâmetro de UTI que este projeto consegue citar

4 % a 10 % **do total de leitos hospitalares SUS**, contra **todos os leitos de UTI** (adulto +
pediátrica + neonatal), que é o que a linha transcrita diz.

| Região | UTI SUS, todas<br>(`existente_sus_escopo`) | Necessário (4–10 %) | Déficit | Situação |
|---|---:|---:|---:|---|
| Central | 440 | 101 – 252 | −339 a −188 | excedente nas duas pontas |
| Sul | 110 | 40 – 99 | −70 a −11 | excedente nas duas pontas |
| Sudoeste | 45 | 28 – 70 | −17 a +25 | **a faixa atravessa o zero** |
| Oeste | 38 | 28 – 69 | −10 a +31 | **a faixa atravessa o zero** |
| Centro-Sul | 13 | 3 – 7 | −10 a −6 | excedente nas duas pontas |
| Leste | 10 | 10 – 26 | 0 a +16 | déficit até 16 |
| Norte | 6 | 15 – 38 | +9 a +32 | **déficit nas duas pontas** |
| **DF** | **662** | **224 – 561** | **−438 a −101** | **excedente nas duas pontas** |

**No DF há excedente de UTI nas duas pontas do parâmetro**: entre 101 e 438 leitos acima do que ele
pede, ou 11,8 % dos 5.612 leitos hospitalares SUS contra uma faixa que vai até 10 %. Isso confirma a
direção que a suposição 8 do BRIEF anunciou antes da execução, e não a magnitude: a suposição
comparava 662 leitos contra `0,15 × 3.130.014 = 470` — mas o 0,15 é um parâmetro de **UTI adulto**,
e é **UNSOURCED de todo modo**, então essa conta não é publicada como resultado.

**Um excedente de UTI ao lado de um déficit de enfermaria não é uma contradição, e este documento
não a resolve.** É o que os dois parâmetros dizem sobre os mesmos dados, e a leitura clínica disso
está fora do escopo do `OS-011`.

> **A frase que esta substitui, citada e não apagada:** *"Um excedente de UTI ao lado de um déficit
> de enfermaria de 2.285 a 3.715 leitos não é uma contradição…"*. Aquele déficit era o da Portaria
> 1.101/2002 e **não existe mais**: desde 2026-09-06 a linha de enfermaria é calculada pela Equação
> 1 do Caderno de 2017 e o agregado do DF é um **superávit de 579 a 711 leitos**, com déficit em
> cinco das sete regiões somando **796 a 895** ([dossiê](../dossie.md) §1.2–1.4, §5.1). **A oposição
> retórica de que a frase original vivia — UTI sobrando, enfermaria faltando — não se sustenta no
> agregado distrital**, e sobrevive apenas por região. A tabela de UTI acima **não mudou**: ela é a
> proporção de 4 % a 10 % da 1.101/2002, o último parâmetro transcrito deste projeto
> ([issue #77](https://github.com/maximusminus/saudedf/issues/77)).

## O que ficou de fora

- **UTI pediátrica (134 leitos SUS)** entra no total de UTI acima e **não tem parâmetro próprio**
  que este projeto consiga citar. **UTI neonatal (86)** tem — é a única que tem — mas só no DF.
- **UCI neonatal (3 por 1.000 nascidos vivos) e leito canguru (1 por 1.000)** foram extraídos do
  mesmo Quadro 5 e estão em `parametros_caderno_2017`, e **não são calculados**: os dois cairiam
  dentro de *cuidados intermediários e isolamento*, que também contém UCI adulto, UCI pediátrica,
  isolamento e suporte ventilatório. Calcular exigiria partir essa categoria em duas novas, o que é
  uma mudança de forma da tabela e não uma correção. Está registrado como pendência.
- **Duas revisões independentes acharam parâmetros dentro de um arquivo que este trabalho já tinha
  baixado.** É o mesmo padrão as duas vezes, e é exatamente o que o `OS-008` mediu. O que se
  aprende disso não é "faltou uma fonte": é que *ler o que já está em `dados/raw/`* é mais barato e
  mais produtivo do que procurar fora, e este projeto não estava fazendo isso.
- **Cuidados intermediários e isolamento (82 leitos SUS)** — UCI adulto, pediátrica e neonatal,
  isolamento e suporte ventilatório. Existem como categoria para que nenhum leito complementar
  desapareça entre as bordas de outra.
- **Hemodiálise** — UNSOURCED, e o motivo mudou. **O parâmetro existe e é extraível**: o
  **Quadro 28B** do mesmo Caderno de 2017, em `dados/raw/`, dá **0,13 % da população de 20 anos e
  mais** do Centro-Oeste em estágio 5 dialítico (o Quadro 28A dá 0,16 % para o estágio 5 inteiro).
  O que falta é o **denominador** — este projeto não tem população por faixa etária por RA — e a
  conversão de pacientes em máquinas, que é outro parâmetro. Foi a terceira revisão independente
  que encontrou o quadro, no mesmo arquivo onde a segunda encontrou o Quadro 5.
- **Leitos não-SUS** — o DF tem **7.887** leitos de internação existentes e **2.631**
  complementares. Destes, 4.868 e 744 são SUS e estão contados acima; os **3.019** de internação e
  **1.887** complementares restantes não entram, por decisão do operador de dimensionar
  exclusivamente o SUS. **O SUS é 62 % dos leitos de internação do DF e 28 % dos complementares.**
