---
layout: default
title: "Anexo: lacunas declaradas"
---
<!-- ANEXO GERADO -- NÃO EDITAR À MÃO.
     Comando: `scripts_extracao/anexos.py (gerar_lacunas)`.
     Fingerprint do corpo (sha256[:16]): 388a04a1f2be2194.
     Uma cópia commitada que diverge de uma geração nova a partir do
     mesmo banco FALHA o gate (`scripts_extracao/run.py`, OS-070 Q3). -->

# Anexo: lista de lacunas

Gerado a cada execução a partir de TRÊS fontes -- `eixos_cobertura`,
`cobertura_sondas` e a linha `interface='lai'` que esta última carrega --
de-duplicadas por necessidade: uma lacuna registrada em mais de uma fonte
aparece aqui exatamente uma vez, e uma registrada em qualquer uma delas
nunca fica de fora (OS-070 criterion d). A data de medição é a primeira
data ISO citada no motivo/detalhe da própria linha; uma linha cujo motivo
não cita nenhuma não tem uma inventada -- o gap é declarado, não
preenchido.

**12 lacunas, por bloco.**

## Bloco 1 — Indicadores de saúde

| Necessidade | Estado | Motivo | Medido em |
|---|---|---|---|
| População residente estimada por faixa etária, DF (IBGE SIDRA, tabela 6579) | pending | Escopo de apisidra.ibge.gov.br alargado em 2026-09-08 (OS-057), mesma concessão da esperança de vida acima. Nenhuma consulta foi feita. CORRIGIDO em OS-060: a BRIEF aprovada de OS-060 (Bloco 1) NÃO lista esta tabela entre as seis que declara -- só sim_obitos, sinasc_serie, mortalidade_infantil, mortalidade_materna, cobertura_vacinal e esperanca_vida. Esta linha atribuía a aquisição a OS-060 antes de a BRIEF existir; permanece pending para uma OS futura, e não é adquirida aqui -- "no scope beyond it" é a instrução desta sessão. | 2026-09-08 |

## Bloco 3 — Leitos e hospitais regionais

| Necessidade | Estado | Motivo | Medido em |
|---|---|---|---|
| Anexo da Portaria GM/MS 1.101/2002 (parâmetros de leito) | blocked | bvsms.saude.gov.br RESOLVE, completa TCP e completa TLS 1.3 com certificado válido -- e então fecha a conexão sem enviar um byte, em todo caminho testado, inclusive /. Nove tentativas em 2026-08-28, zero bytes nas nove. NÃO é falha de rede, e alcance_hosts mede a camada a cada execução em vez de afirmá-la: a recusa está acima de TLS. O que a identifica é a própria página do controle, capturada em dados/raw/bvsms_f5_block.html (a requisição exata que a produziu está transcrita em dados/raw/bvsms_f5_block.README.md, e nenhuma delas foi moldada para passar pelo controle) -- 'The requested URL was rejected. Please consult with your administrator' com support ID, que é a página de bloqueio do F5 BigIP ASM; a porta 80 do mesmo host responde 302 assinado 'Server: BigIP'. É um WAF, e um WAF não é contornado aqui (assunção 3 do BRIEF do OS-012). CONSEQUÊNCIA, declarada e não escondida: os dois parâmetros de leito continuam `transcrito` em docs/DIMENSIONAMENTO.md -- digitados à mão, com o texto da norma nunca lido por este repositório -- e todo déficit do Eixo 1 é aritmética contra eles. \|\| RE-MEDIDO POR NAVEGADOR EM 2026-09-20 (OS-058, route step R0.2): erro HTTP 0 -- navegação não produziu resposta -- Page.goto: net::ERR_CONNECTION_RESET at https://bvsms.saude.gov.br/. Ver navegador_sondas. | 2026-08-28 |
| Demanda reprimida (fila de regulação SES-DF) | sonda:lai/nao_publicado | OS-063: a fila de regulação por especialidade/região NÃO é publicada como figura -- só esta linha, com o número/data do protocolo LAI quando o operador o fornecer. Requerimento LAI ainda NÃO FOI PROTOCOLADO nesta sessão; nenhum número ou data existe para registrar | não registrada |
| Histórico de equipes CNES (ESF/ACS) por competência, DF | pending | Escopo de ftp.datasus.gov.br alargado em 2026-09-08 (OS-057) para a árvore histórica /dissemin/publicos/CNES/, DF apenas -- distinta da base CNES em bloco (cnes.datasus.gov.br) já registrada. Nenhum arquivo foi buscado. Aquisição é a rota R1.3 (Bloco 3), OS-063. | 2026-09-08 |

