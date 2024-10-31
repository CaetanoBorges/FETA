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
                ano.push({ text: (atualYear), value: (atualYear) });
                if (element[anoAtual]) {
                    element[anoAtual].forEach(month => {
                        mes.push({ text: (month), value: (month) });
                    })
                }
            })


            ano.push({ text: (anoAtual), value: (anoAtual) });
            mes.push({ text: (mesAtual), value: (mesAtual) });

            let m = (Object.values(mes.reduce((acc, cur) => Object.assign(acc, { [cur.text]: cur }), {})));
            let a = (Object.values(ano.reduce((acc, cur) => Object.assign(acc, { [cur.text]: cur }), {})));

            selectAno.setData(a);
            selectMes.setData(m);

            //---------------
            var dados = d.payload.atual.res;
            esse.jquery(".entrada-left").html(dados.qtd_entrada + " ENTRADAS");
            esse.jquery(".saida-left").html(dados.qtd_saida + " SAIDAS");
            esse.jquery(".entrada-right").html((MONEY(dados.total_entrada,2,"."," ")));
            esse.jquery(".saida-right").html(((MONEY(dados.total_saida,2,"."," "))));

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

}