const debliwui_saldo = document.createElement('template');
debliwui_saldo.innerHTML = `
    <style>
        
        .saldo-info{display: block; width: 101%;margin-top: 40px;position: relative;height:145px;}
        .saldo-info p{position: absolute;left:15px;top:2px;font-size: 24pt;line-height: 24pt;color: white;font-weight: 100;}
        .saldo-info .moeda{position: absolute;right:17px;top:7px;font-size: 14pt;font-weight: normal;color: white;}
        .saldo-info .olhos{position: absolute;left:17px;top:9px;width: 20px;cursor: pointer;opacity: .5;}
        .saldo-info p span{font-weight: bolder;}
        .saldo-info img{display: block; width: 100%;}
        .valor-asterisco{display: none;}
        .mostrar{display: none;}
    </style>

    <div class="saldo-info">
        <img src="assets/fundo-saldo.svg" alt>
        <p class="valor">
            SALDO <br><span class="saldo">0,00</span>
        </p>
        <p class="valor-asterisco">
            SALDO <br><span>********</span>
        </p>
        <img src="assets/eye-solid.svg" class="olhos esconder">
        <img src="assets/eye-slash-solid.svg" class="olhos mostrar">
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
    mostrar(){
        let asterisco = this.shadowRoot.querySelector('.valor-asterisco');
        let valor = this.shadowRoot.querySelector('.valor');
        valor.style.display = "block";
        asterisco.style.display = "none";
        localStorage.setItem("mostrarbalanco","ver");
    }
    esconder(){
        let asterisco = this.shadowRoot.querySelector('.valor-asterisco');
        let valor = this.shadowRoot.querySelector('.valor');
        valor.style.display = "none";
        asterisco.style.display = "block";
        localStorage.setItem("mostrarbalanco","esconder");
    }
    connectedCallback() {
        var esse = this;
        var ver = false;
        setInterval(() => {
            if (ver != localStorage.getItem("balanco")) {
                ver = localStorage.getItem("balanco");
                esse.shadowRoot.querySelector('.saldo').innerHTML = (MONEY(localStorage.getItem("balanco"),2,"."," "));
            }
            if(localStorage.getItem("mostrarbalanco") == "ver"){
                esse.mostrar();
                esse.shadowRoot.querySelector('.esconder').style.display = "none";
                esse.shadowRoot.querySelector('.mostrar').style.display = "block";
            }else{
                esse.esconder();
                esse.shadowRoot.querySelector('.esconder').style.display = "block";
                esse.shadowRoot.querySelector('.mostrar').style.display = "none";
            }
        });
        this.shadowRoot.querySelector('.mostrar').addEventListener("click",function(){
            console.log("mostrar");
            esse.esconder();
        });
        this.shadowRoot.querySelector('.esconder').addEventListener("click",function(){
            console.log("esconder");
            esse.mostrar();
        });
    }

}

window.customElements.define('debliwui-saldo', debliwuisaldo);