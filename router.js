var corrida = false;
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const vaiTela = (route) => {
    window.history.pushState({}, "", route);
    handleLocation();
}

const routes = {
    404: "/pages/404.html",
    "/": "/pages/inicio.html",
    "/home": "/pages/home.html",
    "/reclamacao": "/pages/reclamacao.html",
    "/privacidade": "/pages/privacidade.html",
    "/conta": "/pages/conta.html",
    "/definicoes": "/pages/definicoes.html",
    "/categoria": "/pages/categoria.html",
    "/mesaIndisponivel": "/pages/mesaIndisponivel.html",
    "/mesas": "/pages/mesas.html"
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    
    const route = routes[path] || routes[404];
    const html = await fetch(route).then(function(data){
        var res = data.text();
        res.then(function(ui){
            document.querySelector(".corpo").innerHTML = ui;
            
            if (path == "/") {
                vaiTela("home");
                
                setTimeout(function () {
                    loader.abrir();
                }, 1000);
            }
            if (path == "/reclamacao") {
                loader.abrir();
                
                setTimeout(function () {

                    Funcoes.reclamou();

                    loader.fechar();
                }, 1000);
            }

        
                if (hash == "") {
                    
                }
                if (hash == "#categoria") {
                    
                }

            if (path == "/home") {
                loader.abrir();
                menu.abrir(); 
                setTimeout(function () {

                    

                    loader.fechar();
                }, 1000);
            }
            if (path == "/conta") {
                loader.abrir();
                
                setTimeout(function () {

                    Requests.verConta();

                    loader.fechar();
                }, 1000);
            }
            if (path == "/categoria") {
                loader.abrir();
                setTimeout(function () {
                    if (hash) {

                        Funcoes.renderProduto(hash.split("#")[1]);

                    }
                    
                

                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/mesaIndisponivel") {
                loader.abrir();
                setTimeout(function () {
                   
                    
                    loader.fechar();
                }, 1000);
                
            }
            if (path == "/mesas") {
                loader.abrir();
                setTimeout(function () {
                
                    Requests.verMesas(((window.location.hash).split("#")[1]));
                    loader.fechar();
                }, 1000);
                
            }
        })
    })
    

}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();