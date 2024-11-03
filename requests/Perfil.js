class PerfilReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var esse = this;
        this.loader.abrir();
        var settings = {
            "url": (this.apiUrl) + "/perfil/detalhes",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken()
            },
        };
        this.jquery.ajax(settings).done(function (dados) {

            console.log(dados);
            var conta = dados.payload;
            if (conta.empresa) {
                $(".titulo").html("<h1>CONTA EMPRESA</h1>");
                $(".id_doc").html("NIF");
            } else {
                $(".titulo").html("<h1>CONTA PESSOAL</h1>");
                $(".id_doc").html("BI");
            }
            $(".nome").html((conta.nome).toUpperCase());
            $("#nome").val((conta.nome).toUpperCase()).attr("disabled", "disabled");
            $("#id_doc").val(conta.id_doc).attr("disabled", "disabled");
            $("#telefone").val(conta.telefone).attr("disabled", "disabled");


            $("#nome_edit").val(conta.nome);
            $("#id_doc_edit").val(conta.id_doc);
            $("#telefone_edit").val(conta.telefone);

        }).always(function (a) {
            esse.loader.fechar();
        })

            

    }
    modalConfirmar() {
        
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-sms'))
        myModal.toggle()
    }

    pegaDadosOperacao() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var notificacao = this.notificacao;
        var dadosOperacao = {};
        var quanto = $("#valor-receber").val();
        var para = $("#iban-receber").val();

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if (quanto < 1) {
            notificacao.sms("Verifica o valor a receber", 1);
            return;
        } else {
            var MOCK = { saldo: "15000" }
            if ((MOCK.saldo - 1) >= quanto) {
                dadosOperacao.quanto = quanto;
            } else {
                notificacao.sms("Não tem saldo suficiente", 1);
                return;
            }
        }
        dadosOperacao.para = para;
        //--------------------------------------------------------
        this.modalConfirmar();
        console.log(dadosOperacao);
            

    }

    recuperar() {
        var esse = this;
        this.loader.abrir();

        var settings = {
            "url": (this.apiUrl) + "/auth/recuperarconta",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": $("#telefone").val()
            }),
        };
        this.jquery.ajax(settings).done(function (dados) {
            if (dados.ok) {
                localStorage.setItem("telefone",$("#telefone").val());
                esse.notificacao.sms(dados.payload, 0);
                vaiTela("/recuperarconfirmar");
            } else {
                esse.notificacao.sms(dados.payload, 1);
            }

        }).always(function (a) {
            esse.loader.fechar();
        })


    }

    confirmarCodigo() {
        var esse = this;
        this.loader.abrir();

        var settings = {
            "url": (this.apiUrl) + "/auth/confirmarcodigo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": localStorage.getItem("telefone"),
                "codigo": $("#codigo").val()	
            }),
        };
        this.jquery.ajax(settings).done(function (dados) {
            if (dados.ok) {
                localStorage.setItem("codigo",$("#codigo").val());
                esse.notificacao.sms(dados.payload, 0);
                vaiTela("/recuperarpin");
            } else {
                esse.notificacao.sms(dados.payload, 1);
            }

        }).always(function (a) {
            esse.loader.fechar();
        })


    }

    recuperarPin(){
        var esse = this;
        var pin_novo = $("#pin_novo").val();
        var pin_novo_confirmar = $("#pin_novo_confirmar").val();

        if(pin_novo.length != 6){
            this.notificacao.sms("Verifica o novo PIN, deve ter 6 digitos", 1);
            return;
        }
        if(pin_novo != pin_novo_confirmar){
            this.notificacao.sms("Verifica o novo PIN, as combinaçoes devem ser iguais", 1);
            return;
        }
        this.loader.abrir();
        var settings = {
        "url": (this.apiUrl) + "/auth/novopin",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "id": localStorage.getItem("telefone"),
            "codigo": localStorage.getItem("codigo"),
            "pin": pin_novo
        })
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.ok){
                localStorage.setItem("sessao", Date.now());
                esse.db.setToken(response.token);
                esse.home();
                esse.db.verificaToken();
            } else {
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
            
        }).always(function (a) {
            
        })
    }
}