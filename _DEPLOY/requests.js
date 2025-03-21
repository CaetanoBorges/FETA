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
esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/config/alterarpin","method":"POST","timeout":0,"headers":{"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"},"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmarFinal.hide();esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
convidarAmigo(){var esse=this;var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var telefone=$("#telefone").val();if(telefone.length!=9){this.notificacao.sms("Insira o telefone corretamente",1);esse.loader.fechar();return}
var settings={"url":(esse.apiUrl)+"/config/convidaramigo","method":"POST","timeout":0,"headers":{"token":db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({telefone:telefone}),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
verLimites(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var telefone=$("#telefone").val();var settings={"url":(esse.apiUrl)+"/config/verlimites","method":"GET","timeout":0,"headers":{"token":db.getToken(),"Content-Type":"application/json"}};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class DepositarReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}}
modalConfirmar(){ESCOPO.modalConfirmar=new bootstrap.Modal(document.getElementById('confirmar-modal'))
ESCOPO.modalConfirmar.toggle()}
pegaDadosOperacao(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var notificacao=this.notificacao;ESCOPO.dadosOperacao={};var valor=$("#quanto").val();var para=$("#para").val();var tipo="deposito";var onde="App";if(valor<1){notificacao.sms("Verifica o valor a depositar",1);return}
if(para.length<9){notificacao.sms("Verifique o número da conta",1);return}else{ESCOPO.dadosOperacao.para=para}
ESCOPO.dadosOperacao.valor=valor;ESCOPO.dadosOperacao.tipo=tipo;ESCOPO.dadosOperacao.onde=onde;ESCOPO.dadosOperacao.descricao="Deposito de numerario";ESCOPO.acao=`Deposito para ${(ESCOPO.dadosOperacao.para)} \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;var tipoo=``;$("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            <p>para:  ${ESCOPO.dadosOperacao.para}</p> 
            ${tipoo}
            <p>Descrição: Deposito</p>
            `)
this.modalConfirmar();if(valor>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
ESCOPO.callback=this.novoEnvio;ESCOPO.parametro=this}
novoEnvio(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/transacao/depositar","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};esse.loader.abrir();$.ajax(settings).done(function(response){console.log(response);if(response.ok){InicioRequests.home();ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class DepositarLevantarReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
removeDuplicates(originalArray,prop){var newArray=[];var lookupObject={};for(var i in originalArray){lookupObject[originalArray[i][prop]]=originalArray[i]}
for(i in lookupObject){newArray.push(lookupObject[i])}
return newArray}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;esse.loader.abrir();var settings={"url":(this.apiUrl)+"/depositolevantamento/init","method":"GET","timeout":0,"headers":{"token":db.getToken()}};var mes=[];var ano=[];esse.jquery.ajax(settings).done(function(d){var anoAtual=(d.payload.atual.ano);var mesAtual=(d.payload.atual.mes);esse.datas=(d.payload.datas)?(d.payload.datas):[];localStorage.setItem("datas",JSON.stringify(esse.datas));(esse.datas).forEach(element=>{let atualYear=element.ano;if(atualYear!=anoAtual){ano.push({text:String(atualYear),value:String(atualYear)})}
if(element[anoAtual]){element[anoAtual].forEach(month=>{if(month!=mesAtual){mes.push({text:String(month),value:String(month)})}})}})
let m=(Object.values(mes.reduce((acc,cur)=>Object.assign(acc,{[cur.text]:cur}),{})));let a=(Object.values(ano.reduce((acc,cur)=>Object.assign(acc,{[cur.text]:cur}),{})));ESCOPO.selectAno=new SlimSelect({select:'#ano',settings:{showSearch:!1}})
ESCOPO.selectMes=new SlimSelect({select:'#mes',settings:{showSearch:!1}})
a.sort((a,b)=>b.text-a.text);m.sort((a,b)=>b.text-a.text);a.unshift({text:String(anoAtual),value:String(anoAtual)});m.unshift({text:String(mesAtual),value:String(mesAtual)});esse.controllerData();ESCOPO.selectAno.setData(a);ESCOPO.selectMes.setData(m);var itens=``;var obj=d.payload.atual.res;obj.forEach(element=>{var fechar="";var classe="";var cor="";var titulo="";var sinal="";var quem="";if(element.tipo=="levantamento"){fechar="assets/fechar-saida-icon.svg";quem=`<p>Cliente: ${(element.cliente)}</p>`;classe="saida";cor="#BF0003";titulo="LEVANTAMENTO";sinal="-"}else{fechar="assets/fechar-entrada-icon.svg";quem=`<p>Cliente: ${(element.cliente)}</p>`;classe="entrada";cor="#00BF00";titulo="DEPOSITO";sinal="+"}
itens+=`
                <div class="transacao ${classe}" data-bs-toggle="modal" data-bs-target="#exampleModal${(element.identificador)}">
                    <p class="valor">${sinal} ${((MONEY(element.total, 2, ".", " ")))}</p>
                    <p class="data">${(element.quando)}</p>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align: center;font-size: 15px;color: ${cor};">DETALHES DO ${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.total, 2, ".", " ")))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    ${quem}

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.transacao_pid)}</b></p>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>`});setTimeout(function(){$("#qtd").html(obj.length+" operações");ESCOPO.init=!1},1500);$(".render-aqui").append(itens)}).always(function(a){esse.loader.fechar()})}
transacoes(mes,ano){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
$(".render-aqui").html("");var esse=this;this.loader.abrir();var settings={"url":(this.apiUrl)+"/depositolevantamento/ver","method":"POST","timeout":0,"headers":{"token":db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"mes":mes,"ano":ano}),};ESCOPO.init=!0;(this.jquery).ajax(settings).done(function(dados){var itens=``;var obj=dados.payload;obj.forEach(element=>{var fechar="";var classe="";var cor="";var titulo="";var sinal="";var quem="";if(element.tipo=="levantamento"){fechar="assets/fechar-saida-icon.svg";quem=`<p>Cliente: ${(element.cliente)}</p>`;classe="saida";cor="#BF0003";titulo="LEVANTAMENTO";sinal="-"}else{fechar="assets/fechar-entrada-icon.svg";quem=`<p>Cliente: ${(element.cliente)}</p>`;classe="entrada";cor="#00BF00";titulo="DEPOSITO";sinal="+"}
itens+=`
                <div class="transacao ${classe}" data-bs-toggle="modal" data-bs-target="#exampleModal${(element.identificador)}">
                    <p class="valor">${sinal} ${((MONEY(element.total, 2, ".", " ")))}</p>
                    <p class="data">${(element.quando)}</p>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title" style="text-align: center;font-size: 15px;color: ${cor};">DETALHES DO ${titulo}</h5>
                                <img src="${fechar}"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    style="width: 15px;">
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${((MONEY(element.total, 2, ".", " ")))}</p>
                                <div class="detalhes-transacao">

                                    <p>Quando: ${(element.quando)}</p>
                                    ${quem}

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Id transação</p>
                                    <p><b>${(element.transacao_pid)}</b></p>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>`});$(".render-aqui").append(itens);$("#qtd").html(obj.length+" operações")}).always(function(){esse.loader.fechar()})
setTimeout(function(){ESCOPO.init=!1},1500)}
controllerData(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;$('#ano').on("change",function(){var ano=$('#ano').val();var mes=[];(JSON.parse(localStorage.getItem("datas"))).forEach(function(element){if(element[ano]){(element[ano]).forEach(function(month){mes.unshift({text:(month),value:(month)})})}});mes.unshift({text:"Selecionar",value:"00"});ESCOPO.selectMes.destroy()
ESCOPO.selectMes=new SlimSelect({select:'#mes',settings:{showSearch:!1,keepOrder:!0}});ESCOPO.selectMes.setData(mes);if(ESCOPO.init!=!0){$(".render-aqui").html(`<br><h4 style="text-align:center">SELECIONE O MÊS</h4><br>`);$("#qtd").html(" &nbsp; ")}});$('#mes').on("change",function(){var mes=String($('#mes').val());var ano=String($('#ano').val());if(mes!="00"&&mes!=0&&mes!="0"&&ESCOPO.init!=!0){esse.transacoes(mes,ano)}})}};class EnviarReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
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
a.sort((a,b)=>b.text-a.text);m.sort((a,b)=>b.text-a.text);a.unshift({text:(anoAtual),value:(anoAtual)});m.unshift({text:(mesAtual),value:(mesAtual)});esse.controllerData();if(ESCOPO.selectAno&&ESCOPO.selectMes){ESCOPO.selectAno.setData(a);ESCOPO.selectMes.setData(m)}
var dados=d.payload.atual.res;esse.jquery(".entrada-left").html(dados.qtd_entrada+" ENTRADAS");esse.jquery(".saida-left").html(dados.qtd_saida+" SAIDAS");esse.jquery(".entrada-right").html((MONEY(dados.total_entrada,2,"."," ")));esse.jquery(".saida-right").html(((MONEY(dados.total_saida,2,"."," "))));var widthContainer=(dados.dados).length*25;var res=``;(dados.dados).forEach(function(v,k){var dia=v[2];var entrada=v[0];var saida=v[1];var entradaPercent=Math.round((entrada/(entrada+saida))*100);var saidaPercent=Math.round((saida/(entrada+saida))*100);res+=`<div class="barra"><div class="barra-grafico"><div class="saida" style="height:${saidaPercent}%"></div><div class="entrada" style="height:${entradaPercent}%"></div></div> <div class="limpar"></div> <p>${dia}</p></div>`})
esse.jquery(".render-grafico").html(res);esse.jquery(".render-grafico").css({"width":widthContainer+"px"});setTimeout(function(){ESCOPO.init=!1},1500)}).always(function(a){esse.loader.fechar()})}
controllerData(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;$('#ano').on("change",function(){var ano=$('#ano').val();var mes=[];try{(JSON.parse(localStorage.getItem("datas"))).forEach(function(element){if(element[ano]){(element[ano]).forEach(function(month){mes.unshift({text:(month),value:(month)})})}})}catch(error){}
mes.unshift({text:"Selecionar",value:"00"});ESCOPO.selectMes.destroy()
ESCOPO.selectMes=new SlimSelect({select:'#mes',settings:{showSearch:!1,keepOrder:!0}});ESCOPO.selectMes.setData(mes);if(ESCOPO.init!=!0){$(".render-aqui").html(`<br><h4 style="text-align:center">SELECIONE O MÊS</h4><br>`);$("#qtd").html(" &nbsp; ")}});$('#mes').on("change",function(){var mes=String($('#mes').val());var ano=String($('#ano').val());if(mes!="00"&&mes!=0&&mes!="0"&&ESCOPO.init!=!0){esse.estatisticas(mes,ano)}})}
estatisticas(mes,ano){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var esse=this;this.loader.abrir();var settings={"url":(this.apiUrl)+"/estatistica/ver","method":"POST","timeout":0,"headers":{"token":db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"mes":mes,"ano":ano}),};ESCOPO.init=!0;(this.jquery).ajax(settings).done(function(d){var dados=d.payload;esse.jquery(".entrada-left").html(dados.qtd_entrada+" ENTRADAS");esse.jquery(".saida-left").html(dados.qtd_saida+" SAIDAS");esse.jquery(".entrada-right").html((MONEY(dados.total_entrada,2,"."," ")));esse.jquery(".saida-right").html(((MONEY(dados.total_saida,2,"."," "))));var widthContainer=(dados.dados).length*25;var res=``;(dados.dados).forEach(function(v,k){var dia=v[2];var entrada=v[0];var saida=v[1];var entradaPercent=Math.round((entrada/(entrada+saida))*100);var saidaPercent=Math.round((saida/(entrada+saida))*100);res+=`<div class="barra"><div class="barra-grafico"><div class="saida" style="height:${saidaPercent}%"></div><div class="entrada" style="height:${entradaPercent}%"></div></div> <div class="limpar"></div> <p>${dia}</p></div>`})
esse.jquery(".render-grafico").html(res);esse.jquery(".render-grafico").css({"width":widthContainer+"px"})}).always(function(){esse.loader.fechar()})
setTimeout(function(){ESCOPO.init=!1},1500)}};class InicioReq{constructor(jquery,apiUrl,loader,notificacao,db){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao;this.db=db}
termosecondicoesWatchAct(){$("#termos").change(function(){console.log($(this).prop("checked"));if($(this).prop("checked")){localStorage.setItem("termos","1");clearInterval(window.termInterval);setTimeout(function(){history.back()},1000)}else{localStorage.setItem("termos","0")}});$("#privacidade").change(function(){console.log($(this).prop("checked"));if($(this).prop("checked")){localStorage.setItem("privacidade","1");clearInterval(window.privInterval);setTimeout(function(){history.back()},1000)}else{localStorage.setItem("privacidade","0")}})}
termosecondicoesWatchVer(){var termos=localStorage.getItem("termos");var privacidade=localStorage.getItem("privacidade");if(termos=="1"){$("#termos").prop("checked",!0)}else{$("#termos").prop("checked",!1)}
if(privacidade=="1"){$("#privacidade").prop("checked",!0)}else{$("#privacidade").prop("checked",!1)}}
termosecondicoesValidar(){var anima=function(el){$(el).animate({opacity:".1"},100,function(){setTimeout(function(){$(el).css({opacity:1})},700)})}
var termos=localStorage.getItem("termos");var privacidade=localStorage.getItem("privacidade");if(termos=="1"||termos=='1'){clearInterval(window.termInterval);$("#btn-termos").removeClass("btn-flexa-roxo").addClass("btn-flexa")}else if(termos=="0"||termos=='0'){window.termInterval=setInterval(function(){anima("#btn-termos")},2500)}
if(privacidade=="1"||privacidade=='1'){clearInterval(window.privInterval);$("#btn-privacidade").removeClass("btn-flexa-roxo").addClass("btn-flexa")}else if(privacidade=="0"||privacidade=='0'){window.privInterval=setInterval(function(){anima("#btn-privacidade")},2500)}
if(termos=="1"&&privacidade=="1"){clearInterval(window.termInterval);clearInterval(window.privInterval);$("#btn-avancar").show()}}
tarifario(){var esse=this;var settings={"url":"APIMOCK/precario.json","method":"GET","timeout":0,"headers":{"Content-Type":"application/json"}};$.ajax(settings).done(function(response){if(response.ok){var AcordionUI="";(response.payload).forEach(function(item,index){var show="show";var expanded="true";var collapsed="";if(index>0){show="";expanded="false";collapsed="collapsed"}
var iteUI="";var categoria=item.categoria;var sobre=item.sobre;var itens=item.itens;(itens).forEach(function(ite,inde){var valor=ite.valor;var tarifa=ite.tarifa;iteUI+=`
                            <tr>
                                <td>${valor}</td>
                                <td>${tarifa}</td>
                            </tr>`})
var tabelaUI=`
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"  style="background-color: #640564;color:white">Valor (kz)</th>
                                <th scope="col"  style="background-color: #640564;color:white">Tarifa (kz) + IVA</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${iteUI}
                        </tbody>
                    </table>
                `;AcordionUI+=`
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne${index}">
                            <button class="accordion-button ${collapsed}" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapseOne${index}"
                                aria-expanded="${expanded}" aria-controls="collapseOne${index}">
                                ${(categoria.toUpperCase())}
                            </button>
                        </h2>
                        <div id="collapseOne${index}" class="accordion-collapse collapse ${show}"
                            aria-labelledby="headingOne${index}" data-bs-parent="#accordionExample">
                            <div class="accordion-body" style="padding: 10px;">
                                <!-- <p class="text-danger text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, officia</p> -->
                                ${tabelaUI}
                            </div>
                        </div>
                    </div>
                `
$("#accordionExample").html("");$("#accordionExample").append(AcordionUI)})}})}
slide(){var sli=new debliwuislideimg($,['<img src="assets/img-menu.svg" style="border-radius:5px;">','<img src="assets/pub2.png" style="border-radius:5px;">'],1,!0,1200,4000);$(".slide").prepend(sli)}
login(){var esse=this;var id=$("#telefone").val();var pin=$("#pin").val();if(id.length<9||pin.length<6){esse.notificacao.sms("Preencha os dados corretamente",1);return}
esse.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/entrar","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":id,"pin":pin}),};$.ajax(settings).done(function(res){if(res.ok){localStorage.setItem("sessao",Date.now());esse.db.setToken(res.token);esse.home();esse.db.verificaToken();esse.notificacao.sms("É feta, é fácil")}else{esse.notificacao.sms(res.payload,1)}}).always(function(a){esse.loader.fechar()})}
reLogin(){var esse=this;var id=localStorage.getItem("telefone");var pin=ESCOPO.pin;if(id.length<9||pin.length<6){esse.notificacao.sms("Preencha os dados corretamente",1);return}
esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/auth/entrar","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":id,"pin":pin}),};$.ajax(settings).done(function(res){if(res.ok){pin='';localStorage.setItem("sessao",Date.now());esse.db.setToken(res.token);esse.home();esse.db.verificaToken();esse.notificacao.sms("É feta, é fácil")}else{esse.notificacao.sms(res.payload,1);pin=''}}).always(function(a){esse.loader.fechar()})}
home(){var esse=this;var settings={"url":(this.apiUrl)+"/perfil/init","method":"GET","timeout":0,"headers":{"token":esse.db.getToken()},};$.ajax(settings).done(function(res){if(res.ok){console.log(res.payload);var sessao=res.payload.bloqueio;if(sessao=="mins1"){localStorage.setItem("sessaolimite",60)}
if(sessao=="mins5"){localStorage.setItem("sessaolimite",300)}
if(sessao=="segs30"){localStorage.setItem("sessaolimite",30)}
localStorage.setItem("tipo",res.payload.tipo);localStorage.setItem("nome",res.payload.nome);localStorage.setItem("balanco",res.payload.balanco);localStorage.setItem("telefone",res.payload.telefone);localStorage.setItem("transacoes",JSON.stringify(res.payload.transacoes.payload))}else{}}).always(function(a){})}
pedirNumeroCliente(){this.loader.abrir();var esse=this;var settings={"url":(this.apiUrl)+"/pedecodigolevantamento","method":"POST","timeout":0,"headers":{"token":esse.db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"acao":ESCOPO.acao}),};$.ajax(settings).done(function(res){if(res.ok){esse.notificacao.sms("Código de confirmação enviado com sucesso");ESCOPO.modalConfirmarFinal=new bootstrap.Modal(document.getElementById('confirmar-sms'));ESCOPO.modalConfirmarFinal.toggle()}else{esse.notificacao.sms(res.payload,1)}}).always(function(a){esse.loader.fechar()})}
pedirNumero(){this.loader.abrir();var esse=this;var settings={"url":(this.apiUrl)+"/pedecodigo","method":"POST","timeout":0,"headers":{"token":esse.db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"acao":ESCOPO.acao}),};$.ajax(settings).done(function(res){if(res.ok){esse.notificacao.sms("Código de confirmação enviado com sucesso");ESCOPO.modalConfirmarFinal=new bootstrap.Modal(document.getElementById('confirmar-sms'));ESCOPO.modalConfirmarFinal.toggle()}else{esse.notificacao.sms(res.payload,1)}}).always(function(a){esse.loader.fechar()})}
pedirPin(){this.loader.abrir();setTimeout(()=>{ESCOPO.modalConfirmarFinal=new bootstrap.Modal(document.getElementById('confirmar-pin'));ESCOPO.modalConfirmarFinal.toggle();this.loader.fechar()},1000)}
pedirNumeroOuPin(){document.querySelectorAll(".modal-backdrop").forEach(function(i){$(i).hide()});document.querySelectorAll(".modal").forEach(function(i){$(i).hide()});if(ESCOPO.confirmarFinal=="pin"){this.pedirPin()}else if(ESCOPO.confirmarFinal=="codigo"){this.pedirNumero()}else if(ESCOPO.confirmarFinal=="codigoCliente"){this.pedirNumeroCliente()}}
pedirNumeroNovo(){this.loader.abrir();var esse=this;var settings={"url":(this.apiUrl)+"/pedecodigo","method":"POST","timeout":0,"headers":{"token":esse.db.getToken(),"Content-Type":"application/json"},"data":JSON.stringify({"acao":ESCOPO.acao}),};$.ajax(settings).done(function(res){if(res.ok){esse.notificacao.sms("Código de confirmação enviado com sucesso",1)}else{esse.notificacao.sms(res.payload,1)}}).always(function(a){esse.loader.fechar()})}
confirmarNumero(){this.loader.abrir();var codigo=$("#codigo-confirmacao").val();if(codigo.length<6){this.notificacao.sms("Verifica o código de confirmação",1)}else{ESCOPO.codigo=codigo;ESCOPO.callback(ESCOPO.parametro)}}
confirmarPin(){updatePinDisplay();ESCOPO.callback(ESCOPO.parametro)}
pegaDadosScan(){var BI=JSON.parse(localStorage.getItem("dados_bi"));$("#nome").val(BI.nome);$("#filiacao").val(BI.filiacao);$("#morada").val(BI.morada);$("#naturalde").val(BI.natural);$("#nascimento").val(BI.nascimento);$("#provincia").val(BI.provincia);$("#nascimento").val(BI.nascimento);$("#bi").val(BI.bi);$("#sexo").val(BI.sexo);$("#altura").val(BI.altura);$("#estadocivil").val(BI.esta_civil)}
scanBilhete(){var esse=this;esse.loader.abrir();var frente=document.querySelector((localStorage.getItem("bifrente")));var tras=document.querySelector((localStorage.getItem("bitras")));var form=new FormData();form.append("bifrente",frente.files[0],frente.value);form.append("bitras",tras.files[0],tras.value);var settings={"url":(this.apiUrl)+"/scan","method":"POST","timeout":0,"headers":{"token":(this.db.getToken()),},"processData":!1,"mimeType":"multipart/form-data","contentType":!1,"data":form};$.ajax(settings).done(function(response){var obj=JSON.parse(response);if(obj.ok){console.log(obj.payload);localStorage.setItem("foto_bi",obj.payload.foto_bi);localStorage.setItem("dados_bi",JSON.stringify(obj.payload));vaiTela("/dadosscan")}else{esse.notificacao.sms("Erro, algo inexperado aconteceu",1)}}).always(function(a){esse.loader.fechar()});console.log(frente.value,tras.files[0])}
criarConta_dois(){var ocupacao=$("#ocupacao").val();var telefone=$("#telefone").val();localStorage.setItem("ocupacao",ocupacao);localStorage.setItem("telefone",telefone);if(telefone.length!=9){this.notificacao.sms("Preencha os dados corretamente",1);return}
ESCOPO.dadosOperacao={ocupacao:ocupacao,id:telefone};vaiTela("/scan")}
criarConta_dois_emp(){var ocupacao=localStorage.getItem("ocupacao");var telefone=localStorage.getItem("telefone");var foto_bi=localStorage.getItem("foto_bi");var nome=$("#nome").val();var filiacao=$("#filiacao").val();var morada=$("#morada").val();var naturalde=$("#naturalde").val();var nascimento=$("#nascimento").val();var provincia=$("#provincia").val();var bi=$("#bi").val();var sexo=$("#sexo").val();var altura=$("#altura").val();var estadocivil=$("#estadocivil").val();if(nome.length<5||filiacao.length<5||morada.length<5||naturalde.length<5||nascimento.length<5||provincia.length<5||bi.length<5||sexo.length<5||estadocivil.length<5){this.notificacao.sms("Preencha os dados corretamente",1);return}
ESCOPO.dadosOperacao={foto_bi:foto_bi,ocupacao:ocupacao,id:telefone,bi:bi,nome:nome,filiacao:filiacao,morada:morada,natural_de:naturalde,nascimento:nascimento,provincia:provincia,genero:sexo,altura:altura,estado_civil:estadocivil};this.verificaExistencia()}
verificaExistencia(){var esse=this;esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/auth/verificaexistencia","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({id:ESCOPO.dadosOperacao.id,bi:ESCOPO.dadosOperacao.bi}),};$.ajax(settings).done(function(response){console.log(response);if(!response.ok){esse.notificacao.sms("Código de confirmação enviado com sucesso",1);vaiTela("/inicioconfirmar")}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
confirmarTelefone(){var esse=this;esse.loader.abrir();var settings={"url":(esse.apiUrl)+"/auth/verificatelefone","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({id:ESCOPO.dadosOperacao.id,codigo:$("#codigo").val()})};$.ajax(settings).done(function(response){console.log(response);if(response.ok){esse.notificacao.sms(response.payload,1);vaiTela("/criarpin")}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
cadastrar(){var pin_novo=$("#pin").val();var pin_novo_confirmar=$("#pin_confirmar").val();if(pin_novo.length!=6){this.notificacao.sms("Verifica o PIN, deve ter 6 digitos",1);return}
if(pin_novo!=pin_novo_confirmar){this.notificacao.sms("Verifica o PIN, as combinações devem ser iguais",1);return}
ESCOPO.dadosOperacao.pin=pin_novo;var esse=this;esse.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/cadastrar","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){console.log(response);if(response.ok){localStorage.setItem("sessao",Date.now());esse.db.setToken(response.token);esse.home();esse.db.verificaToken();esse.notificacao.sms("É feta, é fácil")}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class LevantarReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}}
modalConfirmar(){ESCOPO.modalConfirmar=new bootstrap.Modal(document.getElementById('confirmar-modal'))
ESCOPO.modalConfirmar.toggle()}
pegaDadosOperacao(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var notificacao=this.notificacao;ESCOPO.dadosOperacao={};var valor=$("#quanto").val();var de=$("#de").val();var tipo="levantamento";var onde="App";if(valor<1){notificacao.sms("Verifica o valor a levantar",1);return}
if(de.length<9){notificacao.sms("Verifique o número da conta a debitar",1);return}else{ESCOPO.dadosOperacao.para=de}
ESCOPO.dadosOperacao.valor=valor;ESCOPO.dadosOperacao.tipo=tipo;ESCOPO.dadosOperacao.onde=onde;ESCOPO.dadosOperacao.descricao="Levantamento de numerario";ESCOPO.acao=`Levantamento de ${(ESCOPO.dadosOperacao.para)} \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;var tipoo=``;$("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            <p>De:  ${ESCOPO.dadosOperacao.para}</p> 
            ${tipoo}
            <p>Descrição: Levantamento</p>
            `)
this.modalConfirmar();ESCOPO.confirmarFinal="codigoCliente";ESCOPO.callback=this.novoEnvio;ESCOPO.parametro=this}
novoEnvio(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/transacao/levantar","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};esse.loader.abrir();$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class LevantarSemCartaoReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
init(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}}
modalConfirmar(){ESCOPO.modalConfirmar=new bootstrap.Modal(document.getElementById('confirmar-modal'))
ESCOPO.modalConfirmar.toggle()}
modalConcluirLevantamento(){ESCOPO.modalConcluirLevantamento=new bootstrap.Modal(document.getElementById('concluir-levantamento'));ESCOPO.modalConcluirLevantamento.toggle()}
pegaDadosOperacao(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var notificacao=this.notificacao;ESCOPO.dadosOperacao={};var valor=$("#quanto").val();var codigo=$("#codigo").val();var tipo="levantamento";var onde="App";if(valor<1){notificacao.sms("Verifica o valor a levantar",1);return}
if(codigo.length<3){notificacao.sms("Verifique o código",1);return}else{ESCOPO.dadosOperacao.codigo=codigo}
ESCOPO.dadosOperacao.valor=valor;ESCOPO.dadosOperacao.tipo=tipo;ESCOPO.dadosOperacao.onde=onde;ESCOPO.dadosOperacao.descricao="Levantamento sem cartão";ESCOPO.acao=`Levantamento sem cartão \nde ${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}.`;var tipoo=``;$("#detalhes-transacao").html(`
            <p>Quanto:  <b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))}</b></p>
            <p>Onde:  ${(ESCOPO.dadosOperacao.onde)}</p>
            ${tipoo}
            <p>Descrição: Levantamento sem cartão</p>
            `)
this.modalConfirmar();if(valor>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
ESCOPO.callback=this.novoEnvio;ESCOPO.parametro=this}
novoEnvio(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/semcartao/levantar","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};esse.loader.abrir();$.ajax(settings).done(function(response){if(response.ok){ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();esse.modalConcluirLevantamento();var html=$(`<div class="detalhes-info"><b>${(MONEY(ESCOPO.dadosOperacao.valor, 2, ".", " "))} Kz</b> <br><span>VALOR</span><br><br>${(response.payload)}<br><span>CÓDIGO COMPLETO</span><br><br>23h59m<br><span>VALIDADE</span><br><br><br><p>Com os dados do pedido poderá efectuar o<br>levantamento no ATM mais próximo de si!</p><input type="text" id="minha-referencia" value="${(response.payload)}" style="display:none;"></div>`);console.log(html);$("#detalhes-levantamento").append(html);$("#codigo-confirmacao").val("");esse.notificacao.sms("Levantamento sem cartão realizado com sucesso",0);esse.loader.fechar()}else{ESCOPO.modalConfirmar.hide();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}
copiarParaClipboard(elemento="minha-referencia"){var copyText=document.querySelector("#"+elemento);copyText.select();copyText.setSelectionRange(0,99999);navigator.clipboard.writeText(copyText.value);this.notificacao.sms("Referência copiada para a área de transferência",0)}
levantamentos(){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
$("#render-pendentes").html("");var loader=this.loader;var settings={"url":(this.apiUrl)+"/semcartao/init","method":"GET","timeout":0,"headers":{"token":db.getToken()}};(this.jquery).ajax(settings).done(function(dados){var itens=``;var obj=dados.payload;$("#qtd-pendentes").html(obj.length+" levantamentos");obj.forEach(element=>{var btn_confirmar="";var icon="";var fechar="";var cor="";var titulo="";var sinal="";var copiar="";if(element.executado=="1"||element.executado==1){icon="assets/enviar-icon.svg";fechar="assets/fechar-enviar-icon.svg";cor="#000";titulo="USADO";sinal="-"}else{icon="assets/receber-icon.svg";fechar="assets/fechar-receber-icon.svg";cor="#000";titulo="ATIVO";sinal="";copiar=`<img src="assets/btn/copiar.svg" style="width: 60px;display: block;margin: 10px auto;" class=" hvr-bounce-out" onclick='LevantarSemCartaoRequests.copiarParaClipboard("ref${(element.identificador)}")'><br>`;btn_confirmar=`<button type="button"
                                    class="btn btn-secondary form-control btn-danger"
                                     onclick='LevantarSemCartaoRequests.cancelarOperacao("${(element.identificador)}", "${(element.total)}", "${(titulo)}")'>Cancelar Operação</button>`}
itens+=`<div class="pendente" data-bs-toggle="modal" data-bs-target="#modalpendentes${(element.identificador)}" style="background:${cor}15">
                    <p class="acao" style="color:${cor}">${titulo}</p>
                    <p class="valor">${(MONEY(element.total, 2, ".", " "))}</p>
                    <p class="data">${(element.quando)}</p>
                    <img src="${icon}">
                </div>

                <!-- Modal -->
                <div class="modal fade" id="modalpendentes${(element.identificador)}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content"
                            style="width: 300px;margin:auto;margin-top: 100px;">
                            <div class="modal-header"
                                style="border-bottom: 1px solid ${cor};">
                                <h5 class="modal-title"
                                    style="text-align: center;font-size: 15px;color: ${cor};">${titulo}</h5>
                                <button type="button" class="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                
                            </div>
                            <div class="modal-body">
                                <p class="pendente-valor" style="color:${cor}">${sinal} ${(MONEY(element.total, 2, ".", " "))}</p>
                                <div class="detalhes-transacao">

                                    <p style="text-align: center">${(element.quando)}</p>

                                </div>
                                <br>
                                <div class="id-transacao">
                                    <p>Referência</p>
                                    <p><b>${(element.referencia)}</b></p>
                                    <input type="text" id="ref${(element.identificador)}" value="${(element.referencia)}" style="display:none;">
                                    ${copiar}
                                </div>

                            </div>
                            <div class="modal-footer" style="border: none;">
                            ${btn_confirmar}
                            </div>
                        </div>
                    </div>
                </div>`});$("#render-pendentes").append(itens)}).always(function(){loader.fechar()})}
cancelarOperacao(id,valor,tipo){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
ESCOPO.dadosOperacao={identificador:id};ESCOPO.acao=`Cancelar levantamento sem cartão de ${valor}.`;ESCOPO.callback=this.cancelar;ESCOPO.parametro=this;if(Number(valor)>99999){ESCOPO.confirmarFinal="codigo"}else{ESCOPO.confirmarFinal="pin"}
InicioRequests.pedirNumeroOuPin()}
cancelar(esse){var ver=db.verificaSessao();if(ver){db.verificaToken();return}
esse.loader.abrir();var headers={"token":db.getToken(),"codigo":ESCOPO.codigo,"Content-Type":"application/json"}
if(ESCOPO.confirmarFinal=="pin"){headers={"token":db.getToken(),"pin":ESCOPO.pin,"Content-Type":"application/json"}}
var settings={"url":(esse.apiUrl)+"/semcartao/cancelar","method":"POST","timeout":0,"headers":headers,"data":JSON.stringify(ESCOPO.dadosOperacao),};$.ajax(settings).done(function(response){if(response.ok){InicioRequests.home();ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,0);setTimeout(function(){vaiTela("\home")},1000)}else{ESCOPO.modalConfirmarFinal.hide();$("#codigo-confirmacao").val("");esse.notificacao.sms(response.payload,1);esse.loader.fechar()}})}};class PagamentosReq{servicos={Recargas:["Unitel","Africel","Movicel","NetOne"],TV:["DSTV","ZAP","ZAP Fibra"],Estado:["ENDE","EPAL"],Outros:["Empresa X","Facebook","SimpleComerce"],}
entidades={Unitel:{Produtos:[{id:"SALDO_VOZ",label:"SALDO VOZ"},{id:"NET_ATE_15_GB",label:"NET ATÉ 15 GB"},{id:"SALDO_NET_CASA_4G",label:"SALDO NET CASA 4G"},{id:"PLANO_MAIS_30_DIAS",label:"PLANO MAIS 30 DIAS"},{id:"PLANO_MAIS_VOZ",label:"PLANO MAIS VOZ"},{id:"PLANO_MAIS_DADOS",label:"PLANO MAIS DADOS"},{id:"REDES_SOCIAIS_PLUS",label:"REDES SOCIAIS PLUS"},{id:"NET_ACIMA_15_GB",label:"NET ACIMA 15 GB"}],OpcaoProduto:{SALDO_VOZ:[],NET_ATE_15_GB:[3]},Precos:{SALDO_VOZ:[{preco:200,label:"200,00 kz VALOR EM KWANZAS"},{preco:500,label:"500,00 kz VALOR EM KWANZAS "},{preco:1000,label:"1.000,00 kz VALOR EM KWANZAS"},{preco:1500,label:"1.500,00 kz VALOR EM KWANZAS"},{preco:2000,label:"2.000,00 kz VALOR EM KWANZAS"},{preco:3000,label:"3.000,00 kz VALOR EM KWANZAS"},{preco:5000,label:"5.000,00 kz VALOR EM KWANZAS"},{preco:10000,label:"10.000,00 kz VALOR EM KWANZAS"}],NET_ATE_15_GB:[{preco:300,label:"300,00 KZ NET DIA 1GB 1D"},{preco:500,label:"500,00 KZ NET 1.5GB 3 DIAS"},{preco:1000,label:"1.000,00 KZ BIG 3 GB 7 DIAS"},{preco:1500,label:"1.500,00 KZ  1.5GB 31 DIAS"},{preco:2000,label:"2000,00 KZ  2 GB 31 DIAS"},{preco:3000,label:"3.000,00 KZ  3.5GB 31 DIAS"},{preco:5000,label:"5.000,00 KZ  6 GB 31 DIAS"},{preco:10000,label:"10.000,00 KZ  12 GB 31 DIAS"}],SALDO_NET_CASA_4G:[{preco:7000,label:"7.000,00 Kz ILIM 10Mbps 7 DIAS"},{preco:11990,label:"11.990,00 Kz ILIM 5Mbps 31 DIAS"},{preco:12000,label:"12.000,00 Kz 15 GB 31 DIAS"},{preco:14000,label:"14.000,00 Kz ILIM 20Mbps 7 DIAS"},{preco:23990,label:"23.990,00 Kz ILIM 10Mbps 31 DIAS"},{preco:24000,label:"24.000,00 Kz 35 GB 31 DIAS"},{preco:32000,label:"32.000,00 Kz 50 GB 31 DIAS"},{preco:48000,label:"48.000,00 Kz ILIM 20Mbps 31 DIAS"}],PLANO_MAIS_30_DIAS:[{preco:2000,label:"2.000,00 Kz 70MIN+60SMS+500MB"},{preco:20000,label:"20.000,00 Kz 200MIN/SMS + 10GB"},{preco:25000,label:"25.000,00 Kz 2000MIN/SMS + 25GB"},{preco:40000,label:"40.000,00 Kz 3000MIN/SMS + 50GB"}],PLANO_MAIS_VOZ:[{preco:300,label:"300,00 Kz 70MIN + 70SMS 3D"},{preco:650,label:"650,00 Kz 150MIN + 150SMS 3D"}],PLANO_MAIS_DADOS:[{preco:300,label:"300,00 Kz 40MIN40SMS400MB 3D"},{preco:650,label:"650,00 Kz 80MIN+80SMS+1G 3D"},{preco:1000,label:"1.000,00 Kz 120MIN/SMS 2G 7D"},{preco:2000,label:"2.000,00 Kz 240MIN/SMS 4G 7D"},{preco:5000,label:"5.000,00 Kz 600MIN/SMS 10GB 7D"},{preco:10000,label:"10.000,00 Kz 1500MIN/SMS 20G 7D"}],REDES_SOCIAIS_PLUS:[{preco:200,label:"200,00 Kz 600 MB 3 DIAS"},{preco:500,label:"500,00 Kz 1,5 GB 7 DIAS"},{preco:1000,label:"1.000,00 Kz 3 GB 30 DIAS"}],NET_ACIMA_15_GB:[{preco:25000,label:"25.000,00 Kz 30 GB"},{preco:35000,label:"35.000,00 Kz 50 GB"},{preco:70000,label:"70.000,00 Kz 100 GB"},{preco:130000,label:"130.000,00 Kz 200 GB"}]}}}
constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
vaiServico(servico){this.servicos[servico].forEach(element=>{});localStorage.setItem("servico",servico);vaiTela("servico")}
verServico(){var servico=localStorage.getItem("servico");var res=``;this.servicos[servico].forEach(element=>{res+=`<div class="btn-flexa hvr-bounce-out" onclick='PagamentosRequests.vaiEntidade("${element}")'>
                    <span class="label-btn"> ${element} </span>
                    <img src="assets/flexa.svg" class="icon-btn-flexa">
                </div>`});this.jquery(".render-aqui").html(res);this.jquery(".titulo h1").html(servico)}
vaiEntidade(entidade){localStorage.setItem("entidade",entidade);vaiTela("entidade")}
renderPrecos(esse,entidade,ProdutoInicialId,select){var resPrecos=[];esse.entidades[entidade].Precos[ProdutoInicialId].forEach(element=>{resPrecos.push({text:(element.label),value:(element.preco)})});select.setData(resPrecos)}
verEntidade(){var valorSelect=new SlimSelect({select:'#valor',settings:{showSearch:!1}})
var esse=this;var entidade=localStorage.getItem("entidade");var ProdutoInicialId=this.entidades[entidade].Produtos[0].id;var resProdutos=``;this.entidades[entidade].Produtos.forEach(element=>{resProdutos+=`<option value="${(element.id)}">${(element.label)}</option>`});this.jquery("#produto").append(resProdutos);esse.renderPrecos(esse,entidade,ProdutoInicialId,valorSelect);this.jquery(".titulo h1").html(entidade);this.jquery("#produto").change(function(){esse.renderPrecos(esse,entidade,this.value,valorSelect)})
new SlimSelect({select:'#produto',settings:{showSearch:!1}})}
modalConfirmar(){var myModal=new bootstrap.Modal(document.getElementById('confirmar-modal'))
myModal.toggle()}
modalConfirmarSMS(){var myModal=new bootstrap.Modal(document.getElementById('confirmar-sms'))
myModal.toggle()}
pegaDadosOperacao(){var notificacao=this.notificacao;var dadosOperacao={};var telefone=$("#telefone").val();var produto=$("#produto").val();var produtoLabel=$('[value="'+produto+'"]').html();var valor=$("#valor").val();var valorLabel=$('[value="'+valor+'"]').html();if(telefone<9){notificacao.sms("Verifica o número do telefone",1);return}else{var MOCK={saldo:"15000"}
if((MOCK.saldo-1)>=valor){dadosOperacao.valor=valor}else{notificacao.sms("Não tem saldo suficiente",1);return}}
dadosOperacao.telefone=telefone;dadosOperacao.produto=produto;dadosOperacao.produtoLabel=produtoLabel;dadosOperacao.valor=valor;dadosOperacao.valorLabel=valorLabel;$("#detalhes-transacao").html(`
            <p>Produto:  <b>${(dadosOperacao.produtoLabel)}</b></p>
            <p>Valor:  ${(dadosOperacao.valorLabel)}</p>
            <p>Telefone:  ${dadosOperacao.telefone}</p>
            `)
this.modalConfirmar();console.log(dadosOperacao)}};class PendentesReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
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
this.loader.abrir();var settings={"url":(this.apiUrl)+"/auth/novopin","method":"POST","timeout":0,"headers":{"Content-Type":"application/json"},"data":JSON.stringify({"id":localStorage.getItem("telefone"),"codigo":localStorage.getItem("codigo"),"pin":pin_novo})};$.ajax(settings).done(function(response){if(response.ok){localStorage.setItem("sessao",Date.now());esse.db.setToken(response.token);esse.home();esse.db.verificaToken()}else{esse.notificacao.sms(response.payload,1);esse.loader.fechar()}}).always(function(a){})}};class RecorrentesReq{constructor(jquery,apiUrl,loader,notificacao){this.jquery=jquery;this.apiUrl=apiUrl;this.loader=loader;this.notificacao=notificacao}
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