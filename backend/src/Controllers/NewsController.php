<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Models\News;

class NewsController
{
    public function store(): void
    {
        $body = Request::getBody();

        $news = new News();

        $news->title = $body->title;
        $news->summary = $body->summary;
        $news->image =  $body->image;
        $news->content = $body->content;
        $news->highlight = $body->highlight;

        $newNews = $news->store();

        if(is_string($newNews)){
            Response::json( status: 409, data: [
                'error' => true,
                'message' => $newNews
            ]);
        }

        Response::json( 201 ,[
            "message" => $newNews,
            "news" => $news
        ]);

    }

    public function findAll(): void
    {
        $news = new News();
        Response::json(data: $news->findAll());

    }

    public function findById(array $params): void
    {
        $id = $params[0][0];
        $news = new News();
        $news->id = intval($id);
        $result = $news->findById();

        Response::json(data: $result);
    }

    public function update(array $params): void
    {
        $id = $params[0][0];
        $body = Request::getBody();

        $news = new News();

        $news->id = intval($id);
        $news->title = $body->title;
        $news->summary = $body->summary;
        $news->image =  $body->image;
        $news->content = $body->content;
        $news->highlight = $body->highlight;


        $updatedNews = $news->update();

        if(is_string($updatedNews)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $updatedNews
            ]);
        }

        Response::json(data: [
            "message" => $updatedNews,
            "news"=> $news
        ]);

    }

    public function destroy(array $params): void
    {
        $id = $params[0][0];

        $news = new News();
        $news->id = intval($id);
        $deletedNews = $news->destroy();

        if(is_string($deletedNews)){
            Response::json( status: 400, data: [
                'error' => true,
                'message' => $deletedNews
            ]);
        }

        Response::json(data: [
            "message" => $deletedNews,
        ]);

    }

    public function findHighlightNews(): void
    {
        $news = new News();
        Response::json(data: $news->findHighlightNews());

    }

}