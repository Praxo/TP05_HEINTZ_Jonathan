<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
use LDAP\Result;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__  . '/../bootstrap.php';

const JWT_SECRET = "ezJWTSECRET";

$app = AppFactory::create();

function addHeaders(Response $response): Response
{
  return $response->withHeader("Content-Type", "application/json")
    ->withHeader('Access-Control-Allow-Origin', ('https://tp05-jonathan.herokuapp.com/catalogue'))
    ->withHeader('Access-Control-Headers', 'Content-Type, Authorization')
    ->withHeader('Access-Control-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers', 'Authorization');
}

$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
  $array = [];
  $array["nom"] = $args['name'];
  $response->getBody()->write(json_encode($array));
  return $response;
});


$app->get('/api/user', function (Request $request, Response $response, $args) {
  $data = array('nom' => 'toto', 'prenom' => 'titi', 'adresse' => '5 rue de la pierre', 'tel' => '0600000000');
  $response->getBody()->write(json_encode($data));

  return $response;
});

$app->get(
  '/api/catalogue',
  function (Request $request, Response $response) {
    global $entityManager;

    $em = $entityManager->getRepository('Pizza');
    $allPizza = $em->findAll();

    $listPizza = array();
    foreach ($allPizza as $pizza) {
      $listPizza[] = array(
        "idPizza" => $pizza->getIdPizza(),
        "nom" => $pizza->getNom(),
        "prix" => $pizza->getPrix(),
        "description" => $pizza->getDescription(),
        "type" => $pizza->getType(),
        "imgUrl" => $pizza->getImgUrl(),
          "quantity" => 0
      );
    }

    $response = addHeaders($response);
    $response->getBody()->write(json_encode($listPizza));

    return $response;
  }
);

$app->get(
  '/api/catalogue/{idPizza}',
  function (Request $request, Response $response, $args) {
    global $entityManager;

    $id = intval($args['idPizza']);

    $em = $entityManager->getRepository('Pizza');
    $pizza = $em->find('Pizza', $id);

    if ($pizza === null) {
      $response = $response->withStatus(500);
      echo 'pas trouvé';
    } else {
      $pizza = array(
        "idPizza" => $pizza->getIdPizza(),
        "prix" => $pizza->getPrix(),
        "description" => $pizza->getDescription(),
        "type" => $pizza->getType(),
        "imgUrl" => $pizza->getImgUrl()
      );
      $response->getBody()->write(json_encode($pizza));
    }
    return $response;
  }
);

// APi d'authentification générant un JWT
$app->post('/api/login', function (Request $request, Response $response, $args) {
  global $entityManager;
  $err = false;
  $body = $request->getParsedBody();
  $login = $body['login'] ?? "";
  $password = $body['password'] ?? "";

  if (!preg_match("/[a-zA-Z0-9]{1,20}/", $login)) {
    $err = true;
  }
  if (!preg_match("/[a-zA-Z0-9]{1,20}/", $password)) {
    $err = true;
  }
  
  if (!$err) {
    $clientRepository = $entityManager->getRepository('Client');
    $client = $clientRepository->findOneBy(array('login' => $login, 'password' => $password));

    if ($client && $login == $client->getLogin() and $password == $client->getPassword()) {
      $response = addHeaders($response);
      $token = createJwT($response);
      $data = array('nom' => $client->getNom(), 'prenom' => $client->getPrenom(), 'token' => $token);
      $response->getBody()->write(json_encode($data));
      $response = $response->withHeader("Authorization", "Bearer {$token}");
    } else {
      $response = $response->withStatus(401);
    }
  } else {
    $response = $response->withStatus(401);
  }

  return $response;
});

$app->post('/api/signup', function (Request $request, Response $response) {
  global $entityManager;
  $body = $request->getParsedBody();

  var_dump($body);

  $login = $body['login'] ?? "";
  $password = $body['password'] ?? "";
  $email = $body['email'] ?? "";
  // $prenom = $body['prenom'] ?? "";
  // $nom = $body['nom'] ?? "";
  // $adresse = $body['adresse'] ?? "";
  // $ville = $body['ville'] ?? "";
  // $codepostal = $body['codepostal'] ?? "";
  // $pays = $body['pays'] ?? "";
  // $telephone = $body['telephone'] ?? "";
  // $civilite = $body['civilite'] ?? "";

  $client = new Client();
  $client->setLogin($login);
  $client->setPassword($password);
  $client->setEmail($email);
  // $client->setPrenom($prenom);
  // $client->setNom($nom);
  // $client->setAdresse($adresse);
  // $client->setCodePostal($codepostal);
  // $client->setVille($ville);
  // $client->setPays($pays);
  // $client->setTelephone($telephone);
  // $client->setCivilite($civilite);

  $entityManager->persist($client);
  $entityManager->flush();

  $user = [];
  $user["login"] = $client->getLogin();

  $response->getBody()->write(json_encode($user));
  return addHeaders($response);
});

function createJwt(Response $response){
  $issuedAt = time();
  $expirationTime = $issuedAt + 600;
  $payload = array(
    'userid' => 'toto',
    'email' => 'toto@gmail.com',
    'pseudo' => 'totoPseudo',
    'iat' => $issuedAt,
    'exp' => $expirationTime
  );

  $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");

  return $token_jwt; 
  // $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
  // return $response;
}

$options = [
  "attribute" => "token",
  "header" => "Authorization",
  "regexp" => "/Bearer\s+(.*)$/i",
  "secure" => false,
  "algorithm" => ["HS256"],
  "secret" => JWT_SECRET,
  "path" => ["/api"],
  "ignore" => ["/api/hello", "/api/login", "/api/signup", "/api/catalogue", "/api/catalogue/{idPizza}"],
  "error" => function ($response, $arguments) {
    $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
    $response = $response->withStatus(401);
    return $response->withHeader(
      "Content-Type",
      "application/json"
    )->getBody()->write(json_encode($data));
  }
];


$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run();
