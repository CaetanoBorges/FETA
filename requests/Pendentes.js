class PendentesReq {

    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    pendentes() {
        $("#render-pendentes").html("");
        var loader = this.loader;
        var settings = {
            "url": (this.apiUrl) + "/pendente/init",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken()
            }
        };
        (this.jquery).ajax(settings).done(function (dados) {
            var itens = ``;
            console.log(dados);
            var obj = dados.payload;
            $("#qtd-pendentes").html(obj.length + " pendentes");
            obj.forEach(element => {
                var btn_confirmar = "";
                var icon = "";
                var fechar = "";
                var cor = "";
                var titulo = "";
                var sinal = "";
                var detail = "";
                
                var ttipo = element.tipo;
                var iid = element.pid;
                var vvalor = element.valor;

                if (element.para != (localStorage.getItem("telefone"))) {
                    icon = "assets/enviar-icon.svg";
                    fechar = "assets/fechar-enviar-icon.svg";
                    cor = "#dc3545";
                    titulo = "ENVIAR";
                    sinal = "-";
                    detail = "Para: " + element.para;
                    btn_confirmar = `<button type="button" class="btn btn-primary form-control"
                                    style="background-color: ${cor};color:black;border: 1px solid ${cor}" onclick='PendentesRequests.aceitarOperacao("${iid}","${(vvalor)}","${(titulo)}")'>Confirmar</button>`;
                } else {
                    icon = "assets/receber-icon.svg";
                    fechar = "assets/fechar-receber-icon.svg";
                    cor = "#00BF00";
                    titulo = "RECEBER";
                    sinal = "+";
                    detail = "de: " + element.de;
                }
                itens += `<div class="pendente" data-bs-toggle="modal" data-bs-target="#modalpendentes${(element.pid)}" style="background:${cor}15">
                    <p class="acao" style="color:${cor}">${titulo}</p>
                    <p class="valor">${(MONEY(element.valor, 2, ".", " "))}</p>
                    <p class="data">${(element.quando)}</p>
                    <img src="${icon}">
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modalpendentes${(element.pid)}" tabindex="-1" aria-hidden="true">
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
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${(MONEY(element.valor, 2, ".", " "))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    <p>${(detail)}</p>
                                    <p>Tipo: ${(element.tipo)}</p>
                                    <p>Descrição: ${(element.descricao)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.pid)}</b></p>
                                </div>

                            </div>
                            <div class="modal-footer" style="border: none;">
                                ${btn_confirmar}	
                                <button type="button"
                                    class="btn btn-secondary form-control btn-danger"
                                     onclick='PendentesRequests.cancelarOperacao("${(element.pid)}", "${(element.valor)}", "${(titulo)}")'>Cancelar Operação</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            $("#render-pendentes").append(itens);


        }).always(function () {
            loader.fechar();
        })
    }

    cancelarOperacao(id, valor, tipo) {
        console.log(id,Number(valor),tipo);
        ESCOPO.dadosOperacao = { pid: id };
        ESCOPO.acao = `Cancelar operação pendente a ${tipo} de ${valor}.`;
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
            "url": (esse.apiUrl)+"/pendente/cancelar",
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

    
    aceitarOperacao(element, valor, tipo) {
        console.log(element);
        ESCOPO.dadosOperacao = { pid: element };
        ESCOPO.acao = `Aceitar operação pendente a ${tipo} de ${valor}.`;
        ESCOPO.callback = this.aceitar;
        ESCOPO.parametro = this;
        if (Number(valor) > 99999) {
            ESCOPO.confirmarFinal = "codigo";
        } else {
            ESCOPO.confirmarFinal = "pin";
        }
        

        InicioRequests.pedirNumeroOuPin();
    }
    aceitar(esse) {
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
            "url": (esse.apiUrl)+"/transacao/aceitarpendente",
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