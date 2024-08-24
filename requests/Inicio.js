class InicioReq{
    constructor(jquery, apiUrl, loader, notificacao,db) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
        this.db = db;
    }
    slide() {
        var sli = new debliwuislideimg($, [
            '<img src="assets/img-menu.svg" style="border-radius:5px;">',
            '<img src="assets/img-menu.svg" style="border-radius:5px;">',
            '<img src="assets/img-menu.svg" style="border-radius:5px;">'
        ], 1, true, 1200, 4000);

        $(".slide").prepend(sli);
    }
}