<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../../Connection.php';
$connection = new Connection;
$conn = $connection->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM tbAdmin";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[5]) && is_numeric($path[5])) {
            $sql .= " WHERE idHospital = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $admin = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $admin = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($admin);
        break;

    case "POST":
        $loginAdmin = $_POST['loginAdmin'];
        $senhaAdmin = $_POST['senhaAdmin'];
        $tipoAdmin = '0';
        $idHospital = $_POST['idHospital'];
        
        $sql = "INSERT INTO tbAdmin(idAdmin, loginAdmin, senhaAdmin, tipoAdmin, idHospital) VALUES(null, :loginAdmin, :senhaAdmin, :tipoAdmin, :idHospital)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':loginAdmin', $loginAdmin);
        $stmt->bindParam(':senhaAdmin', $senhaAdmin);
        $stmt->bindParam(':tipoAdmin', $tipoAdmin);
        $stmt->bindParam(':idHospital', $idHospital);
        $stmt->execute();
        break;

    case "PUT":
        $senhaAdmin = $_GET['senhaAdmin'];
        $idAdmin = $_GET['idAdmin'];
        
        $sql = "UPDATE tbAdmin SET senhaAdmin =:senhaAdmin WHERE idAdmin =:idAdmin";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':senhaAdmin', $senhaAdmin);
        $stmt->bindParam(':idAdmin', $idAdmin);
        $stmt->execute();
        break;

    case "DELETE":
        $sql = "DELETE FROM tbAdmin WHERE idAdmin = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        break;
}
?>