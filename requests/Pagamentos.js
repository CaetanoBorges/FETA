class PagamentosReq {
    servicos = {
        Recargas: ["Unitel", "Africel", "Movicel", "NetOne"],
        TV: ["DSTV", "ZAP", "ZAP Fibra"],
        Estado: ["ENDE", "EPAL"],
        Outros: ["Empresa X", "Facebook", "SimpleComerce"],
    }

    entidades = {
        Unitel: {
            Produtos: ["SALDO_VOZ", "NET_ATE_15_GB", "SALDO_NET_CASA_4G", "PLANO_MAIS_30_DIAS", "PLANO_MAIS_VOZ", "PLANO_MAIS_DADOS", "REDES_SOCIAIS_PLUS", "NET_ACIMA_15_GB"],
            OpcaoProduto: {
                SALDO_VOZ: [],
                NET_ATE_15_GB: [3]
            },
            Precos: {
                SALDO_VOZ: [{ preco: 200, label: "" }, { preco: 500, label: "" }, { preco: 1000, label: "" }, { preco: 1500, label: "" }, { preco: 2000, label: "" }, { preco: 3000, label: "" }, { preco: 5000, label: "" }, { preco: 10000, label: "" }],
                NET_ATE_15_GB: [{ preco: 300, label: "" }, { preco: 500, label: "" }, { preco: 1000, label: "" }, { preco: 1500, label: "" }, { preco: 2000, label: "" }, { preco: 3000, label: "" }, { preco: 5000, label: "" }, { preco: 10000, label: "" }],
                SALDO_NET_CASA_4G: [{ preco: 7000, label: "" }, { preco: 11990, label: "" }, { preco: 12000, label: "" }, { preco: 14000, label: "" }, { preco: 23990, label: "" }, { preco: 24000, label: "" }, { preco: 32000, label: "" }, { preco: 48000, label: "" }],
                PLANO_MAIS_30_DIAS: [{ preco: 2000, label: "" }, { preco: 20000, label: "" }, { preco: 25000, label: "" }, { preco: 40000, label: "" }],
                PLANO_MAIS_VOZ: [{ preco: 300, label: "" }, { preco: 650, label: "" }],
                PLANO_MAIS_DADOS: [{ preco: 300, label: "" }, { preco: 650, label: "" }, { preco: 1000, label: "" }, { preco: 2000, label: "" }, { preco: 5000, label: "" }, { preco: 10000, label: "" }],
                REDES_SOCIAIS_PLUS: [{ preco: 200, label: "" }, { preco: 500, label: "" }, { preco: 1000, label: "" }],
                NET_ACIMA_15_GB: [{ preco: 25000, label: "" }, { preco: 35000, label: "" }, { preco: 70000, label: "" }, { preco: 130000, label: "" }]
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

    verEntidade() {
        var entidade = localStorage.getItem("entidade");
        var res = ``;
        this.entidades[entidade].forEach(element => {
            res;
        });

        this.jquery(".render-aqui").html(res);
        this.jquery(".titulo h1").html(servico);
    }
}