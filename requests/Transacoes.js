class TransacoesReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
        this.datas =[];
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
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var esse = this;
        esse.loader.abrir();


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
            esse.datas = (d.payload.datas) ? (d.payload.datas) : [];
            localStorage.setItem("datas", JSON.stringify(esse.datas));
            (esse.datas).forEach(element => {
                let atualYear = element.ano;
                if (atualYear != anoAtual) {
                    ano.push({ text: String(atualYear), value: String(atualYear) });
                }

                if (element[anoAtual]) {
                    element[anoAtual].forEach(month => {
                        if (month != mesAtual) {
                            mes.push({ text: String(month), value: String(month) });
                        }
                    })
                }
            })


            let m = (Object.values(mes.reduce((acc, cur) => Object.assign(acc, { [cur.text]: cur }), {})));
            let a = (Object.values(ano.reduce((acc, cur) => Object.assign(acc, { [cur.text]: cur }), {})));

            ESCOPO.selectAno = new SlimSelect({
                select: '#ano',
                settings: {
                    showSearch: false
                }
            })
            ESCOPO.selectMes = new SlimSelect({
                select: '#mes',
                settings: {
                    showSearch: false
                }
            })

            a.sort((a, b) => b.text - a.text);
            m.sort((a, b) => b.text - a.text);
            
            a.unshift({ text: String(anoAtual), value: String(anoAtual) });
            m.unshift({ text: String(mesAtual), value: String(mesAtual) });
            esse.controllerData();
            ESCOPO.selectAno.setData(a);
            ESCOPO.selectMes.setData(m);

            //---------------

            var itens = ``;
            var obj = d.payload.atual.res;
            //console.log(obj);
            obj.forEach(element => {
                var fechar = "";
                var classe = "";
                var cor = "";
                var titulo = "";
                var sinal = "";
                var quem = "";
                var eu = "";
                if (element.enviar) {
                    fechar = "assets/fechar-saida-icon.svg";
                    quem = `<p>Para: ${(element.para)} <br> <b>${((String(element.para_nome)).toUpperCase())}</b></p>`;
                    eu = `<p>De: ${((localStorage.getItem("telefone")))} <br> <b>${((localStorage.getItem("nome")).toUpperCase())}</b></p>`;
                    classe = "saida";
                    cor = "#BF0003";
                    titulo = "SAIDA";
                    sinal = "-";
                } else {
                    fechar = "assets/fechar-entrada-icon.svg";
                    quem = `<p>De: ${(element.de)} <br> <b>${((String(element.de_nome)).toUpperCase())}</b></p>`;
                    eu = `<p>Para: ${((localStorage.getItem("telefone")))} <br> <b>${((localStorage.getItem("nome")).toUpperCase())}</b></p>`;
                    classe = "entrada";
                    cor = "#00BF00";
                    titulo = "ENTRADA";
                    sinal = "+";
                }
                itens += `
                <div class="transacao ${classe}" data-bs-toggle="modal" data-bs-target="#tr${(element.identificador)}">
                    <p class="valor">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                    <p class="data">${(element.quando)}</p>
                    <p class="descricao">${(element.descricao)}</p>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="tr${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="width: 300px;margin:auto;">
                            <div class="OPDF">
                                <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                    <h5 class="modal-title" style="text-align: center;font-size: 15px;color: ${cor};">DETALHES &nbsp; DA  ${titulo}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background:${cor};"></button>
                                
                                </div>
                                <div class="modal-body">
                                    <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                                    <div class="detalhes-transacao">

                                        <p>Quando: ${(element.quando)}</p>
                                        <p>Onde: ${(element.onde)}</p>
                                        ${quem}
                                        ${eu}
                                        <p>Tipo: ${(element.tipo)}</p>
                                        <p>Descrição : ${(element.descricao)}</p>

                                    </div>
                                    <br>
                                    <div class="id-transacao">
                                        <p>Id transação</p>
                                        <p><b>${(element.identificador)}</b></p>
                                    </div>

                                </div>
    
                            </div>    
                            <div class="modal-footer" style="border-top: 1px solid ${cor};">
                                <button type="button" class="btn form-control" onclick='savePDF("tr${(element.identificador)}")' style="background:${cor};">COMPROVATIVO</button>
                            </div>                 
                        </div>
                    </div>
                </div>`;
            });
            setTimeout(function () {
                $("#qtd").html(obj.length + " transacoes");
                ESCOPO.init = false;
            }, 1500);
            $(".render-aqui").append(itens);

        }).always(function (a) {
            esse.loader.fechar();
        });

            


    }

    transacoes(mes, ano) {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        $(".render-aqui").html("");
        var esse = this;
        this.loader.abrir();
        var settings = {
            "url": (this.apiUrl) + "/transacao/ver",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "token": db.getToken(),
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "mes": mes,
                "ano": ano
            }),
        };
        ESCOPO.init = true;
        (this.jquery).ajax(settings).done(function (dados) {

            var itens = ``;
            //console.log(dados);
            var obj = dados.payload;

            obj.forEach(element => {
                var fechar = "";
                var classe = "";
                var cor = "";
                var titulo = "";
                var sinal = "";
                var quem = "";
                var eu = "";
                if (element.enviar) {
                    fechar = "assets/fechar-saida-icon.svg";
                    quem = `<p>Para: ${(element.para)} <br><b>${((String(element.para_nome)).toUpperCase())}</b></p>`;
                    eu = `<p>De: ${((localStorage.getItem("telefone")))} <br><b>${((localStorage.getItem("nome")).toUpperCase())}</b></p>`;
                    classe = "saida";
                    cor = "#BF0003";
                    titulo = "SAIDA";
                    sinal = "-";
                } else {
                    fechar = "assets/fechar-entrada-icon.svg";
                    quem = `<p>De: ${(element.de)} <br><b>${((String(element.de_nome)).toUpperCase())}</b></p>`;
                    eu = `<p>Para: ${((localStorage.getItem("telefone")))} <br><b>${((localStorage.getItem("nome")).toUpperCase())}</b></p>`;
                    classe = "entrada";
                    cor = "#00BF00";
                    titulo = "ENTRADA";
                    sinal = "+";
                }
                itens += `
                <div class="transacao ${classe}" data-bs-toggle="modal" data-bs-target="#tr${(element.identificador)}">
                    <p class="valor">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                    <p class="data">${(element.quando)}</p>
                    <p class="descricao">${(element.descricao)}</p>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="tr${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;">
                            <div class="OPDF">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align: center;font-size: 15px;color: ${cor};">DETALHES &nbsp; DA ${titulo}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background:${cor};"></button>
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    ${quem}
                                    ${eu}
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
                            <div class="modal-footer" style="border-top: 1px solid ${cor};">
                                <button type="button" class="btn form-control" onclick='savePDF("tr${(element.identificador)}")' style="background:${cor};">COMPROVATIVO</button>
                            </div>  
                        </div>

                    </div>
                </div>`;
            });
            $(".render-aqui").append(itens);
            $("#qtd").html(obj.length + " transacoes");

        }).always(function () {
            esse.loader.fechar();
        })
        setTimeout(function () {
            ESCOPO.init = false;
        }, 1500);
            

    }


    controllerData() {
        var ver =  db.verificaSessao();
        if(ver){
            db.verificaToken();
            return;
        }
        var esse = this;
        $('#ano').on("change", function () {
            
            var ano = $('#ano').val();
            var mes = [];

            (JSON.parse(localStorage.getItem("datas"))).forEach(function (element) {
                if (element[ano]) {
                    (element[ano]).forEach(function (month) {
                        mes.unshift({ text: (month), value: (month) });
                    })
                }

            });
            mes.unshift({ text: "Selecionar", value: "00" });

            ESCOPO.selectMes.destroy()
            ESCOPO.selectMes = new SlimSelect({
                select: '#mes',
                settings: {
                    showSearch: false,
                    keepOrder: true
                }
            });

            ESCOPO.selectMes.setData(mes);
            if (ESCOPO.init != true) {
                $(".render-aqui").html(`<br><h4 style="text-align:center">SELECIONE O MÊS</h4><br>`);
                $("#qtd").html(" &nbsp; ");
            }

        });
        $('#mes').on("change", function () {
            var mes = String($('#mes').val());
            var ano = String($('#ano').val());

            //console.log(mes, ano);
            if (mes != "00" && mes != 0 && mes != "0" && ESCOPO.init != true) {
                esse.transacoes(mes, ano);
            }

        });
            

    }
}