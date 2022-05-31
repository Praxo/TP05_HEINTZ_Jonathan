<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';

const JWT_SECRET = "ezJWTSECRET";

$app = AppFactory::create();


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


// APi d'authentification générant un JWT
$app->post('/api/login', function (Request $request, Response $response, $args) {   
  global $entityManager;
  $err=false;
  $body = $request->getParsedBody();
  $login = $body ['login'] ?? "";
  $pass = $body ['pass'] ?? "";

  if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
      $err = true;
  }
  if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
      $err=true;
  }
  if (!$err) {
      $utilisateurRepository = $entityManager->getRepository('Utilisateur');
      $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $pass));
      if ($utilisateur and $login == $utilisateur->getLogin() and $pass == $utilisateur->getPassword()) {
          $response = addHeaders ($response);
          $response = createJwT ($response);
          $data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
          $response->getBody()->write(json_encode($data));
      } else {          
          $response = $response->withStatus(401);
      }
  } else {
      $response = $response->withStatus(401);
  }

  return $response;
});

function createJwt(Response $response): Response
{
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
  $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
  return $response;
}

$options = [
  "attribute" => "token",
  "header" => "Authorization",
  "regexp" => "/Bearer\s+(.*)$/i",
  "secure" => false,
  "algorithm" => ["HS256"],
  "secret" => JWT_SECRET,
  "path" => ["/api"],
  "ignore" => ["/api/hello", "/api/login", "/api/createUser"],
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
