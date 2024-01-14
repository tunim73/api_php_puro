<?php

namespace App\Core;

use App\Controllers\UserController;

class Routes
{
    private $routeList;

    public function add($httpMethod, $route, $callback, $protection): void
    {
        $fullRoute = strtoupper($httpMethod).'|'.$route;
        $this->routeList[$fullRoute] = $callback . '::' . $protection;
    }

    public function go()
    {
        $routeCallback = self::getRouteCallback();
        $params = Request::getRouteParams();

        $callbackAndProtection = explode('::', $routeCallback);

        $basicPath = "App\Controllers\ ";
        $class = trim($basicPath) . $callbackAndProtection[0] ;
        $classMethod = $callbackAndProtection[1];
        $protection = $callbackAndProtection[2];

        if(!class_exists($class)){
            Response::json(400, ['message' => 'not found class']);
        }
        if(!method_exists($class, $classMethod)){
            Response::json(400, ['message' => 'not found method']);
        }


        if($protection === "1"){
            Response::json(data: [
                "rota autenticada"
            ]);
        }

        $instance = new $class();

        return call_user_func(
            array($instance, $classMethod),
            array($params)
        );
    }


    private function getRouteCallback()
    {
        $httpMethod = $_SERVER['REQUEST_METHOD'];
        $route = $_SERVER["REQUEST_URI"] ?? '/';

        $routeFormatted = preg_replace("(\d+)", "[param]", $route);
        $routeFormatted = rtrim($routeFormatted, '/');

        $key = "$httpMethod|$routeFormatted";

        $routeCallback = $this->routeList[$key];

        if(!isset($routeCallback)){
            Response::notFoundRoute();
        }

        return $routeCallback;

    }

    private function auth($protection)
    {
        return $protection;
    }
    
}