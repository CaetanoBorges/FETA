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
            }
            if (parcelar == "nao") {
                $("#select-parcelado")[0].setAttribute("disabled", "disabled");
                $("#select-parcela")[0].setAttribute("disabled", "disabled");
                $("#opcao-recorrente").show("slow");
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

    pegaDadosOperacao(){
        var dadosOperacao = {};
        var quanto = $("#quanto").val();
        var para = $("#para").val();
        var descricao = $("#descricao").val();
        var tipo = "Normal";
        var onde = "App";

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
        }

        if(recorrente == "sim"){
            tipo = "Recorrente";
            recorrentePeriodicidade = $("#select-recorrente").val();
            dadosOperacao.periodicidade = recorrentePeriodicidade;
        }


        dadosOperacao.quanto = quanto;
        dadosOperacao.para = para;
        dadosOperacao.tipo = tipo;
        dadosOperacao.onde = onde;
        dadosOperacao.descricao = descricao;

        this.modalConfirmar();
        console.log(dadosOperacao);
    }
}