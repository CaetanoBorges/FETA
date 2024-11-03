class EnviarReq {
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
        $('[name="radio-parcelado"]').change(function () {
            var parcelar = $('[name="radio-parcelado"]:checked').val();
            if (parcelar == "sim") {
                $("#select-parcelado").removeAttr("disabled");
                $("#select-parcela").removeAttr("disabled");
                $("#opcao-recorrente").hide("slow");

                var quanto = $('#quanto').val();
                var valorParcela = Number(quanto / 2).toFixed(2);
                $(".valorParcela").html(`Serão pagos <br><b>${valorParcela}</b>, <br> ${2} vezes`);
            }
            if (parcelar == "nao") {
                $("#select-parcelado")[0].setAttribute("disabled", "disabled");
                $("#select-parcela")[0].setAttribute("disabled", "disabled");
                $("#opcao-recorrente").show("slow");

                $(".valorParcela").html(`Serão pagos <br><b>000 000,00</b>, <br> x vezes`);
            }
        })


        $('[name="radio-recorrente"]').change(function () {
            var parcelar = $('[name="radio-recorrente"]:checked').val();
            if (parcelar == "sim") {
                $("#select-recorrente").removeAttr("disabled");
                $("#opcao-parcelado").hide("slow");
                $("#opcao-parcela").hide("slow");
            }
            if (parcelar == "nao") {
                $("#select-recorrente")[0].setAttribute("disabled", "disabled");
                $("#opcao-parcelado").show("slow");
                $("#opcao-parcela").show("slow");
            }
        })


        $('#select-parcela').change(function () {
            var parcelar = $('#select-parcela').val();
            var quanto = $('#quanto').val();
            var valorParcela = Number(quanto / parcelar).toFixed(2);
            $(".valorParcela").html(`Serão pagos <br><b>${valorParcela}</b>, <br> ${parcelar} vezes`);
        })

        new SlimSelect({
            select: '#select-parcelado',
            settings: {
                showSearch: false
            }
        })
        new SlimSelect({
            select: '#select-parcela',
            settings: {
                showSearch: false
            }
        })
        new SlimSelect({
            select: '#select-recorrente',
            settings: {
                showSearch: false
            }
        })
            

    }
    modalConfirmar() {
        
        ESCOPO.modalConfirmar = new bootstrap.Modal(document.getElementById('confirmar-modal'))
        ESCOPO.modalConfirmar.toggle()
            

    }

    pegaDadosOperacao() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var notificacao = this.notificacao;
        ESCOPO.dadosOperacao = {
            opcoes: {
                valor_parcela: null
            }
        };
        var valor = $("#quanto").val();
        var para = $("#para").val();
        var descricao = $("#descricao").val();
        var tipo = "normal";
        var onde = "App";


        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if (valor < 1) {
            notificacao.sms("Verifica o valor a transaferir", 1);
            return;
        } else {
            var MOCK = { saldo: localStorage.getItem("balanco") }
            if ((Number(MOCK.saldo) - 1) >= valor) {
                ESCOPO.dadosOperacao.valor = valor;
            } else {
                notificacao.sms("Não tem saldo suficiente", 1);
                return;
            }
        }
        if (para.length != 9) {
            notificacao.sms("Verifique o destinatário, deve conter 9 digitos", 1);
            return;
        } else {
            ESCOPO.dadosOperacao.para = para;
        }
        //--------------------------------------------------------

        var parcelado = $('[name="radio-parcelado"]:checked').val();
        var parceladoPeriodicidade;
        var parceladoParcelas;

        var recorrente = $('[name="radio-recorrente"]:checked').val();
        var recorrentePeriodicidade;
        if (parcelado == "sim") {
            tipo = "parcelado";
            parceladoPeriodicidade = $("#select-parcelado").val();
            parceladoParcelas = $("#select-parcela").val();
            var opcoes = {
                periodicidade: parceladoPeriodicidade,
                parcelas: parceladoParcelas,
                valor_parcela: (Number(valor / parceladoParcelas)).toFixed(2)
            }
            ESCOPO.dadosOperacao.opcoes = opcoes;
            //ESCOPO.dadosOperacao.periodicidade = parceladoPeriodicidade;
            //ESCOPO.dadosOperacao.parcelas = parceladoParcelas;
            // ESCOPO.dadosOperacao.valorparcelas = (Number(quanto / parceladoParcelas)).toFixed(2);
        }

        if (recorrente == "sim") {
            tipo = "recorrente";
            recorrentePeriodicidade = $("#select-recorrente").val();
            ESCOPO.dadosOperacao.periodicidade = recorrentePeriodicidade;
            var opcoes = {
                periodicidade: recorrentePeriodicidade,
            }
            ESCOPO.dadosOperacao.opcoes = opcoes;
        }


        ESCOPO.dadosOperacao.valor = valor;
        //ESCOPO.dadosOperacao.para = para;
        ESCOPO.dadosOperacao.tipo = tipo;
        ESCOPO.dadosOperacao.onde = onde;
        ESCOPO.dadosOperacao.descricao = descricao;

        ESCOPO.acao = `Trasferência para ${(ESCOPO.dadosOperacao.para)} \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;
        var tipoo = ``;
        if (tipo == "parcelado") {
            tipoo = `<p>Tipo: ${(ESCOPO.dadosOperacao.opcoes.parcelas)} parcelas de <b>${(MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcela, 2, ".", " "))}</b> pagos ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}, fazendo um total de <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b> no final.</p>`;
            //ESCOPO.dadosOperacao.valor = ESCOPO.dadosOperacao.opcoes.valor_parcela;
            ESCOPO.acao = `Trasferência parcelada para ${(ESCOPO.dadosOperacao.para)} \n${(ESCOPO.dadosOperacao.opcoes.parcelas)} parcelas de ${(MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcela, 2, ".", " "))} pagos ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}, fazendo um total de ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} no final.`;
        }
        if (tipo == "recorrente") {
            tipoo = `<p>Tipo: Recorrente pago ${(ESCOPO.dadosOperacao.opcoes.periodicidade)} </p>`;
            ESCOPO.acao = `Trasferência recorrente para ${(ESCOPO.dadosOperacao.para)} \nPago ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} de forma ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}.`;
        }
        $("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(ESCOPO.dadosOperacao.opcoes.valor_parcela ? MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcela, 2, ".", " ") : MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            <p>Para:  ${ESCOPO.dadosOperacao.para}</p> 
            ${tipoo}
            <p>Descrição: ${(ESCOPO.dadosOperacao.descricao)}</p>
            `)

        this.modalConfirmar();
        if(valor > 99999){
            ESCOPO.confirmarFinal = "codigo";
        }else{
            ESCOPO.confirmarFinal = "pin";
        }

        ESCOPO.callback = this.novoEnvio;
        ESCOPO.parametro = this;
       
            

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
            "url": (esse.apiUrl)+"/transacao/enviar",
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