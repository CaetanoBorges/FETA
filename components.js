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
        <p class="label">Olá<br><span style="opacity:0">&nbsp;</span></p>
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
                $(esse.shadowRoot.querySelector('.label span')).animate({ "opacity": "1" }, 1000);
            }
        }, 1000);
        
    }

}

window.customElements.define('debliwui-top', debliwuitop);

const debliwui_loader = document.createElement('template');
debliwui_loader.innerHTML = `
    <style>
        .container{
            position:fixed;
            width:100%;
            left: 0;
            top:0;
            height:100vh;
            background: #ffffff;
            z-index: 99999999999;
            display:none;
        }
        

        .backdrop{    
            position:relative;
            width:100%;
            height:100hv;
        }
        img{
            
            width:150px;
            display:block;
            margin:40vh auto
            }
    
    </style>

    <div class="container">
        <div class="backdrop">
        </div>
        <img src="assets/loader.svg">
    </div>
`;

class debliwuiloader extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_loader.content.cloneNode(true));
    }

    fechar() {
        let container = this.shadowRoot.querySelector('.container');
        setTimeout(() => {
            container.style.display = "none";
        }, 500);
    }
    abrir() {
        let container = this.shadowRoot.querySelector('.container');
        container.style.display = "block";
    }

    connectedCallback() {

    }


}

window.customElements.define('debliwui-loader', debliwuiloader);

const debliwui_logopequeno = document.createElement('template');
debliwui_logopequeno.innerHTML = `
    <style>
        .logo{width: 80pt;display: block;}
    </style>
    <img src="assets/logo-p.png" class="logo">
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

window.customElements.define('debliwui-logopequeno', debliwuilogopequeno);

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
        //loader.abrir();
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

    }

}
window.customElements.define('debliwui-menu', debliwuimenu);

const debliwui_notificacao = document.createElement('template');
debliwui_notificacao.innerHTML = `
    <style>
        .container{
            position:fixed;
            width:94%;
            left: 3%;
            top:-100%;
            height:fit-content;
            z-index: 9999999999999 !important;
            border-radius:5px;

        }
        

        .header{
            position:relative;
            width:100%;
            height:fit-content;
        }
       
       #sms{display:flex;justify-content:center;align-items:center;padding:1vh 5%;font-size:23px;text-transform:capitalize;font-weight:bold;text-align:center;color:white;font-weight:400;}
    </style>

    <div class="container" style="z-index: 9999999999999 !important"> 
        <div class="header">
        <div id="sms">
        <slot name="notificacao"></slot>
        </div>
        </div>
    </div>
`;

class debliwuinotificacao extends HTMLElement {

    constructor($) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_notificacao.content.cloneNode(true));
        this.$ = $;
    }

    fechar(esse) {
        let container = esse.shadowRoot.querySelector('.container');
        $(container).animate({ "top": "-100%" }, "slow");
        navigator.vibrate(0);
    }
    abrir() {
        let container = this.shadowRoot.querySelector('.container');
        $(container).animate({ "top": "1.5vh" }, 400);
    }

    connectedCallback() {
        var esse = this;
        var fechar = this.fechar;
        this.shadowRoot.querySelector('.container').addEventListener("click", function () {
            fechar(esse);
        });
    }

    sms(mensagem, tipo = 0) {
        var $ = this.$;
        var esse = this;
        var fechar = this.fechar;
        let sms = this.shadowRoot.querySelector('#sms');
        sms.innerHTML = mensagem;
        var container = this.shadowRoot.querySelector('.container');
        if (tipo == 1) {
            container.style.background = "#dc3545";
            // Vibrate for 200ms, pause for 100ms, then vibrate for 200ms again
            navigator.vibrate([200, 100, 200]);
            $(container).animate({ "background": "#dc3545" }, 500);
        } else {
            container.style.background = "#428bca";
            // Vibrate for 500 milliseconds
            navigator.vibrate(500);
            $(container).animate({ "background": "#428bca" }, 500);
        }

        this.abrir();
        setTimeout(function () {
            fechar(esse);
        }, 5000);
    }


}

window.customElements.define('debliwui-notificacao', debliwuinotificacao);

const debliwui_saldo = document.createElement('template');
debliwui_saldo.innerHTML = `
    <style>
        .saldo-info{display: block; width: 101%;margin-top: 40px;position: relative;min-heigh:145px;}
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

const debliwui_slideimg = document.createElement('template');

