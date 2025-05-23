const debliwui_menu = document.createElement('template');
debliwui_menu.innerHTML = `
    <style>
        .container{
            position:fixed;
            width:100%;
            left: -100%;
            top:0;
            height:fit-content;
            z-index: 9;
            padding:0;
            font-size:12pt;
        }
        .conteudo{
            position:absolute;
            top:0;
            width:300px;
            height:100vh;
            background: #ffffff;
            z-index: 10102;
        }
        .relativa{
            position: relative;
            z-index: 10102;
            overflow:auto;
            height:100vh;
            background-color: #ffffff;
        }
        .backdrop{
            width:100%;
            height:100%;
            position:fixed;
            width:100%;
            left: -100%;
            top:0;
            height:100vh;
            background: #00000074;
        }
        
        ul {
            list-style: none;
            width: 100%;
            margin-left: -50px;
        }
        
        ul a {
            text-decoration: none;
            color: #7a7a7a;
            font-weight: 600;
            text-align: left;
        }
        
        ul li:hover {
            background: #640564;
            color:white;
        }
        
        ul li {
            width: 100%;
            padding: 2.5px 2.5px 5px 2.5px;
            display: flex;
            align-items:center;
            margin: 9px 0;
            border-bottom:1px solid #00000010;
        }
        
        ul li img {
            width: 25px;
            margin: 0 30px 0 30px;
        }

        .aciona-menu{
            width:25px;
            margin: 18px -96% 0 0;
            cursor:pointer;
            z-index:11111;
            float: right;

        }
        .user{
            background-color:#640564;
            width:100%;
            display:flex;
            align-items:baseline;
            flex-direction:column;
            justify-content: flex-end;
            color:white;
            position:relative;

        }
        .user div{
            width:72pt;height:72pt;
            border-radius:50%;
        }
        .user .perfil{
            width:100%;
            height:100%;
            border-radius:36pt;
            }
        .user .definicoes-user{
            position:absolute;
            top:20px;
            right:20px;
            width:40px;
            height:40px;
            cursor:pointer;
        }

        .animar {
            transform: width;
            transition-property: transform;
            transition-duration: 2s;
        }
        @media screen and (max-width:700px) {
            .conteudo{
                display:none;
            }
        }
    </style>

    <div class="container">
        <img src="assets/menu-abrir.svg" class="aciona-menu">
        
        <div class="conteudo" style="display:none">
            <div class="backdrop"></div>
            <div class="relativa">
                <div class="user">
                    <img src="assets/img-menu.svg" style="width:100%;">
                    
                </div>
                <ul>
                    <a href="/home" class="home">
                        <li> <img src="assets/inicio-menu.svg"> <span>Início</span></li>
                    </a>
                    <div class="linha-divisoria"></div>
                    <a href="/pendentes" class="pendentes">
                        <li> <img src="assets/pendente-menu.svg"> <span>Pendentes</span></li>
                    </a>
                    <a href="/recorrentes" class="recorrentes">
                        <li> <img src="assets/pagamentos-menu.svg"> <span>Operações recorrentes</span></li>
                    </a>
                    <a href="/depositarlevantar" class="depositarlevantar">
                        <li> <img src="assets/carregar-menu.svg"> <span>Carregar & Saque</span></li>
                    </a>
                    <a href="/configuracoes" class="configuracoes">
                        <li> <img src="assets/configurar-menu.svg"> <span>Configurações</span></li>
                    </a>
                    <a href="/tarifario" class="tarifario">
                        <li> <img src="assets/tarifa-menu.svg"> <span>Tarifário</span></li>
                    </a>
                    <a href="/termosprivacidade" class="termosprivacidade">
                        <li> <img src="assets/privacidade-menu.svg"> <span>Privacidade e termos</span></li>
                    </a>
                    <a href="/perguntas" class="perguntas">
                        <li> <img src="assets/perguntas-menu.svg"> <span>Perguntas frequentes</span></li>
                    </a>
                    <a href="/apoio" class="apoio">
                        <li> <img src="assets/apoio-menu.svg"> <span>Apoio ao cliente</span></li>
                    </a>
                </ul>
            </div>
        </div>
        
    </div>

    <script>
        
    </script>

`;

class debliwuimenu extends HTMLElement {

