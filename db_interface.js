class StorageFeta {
    constructor() {
        this.db = localStorage;
    }
    get(key) {
        var res = (this.db).getItem(key);
        try {
            return JSON.parse(res);
        } catch (error) {
            return res
        }
    }
    set(key, value, obj = false) {
        if (obj) {
            var valor = JSON.parse(value);
            (this.db).setItem(key, valor);
        } else {
            (this.db).setItem(key, value);
        }
        true;
    }
    setToken(token) {
        this.set("feta01_token_token", token, false);
        return true;
    }
    getToken() {
        var token = this.get("feta01_token_token");
        if (token) {
            return token;
        }
        return false;
    }
    verificaToken() {
        if ((db.getToken()).length > 1) {
            if ((db.getToken()).length > 30) {
                vaiTela("/home");
            } else {
                vaiTela("/login02");
            }
        } else {
            vaiTela("/inicio");
        }
    }
    rmToken() {
        localStorage.removeItem("feta01_token_token");
        this.verificaToken();
        return true;
    }

    verificaSessao() {
        if((db.getToken()).length > 30) {

            var sessao = Number(localStorage.getItem("sessao"));
            var limite = Number(localStorage.getItem("sessaolimite"));
            var seconds = (Date.now() - (sessao)) / 1000;
            console.log(seconds);
            if (seconds > (limite)) {

                this.setToken("expirou");
                this.verificaToken();
                notificacao.sms("Sua sessão expirou, entre novamente", 1);
                return true;
            } else {

                localStorage.setItem("sessao", Date.now());
                return false;
            }

        }
    }

}

const db = new StorageFeta();