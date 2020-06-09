# Form App

O sistema deve prover authenticação via jwt, cada usuário deve ter:

## User

- id;
- name;
- bio;
- email;
- password_hash;
- avatar_uri.

Cada usuário pode criar formulários, cada form pode ter:

## Form

- id;
- title;
- description;
- theme (An color);
- fields;

O field deve ter um `name` e um `tipo`, tipos iniciais são:

- Tipo texto;
- Tipo textarea;
- Tipo select;
- Tipo radio;
- Tipo radio multiselect.

Um usuário pode criar vários formulários bem como visualiza-los e as respostas dos forms.

Na lista de forms de usuário deve aparecer id, title, description, qty_responses, created_at, updated_at.

Na lista de resposta do form deve ser uma tabela onde o nome das colunas é o nome do campo do formulário.

Qualquer usuário pode responder um form.