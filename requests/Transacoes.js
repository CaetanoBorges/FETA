class TransacoesReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
        this.datas;
    }
    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }
    init() {
        var esse = this;
        esse.loader.abrir();
        var selectAno = new SlimSelect({
            select: '#ano',
            settings: {
                showSearch: false,
                keepOrder: true
            }
        })
        ESCOPO.selectMes = new SlimSelect({
            select: '#mes',
            settings: {
                showSearch: false,
                keepOrder: true
            }
        })

        var settings = {
            "url": (this.apiUrl) + "/transacao/init",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken()
            }
        };

        var mes = [];
        var ano = [];
        esse.jquery.ajax(settings).done(function (d) {

            //console.log(d);
            var anoAtual = (d.payload.atual.ano);
            var mesAtual = (d.payload.atual.mes);
            esse.datas = (d.payload.datas);
            localStorage.setItem("datas", JSON.stringify(esse.datas));
            (esse.datas).forEach(element => {
                let atualYear = element.ano;
                ano.push({ text: (atualYear), value: (atualYear) });
                if (element[anoAtual]) {
                    element[anoAtual].forEach(month => {
                        mes.push({ text: (month), value: (month) });
                    })
                }
            })


            ano.unshift({ text: (anoAtual), value: (anoAtual) });
            mes.unshift({ text: (mesAtual), value: (mesAtual) });

            let m = (Object.values(mes.reduce((acc, cur) => Object.assign(acc, { [cur.text]: cur }), {})));
            let a = (Object.values(ano.reduce((acc, cur) => Object.assign(acc, { [cur.text]: cur }), {})));

            selectAno.setData(a);
            ESCOPO.selectMes.setData(m);

            //---------------

            var itens = ``;
            var obj = d.payload.atual.res;
            console.log(obj);
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
                    <p class="valor">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
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
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
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
            $("#qtd").html(obj.length + " transacoes");
            $(".render-aqui").append(itens);
        }).always(function (a) {
            esse.loader.fechar();
        });
        //VER O QUE SE PASSA
        $('#ano').on("change", function () {
            var ano = $('#ano').val();
            var mes = [];

            ESCOPO.selectMes.destroy()
            ESCOPO.selectMes = new SlimSelect({
                select: '#mes',
                settings: {
                    showSearch: false,
                    keepOrder: true
                }
            });
            (JSON.parse(localStorage.getItem("datas"))).forEach(function (element) {
                if (element[ano]) {
                    (element[ano]).forEach(function (month) {
                        mes.unshift({ text: (month), value: (month) });
                    })
                }

            });
            mes.unshift({text: "Selecionar", value: "00"});
            ESCOPO.selectMes.setData(mes);
            $(".render-aqui").html(`<h4 style="text-align:center">SELECIONE O MÊS</h4>`);
            return;
        });
        //----------
        
    }

    transacoes() {
        $(".render-aqui").html("");
        var esse = this;
        this.loader.abrir();
        var settings = {
            "url": (this.apiUrl) + "/transacao/ver",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken(),
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "mes": $('#mes').val(),
                "ano": $('#ano').val()
            }),
        };
        console.log(JSON.stringify({
                "mes": $('#mes').val(),
                "ano": $('#ano').val()
            }));
        (this.jquery).ajax(settings).done(function (dados) {

            var itens = ``;
            //console.log(dados);
            var obj = dados.payload;
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
                    <p class="valor">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
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
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
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
            esse.loader.fechar();
        })
    }
}