class InicioReq {
    constructor(jquery, apiUrl, loader, notificacao, db) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
        this.db = db;
    }
    slide() {
        var sli = new debliwuislideimg($, [
            '<img src="assets/img-menu.svg" style="border-radius:5px;">',
            '<img src="assets/img-menu.svg" style="border-radius:5px;">',
            '<img src="assets/img-menu.svg" style="border-radius:5px;">'
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
            console.log(res);
        }).always(function (a) {
            esse.loader.fechar();
        });
    }
       reLogin(esse) {
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
                localStorage.setItem("sessao", Date.now());
                esse.db.setToken(res.token);
                esse.home();
                esse.db.verificaToken();
                esse.notificacao.sms("É feta, é fácil");
            } else {
                esse.notificacao.sms(res.payload, 1);
            }
            console.log(res);
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

                var sessao = res.payload.bloqueio;
                if(sessao == "mins1") {
                    localStorage.setItem("sessaolimite", 60);
                }
                if(sessao == "mins5") {
                    localStorage.setItem("sessaolimite", 300);
                }
                if(sessao == "segs30") {
                    localStorage.setItem("sessaolimite", 30);
                }
                localStorage.setItem("nome", res.payload.nome);
                localStorage.setItem("balanco", res.payload.balanco);
                localStorage.setItem("telefone", res.payload.telefone);
                localStorage.setItem("transacoes", JSON.stringify(res.payload.transacoes.payload));
            } else {
                //esse.notificacao.sms(res.payload,1);
            }
            console.log(res);
        }).always(function (a) {
            
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
            console.log(res);
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
        } else {
            this.pedirNumero();
        }
    }


    pedirNumeroNovo() {
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
                esse.notificacao.sms("Código de confirmação enviado com sucesso", 1);
            } else {
                esse.notificacao.sms(res.payload, 1);
            }
            console.log(res);
        }).always(function (a) {
            esse.loader.fechar();
        });
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
        ESCOPO.pin = pin;
        pin = '';
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
    
}