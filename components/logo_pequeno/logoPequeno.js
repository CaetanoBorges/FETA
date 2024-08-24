const debliwui_logopequeno = document.createElement('template');
debliwui_logopequeno.innerHTML = `
    <style>
        .logo{width: 46pt;display: block;}
    </style>
    <img src="assets/logo-pequeno.svg" class="logo">
`;

class debliwuilogopequeno extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_logopequeno.content.cloneNode(true));
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

    }

}

window.customElements.define('debliwui-logopequeno', debliwuilogopequeno)