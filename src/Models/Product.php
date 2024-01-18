<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use PDOException;

class Product
{

    public int $cod;
    public string $name;
    public int $status;
    public int $value;
    public int $quantity;
    public string $description;
    public string|null $image;
    public int $userId;
    public int $categoryId;



    public function findAll()
    {
        try {
            $sql = " SELECT * FROM products where status = 1;";

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
            $sql = "SELECT p.*, c.name AS categoryName, u.name AS userName
FROM products p LEFT JOIN categories c ON p.categoryID = c.id
LEFT JOIN users u ON p.userID = u.id
WHERE p.cod = ?;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->cod);
            $db->execute();

            return $db->fetch(PDO::FETCH_OBJ);

        } catch (PDOException $exception) {
            return $exception->getMessage();
        }

    }

    public function store(): bool|string
    {
        try {
            $sql = "
INSERT INTO products (name, value, quantity, description, image, userId, categoryId) 
                    VALUE (?, ?, ?, ?, ?, ?, ?);";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->name);
            $db->bindValue(2, $this->value);
            $db->bindValue(3, $this->quantity);
            $db->bindValue(4, $this->description);
            $db->bindValue(5, $this->image);
            $db->bindValue(6, $this->userId);
            $db->bindValue(7, $this->categoryId);

            $db->execute();
            $this->cod = Database::connect()->lastInsertId();
            return true;
        } catch (PDOException $exception) {
            return $exception->getMessage();

        }




    }

    public function update(): bool|string
    {
        try {
            $sql =
                "UPDATE products SET name=?, value=?, quantity=?, description=?, image=?, categoryId=?
                    WHERE cod = ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->name);
            $db->bindValue(2, $this->value);
            $db->bindValue(3, $this->quantity);
            $db->bindValue(4, $this->description);
            $db->bindValue(5, $this->image);
            $db->bindValue(6, $this->categoryId);
            $db->bindValue(7, $this->cod);
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
                return 'product not found';

            $sql = "DELETE FROM products WHERE cod= ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->cod);
            $db->execute();
            return true;
        } catch (PDOException $exception) {
            return $exception->getMessage();
        }
    }
}