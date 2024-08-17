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

            esse.jquery.get("APIMOCK/stats.json").done(function (dados) {
                esse.jquery(".entrada-left").html(dados.qtd_entrada+" ENTRADAS");
                esse.jquery(".saida-left").html(dados.qtd_saida+" SAIDAS");
                esse.jquery(".entrada-right").html((dados.total_entrada).toFixed(2));
                esse.jquery(".saida-right").html((dados.total_saida.toFixed(2)));

                var widthContainer = (dados.dados).length * 25;
                var res = ``;
                (dados.dados).forEach(function(v,k){
                    var dia = (k+1);
                    var entrada = v[0];
                    var saida = v[1];

                    var entradaPercent = Math.round((entrada / (entrada + saida))*100);
                    var saidaPercent = Math.round((saida / (entrada + saida))*100);
                    //console.log("key "+(k+1), "Val "+v);
                    res+=`<div class="barra"><div class="barra-grafico"><div class="saida" style="height:${saidaPercent}%"></div><div class="entrada" style="height:${entradaPercent}%"></div></div> <div class="limpar"></div> <p>${dia}</p></div>`;
                    console.log("Entrada "+entradaPercent, "Saida "+saidaPercent, widthContainer);
                })
                esse.jquery(".render-grafico").html(res);
                esse.jquery(".render-grafico").css({"width":widthContainer+"px"});
                //console.log(dados);
            })
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