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
    //loader.abrir();
    const path = window.location.pathname;
    const hash = window.location.hash;
    ESCOPO.init = true;

    const ui = UI_PAGES[path] || UI_PAGES[404];

    document.querySelectorAll(".modal-backdrop").forEach(function (i) { $(i).hide() });
    document.querySelectorAll(".modal").forEach(function (i) { $(i).hide() });
    if(path == "/inicio"){
        (document.querySelector(".corpo")).innerHTML = (ui);
    }else{
        $(document.querySelector(".corpo")).animate({"opacity":"0"},300,function() {
            $(document.querySelector(".corpo")).html(ui);
        });
    }
    
    $(document.querySelector(".corpo")).animate({"opacity":"1"},300);
    db.verificaSessao();
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
        PerfilRequests.init();
    }
    if (path == "/home") {

        menu.abrir();
        InicioRequests.home();
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
    }




    if (path == "/inicio") {

        InicioRequests.slide();
        setTimeout(function(){
            $("#render").animate({"opacity":"1"},2000);
        },1000);
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
        $(".nome").html((localStorage.getItem("nome")).toUpperCase());
        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });
        ESCOPO.callback = InicioRequests.reLogin;
        ESCOPO.parametro = InicioRequests;
    }
    if (path == "/criarconta") {


    }
    if (path == "/criarindividual") {

        new SlimSelect({
            select: '#genero',
            settings: {
                showSearch: false
            }
        });
        const calendario = dobDatepicker('#nascimento', {
            display_mode: 'inline',
            year_range: 120,
            enable_built_in_validation: true,
            enable_ordinal_number: true,
            show_long_month: true,
            dateFormat: null,
            zIndex: {
                targetNode: "150",
                datepickerWidget: "150",
                invisibleBackground: "100"
            },
            long_month: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            short_month: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            labels: {
                header_label: 'Data de nascimento',
                select_day_label: 'Seleciona o dia',
                select_month_label: 'Seleciona o mês',
                select_year_label: 'Seleciona o ano',
                reset_button_label: 'Apagar e repetir',
                date_range_label: 'Ano '  //label for year section -> "Year 2000 - 2020"
            },
            alerts: {
                invalid_date_alert: 'A data é inválida'
            }
        })

    }
    if (path == "/criarempresa") {
        new SlimSelect({
            select: '#area',
            settings: {
                showSearch: false
            }
        });


    }
    if (path == "/inicioconfirmar") {


    }
    if (path == "/criarpin") {

        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });

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
    /* setTimeout(function () {
        loader.fechar();
    }, 1000); */
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();