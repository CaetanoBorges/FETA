class TransacoesReq {

    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    init() {
        var esse = this;
        esse.loader.abrir()
        var selectAno = new SlimSelect({
            select: '#ano',
            settings: {
                showSearch: false
            }
        })
        var selectMes = new SlimSelect({
            select: '#mes',
            settings: {
                showSearch: false
            }
        })
        esse.jquery.get("APIMOCK/statsData.json").done(function (d) {

            var mes = [];
            d.mes.forEach(element => {
                mes.push({ text: (element), value: (element) });
            });
            selectMes.setData(mes);

            var ano = [];
            d.ano.forEach(element => {
                ano.push({ text: (element), value: (element) });
            });
            selectAno.setData(ano);
            //---------------

        }).always(function (a) {
            esse.loader.fechar();
        });

        $('#ano').change(function () {
            esse.loader.abrir();
            setTimeout(function () {
                esse.loader.fechar();
            }, 3000)
        })
        $('#mes').change(function () {
            esse.loader.abrir();
            setTimeout(function () {
                esse.loader.fechar();
            }, 3000)
        })
    }

    transacoes() {
        $(".render-aqui").html("");
        var loader = this.loader;
        (this.jquery).get("APIMOCK/transacoes.json").done(function (dados) {
            var itens = ``;
            //console.log(dados);
            var obj = dados;
            $("#qtd").html(obj.length + " transacoes");
            obj.forEach(element => {
                var fechar = "";
                var classe = "";
                var cor = "";
                var titulo = "";
                var sinal = "";
                var quem = "";
                if (element.enviar) {
                    fechar = "assets/fechar-saida-icon.svg";
                    quem = `<p>Para: ${(element.para)}</p>`;
                    classe = "saida";
                    cor = "#BF0003";
                    titulo = "SAIDA";
                    sinal = "-";
                } else {
                    fechar = "assets/fechar-entrada-icon.svg";
                    quem = `<p>De: ${(element.de)}</p>`;
                    classe = "entrada";
                    cor = "#00BF00";
                    titulo = "ENTRADA";
                    sinal = "+";
                }
                itens += `
                <div class="transacao ${classe}" data-bs-toggle="modal" data-bs-target="#exampleModal${(element.identificador)}">
                    <p class="valor">${sinal} ${(element.valor)}</p>
                    <p class="data">${(element.quando)}</p>
                    <p class="descricao">${(element.descricao)}</p>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align: center;font-size: 15px;color: ${cor};">DETALHES DA ${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${(element.valor)}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    ${quem}
                                    <p>Tipo: ${(element.tipo)}</p>
                                    <p>Descrição: ${(element.descricao)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.identificador)}</b></p>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>`;
            });
            $(".render-aqui").append(itens);


        }).always(function () {
            loader.fechar();
        })
    }
}