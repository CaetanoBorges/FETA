class LevantarSemCartaoReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {
        var ver = db.verificaSessao();
        if (ver) {
            db.verificaToken();
            return;
        }

    }
    modalConfirmar() {
        ESCOPO.modalConfirmar = new bootstrap.Modal(document.getElementById('confirmar-modal'))
        ESCOPO.modalConfirmar.toggle()
    }
    modalConcluirLevantamento() {
        ESCOPO.modalConcluirLevantamento = new bootstrap.Modal(document.getElementById('concluir-levantamento'));
        ESCOPO.modalConcluirLevantamento.toggle()
    }

    pegaDadosOperacao() {
        var ver = db.verificaSessao();
        if (ver) {
            db.verificaToken();
            return;
        }
        var notificacao = this.notificacao;
        ESCOPO.dadosOperacao = {
        };
        var valor = $("#quanto").val();
        var codigo = $("#codigo").val();
        var tipo = "levantamento";
        var onde = "App";

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if (valor < 1) {
            notificacao.sms("Verifica o valor a levantar", 1);
            return;
        }

        if (codigo.length < 3) {
            notificacao.sms("Verifique o código", 1);
            return;
        } else {
            ESCOPO.dadosOperacao.codigo = codigo;
        }
        //--------------------------------------------------------
        ESCOPO.dadosOperacao.valor = valor;
        ESCOPO.dadosOperacao.tipo = tipo;
        ESCOPO.dadosOperacao.onde = onde;
        ESCOPO.dadosOperacao.descricao = "Levantamento sem cartão";
        ESCOPO.acao = `Levantamento sem cartão \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;
        var tipoo = ``;
        $("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            ${tipoo}
            <p>Descrição: Levantamento sem cartão</p>
            `)

        this.modalConfirmar();
        //console.log(ESCOPO.dadosOperacao);
        if (valor > 99999) {
            ESCOPO.confirmarFinal = "codigo";
        } else {
            ESCOPO.confirmarFinal = "pin";
        }

        ESCOPO.callback = this.novoEnvio;
        ESCOPO.parametro = this;

    }
    novoEnvio(esse) {
        var ver = db.verificaSessao();
        if (ver) {
            db.verificaToken();
            return;
        }
        var headers = {
            "token": db.getToken(),
            "codigo": ESCOPO.codigo,
            "Content-Type": "application/json"
        }
        if (ESCOPO.confirmarFinal == "pin") {
            headers = {
                "token": db.getToken(),
                "pin": ESCOPO.pin,
                "Content-Type": "application/json"
            }
        }
        var settings = {
            "url": (esse.apiUrl) + "/semcartao/levantar",
            "method": "POST",
            "timeout": 0,
            "headers": headers,
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };
        esse.loader.abrir();
        $.ajax(settings).done(function (response) {
            //console.log(response);
            if (response.ok) {
                //InicioRequests.home();
                ESCOPO.modalConfirmar.hide();
                ESCOPO.modalConfirmarFinal.hide();
                
                esse.modalConcluirLevantamento();
                var html = $(`<div class="detalhes-info"><b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} Kz</b> <br><span>VALOR</span><br><br>${(response.payload)}<br><span>CÓDIGO COMPLETO</span><br><br>23h59m<br><span>VALIDADE</span><br><br><br><p>Com os dados do pedido poderá efectuar o<br>levantamento no ATM mais próximo de si!</p><input type="text" id="minha-referencia" value="${(response.payload)}" style="display:none;"></div>`);
                console.log(html);
                $("#detalhes-levantamento").append(html);

                $("#codigo-confirmacao").val("");
                esse.notificacao.sms("Levantamento sem cartão realizado com sucesso", 0);
                esse.loader.fechar();
            } else {

                ESCOPO.modalConfirmar.hide();
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });


    }
    copiarParaClipboard() {
        // Get the text field
        var copyText = document.querySelector("#minha-referencia");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        this.notificacao.sms("Referência copiada para a área de transferência", 0);
        // Alert the copied text
    }
}