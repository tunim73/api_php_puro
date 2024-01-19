<?php
require_once __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set("America/Sao_Paulo");

header("Content-type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Authorization, Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Max-Age: 10800");
    http_response_code(204);
    exit;
}

/*$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/../');
$dotenv->load();*/

$route = new App\Core\Routes();

$route->add('GET', '/test', "UserController::testDeploy", "00");
$route->add('POST', '/login', 'AuthController::login', "00");
$route->add('GET', '/auth', "AuthController::verifyToken", "00");

$route->add('POST', '/user', 'UserController::store', "00");
$route->add('GET', '/user', 'UserController::findAll', "11");
$route->add('GET', '/user/[param]', 'UserController::findById', "10");
$route->add('GET', '/user/[param]/product', 'UserController::findProductsByUserId', "10");
$route->add('PUT', '/user/[param]', 'UserController::update', "10");
$route->add('DELETE', '/user/[param]', 'UserController::destroy', "10");
$route->add('PATCH', '/user/[param]/password', 'UserController::updatePassword', "10");

$route->add('POST', '/category', 'CategoryController::store', "10");
$route->add('GET', '/category', 'CategoryController::findAll', "00");
$route->add('GET', '/category/[param]', 'CategoryController::findById', "00");
$route->add('PUT', '/category/[param]', 'CategoryController::update', "10");
$route->add('DELETE', '/category/[param]', 'CategoryController::destroy', "10");

$route->add('POST', '/product', 'ProductController::store', "10");
$route->add('GET', '/product', 'ProductController::findAll', "00");
$route->add('GET', '/product/[param]', 'ProductController::findById', "00");
$route->add('PUT', '/product/[param]', 'ProductController::update', "10");
$route->add('DELETE', '/product/[param]', 'ProductController::destroy', "10");

$route->add('POST', '/news', 'NewsController::store', "11");
$route->add('GET', '/news', 'NewsController::findAll', "10");
$route->add('GET', '/news/[param]', 'NewsController::findById', "00");
$route->add('PUT', '/news/[param]', 'NewsController::update', "11");
$route->add('DELETE', '/news/[param]', 'NewsController::destroy', "11");
$route->add('GET', '/news/highlight', 'NewsController::findHighlightNews', "10");

$route->go();
