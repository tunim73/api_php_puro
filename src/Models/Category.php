<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use PDOException;

class Category
{
    public int $id;
    public string $name;


    public function findAll()
    {
        try {
            $sql = " SELECT * FROM categories";

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
            $sql = " SELECT * FROM categories where id = ?";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();
            return $db->fetch(PDO::FETCH_OBJ);
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
        } catch (PDOException $exception) {
            return $exception->getMessage();
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
                return 'user not found';

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