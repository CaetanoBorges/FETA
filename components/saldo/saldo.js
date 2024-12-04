const debliwui_saldo = document.createElement('template');
debliwui_saldo.innerHTML = `
    <style>
        .saldo-info{display: block; width: 101%;margin-top: 40px;position: relative;height:145px;}
        .saldo-info p{position: absolute;left:15px;top:2px;font-size: 24pt;line-height: 24pt;color: white;font-weight: 100;}
        .saldo-info .moeda{position: absolute;right:17px;top:7px;font-size: 14pt;font-weight: normal;color: white;}
        .saldo-info p span{font-weight: bolder;}
        .saldo-info img{display: block; width: 100%;}
    </style>

    <div class="saldo-info">
        <img src="assets/fundo-saldo.svg" alt>
        <p>
            SALDO <br><span class="saldo">0,00</span>
        </p>
        <span class="moeda">AOA</span>
    </div>
`;

class debliwuisaldo extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_saldo.content.cloneNode(true));
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
        var ver = false;
        setInterval(() => {
            if (ver != localStorage.getItem("balanco")) {
                ver = localStorage.getItem("balanco");
                esse.shadowRoot.querySelector('.saldo').innerHTML = (MONEY(localStorage.getItem("balanco"),2,"."," "));
            }
        })        
    }

}

window.customElements.define('debliwui-saldo', debliwuisaldo);