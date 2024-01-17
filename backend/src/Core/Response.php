<?php

namespace App\Core;

class Response
{
    public static function json($status = 200, $data = null): void
    {
        http_response_code($status);
        echo json_encode([
            'data' => $data
        ], JSON_PRETTY_PRINT);
        exit;
    }

    public static function notFoundRoute (): void
    {
        Response::json(404, data: [ 'message ' => 'not found']);
    }
}