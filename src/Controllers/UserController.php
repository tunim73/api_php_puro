<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Models\User;
use ErrorException;

class UserController
{
    public function store(): void
    {
        $body = Request::getBody();

        $user = new User();

        $user->name = $body->name;
        $user->email = $body->email;
        $user->cpf =  $body->cpf;
        $user->address = $body->address;
        $user->city = $body->city;
        $user->uf = $body->uf;
        $user->password = password_hash($body->password, PASSWORD_DEFAULT);


            $newUser = $user->store();

            if(is_string($newUser)){
                Response::json( status: 409, data: [
                    'error' => true,
                    'message' => $newUser
                ]);
            }

            Response::json( 201 ,[
                "message" => $newUser,
                "user" => $user
            ]);

    }

    public function findAll(): void
    {
        $user = new User();
        Response::json(data: $user->findAll());

    }

    public function findById(array $params): void
    {
        $id = $params[0][0];
        $user = new User();
        $user->id = intval($id);
        $result = $user->findById();

        Response::json(data: $result);
    }

    public function update(array $params): void
    {
        $id = $params[0][0];
        $body = Request::getBody();

        $user = new User();

        $user->id = intval($id);
        $user->name = $body->name;
        $user->email = $body->email;
        $user->cpf =  $body->cpf;
        $user->address = $body->address;
        $user->city = $body->city;
        $user->uf = $body->uf;

        $updatedUser = $user->update();

        if(is_string($updatedUser)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $updatedUser
            ]);
        }

        Response::json(data: [
            "message" => $updatedUser,
            "user"=> $user
        ]);

    }

    public function destroy(array $params): void
    {
        $id = $params[0][0];

        $user = new User();
        $user->id = intval($id);
        $deletedUser = $user->destroy();

        if(is_string($deletedUser)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $deletedUser
            ]);
        }

        Response::json(data: [
            "message" => $deletedUser,
        ]);

    }

    public function testDeploy()
    {
        Response::json(data: [
            "message" => "Hello World",
        ]);
    }

    public function findProductsByUserId(array $params)
    {
        $id = $params[0][0];
        $user = new User();
        $user->id = intval($id);

        $result = $user->findProductsByUserId();

        if(is_string($result)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $result
            ]);
        }

        Response::json(200, $result);
    }




}