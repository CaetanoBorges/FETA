class InicioReq{
    constructor(jquery, apiUrl, loader, notificacao,db) {
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
    login(){
        var esse = this;
        var id = $("#telefone").val();
        var pin = $("#pin").val();

        if(id.length < 9 || pin.length < 6){
            esse.notificacao.sms("Preencha os dados corretamente",1);
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
            if(res.ok){
                esse.db.setToken(res.token);
                esse.home();
                esse.db.verificaToken();
                esse.notificacao.sms("É feta, é fácil");
            }else{
                esse.notificacao.sms(res.payload,1);
            }
            console.log(res);
        }).always(function(a){
            esse.loader.fechar();
        });
    }

    
    home(){
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
            if(res.ok){
               localStorage.setItem("nome", res.payload.nome);
               localStorage.setItem("balanco", res.payload.balanco);
               localStorage.setItem("telefone", res.payload.telefone);
               localStorage.setItem("transacoes", JSON.stringify(res.payload.transacoes.payload));
            }else{
                //esse.notificacao.sms(res.payload,1);
            }
            console.log(res);
        }).always(function(a){
            
        });
    }
}