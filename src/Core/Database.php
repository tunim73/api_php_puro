<?php

namespace App\Core;

use PDO;

class Database
{
    public static function connect(): PDO
    {
        $host = getenv('DB_HOST');
        $user= getenv('DB_USER');
        $pass = getenv('DB_PASSWORD');
        $base = getenv('DB_BASE');

        $dsn = "mysql:host=$host;dbname=$base;charset=UTF8;";
        /*$options = [PDO::MYSQL_ATTR_SSL_CA => __DIR__ . "../../ca-certificates.crt" ];*/

        $pdo = new PDO($dsn, $user, $pass);

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $pdo;
    }
}

/*$host =  $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASSWORD'];
$base = $_ENV['DB_BASE'];*/

/*DB_HOST=localhost
DB_USER=laranja
DB_PASSWORD=mynewpassword
DB_BASE=api_php_puro*/

/*DB_HOST=aws-sa-east-1.connect.psdb.cloud
DB_USER=wyqppa14zdm9qek3hc49
DB_PASSWORD=pscale_pw_hAanvR9GD6GoDCGwkeJPxNKyuxrCIIWYMuA2Bpj7ktd
DB_BASE=api_php_puro
PLANETSCALE_DB
PLANETSCALE_DB_USERNAME
PLANETSCALE_DB_PASSWORD
PLANETSCALE_DB_HOST
PLANETSCALE_SSL_CERT_PATH*/