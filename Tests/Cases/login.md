# Casos de Teste — Login

## Objetivo

Validar o funcionamento da autenticação do FT Clinic, incluindo:

* acesso com credenciais válidas;
* rejeição de credenciais inválidas;
* validação de campos;
* criação da sessão;
* acesso ao Dashboard;
* encerramento da sessão;
* proteção de páginas para usuários não autenticados.

---

# LOGIN-001 — Login com credenciais válidas

### Objetivo

Verificar se um usuário cadastrado consegue entrar no sistema utilizando suas credenciais corretas.

### Pré-condições

* Sistema backend em execução.
* Sistema frontend em execução.
* Usuário cadastrado no banco de dados.
* Login e senha conhecidos.

### Passos

1. Acessar a tela de login.
2. Informar um login válido.
3. Informar a senha correspondente.
4. Clicar em **Entrar**.

### Resultado esperado

* O sistema deve aceitar as credenciais.
* O usuário deve ser autenticado.
* O usuário deve ser direcionado para o Dashboard.
* O sistema deve manter a sessão do usuário.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-002 — Login com senha incorreta

### Objetivo

Verificar se o sistema impede o acesso quando a senha informada está incorreta.

### Pré-condições

* Usuário cadastrado.
* Login válido conhecido.
* Senha incorreta disponível para o teste.

### Passos

1. Acessar a tela de login.
2. Informar um login válido.
3. Informar uma senha incorreta.
4. Clicar em **Entrar**.

### Resultado esperado

* O login deve ser rejeitado.
* O usuário não deve acessar o Dashboard.
* O sistema deve apresentar uma mensagem indicando que as credenciais são inválidas.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [x] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-003 — Login com usuário inexistente

### Objetivo

Verificar se o sistema impede o acesso de um usuário que não está cadastrado.

### Passos

1. Acessar a tela de login.
2. Informar um login que não existe.
3. Informar uma senha qualquer.
4. Clicar em **Entrar**.

### Resultado esperado

* O sistema deve rejeitar o login.
* O usuário não deve acessar o Dashboard.
* Deve ser apresentada uma mensagem adequada de erro.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [x] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-004 — Login sem informar usuário

### Objetivo

Verificar a validação do campo de login.

### Passos

1. Acessar a tela de login.
2. Deixar o campo de login vazio.
3. Informar uma senha.
4. Clicar em **Entrar**.

### Resultado esperado

* O sistema deve impedir o envio do formulário.
* O usuário não deve ser autenticado.
* O campo de login deve ser identificado como obrigatório ou uma mensagem equivalente deve ser apresentada.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-005 — Login sem informar senha

### Objetivo

Verificar a validação do campo de senha.

### Passos

1. Acessar a tela de login.
2. Informar um login válido.
3. Deixar o campo de senha vazio.
4. Clicar em **Entrar**.

### Resultado esperado

* O sistema deve impedir o envio do formulário.
* O usuário não deve ser autenticado.
* O campo de senha deve ser identificado como obrigatório ou uma mensagem equivalente deve ser apresentada.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [x] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-006 — Login com os dois campos vazios

### Objetivo

Verificar o comportamento do formulário quando nenhum dado é informado.

### Passos

1. Acessar a tela de login.
2. Não preencher nenhum campo.
3. Clicar em **Entrar**.

### Resultado esperado

* O sistema não deve realizar uma tentativa válida de autenticação.
* O usuário deve permanecer na tela de login.
* Os campos obrigatórios devem ser identificados.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-007 — Senha não deve ser exibida em texto aberto

### Objetivo

Verificar se o campo de senha protege visualmente o conteúdo digitado.

### Passos

1. Acessar a tela de login.
2. Clicar no campo de senha.
3. Digitar uma senha.

### Resultado esperado

A senha deve ser exibida como caracteres ocultos, e não como texto normal.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-008 — Acesso ao Dashboard após login

### Objetivo

Verificar se um usuário autenticado consegue acessar o Dashboard.

### Pré-condições

* Usuário autenticado.

### Passos

1. Realizar login com credenciais válidas.
2. Após o login, verificar a página apresentada.
3. Tentar acessar o Dashboard diretamente pela aplicação.

### Resultado esperado

* O Dashboard deve ser exibido.
* O usuário autenticado deve conseguir acessar a página.
* A sessão deve permanecer válida enquanto o usuário estiver autenticado.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-009 — Usuário não autenticado não pode acessar o Dashboard

### Objetivo

Verificar a proteção da rota do Dashboard.

### Pré-condições

* Não estar autenticado.
* Sessão anterior encerrada.

### Passos

1. Sair do sistema, caso esteja autenticado.
2. Tentar acessar diretamente a rota do Dashboard.

### Resultado esperado

* O usuário não deve conseguir acessar o Dashboard.
* O sistema deve redirecionar o usuário para a tela de login ou impedir o acesso de forma equivalente.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-010 — Logout encerra a sessão

### Objetivo

Verificar se o logout realmente encerra a sessão do usuário.

### Pré-condições

* Usuário autenticado.
* Dashboard acessível.

### Passos

1. Realizar login.
2. Acessar o Dashboard.
3. Clicar em **Sair**.
4. Verificar a página apresentada.
5. Tentar acessar novamente o Dashboard.

### Resultado esperado

* A sessão deve ser encerrada.
* O usuário deve ser direcionado para a tela de login.
* O Dashboard não deve continuar acessível após o logout.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-011 — Usuário comum após login

### Objetivo

Verificar se o usuário comum é autenticado corretamente e recebe as permissões correspondentes ao seu perfil.

### Pré-condições

* Usuário com perfil comum cadastrado.

### Passos

1. Acessar a tela de login.
2. Informar as credenciais do usuário comum.
3. Clicar em **Entrar**.
4. Acessar o Dashboard.
5. Verificar as funcionalidades disponíveis.

### Resultado esperado

* O login deve ser realizado com sucesso.
* O usuário deve acessar o Dashboard.
* O usuário deve receber as permissões correspondentes ao perfil comum.
* Funcionalidades exclusivas de administrador não devem ser liberadas indevidamente.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

---

# LOGIN-012 — Administrador após login

### Objetivo

Verificar se um usuário administrador é autenticado e recebe as permissões administrativas correspondentes.

### Pré-condições

* Usuário administrador cadastrado.

### Passos

1. Acessar a tela de login.
2. Informar as credenciais do administrador.
3. Clicar em **Entrar**.
4. Acessar o Dashboard.
5. Acessar uma funcionalidade administrativa.

### Resultado esperado

* O login deve ser realizado com sucesso.
* O administrador deve acessar o Dashboard.
* As funcionalidades administrativas devem estar disponíveis conforme as regras do sistema.

### Resultado obtido

Preencher após a execução.

### Status

* [x] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO
