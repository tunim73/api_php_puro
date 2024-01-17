<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Models\Category;

class CategoryController
{

    public function store(): void
    {
        $body = Request::getBody();

        $category = new Category();
        $category->name = $body->name;
        $newCategory = $category->store();

        if(is_string($newCategory)){
            Response::json( status: 409, data: [
                'error' => true,
                'message' => $newCategory
            ]);
        }

        Response::json( 201 ,[
            "message" => $newCategory,
            "category" => $category
        ]);

    }

    public function findAll(): void
    {
        $category = new Category();
        Response::json(data: $category->findAll());

    }

    public function findById(array $params): void
    {
        $id = $params[0][0];
        $category = new Category();
        $category->id = intval($id);
        $result = $category->findById();

        Response::json(data: $result);
    }

    public function update(array $params): void
    {
        $id = $params[0][0];
        $body = Request::getBody();

        $category = new Category();

        $category->id = intval($id);
        $category->name = $body->name;

        $updatedCategory = $category->update();

        if(is_string($updatedCategory)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $updatedCategory
            ]);
        }

        Response::json(data: [
            "message" => $updatedCategory,
            "category"=> $category
        ]);

    }

    public function destroy(array $params): void
    {
        $id = $params[0][0];

        $category = new Category();
        $category->id = intval($id);
        $deletedCategory = $category->destroy();

        if(is_string($deletedCategory)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $deletedCategory
            ]);
        }

        Response::json(data: [
            "message" => $deletedCategory,
        ]);

    }

}