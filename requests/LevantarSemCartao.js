class LevantarSemCartaoReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {
        var ver = db.verificaSessao();
        if (ver) {
            db.verificaToken();
            return;
        }

    }
    modalConfirmar() {
        ESCOPO.modalConfirmar = new bootstrap.Modal(document.getElementById('confirmar-modal'))
        ESCOPO.modalConfirmar.toggle()
    }
    modalConcluirLevantamento() {
        ESCOPO.modalConcluirLevantamento = new bootstrap.Modal(document.getElementById('concluir-levantamento'));
        ESCOPO.modalConcluirLevantamento.toggle()
    }

    pegaDadosOperacao() {
        var ver = db.verificaSessao();
        if (ver) {
            db.verificaToken();
            return;
        }
        var notificacao = this.notificacao;
        ESCOPO.dadosOperacao = {
        };
        var valor = $("#quanto").val();
        var codigo = $("#codigo").val();
        var tipo = "levantamento";
        var onde = "App";

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if (valor < 1) {
            notificacao.sms("Verifica o valor a levantar", 1);
            return;
        }

        if (codigo.length < 3) {
            notificacao.sms("Verifique o código", 1);
            return;
        } else {
            ESCOPO.dadosOperacao.codigo = codigo;
        }
        //--------------------------------------------------------
        ESCOPO.dadosOperacao.valor = valor;
        ESCOPO.dadosOperacao.tipo = tipo;
        ESCOPO.dadosOperacao.onde = onde;
        ESCOPO.dadosOperacao.descricao = "Levantamento sem cartão";
        ESCOPO.acao = `Levantamento sem cartão \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;
        var tipoo = ``;
        $("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            ${tipoo}
            <p>Descrição: Levantamento sem cartão</p>
            `)

        this.modalConfirmar();
        //console.log(ESCOPO.dadosOperacao);
        if (valor > 99999) {
            ESCOPO.confirmarFinal = "codigo";
        } else {
            ESCOPO.confirmarFinal = "pin";
        }

        ESCOPO.callback = this.novoEnvio;
        ESCOPO.parametro = this;

    }
    novoEnvio(esse) {
        var ver = db.verificaSessao();
        if (ver) {
            db.verificaToken();
            return;
        }
        var headers = {
            "token": db.getToken(),
            "codigo": ESCOPO.codigo,
            "Content-Type": "application/json"
        }
        if (ESCOPO.confirmarFinal == "pin") {
            headers = {
                "token": db.getToken(),
                "pin": ESCOPO.pin,
                "Content-Type": "application/json"
            }
        }
        var settings = {
            "url": (esse.apiUrl) + "/semcartao/levantar",
            "method": "POST",
            "timeout": 0,
            "headers": headers,
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };
        esse.loader.abrir();
        $.ajax(settings).done(function (response) {
            //console.log(response);
            if (response.ok) {
                //InicioRequests.home();
                ESCOPO.modalConfirmar.hide();
                ESCOPO.modalConfirmarFinal.hide();
                
                esse.modalConcluirLevantamento();
                var html = $(`<div class="detalhes-info"><b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} Kz</b> <br><span>VALOR</span><br><br>${(response.payload)}<br><span>CÓDIGO COMPLETO</span><br><br>23h59m<br><span>VALIDADE</span><br><br><br><p>Com os dados do pedido poderá efectuar o<br>levantamento no ATM mais próximo de si!</p><input type="text" id="minha-referencia" value="${(response.payload)}" style="display:none;"></div>`);
                console.log(html);
                $("#detalhes-levantamento").append(html);

                $("#codigo-confirmacao").val("");
                esse.notificacao.sms("Levantamento sem cartão realizado com sucesso", 0);
                esse.loader.fechar();
            } else {

                ESCOPO.modalConfirmar.hide();
                ESCOPO.modalConfirmarFinal.hide();
                $("#codigo-confirmacao").val("");
                esse.notificacao.sms(response.payload, 1);
                esse.loader.fechar();
            }
        });


    }
    copiarParaClipboard(elemento = "minha-referencia") {
        // Get the text field
        var copyText = document.querySelector("#"+elemento);

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        this.notificacao.sms("Referência copiada para a área de transferência", 0);
        // Alert the copied text
    }

    //-------------------------------------------
    levantamentos() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        $("#render-pendentes").html("");
        var loader = this.loader;
        var settings = {
            "url": (this.apiUrl) + "/semcartao/init",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken()
            }
        };
        (this.jquery).ajax(settings).done(function (dados) {
            var itens = ``;
            //console.log(dados);
            var obj = dados.payload;
            $("#qtd-pendentes").html(obj.length + " levantamentos");
            obj.forEach(element => {
                var btn_confirmar = "";
                var icon = "";
                var fechar = "";
                var cor = "";
                var titulo = "";
                var sinal = "";
                var copiar = "";
                

                if (element.executado == "1" || element.executado == 1) {
                    icon = "assets/enviar-icon.svg";
                    fechar = "assets/fechar-enviar-icon.svg";
                    cor = "#000";
                    titulo = "USADO";
                    sinal = "-";
  
                } else {
                    icon = "assets/receber-icon.svg";
                    fechar = "assets/fechar-receber-icon.svg";
                    cor = "#000";
                    titulo = "ATIVO";
                    sinal = "";
                    copiar = `<img src="assets/btn/copiar.svg" style="width: 60px;display: block;margin: 10px auto;" class=" hvr-bounce-out" onclick='LevantarSemCartaoRequests.copiarParaClipboard("ref${(element.identificador)}")'><br>`;
                    btn_confirmar = `<button type="button"
                                    class="btn btn-secondary form-control btn-danger"
                                     onclick='LevantarSemCartaoRequests.cancelarOperacao("${(element.identificador)}", "${(element.total)}", "${(titulo)}")'>Cancelar Operação</button>`;
                }
                itens += `<div class="pendente" data-bs-toggle="modal" data-bs-target="#modalpendentes${(element.identificador)}" style="background:${cor}15">
                    <p class="acao" style="color:${cor}">${titulo}</p>
                    <p class="valor">${(MONEY(element.total, 2, ".", " "))}</p>
                    <p class="data">${(element.quando)}</p>
                    <img src="${icon}">
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modalpendentes${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title"
                                    style="text-align: center;font-size: 15px;color: ${cor};">${titulo}</h5>
                                <button type="button" class="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${(MONEY(element.total, 2, ".", " "))}</p>
                                <div class="detalhes-transacao">

                                    <p style="text-align: center">${(element.quando)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Referência</p>
                                    <p><b>${(element.referencia)}</b></p>
                                    <input type="text" id="ref${(element.identificador)}" value="${(element.referencia)}" style="display:none;">
                                    ${copiar}
                                </div>

                            </div>
                            <div class="modal-footer" style="border: none;">
                            ${btn_confirmar}
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
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        //console.log(id,Number(valor),tipo);
        ESCOPO.dadosOperacao = { identificador: id };
        ESCOPO.acao = `Cancelar levantamento sem cartão de ${valor}.`;
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
            "url": (esse.apiUrl)+"/semcartao/cancelar",
            "method": "POST",
            "timeout": 0,
            "headers": headers,
            "data": JSON.stringify(ESCOPO.dadosOperacao),
        };

        $.ajax(settings).done(function (response) {
            //console.log(response);
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