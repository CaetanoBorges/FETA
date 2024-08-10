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

    <div class="transacao entrada">
        <p class="valor">+ 5 000,00</p>
        <p class="data">05-08-2024</p>
        <p class="descricao">Descricao aqui resumida...</p>
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
        
    }

}

window.customElements.define('debliwui-transacao', debliwuitransacao)