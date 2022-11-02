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
        $sql = "SELECT * FROM tbPlantao";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[5]) && is_numeric($path[5])) {
            $sql = " SELECT p.idPlantao, DATE_FORMAT(p.dataPlantao, '%d/%m/%Y') AS dataPlantao, DATE_FORMAT(p.inicioPlantao, '%H:%i') AS inicioPlantao, DATE_FORMAT(p.fimPlantao,'%H:%i') AS fimPlantao ,m.nomeMedico, m.idMedico 
            FROM tbPlantao p
            INNER JOIN tbMedico m
            ON p.idMedico = m.idMedico
            WHERE p.idHospital = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $plantao = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $plantao = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($plantao);
        break;

    case "POST":
        $dataPlantao = $_POST['dataPlantao'];
        $inicioPlantao = $_POST['inicioPlantao'];
        $fimPlantao = $_POST['fimPlantao'];
        $idEspecialidade = $_POST['idEspecialidade'];
        $idMedico = $_POST['idMedico'];
        $idHospital = $_POST['idHospital'];
        
        $sql = "INSERT INTO tbPlantao(idPlantao, dataPlantao, inicioPlantao, fimPlantao, idEspecialidade, idMedico, idHospital) VALUES(null, :dataPlantao, :inicioPlantao, :fimPlantao, :idEspecialidade, :idMedico, :idHospital)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':dataPlantao', $dataPlantao);
        $stmt->bindParam(':inicioPlantao', $inicioPlantao);
        $stmt->bindParam(':fimPlantao', $fimPlantao);
        $stmt->bindParam(':idEspecialidade', $idEspecialidade);
        $stmt->bindParam(':idMedico', $idMedico);
        $stmt->bindParam(':idHospital', $idHospital);
        $stmt->execute();
        break;

    case "PUT":
        $idPlantao = $_GET['idPlantao'];
        $dataPlantao = $_GET['dataPlantao'];
        $inicioPlantao = $_GET['inicioPlantao'];
        $fimPlantao = $_GET['fimPlantao'];
        $idEspecialidade = $_GET['idEspecialidade'];
        $idMedico = $_GET['idMedico'];

        $sql = "UPDATE tbPlantao SET dataPlantao= :dataPlantao, inicioPlantao = :inicioPlantao, fimPlantao = :fimPlantao, idEspecialidade = :idEspecialidade, idMedico = :idMedico WHERE idPlantao = :idPlantao";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idPlantao', $idPlantao);
        $stmt->bindParam(':dataPlantao', $dataPlantao);
        $stmt->bindParam(':inicioPlantao', $inicioPlantao);
        $stmt->bindParam(':fimPlantao', $fimPlantao);
        $stmt->bindParam(':idEspecialidade', $idEspecialidade);
        $stmt->bindParam(':idMedico', $idMedico);
        $stmt->execute();
        break;

    case "DELETE":
        $sql = "DELETE FROM tbPlantao WHERE idPlantao = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        break;
}
?>