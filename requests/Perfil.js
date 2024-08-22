class PerfilReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {

        this.jquery.get("APIMOCK/perfil.json").done(function (dados) {

           console.log(dados[1]);
           var conta = dados[1];
           if(conta.empresa){
                $(".titulo").html("<h1>CONTA EMPRESA</h1>");
                $(".id_doc").html("NIF");
           }else{
                $(".titulo").html("<h1>CONTA PESSOAL</h1>");
                $(".id_doc").html("BI");
           }
           $(".nome").html(conta.nome);
           $("#nome").val(conta.nome).attr("disabled","disabled");
           $("#id_doc").val(conta.id_doc).attr("disabled","disabled");
           $("#telefone").val(conta.telefone).attr("disabled","disabled");
           $("#img").attr("src","assets/"+conta.img);
           

           $("#nome_edit").val(conta.nome);
           $("#id_doc_edit").val(conta.id_doc);
           $("#telefone_edit").val(conta.telefone);
            
        })


    }
    modalConfirmar() {
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-sms'))
        myModal.toggle()
    }

    pegaDadosOperacao(){
        var notificacao = this.notificacao;
        var dadosOperacao = {};
        var quanto = $("#valor-receber").val();
        var para = $("#iban-receber").val();

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if(quanto < 1){
            notificacao.sms("Verifica o valor a receber",1);
            return;
        }else{
            var MOCK = {saldo:"15000"}
            if((MOCK.saldo - 1) >= quanto){
                dadosOperacao.quanto = quanto;
            }else{
                notificacao.sms("Não tem saldo suficiente",1);
                return;
            }
        }
        dadosOperacao.para = para;
        //--------------------------------------------------------
        this.modalConfirmar();
        console.log(dadosOperacao);
    }
}