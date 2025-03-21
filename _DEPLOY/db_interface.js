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
                setTimeout(() => {
                    vaiTela("/login02");
                }, 1000);
            }
        } else {
            vaiTela("/inicio");
        }
    }
    rmToken() {
        localStorage.removeItem("feta01_token_token");
        localStorage.setItem("privacidade", "");
        localStorage.setItem("termos", "");
        this.verificaToken();
        return true;
    }

    verificaSessao() {
        if ((db.getToken()).length > 30) {



            var sessao = Number(localStorage.getItem("sessao"));
            var limite = Number(localStorage.getItem("sessaolimite"));
            var seconds = (Date.now() - (sessao)) / 1000;
            //console.log(seconds);
            if (seconds > (limite)) {
                $("datas-resolver").html(`
            <select name id="ano" class="form-control">
            </select>
            <select name id="mes" class="form-control">
            </select>`);
                menu.fechar();
                this.setToken("expirou");

                ESCOPO.selectAno = null;
                ESCOPO.selectMes = null;

                this.verificaToken();
                notificacao.sms("Sua sessão expirou, entre novamente", 1);
                return true;
            } else {
                $("datas-resolver").html(``);
                localStorage.setItem("sessao", Date.now());
                return false;
            }

        }
    }

}

const db = new StorageFeta();