<?php

namespace App\Models;

use App\Core\Database;
use ErrorException;
use PDO;
use PDOException;

class User
{
    public int $id;
    public string $name;
    public string $email;
    public string $cpf;
    public string|null $address;
    public string|null $city;
    public string|null $uf;
    public string $password;
    public int $type;


    public function findAll()
    {
        try {
            $sql = " SELECT * FROM users where type != 1";

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
            $sql = " SELECT * FROM users where id = ?";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();

            return $db->fetch(PDO::FETCH_OBJ);

        } catch (PDOException $exception) {
            return $exception->getMessage();
        }

    }

    public function findByEmail()
    {
        try {
            $sql = " SELECT * FROM users where email = ?";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->email);
            $db->execute();

            return $db->fetch(PDO::FETCH_OBJ);
        } catch (PDOException $exception) {
            return $exception->getMessage();
        }

    }

    public function store(): bool|string
    {
        try {
            $sql = "INSERT INTO users (name, email, cpf, address, city, uf, password) VALUE (?, ?, ?, ?, ?, ?, ?);";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->name);
            $db->bindValue(2, $this->email);
            $db->bindValue(3, $this->cpf);
            $db->bindValue(4, $this->address);
            $db->bindValue(5, $this->city);
            $db->bindValue(6, $this->uf);
            $db->bindValue(7, $this->password);

            $db->execute();
            $this->id = Database::connect()->lastInsertId();
            return true;
        } catch (PDOException $e) {
            $messageError = $e->getMessage();

            if(!strpos($messageError, "Duplicate entry"))
                return $messageError;

            $pattern = "/for key 'users.(.*?)'/";
            preg_match($pattern, $messageError, $match);
            $keyName = $match[1];

            return "Já existe usuário com esse $keyName cadastrado";
        }




    }

    public function update(): bool|string
    {
        try {
            $sql =
                "UPDATE users SET name=?, email=?, cpf=?, address=?, city=?, uf=?
                    WHERE id = ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->name);
            $db->bindValue(2, $this->email);
            $db->bindValue(3, $this->cpf);
            $db->bindValue(4, $this->address);
            $db->bindValue(5, $this->city);
            $db->bindValue(6, $this->uf);
            $db->bindValue(7, $this->id);
            $db->execute();

            return true;
        } catch (PDOException $exception) {
            $messageError = $exception->getMessage();

            if (!strpos($messageError, "Duplicate entry"))
                return $messageError;

            $pattern = "/for key 'users.(.*?)'/";
            preg_match($pattern, $messageError, $match);
            $keyName = $match[1];

            return "Já existe usuário com esse $keyName cadastrado";

        }
    }

    public function destroy()
    {
        try {
            if(!self::findById())
                return 'user not found';

            $sql = "DELETE FROM users WHERE id= ? ;";

            $db = Database::connect()->prepare($sql);
            $db->bindValue(1, $this->id);
            $db->execute();
            return true;
        } catch (PDOException $exception) {
            return $exception->getMessage();
        }
    }
}