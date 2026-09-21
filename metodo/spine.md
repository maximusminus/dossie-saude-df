---
layout: default
title: "Método: como cada fonte é buscada, e onde isso falha"
---
# Método: a espinha RA → região de saúde, e como cada linha chegou lá

**O que é isto.** A chave de junção sobre a qual repousa toda figura por região
deste projeto: cada uma das **35 Regiões Administrativas** do DF colocada em uma
das suas **sete Regiões de Saúde**, com a população presa à mesma chave, e cada
estabelecimento do CNES colocado numa RA — ou marcado `UNASSIGNED` com o motivo.

**As tabelas.** `ras_regioes` (35 linhas: RA, região, macrorregião, população,
indicação de geometria, citação por linha), `estabelecimento_ra` (12.473 linhas:
estabelecimento → RA, com o método que o colocou), `ras_ibge` (a chave),
`cnes_ra_lookup`, `leitos_por_estabelecimento`.

---

## O resultado

| | |
|---|---|
| Estabelecimentos ativos colocados | **5.475 de 5.495 — 99,6 %** |
| Estabelecimentos ativos **com leito** colocados | **110 de 110 — 100 %** |
| Leitos colocados numa RA | **10.518 de 10.518 — nenhum órfão** |
| Colocações em que um segundo sinal publicado discordou | **433**, registradas em `conflito` |
| RAs com região de saúde | 35 de 35 |
| RAs com população | 33 de 35 |
| RAs com geometria do IBGE | 33 de 35 |

## O que a junção diz

População do Censo 2022 do IBGE / IPEDF; leitos do CNES `202607`, apenas
estabelecimentos ativos.

| Região de Saúde | População | Estab. | c/ leito | Leitos | SUS | **Leitos/1.000 hab** |
|---|---:|---:|---:|---:|---:|---:|
| Central | 336.024 | 2.965 | 67 | 5.434 | 2.520 | **16,17** |
| Sul | 256.089 | 262 | 4 | 1.230 | 992 | **4,80** |
| Norte | 345.286 | 238 | 5 | 776 | 375 | **2,25** |
| Oeste | 444.450 | 267 | 7 | 929 | 692 | **2,09** |
| Sudoeste | 795.434 | 1.286 | 20 | 1.515 | 698 | **1,90** |
| Leste | 305.710 | 173 | 5 | 331 | 262 | **1,08** |
| Centro-Sul | 324.989 | 284 | 2 | 303 | 73 | **0,93** |

**A Central concentra 12 % da população e 52 % dos leitos.** A distância entre a
região de saúde mais bem servida e a pior servida é de **dezessete vezes**. Esta
nota afirma isso como aritmética sobre duas quantidades com fonte e para por aí —
o que isso significa para o acesso, e o que qualquer um desses números deveria
ser, é assunto da análise, não desta nota.

---

## A única coisa que teria quebrado todas as figuras acima

**O CNES nunca remove um estabelecimento fechado, e mais da metade das linhas do
DF está fechada.** O cadastro traz 12.473 linhas do DF; **6.978 delas carregam um
motivo de desabilitação**. O TABNET conta apenas as outras, o que a sua própria
nota de rodapé diz sem meias palavras: *"os dados … referem-se aos registros
constantes no Banco de Dados Nacional do CNES com status ATIVO."*

Isso foi descoberto por recusa a aceitar um número que não fechava. A tabela de
leitos por estabelecimento somava **12.719**; as duas tabelas de leitos do TABNET
somavam **10.518**. Filtrando para estabelecimentos sem motivo de desabilitação:

```
estabelecimentos ativos       : 10.518 leitos   ← exatamente os 7.887 + 2.631 do TABNET
estabelecimentos desabilitados:  2.201 leitos
```

Uma reconciliação exata, até o leito. Toda contagem deste documento é, portanto,
sobre estabelecimentos **ativos**, e `estabelecimento_ra.ativo` carrega o
indicador para que nenhuma consulta posterior precise se lembrar disso. **Uma
contagem de estabelecimentos por região que ignore esse filtro dá aproximadamente
o dobro do que deveria.**

---

## A escada: como cada estabelecimento foi colocado

