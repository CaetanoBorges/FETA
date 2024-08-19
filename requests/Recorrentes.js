class RecorrentesReq {

    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    recorrentes() {
        var esse = this;
        $("#render-recorrentes").html("");
        var loader = this.loader;
        (this.jquery).get("APIMOCK/recorrentes.json").done(function (dados) {
            var itens = ``;
            //console.log(dados);
            var obj = dados;
            $("#qtd-recorrentes").html(obj.length + " recorrentes");
            obj.forEach(element => {
                var cancelarUI = ``;
                var transacoes = ``;
                if(element.enviar){
                    cancelarUI = `<div class="modal-footer" style="border: none;">
                                    <button type="button"
                                        class="btn btn-secondary form-control btn-danger"
                                        onclick='RecorrentesRequests.modalCancelar("${(element.identificador)}")'>Cancelar</button>
                                </div>`;
                }

                (element.transacoes).forEach(transacao => {
                    var classe = "";
                    var sinal = "";
                    if (element.enviar) {
                        classe = "saida";
                        sinal = "-";
                    } else {
                        classe = "entrada";
                        sinal = "+";
                    }
                    transacoes += `<div class="transacao ${classe}">
                            <p class="valor">${sinal} ${(transacao.valor)}</p>
                            <p class="data">${(transacao.quando)}</p>
                            <p class="descricao">${(transacao.tipo)}</p>
                        </div>`;
                })
                var icon = "";
                var fechar = "";
                var cor = "";
                var titulo = "";
                if (element.enviar) {
                    icon = "assets/enviar-icon.svg";
                    fechar = "assets/fechar-enviar-icon.svg";
                    cor = "#dc3545";
                    titulo = "ENVIAR";
                } else {
                    icon = "assets/receber-icon.svg";
                    fechar = "assets/fechar-receber-icon.svg";
                    cor = "#00BF00";
                    titulo = "RECEBER";
                }
                itens += `<div class="recorrente" data-bs-toggle="modal" data-bs-target="#modalrecorrentes${(element.identificador)}" style="background:${cor}15">
                    <p class="acao" style="color:${cor}">${titulo}</p>
                    <p class="valor">${(element.valor)}</p>
                    <p class="data">${(element.quando)}</p>
                    <img src="${icon}">
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modalrecorrentes${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title"
                                    style="text-align: center;font-size: 15px;color: ${cor};">${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}"> ${(element.valor)}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    <p>De: ${(element.de)}</p>
                                    <p onclick='RecorrentesRequests.modalTransacoes("${(element.identificador)}")'>Tipo: ${(element.tipo)} <img src="assets/info.svg" style="width:20px"></p>
                                    <p>Descrição: ${(element.descricao)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.identificador)}</b></p>
                                </div>

                            </div>
                            ${cancelarUI}
                        </div>
                    </div>
                </div>
                
                
                <!-- Modal transacoes -->
                <div class="modal fade" id="transacoes${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align:center;font-size: 15px;color: ${cor};"> ${(element.transacoes.length)} TRANSAÇÕES</h5>
                                <img src="${fechar}" data-bs-dismiss="modal" aria-label="Close" style="width: 15px;">
                            </div>
                            <div class="modal-body" style="min-height:60vh">
                                ${transacoes}
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <!-- Modal cancelar -->
                <div class="modal fade" id="cancelar${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title"
                                    style="text-align: center;font-size: 15px;color: ${cor};">CANCELAR</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body" style="">
                                <br>
                                <p style="text-align:center;">Tem certeza <br>
                                que pretende cancelar <br>
                                a operação recorrente?</p> <br><br>
                                <p style="text-align:center;color:red;">OBSERVAÇÃO <br>
                                ESTÁ AÇÃO É IRREVERSÍVEL</p>
                            </div>
                            <div class="modal-footer" style="border: none;">
                                <button type="button" class="btn btn-light form-control" >Pensar melhor</button>
                                <button type="button" class="btn btn-secondary form-control btn-danger" onclick='RecorrentesRequests.modalConfirmar("${(element.identificador)}")'>Cancelar operação</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <!-- Modal confirmar -->
                <div class="modal fade" id="confirmar${(element.identificador)}" aria-hidden="true"
                tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="width: 300px;margin:auto;">
                        <div class="modal-header">
                            <button type="button" class="btn-close"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style="min-height:52vh">
                            <div class="detalhes-transacao">
                                <h1>Confirme o código que recebeu por mensagem</h1>
                                
                                <input type="text" class="form-control" placeholder="Digite aqui">
                                <br>
                                <p>Não recebeu o código?
                                    <br> <span style="color:#640564;font-weight: 500;cursor:pointer;">Click aqui...</span> </p>
                            </div>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary form-control btn-danger" onclick='RecorrentesRequests.confirmarSMS("${(element.identificador)}")'>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>`;
            });
            $("#render-recorrentes").append(itens);


        }).always(function () {
            loader.fechar();
        })
    }

    modalCancelar(id) {
        var myModal = new bootstrap.Modal(document.getElementById('cancelar' + id))
        myModal.toggle()
    }
    modalConfirmar(id) {
        var myModal = new bootstrap.Modal(document.getElementById('confirmar' + id))
        myModal.toggle()
    }
    modalTransacoes(id) {
        var myModal = new bootstrap.Modal(document.getElementById('transacoes' + id))
        myModal.toggle()
    }
}