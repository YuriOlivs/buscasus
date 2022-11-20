<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../../Connection.php';
$connection = new Connection;
$conn = $connection->connect();

if (isset($_GET['search']) && !isset($_GET['todayDuty'])) {
    $search = $_GET['search'];
    $idHospital = @$_GET['idHospital'];

    $sql = "SELECT p.idPlantao, DATE_FORMAT(p.dataPlantao, '%d/%m/%Y') AS dataPlantao, DATE_FORMAT(p.inicioPlantao, '%H:%i') AS inicioPlantao, DATE_FORMAT(p.fimPlantao,'%H:%i') AS fimPlantao, m.nomeMedico, m.idMedico 
    FROM tbPlantao p
    INNER JOIN tbMedico m
    ON p.idMedico = m.idMedico
    WHERE m.nomeMedico LIKE '%$search%' AND p.idHospital = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $idHospital);
    $stmt->execute();
    $plantao = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($plantao);

} else if (isset($_GET['hospitalCount'])) {
    
    $idHospital = @$_GET['idHospital'];

    $sql = "SELECT COUNT(idPlantao) AS idPlantao FROM tbPlantao WHERE idHospital = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $idHospital);
    $stmt->execute();
    $plantao = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($plantao);

} else if (isset($_GET['todayDuty']) && !isset($_GET['search'])) {
    $idHospital = @$_GET['idHospital'];

    $sql = "SELECT p.idPlantao, DATE_FORMAT(p.dataPlantao, '%d/%m/%Y') AS dataPlantao, DATE_FORMAT(p.inicioPlantao, '%H:%i') AS inicioPlantao, DATE_FORMAT(p.fimPlantao,'%H:%i') AS fimPlantao, p.presencaMedico, m.nomeMedico, m.idMedico
    FROM tbPlantao p
    INNER JOIN tbMedico m
    ON p.idMedico = m.idMedico
    WHERE p.idHospital = :id AND DATE(p.dataPlantao) = CURDATE()";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $idHospital);
    $stmt->execute();
    $plantao = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($plantao);

} else if (isset($_GET['search']) && isset($_GET['todayDuty'])) {

    $search = $_GET['search'];
    $idHospital = @$_GET['idHospital'];

    $sql = "SELECT p.idPlantao, DATE_FORMAT(p.dataPlantao, '%d/%m/%Y') AS dataPlantao, DATE_FORMAT(p.inicioPlantao, '%H:%i') AS inicioPlantao, DATE_FORMAT(p.fimPlantao,'%H:%i') AS fimPlantao, p.presencaMedico, m.nomeMedico, m.idMedico
    FROM tbPlantao p
    INNER JOIN tbMedico m
    ON p.idMedico = m.idMedico
    WHERE m.nomeMedico LIKE '%$search%' AND p.idHospital = :id AND DATE(p.dataPlantao) = CURDATE()";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $idHospital);
    $stmt->execute();
    $plantao = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($plantao);

} else if (isset($_GET['idEspecialidade'])) {
    
    $idEspecialidade = $_GET['idEspecialidade'];
    $idHospital = $_GET['idHospital'];
    
    if ($idEspecialidade == 1){
        $sql = "SELECT idMedico, nomeMedico FROM tbMedico";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $medico = $stmt->fetchAll(PDO::FETCH_ASSOC);

    } else {

        $sql = "SELECT m.idMedico, m.nomeMedico FROM tbMedico m
        INNER JOIN tbMedicoEspecialidade me
        ON m.idMedico = me.idMedico
        INNER JOIN tbEspecialidade e
        ON e.idEspecialidade = me.idEspecialidade
        WHERE e.idEspecialidade = :idEspecialidade AND m.idHospital = :idHospital";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idEspecialidade', $idEspecialidade);
        $stmt->bindParam(':idHospital', $idHospital);
        $stmt->execute();
        $medico = $stmt->fetchAll(PDO::FETCH_ASSOC);

    }
    
    echo json_encode($medico);

 } else {

    $idHospital = @$_GET['idHospital'];

    $sql = "SELECT p.idPlantao, DATE_FORMAT(p.dataPlantao, '%d/%m/%Y') AS dataPlantao, DATE_FORMAT(p.inicioPlantao, '%H:%i') AS inicioPlantao, DATE_FORMAT(p.fimPlantao,'%H:%i') AS fimPlantao, m.nomeMedico, m.idMedico
    FROM tbPlantao p
    INNER JOIN tbMedico m
    ON p.idMedico = m.idMedico
    WHERE p.idHospital = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $idHospital);
    $stmt->execute();
    $plantao = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($plantao);
}

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        $datasPlantao = $_POST['dataPlantao'];
        $inicioPlantao = $_POST['inicioPlantao'];
        $fimPlantao = $_POST['fimPlantao'];
        $idEspecialidade = $_POST['idEspecialidade'];
        $idMedico = $_POST['idMedico'];
        $idHospital = $_POST['idHospital'];

        for ($i = 0; $i < $datasPlantao; $i++) {
            $sql = "INSERT INTO tbPlantao(idPlantao, dataPlantao, inicioPlantao, fimPlantao, idEspecialidade, idMedico, idHospital) VALUES(null, :dataPlantao, :inicioPlantao, :fimPlantao, :idEspecialidade, :idMedico, :idHospital)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':dataPlantao', $datasPlantao[$i]);
            $stmt->bindParam(':inicioPlantao', $inicioPlantao);
            $stmt->bindParam(':fimPlantao', $fimPlantao);
            $stmt->bindParam(':idEspecialidade', $idEspecialidade);
            $stmt->bindParam(':idMedico', $idMedico);
            $stmt->bindParam(':idHospital', $idHospital);
            $stmt->execute();
        }
        break;

    case "PUT":
        $idPlantao = $_GET['idPlantao'];
        $presencaMedico = $_GET['presencaMedico'];

        $sql = "UPDATE tbPlantao SET presencaMedico = $presencaMedico WHERE idPlantao = $idPlantao";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        break;

    case "DELETE":
        $idPlantao = $_GET['idPlantao'];

        $sql = "DELETE FROM tbPlantao WHERE idPlantao = :idPlantao";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idPlantao', $idPlantao);
        $stmt->execute();
        break;
}

?>