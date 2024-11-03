class RecorrentesReq {

    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    recorrentes() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var esse = this;
        $("#render-recorrentes").html("");
        var loader = this.loader;
        var settings = {
            "url": (this.apiUrl)+"/recorrente/init",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken()
            }
        };
        (this.jquery).ajax(settings).done(function (dados) {
            var itens = ``;
            
            var obj = dados.payload;
            $("#qtd-recorrentes").html(obj.length + " recorrentes");
            obj.forEach(element => {
                var cancelarUI = ``;
                var transacoes = ``;
             
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
                var detail = "";
                var ativo = "";
                if (element.enviar) {
                    if (element.ativo == '1') {
                        ativo = "ATIVO";
                        if(element.tipo == "recorrente") {
                            cancelarUI = `<div class="modal-footer" style="border: none;">
                                    <button type="button"
                                        class="btn btn-secondary form-control btn-danger"
                                        onclick='RecorrentesRequests.cancelarOperacao("${(element.identificador)}","${(element.valor)}","${(titulo)}")'>Cancelar Operação</button>
                                </div>`;
                        }
                    }else {
                        ativo = "INATIVO";
                    }
                    icon = "assets/enviar-icon.svg";
                    fechar = "assets/fechar-enviar-icon.svg";
                    cor = "#dc3545";
                    titulo = "ENVIAR -- "+ativo;
                    detail = "Para: "+element.para;
                } else {
                    if (element.ativo == '1') {
                        ativo = "ATIVO";
                    }else {
                        ativo = "INATIVO";
                    }
                    icon = "assets/receber-icon.svg";
                    fechar = "assets/fechar-receber-icon.svg";
                    cor = "#00BF00";
                    titulo = "RECEBER -- "+ativo;
                    detail = "de: "+element.de;
                }
                itens += `<div class="recorrente" data-bs-toggle="modal" data-bs-target="#modalrecorrentes${(element.identificador)}" style="background:${cor}15">
                    <p class="acao" style="color:${cor}">${titulo}</p>
                    <p class="valor">${(MONEY(element.valor, 2, ".", " "))}</p>
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
                                <p class="pendente-valor" style="color:${cor}"> ${(MONEY(element.valor, 2, ".", " "))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    <p>${(detail)}</p>
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
                
                `;
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

    
    cancelarOperacao(id, valor, tipo) {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        console.log(id,Number(valor),tipo);
        ESCOPO.dadosOperacao = { pid: id };
        ESCOPO.acao = `Cancelar operação recorrente a ${tipo} de ${valor}.`;
        ESCOPO.callback = this.cancelar;
        ESCOPO.parametro = this;
        if (Number(valor) > 99999) {
            ESCOPO.confirmarFinal = "codigo";
        } else {
            ESCOPO.confirmarFinal = "pin";
        }
        

        InicioRequests.pedirNumeroOuPin();
            

    }
    cancelar(esse) {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        esse.loader.abrir();
        var headers = {
                "token": db.getToken(),
                "codigo": ESCOPO.codigo,
                "Content-Type": "application/json"
        }
        if(ESCOPO.confirmarFinal == "pin"){
            headers = {
                    "token": db.getToken(),
                    "pin": ESCOPO.pin,
                    "Content-Type": "application/json"
            }
        }
        var settings = {
            "url": (esse.apiUrl)+"/recorrente/cancelar",
            "method": "POST",
            "timeout": 0,
            "headers": headers,
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.ok){
                InicioRequests.home();
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 0);
                setTimeout(function(){
                    vaiTela("\home");
                },1000);
            }else{
                
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });
            

    }

}