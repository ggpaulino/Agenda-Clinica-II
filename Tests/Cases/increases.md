# Melhorias Identificadas Durante os Testes

Este arquivo registra melhorias identificadas durante a execução dos testes que não representam falhas no comportamento esperado do sistema.

As melhorias devem ser avaliadas antes de serem implementadas.

---

## MEL-001 — Indicador de carregamento no login

**Origem:** LOGIN-001

**Data:** 02/09/2026

**Descrição:**

Durante a execução do teste de login com credenciais válidas, foi observado que o sistema funciona corretamente, porém não apresenta indicação visual enquanto aguarda a resposta do servidor.

**Comportamento atual:**

O usuário clica em "Entrar" e aguarda a resposta sem indicação visual de processamento.

**Melhoria sugerida:**

Apresentar um indicador de carregamento e/ou alterar temporariamente o estado do botão enquanto a autenticação estiver sendo processada.

**Impacto:**

Melhora a experiência do usuário e deixa claro que a solicitação está sendo processada.

**Prioridade:**

Baixa

**Status:**

* [ ] Pendente
* [ ] Em desenvolvimento
* [ ] Concluída
* [ ] Cancelada
