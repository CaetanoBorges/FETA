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
                $("#opcao-recorrente").hide();
            }
            if (parcelar == "nao") {
                $("#select-parcelado")[0].setAttribute("disabled", "disabled");
                $("#select-parcela")[0].setAttribute("disabled", "disabled");
                $("#opcao-recorrente").show();
            }
        })


        $('[name="radio-recorrente"]').change(function () {
            var parcelar = $('[name="radio-recorrente"]:checked').val();
            if (parcelar == "sim") {
                $("#select-recorrente").removeAttr("disabled");
                $("#opcao-parcelado").hide();
                $("#opcao-parcela").hide();
            }
            if (parcelar == "nao") {
                $("#select-recorrente")[0].setAttribute("disabled", "disabled");
                $("#opcao-parcelado").show();
                $("#opcao-parcela").show();
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
}