Os sinais são tentados em ordem decrescente de quanto a *própria fonte* afirma, e
`estabelecimento_ra.metodo` registra qual degrau respondeu. Essa coluna é o ponto
central — um estabelecimento colocado por um código que o CNES publicou é um fato
de natureza diferente de um colocado por comparação de texto, e quem lê precisa
poder distinguir os dois sem perguntar.

| Degrau | Sinal | Estabelecimentos ativos colocados |
|---|---|---:|
| 1 | Coordenada dentro de um polígono de RA do Censo 2022 do IBGE | **5.413** |
| 2 | `CO_DISTRITO_SANITARIO`, resolvido contra a própria tabela de lugares do CNES para o DF | 39 |
| 3 | `CO_MUNICIPIO_GESTOR`, onde ele é um pseudo-município herdado de uma RA | 0 (todas essas linhas estão desabilitadas) |
| 4 | `NO_BAIRRO` exatamente igual a um nome de RA, ignorando acentos | 10 |
| 5 | `NO_BAIRRO` igual a um lugar que **o próprio CNES lista** para o DF | 13 |
| — | `UNASSIGNED` | 20 |

### Por que a coordenada vale mais que o distrito sanitário

A pergunta que esta tabela responde é **onde o estabelecimento está**. Uma
coordenada responde a isso; `CO_DISTRITO_SANITARIO` é uma atribuição de *gestão*
da SES-DF, que é outra pergunta — normalmente com a mesma resposta, às vezes não.
**Os dois discordam em 433 estabelecimentos ativos, dez deles com leitos.**

Não é uma preocupação teórica. `CO_DISTRITO_SANITARIO = 0010` resolve, pela tabela
de lugares do CNES, para `530010 BRASILIA` — que é o único **município** do DF
segundo o IBGE, ou seja, *o Distrito Federal inteiro*, não o Plano Piloto. Ler
isso como uma RA colocava 590 estabelecimentos na Central por um código que não
carrega RA nenhuma, entre eles **o `0010545` HRBZ, o Hospital Regional de
Brazlândia** e seus 90 leitos. Hoje esse nome não resolve para nada, e a escada
passa para a coordenada — que põe o HRBZ dentro do polígono de Brazlândia do
IBGE, no Oeste, onde ele está.

**Todo degrau é avaliado, não apenas o primeiro que responde.** Onde um degrau
inferior chega a uma RA diferente, `estabelecimento_ra.conflito` registra o fato
(`distrito_sanitario=53001080508`, e assim por diante). Uma colocação sobre a qual
dois sinais publicados discordam continua sendo uma colocação, mas uma tabela que
esconde a discordância a apresenta como resolvida quando ela não está.

**Nada foi colocado pelo conhecimento do autor sobre Brasília.** O degrau 5
resolve `ASA SUL` porque o CNES publica `530015 BRASILIA - ASA SUL` como lugar do
DF — não porque alguém aqui saiba onde fica a Asa Sul. Nenhum bairro inventado por
este projeto ganha um degrau, e os três nomes que o CNES lista e que não designam
uma RA (`DRAC/CGSOS` e `SAS`, unidades administrativas da SES-DF; `BRASILIA`, o
município) são declarados como tais e não resolvem para nada.

### Coordenadas: por que quatro casas decimais

**1.274 estabelecimentos do DF compartilham exatamente a coordenada `-15.78,
-47.93`.** É um valor de preenchimento do CNES, e ele cai no Cruzeiro — de modo
que um estabelecimento no Lago Sul ou em Sobradinho que o carregasse seria
colocado com confiança na RA errada. Duas casas decimais equivalem a cerca de um
quilômetro, o que no DF atravessa fronteiras. **Coordenadas com menos de quatro
casas em qualquer dos eixos são recusadas**, e a linha diz isso em `observacao`,
em vez de aceitar uma localização que a fonte não conhece de fato.

### O teste de ponto-em-polígono não depende de nada

