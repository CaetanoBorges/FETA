const debliwui_voltar = document.createElement('template');
debliwui_voltar.innerHTML = `
    <style>
        .voltar{position: fixed;top: 2vh;left: 2%;width: 35px;z-index: 99;}
        .voltar image{width: 100%;}
    </style>
    <div class="voltar">
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
        this.shadowRoot.querySelector('.voltar').addEventListener("click",function(){
            var voltar = esse.shadowRoot.querySelector('.voltar');
            voltar.style.opacity = ".3";
            setTimeout(function(){
                voltar.style.opacity = "1";
            },1000);
            
            history.back();
        })
        

    }

}

window.customElements.define('debliwui-voltar', debliwuivoltar)