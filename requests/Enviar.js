class EnviarReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {
        $('[name="radio-parcelado"]').change(function () {
            var parcelar = $('[name="radio-parcelado"]:checked').val();
            if (parcelar == "sim") {
                $("#select-parcelado").removeAttr("disabled");
                $("#select-parcela").removeAttr("disabled");
                $("#opcao-recorrente").hide("slow");

                var quanto = $('#quanto').val();
                var valorParcela = Number(quanto/2).toFixed(2);
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
            var valorParcela = Number(quanto/parcelar).toFixed(2);
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
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-modal'))
        myModal.toggle()
    }
    modalConfirmarSMS() {
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-sms'))
        myModal.toggle()
    }
    modalConfirmarPin() {
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-pin'))
        myModal.toggle()
    }

    pegaDadosOperacao(){
        var notificacao = this.notificacao;
        var dadosOperacao = {};
        var quanto = $("#quanto").val();
        var para = $("#para").val();
        var descricao = $("#descricao").val();
        var tipo = "Normal";
        var onde = "App";

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if(quanto < 1){
            notificacao.sms("Verifica o valor a enviar",1);
            return;
        }else{
            var MOCK = {saldo:"15000"}
            if((MOCK.saldo - 1) >= quanto){
                dadosOperacao.quanto = (MOCK);
            }else{
                notificacao.sms("Não tem saldo suficiente",1);
                return;
            }
        }
        if(para.length < 1){
            notificacao.sms("Quem vai receber o enviu?",1);
            return;
        }else{
            var MOCK = {nome:"Super Borge", telefone: "921797626"}
            if(MOCK.telefone == para){
                dadosOperacao.para = (MOCK);
            }else{
                notificacao.sms("Destinatário desconhecido",1);
                return;
            }
        }
        //--------------------------------------------------------

        var parcelado = $('[name="radio-parcelado"]:checked').val();
        var parceladoPeriodicidade;
        var parceladoParcelas;

        var recorrente=$('[name="radio-recorrente"]:checked').val();
        var recorrentePeriodicidade;

        if(parcelado == "sim"){
            tipo = "Parcelado";
            parceladoPeriodicidade = $("#select-parcelado").val();
            parceladoParcelas = $("#select-parcela").val();
            dadosOperacao.periodicidade = parceladoPeriodicidade;
            dadosOperacao.parcelas = parceladoParcelas;
            dadosOperacao.valorparcelas = (Number(quanto / parceladoParcelas)).toFixed(2);
        }

        if(recorrente == "sim"){
            tipo = "Recorrente";
            recorrentePeriodicidade = $("#select-recorrente").val();
            dadosOperacao.periodicidade = recorrentePeriodicidade;
        }


        dadosOperacao.quanto = quanto;
        //dadosOperacao.para = para;
        dadosOperacao.tipo = tipo;
        dadosOperacao.onde = onde;
        dadosOperacao.descricao = descricao;

        var tipoo = ``;
        if(tipo == "Parcelado"){
            tipoo = `<p>Tipo: ${(dadosOperacao.parcelas)} parcelas de <b>${(dadosOperacao.valorparcelas)}</b> pagos ${(dadosOperacao.periodicidade)} </p>`;
        }
        if(tipo == "Recorrente"){
            tipoo = `<p>Tipo: Recorrente pago ${(dadosOperacao.periodicidade)} </p>`;
        }
        $("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(Number(dadosOperacao.quanto).toFixed(2))}</b></p>
            <p>Onde:  ${(dadosOperacao.onde)}</p>
            <p>Para:  ${dadosOperacao.para.nome}</p> 
            ${tipoo}
            <p>Descrição: ${(dadosOperacao.descricao)}</p>
            `)

        this.modalConfirmar();
        console.log(dadosOperacao);
    }
}