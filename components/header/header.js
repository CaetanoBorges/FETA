const debliwui_top = document.createElement('template');
debliwui_top.innerHTML = `
    <style>
        .top-notification{display: block;width: 100%;margin-top: 60px;}
        .top-notification span{font-weight: bold;}

        .notification-icon {float:left;width: 35px;}
        .user-icon {float: right;width: 45px;}
        .label {display: inline-block; line-height: 15px;margin: 5px 0 0 10px;}
    </style>

    <div class="top-notification">
        <img src="assets/notificacao-icon.svg" class="notification-icon">
        <p class="label">Olá<br><span></span></p>
        <img src="assets/user.svg" class="user-icon" onclick='vaiTela("perfil")'>
    </div>
`;

class debliwuitop extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_top.content.cloneNode(true));
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
            if (ver != localStorage.getItem("nome")) {
                ver = localStorage.getItem("nome");
                esse.shadowRoot.querySelector('.label span').innerHTML = (localStorage.getItem("nome")).toUpperCase();
            }
        }, 1000);
        
    }

}

window.customElements.define('debliwui-top', debliwuitop)