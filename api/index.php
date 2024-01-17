<?php

require_once __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set("America/Sao_Paulo");

header("Content-type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Max-Age: 10800");
    http_response_code(204);
    exit;
}

$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/../');
$dotenv->load();

$route = new App\Core\Routes();

$route->add('POST', '/login', 'AuthController::login', false);
$route->add('POST', '/user', 'UserController::store', false);
$route->add('GET', '/user', 'UserController::findAll', false);
$route->add('GET', '/user/[param]', 'UserController::findById', true);
$route->add('PUT', '/user/[param]', 'UserController::update', false);
$route->add('DELETE', '/user/[param]', 'UserController::destroy', false);

$route->go();
