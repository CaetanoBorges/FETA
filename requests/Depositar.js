class DepositarReq {
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

    }
    modalConfirmar() {
        ESCOPO.modalConfirmar = new bootstrap.Modal(document.getElementById('confirmar-modal'))
        ESCOPO.modalConfirmar.toggle()
    }

    pegaDadosOperacao(){
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var notificacao = this.notificacao;
        ESCOPO.dadosOperacao = {
        };
        var valor = $("#quanto").val();
        var para = $("#para").val();
        var tipo = "deposito";
        var onde = "App";

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if(valor < 1){
            notificacao.sms("Verifica o valor a depositar",1);
            return;
        }

        if(para.length < 9){
            notificacao.sms("Verifique o número da conta",1);
            return;
        }else{
            ESCOPO.dadosOperacao.para = para;
        }
        //--------------------------------------------------------
        //VERIFICAÇÃO DO destinário-------------------------------
        var settings = {
            "url": (this.apiUrl) + "/config/verificanumero",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": db.getToken(),
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "telefone": para
            }),
        };
        var result = null;
        var esse = this;
        $.ajax(settings).done(function (res) {
            if (res.ok) {
                result = (res.payload);
                ESCOPO.outraConta = result;
            } else {
                esse.notificacao.sms(res.payload, 1);
            }
            //console.log(res);
        }).always(function (a) {
            var nomeReceptor = ESCOPO.outraConta.nome;
            var nomeNumeroEmissor = localStorage.getItem("telefone") + ", " + localStorage.getItem("nome");

            ESCOPO.dadosOperacao.valor = valor;
            ESCOPO.dadosOperacao.tipo = tipo;
            ESCOPO.dadosOperacao.onde = onde; 
            ESCOPO.dadosOperacao.descricao = "Deposito de numerario";
            ESCOPO.dadosOperacao.acao = `Deposito para ${(ESCOPO.dadosOperacao.para)}, ${(nomeReceptor.toUpperCase())}. \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} kz.\nVindo de ${(nomeNumeroEmissor).toUpperCase()}.`;
            ESCOPO.acao = `Deposito para ${(ESCOPO.dadosOperacao.para)}, ${(nomeReceptor.toUpperCase())} \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} kz.\nVindo de ${(nomeNumeroEmissor).toUpperCase()}.`;
            var tipoo = ``;
            $("#detalhes-transacao").html(`
                <p>Quanto:  <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
                <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
                <p>para:  ${ESCOPO.dadosOperacao.para} <br> <b>${(nomeReceptor.toUpperCase())}</b></p> 
                ${tipoo}
                <p>Descrição: Deposito</p>
                `)

            esse.modalConfirmar();
            //console.log(ESCOPO.dadosOperacao);
            if(valor > 99999){
                ESCOPO.confirmarFinal = "codigo";
            }else{
                ESCOPO.confirmarFinal = "pin";
            }

            ESCOPO.callback = esse.novoEnvio;
            ESCOPO.parametro = esse;
        })          

    }
    novoEnvio(esse) {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var headers = {
                "token": db.getToken(),
                "codigo": ESCOPO.codigo,
                "Content-Type": "application/json"
        }
        if(ESCOPO.confirmarFinal == "pin"){
            headers = {
                    "token": db.getToken(),
                    "pin": ESCOPO.pin,
                    "Content-Type": "application/json"
            }
        }
        var settings = {
            "url": (esse.apiUrl)+"/transacao/depositar",
            "method": "POST",
            "timeout": 0,
            "headers": headers,
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };
        esse.loader.abrir();
        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.ok){
                InicioRequests.home();
                ESCOPO.modalConfirmar.hide();
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 0);
                setTimeout(function(){
                    vaiTela("\home");
                },1000);
            }else{
                
                ESCOPO.modalConfirmar.hide();
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });
            

    }
}