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
        if(!is_null($body->type)){
            $user->type= $body->type;
        }

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

    public function testDeploy(): void
    {
        Response::json(data: [
            "message" => "Hello World",
        ]);
    }

    public function findProductsByUserId(array $params): void
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

    public function updatePassword(array $params): void
    {
        $id = $params[0][0];
        $body = Request::getBody();
        $user = new User();
        $user->id = intval($id);

        $userFound = $user->findById();

        if(!$userFound){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => 'user not found'
            ]);
        }

        if(!password_verify($body->oldPassword, $userFound->password)){
            Response::json( 400, [
                'error' => true,
                'message' => 'incorrect password'
            ]);
        }

        $user->password = password_hash($body->password, PASSWORD_DEFAULT);;

        $res = $user->updatePassword();

        if(is_string($res)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $res
            ]);
        }

        Response::json(200, ['message' => 'success']);

    }

    public function updatePasswordByAdmin(array $params): void
    {
        $id = $params[0][0];
        $body = Request::getBody();
        $user = new User();
        $user->id = intval($id);
        $user->password = password_hash($body->password, PASSWORD_DEFAULT);;

        $userFound = $user->findById();

        if(!$userFound){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => 'user not found'
            ]);
        }


        $res = $user->updatePassword();

        if(is_string($res)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $res
            ]);
        }

        Response::json(200, ['message' => 'success']);


    }
}