## Bloco 4 — Formação médica

| Necessidade | Estado | Motivo | Medido em |
|---|---|---|---|
| CFM, busca-medicos: contagem de médicos ativos no DF | blocked | portal.cfm.org.br/busca-medicos é a busca individual, paginada de 10 em 10, e está atrás de reCAPTCHA VALIDADO NO SERVIDOR a cada requisição -- inclusive a cada clique de paginação. Medido: o payload de /api_rest_php/api/v2/medicos/buscar_medicos carrega o campo `captcha`, o próprio JS da página chama grecaptcha.execute() antes de cada busca, e uma requisição sem token devolve "invalidinput" -- a string que o JS da página testa. Automatizar contra um controle anti-automação é recusado (assunção 3 do BRIEF do OS-012), exatamente como no CRM-DF. Além disso o que ele serve são pessoas nomeadas com CRM, e o Eixo 3 precisa de CONTAGEM, não de identidade: raspá-lo seria dado pessoal em massa sem ganho analítico. | não registrada |
| CRM-DF, série histórica de registros ativos | absent | crmdf.org.br responde 200 e o site é legível, mas a série histórica agregada não é publicada: o que existe é a busca individual por trás do reCAPTCHA, e automatizar contra um controle anti-automação é recusado (assunção 3 do BRIEF). O OS-025 mediu quais interfaces o host oferece: /robots.txt responde e NÃO anuncia sitemap; /wp-sitemap.xml devolve 404; /sitemap.xml responde 200 servindo o HTML do site em vez de um sitemap -- `catch-all`, não interface; a API REST devolve 401. Não há índice legível por máquina onde uma série agregada pudesse aparecer, e isso agora é contado a cada execução em vez de lido uma vez. \|\| MEDIDO EM 2026-09-20: 4 interfaces do próprio publicador sondadas (1 responderam, 3 não), 0 itens enumerados, 0 casam os termos da necessidade. Ver cobertura_sondas. | 2026-09-20 |
| Censo da educação superior INEP, série medicina DF | absent | download.inep.gov.br tem a cadeia TLS reparada por tls_aia.py, e ainda assim derruba a conexão (ConnectionResetError) -- medido por alcance_hosts, que desde o OS-019 registra a CAMADA: `http`, ou seja DNS, TCP e TLS completam e a recusa está acima deles. É o servidor recusando este cliente, não este ambiente falhando em alcançá-lo, e a frase anterior deixava isso ambíguo. O estado continua `absent` e não `blocked` porque nada aqui identifica um controle: não há página de bloqueio, não há 403, e um WAF não é inferido de um reset. Mesmo alcançável, os microdados são ZIPs anuais de centenas de MB cujo recorte 'medicina no DF' só existe depois de processá-los: é aquisição de porte próprio, e declará-la aqui sem executá-la seria a promessa que este quadro recusa. \|\| MEDIDO EM 2026-09-20: 2 interfaces do próprio publicador sondadas (1 responderam, 1 não), 0 itens enumerados, 0 casam os termos da necessidade. Ver cobertura_sondas. | 2026-09-20 |
| Cursos de medicina no DF com ano de autorização (e-MEC) | blocked | emec.mec.gov.br responde 403 a cliente não-navegador: o WAF exige comportamento de navegador real. Playwright NÃO está instalado neste host (ver o achado no registro do OS-012), e adotá-lo é decisão de dependência. Nada aqui tenta contornar o controle. \|\| RE-MEDIDO POR NAVEGADOR EM 2026-09-20 (OS-058, route step R0.2): blocked HTTP 403 -- HTTP 403 (navegador). Ver navegador_sondas. | 2026-09-20 |
| ESCS, egressos e retenção na rede pública | absent | O ápice escs.edu.br não tem registro A em DNS; www.escs.edu.br responde 200. A FRASE ANTERIOR DESTA LINHA -- 'o site é institucional e não publica série de egressos nem de retenção em forma legível por máquina' -- estava certa e não tinha sido CONTADA, e o OS-025 contou. O host serve uma API REST do WordPress ABERTA (/wp-json/wp/v2), que este projeto nunca havia consultado: é exatamente a forma de interface que o OS-020 encontrou no IGES-DF depois de esta mesma tabela ter registrado `absent` por ninguém ter procurado. Aqui ela foi consultada -- páginas e posts enumerados pela rota do próprio publicador, mais a rota /search perguntada diretamente por 'egressos' e 'retencao' -- e o que ela lista não inclui série alguma: os resultados são notícias sobre pessoas e sobre processos seletivos de residência. A ausência agora é medida por contagem, não por leitura, e a contagem é refeita a cada execução. \|\| MEDIDO EM 2026-09-20: 5 interfaces do próprio publicador sondadas (5 responderam, 0 não), 226 itens enumerados, 3 casam os termos da necessidade. Ver cobertura_sondas. | 2026-09-20 |

