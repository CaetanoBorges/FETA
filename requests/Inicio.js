class InicioReq {
    constructor(jquery, apiUrl, loader, notificacao, db) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
        this.db = db;
    }
    termosecondicoesWatchAct() {
        $("#termos").change(function () {
            console.log($(this).prop("checked"));
            if ($(this).prop("checked")) {
                localStorage.setItem("termos", "1");
                clearInterval(window.termInterval);
                setTimeout(function () {
                    history.back();
                }, 1000)
            } else {
                localStorage.setItem("termos", "0");
            };
        });
        $("#privacidade").change(function () {
            console.log($(this).prop("checked"));
            if ($(this).prop("checked")) {
                localStorage.setItem("privacidade", "1");
                clearInterval(window.privInterval);
                setTimeout(function () {
                    history.back();
                }, 1000)
            } else {
                localStorage.setItem("privacidade", "0");
            };
        });
    }
    termosecondicoesWatchVer() {
        var termos = localStorage.getItem("termos");
        var privacidade = localStorage.getItem("privacidade");
        if (termos == "1") {
            $("#termos").prop("checked", true);
        } else {
            $("#termos").prop("checked", false);
        }
        if (privacidade == "1") {
            $("#privacidade").prop("checked", true);
        } else {
            $("#privacidade").prop("checked", false);
        }
    }
    termosecondicoesValidar() {
        var anima = function (el) {
            $(el).animate({
                opacity: ".1"
            }, 100, function () {
                setTimeout(function () {
                    $(el).css({ opacity: 1 });
                }, 700);
            });
        }
        var termos = localStorage.getItem("termos");
        var privacidade = localStorage.getItem("privacidade");
        if (termos == "1" || termos == '1') {
            clearInterval(window.termInterval);
            $("#btn-termos").removeClass("btn-flexa-roxo").addClass("btn-flexa");
        } else if (termos == "0" || termos == '0') {
            window.termInterval = setInterval(function () {
                anima("#btn-termos");
            }, 2500);
        }
        if (privacidade == "1" || privacidade == '1') {
            clearInterval(window.privInterval);
            $("#btn-privacidade").removeClass("btn-flexa-roxo").addClass("btn-flexa");

        } else if (privacidade == "0" || privacidade == '0') {
            window.privInterval = setInterval(function () {
                anima("#btn-privacidade");
            }, 2500);
        }

        if (termos == "1" && privacidade == "1") {
            clearInterval(window.termInterval);
            clearInterval(window.privInterval);
            $("#btn-avancar").show();
        }
    }
    tarifario() {
        var esse = this;
        //esse.loader.abrir();

        var settings = {
            "url": "APIMOCK/precario.json",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            }
        };

        $.ajax(settings).done(function (response) {
            //console.log(response);
            if (response.ok) {
                var AcordionUI = "";
                //esse.loader.fechar();
                (response.payload).forEach(function (item, index) {

                    var show = "show";
                    var expanded = "true";
                    var collapsed = "";
                    if (index > 0) {
                        show = "";
                        expanded = "false";
                        collapsed = "collapsed";
                    }
                    var iteUI = "";
                    var categoria = item.categoria;
                    var sobre = item.sobre;
                    var itens = item.itens;


                    (itens).forEach(function (ite, inde) {
                        var valor = ite.valor;
                        var tarifa = ite.tarifa;

                        iteUI += `
                            <tr>
                                <td>${valor}</td>
                                <td>${tarifa}</td>
                            </tr>`;

                    })



                    var tabelaUI = `
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"  style="background-color: #640564;color:white">Valor (kz)</th>
                                <th scope="col"  style="background-color: #640564;color:white">Tarifa (kz) + IVA</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${iteUI}
                        </tbody>
                    </table>
                `;
                    AcordionUI += `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne${index}">
                            <button class="accordion-button ${collapsed}" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapseOne${index}"
                                aria-expanded="${expanded}" aria-controls="collapseOne${index}">
                                ${(categoria.toUpperCase())}
                            </button>
                        </h2>
                        <div id="collapseOne${index}" class="accordion-collapse collapse ${show}"
                            aria-labelledby="headingOne${index}" data-bs-parent="#accordionExample">
                            <div class="accordion-body" style="padding: 10px;">
                                <!-- <p class="text-danger text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, officia</p> -->
                                ${tabelaUI}
                            </div>
                        </div>
                    </div>
                `
                    $("#accordionExample").html("");
                    $("#accordionExample").append(AcordionUI);
                });


            }
        });
    }
    slide() {
        var sli = new debliwuislideimg($, [
            '<img src="assets/img-menu.svg" style="border-radius:5px;">',
            '<img src="assets/pub2.png" style="border-radius:5px;">'
        ], 1, true, 1200, 4000);

        $(".slide").prepend(sli);
    }
    login() {
        var esse = this;
        var id = $("#telefone").val();
        var pin = $("#pin").val();

        if (id.length < 9 || pin.length < 6) {
            esse.notificacao.sms("Preencha os dados corretamente", 1);
            return;
        }

        esse.loader.abrir();
        var settings = {
            "url": (this.apiUrl) + "/auth/entrar",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": id,
                "pin": pin
            }),
        };

        $.ajax(settings).done(function (res) {
            if (res.ok) {
                localStorage.setItem("sessao", Date.now());
                esse.db.setToken(res.token);
                esse.home();
                esse.db.verificaToken();
                esse.notificacao.sms("É feta, é fácil");
            } else {
                esse.notificacao.sms(res.payload, 1);
            }
            //console.log(res);
        }).always(function (a) {
            esse.loader.fechar();
        });
    }


    reLogin() {
        var esse = this;
        var id = localStorage.getItem("telefone");
        var pin = ESCOPO.pin;

        if (id.length < 9 || pin.length < 6) {
            esse.notificacao.sms("Preencha os dados corretamente", 1);
            return;
        }

        esse.loader.abrir();
        var settings = {
            "url": (esse.apiUrl) + "/auth/entrar",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": id,
                "pin": pin
            }),
        };

        $.ajax(settings).done(function (res) {
            if (res.ok) {
                pin = '';
                localStorage.setItem("sessao", Date.now());
                esse.db.setToken(res.token);
                esse.home();
                esse.db.verificaToken();
                esse.notificacao.sms("É feta, é fácil");
            } else {
                esse.notificacao.sms(res.payload, 1);
                pin = '';
            }
            //console.log(res);
        }).always(function (a) {
            esse.loader.fechar();
        });
    }


    home() {
        var esse = this;

        var settings = {
            "url": (this.apiUrl) + "/perfil/init",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": esse.db.getToken()
            },
        };
        $.ajax(settings).done(function (res) {
            if (res.ok) {
                console.log(res.payload);
                var sessao = res.payload.bloqueio;
                if (sessao == "mins1") {
                    localStorage.setItem("sessaolimite", 60);
                }
                if (sessao == "mins5") {
                    localStorage.setItem("sessaolimite", 300);
                }
                if (sessao == "segs30") {
                    localStorage.setItem("sessaolimite", 30);
                }
                localStorage.setItem("tipo", res.payload.tipo);
                localStorage.setItem("nome", res.payload.nome);
                localStorage.setItem("balanco", res.payload.balanco);
                localStorage.setItem("telefone", res.payload.telefone);
                localStorage.setItem("transacoes", JSON.stringify(res.payload.transacoes.payload));
            } else {
                //esse.notificacao.sms(res.payload,1);
            }
            //console.log(res);
        }).always(function (a) {

        });
    }
    
    verificaExistenciaDeConta(telefone) {
        var esse = this;
        var settings = {
            "url": (this.apiUrl) + "/config/verificanumero",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": esse.db.getToken(),
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "telefone": telefone
            }),
        };
        var result = null;
        $.ajax(settings).done(function (res) {
            if (res.ok) {
                result = (res.payload);
                ESCOPO.outraConta = result;
            } else {
                esse.notificacao.sms(res.payload, 1);
            }
            //console.log(res);
        }).always(function (a) {
        });
    }
    pedirNumeroCliente() {
        this.loader.abrir();
        var esse = this;

        var settings = {
            "url": (this.apiUrl) + "/pedecodigolevantamento",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": esse.db.getToken(),
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "acao": ESCOPO.acao,
                "numero": ESCOPO.dadosOperacao.para
            }),
        };

        $.ajax(settings).done(function (res) {
            if (res.ok) {
                esse.notificacao.sms("Código de confirmação enviado com sucesso");
                ESCOPO.modalConfirmarFinal = new bootstrap.Modal(document.getElementById('confirmar-sms'));
                ESCOPO.modalConfirmarFinal.toggle();
            } else {
                esse.notificacao.sms(res.payload, 1);
            }
            //console.log(res);
        }).always(function (a) {
            esse.loader.fechar();
        });
    }
 pedirNumero() {
        this.loader.abrir();
        var esse = this;

        var settings = {
            "url": (this.apiUrl) + "/pedecodigo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": esse.db.getToken(),
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "acao": ESCOPO.acao
            }),
        };

        $.ajax(settings).done(function (res) {
            if (res.ok) {
                esse.notificacao.sms("Código de confirmação enviado com sucesso");
                ESCOPO.modalConfirmarFinal = new bootstrap.Modal(document.getElementById('confirmar-sms'));
                ESCOPO.modalConfirmarFinal.toggle();
            } else {
                esse.notificacao.sms(res.payload, 1);
            }
            //console.log(res);
        }).always(function (a) {
            esse.loader.fechar();
        });
    }

    pedirPin() {
        this.loader.abrir();
        setTimeout(() => {
            ESCOPO.modalConfirmarFinal = new bootstrap.Modal(document.getElementById('confirmar-pin'));
            ESCOPO.modalConfirmarFinal.toggle();
            this.loader.fechar();
        }, 1000);
    }

    pedirNumeroOuPin() {
        document.querySelectorAll(".modal-backdrop").forEach(function (i) { $(i).hide() });
        document.querySelectorAll(".modal").forEach(function (i) { $(i).hide() });
        if (ESCOPO.confirmarFinal == "pin") {
            this.pedirPin();
        } else if(ESCOPO.confirmarFinal == "codigo"){ 
            this.pedirNumero();
        } else if(ESCOPO.confirmarFinal == "codigoCliente"){
            this.pedirNumeroCliente();
        }
    }


    pedirNumeroNovo() {
        if(ESCOPO.confirmarFinal == "codigo"){ 
            this.pedirNumero();
        } else if(ESCOPO.confirmarFinal == "codigoCliente"){
            this.pedirNumeroCliente();
        }
    }

    confirmarNumero() {
        this.loader.abrir();
        var codigo = $("#codigo-confirmacao").val();

        if (codigo.length < 6) {
            this.notificacao.sms("Verifica o código de confirmação", 1);
        } else {
            ESCOPO.codigo = codigo;
            ESCOPO.callback(ESCOPO.parametro);
        }

    }

    confirmarPin() {
        updatePinDisplay();
        ESCOPO.callback(ESCOPO.parametro);
    }

    /*    verificaValidadeToken(response,esse) {
           if (response.nivel == 1 || response.nivel == "1") {
               db.setToken("expirou");
               db.verificaToken();
               esse.notificacao.sms("Sua sessão expirou, entre novamente", 1);
           }
       } */

    pegaDadosScan() {
        var BI = JSON.parse(localStorage.getItem("dados_bi"));
        $("#nome").val(BI.nome);
        $("#filiacao").val(BI.filiacao);
        $("#morada").val(BI.morada);
        $("#naturalde").val(BI.natural);
        $("#nascimento").val(BI.nascimento);
        $("#provincia").val(BI.provincia);
        $("#nascimento").val(BI.nascimento);
        $("#bi").val(BI.bi);
        $("#sexo").val(BI.sexo);
        $("#altura").val(BI.altura);
        $("#estadocivil").val(BI.esta_civil);
    }

    scanBilhete() {
        var esse = this;
        esse.loader.abrir();
        var frente = document.querySelector((localStorage.getItem("bifrente")));
        var tras = document.querySelector((localStorage.getItem("bitras")));

        var form = new FormData();
        form.append("bifrente", frente.files[0], frente.value);
        form.append("bitras", tras.files[0], tras.value);

        var settings = {
            "url": (this.apiUrl) + "/scan",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": (this.db.getToken()),
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            var obj = JSON.parse(response);
            if (obj.ok) {
                console.log(obj.payload);
                localStorage.setItem("foto_bi", obj.payload.foto_bi);
                localStorage.setItem("dados_bi", JSON.stringify(obj.payload));
                vaiTela("/dadosscan");
            }else{
                esse.notificacao.sms("Erro, algo inexperado aconteceu", 1);
            }
            
        }).always(function (a) {
            esse.loader.fechar();
        });

        console.log(frente.value, tras.files[0]); 
    }

    criarConta_dois() {
        var ocupacao = $("#ocupacao").val();
        var telefone = $("#telefone").val();
        localStorage.setItem("ocupacao", ocupacao);
        localStorage.setItem("telefone", telefone);
        if (telefone.length != 9) {
            this.notificacao.sms("Preencha os dados corretamente", 1);
            return;
        }

        ESCOPO.dadosOperacao = {
            ocupacao: ocupacao,
            id: telefone
        };
        vaiTela("/scan");
        //this.verificaExistencia();

    }

    criarConta_dois_emp() {
        var ocupacao = localStorage.getItem("ocupacao");
        var telefone = localStorage.getItem("telefone");
        var foto_bi = localStorage.getItem("foto_bi");
        var nome = $("#nome").val();
        var filiacao = $("#filiacao").val();
        var morada = $("#morada").val();
        var naturalde = $("#naturalde").val();
        var nascimento = $("#nascimento").val();
        var provincia = $("#provincia").val();
        var bi = $("#bi").val();
        var sexo = $("#sexo").val();
        var altura = $("#altura").val();
        var estadocivil = $("#estadocivil").val();

        if (nome.length < 5 || filiacao.length < 5 || morada.length < 5 || naturalde.length < 5 || nascimento.length < 5 || provincia.length < 5 || bi.length < 5 || sexo.length < 5 || estadocivil.length < 5 ) {
            this.notificacao.sms("Preencha os dados corretamente", 1);
            return;
        }

        ESCOPO.dadosOperacao = {
            foto_bi: foto_bi,
            ocupacao: ocupacao,
            id: telefone,
            bi: bi,
            nome: nome,
            filiacao: filiacao,
            morada: morada,
            natural_de: naturalde,
            nascimento: nascimento,
            provincia: provincia,
            genero: sexo,
            altura: altura,
            estado_civil: estadocivil
        };

        this.verificaExistencia();

    }





    verificaExistencia() {

        var esse = this;
        esse.loader.abrir();
        var settings = {
            "url": (esse.apiUrl) + "/auth/verificaexistencia",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ id: ESCOPO.dadosOperacao.id, bi: ESCOPO.dadosOperacao.bi }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (!response.ok) {
                esse.notificacao.sms("Código de confirmação enviado com sucesso", 1);
                vaiTela("/inicioconfirmar");
            } else {
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });
    }

    confirmarTelefone() {

        var esse = this;
        esse.loader.abrir();

        var settings = {
            "url": (esse.apiUrl) + "/auth/verificatelefone",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ id: ESCOPO.dadosOperacao.id, codigo: $("#codigo").val() })
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.ok) {
                esse.notificacao.sms(response.payload, 1);
                vaiTela("/criarpin");
            } else {
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });
    }



    cadastrar() {
        var pin_novo = $("#pin").val();
        var pin_novo_confirmar = $("#pin_confirmar").val();

        if (pin_novo.length != 6) {
            this.notificacao.sms("Verifica o PIN, deve ter 6 digitos", 1);
            return;
        }
        if (pin_novo != pin_novo_confirmar) {
            this.notificacao.sms("Verifica o PIN, as combinações devem ser iguais", 1);
            return;
        }
        ESCOPO.dadosOperacao.pin = pin_novo;
        var esse = this;
        esse.loader.abrir();

        var settings = {
            "url": (this.apiUrl) + "/auth/cadastrar",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.ok) {
                localStorage.setItem("sessao", Date.now());
                esse.db.setToken(response.token);
                esse.home();
                esse.db.verificaToken();
                esse.notificacao.sms("É feta, é fácil");
            } else {
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });
    }

}