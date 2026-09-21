---
layout: default
title: "Método: o que a procedência prova, e o que ela não alcança"
---
# Método: o que a procedência prova, e o que ela não alcança

Este documento explica **por que a auditoria de procedência é feita do jeito que
é feita**. Ele não traz contagens: números envelhecem a cada apuração, e o
raciocínio abaixo não muda. As contagens de cada execução estão no anexo de
procedência, refeito toda vez que os dados são reprocessados.

A separação é deliberada. Um único arquivo que misturasse as duas coisas ficaria
desatualizado no dia seguinte — foi o que aconteceu com a versão anterior desta
nota, mantida à mão.

## O denominador é do documento, nunca do conferidor

**A conta tem de ser a do dossiê, e não a lista de tarefas de quem confere.** Um
rascunho antigo da auditoria informava "46 de 46 (100 %)" contra um denominador
que era simplesmente aquilo que a verificação já enumerava — de modo que uma
afirmação que ninguém tivesse chegado a cadastrar jamais podia baixar a nota. O
número media o esforço do auditor, não a honestidade do documento. **Uma razão
cujo denominador é a própria lista de quem audita não mede nada.**

A correção, inalterada desde então, é um denominador montado em duas metades que
leem o DOCUMENTO em vez de lerem o conferidor:

| Metade | Como o denominador é fixado |
|---|---|
| Afirmações em prosa | Enumeradas à mão — um número dentro de uma frase não tem forma legível por máquina, então esta metade é uma lista, varrida contra cada número que aparece nas linhas de prosa do dossiê |
| Células de tabela | **Lidas do próprio dossiê.** Cada célula de cada tabela quantitativa é refeita a partir do banco de dados e comparada com a tabela extraída do documento. Acrescentar uma coluna ou uma linha a uma tabela publicada passa a conferi-la automaticamente; remover uma falha como linha ausente |

**É a metade das tabelas que torna a afirmação falseável.** O cabeçalho, a
quantidade de linhas e cada célula são afirmações separadas: uma tabela que ganha
uma coluna, perde uma linha ou é reordenada em relação à consulta que a produz
falha pelo nome, em vez de passar em silêncio.

O denominador do anexo de procedência é exatamente o mesmo conjunto que a
verificação usa para interromper o processamento — nunca uma segunda lista,
mantida à parte, correndo ao lado. Essa igualdade é conferida a cada execução: o
anexo não consegue subnotificar sem que a verificação também se cale.

## O que fica deliberadamente fora do denominador

- **Células cujo conteúdo é uma frase, não um número** — uma justificativa
  declarada (`não publicados em forma legível por máquina`) não é um número a
  reconferir, e é nomeada como lacuna em vez de contada como acerto.
- **Identificadores que parecem números**: números de portaria, códigos de
  tabelas do IBGE, números de contrato, números de lei, códigos de resposta HTTP
  citados em prosa. São rótulos, não medições.
- **Juízo em prosa**, que conferência nenhuma alcança — ver *O que este método
  não confere*, abaixo.

## Por que isto é diferente de uma auditoria por busca

A auditoria que este método substituiu — feita sobre os cinco PDFs que o dossiê
veio substituir — media documentos antigos **procurando** cada número dentro dos
dados e inspecionando cada ocorrência à mão, porque uma coincidência de texto não
é procedência. Aquela auditoria encontrou 57 % de "acerto", que caiu para 5 %
quando cada ocorrência foi lida no contexto: um número que casava com uma
coordenada de folha de estilo, outro que casava com uma linha sem relação num
orçamento de medicamentos.

**Este método não consegue produzir essa falha, porque ele não procura.** Cada
afirmação está atrelada à consulta que a calcula — uma afirmação não é "um número
que aparece em algum lugar dos dados", é uma expressão nomeada sobre uma tabela
nomeada. Coincidência não está disponível como resposta.

**Mas ele consegue produzir outra falha, e produziu.** A fraqueza do método
anterior era um denominador generoso demais — uma coincidência de texto contada
como procedência. A fraqueza deste é um denominador estreito demais — conferir
apenas o que o conferidor por acaso contém. Os dois informam um número que não é
sobre o documento. A correção é a metade das tabelas, acima.

**Verificado nos dois sentidos.** A conferência confirma cada afirmação contra o
banco de dados atual; e, com uma célula publicada alterada de propósito, a
execução para e nomeia a afirmação por tabela, linha e coluna, mostrando o valor
calculado ao lado do publicado. Uma conferência que não pode falhar não prova
nada, então ela foi feita falhar uma vez, de propósito, e continua testável assim.

**E ela já apanhou mudanças que ninguém plantou.** Acrescentar uma linha de
cobertura que move uma contagem declarada em prosa — uma frase do tipo "N
necessidades declaradas" — faz a execução falhar até a frase ser corrigida, não
porque alguém lembrou que a frase existia, mas porque a conferência exigiu. É o
mecanismo funcionando sobre uma mudança para a qual não foi escrito, que é o
único tipo de evidência que vale para ele.

## O que "100 %" quer dizer, e o que não quer

**Quer dizer:** nenhum número do dossiê veio do conhecimento do autor, do dossiê
do adversário ou da prosa da proposta que encomendou o trabalho. Cada um deles é
aritmética sobre uma tabela construída a partir de uma fonte pública buscada.

**Não quer dizer que o dossiê esteja completo**, e o próprio documento diz isso no
seu texto, na tabela de cobertura e na visão de lacunas do painel — uma lacuna
declarada é um achado, nunca preenchida por estimativa.

## Método, para que possa ser repetido

1. Cada afirmação quantitativa da **prosa** do dossiê é cadastrada como um trio:
   rótulo, valor calculado, valor publicado.
2. Cada **tabela** quantitativa do dossiê é refeita a partir do banco de dados —
   linhas, ordem, formatação e tudo — e comparada célula a célula com a tabela
   extraída do documento. Ninguém enumera essas células à mão; o documento as
   fornece.
3. As duas metades rodam contra o banco que aquela mesma execução acabou de
   construir, e a mesma conta que interrompe o processamento alimenta o anexo.
4. O processamento imprime a contagem, imprime cada divergência com os dois
   valores e **para** se alguma afirmação divergir. Ele também se recusa a
   regerar o PDF do dossiê e a deixar passar despercebido um anexo desatualizado.
5. As contagens do anexo de procedência são a saída daquela execução, geradas
   junto com ela, nunca uma transcrição feita à mão.

**O que este método não confere: prosa.** Ele confirma que uma divisão arredonda
como a frase diz que arredonda; não confirma que a frase seja uma maneira justa de
descrever o que a divisão significa. O juízo fica com quem lê, e essa fronteira é
deliberada.
