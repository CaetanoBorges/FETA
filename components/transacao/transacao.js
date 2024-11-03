const debliwui_transacao = document.createElement('template');
debliwui_transacao.innerHTML = `
    <style>
        .transacao{display: block;width: 98%;padding: 1%;position: relative;margin-bottom: 10px;}
        .transacao p{margin:0}
        .data{}
        .descricao{}
        .valor{font-weight: bold;float: right;}
        .entrada{border-bottom: 1px solid #00ff0040;}
        .entrada .valor{color: green;}
        .saida{border-bottom: 1px solid #ff000040;}
        .saida .valor{color:red;}
    </style>

    <div id="render">
    
    </div>
`;

class debliwuitransacao extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_transacao.content.cloneNode(true));
    }

    fechar(esse) {
        let container = esse.shadowRoot.querySelector('.container');
        container.style.display = "none";
    }
    abrir() {
        let container = this.shadowRoot.querySelector('.container');
        container.style.display = "block";
    }

    connectedCallback() {
        var esse = this;
        var fechar = this.fechar;
        var ver = false;
        setInterval(() => {
            
            console.log(ver, (localStorage.getItem("transacoes")));
            if (ver != localStorage.getItem("transacoes")) {
                ver = localStorage.getItem("transacoes");

                var itens = ``;
                (JSON.parse(localStorage.getItem("transacoes"))).forEach(element => {
                    var fechar = "";
                    var classe = "";
                    var cor = "";
                    var titulo = "";
                    var sinal = "";
                    var quem = "";
                    if (element.entrada != "1") {
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
                <div class="transacao ${classe}">
                    <p class="valor">${sinal} ${(MONEY(element.valor, 2, ".", " "))}</p>
                    <p class="data">${(element.quando)}</p>
                </div>`;
                });
                
                $(esse.shadowRoot.querySelector('#render')).hide();
                esse.shadowRoot.querySelector('#render').innerHTML = (itens);
                $(esse.shadowRoot.querySelector('#render')).show("slow");
            }
        }, 2000);

    }

}

window.customElements.define('debliwui-transacao', debliwuitransacao)