debliwui_slideimg.innerHTML = `
    <style>
   
/*! lightslider - v1.1.3 - 2015-04-14
* https://github.com/sachinchoolur/lightslider
* Copyright (c) 2015 Sachin N; Licensed MIT */

.lSSlideWrapper,
.lSSlideWrapper .lSFade {
    position: relative
}

.lSSlideWrapper .lSSlide,
.lSSlideWrapper.usingCss .lSFade>* {
    -webkit-transition-timing-function: inherit !important;
    transition-timing-function: inherit !important;
    -webkit-transition-duration: inherit !important;
    transition-duration: inherit !important
}

.lSSlideOuter,
.lSSlideOuter .lSPager.lSGallery {
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none
}

.lSSlideOuter .lSPager.lSGallery:after,
.lSSlideWrapper>.lightSlider:after {
    clear: both
}

.lSSlideOuter {
    overflow: hidden;
    user-select: none
}

.lightSlider:after,
.lightSlider:before {
    content: " ";
    display: table
}

.lightSlider {
    overflow: hidden;
    margin: 0
}

.lSSlideWrapper {
    max-width: 100%;
    overflow: hidden
}

.lSSlideWrapper .lSSlide {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
    -webkit-transition: all 1s;
    -webkit-transition-property: -webkit-transform, height;
    -moz-transition-property: -moz-transform, height;
    transition-property: transform, height
}

.lSSlideWrapper .lSFade>* {
    position: absolute !important;
    top: 0;
    left: 0;
    z-index: 9;
    margin-right: 0;
    width: 100%
}

.lSSlideWrapper.usingCss .lSFade>* {
    opacity: 0;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    -webkit-transition-property: opacity;
    transition-property: opacity
}

.lSSlideWrapper .lSFade>.active {
    z-index: 10
}

.lSSlideWrapper.usingCss .lSFade>.active {
    opacity: 1
}

.lSSlideOuter .lSPager.lSpg {
    margin: 10px 0 0;
    padding: 0;
    text-align: center
}

.lSSlideOuter .lSPager.lSpg>li {
    cursor: pointer;
    display: inline-block;
    padding: 0 5px
}

.lSSlideOuter .lSPager.lSpg>li a {
    background-color: #fff;
    border-radius: 30px;
    display: inline-block;
    height: 8px;
    overflow: hidden;
    text-indent: -999em;
    width: 8px;
    position: relative;
    z-index: 99;
    -webkit-transition: all .5s linear 0s;
    transition: all .5s linear 0s
}

.lSSlideOuter .lSPager.lSpg>li.active a,
.lSSlideOuter .lSPager.lSpg>li:hover a {
    background-color: #640564
}

.lSSlideOuter .media {
    opacity: .8
}

.lSSlideOuter .media.active {
    opacity: 1
}

.lSSlideOuter .lSPager.lSGallery {
    list-style: none;
    padding-left: 0;
    margin: 0;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    user-select: none
}

.lSSlideOuter .lSPager.lSGallery li {
    overflow: hidden;
    -webkit-transition: border-radius .12s linear 0s .35s linear 0s;
    transition: border-radius .12s linear 0s .35s linear 0s
}

.lSSlideOuter .lSPager.lSGallery li.active,
.lSSlideOuter .lSPager.lSGallery li:hover {
    border-radius: 5px
}

.lSSlideOuter .lSPager.lSGallery img {
    display: block;
    height: auto;
    max-width: 100%
}

.lSSlideOuter .lSPager.lSGallery:after,
.lSSlideOuter .lSPager.lSGallery:before {
    content: " ";
    display: table
}

.lSAction>a {
    width: 32px;
    display: block;
    top: 50%;
    height: 32px;
    background-image: url(../img/controls.png);
    cursor: pointer;
    position: absolute;
    z-index: 99;
    margin-top: -16px;
    opacity: .5;
    -webkit-transition: opacity .35s linear 0s;
    transition: opacity .35s linear 0s
}

.lSAction>a:hover {
    opacity: 1
}

.lSAction>.lSPrev {
    background-position: 0 0;
    left: 10px
}

.lSAction>.lSNext {
    background-position: -32px 0;
    right: 10px
}

.lSAction>a.disabled {
    pointer-events: none
}

.cS-hidden {
    height: 1px;
    opacity: 0;
    filter: alpha(opacity=0);
    overflow: hidden
}

.lSSlideOuter.vertical {
    position: relative
}

.lSSlideOuter.vertical.noPager {
    padding-right: 0 !important
}

.lSSlideOuter.vertical .lSGallery {
    position: absolute !important;
    right: 0;
    top: 0
}

.lSSlideOuter.vertical .lightSlider>* {
    width: 100% !important;
    max-width: none !important
}

.lSSlideOuter.vertical .lSAction>a {
    left: 50%;
    margin-left: -14px;
    margin-top: 0
}

.lSSlideOuter.vertical .lSAction>.lSNext {
    background-position: 31px -31px;
    bottom: 10px;
    top: auto
}

.lSSlideOuter.vertical .lSAction>.lSPrev {
    background-position: 0 -31px;
    bottom: auto;
    top: 10px
}

.lSSlideOuter.lSrtl {
    direction: rtl
}

.lSSlideOuter .lSPager,
.lSSlideOuter .lightSlider {
    padding-left: 0;
    list-style: none
}

.lSSlideOuter.lSrtl .lSPager,
.lSSlideOuter.lSrtl .lightSlider {
    padding-right: 0
}

.lSSlideOuter .lSGallery li,
.lSSlideOuter .lightSlider>* {
    float: left
}

.lSSlideOuter.lSrtl .lSGallery li,
.lSSlideOuter.lSrtl .lightSlider>* {
    float: right !important
}

@-webkit-keyframes rightEnd {
    0%,
    100% {
        left: 0
    }
    50% {
        left: -15px
    }
}

@keyframes rightEnd {
    0%,
    100% {
        left: 0
    }
    50% {
        left: -15px
    }
}

@-webkit-keyframes topEnd {
    0%,
    100% {
        top: 0
    }
    50% {
        top: -15px
    }
}

@keyframes topEnd {
    0%,
    100% {
        top: 0
    }
    50% {
        top: -15px
    }
}

@-webkit-keyframes leftEnd {
    0%,
    100% {
        left: 0
    }
    50% {
        left: 15px
    }
}

@keyframes leftEnd {
    0%,
    100% {
        left: 0
    }
    50% {
        left: 15px
    }
}

@-webkit-keyframes bottomEnd {
    0%,
    100% {
        bottom: 0
    }
    50% {
        bottom: -15px
    }
}

@keyframes bottomEnd {
    0%,
    100% {
        bottom: 0
    }
    50% {
        bottom: -15px
    }
}

.lSSlideOuter .rightEnd {
    -webkit-animation: rightEnd .3s;
    animation: rightEnd .3s;
    position: relative
}

.lSSlideOuter .leftEnd {
    -webkit-animation: leftEnd .3s;
    animation: leftEnd .3s;
    position: relative
}

.lSSlideOuter.vertical .rightEnd {
    -webkit-animation: topEnd .3s;
    animation: topEnd .3s;
    position: relative
}

.lSSlideOuter.vertical .leftEnd {
    -webkit-animation: bottomEnd .3s;
    animation: bottomEnd .3s;
    position: relative
}

.lSSlideOuter.lSrtl .rightEnd {
    -webkit-animation: leftEnd .3s;
    animation: leftEnd .3s;
    position: relative
}

.lSSlideOuter.lSrtl .leftEnd {
    -webkit-animation: rightEnd .3s;
    animation: rightEnd .3s;
    position: relative
}

.lightSlider.lsGrab>* {
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: -o-grab;
    cursor: -ms-grab;
    cursor: grab
}

.lightSlider.lsGrabbing>* {
    cursor: move;
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: -o-grabbing;
    cursor: -ms-grabbing;
    cursor: grabbing
}

 .container{
        width:100%;
        height:fit-content;
        background: none;
        /*border:1px solid #dc3545;*/
        position: relative;
       
}
.container li{
        display: block;
        width: 100%;
        position:relative;

}
.container img{
        width: 100%;
}

.container h3{
        text-align:center;
        font-size:16px;
}
.container P{
        text-align:center;
        font-size:12px;
}

@media screen and (max-width:1000px) {
   
    
}
</style>

    <ul class="container">
       
    </ul>
`;



