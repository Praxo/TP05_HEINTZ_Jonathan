<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
  'host' => 'ec2-63-35-156-160.eu-west-1.compute.amazonaws.com',
  'driver' => 'pdo_pgsql',
  'user' => 'dlseshxtepkxod',
  'password' => '850d1d7349ffd41f52ec15cf4793175d7d0d36b1b024eb2c6bfef1c3ef5055f8',
  'dbname' => 'd63chfr1d3eanq',
  'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);
