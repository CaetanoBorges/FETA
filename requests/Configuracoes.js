class ConfiguracoesReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {

        $.get("APIMOCK/configuracoes.json").done(function(dados){
            $('.'+dados.bloqueio).css({"color":"#640564"});
        });

        $('[name="opcao"]').change(function () {
            var opcao = $('[name="opcao"]:checked').val();
            console.log(opcao);
            $('.opcao').css({"color":"black"});
            $('.'+opcao).css({"color":"#640564"});
        })

    }
}