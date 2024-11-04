<?php


use MatthiasMullie\Minify;

require("vendor/autoload.php");

  $minifier = new Minify\JS("requests/Configuracoes.js");
  $minifier->add("requests/DepositarLevantar.js");
  $minifier->add("requests/Enviar.js");
  $minifier->add("requests/Estatistica.js");
  $minifier->add("requests/Inicio.js");
  $minifier->add("requests/Pendentes.js");
  $minifier->add("requests/Perfil.js");
  $minifier->add("requests/Receber.js");
  $minifier->add("requests/Recorrentes.js");
  $minifier->add("requests/Transacoes.js");
  //$minifier->minify('/target/path.js');

   // save minified file to disk
    $minifiedPath = 'requests.js';
    $minifier->minify($minifiedPath);
    
    // or just output the content
    echo $minifier->minify();