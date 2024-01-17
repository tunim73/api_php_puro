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

        $pdo = new PDO("mysql:host=$host;dbname=$base;charset=UTF8;", $user, $pass);

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $pdo;
    }
}

/*$host =  $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASSWORD'];
$base = $_ENV['DB_BASE'];*/