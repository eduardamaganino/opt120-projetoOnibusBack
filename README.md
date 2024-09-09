# CARDBUSS - Sistema de Gerenciamento de Cartões de Ônibus


O projeto CARDBUSS é um sistema completo de gerenciamento de cartões de transporte público, permitindo que os usuários se cadastrem, solicitem cartões, adicionem saldo, editem seus dados pessoais, e recebam notificações de recados enviados pelos administradores. O sistema visa melhorar a experiência dos usuários do transporte público, centralizando todas as operações relacionadas ao cartão de ônibus em uma plataforma simples e intuitiva.


Memória atualizada
Projeto: CARDBUSS - Sistema de Gerenciamento de Cartões de Ônibus
Descrição Geral:

O CARDBUSS é um sistema de gerenciamento de cartões de transporte público, onde os usuários podem se cadastrar, solicitar cartões, adicionar saldo, editar seus dados pessoais e receber notificações de recados enviados pelos administradores. O sistema oferece uma solução digital para a gestão dos cartões, facilitando o acesso dos usuários e aprimorando a comunicação entre administradores e passageiros.

## Funcionalidades

- Cadastro de Usuário
  
O usuário pode se cadastrar na plataforma fornecendo informações básicas como nome, e-mail, senha e CPF.
Após o cadastro, o usuário recebe uma confirmação e pode fazer login no sistema.
- Login
  
O login é feito utilizando o e-mail e senha cadastrados.
A autenticação utiliza JWT (JSON Web Token), garantindo segurança ao acesso das áreas privadas do sistema.

- Solicitação de Cartão
  
Após o login, o usuário pode solicitar um cartão de transporte público, uma unica vez já que ele pode ter apenas um cartão.
Os tipos de cartão disponíveis incluem Normal, Estudante, e Idoso. Dependendo do tipo de cartão solicitado, o sistema pode exigir o envio de documentos comprobatórios, como RG ou carteira de estudante, que podem ser carregados no formato PDF.
Após o admistrador aprovar o cartão, ele fica disponivel para o usuário com seu id.

- Adição de Saldo

O sistema permite que os usuários adicionem saldo ao cartão de transporte.
O saldo pode ser adicionado através de métodos de pagamento pix QR Code.
Após efetuar o pagamento, o administrador precisa processar o pagamento e ele é adicionado ao cartão.

- Edição de Dados do Usuário

O usuário pode editar informações pessoais como nome, e-mail e telefone.
O sistema valida as informações e atualiza os dados no banco de dados.
O usuário pode editar sua senha, passa por um processo que precisa saber a senha atual para isso, depois verificar duas vezes a nova senha.

- Notificações de Recados do Administrador

O administrador pode enviar notificações diretamente aos usuários, informando-os sobre mudanças, avisos importantes ou atualizações no sistema.
As notificações aparecem no painel do usuário, que pode marcá-las como lidas.



## Membros 

- Carolina Yumi Fujii - 2335468
- Eduarda Vaz Maganino - 2335360
- Caio Lucas da Silva - 2399008
- Elder Henrique Alves Correia - 2222698
