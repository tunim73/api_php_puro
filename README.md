# E-on

<p>
Projeto simples para testar os conhecimentos referente ao backend com <b>PHP sem framework e ORM</b>.
</p>

Para acessar o site testar entre em contato com o desenvolvedor
"ativar" o banco de dados, pois ele é gratuíto, depois [clique aqui para acessar site](https://e-on-front.vercel.app/)

### Tecnologias backend

PHP | JWT | Mysql | PDO

### Tecnologias frontend

Typescript | React | Tailwind CSS | [Flowbite](https://flowbite.com/docs/getting-started/introduction/)

## Requisitos

### Áreas do usuários comum

- Página de Produtos

- Página de Categorias:

- Página de DashBoard: Será a pagina principal onde irá listar todos os produtos com status de ativo. (Imagem/nome/quantidade/valor). Obs.:Criar links para as páginas de cadastros.

- Cada Produto deve ter uma categoria

- Registro atualização e usuários

- Autenticação e rotas privadas.

- Página principal da área restrita: Ambiente onde o usuário, após estar logado, irá visualizar as notícias e poderá alterar os seus dados cadastrais e senha.

- Apenas as 3 notícias destques selecionadas irão aparecer na página principal da seguinte maneira: Título / data / imagem / resumo / Saiba mais. Haverá uma opção também para Veja mais notícias.

### Área Administrativa

- Terão dois funcionalidades a mais, o administrador do sistema poderá gerenciar o conteúdo de Notícias e os usuários cadastrados.

### Informações das entidades

- Produtos: Nome | Código | Status | Valor | categoria | Quantidade | Descrição | Imagem

- Categorias: Nome | Código

- Usuário: Nome | E-mail | CPF | Endereço | Cidade | UF | Senha

- Notícias: Título | Data | Resumo | Imagem | Conteúdo | Destaque

## Pré-requisitos para executar o sistema

PHP >= 8.1 <br/>
Composer >= 2.5.7 <br/>
Mysql >= 8.0.35 <br/>
<br/>
Node >= 18.19.0 <br/>

## Executar o backend

1. Após o git clone, entre em backend e instale as dependências:

```bash
composer install
```

2. Descomente as linhas do arquivo api/index.php para usar o dotEnv, ficar como no exmplo abaixo:

```php
$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/../');
$dotenv->load();
```

3. Renomeie o .env.example para .env e configure de acordo com seu banco de dados;

4. Execute as querys no banco de dados, encontram-se no arquivo bd.sql;

5. Rode os 'seeders', mas é opcional, arquivo seed.sql.

6. Excute no terminal:

```bash
php -S localhost:3000 api/index.php
```

## Executar o frontend

1. entre em frontend e instale as dependências:

```bash
npm i
```

2. Renomeie o .env.example para .env e configure de acordo com host + porta da api escolhida anteriormente, por padrão mantenha http://localhost:3000

3. Excute no terminal:

```bash
npm run dev
```

## Possibiidades Futuras

- Adicionar Repositories e Services no backend e refatorar os models
