const debliwui_voltar = document.createElement('template');
debliwui_voltar.innerHTML = `
    <style>
        .voltar{position: fixed;top: 2vh;left: 2%;width: 35px;z-index: 99;}
        .voltar image{width: 100%;}
    </style>
    <div class="voltar" onclick="history.back()">
        <img src="assets/voltar.svg">
    </div>
`;

class debliwuivoltar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_voltar.content.cloneNode(true));
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

window.customElements.define('debliwui-voltar', debliwuivoltar)