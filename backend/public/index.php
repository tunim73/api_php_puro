<?php

require_once __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set("America/Sao_Paulo");

header("Content-type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type");

$route = new App\Core\Routes();

$route->add('POST', '/user', 'UserController::store', false);
$route->add('GET', '/user/[param]', 'UserController::store', true);


$route->go();
