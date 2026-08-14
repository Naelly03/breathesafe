# breathesafe

Monorepo: `breathesafe-back/` (AdonisJS) + `breathesafe-front/` (Expo/React Native).

## Ecossistema de economia de tokens

Este projeto usa RTK + Caveman + Graphify. Ver `graphify-out/GRAPH_REPORT.md` antes de explorar arquitetura.

- **RTK**: hook global já filtra saída de shell (`rtk hook claude` em PreToolUse). Nada a fazer aqui.
- **Caveman**: plugin ativo globalmente (`caveman@caveman`). Respostas conversacionais compactas por padrão.
- **Graphify**: grafo de conhecimento da pasta atual.
  - Antes de explorar arquitetura ou perguntar "onde fica X" / "o que chama Y": consulte `graphify-out/wiki/index.md` ou rode `/graphify query "..."` em vez de ler arquivos crus.
  - Após mudanças estruturais relevantes (novos módulos, rotas, models): `graphify ./  --update`.
  - Regerar do zero apenas se o grafo ficar muito desatualizado: `graphify .`.

## Boas práticas

- Buscas com `rg`/Grep focadas em caminho específico, nunca raiz inteira sem necessidade.
- Peça/gere resumo de diff em vez de diff completo quando a mudança passar de ~200 linhas.
- Back e front são projetos Node separados — rode `pnpm` a partir da respectiva subpasta.