## Bloco 5 — Carreiras e remuneração

| Necessidade | Estado | Motivo | Medido em |
|---|---|---|---|
| Concursos e nomeações para carreiras de saúde, SES-DF (índice DODF) | pending | Nenhuma linha do registro de acesso nomeia um host de Diário Oficial do DF -- nem `dodf.df.gov.br` nem qualquer variante aparecem em CLAUDE.md, e o guia de entry points verificados também não cita um. O padrão que esta necessidade seguiria é o de hcb_contratos (índice: URL, título, data, número de DODF), mas esse padrão pressupõe um host que este projeto ainda não tem linha para alcançar. Por critério (h) desta BRIEF ("NO HOST IS REACHED WITHOUT ITS ROW... this OS does not widen it in flight"), a necessidade fica `pending` em vez de `absent`: `absent` exigiria uma sonda medida contra o próprio host, e sondar um host não registrado é exatamente o que deny-by-default proíbe. Alargar o registro de acesso é decisão do operador, para uma OS futura (OS-061). | não registrada |

## Bloco 6 — IGES-DF e HCB

| Necessidade | Estado | Motivo | Medido em |
|---|---|---|---|
| HCB, demonstrações contábeis | absent | O host é alcançável (ver a linha acima), e as demonstrações contábeis não estão publicadas em /transparencia/contratos/ nem em /transparencia/relatorios/. REVERIFICADO pelo OS-020 em 2026-08-28 por CONTAGEM, e a contagem foi refeita depois que uma revisão independente mostrou que a primeira era rasa: o índice responde 200 com 44 KB e 127 links, dos quais ZERO apontam para arquivo, e ele ENUMERA 23 páginas de detalhe sob caminho estável (/transparencia/relatorios/detalhe/...) -- todas as 23 foram buscadas, e somadas dão ZERO links para arquivo e ZERO ocorrências de 'demonstra', 'contábil', 'balanço', 'auditad', 'parecer' e 'ressalva'. A enumeração está em dados/raw/hcb_relatorios_enumeracao.json, página a página. Este host não é WordPress: /robots.txt, /wp-sitemap.xml e /sitemap.xml devolvem 404 e /wp-json devolve 200 servindo a home (um catch-all, não uma API) -- a frase anterior dizia que /wp-json devolvia 404, o que era simplesmente errado. /transparencia/ devolve 403 enquanto as subpáginas respondem 200. Ausência do publicador, não obstáculo de rede. \|\| MEDIDO EM 2026-09-20: 7 interfaces do próprio publicador sondadas (2 responderam, 5 não), 46 itens enumerados, 0 casam os termos da necessidade. Ver cobertura_sondas. | 2026-08-28 |

## Bloco 7 — Prometido, orçado e executado

| Necessidade | Estado | Motivo | Medido em |
|---|---|---|---|
| Plano de Governo 2018 e 2022, índice via TSE DivulgaCand | blocked | divulgacandcontas.tse.jus.br devolveu HTTP 403 -- corpo "Access Denied" de um nó Akamai (errors.edgesuite.net). O QUE ESTA FUNÇÃO RE-MEDE A CADA EXECUÇÃO É A RAIZ, e só ela: `promessas` sonda f"{TSE_HOST}/" e mais nada (OS-066, achado 3 da revisão independente -- esta célula afirmava também /candidaturas/oficial/<ano>/ como medido a cada execução, o que não era verdade). O caminho por ano foi medido UMA VEZ, em 2026-09-13, com o mesmo 403; a raiz é que é a medição viva, e não é uma suposição herdada de sessão anterior. A BRIEF do OS-066 proíbe Playwright para esta tabela e nenhum controle foi contornado. As duas linhas (2018, 2022) publicam-se como lacuna. ESTADO DECLARADO MANTIDO EM 2026-09-20: a funcao `promessas` serve 2 necessidades e devolveu `acquired`, o que fala pela que ela alcancou e nao por esta. | 2026-09-13 |
