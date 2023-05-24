<?php
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();
echo "in \n";
echo $_ENV['TESTAVAR'];
echo "\n 2 \n";
echo $_ENV['TEST_VAR'];
echo "\n no cras \n";
?>
