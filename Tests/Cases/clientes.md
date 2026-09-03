# Casos de Teste — Clientes

## Objetivo

Validar o funcionamento do módulo de clientes, incluindo:

* cadastro de clientes;
* consulta de clientes;
* edição de clientes;
* remoção de clientes;
* validação dos dados;
* comportamento diante de clientes inexistentes;
* comportamento após operações de alteração;
* controle de acesso, quando aplicável.

---

# CLI-001 — Cadastrar cliente com dados válidos

### Objetivo

Verificar se é possível cadastrar um novo cliente utilizando dados válidos.

### Pré-condições

* Sistema funcionando.
* Usuário autenticado.
* Acesso ao módulo de clientes.

### Passos

1. Acessar o módulo de Clientes.
2. Selecionar a opção de cadastro de novo cliente.
3. Preencher todos os campos obrigatórios com dados válidos.
4. Clicar em **Salvar**.

### Resultado esperado

* O cliente deve ser cadastrado.
* O sistema deve informar que o cadastro foi realizado com sucesso.
* O novo cliente deve aparecer na listagem de clientes.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

### Melhoria relacionada

Nenhuma / informar ID da melhoria, se houver.

---

# CLI-002 — Cadastrar cliente sem preencher campos obrigatórios

### Objetivo

Verificar se o sistema impede o cadastro de um cliente sem os dados obrigatórios.

### Passos

1. Acessar o cadastro de cliente.
2. Deixar os campos obrigatórios vazios.
3. Clicar em **Salvar**.

### Resultado esperado

* O cadastro não deve ser realizado.
* O sistema deve indicar quais campos são obrigatórios ou apresentar uma validação equivalente.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-003 — Cancelar cadastro de cliente

### Objetivo

Verificar se o usuário consegue cancelar um cadastro sem salvar os dados.

### Passos

1. Acessar o cadastro de cliente.
2. Preencher alguns dados.
3. Selecionar a opção de cancelar/voltar.

### Resultado esperado

* O cadastro não deve ser criado.
* O usuário deve retornar à tela anterior ou à listagem de clientes.
* Os dados não devem ser persistidos.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-004 — Visualizar clientes cadastrados

### Objetivo

Verificar se os clientes cadastrados são apresentados corretamente.

### Pré-condições

* Existir pelo menos um cliente cadastrado.

### Passos

1. Acessar o módulo de Clientes.
2. Visualizar a listagem.

### Resultado esperado

* Os clientes cadastrados devem ser apresentados.
* Os dados exibidos devem corresponder aos dados armazenados.
* A listagem deve carregar sem erros.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-005 — Editar cliente

### Objetivo

Verificar se um cliente existente pode ser editado.

### Pré-condições

* Existir um cliente cadastrado.

### Passos

1. Acessar o módulo de Clientes.
2. Selecionar um cliente.
3. Selecionar **Editar**.
4. Alterar um ou mais dados.
5. Salvar.

### Resultado esperado

* A alteração deve ser salva.
* O sistema deve informar que a operação foi realizada com sucesso.
* A listagem deve apresentar os dados atualizados.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-006 — Cancelar edição de cliente

### Objetivo

Verificar se uma alteração pode ser cancelada sem modificar o cadastro original.

### Pré-condições

* Existir um cliente cadastrado.

### Passos

1. Selecionar um cliente.
2. Selecionar **Editar**.
3. Alterar algum dado.
4. Cancelar a operação.

### Resultado esperado

* A alteração não deve ser salva.
* O cliente deve permanecer com os dados originais.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-007 — Remover cliente

### Objetivo

Verificar se um cliente existente pode ser removido.

### Pré-condições

* Existir um cliente que possa ser utilizado no teste.

### Passos

1. Acessar o módulo de Clientes.
2. Selecionar o cliente.
3. Selecionar **Remover/Excluir**.
4. Confirmar a operação, caso exista confirmação.

### Resultado esperado

* O cliente deve ser removido.
* O cliente não deve mais aparecer na listagem.
* O sistema deve informar o resultado da operação.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-008 — Cancelar remoção de cliente

### Objetivo

Verificar se uma remoção pode ser cancelada.

### Pré-condições

* Existir um cliente cadastrado.
* O sistema possuir confirmação de remoção.

### Passos

1. Selecionar um cliente.
2. Selecionar **Remover/Excluir**.
3. Quando apresentada a confirmação, cancelar a operação.

### Resultado esperado

* O cliente não deve ser removido.
* O cliente deve continuar aparecendo na listagem.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-009 — Consultar cliente inexistente

### Objetivo

Verificar o comportamento do sistema quando um cliente solicitado não existe.

### Passos

