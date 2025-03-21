<?php


use MatthiasMullie\Minify;

require("vendor/autoload.php");

  //COMEÇA FAZENDO A MINIFICACAO DOS REQUESTS
 $minifier = new Minify\JS("requests/Configuracoes.js");
  $minifier->add("requests/Depositar.js");
  $minifier->add("requests/DepositarLevantar.js");
  $minifier->add("requests/Enviar.js");
  $minifier->add("requests/Estatistica.js");
  $minifier->add("requests/Inicio.js");
  $minifier->add("requests/Levantar.js");
  $minifier->add("requests/LevantarSemCartao.js");
  $minifier->add("requests/Pagamentos.js");
  $minifier->add("requests/Pendentes.js");
  $minifier->add("requests/Perfil.js");
  $minifier->add("requests/Recorrentes.js");
  $minifier->add("requests/Transacoes.js");
  $minifiedPath = '_DEPLOY/requests.js';
  $minifier->minify($minifiedPath); 
  //TERMINA MINIFICACAO DOS REQUESTS


  //COMEÇA FAZENDO A MINIFICACAO DOS COMPONENTES
/*   $minifier = new Minify\JS("components/menu/menu.js");
  $minifier->add("components/header/header.js");
  $minifier->add("components/logo_pequeno/logoPequeno.js");
  $minifier->add("components/notificacao/notificacao.js");
  $minifier->add("components/slideImg/slideImg.js");
  $minifier->add("components/voltar/voltar.js");
  $minifier->add("components/transacao/transacao.js");
  $minifier->add("components/loader/loader.js");
  $minifier->add("components/saldo/saldo.js");
  $minifiedPath = 'components.js';
  $minifier->minify($minifiedPath); */
  //TERMINA MINIFICACAO DOS COMPONENTES

 /*  $minifier = new Minify\JS("rq.js");
  $minifiedPath = 'producao.js';
  $minifier->minify($minifiedPath);
  echo $minifier->minify(); */