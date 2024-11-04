class ConfiguracoesReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
$('[name="opcao"]').change(function(){var opcao=$('[name="opcao"]:checked').val();$('.opcao').css({"color":"black"});$('.'+opcao).css({"color":"#640564"})})
var settings={"url":(this.apiUrl)+"/config/timeout","method":"GET","timeout":0,"headers":{"token":db.getToken()},};$.ajax(settings).done(function(response){$('.'+response.payload).css({"color":"#640564"})})}
alterarTempo(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var opcao=$('[name="opcao"]:checked').val();ESCOPO.confirmarFinal="pin";ESCOPO.callback=this.setTimeout;ESCOPO.parametro=this;ESCOPO.dadosOperacao={"tempo_bloqueio":opcao};InicioRequests.pedirNumeroOuPin()}
setTimeout(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/config/settimeout","method":"POST","timeout":0,"headers":{"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"},"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmarFinal.hide();esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
alterarPin(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var pin_novo=$("#pin_novo").val();var pin_novo_confirmar=$("#pin_novo_confirmar").val();if(pin_novo.length!=6){this.notificacao.sms("Verifica o novo PIN, deve ter 6 digitos",1);return}
if(pin_novo!=pin_novo_confirmar){this.notificacao.sms("Verifica o novo PIN, as combinaçoes devem ser iguais",1);return}
ESCOPO.confirmarFinal="pin";ESCOPO.callback=this.setPin;ESCOPO.parametro=this;ESCOPO.dadosOperacao={"pin":pin_novo};InicioRequests.pedirNumeroOuPin()}
setPin(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/config/alterarpin","method":"POST","timeout":0,"headers":{"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"},"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmarFinal.hide();esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class DepositarLevantarReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ibans=new SlimSelect({select:'#iban-receber',settings:{showSearch:!1}});this.jquery.get("APIMOCK/minhasContas.json").done(function(dados){var res=[];dados.forEach(element=>{res.push({text:(element.banco),value:(element.iban)})});ibans.setData(res)})}
modalConfirmar(){var myModal=new bootstrap.Modal(document.getElementById('confirmar-sms'))
myModal.toggle()}
pegaDadosOperacao(){var notificacao=this.notificacao;var dadosOperacao={};var quanto=$("#valor-receber").val();var para=$("#iban-receber").val();if(quanto<1){notificacao.sms("Verifica o valor a receber",1);return}else{var MOCK={saldo:"15000"}
if((MOCK.saldo-1)>=quanto){dadosOperacao.quanto=quanto}else{notificacao.sms("Não tem saldo suficiente",1);return}}
dadosOperacao.para=para;this.modalConfirmar();console.log(dadosOperacao)}};class EnviarReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
$('[name="radio-parcelado"]').change(function(){var parcelar=$('[name="radio-parcelado"]:checked').val();if(parcelar=="sim"){$("#select-parcelado").removeAttr("disabled");$("#select-parcela").removeAttr("disabled");$("#opcao-recorrente").hide("slow");var quanto=$('#quanto').val();var valorParcela=Number(quanto/2).toFixed(2);$(".valorParcela").html(`Serão pagos <br><b>${valorParcela}</b>, <br> ${2} vezes`)}
if(parcelar=="nao"){$("#select-parcelado")[0].setAttribute("disabled","disabled");$("#select-parcela")[0].setAttribute("disabled","disabled");$("#opcao-recorrente").show("slow");$(".valorParcela").html(`Serão pagos <br><b>000 000,00</b>, <br> x vezes`)}})
$('[name="radio-recorrente"]').change(function(){var parcelar=$('[name="radio-recorrente"]:checked').val();if(parcelar=="sim"){$("#select-recorrente").removeAttr("disabled");$("#opcao-parcelado").hide("slow");$("#opcao-parcela").hide("slow")}
if(parcelar=="nao"){$("#select-recorrente")[0].setAttribute("disabled","disabled");$("#opcao-parcelado").show("slow");$("#opcao-parcela").show("slow")}})
$('#select-parcela').change(function(){var parcelar=$('#select-parcela').val();var quanto=$('#quanto').val();var valorParcela=Number(quanto/parcelar).toFixed(2);$(".valorParcela").html(`Serão pagos <br><b>${valorParcela}</b>, <br> ${parcelar} vezes`)})
new SlimSelect({select:'#select-parcelado',settings:{showSearch:!1}})
new SlimSelect({select:'#select-parcela',settings:{showSearch:!1}})
new SlimSelect({select:'#select-recorrente',settings:{showSearch:!1}})}
modalConfirmar(){ESCOPO.modalConfirmar=new bootstrap.Modal(document.getElementById('confirmar-modal'))
ESCOPO.modalConfirmar.toggle()}
pegaDadosOperacao(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var notificacao=this.notificacao;ESCOPO.dadosOperacao={opcoes:{valor_parcela:null}};var valor=$("#quanto").val();var para=$("#para").val();var descricao=$("#descricao").val();var tipo="normal";var onde="App";if(valor<1){notificacao.sms("Verifica o valor a transaferir",1);return}else{var MOCK={saldo:localStorage.getItem("balanco")}
if((Number(MOCK.saldo)-1)>=valor){ESCOPO.dadosOperacao.valor=valor}else{notificacao.sms("Não tem saldo suficiente",1);return}}
if(para.length!=9){notificacao.sms("Verifique o destinatário, deve conter 9 digitos",1);return}else{ESCOPO.dadosOperacao.para=para}
var parcelado=$('[name="radio-parcelado"]:checked').val();var parceladoPeriodicidade;var parceladoParcelas;var recorrente=$('[name="radio-recorrente"]:checked').val();var recorrentePeriodicidade;if(parcelado=="sim"){tipo="parcelado";parceladoPeriodicidade=$("#select-parcelado").val();parceladoParcelas=$("#select-parcela").val();var opcoes={periodicidade:parceladoPeriodicidade,parcelas:parceladoParcelas,valor_parcela:(Number(valor/parceladoParcelas)).toFixed(2)}
ESCOPO.dadosOperacao.opcoes=opcoes}
if(recorrente=="sim"){tipo="recorrente";recorrentePeriodicidade=$("#select-recorrente").val();ESCOPO.dadosOperacao.periodicidade=recorrentePeriodicidade;var opcoes={periodicidade:recorrentePeriodicidade,}
ESCOPO.dadosOperacao.opcoes=opcoes}
ESCOPO.dadosOperacao.valor=valor;ESCOPO.dadosOperacao.tipo=tipo;ESCOPO.dadosOperacao.onde=onde;ESCOPO.dadosOperacao.descricao=descricao;ESCOPO.acao=`Trasferência para ${(ESCOPO.dadosOperacao.para)} \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;var tipoo=``;if(tipo=="parcelado"){tipoo=`<p>Tipo: ${(ESCOPO.dadosOperacao.opcoes.parcelas)} parcelas de <b>${(MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcela, 2, ".", " "))}</b> pagos ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}, fazendo um total de <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b> no final.</p>`;ESCOPO.acao=`Trasferência parcelada para ${(ESCOPO.dadosOperacao.para)} \n${(ESCOPO.dadosOperacao.opcoes.parcelas)} parcelas de ${(MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcela, 2, ".", " "))} pagos ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}, fazendo um total de ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} no final.`}
if(tipo=="recorrente"){tipoo=`<p>Tipo: Recorrente pago ${(ESCOPO.dadosOperacao.opcoes.periodicidade)} </p>`;ESCOPO.acao=`Trasferência recorrente para ${(ESCOPO.dadosOperacao.para)} \nPago ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} de forma ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}.`}
$("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(ESCOPO.dadosOperacao.opcoes.valor_parcela ? MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcela, 2, ".", " ") : MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            <p>Para:  ${ESCOPO.dadosOperacao.para}</p> 
            ${tipoo}
            <p>Descrição: ${(ESCOPO.dadosOperacao.descricao)}</p>
            `)
