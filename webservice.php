<?php

//sleep(5);
//echo 'Resposta do servidor';
if (empty($_POST['b']) || strlen($_POST['b']) < 4)
    die(json_encode(
        array(
            'sucesso' => false,
            'erros' => array(
                'Termo da busca deve ter no mínimo 4 caracteres.'
            )
        )
    ));

try {
    if (isset($_POST['pg']) && ctype_digit($_POST['pg']))
        $pagina = (int) $_POST['pg'];
    else
        $pagina = 1;

    $termoBusca = $_POST['b'];
    $limite = 20;

    $pdo = new \PDO(
        'mysql:host=localhost;dbname=teste',
        'root', '...',
        array(
            \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            \PDO::ATTR_EMULATE_PREPARES => false,
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_ORACLE_NULLS => \PDO::NULL_EMPTY_STRING
        )
    );

    $pgStmt = $pdo->prepare("SELECT COUNT(*) AS `cont` FROM `clientes` WHERE `ClNome` LIKE :clnome;");
    $pgStmt->bindValue(':clnome', '%'.$termoBusca.'%');
    $pgStmt->execute();
    $paginas = $pgStmt->fetch(\PDO::FETCH_ASSOC);
    $paginas = ceil($paginas['cont']/$limite);
    if ($pagina > $paginas)
        throw new \Exception('Página inexistente.');

    $stmt = $pdo->prepare("SELECT * FROM `clientes` WHERE `ClNome` LIKE :clnome ORDER BY `ClNome` LIMIT :limite OFFSET :pagina;");
    $stmt->bindValue(':clnome', '%'.$termoBusca.'%');
    $stmt->bindValue(':limite', $limite);
    $stmt->bindValue(':pagina', ($pagina-1)*$limite, \PDO::PARAM_INT);
    $stmt->execute();
    $resp = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    echo json_encode(
        array(
            'sucesso' => true,
            'resultado' => array(
                'paginas' => $paginas,
                'dados' => $resp
            )
        )
    );
} catch (\Exception $e) {
    echo json_encode(
        array(
            'sucesso' => false,
            'erros' => array(
                $e->getMessage()
            )
        )
    );
} catch (\PDOException $e) {
    echo json_encode(
        array(
            'sucesso' => false,
            'erros' => array(
                $e->getMessage()
            )
        )
    );
}
