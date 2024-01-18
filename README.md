# E-on

Pré requisitos: <br/>
PHP >= 8.1 <br/>
Composer >= 2.5.7 <br/>
Mysql >= 8.0.35


Após o git clone, entre na pasta e instale as dependências: 

    composer install

Descomente as linhas 17 até 19, do arquivo api/index.php para usar o dotEnv;

Renomeie o .env.example para .env e configure de acordo com seu banco de dados;

Execute as querys no banco de dados, encontram-se no arquivo bd.sql;

Excute no terminal:

    php -S localhost:3000 api/index.php

Agora acesse o Frontend [clicando aqui](https://github.com/tunim73/frontend_from_api-php-puro);