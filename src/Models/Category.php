<?php

namespace App\Models;

use App\Core\Database;
use App\Core\Response;
use PDO;
use PDOException;

class Category
{
    public int $id;
    public string $name;


    public function findAll()
    {
        try {
            $sql = "SELECT c.id AS id, c.name AS name, COUNT(p.cod) AS count 
FROM categories c LEFT JOIN products p ON c.id = p.categoryID GROUP BY c.id, c.name;";

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
            $sql = " SELECT * FROM categories WHERE id = ?;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();

            return $db->fetch(PDO::FETCH_OBJ);
        }catch (PDOException $exception) {
            return $exception->getMessage();
        }
    }

    public function findProductByCategory(): bool|array|string
    {
        try {
            $sql = "
SELECT p.*, c.name as categoryName
 FROM categories c 
     JOIN products p on c.id = p.categoryId 
 WHERE categoryId = ?;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();

            if ($db->rowCount() < 1) {
                return [];
            }

            return $db->fetchAll(PDO::FETCH_OBJ);
        }catch (PDOException $exception) {
            return $exception->getMessage();
        }

    }

    public function store(): bool|string
    {
        try {
            $sql = "INSERT INTO categories (name) VALUE (?);";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->name);

            $db->execute();
            $this->id = Database::connect()->lastInsertId();
            return true;
        } catch (PDOException $e) {
            $messageError = $e->getMessage();

            if(!strpos($messageError, "Duplicate entry"))
                return $messageError;

            $pattern = "/for key 'categories.(.*?)'/";
            preg_match($pattern, $messageError, $match);
            $keyName = $match[1];

            return "Já existe categoria com esse $keyName cadastrada";
        }




    }

    public function update(): bool|string
    {
        try {
            $sql =
                "UPDATE categories SET name=?
                    WHERE id = ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->name);
            $db->bindValue(2, $this->id);
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
                return 'category not found';

                $sql = "DELETE FROM categories WHERE id= ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();
            return true;
        } catch (PDOException $exception) {
            return $exception->getMessage();

        }
    }


}