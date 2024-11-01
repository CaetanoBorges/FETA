class EstatisticaReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }

    init() {
        var esse = this;
        esse.loader.abrir()


        var settings = {
            "url": (this.apiUrl) + "/estatistica/init",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "token": db.getToken()
            },
        };

        var mes = [];
        var ano = [];
        esse.jquery.ajax(settings).done(function (d) {
            console.log(d);
            var anoAtual = (d.payload.atual.ano);
            var mesAtual = (d.payload.atual.mes);
            this.datas = (d.payload.datas).reverse();
            (this.datas).forEach(element => {

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

            a.unshift({ text: (anoAtual), value: (anoAtual) });
            m.unshift({ text: (mesAtual), value: (mesAtual) });

            esse.controllerData();
            ESCOPO.selectAno.setData(a);
            ESCOPO.selectMes.setData(m);

            //---------------
            var dados = d.payload.atual.res;
            esse.jquery(".entrada-left").html(dados.qtd_entrada + " ENTRADAS");
            esse.jquery(".saida-left").html(dados.qtd_saida + " SAIDAS");
            esse.jquery(".entrada-right").html((MONEY(dados.total_entrada, 2, ".", " ")));
            esse.jquery(".saida-right").html(((MONEY(dados.total_saida, 2, ".", " "))));

            var widthContainer = (dados.dados).length * 25;
            var res = ``;
            (dados.dados).forEach(function (v, k) {
                var dia = v[2];
                var entrada = v[0];
                var saida = v[1];

                var entradaPercent = Math.round((entrada / (entrada + saida)) * 100);
                var saidaPercent = Math.round((saida / (entrada + saida)) * 100);
                //console.log("key "+(k+1), "Val "+v);
                res += `<div class="barra"><div class="barra-grafico"><div class="saida" style="height:${saidaPercent}%"></div><div class="entrada" style="height:${entradaPercent}%"></div></div> <div class="limpar"></div> <p>${dia}</p></div>`;
                //console.log("Entrada " + entradaPercent, "Saida " + saidaPercent, widthContainer);
            })
            esse.jquery(".render-grafico").html(res);
            esse.jquery(".render-grafico").css({ "width": widthContainer + "px" });

            setTimeout(function () {
                
                ESCOPO.init = false;
            }, 1500);
        }).always(function (a) {
            esse.loader.fechar();
        });

    }
    controllerData() {
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

            console.log(mes, ano);
            if (mes != "00" && mes != 0 && mes != "0" && ESCOPO.init != true) {
                esse.estatisticas(mes, ano);
            }

        });
    }

    /**
     * Fetches and displays transaction statistics for a given month and year.
     *
     * This function makes an AJAX POST request to the server to obtain transaction data
     * for the specified month and year. The received data is then processed and displayed
     * on the webpage. Each transaction is represented as an HTML element, with details
     * such as the amount, date, recipient/sender, type, and description. Additionally,
     * a modal is created for each transaction to show detailed information.
     *
     * @param {string} mes - The month for which to retrieve transaction statistics.
     * @param {string} ano - The year for which to retrieve transaction statistics.
     */
    estatisticas(mes, ano) {
        var esse = this;
        this.loader.abrir();
        var settings = {
            "url": (this.apiUrl) + "/estatistica/ver",
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
        (this.jquery).ajax(settings).done(function (d) {
            console.log(d);
            var dados = d.payload;
            esse.jquery(".entrada-left").html(dados.qtd_entrada + " ENTRADAS");
            esse.jquery(".saida-left").html(dados.qtd_saida + " SAIDAS");
            esse.jquery(".entrada-right").html((MONEY(dados.total_entrada, 2, ".", " ")));
            esse.jquery(".saida-right").html(((MONEY(dados.total_saida, 2, ".", " "))));

            var widthContainer = (dados.dados).length * 25;
            var res = ``;
            (dados.dados).forEach(function (v, k) {
                var dia = v[2];
                var entrada = v[0];
                var saida = v[1];

                var entradaPercent = Math.round((entrada / (entrada + saida)) * 100);
                var saidaPercent = Math.round((saida / (entrada + saida)) * 100);
                //console.log("key "+(k+1), "Val "+v);
                res += `<div class="barra"><div class="barra-grafico"><div class="saida" style="height:${saidaPercent}%"></div><div class="entrada" style="height:${entradaPercent}%"></div></div> <div class="limpar"></div> <p>${dia}</p></div>`;
                //console.log("Entrada " + entradaPercent, "Saida " + saidaPercent, widthContainer);
            })
            esse.jquery(".render-grafico").html(res);
            esse.jquery(".render-grafico").css({ "width": widthContainer + "px" });

        }).always(function () {
            esse.loader.fechar();
        })
        setTimeout(function () {
            ESCOPO.init = false;
        }, 1500)
    }


}