    constructor(route, jquery) {
        super(route);
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_menu.content.cloneNode(true));
        this.route = route;
        this.jquery = jquery;
    }

    fechar(esse) {
        var $ = esse.jquery;
        let container = esse.shadowRoot.querySelector('.container');

        if (container.style.display == "none") {
            $(container).show("slow");
            //container.style.display = "block";
        } else {
            $(container).hide("slow");
            //container.style.display = "none";
        }
    }


    handleLocation = async () => {
        const path = window.location.pathname;
        const hash = window.location.hash;
        ESCOPO.init = true;

        const ui = UI_PAGES[path] || UI_PAGES[404];

        document.querySelectorAll(".modal-backdrop").forEach(function (i) { $(i).hide() });
        document.querySelectorAll(".modal").forEach(function (i) { $(i).hide() });
        if (path == "/inicio") {
            (document.querySelector(".corpo")).innerHTML = (ui);
        } else {
            loader.abrir();
            $(document.querySelector(".corpo")).animate({ "opacity": "0" }, 300, function () {
                $(document.querySelector(".corpo")).html(ui);
            });
        }

        $(document.querySelector(".corpo")).animate({ "opacity": "1" }, 300);
        db.verificaSessao();
        if (path == "/pendentes") {

            setTimeout(function () {
                if ((db.getToken()).length > 30) {

                    PendentesRequests.pendentes();
                }
            }, 1000)

        }
        if (path == "/recorrentes") {

            setTimeout(function () {
                if ((db.getToken()).length > 30) {

                    RecorrentesRequests.recorrentes();
                }
            }, 1000)

        }
        if (path == "/depositarlevantar") {

            setTimeout(function () {
                if ((db.getToken()).length > 30) {

                    DepositarLevantarRequests.init();
                }
                loader.fechar();
            }, 1000)

        }
        if (path == "/configuracoes") {

            loader.fechar();
        }

        if (path == "/termosprivacidade") {
            loader.fechar();
        }
        if (path == "/perguntas") {
            loader.fechar();
        }

        if (path == "/home") {


            InicioRequests.home();
            loader.fechar();
        }
        if (path == "/apoio") {


            loader.fechar();
        }

        if (path == "/tarifario") {
            loader.abrir();
            setTimeout(function () {
                if ((db.getToken()).length > 30) {
                    InicioRequests.tarifario();
                }
                loader.fechar();
            }, 1000);

        }

    }

    fechar() {
        var $ = this.jquery;
        let container = this.shadowRoot.querySelector('.container');
        $(container).hide("slow");
        //container.style.display = "none";
    }
    abrir() {
        var $ = this.jquery;
        let container = this.shadowRoot.querySelector('.container');
        $(container).show("slow");
        //container.style.display = "block";
    }
    connectedCallback() {
        var $ = this.jquery;
        var esse = this;

        var route = this.getAttribute('route');
        this.shadowRoot.querySelector('.aciona-menu').addEventListener("click", function () {
            let acionamenu = esse.shadowRoot.querySelector('.aciona-menu');
            $(acionamenu).animate({ "opacity": "0" }, "fast");
            $(acionamenu).animate({ "opacity": "1" }, "fast");

            let container = esse.shadowRoot.querySelector('.conteudo');
            let backdrop = esse.shadowRoot.querySelector('.backdrop');

            if (container.style.display == "none") {
                $(container).animate({ "left": "100%" }, "slow");
                setTimeout(function () {
                    $(backdrop).animate({ "left": "0" }, "fast");
                }, 300);
                $(container).show();
                //container.style.display = "block";
            } else {
                $(container).animate({ "left": "-100%" }, "slow");
                $(backdrop).animate({ "left": "-100%" }, "fast");
                $(container).hide();
                //container.style.display = "none";
            }
        });
        this.shadowRoot.querySelector('.backdrop').addEventListener("click", function () {
            let container = esse.shadowRoot.querySelector('.conteudo');
            let backdrop = esse.shadowRoot.querySelector('.backdrop');

            if (container.style.display == "none") {
                $(container).animate({ "left": "100%" }, "slow");
                setTimeout(function () {
                    $(backdrop).animate({ "left": "0" }, "fast");
                }, 300);
                $(container).show("slow");
                //container.style.display = "block";
            } else {
                $(container).animate({ "left": "-100%" }, "slow");
                $(backdrop).animate({ "left": "-100%" }, "fast");
                $(container).hide("slow");
                //container.style.display = "none";
            }
        });
        let lis = this.shadowRoot.querySelectorAll('li');
        lis.forEach(element => {
            element.addEventListener("click", function () {
                let container = esse.shadowRoot.querySelector('.conteudo');
                let backdrop = esse.shadowRoot.querySelector('.backdrop');

                if (container.style.display == "none") {
                    $(container).animate({ "left": "100%" }, "slow");
                    setTimeout(function () {
                        $(backdrop).animate({ "left": "0" }, "fast");
                    }, 300);
                    $(container).show("slow");
                } else {
                    $(container).animate({ "left": "-100%" }, "slow");
                    $(backdrop).animate({ "left": "-100%" }, "fast");
                    $(container).hide("slow");
                }
            });
        });

        this.shadowRoot.querySelector('.home').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.pendentes').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.recorrentes').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.depositarlevantar').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.configuracoes').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.termosprivacidade').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.perguntas').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.apoio').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });
        this.shadowRoot.querySelector('.tarifario').addEventListener("click", function (event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", "/" + (this.href).split("/")[3]);
            esse.handleLocation(esse.routes);
        });

    }

}
window.customElements.define('debliwui-menu', debliwuimenu)