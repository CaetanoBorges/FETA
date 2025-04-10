const MONEY = function (number, decimals, dec_point, thousands_sep) {

    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        toFixedFix = function (n, prec) {
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            var k = Math.pow(10, prec);
            return Math.round(n * k) / k;
        },
        s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

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
    window.intervalAceito = setInterval(function () { }, 100);
    clearInterval(window.intervalAceito);
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
    if (path == "/inicio" || path == "/scan" || path == "/dadosscan" || path == "/tarif" || path == "/fale" || path == "/login01" || path == "/login02" || path == "/criarconta" || path == "/criarindividual" || path == "/criarempresa" || path == "/inicioconfirmar" || path == "/criarpin" || path == "/recuperarconta" || path == "/recuperarpin" || path == "/trm" || path == "/prv") {
        menu.fechar();
    } else {
        menu.abrir();
    }

    if (path == "/") {
        db.verificaToken();
        setTimeout(function () {
            loader.abrir();
        }, 1000);
    }
    //----------
    if (path == "/tarifario") {


    }
    if (path == "/tarif") {
        loader.abrir();
        setTimeout(function () {
            InicioRequests.tarifario();
            loader.fechar();
        }, 1000);

    }
    if (path == "/fale") {


    }
    if (path == "/scan") {
        setTimeout(function () {
            localStorage.removeItem("bifrente");
            localStorage.removeItem("bitras");
            function frente() {
                $(".check-frente").show();
                $(".check-check-frente").css({ opacity: ".5" });
                if (localStorage.getItem("bifrente") && localStorage.getItem("bitras")) {
                    $(".btn-avancar").css({ display: "block" });
                }
            }
            $("#camara-frente").change(function () {
                localStorage.setItem("bifrente", "#camara-frente");
                frente();
            });
            $("#galeria-frente").change(function () {
                localStorage.setItem("bifrente", "#galeria-frente");
                frente();
            });
            function tras() {
                $(".check-tras").show();
                $(".check-check-tras").css({ opacity: ".5" });
                if (localStorage.getItem("bifrente") && localStorage.getItem("bitras")) {
                    $(".btn-avancar").css({ display: "block" });
                }
            }
            $("#camara-tras").change(function () {
                localStorage.setItem("bitras", "#camara-tras");
                tras();
            });
            $("#galeria-tras").change(function () {
                localStorage.setItem("bitras", "#galeria-tras");
                tras();
            });
            loader.fechar();
        }, 1500);
        //$("#camara-frente").trigger('click');

    }
    if (path == "/dadosscan") {
        loader.abrir();

        setTimeout(function () {
            InicioRequests.pegaDadosScan();
            loader.fechar();
        }, 1000);
    }
    //----------
    if (path == "/pendentes") {
        loader.abrir();

        setTimeout(function () {
            PendentesRequests.pendentes();
        }, 500);
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
            //ConfiguracoesRequests.recorrentes();
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
            InicioRequests.termosecondicoesWatchVer();
            $("#privacidade").prop("disabled", "disabled");
            loader.fechar();
        }, 1000);
    }
    if (path == "/termos") {
        loader.abrir();
        setTimeout(function () {
            InicioRequests.termosecondicoesWatchVer();
            $("#termos").prop("disabled", "disabled");
            loader.fechar();
        }, 1000);
    }
    if (path == "/trm") {
        loader.abrir();
        setTimeout(function () {
            InicioRequests.termosecondicoesWatchVer();
            InicioRequests.termosecondicoesWatchAct();
            loader.fechar();
        }, 1000);
    }
    if (path == "/prv") {
        loader.abrir();
        setTimeout(function () {
            InicioRequests.termosecondicoesWatchVer();
            InicioRequests.termosecondicoesWatchAct();
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
        }, 1000);
    }
    if (path == "/home") {
        loader.abrir();
        menu.abrir();
        InicioRequests.home();
        setTimeout(function () {



            loader.fechar();
        }, 1000);
    }
    if (path == "/enviar") {
        loader.abrir();

        setTimeout(function () {
            new SlimSelect({
                select: '#descricao',
                settings: {
                    showSearch: false
                }
            });
            EnviarRequests.init()
            loader.fechar();
        }, 1000);
    }
    if (path == "/receber") {
        loader.abrir();

        setTimeout(function () {
            new SlimSelect({
                select: '#descricao',
                settings: {
                    showSearch: false
                }
            });
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
        }, 1000);
    }
    if (path == "/transacoes") {
        loader.abrir();

        setTimeout(function () {
            TransacoesRequests.init();
            //TransacoesRequests.controllerData();
            //loader.fechar();
        }, 1000);
    }




    if (path == "/inicio") {
        loader.abrir();
        setTimeout(function () {
            InicioRequests.termosecondicoesValidar();
            InicioRequests.slide();
            setTimeout(function () {
                $("#render").animate({ "opacity": "1" }, 2000);
            }, 1000);
            loader.fechar();
        }, 1000);
        setTimeout(function () {
            InicioRequests.termosecondicoesValidar();
        }, 2000);

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
            $(".nome").html((localStorage.getItem("nome")).toUpperCase());
            $('.preview').prevue();
            $(function () {
                $(".preview").on('input', function (e) {
                    $(this).val($(this).val().replace(/[^0-9]/g, ''));
                });
            });
            ESCOPO.callback = InicioRequests.reLogin;
            ESCOPO.parametro = InicioRequests;

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
            new SlimSelect({
                select: '#ocupacao',
                settings: {
                    showSearch: false
                }
            });
            var aceitaTermos = setInterval(function () {
                try {
                    var aceitotp = document.querySelector('#aceito-tp').checked;
                    if (aceitotp) {
                        document.querySelector('.label-tp').style.color = "#640564";
                        document.querySelector(".criar-conta").style.display = "block";
                    } else {
                        document.querySelector('.label-tp').style.color = "red";
                        document.querySelector(".criar-conta").style.display = "none";
                    }
                } catch (error) {
                    clearInterval(aceitaTermos);
                }


            }, 100);
            /* const calendario = dobDatepicker('#nascimento', {
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
            }) */
            loader.fechar();
        }, 1000);

    }
    if (path == "/criarempresa") {
        loader.abrir();
        setTimeout(function () {
            new SlimSelect({
                select: '#area',
                settings: {
                    showSearch: false
                }
            });
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

    if (path == "/recuperarconfirmar") {
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
    if (path == "/convidaramigo") {

        setTimeout(function () {
            loader.fechar();
        }, 1000);


    }
    if (path == "/limitestransacao") {
        setTimeout(function () {
            loader.fechar();
        }, 1000);



    }
    if (path == "/qrcode") {
        loader.abrir();
        setTimeout(function () {

            function domReady(fn) {
                if (
                    document.readyState === "complete" ||
                    document.readyState === "interactive"
                ) {
                    setTimeout(fn, 1000);
                } else {
                    document.addEventListener("DOMContentLoaded", fn);
                }
            }

            domReady(function () {

                function onScanSuccess(decodeText, decodeResult) {
                    alert("O resultado é : " + decodeText, decodeResult);
                }

                let htmlscanner = new Html5QrcodeScanner(
                    "my-qr-reader",
                    {
                        fps: 10, qrbox: { width: 400, height: 400 },
                        videoConstraints: {
                            facingMode: "environment",
                        },
                        rememberLastUsedCamera: true,
                        // Only support camera scan type.
                        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
                    }
                );
                htmlscanner.render(onScanSuccess);
            });

        }, 1000);
        setTimeout(function () {
            loader.fechar();
        }, 1500);
    }

    if (path == "/depositar") {

        setTimeout(function () {
            loader.fechar();
        }, 1000);


    }
    if (path == "/levantar") {


        setTimeout(function () {
            loader.fechar();
        }, 1000);

    }
    if (path == "/fazerlevsemcartao") {
        loader.abrir();
        setTimeout(function () {
           
            loader.fechar();
        }, 1000);




    }
    if (path == "/levsemcartao") {
        loader.abrir();
        setTimeout(function () {
           
            loader.fechar();
        }, 1000);




    }
    if (path == "/consultarlevsemcartao") {
        loader.abrir();

        setTimeout(function () {
            LevantarSemCartaoRequests.levantamentos();
        }, 500);

    }
    if (path == "/consultardepositarlevantar") {
        loader.abrir();

        setTimeout(function () {
            DepositarLevantarRequests.init();
            //TransacoesRequests.controllerData();
            //loader.fechar();
        }, 1000);

    }
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();