var corrida = false;
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const vaiTela = (route) => {
    window.history.pushState({}, "", route);
    handleLocation();
}

const routes = {
    404: "/pages/404.html",
    "/": "/pages/inicio.html",
    "/home": "/pages/home.html",
    "/enviar": "/pages/enviar.html",
    "/receber": "/pages/receber.html",
    "/pagamentos": "/pages/pagamentos.html",
    "/servico": "/pages/servico.html",
    "/entidade": "/pages/entidade.html",
    "/estatistica": "/pages/estatistica.html",
    "/transacoes": "/pages/transacoes.html",
    "/iban": "/pages/iban.html",
    "/pendentes": "/pages/pendentes.html",
    "/recorrentes": "/pages/recorrentes.html",
    "/depositarlevantar": "/pages/depositarlevantar.html",
    "/configuracoes": "/pages/configuracoes.html",
    "/bloqueio": "/pages/bloqueio.html",
    "/pin": "/pages/pin.html",
    "/receberauto": "/pages/receberauto.html",
    "/termosprivacidade": "/pages/termosprivacidade.html",
    "/privacidade": "/pages/privacidade.html",
    "/termos": "/pages/termos.html",
    "/perguntas": "/pages/perguntas.html",
    "/apoio": "/pages/apoio.html",
    "/perfil": "/pages/perfil.html",


    "/inicio": "/pages/inicio.html",
    "/login01": "/pages/login01.html",
    "/login02": "/pages/login02.html",
    "/criarconta": "/pages/criarconta.html",
    "/criarindividual": "/pages/criarindividual.html",
    "/criarempresa": "/pages/criarempresa.html",
    "/inicioconfirmar": "/pages/inicioconfirmar.html",
    "/criarpin": "/pages/criarpin.html",
    "/recuperarconta": "/pages/recuperarconta.html",
    "/recuperarpin": "/pages/recuperarpin.html",

    "/trm": "/pages/recuperarpin.html",
    "/prv": "/pages/recuperarpin.html"
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    
    const route = routes[path] || routes[404];
    const html = await fetch(route).then(function(data){
        var res = data.text();
        res.then(function(ui){
            document.querySelector(".corpo").innerHTML = ui;
            
            

            if (path == "/inicio" || path == "/login01" || path == "/login02" || path == "/criarconta" || path == "/criarindividual" || path == "/criarempresa" || path == "/inicioconfirmar" || path == "/criarpin" || path == "/recuperarconta" || path == "/recuperarpin" || path == "/trm" || path == "/prv") {
                menu.fechar();
            }else{
                menu.abrir();
            }




            if (path == "/") {
                db.verificaToken();
                setTimeout(function () {
                    loader.abrir();
                }, 1000);
            }
            if (path == "/pendentes") {
                loader.abrir();
                
                setTimeout(function () {
                    PendentesRequests.pendentes();

                }, 1000);
            }
            if (path == "/iban") {
                loader.abrir();
                
                setTimeout(function () {
                    IbanRequests.contas();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/recorrentes") {
                loader.abrir();
                
                setTimeout(function () {
                    RecorrentesRequests.recorrentes();
                }, 1000);
            }
            if (path == "/depositarlevantar") {
                loader.abrir();
                
                setTimeout(function () {
                    DepositarLevantarRequests.init();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/configuracoes") {
                loader.abrir();
                
                setTimeout(function () {
                    //RecorrentesRequests.recorrentes();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/bloqueio") {
                loader.abrir();
                
                setTimeout(function () {
                    ConfiguracoesRequests.init();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/pin") {
                loader.abrir();
                
                setTimeout(function () {
                     $('.preview').prevue();
                     $(function () {
                        $(".preview").on('input', function (e) {
                            $(this).val($(this).val().replace(/[^0-9]/g, ''));
                        });
                    });
                    loader.fechar();
                }, 1000);
            }
            if (path == "/receberauto") {
                loader.abrir();
                
                setTimeout(function () {
                    //RecorrentesRequests.recorrentes();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/termosprivacidade") {
                loader.abrir();
                setTimeout(function () {
                    loader.fechar();
                }, 1000);
            }
            if (path == "/privacidade") {
                loader.abrir();
                setTimeout(function () {
                    loader.fechar();
                }, 1000);
            }
            if (path == "/termos") {
                loader.abrir();
                setTimeout(function () {
                    loader.fechar();
                }, 1000);
            }
            if (path == "/perguntas") {
                loader.abrir();
                setTimeout(function () {
                    loader.fechar();
                }, 1000);
            }
            if (path == "/perfil") {
                loader.abrir();
                setTimeout(function () {
                    PerfilRequests.init();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/home") {
                loader.abrir();
                menu.abrir(); 
                setTimeout(function () {

                    

                    loader.fechar();
                }, 1000);
            }
            if (path == "/enviar") {
                loader.abrir();
                
                setTimeout(function () {
                    
                    EnviarRequests.init()
                    loader.fechar();
                }, 1000);
            }
            if (path == "/receber") {
                loader.abrir();
                
                setTimeout(function () {
                    ReceberRequests.init()
                    loader.fechar();
                }, 1000);
            }
            if (path == "/pagamentos") {
                loader.abrir();
                
                setTimeout(function () {

                    loader.fechar();
                }, 1000);
            }
            if (path == "/servico") {
                loader.abrir();
                
                setTimeout(function () {
                    PagamentosRequests.verServico();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/entidade") {
                
                
                setTimeout(function () {
                    PagamentosRequests.verEntidade();
                    loader.fechar();
                }, 1000);
            }
            if (path == "/estatistica") {
                loader.abrir();
                
                setTimeout(function () {
                    EstatisticaRequests.init()
                    loader.fechar();
                }, 1000);
            }
            if (path == "/transacoes") {
                loader.abrir();
                
                setTimeout(function () {
                    TransacoesRequests.init();
                    TransacoesRequests.transacoes();
                    loader.fechar();
                }, 1000);
            }

           


            if (path == "/inicio") {
                loader.abrir();
                setTimeout(function () {
                    InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/login01") {
                loader.abrir();
                setTimeout(function () {
                    $('.preview').prevue();
                     $(function () {
                        $(".preview").on('input', function (e) {
                            $(this).val($(this).val().replace(/[^0-9]/g, ''));
                        });
                    });
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/login02") {
                loader.abrir();
                setTimeout(function () {
                    $('.preview').prevue();
                     $(function () {
                        $(".preview").on('input', function (e) {
                            $(this).val($(this).val().replace(/[^0-9]/g, ''));
                        });
                    });
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/criarconta") {
                loader.abrir();
                setTimeout(function () {
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/criarindividual") {
                loader.abrir();
                setTimeout(function () {
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/criarempresa") {
                loader.abrir();
                setTimeout(function () {
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/inicioconfirmar") {
                loader.abrir();
                setTimeout(function () {
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/criarpin") {
                loader.abrir();
                setTimeout(function () {
                    //InicioRequests.slide();
                    $('.preview').prevue();
                     $(function () {
                        $(".preview").on('input', function (e) {
                            $(this).val($(this).val().replace(/[^0-9]/g, ''));
                        });
                    });
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/recuperarconta") {
                loader.abrir();
                setTimeout(function () {
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/recuperarpin") {
                loader.abrir();
                setTimeout(function () {
                    $('.preview').prevue();
                     $(function () {
                        $(".preview").on('input', function (e) {
                            $(this).val($(this).val().replace(/[^0-9]/g, ''));
                        });
                    });
                    //InicioRequests.slide();
                    loader.fechar();
                }, 1000);
                
            }
        })
    })
    

}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();