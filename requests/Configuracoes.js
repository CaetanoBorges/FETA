class ConfiguracoesReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {
 
        

        $('[name="opcao"]').change(function () { 
            var opcao = $('[name="opcao"]:checked').val();
            console.log(opcao);
            $('.opcao').css({"color":"black"});
            $('.'+opcao).css({"color":"#640564"});
        })
        var settings = {
        "url": (this.apiUrl)+"/config/timeout",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "token": db.getToken()
        },
        };

        $.ajax(settings).done(function (response) {
             $('.'+response.payload+"s").css({"color":"#640564"});
        });

    }
}