class debliwuislideimg extends HTMLElement {

    constructor($, imagens, mostrarquantos = 1, pager = true, speed = 800, pause = 2000) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(debliwui_slideimg.content.cloneNode(true));

        this.jquery = $;
        this.imagens = imagens;
        this.itens = mostrarquantos;
        this.pager = pager;
        this.speed = speed;
        this.pause = pause;

    }

    connectedCallback() {
        var esse = this;
        var container = this.shadowRoot.querySelector('.container');

        this.imagens.forEach((element, key) => {
            if (typeof(element) == "string") {
                $(container).append(`<li>${element}</li>`);
            } else {

            }

        });


        var slider = $(container).lightSlider({
            gallery: false,
            item: esse.itens,
            speed: esse.speed,
            loop: true,
            keyPress: true,
            auto: true,
            controls: false,
            pager: esse.pager,
            pauseOnHover: true,
            pause: esse.pause,
            adaptiveHeight: true,
            onSliderLoad: function() {
                $(container).removeClass('cS-hidden');
            }
        }).css("z-index", "0");


    }

}

window.customElements.define('debliwui-slideimg', debliwuislideimg);

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

window.customElements.define('debliwui-transacao', debliwuitransacao);

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

window.customElements.define('debliwui-voltar', debliwuivoltar);