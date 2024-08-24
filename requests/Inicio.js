class InicioReq {
    constructor(jquery, apiUrl, loader, notificacao) {
        this.jquery = jquery;
        this.apiUrl = apiUrl;
        this.loader = loader;
        this.notificacao = notificacao;
    }
    slide() {
        var sli = new debliwuislideimg($, [
            '<img src="assets/img-menu.svg">',
            '<img src="assets/img-menu.svg">',
            '<img src="assets/img-menu.svg">'
        ], 1, true, 1200, 4000);

        $(".slide").prepend(sli);
    }
}