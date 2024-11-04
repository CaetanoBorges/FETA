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
    const path = window.location.pathname;
    const hash = window.location.hash;
    ESCOPO.init = true;

    const ui = UI_PAGES[path] || UI_PAGES[404];

    document.querySelectorAll(".modal-backdrop").forEach(function (i) { $(i).hide() });
    document.querySelectorAll(".modal").forEach(function (i) { $(i).hide() });
    if (path == "/inicio") {
        (document.querySelector(".corpo")).innerHTML = (ui);
    } else {
        loader.abrir();
        $(document.querySelector(".corpo")).animate({ "opacity": "0" }, 300, function () {
            $(document.querySelector(".corpo")).html(ui);
        });
    }

    $(document.querySelector(".corpo")).animate({ "opacity": "1" }, 300);
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
        loader.fechar()
    }
    if (path == "/pendentes") {

        setTimeout(function () {
            PendentesRequests.pendentes();
        }, 1000)
        loader.fechar()
    }
    if (path == "/recorrentes") {

        setTimeout(function () {
            RecorrentesRequests.recorrentes();
        }, 1000)

        loader.fechar()
    }
    if (path == "/depositarlevantar") {

        setTimeout(function () {
            DepositarLevantarRequests.init();
        }, 1000)

        loader.fechar()
    }
    if (path == "/configuracoes") {

        loader.fechar()
    }
    if (path == "/bloqueio") {

        setTimeout(function () {
            ConfiguracoesRequests.init();
        }, 1000)


        loader.fechar()
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

        loader.fechar()
    }
    if (path == "/privacidade") {

        loader.fechar()
    }
    if (path == "/termos") {

        loader.fechar()
    }
    if (path == "/perguntas") {

        loader.fechar()
    }
    if (path == "/perfil") {

        setTimeout(function () {
            PerfilRequests.init();
        }, 1000)

        loader.fechar()
    }
    if (path == "/home") {

        menu.abrir();
        InicioRequests.home();
        loader.fechar()
    }
    if (path == "/enviar") {


        setTimeout(function () {
            EnviarRequests.init()
        }, 1000)

        loader.fechar()
    }
    if (path == "/receber") {

        setTimeout(function () {
            ReceberRequests.init()
        }, 1000)

        loader.fechar()
    }
    if (path == "/pagamentos") {

        loader.fechar()
    }
    if (path == "/servico") {

        setTimeout(function () {
            PagamentosRequests.verServico();
        }, 1000)

        
    }
    if (path == "/entidade") {

        setTimeout(function () {
            PagamentosRequests.verEntidade();
        }, 1000)

        
    }
    if (path == "/estatistica") {

        setTimeout(function () {
            EstatisticaRequests.init();
        }, 1000)

        
    }
    if (path == "/transacoes") {

        setTimeout(function () {
            TransacoesRequests.init();
        }, 1000)

    }




    if (path == "/inicio") {

        InicioRequests.slide();
        setTimeout(function () {
            $("#render").animate({ "opacity": "1" }, 2000);
        }, 1000);
        loader.fechar()
    }
    if (path == "/login01") {

        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });

        loader.fechar()
    }
    if (path == "/login02") {

        menu.fechar();
        setTimeout(function () {
            $(".nome").html((localStorage.getItem("nome")).toUpperCase());
            $('.preview').prevue();
            $(function () {
                $(".preview").on('input', function (e) {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                });
            });
        }, 1000)

        ESCOPO.callback = InicioRequests.reLogin;
        ESCOPO.parametro = InicioRequests;
        loader.fechar()
    }
    if (path == "/criarconta") {


        loader.fechar()
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

        loader.fechar()
    }
    if (path == "/criarempresa") {
        new SlimSelect({
            select: '#area',
            settings: {
                showSearch: false
            }
        });


        loader.fechar()
    }
    if (path == "/inicioconfirmar") {


        loader.fechar()
    }
    if (path == "/criarpin") {

        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });

        loader.fechar()
    }
    if (path == "/recuperarconta") {


        loader.fechar()
    }
    if (path == "/recuperarpin") {
        $('.preview').prevue();
        $(function () {
            $(".preview").on('input', function (e) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            });
        });
        loader.fechar()
    }
    /* setTimeout(function () {
        loader.fechar();
    }, 1000); */
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();