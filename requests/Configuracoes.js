class ConfiguracoesReq {
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


        $('[name="opcao"]').change(function () {
            var opcao = $('[name="opcao"]:checked').val();
            //console.log(opcao);
            $('.opcao').css({ "color": "black" });
            $('.' + opcao).css({ "color": "#640564" });
        })
        var settings = {
            "url": (this.apiUrl) + "/config/timeout",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken()
            },
        };

        $.ajax(settings).done(function (response) {
            //console.log(response);
            $('.' + response.payload).css({ "color": "#640564" });
        });
            

    }

    alterarTempo() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var opcao = $('[name="opcao"]:checked').val();

        ESCOPO.confirmarFinal = "pin";


        ESCOPO.callback = this.setTimeout;
        ESCOPO.parametro = this;
        ESCOPO.dadosOperacao = {
            "tempo_bloqueio": opcao
        };

        InicioRequests.pedirNumeroOuPin();
            

    }
    setTimeout(esse) {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        esse.loader.abrir();
        var settings = {
            "url": (esse.apiUrl)+"/config/settimeout",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": db.getToken(),
                "pin": ESCOPO.pin,
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };

        $.ajax(settings).done(function (response) {
            //console.log(response);
            if(response.ok){
                InicioRequests.home();
                ESCOPO.modalConfirmarFinal.hide();
                esse.notificacao.sms(response.payload, 0);
                setTimeout(function(){
                    vaiTela("\home");
                },1000);
            }else{
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });
            

    }

      alterarPin() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
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
        ESCOPO.confirmarFinal = "pin";
        ESCOPO.callback = this.setPin;
        ESCOPO.parametro = this;
        ESCOPO.dadosOperacao = {
            "pin": pin_novo
        };

        InicioRequests.pedirNumeroOuPin();
            

    }
    setPin(esse) {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        esse.loader.abrir();
        var settings = {
            "url": (esse.apiUrl)+"/config/alterarpin",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": db.getToken(),
                "pin": ESCOPO.pin,
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };

        $.ajax(settings).done(function (response) {
            if(response.ok){
                InicioRequests.home();
                ESCOPO.modalConfirmarFinal.hide();
                esse.notificacao.sms(response.payload, 0);
                setTimeout(function(){
                    vaiTela("\home");
                },1000);
            }else{
                
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });
            

    }
}