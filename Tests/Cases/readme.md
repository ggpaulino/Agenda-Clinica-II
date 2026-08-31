# Rotina de Testes — FT Clinic

## 1. Objetivo

A pasta `tests/` contém os testes e procedimentos utilizados para verificar o funcionamento do sistema FT Clinic.

A rotina de testes tem como objetivo:

* verificar novas funcionalidades;
* identificar erros;
* evitar que alterações quebrem funcionalidades existentes;
* registrar problemas encontrados;
* garantir que correções continuem funcionando no futuro.

---

## 2. Regra principal

Toda nova funcionalidade ou alteração importante deve ser acompanhada de testes.

Quando um erro for encontrado, o procedimento será:

1. registrar o problema;
2. criar ou atualizar um caso de teste;
3. corrigir o problema;
4. executar novamente o teste;
5. executar os testes de regressão relacionados;
6. registrar a alteração no GitHub.

Uma correção não deve ser considerada concluída apenas porque funcionou uma vez manualmente.

---

## 3. Tipos de teste

### 3.1 Teste manual

Executado diretamente pelo desenvolvedor através da aplicação.

Exemplo:

```text
Abrir a tela de serviços
→ selecionar um serviço
→ clicar em Editar
→ alterar os dados
→ salvar
→ verificar o resultado
```

### 3.2 Teste de API

Verifica diretamente as operações realizadas pelo backend.

Exemplo:

```text
POST /api/servicos
PUT /api/servicos/:id
DELETE /api/servicos/:id
```

### 3.3 Teste automatizado

Teste executado por código, sem necessidade de realizar manualmente todos os passos.

Os testes automatizados serão adicionados gradualmente ao projeto.

---

## 4. Estrutura dos casos de teste

Cada módulo possui um arquivo próprio dentro de:

```text
tests/casos/
```

Exemplo:

```text
tests/casos/servicos.md
```

Cada caso deve possuir:

* identificador;
* descrição;
* pré-condições;
* passos;
* resultado esperado;
* resultado obtido;
* status.

Exemplo:

```text
SERV-001

Descrição:
Admin consegue cadastrar um serviço.

Pré-condições:
- Sistema funcionando.
- Usuário administrador cadastrado.

Passos:
1. Entrar no sistema como administrador.
2. Acessar Serviços.
3. Selecionar Novo Serviço.
4. Preencher os dados.
5. Salvar.

Resultado esperado:
O serviço deve ser cadastrado e aparecer na lista.

Resultado obtido:
[preencher durante o teste]

Status:
[ ] PASSOU
[ ] FALHOU
```

---

## 5. Status dos testes

Utilizaremos inicialmente três estados:

### PASSOU

O comportamento observado corresponde ao resultado esperado.

### FALHOU

O comportamento observado é diferente do resultado esperado.

Quando um teste falhar, o problema deve ser investigado antes de continuar a implementação de novas funcionalidades relacionadas.

### BLOQUEADO

O teste não pode ser executado porque existe algum problema ou dependência impedindo sua execução.

---

## 6. Testes de regressão

Os testes de regressão estão registrados em:

```text
tests/regressao.md
```

Eles devem ser executados após alterações que possam afetar funcionalidades existentes.

Um erro corrigido deve, sempre que possível, gerar um teste de regressão.

Exemplo:

```text
Problema:
Admin não conseguia editar serviços.

Correção:
Ajuste das permissões.

Teste:
SERV-003 — Admin consegue editar serviço.

Resultado:
PASSOU
```

Esse teste passa a fazer parte da regressão para evitar que o problema volte a ocorrer.

---

## 7. Integração com o GitHub

As alterações relacionadas aos testes devem ser registradas no GitHub.

Exemplos de commits:

```text
test(servicos): adiciona casos de teste
```

```text
fix(servicos): corrige edição para administradores
```

```text
test(servicos): adiciona regressão para edição de admin
```

O objetivo é manter um histórico claro entre:

```text
Problema
↓
Teste
↓
Correção
↓
Novo teste/regressão
↓
Commit
```

---

## 8. Regra para novos bugs

Sempre que um bug for encontrado:

1. verificar se já existe um teste para o comportamento;
2. se não existir, criar um caso de teste;
3. reproduzir o problema;
4. corrigir o código;
5. executar novamente o teste;
6. executar a regressão relacionada;
7. registrar a alteração no GitHub.

---

## 9. Regra para novas funcionalidades

Antes de considerar uma funcionalidade concluída:

1. definir o comportamento esperado;
2. criar os casos de teste necessários;
3. implementar a funcionalidade;
4. executar os testes;
5. corrigir eventuais problemas;
6. executar a regressão;
7. registrar a alteração no GitHub.

---

## 10. Evolução da automação

A automação será implementada gradualmente.

A ordem inicial planejada é:

```text
Testes manuais
↓
Testes de API
↓
Testes automatizados do backend
↓
Testes automatizados do frontend
↓
Testes de integração
↓
Testes E2E
```

Não é necessário automatizar todos os testes imediatamente.

O objetivo inicial é criar uma rotina de testes consistente e fácil de manter.
