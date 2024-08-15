class PagamentosReq {
    servicos = {
        Recargas: ["Unitel", "Africel", "Movicel", "NetOne"],
        TV: ["DSTV", "ZAP", "ZAP Fibra"],
        Estado: ["ENDE", "EPAL"],
        Outros: ["Empresa X", "Facebook", "SimpleComerce"],
    }

    entidades = {
        Unitel: {
            Produtos: [{ id: "SALDO_VOZ", label: "SALDO VOZ" }, { id: "NET_ATE_15_GB", label: "NET ATÉ 15 GB" }, { id: "SALDO_NET_CASA_4G", label: "SALDO NET CASA 4G" }, { id: "PLANO_MAIS_30_DIAS", label: "PLANO MAIS 30 DIAS" }, { id: "PLANO_MAIS_VOZ", label: "PLANO MAIS VOZ" }, { id: "PLANO_MAIS_DADOS", label: "PLANO MAIS DADOS" }, { id: "REDES_SOCIAIS_PLUS", label: "REDES SOCIAIS PLUS" }, { id: "NET_ACIMA_15_GB", label: "NET ACIMA 15 GB" }],
            OpcaoProduto: {
                SALDO_VOZ: [],
                NET_ATE_15_GB: [3]
            },
            Precos: {
                SALDO_VOZ: [{ preco: 200, label: "200,00 kz VALOR EM KWANZAS" }, { preco: 500, label: "500,00 kz VALOR EM KWANZAS " }, { preco: 1000, label: "1.000,00 kz VALOR EM KWANZAS" }, { preco: 1500, label: "1.500,00 kz VALOR EM KWANZAS" }, { preco: 2000, label: "2.000,00 kz VALOR EM KWANZAS" }, { preco: 3000, label: "3.000,00 kz VALOR EM KWANZAS" }, { preco: 5000, label: "5.000,00 kz VALOR EM KWANZAS" }, { preco: 10000, label: "10.000,00 kz VALOR EM KWANZAS" }],
                NET_ATE_15_GB: [{ preco: 300, label: "300,00 KZ NET DIA 1GB 1D" }, { preco: 500, label: "500,00 KZ NET 1.5GB 3 DIAS" }, { preco: 1000, label: "1.000,00 KZ BIG 3 GB 7 DIAS" }, { preco: 1500, label: "1.500,00 KZ  1.5GB 31 DIAS" }, { preco: 2000, label: "2000,00 KZ  2 GB 31 DIAS" }, { preco: 3000, label: "3.000,00 KZ  3.5GB 31 DIAS" }, { preco: 5000, label: "5.000,00 KZ  6 GB 31 DIAS" }, { preco: 10000, label: "10.000,00 KZ  12 GB 31 DIAS" }],
                SALDO_NET_CASA_4G: [{ preco: 7000, label: "7.000,00 Kz ILIM 10Mbps 7 DIAS" }, { preco: 11990, label: "11.990,00 Kz ILIM 5Mbps 31 DIAS" }, { preco: 12000, label: "12.000,00 Kz 15 GB 31 DIAS" }, { preco: 14000, label: "14.000,00 Kz ILIM 20Mbps 7 DIAS" }, { preco: 23990, label: "23.990,00 Kz ILIM 10Mbps 31 DIAS" }, { preco: 24000, label: "24.000,00 Kz 35 GB 31 DIAS" }, { preco: 32000, label: "32.000,00 Kz 50 GB 31 DIAS" }, { preco: 48000, label: "48.000,00 Kz ILIM 20Mbps 31 DIAS" }],
                PLANO_MAIS_30_DIAS: [{ preco: 2000, label: "2.000,00 Kz 70MIN+60SMS+500MB" }, { preco: 20000, label: "20.000,00 Kz 200MIN/SMS + 10GB" }, { preco: 25000, label: "25.000,00 Kz 2000MIN/SMS + 25GB" }, { preco: 40000, label: "40.000,00 Kz 3000MIN/SMS + 50GB" }],
                PLANO_MAIS_VOZ: [{ preco: 300, label: "300,00 Kz 70MIN + 70SMS 3D" }, { preco: 650, label: "650,00 Kz 150MIN + 150SMS 3D" }],
                PLANO_MAIS_DADOS: [{ preco: 300, label: "300,00 Kz 40MIN40SMS400MB 3D" }, { preco: 650, label: "650,00 Kz 80MIN+80SMS+1G 3D" }, { preco: 1000, label: "1.000,00 Kz 120MIN/SMS 2G 7D" }, { preco: 2000, label: "2.000,00 Kz 240MIN/SMS 4G 7D" }, { preco: 5000, label: "5.000,00 Kz 600MIN/SMS 10GB 7D" }, { preco: 10000, label: "10.000,00 Kz 1500MIN/SMS 20G 7D" }],
                REDES_SOCIAIS_PLUS: [{ preco: 200, label: "200,00 Kz 600 MB 3 DIAS" }, { preco: 500, label: "500,00 Kz 1,5 GB 7 DIAS" }, { preco: 1000, label: "1.000,00 Kz 3 GB 30 DIAS" }],
                NET_ACIMA_15_GB: [{ preco: 25000, label: "25.000,00 Kz 30 GB" }, { preco: 35000, label: "35.000,00 Kz 50 GB" }, { preco: 70000, label: "70.000,00 Kz 100 GB" }, { preco: 130000, label: "130.000,00 Kz 200 GB" }]
            }
        }
    }

    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    vaiServico(servico) {

        this.servicos[servico].forEach(element => {

        });

        localStorage.setItem("servico", servico);
        vaiTela("servico");
    }

    verServico() {
        var servico = localStorage.getItem("servico");
        var res = ``;
        this.servicos[servico].forEach(element => {
            res += `<div class="btn-flexa hvr-bounce-out" onclick='PagamentosRequests.vaiEntidade("${element}")'>
                    <span class="label-btn"> ${element} </span>
                    <img src="assets/flexa.svg" class="icon-btn-flexa">
                </div>`;
        });

        this.jquery(".render-aqui").html(res);
        this.jquery(".titulo h1").html(servico);
    }

    vaiEntidade(entidade) {

        localStorage.setItem("entidade", entidade);
        vaiTela("entidade");
    }

    renderPrecos(esse, entidade, ProdutoInicialId, select) {
        var resPrecos = [];
        esse.entidades[entidade]["Precos"][ProdutoInicialId].forEach(element => {
            resPrecos.push({text:(element.label), value:(element.preco)});
        });

        select.setData(resPrecos);
    }
    verEntidade() {
        var valorSelect = new SlimSelect({
            select: '#valor',
            settings: {
                showSearch: false
            }
        })
        var esse = this;
        var entidade = localStorage.getItem("entidade");
        var ProdutoInicialId = this.entidades[entidade]["Produtos"][0]["id"];
        //console.log(this.entidades[entidade]["Produtos"][0]["id"]);
        var resProdutos = ``;
        this.entidades[entidade]["Produtos"].forEach(element => {
            resProdutos += `<option value="${(element.id)}">${(element.label)}</option>`;
        });

        this.jquery("#produto").append(resProdutos);
        esse.renderPrecos(esse, entidade, ProdutoInicialId, valorSelect);
        this.jquery(".titulo h1").html(entidade);
        this.jquery("#produto").change(function () {
            esse.renderPrecos(esse, entidade, this.value, valorSelect);
        })
        //this.jquery(".render-aqui").html(res);

        new SlimSelect({
            select: '#produto',
            settings: {
                showSearch: false
            }
        })
        
    }

    //------
    modalConfirmar() {
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-modal'))
        myModal.toggle()
    }
    modalConfirmarSMS() {
        var myModal = new bootstrap.Modal(document.getElementById('confirmar-sms'))
        myModal.toggle()
    }

    pegaDadosOperacao(){
        var notificacao = this.notificacao;
        var dadosOperacao = {};
        var telefone = $("#telefone").val();
        var produto = $("#produto").val();
        var produtoLabel = $('[value="'+produto+'"]').html();

        var valor = $("#valor").val();
        var valorLabel = $('[value="'+valor+'"]').html();
        

        //VERIFICAÇÃO DO DESTINATÁRIO E DO SALDO DISPONÍVEL
        if(telefone < 9){
            notificacao.sms("Verifica o número do telefone",1);
            return;
        }else{
            var MOCK = {saldo:"15000"}
            if((MOCK.saldo - 1) >= valor){
                dadosOperacao.valor = valor;
            }else{
                notificacao.sms("Não tem saldo suficiente",1);
                return;
            }
        }
        //--------------------------------------------------------

     

        dadosOperacao.telefone = telefone;
        dadosOperacao.produto = produto;
        dadosOperacao.produtoLabel = produtoLabel;
        dadosOperacao.valor = valor;
        dadosOperacao.valorLabel = valorLabel;

      
        $("#detalhes-transacao").html(`
            <p>Produto:  <b>${(dadosOperacao.produtoLabel)}</b></p>
            <p>Valor:  ${(dadosOperacao.valorLabel)}</p>
            <p>Telefone:  ${dadosOperacao.telefone}</p>
            `)

        this.modalConfirmar();
        console.log(dadosOperacao);
    }
}