this.modalConfirmar();if(valor>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
ESCOPO.callback=this.novoEnvio;ESCOPO.parametro=this}
novoEnvio(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/transacao/enviar","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};esse.loader.abrir();$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class EstatisticaReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao;this.datas=[]}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;esse.loader.abrir()
var settings={"url":(this.apiUrl)+"/estatistica/init","method":"GET","timeout":0,"headers":{"token":db.getToken()},};var mes=[];var ano=[];esse.jquery.ajax(settings).done(function(d){var anoAtual=(d.payload.atual.ano);var mesAtual=(d.payload.atual.mes);esse.datas=(d.payload.datas)?(d.payload.datas):[];localStorage.setItem("datas",JSON.stringify(esse.datas));(esse.datas).forEach(element=>{let atualYear=element.ano;if(atualYear!=anoAtual){ano.push({text:String(atualYear),value:String(atualYear)})}
if(element[anoAtual]){element[anoAtual].forEach(month=>{if(month!=mesAtual){mes.push({text:String(month),value:String(month)})}})}})
let m=(Object.values(mes.reduce((acc,cur)=>Object.assign(acc,{[cur.text]:cur}),{})));let a=(Object.values(ano.reduce((acc,cur)=>Object.assign(acc,{[cur.text]:cur}),{})));ESCOPO.selectAno=new SlimSelect({select:'#ano',settings:{showSearch:!1}})
ESCOPO.selectMes=new SlimSelect({select:'#mes',settings:{showSearch:!1}})
a.sort((a,b)=>b.text-a.text);m.sort((a,b)=>b.text-a.text);a.unshift({text:(anoAtual),value:(anoAtual)});m.unshift({text:(mesAtual),value:(mesAtual)});esse.controllerData();ESCOPO.selectAno.setData(a);ESCOPO.selectMes.setData(m);var dados=d.payload.atual.res;esse.jquery(".entrada-left").html(dados.qtd_entrada+" ENTRADAS");esse.jquery(".saida-left").html(dados.qtd_saida+" SAIDAS");esse.jquery(".entrada-right").html((MONEY(dados.total_entrada,2,"."," ")));esse.jquery(".saida-right").html(((MONEY(dados.total_saida,2,"."," "))));var widthContainer=(dados.dados).length*25;var res=``;(dados.dados).forEach(function(v,k){var dia=v[2];var entrada=v[0];var saida=v[1];var entradaPercent=Math.round((entrada/(entrada+saida))*100);var saidaPercent=Math.round((saida/(entrada+saida))*100);res+=`<div class="barra"><div class="barra-grafico"><div class="saida" style="height:${saidaPercent}%"></div><div class="entrada" style="height:${entradaPercent}%"></div></div> <div class="limpar"></div> <p>${dia}</p></div>`})
esse.jquery(".render-grafico").html(res);esse.jquery(".render-grafico").css({"width":widthContainer+"px"});setTimeout(function(){ESCOPO.init=!1},1500)}).always(function(a){esse.loader.fechar()})}
controllerData(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;$('#ano').on("change",function(){var ano=$('#ano').val();var mes=[];try{(JSON.parse(localStorage.getItem("datas"))).forEach(function(element){if(element[ano]){(element[ano]).forEach(function(month){mes.unshift({text:(month),value:(month)})})}})}catch(error){}
mes.unshift({text:"Selecionar",value:"00"});ESCOPO.selectMes.destroy()
ESCOPO.selectMes=new SlimSelect({select:'#mes',settings:{showSearch:!1,keepOrder:!0}});ESCOPO.selectMes.setData(mes);if(ESCOPO.init!=!0){$(".render-aqui").html(`<br><h4 style="text-align:center">SELECIONE O MÊS</h4><br>`);$("#qtd").html(" &nbsp; ")}});$('#mes').on("change",function(){var mes=String($('#mes').val());var ano=String($('#ano').val());if(mes!="00"&&mes!=0&&mes!="0"&&ESCOPO.init!=!0){esse.estatisticas(mes,ano)}})}
estatisticas(mes,ano){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;this.loader.abrir();var settings={"url":(this.apiUrl)+"/estatistica/ver","method":"POST","timeout":0,"headers":{"token":db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"mes":mes,"ano":ano}),};ESCOPO.init=!0;(this.jquery).ajax(settings).done(function(d){var dados=d.payload;esse.jquery(".entrada-left").html(dados.qtd_entrada+" ENTRADAS");esse.jquery(".saida-left").html(dados.qtd_saida+" SAIDAS");esse.jquery(".entrada-right").html((MONEY(dados.total_entrada,2,"."," ")));esse.jquery(".saida-right").html(((MONEY(dados.total_saida,2,"."," "))));var widthContainer=(dados.dados).length*25;var res=``;(dados.dados).forEach(function(v,k){var dia=v[2];var entrada=v[0];var saida=v[1];var entradaPercent=Math.round((entrada/(entrada+saida))*100);var saidaPercent=Math.round((saida/(entrada+saida))*100);res+=`<div class="barra"><div class="barra-grafico"><div class="saida" style="height:${saidaPercent}%"></div><div class="entrada" style="height:${entradaPercent}%"></div></div> <div class="limpar"></div> <p>${dia}</p></div>`})
esse.jquery(".render-grafico").html(res);esse.jquery(".render-grafico").css({"width":widthContainer+"px"})}).always(function(){esse.loader.fechar()})
setTimeout(function(){ESCOPO.init=!1},1500)}};class InicioReq{constructor(jquery,apiUrl,loader,notificacao,db){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao;this.db=db}
slide(){var sli=new debliwuislideimg($,['<img src="assets/img-menu.svg" style="border-radius:5px;">','<img src="assets/pub2.png" style="border-radius:5px;">'],1,!0,1200,4000);$(".slide").prepend(sli)}
login(){var esse=this;var id=$("#telefone").val();var pin=$("#pin").val();if(id.length<9||pin.length<6){esse.notificacao.sms("Preencha os dados corretamente",1);return}
esse.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/entrar","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":id,"pin":pin}),};$.ajax(settings).done(function(res){if(res.ok){localStorage.setItem("sessao",Date.now());esse.db.setToken(res.token);esse.home();esse.db.verificaToken();esse.notificacao.sms("É feta, é fácil")}else{esse.notificacao.sms(res.payload,1)}}).always(function(a){esse.loader.fechar()})}
reLogin(){var esse=this;var id=localStorage.getItem("telefone");var pin=ESCOPO.pin;if(id.length<9||pin.length<6){esse.notificacao.sms("Preencha os dados corretamente",1);return}
esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/auth/entrar","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":id,"pin":pin}),};$.ajax(settings).done(function(res){if(res.ok){pin='';localStorage.setItem("sessao",Date.now());esse.db.setToken(res.token);esse.home();esse.db.verificaToken();esse.notificacao.sms("É feta, é fácil")}else{esse.notificacao.sms(res.payload,1);pin=''}}).always(function(a){esse.loader.fechar()})}
home(){var esse=this;var settings={"url":(this.apiUrl)+"/perfil/init","method":"GET","timeout":0,"headers":{"token":esse.db.getToken()},};$.ajax(settings).done(function(res){if(res.ok){console.log(res.payload);var sessao=res.payload.bloqueio;if(sessao=="mins1"){localStorage.setItem("sessaolimite",60)}
if(sessao=="mins5"){localStorage.setItem("sessaolimite",300)}
if(sessao=="segs30"){localStorage.setItem("sessaolimite",30)}
localStorage.setItem("nome",res.payload.nome);localStorage.setItem("balanco",res.payload.balanco);localStorage.setItem("telefone",res.payload.telefone);localStorage.setItem("transacoes",JSON.stringify(res.payload.transacoes.payload))}else{}}).always(function(a){})}
pedirNumero(){this.loader.abrir();var esse=this;var settings={"url":(this.apiUrl)+"/pedecodigo","method":"POST","timeout":0,"headers":{"token":esse.db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"acao":ESCOPO.acao}),};$.ajax(settings).done(function(res){if(res.ok){esse.notificacao.sms("Código de confirmação enviado com sucesso");ESCOPO.modalConfirmarFinal=new bootstrap.Modal(document.getElementById('confirmar-sms'));ESCOPO.modalConfirmarFinal.toggle()}else{esse.notificacao.sms(res.payload,1)}}).always(function(a){esse.loader.fechar()})}
pedirPin(){this.loader.abrir();setTimeout(()=>{ESCOPO.modalConfirmarFinal=new bootstrap.Modal(document.getElementById('confirmar-pin'));ESCOPO.modalConfirmarFinal.toggle();this.loader.fechar()},1000)}
pedirNumeroOuPin(){document.querySelectorAll(".modal-backdrop").forEach(function(i){$(i).hide()});document.querySelectorAll(".modal").forEach(function(i){$(i).hide()});if(ESCOPO.confirmarFinal=="pin"){this.pedirPin()}else{this.pedirNumero()}}
pedirNumeroNovo(){this.loader.abrir();var esse=this;var settings={"url":(this.apiUrl)+"/pedecodigo","method":"POST","timeout":0,"headers":{"token":esse.db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"acao":ESCOPO.acao}),};$.ajax(settings).done(function(res){if(res.ok){esse.notificacao.sms("Código de confirmação enviado com sucesso",1)}else{esse.notificacao.sms(res.payload,1)}}).always(function(a){esse.loader.fechar()})}
confirmarNumero(){this.loader.abrir();var codigo=$("#codigo-confirmacao").val();if(codigo.length<6){this.notificacao.sms("Verifica o código de confirmação",1)}else{ESCOPO.codigo=codigo;ESCOPO.callback(ESCOPO.parametro)}}
confirmarPin(){updatePinDisplay();ESCOPO.callback(ESCOPO.parametro)}
criarConta_um(){var empresa=!1;var valor=$("input[name=radio-criar]:checked").val();if(valor!="particular"){empresa=!0}
ESCOPO.dadosOperacao={comercial:empresa};if(empresa){vaiTela("/criarempresa")}else{vaiTela("/criarindividual")}}
criarConta_dois(){var nome=$("#nome").val();var bi=$("#bi").val();var genero=$("#genero").val();var nascimento=$("#nascimento").val();var telefone=$("#telefone").val();if(nome.length<5||bi.length<5){this.notificacao.sms("Preencha os dados corretamente",1);return}
var dezoitoAnos=(new Date().getFullYear()-18);var idade=Number(($("#nascimento").val()).split("-")[0]);if(dezoitoAnos<idade){this.notificacao.sms("Verifica a sua data de nascimento, parece ser menor de idade",1);return}
ESCOPO.dadosOperacao={nome:nome,bi:bi,genero:genero,nascimento:nascimento,id:telefone};this.verificaExistencia()}
criarConta_dois_emp(){var nome=$("#nome").val();var nif=$("#nif").val();var area=$("#area").val();var telefone=$("#telefone").val();if(nome.length<5||nif.length<5){this.notificacao.sms("Preencha os dados corretamente",1);return}
ESCOPO.dadosOperacao={nome:nome,nif:nif,area:area,id:telefone,comercial:!0};this.verificaExistencia()}
verificaExistencia(){var esse=this;esse.loader.abrir();var body={comercial:!0,id:ESCOPO.dadosOperacao.id,bi:"123456789",nome:ESCOPO.dadosOperacao.nome,genero:ESCOPO.dadosOperacao.genero,nascimento:ESCOPO.dadosOperacao.nascimento,}
if(ESCOPO.dadosOperacao.comercial){}
var settings={"url":(esse.apiUrl)+"/auth/verificaexistencia","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({id:ESCOPO.dadosOperacao.id,comercial:ESCOPO.dadosOperacao.comercial}),};$.ajax(settings).done(function(response){console.log(response);if(!response.ok){esse.notificacao.sms("Código de confirmação enviado com sucesso",1);vaiTela("/inicioconfirmar")}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
confirmarTelefone(){var esse=this;esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/auth/verificatelefone","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({id:ESCOPO.dadosOperacao.id,codigo:$("#codigo").val()})};$.ajax(settings).done(function(response){console.log(response);if(response.ok){esse.notificacao.sms(response.payload,1);vaiTela("/criarpin")}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
cadastrar(){var pin_novo=$("#pin").val();var pin_novo_confirmar=$("#pin_confirmar").val();if(pin_novo.length!=6){this.notificacao.sms("Verifica o PIN, deve ter 6 digitos",1);return}
if(pin_novo!=pin_novo_confirmar){this.notificacao.sms("Verifica o PIN, as combinações devem ser iguais",1);return}
ESCOPO.dadosOperacao.pin=pin_novo;var esse=this;esse.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/cadastrar","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){console.log(response);if(response.ok){localStorage.setItem("sessao",Date.now());esse.db.setToken(response.token);esse.home();esse.db.verificaToken();esse.notificacao.sms("É feta, é fácil")}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class PendentesReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
pendentes(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
$("#render-pendentes").html("");var loader=this.loader;var settings={"url":(this.apiUrl)+"/pendente/init","method":"GET","timeout":0,"headers":{"token":db.getToken()}};(this.jquery).ajax(settings).done(function(dados){var itens=``;var obj=dados.payload;$("#qtd-pendentes").html(obj.length+" pendentes");obj.forEach(element=>{var btn_confirmar="";var icon="";var fechar="";var cor="";var titulo="";var sinal="";var detail="";var ttipo=element.tipo;var iid=element.pid;var vvalor=element.valor;if(element.para!=(localStorage.getItem("telefone"))){icon="assets/enviar-icon.svg";fechar="assets/fechar-enviar-icon.svg";cor="#dc3545";titulo="ENVIAR";sinal="-";detail="Para: "+element.para;btn_confirmar=`<button type="button" class="btn btn-primary form-control"
                                    style="background-color: ${cor};color:black;border: 1px solid ${cor}" onclick='PendentesRequests.aceitarOperacao("${iid}","${(vvalor)}","${(titulo)}")'>Confirmar</button>`}else{icon="assets/receber-icon.svg";fechar="assets/fechar-receber-icon.svg";cor="#00BF00";titulo="RECEBER";sinal="+";detail="de: "+element.de}
itens+=`<div class="pendente" data-bs-toggle="modal" data-bs-target="#modalpendentes${(element.pid)}" style="background:${cor}15">
                    <p class="acao" style="color:${cor}">${titulo}</p>
                    <p class="valor">${(MONEY(element.valor, 2, ".", " "))}</p>
                    <p class="data">${(element.quando)}</p>
                    <img src="${icon}">
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modalpendentes${(element.pid)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title"
                                    style="text-align: center;font-size: 15px;color: ${cor};">${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${(MONEY(element.valor, 2, ".", " "))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    <p>${(detail)}</p>
                                    <p>Tipo: ${(element.tipo)}</p>
                                    <p>Descrição: ${(element.descricao)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.pid)}</b></p>
                                </div>

                            </div>
                            <div class="modal-footer" style="border: none;">
                                ${btn_confirmar}	
                                <button type="button"
                                    class="btn btn-secondary form-control btn-danger"
                                     onclick='PendentesRequests.cancelarOperacao("${(element.pid)}", "${(element.valor)}", "${(titulo)}")'>Cancelar Operação</button>
                            </div>
                        </div>
                    </div>
                </div>`});$("#render-pendentes").append(itens)}).always(function(){loader.fechar()})}
cancelarOperacao(id,valor,tipo){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
ESCOPO.dadosOperacao={pid:id};ESCOPO.acao=`Cancelar operação pendente a ${tipo} de ${valor}.`;ESCOPO.callback=this.cancelar;ESCOPO.parametro=this;if(Number(valor)>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
InicioRequests.pedirNumeroOuPin()}
cancelar(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/pendente/cancelar","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
aceitarOperacao(element,valor,tipo){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
ESCOPO.dadosOperacao={pid:element};ESCOPO.acao=`Aceitar operação pendente a ${tipo} de ${valor}.`;ESCOPO.callback=this.aceitar;ESCOPO.parametro=this;if(Number(valor)>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
InicioRequests.pedirNumeroOuPin()}
aceitar(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/transacao/aceitarpendente","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class PerfilReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;this.loader.abrir();var settings={"url":(this.apiUrl)+"/perfil/detalhes","method":"GET","timeout":0,"headers":{"token":db.getToken()},};this.jquery.ajax(settings).done(function(dados){console.error(dados);var conta=dados.payload;if(Number(conta.empresa)==1){$(".titulo").html("<h1>CONTA EMPRESA</h1>");$(".id_doc").html("NIF");$(".genero").html("Área de atuação");$("#genero").val((conta.area).toUpperCase()).attr("disabled","disabled")}
if(Number(conta.empresa)!=1){$(".titulo").html("<h1>CONTA PESSOAL</h1>");$(".id_doc").html("BI");$(".genero").html("Gênero");$("#genero").val((conta.genero).toUpperCase()).attr("disabled","disabled");$("#nasc_div").show();$("#nascimento").val((conta.nascimento).toUpperCase()).attr("disabled","disabled")}
$(".nome").html((conta.nome).toUpperCase());$("#nome").val((conta.nome).toUpperCase()).attr("disabled","disabled");$("#id_doc").val(conta.id_doc).attr("disabled","disabled");$("#telefone").val(conta.telefone).attr("disabled","disabled");$("#nome_edit").val(conta.nome);$("#id_doc_edit").val(conta.id_doc);$("#telefone_edit").val(conta.telefone)}).always(function(a){esse.loader.fechar()})}
modalConfirmar(){var myModal=new bootstrap.Modal(document.getElementById('confirmar-sms'))
myModal.toggle()}
pegaDadosOperacao(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var notificacao=this.notificacao;var dadosOperacao={};var quanto=$("#valor-receber").val();var para=$("#iban-receber").val();if(quanto<1){notificacao.sms("Verifica o valor a receber",1);return}else{var MOCK={saldo:"15000"}
if((MOCK.saldo-1)>=quanto){dadosOperacao.quanto=quanto}else{notificacao.sms("Não tem saldo suficiente",1);return}}
dadosOperacao.para=para;this.modalConfirmar()}
recuperar(){var esse=this;this.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/recuperarconta","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":$("#telefone").val()}),};this.jquery.ajax(settings).done(function(dados){if(dados.ok){localStorage.setItem("telefone",$("#telefone").val());esse.notificacao.sms(dados.payload,0);vaiTela("/recuperarconfirmar")}else{esse.notificacao.sms(dados.payload,1)}}).always(function(a){esse.loader.fechar()})}
confirmarCodigo(){var esse=this;this.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/confirmarcodigo","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":localStorage.getItem("telefone"),"codigo":$("#codigo").val()}),};this.jquery.ajax(settings).done(function(dados){if(dados.ok){localStorage.setItem("codigo",$("#codigo").val());esse.notificacao.sms(dados.payload,0);vaiTela("/recuperarpin")}else{esse.notificacao.sms(dados.payload,1)}}).always(function(a){esse.loader.fechar()})}
recuperarPin(){var esse=this;var pin_novo=$("#pin_novo").val();var pin_novo_confirmar=$("#pin_novo_confirmar").val();if(pin_novo.length!=6){this.notificacao.sms("Verifica o novo PIN, deve ter 6 digitos",1);return}
if(pin_novo!=pin_novo_confirmar){this.notificacao.sms("Verifica o novo PIN, as combinaçoes devem ser iguais",1);return}
this.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/novopin","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":localStorage.getItem("telefone"),"codigo":localStorage.getItem("codigo"),"pin":pin_novo})};$.ajax(settings).done(function(response){if(response.ok){localStorage.setItem("sessao",Date.now());esse.db.setToken(response.token);esse.home();esse.db.verificaToken()}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}}).always(function(a){})}};class ReceberReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
$('[name="radio-parcelado"]').change(function(){var parcelar=$('[name="radio-parcelado"]:checked').val();if(parcelar=="sim"){$("#select-parcelado").removeAttr("disabled");$("#select-parcela").removeAttr("disabled");$("#opcao-recorrente").hide("slow");var quanto=$('#quanto').val();var valorParcela=Number(quanto/2).toFixed(2);$(".valorParcela").html(`Serão pagos <br><b>${valorParcela}</b>, <br> ${2} vezes`)}
if(parcelar=="nao"){$("#select-parcelado")[0].setAttribute("disabled","disabled");$("#select-parcela")[0].setAttribute("disabled","disabled");$("#opcao-recorrente").show("slow");$(".valorParcela").html(`Serão pagos <br><b>000 000,00</b>, <br> x vezes`)}})
$('[name="radio-recorrente"]').change(function(){var parcelar=$('[name="radio-recorrente"]:checked').val();if(parcelar=="sim"){$("#select-recorrente").removeAttr("disabled");$("#opcao-parcelado").hide("slow");$("#opcao-parcela").hide("slow")}
if(parcelar=="nao"){$("#select-recorrente")[0].setAttribute("disabled","disabled");$("#opcao-parcelado").show("slow");$("#opcao-parcela").show("slow")}})
$('#select-parcela').change(function(){var parcelar=$('#select-parcela').val();var quanto=$('#quanto').val();var valorParcela=Number(quanto/parcelar).toFixed(2);$(".valorParcela").html(`Serão pagos <br><b>${valorParcela}</b>, <br> ${parcelar} vezes`)})
new SlimSelect({select:'#select-parcelado',settings:{showSearch:!1}})
new SlimSelect({select:'#select-parcela',settings:{showSearch:!1}})
new SlimSelect({select:'#select-recorrente',settings:{showSearch:!1}})}
modalConfirmar(){ESCOPO.modalConfirmar=new bootstrap.Modal(document.getElementById('confirmar-modal'))
ESCOPO.modalConfirmar.toggle()}
pegaDadosOperacao(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var notificacao=this.notificacao;ESCOPO.dadosOperacao={opcoes:{valor_parcelas:null}};var valor=$("#quanto").val();var de=$("#de").val();var descricao=$("#descricao").val();var tipo="normal";var onde="App";if(valor<1){notificacao.sms("Verifica o valor a receber",1);return}
if(de.length<1){notificacao.sms("Quem vai tranferir o recebimento?",1);return}else{ESCOPO.dadosOperacao.de=de}
var parcelado=$('[name="radio-parcelado"]:checked').val();var parceladoPeriodicidade;var parceladoParcelas;var recorrente=$('[name="radio-recorrente"]:checked').val();var recorrentePeriodicidade;if(parcelado=="sim"){tipo="parcelado";parceladoPeriodicidade=$("#select-parcelado").val();parceladoParcelas=$("#select-parcela").val();var opcoes={periodicidade:parceladoPeriodicidade,parcelas:parceladoParcelas,valor_parcelas:(Number(valor/parceladoParcelas)).toFixed(2)}
ESCOPO.dadosOperacao.opcoes=opcoes}
if(recorrente=="sim"){tipo="recorrente";recorrentePeriodicidade=$("#select-recorrente").val();ESCOPO.dadosOperacao.periodicidade=recorrentePeriodicidade;var opcoes={periodicidade:recorrentePeriodicidade,}
ESCOPO.dadosOperacao.opcoes=opcoes}
ESCOPO.dadosOperacao.valor=valor;ESCOPO.dadosOperacao.tipo=tipo;ESCOPO.dadosOperacao.onde=onde;ESCOPO.dadosOperacao.descricao=descricao;ESCOPO.acao=`Recebimento que virá de ${(ESCOPO.dadosOperacao.de)} \n${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;var tipoo=``;if(tipo=="parcelado"){tipoo=`<p>Tipo: ${(ESCOPO.dadosOperacao.opcoes.parcelas)} parcelas de <b>${(MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcelas, 2, ".", " "))}</b> a ser recebido ${(ESCOPO.dadosOperacao.opcoes.periodicidade)} </p>`;ESCOPO.acao=`Recebimento parcelado que virá de ${(ESCOPO.dadosOperacao.de)} \n${(ESCOPO.dadosOperacao.opcoes.parcelas)} parcelas de ${(MONEY(ESCOPO.dadosOperacao.opcoes.valor_parcelas, 2, ".", " "))} pagos ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}, fazendo um total de ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} no final.`}
if(tipo=="recorrente"){tipoo=`<p>Tipo: Recorrente a receber ${(ESCOPO.dadosOperacao.opcoes.periodicidade)} </p>`;ESCOPO.acao=`Recebimento recorrente que virá de ${(ESCOPO.dadosOperacao.de)} \nPago ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} de forma ${(ESCOPO.dadosOperacao.opcoes.periodicidade)}.`}
$("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            <p>De:  ${ESCOPO.dadosOperacao.de}</p> 
            ${tipoo}
            <p>Descrição: ${(ESCOPO.dadosOperacao.descricao)}</p>
            `)
this.modalConfirmar();if(valor>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
ESCOPO.callback=this.novoEnvio;ESCOPO.parametro=this}
novoEnvio(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/transacao/receber","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};esse.loader.abrir();$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class RecorrentesReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
recorrentes(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;$("#render-recorrentes").html("");var loader=this.loader;var settings={"url":(this.apiUrl)+"/recorrente/init","method":"GET","timeout":0,"headers":{"token":db.getToken()}};(this.jquery).ajax(settings).done(function(dados){var itens=``;var obj=dados.payload;$("#qtd-recorrentes").html(obj.length+" recorrentes");obj.forEach(element=>{var cancelarUI=``;var transacoes=``;(element.transacoes).forEach(transacao=>{var classe="";var sinal="";if(element.enviar){classe="saida";sinal="-"}else{classe="entrada";sinal="+"}
transacoes+=`<div class="transacao ${classe}">
                            <p class="valor">${sinal} ${(transacao.valor)}</p>
                            <p class="data">${(transacao.quando)}</p>
                            <p class="descricao">${(transacao.tipo)}</p>
                        </div>`})
var icon="";var fechar="";var cor="";var titulo="";var detail="";var ativo="";if(element.enviar){if(element.ativo=='1'){ativo="ATIVO";if(element.tipo=="recorrente"){cancelarUI=`<div class="modal-footer" style="border: none;">
                                    <button type="button"
                                        class="btn btn-secondary form-control btn-danger"
                                        onclick='RecorrentesRequests.cancelarOperacao("${(element.identificador)}","${(element.valor)}","${(titulo)}")'>Cancelar Operação</button>
                                </div>`}}else{ativo="INATIVO"}
icon="assets/enviar-icon.svg";fechar="assets/fechar-enviar-icon.svg";cor="#dc3545";titulo="ENVIAR -- "+ativo;detail="Para: "+element.para}else{if(element.ativo=='1'){ativo="ATIVO"}else{ativo="INATIVO"}
icon="assets/receber-icon.svg";fechar="assets/fechar-receber-icon.svg";cor="#00BF00";titulo="RECEBER -- "+ativo;detail="de: "+element.de}
itens+=`<div class="recorrente" data-bs-toggle="modal" data-bs-target="#modalrecorrentes${(element.identificador)}" style="background:${cor}15">
                    <p class="acao" style="color:${cor}">${titulo}</p>
                    <p class="valor">${(MONEY(element.valor, 2, ".", " "))}</p>
                    <p class="data">${(element.quando)}</p>
                    <img src="${icon}">
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modalrecorrentes${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title"
                                    style="text-align: center;font-size: 15px;color: ${cor};">${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}"> ${(MONEY(element.valor, 2, ".", " "))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    <p>${(detail)}</p>
                                    <p onclick='RecorrentesRequests.modalTransacoes("${(element.identificador)}")'>Tipo: ${(element.tipo)} <img src="assets/info.svg" style="width:20px"></p>
                                    <p>Descrição: ${(element.descricao)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.identificador)}</b></p>
                                </div>

                            </div>
                            ${cancelarUI}
                        </div>
                    </div>
                </div>
                
                
                <!-- Modal transacoes -->
                <div class="modal fade" id="transacoes${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align:center;font-size: 15px;color: ${cor};"> ${(element.transacoes.length)} TRANSAÇÕES</h5>
                                <img src="${fechar}" data-bs-dismiss="modal" aria-label="Close" style="width: 15px;">
                            </div>
                            <div class="modal-body" style="min-height:60vh">
                                ${transacoes}
                            </div>
                        </div>
                    </div>
                </div>
                
                `});$("#render-recorrentes").append(itens)}).always(function(){loader.fechar()})}
modalCancelar(id){var myModal=new bootstrap.Modal(document.getElementById('cancelar'+id))
myModal.toggle()}
modalConfirmar(id){var myModal=new bootstrap.Modal(document.getElementById('confirmar'+id))
myModal.toggle()}
modalTransacoes(id){var myModal=new bootstrap.Modal(document.getElementById('transacoes'+id))
myModal.toggle()}
cancelarOperacao(id,valor,tipo){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
ESCOPO.dadosOperacao={pid:id};ESCOPO.acao=`Cancelar operação recorrente a ${tipo} de ${valor}.`;ESCOPO.callback=this.cancelar;ESCOPO.parametro=this;if(Number(valor)>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
InicioRequests.pedirNumeroOuPin()}
cancelar(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/recorrente/cancelar","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class TransacoesReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao;this.datas=[]}
removeDuplicates(originalArray,prop){var newArray=[];var lookupObject={};for(var i in originalArray){lookupObject[originalArray[i][prop]]=originalArray[i]}
for(i in lookupObject){newArray.push(lookupObject[i])}
return newArray}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;esse.loader.abrir();var settings={"url":(this.apiUrl)+"/transacao/init","method":"GET","timeout":0,"headers":{"token":db.getToken()}};var mes=[];var ano=[];esse.jquery.ajax(settings).done(function(d){var anoAtual=(d.payload.atual.ano);var mesAtual=(d.payload.atual.mes);esse.datas=(d.payload.datas)?(d.payload.datas):[];localStorage.setItem("datas",JSON.stringify(esse.datas));(esse.datas).forEach(element=>{let atualYear=element.ano;if(atualYear!=anoAtual){ano.push({text:String(atualYear),value:String(atualYear)})}
if(element[anoAtual]){element[anoAtual].forEach(month=>{if(month!=mesAtual){mes.push({text:String(month),value:String(month)})}})}})
let m=(Object.values(mes.reduce((acc,cur)=>Object.assign(acc,{[cur.text]:cur}),{})));let a=(Object.values(ano.reduce((acc,cur)=>Object.assign(acc,{[cur.text]:cur}),{})));ESCOPO.selectAno=new SlimSelect({select:'#ano',settings:{showSearch:!1}})
ESCOPO.selectMes=new SlimSelect({select:'#mes',settings:{showSearch:!1}})
a.sort((a,b)=>b.text-a.text);m.sort((a,b)=>b.text-a.text);a.unshift({text:String(anoAtual),value:String(anoAtual)});m.unshift({text:String(mesAtual),value:String(mesAtual)});esse.controllerData();ESCOPO.selectAno.setData(a);ESCOPO.selectMes.setData(m);var itens=``;var obj=d.payload.atual.res;obj.forEach(element=>{var fechar="";var classe="";var cor="";var titulo="";var sinal="";var quem="";if(element.enviar){fechar="assets/fechar-saida-icon.svg";quem=`<p>Para: ${(element.para)}</p>`;classe="saida";cor="#BF0003";titulo="SAIDA";sinal="-"}else{fechar="assets/fechar-entrada-icon.svg";quem=`<p>De: ${(element.de)}</p>`;classe="entrada";cor="#00BF00";titulo="ENTRADA";sinal="+"}
itens+=`
                <div class="transacao ${classe}" data-bs-toggle="modal" data-bs-target="#exampleModal${(element.identificador)}">
                    <p class="valor">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                    <p class="data">${(element.quando)}</p>
                    <p class="descricao">${(element.descricao)}</p>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align: center;font-size: 15px;color: ${cor};">DETALHES DA ${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    ${quem}
                                    <p>Tipo: ${(element.tipo)}</p>
                                    <p>Descrição: ${(element.descricao)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.identificador)}</b></p>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>`});setTimeout(function(){$("#qtd").html(obj.length+" transacoes");ESCOPO.init=!1},1500);$(".render-aqui").append(itens)}).always(function(a){esse.loader.fechar()})}
transacoes(mes,ano){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
$(".render-aqui").html("");var esse=this;this.loader.abrir();var settings={"url":(this.apiUrl)+"/transacao/ver","method":"POST","timeout":0,"headers":{"token":db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"mes":mes,"ano":ano}),};ESCOPO.init=!0;(this.jquery).ajax(settings).done(function(dados){var itens=``;var obj=dados.payload;obj.forEach(element=>{var fechar="";var classe="";var cor="";var titulo="";var sinal="";var quem="";if(element.enviar){fechar="assets/fechar-saida-icon.svg";quem=`<p>Para: ${(element.para)}</p>`;classe="saida";cor="#BF0003";titulo="SAIDA";sinal="-"}else{fechar="assets/fechar-entrada-icon.svg";quem=`<p>De: ${(element.de)}</p>`;classe="entrada";cor="#00BF00";titulo="ENTRADA";sinal="+"}
itens+=`
                <div class="transacao ${classe}" data-bs-toggle="modal" data-bs-target="#exampleModal${(element.identificador)}">
                    <p class="valor">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                    <p class="data">${(element.quando)}</p>
                    <p class="descricao">${(element.descricao)}</p>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align: center;font-size: 15px;color: ${cor};">DETALHES DA ${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.valor, 2, ".", " ")))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    <p>Onde: ${(element.onde)}</p>
                                    ${quem}
                                    <p>Tipo: ${(element.tipo)}</p>
                                    <p>Descrição: ${(element.descricao)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.identificador)}</b></p>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>`});$(".render-aqui").append(itens);$("#qtd").html(obj.length+" transacoes")}).always(function(){esse.loader.fechar()})
setTimeout(function(){ESCOPO.init=!1},1500)}
controllerData(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;$('#ano').on("change",function(){var ano=$('#ano').val();var mes=[];(JSON.parse(localStorage.getItem("datas"))).forEach(function(element){if(element[ano]){(element[ano]).forEach(function(month){mes.unshift({text:(month),value:(month)})})}});mes.unshift({text:"Selecionar",value:"00"});ESCOPO.selectMes.destroy()
ESCOPO.selectMes=new SlimSelect({select:'#mes',settings:{showSearch:!1,keepOrder:!0}});ESCOPO.selectMes.setData(mes);if(ESCOPO.init!=!0){$(".render-aqui").html(`<br><h4 style="text-align:center">SELECIONE O MÊS</h4><br>`);$("#qtd").html(" &nbsp; ")}});$('#mes').on("change",function(){var mes=String($('#mes').val());var ano=String($('#ano').val());if(mes!="00"&&mes!=0&&mes!="0"&&ESCOPO.init!=!0){esse.transacoes(mes,ano)}})}}