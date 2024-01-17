<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use PDOException;

class News
{

    public int $id;
    public string $title;
    public string $summary;
    public string $image;
    public string|null $content;
    public int $highlight;


    public function findAll()
    {
        try {
            $sql = " SELECT * FROM news;";

            $db = Database::connect()->prepare($sql);

            $db->execute();

            if ($db->rowCount() < 1) {
                return [];
            }

            return $db->fetchAll(PDO::FETCH_OBJ);
        } catch (PDOException $exception) {
            return $exception->getMessage();
        }

    }

    public function findById()
    {
        try {
            $sql = " SELECT * FROM news where id = ?";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();

            return $db->fetch(PDO::FETCH_OBJ);

        } catch (PDOException $exception) {
            return $exception->getMessage();
        }

    }

    public function store(): bool|string
    {
        try {
            $sql = "INSERT INTO news (title, summary, image, content, highlighy) VALUE (?, ?, ?, ?, ?);";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->title);
            $db->bindValue(2, $this->summary);
            $db->bindValue(3, $this->image);
            $db->bindValue(4, $this->content);
            $db->bindValue(5, $this->highlight);

            $db->execute();
            $this->id = Database::connect()->lastInsertId();
            return true;
        } catch (PDOException $exception) {
            return $exception->getMessage();
        }




    }

    public function update(): bool|string
    {
        try {
            $sql =
                "UPDATE news SET title=?, summary=?, image=?, content=?, highlight=?
                    WHERE id = ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->title);
            $db->bindValue(2, $this->summary);
            $db->bindValue(3, $this->image);
            $db->bindValue(4, $this->content);
            $db->bindValue(5, $this->highlight);
            $db->bindValue(6, $this->id);
            $db->execute();

            return true;
        } catch (PDOException $exception) {
            return $exception->getMessage();

        }
    }

    public function destroy()
    {
        try {
            if(!self::findById())
                return 'news not found';

            $sql = "DELETE FROM news WHERE id= ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();
            return true;
        } catch (PDOException $exception) {
            return $exception->getMessage();
        }
    }
}