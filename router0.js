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

const handleLocation = async () => {
    loader.abrir();
    const path = window.location.pathname;
    const hash = window.location.hash;

    const ui = UI_PAGES[path] || UI_PAGES[404];

    document.querySelector(".corpo").innerHTML = ui;

    if (path == "/inicio" || path == "/login01" || path == "/login02" || path == "/criarconta" || path == "/criarindividual" || path == "/criarempresa" || path == "/inicioconfirmar" || path == "/criarpin" || path == "/recuperarconta" || path == "/recuperarpin" || path == "/trm" || path == "/prv") {
        menu.fechar();
    } else {
        menu.abrir();
    }

    if (path == "/") {
        db.verificaToken();
        setTimeout(function () {
            db.verificaToken();
        }, 1000);
    }
    if (path == "/pendentes") {

        PendentesRequests.pendentes();
    }
    if (path == "/recorrentes") {

        RecorrentesRequests.recorrentes();
    }
    if (path == "/depositarlevantar") {

        DepositarLevantarRequests.init();
    }
    if (path == "/configuracoes") {

    }
    if (path == "/bloqueio") {

        ConfiguracoesRequests.init();

    }
    if (path == "/pin") {

        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });
    }

    if (path == "/termosprivacidade") {

    }
    if (path == "/privacidade") {

    }
    if (path == "/termos") {

    }
    if (path == "/perguntas") {

    }
    if (path == "/perfil") {

    }
    if (path == "/home") {

        menu.abrir();
        
    }
    if (path == "/enviar") {


        EnviarRequests.init()
    }
    if (path == "/receber") {

        ReceberRequests.init()
    }
    if (path == "/pagamentos") {

    }
    if (path == "/servico") {

        PagamentosRequests.verServico();
    }
    if (path == "/entidade") {
        PagamentosRequests.verEntidade();
    }
    if (path == "/estatistica") {

        EstatisticaRequests.init()
    }
    if (path == "/transacoes") {

        TransacoesRequests.init();
        TransacoesRequests.transacoes();
    }




    if (path == "/inicio") {
        
        InicioRequests.slide();
        
    }
    if (path == "/login01") {

        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });

    }
    if (path == "/login02") {

        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });

    }
    if (path == "/criarconta") {


    }
    if (path == "/criarindividual") {


    }
    if (path == "/criarempresa") {


    }
    if (path == "/inicioconfirmar") {


    }
    if (path == "/criarpin") {



    }
    if (path == "/recuperarconta") {


    }
    if (path == "/recuperarpin") {
        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });
    }
    setTimeout(function () {
        loader.fechar();
    }, 1000);
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();