O arquivo `DF_subdistritos_CD2022.gpkg` do IBGE é um **GeoPackage, que é um
arquivo SQLite**, então ele é lido com a biblioteca padrão a que este projeto já
se limita. A geometria é WKB da OGC atrás de um cabeçalho de 40 bytes; a
verificação de contenção é lançamento de raio par-ímpar, usando as caixas
delimitadoras do próprio arquivo como descarte barato antes. **Nenhum serviço de
geocodificação foi adotado.**

---

## As seis listas, reconciliadas

Seis fontes nomeiam as Regiões Administrativas do DF e **quatro delas discordam
sobre quantas são**. A lista codificada de 35 do IBGE é a chave; toda outra lista
se junta a ela, e cada diferença é nomeada abaixo, em vez de normalizada.

| Lista | Contagem | Diferença contra a chave do IBGE |
|---|---:|---|
| **API de localidades do IBGE** | **35** | — *a chave* |
| PDS 2024–2027 p. 36 | 35 | Os mesmos 35 lugares, dois grafados de outro jeito: `Arniqueiras` (IBGE: `Arniqueira`) e `Estrutural/SCIA` (IBGE: `SCIA`). Ambos são junções declaradas, não normalização de texto |
| `pdad_ipe_df.html` | 35 | Declara 35 em prosa; consistente |
| `tbMunicipio` do CNES | 34 | Resolve para **30** das 35 RAs. Ver abaixo |
| Geometria do IBGE (Censo 2022) | 33 | **Arapoanga** e **Água Quente** não têm polígono — criadas depois da malha de 2022, ficam dentro de Planaltina e do Recanto das Emas |
| `pdad_censo.json` | 33 | **Arapoanga** e **Água Quente** não têm linha de população — as mesmas duas, pelo mesmo motivo |

**Os 34 do CNES, em detalhe.** Dois dos seus nomes são o Plano Piloto sob outros
nomes (`BRASILIA - ASA NORTE`, `BRASILIA - ASA SUL`); `SCIA-ESTRUTURAL` é o
`SCIA` e `SETOR DE INDUSTRIA E ABASTECIMENTO` é o `SIA`. Três não designam RA
nenhuma: `DRAC/CGSOS` e `SAS` são unidades administrativas da SES-DF, e
**`BRASILIA` é o município do DF segundo o IBGE** — o Distrito Federal inteiro.
Depois dessas disposições, o CNES cobre **30 das 35 RAs**; ele não tem código para
`Sol Nascente/Pôr do Sol`, `Arniqueira`, `Fercal`, `Arapoanga` ou `Água Quente`.

**Arapoanga e Água Quente são as mesmas duas RAs em toda lacuna.** São criações
recentes, não têm geometria, não têm linha de população nem código do CNES, e só
têm região de saúde porque o PDS as nomeia. Qualquer coisa calculada por RA é
silenciosa sobre elas, e isso é uma propriedade das fontes, não deste
processamento.

---

## Casos conhecidos de falha

1. **20 estabelecimentos ativos estão `UNASSIGNED`** — sem coordenada utilizável,
   sem distrito sanitário e com um texto de bairro que não corresponde a nada que
   o CNES ou o IBGE publiquem. **Nenhum deles tem leito**, então nenhuma figura de
   leitos é afetada. Os motivos estão em `estabelecimento_ra.observacao`. À parte,
   **seis estabelecimentos desabilitados com 326 leitos também estão
   `UNASSIGNED`** — eles são excluídos de toda figura aqui pelo filtro de ativos, e
   são nomeados para que a exclusão fique visível em vez de suposta.
2. **Todo degrau é separável.** `metodo` é uma coluna, então qualquer degrau pode
   ser excluído de uma consulta sem refazer nada — `WHERE metodo <>
   'bairro_lugar_cnes'` descarta as 13 colocações mais fracas, `WHERE conflito =
   ''` descarta as 433 em que dois sinais discordaram.
3. **Seis linhas de composição se apoiam num documento de planejamento, não num
   decreto**, e `ras_regioes.base_citacao` diz de que tipo é cada uma — ver *A
   cadeia normativa*, abaixo. As outras 29 citam o Decreto 37.515/2016 Art. 3, e o
   citam porque o texto do decreto foi transcrito e comparado linha a linha, não
   porque uma constante tenha sido colada em todas as linhas.