1. Tentar acessar um cliente que não existe.
2. Observar o comportamento do sistema.

### Resultado esperado

* O sistema não deve apresentar um cliente inexistente.
* Deve apresentar uma resposta adequada, como mensagem de não encontrado ou comportamento equivalente.
* A aplicação não deve apresentar erro inesperado.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Preencher durante o teste.

---

# CLI-010 — Impedir cadastro com dados inválidos

### Objetivo

Verificar se o sistema valida dados que não obedecem às regras definidas para clientes.

### Passos

1. Acessar o cadastro de cliente.
2. Informar dados inválidos em um ou mais campos.
3. Tentar salvar.

### Resultado esperado

* O sistema deve rejeitar os dados inválidos quando existir uma regra de validação para o campo.
* O cadastro não deve ser realizado enquanto os dados inválidos não forem corrigidos.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Registrar quais dados foram utilizados e qual validação foi observada.

---

# CLI-011 — Atualização da listagem após cadastro

### Objetivo

Verificar se um cliente recém-cadastrado aparece corretamente na listagem sem necessidade de comportamento inesperado por parte do usuário.

### Passos

1. Cadastrar um cliente válido.
2. Retornar à listagem de clientes.
3. Verificar a lista.

### Resultado esperado

O novo cliente deve estar disponível na listagem após o cadastro.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Registrar se a lista foi atualizada automaticamente ou se foi necessário recarregar a página.

---

# CLI-012 — Atualização da listagem após edição

### Objetivo

Verificar se os dados alterados aparecem corretamente na listagem.

### Passos

1. Selecionar um cliente existente.
2. Editar seus dados.
3. Salvar.
4. Retornar à listagem, se necessário.
5. Verificar os dados apresentados.

### Resultado esperado

A listagem deve apresentar os dados atualizados do cliente.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Registrar se a atualização ocorreu automaticamente ou se foi necessário recarregar a página.

---

# CLI-013 — Atualização da listagem após remoção

### Objetivo

Verificar se a listagem é atualizada após a remoção de um cliente.

### Passos

1. Selecionar um cliente de teste.
2. Remover o cliente.
3. Confirmar a operação.
4. Observar a listagem.

### Resultado esperado

O cliente removido não deve mais aparecer na listagem.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Registrar se a lista foi atualizada automaticamente ou se foi necessário recarregar a página.

---

# CLI-014 — Acesso ao módulo por usuário autenticado

### Objetivo

Verificar se um usuário autenticado consegue acessar o módulo de clientes conforme as permissões definidas para seu perfil.

### Pré-condições

* Usuário autenticado.

### Passos

1. Realizar login.
2. Acessar o módulo de Clientes.
3. Verificar as funcionalidades disponíveis.

### Resultado esperado

O usuário deve ter acesso às funcionalidades de clientes permitidas para seu perfil.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Registrar quais funcionalidades estavam disponíveis.

---

# CLI-015 — Acesso ao módulo sem autenticação

### Objetivo

Verificar se um usuário não autenticado consegue acessar diretamente o módulo de clientes.

### Pré-condições

* Usuário não autenticado.

### Passos

1. Encerrar a sessão, caso exista.
2. Tentar acessar diretamente a rota do módulo de Clientes.

### Resultado esperado

* O acesso deve ser bloqueado caso o módulo seja protegido.
* O usuário deve ser direcionado para o login ou receber uma resposta equivalente.

### Resultado obtido

Preencher após a execução.

### Status

* [ ] PASSOU
* [ ] FALHOU
* [ ] BLOQUEADO

### Observações

Registrar o comportamento observado.

---

# Resumo da execução

| ID      | Resultado | Observação |
| ------- | --------- | ---------- |
| CLI-001 | Passou    |            |
| CLI-002 | Falhou    | Cadastros sem nenhum dado são aceitos           |
| CLI-003 | Passou    |            |
| CLI-004 | Passou    |            |
| CLI-005 | Passou    |  Pode ser implementado campo de busca de cliente pelo nome.A tela de atualização pode ter seu lugar revisto na tela.          |
| CLI-006 | Passou    |            |
| CLI-007 | Passou    |            |
| CLI-008 | Passou    |            |
| CLI-009 | Passou    |            |
| CLI-010 | Falhou    |  Os campos email e CPF precisam ter validação antes de aceitar o cadastro          |
| CLI-011 | Passou    |            |
| CLI-012 | Passou    |   Os cadastros recém atualizados vão para o fim da fila.         |
| CLI-013 | Passou    |            |
| CLI-014 | Passou    |    Os usuarios do perfil comum não deveriam poder remover clientes        |
| CLI-015 | Passou    |   É possível acesso ao cadastro de novos clientes porém o cadastro não acontece.         |
