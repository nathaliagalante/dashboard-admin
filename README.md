<h1 align="center">Desafio Admin-web</h1>

### Sobre
- Projeto desenvolvido para a etapa de desafio de uma vaga de desenvolvedor front-end júnior
- A API foi desenvolvida pela empresa, e o front-end inteiramente por mim

### Contextualização
- Aplicação de gestão financeira para o mundo dos negócios de uma nova empresa que está em constante crescimento
- A empresa tem usuários em sua base de dados e agora vai começar a oferecer cartão de crédito para eles

### Funcionalidades
1. **Visualizar** usuários da base;
2. **Visualizar** cartoes disponíveis;
3. **Visualizar** Auditoria;
4. **Aprovar** e **rejeitar** um pedido de cartão;
5. **Entrar** na aplicação com email e senha;
6. **Excluir** e **Criar** um pedido de cartão;
7. **Atualizar** o "nome impresso" do usuário de um pedido de cartão;
8. Limitar visualização de alguns componentes baseado nos roles dos analistas;
10. **Sair** da aplicação;

### Endpoints utilizados
- GET http://localhost:3001/api/users
- GET http://localhost:3001/api/cards
- GET http://localhost:3001/api/audits
- GET http://localhost:3001/api/analysts
- GET http://localhost:3001/api/features
- PUT http://localhost:3001/api/cards/:id
- POST http://localhost:3001/api/audits
- POST http://localhost:3001/api/cards
- DELETE http://localhost:3001/api/cards/:id

### Tecnologias
- React
- Ant Design
- React Bootstrap

### Teste
- login: admin0@gmail.com / senha: admin0
- login admin1@gmail.com / senha: admin1