4. **O CEP não foi usado.** Nenhuma correspondência CEP → RA publicada pôde ser
   obtida, então esse caminho não existe aqui. Ele ajudaria sobretudo os
   estabelecimentos desabilitados.
5. **População e leitos vêm de anos diferentes.** A população é do Censo 2022; os
   leitos são do CNES `202607`. Os dois estão nomeados na linha. Há ainda outras
   figuras de população do DF entre as quais escolher — 2.807.982 aqui, 2,99
   milhões nos documentos de análise, 3.130.014 no próprio PDS.
6. **As figuras de população não têm artefato por trás, e a espinha diz isso.** Os
   33 números vêm de um arquivo que um script anterior produziu a partir de um
   **valor fixo escrito no próprio código** — sem URL, sem referência de página,
   sem nada nos dados brutos. `ras_regioes.populacao_procedencia` carrega essa
   frase em todas as linhas, em vez de deixar que o rótulo "IBGE Censo 2022 /
   IPEDF" sugira mais do que este projeto consegue mostrar. O total de 2.807.982 é
   a soma que este projeto fez dessas 33 linhas, não uma figura publicada.
7. **Uma colocação por coordenada não enxerga Arapoanga nem Água Quente.** A malha
   do Censo 2022 é anterior às duas, então o terreno delas ainda pertence à RA que
   o cobria em 2022 e um ponto dentro delas resolve para essa RA sem erro nenhum.
   Toda linha colocada por coordenada carrega essa ressalva em `observacao`; qual
   RA absorve qual não é afirmado, porque nenhuma fonte consultada aqui o declara.

---

## A cadeia normativa, porque os nomes mudaram

- **Decreto nº 37.057/2016** cria as Regiões de Saúde.
- **Decreto nº 37.515/2016, Art. 3** enumera as sete com suas RAs membros. O
  inciso VII é a **`Região Centro-Norte`** — a palavra "Central" não aparece nele.
- **Decreto nº 38.982/2018, Art. 10, I**: *"a Superintendência da Região de Saúde
  Centro-Norte passa a denominar-se Superintendência da Região de Saúde Central"*.
- **PDS 2024–2027 p. 36** (SES-DF, 2023) declara a composição atual, citando o
  37.515/2016 *"e alterações posteriores"*. O CNES codifica a região como
  `53006 Central`.

**A `Proposta de elaboração.pdf` diz Centro-Norte, e não está errada — está
desatualizada.** Ela cita corretamente o decreto de 2016. A discordância foi
registrada antes; esta é a resolução dela, e a distinção importa: "o documento de
entrada está errado" e "o documento de entrada tem oito anos e aqui está o decreto
que o superou" são achados diferentes.

### A citação que cada linha merece

**As duas composições foram transcritas** — o Art. 3 do decreto e a página 36 do
PDS — e a citação de cada linha é derivada da comparação entre as duas. A citação
de uma linha é, portanto, uma comparação calculada, não uma constante colada em 35
linhas.

| `base_citacao` | Linhas | O que significa |
|---|---:|---|
| `decreto` | **29** | O decreto de 2016 põe esta RA nesta região. Citado ao Art. 3, com a renomeação de 2018 anotada onde se aplica |
| `pds_ra_nova` | 4 | A RA é posterior ao decreto, que não pode nomeá-la: `Sol Nascente/Pôr do Sol`, `Arniqueira`, `Arapoanga`, `Água Quente` |
| `pds_ra_transferida` | 1 | **`Lago Sul`.** O decreto o põe no **Centro-Sul**; o PDS o põe na **Central**. Nenhuma norma que faça essa transferência foi encontrada |
| `pds_ra_unificada` | 1 | **`Plano Piloto`.** Em 2016 eram duas RAs em duas regiões diferentes — Asa Norte no Centro-Norte, Asa Sul no Centro-Sul. O IBGE hoje traz uma RA só, então a região dela não pode ser lida do decreto |

**As duas últimas linhas são as interessantes**, e estavam invisíveis até que o
texto do próprio decreto fosse lido: a composição não apenas ganhou RAs entre 2016
e 2023, ela moveu território entre regiões. Que norma fez isso não foi localizado,
e as duas linhas dizem isso nos dados.
