<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Models\Product;

class ProductController
{
    public function store(): void
    {
        $body = Request::getBody();

        $product = new Product();

        $product->name = $body->name;
        $product->value = $body->value;
        $product->quantity =  $body->quantity;
        $product->description = $body->description;
        $product->image = $body->image;
        $product->userId = $body->userId;
        $product->categoryId = $body->categoryId;

        $newProduct = $product->store();

        if(is_string($newProduct)){
            Response::json( status: 409, data: [
                'error' => true,
                'message' => $newProduct
            ]);
        }

        Response::json( 201 ,[
            "message" => $newProduct,
            "product" => $product
        ]);

    }

    public function findAll(): void
    {
        $product = new Product();
        Response::json(data: $product->findAll());
    }

    public function findById(array $params): void
    {
        $cod = $params[0][0];
        $product = new Product();
        $product->cod = intval($cod);
        $result = $product->findById();

        Response::json(data: $result);
    }

    public function update(array $params): void
    {
        $cod = $params[0][0];
        $body = Request::getBody();

        $product = new Product();

        $product->cod = intval($cod);
        $product->name = $body->name;
        $product->value = $body->value;
        $product->quantity =  $body->quantity;
        $product->description = $body->description;
        $product->image = $body->image;
        $product->categoryId = $body->categoryId;

        $updatedProduct = $product->update();

        if(is_string($updatedProduct)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $updatedProduct
            ]);
        }

        Response::json(data: [
            "message" => $updatedProduct,
            "product"=> $product
        ]);

    }

    public function destroy(array $params): void
    {
        $cod = $params[0][0];

        $product = new Product();
        $product->cod = intval($cod);
        $deletedProduct = $product->destroy();

        if(is_string($deletedProduct)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $deletedProduct
            ]);
        }

        Response::json(data: [
            "message" => $deletedProduct,
        ]);

    }

}