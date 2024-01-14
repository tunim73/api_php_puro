<?php

namespace App\Controllers;

use App\Core\Response;

class UserController
{
    public function store($param): void
    {
        echo Response::json(data:
            [
                'name' => 'naruto',
                'param' => $param
            ]
        );
        exit;
    }
}