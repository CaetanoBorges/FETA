class DepositarLevantarReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {
        
        var ibans = new SlimSelect({
            select: '#iban-receber',
            settings: {
                showSearch: false
            }
        });

        this.jquery.get("APIMOCK/minhasContas.json").done(function (dados) {

            var res = [];
            dados.forEach(element => {
                res.push({ text: (element.banco), value: (element.iban) });
            });

            ibans.setData(res);
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