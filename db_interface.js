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
        this.set("feta01_token_token", token,true);
        return true;
    }
    getToken() {
        var token = this.get("feta01_token_token");
        if (token) {
            return token;
        }
        return [];
    }
    verificaToken() {
        if ((db.getToken()).length > 1) {
            if(true){
                vaiTela("/home");
            }else{
                vaiTela("/login02");
            }
        } else {
            vaiTela("/inicio");
        }
    }
    rmToken() {
        localStorage.removeItem("feta01_token_token");
        return true;
    }
}

const db = new StorageFeta();