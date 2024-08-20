class IbanReq {
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
    contas() {
        var esse = this;

        this.jquery.get("APIMOCK/minhasContas.json").done(function (dados) {

            var res = ``;
            dados.forEach(element => {
                res += `<div class="btn-flexa" data-bs-toggle="collapse" data-bs-target="#collapseExample${(element.identificador)}">
                    <span class="label-btn"> ${(element.banco)} </span>
                    <img src="assets/flexabaixo-icon.svg" class="icon-btn-flexabaixo">
                </div>
                <div class="collapse conte" id="collapseExample${(element.identificador)}">
                    <div class="mb-3">
                        <label for="valor-receber" class="form-label">Iban</label>
                        <input type="text" class="form-control" id="valor-receber" placeholder="0" value="${(element.iban)}">
                    </div>
                    <div class="mb-3">
                        <label for="iban-receber" class="form-label">Conta</label>
                        <input type="text" class="form-control" value="${(element.conta)}">
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-6" style="padding-left:0 ;">
                                <button class="btn btn-outline-primary form-control" data-bs-toggle="modal" data-bs-target="#alterar-modal${(element.identificador)}">Alterar</button>
                            </div>
                            <div class="col-6" style="padding-right:0 ;">
                                <button class="btn btn-outline-danger form-control" data-bs-toggle="modal" data-bs-target="#apagar-modal${(element.identificador)}">Apagar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODAL ALTERAR -->
                <div class="modal fade" id="alterar-modal${(element.identificador)}" aria-hidden="true"
                    tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"
                                    id="exampleModalToggleLabel">ALTERAR ${(element.banco)}</h5>
                                <button type="button" class="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body"> 
                                <div class="mb-3">
                                    <label for="valor-receber" class="form-label">Iban</label>
                                    <input type="text" class="form-control" id="valor-receber" placeholder="0" value="${(element.iban)}">
                                </div>
                                <div class="mb-3">
                                    <label for="iban-receber" class="form-label">Conta</label>
                                    <input type="text" class="form-control" value="${(element.conta)}">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success form-control btn-lg hvr-bounce-out" onclick='IbanRequests.modalConfirmar()'>Alterar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- MODAL APAGAR -->
                <div class="modal fade" id="apagar-modal${(element.identificador)}" aria-hidden="true"
                    tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">APAGAR ${(element.banco)}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <button class="btn btn-light form-control btn-lg hvr-bounce-out" data-bs-dismiss="modal">Pensar melhor</button> <br><br>
                                <button class="btn btn-danger form-control btn-lg hvr-bounce-out" onclick='IbanRequests.modalConfirmar()'>Apagar</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            esse.jquery(".qtd").html(dados.length+" contas");
            esse.jquery("#render-aqui").html(res);
        })


    }
    modalConfirmar() {
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-sms'))
        myModal.toggle()
    }

    pegaDadosOperacao(){
        var notificacao = this.notificacao;
        var dadosOperacao = {};
        var iban = $("#iban-add").val();
        var conta = $("#conta-add").val();

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if(iban < 20){
            notificacao.sms("Verifica o tamanho do Iban",1);
            return;
        }
        if(conta < 9){
            notificacao.sms("Verifica o tamanho da conta",1);
            return;
        }
        dadosOperacao.iban = iban;
        dadosOperacao.conta = conta;
        //--------------------------------------------------------
        this.modalConfirmar();
        console.log(dadosOperacao);
    }
}