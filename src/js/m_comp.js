(function(){
var T=window.T,num=T.num,fmt=T.fmt,L10=Math.log10;

var SITES=[['tri','Tríceps'],['bic','Bíceps'],['sub','Subescapular'],['pei','Peitoral'],['axi','Axilar média'],['sup','Suprailíaca'],['abd','Abdominal'],['cox','Coxa'],['pan','Panturrilha medial']];
var SN={};SITES.forEach(function(s){SN[s[0]]=s[1];});
var TECH={
 tri:'Ponto médio entre o acrômio e o olécrano, face posterior do braço. Prega vertical.',
 bic:'Mesmo nível do tríceps, face anterior do braço. Prega vertical.',
 sub:'2 cm abaixo do ângulo inferior da escápula. Prega oblíqua, a 45°.',
 pei:'Homens: ponto médio entre a linha axilar anterior e o mamilo. Prega oblíqua.',
 axi:'Linha axilar média, na altura do apêndice xifoide. Prega vertical.',
 sup:'Logo acima da crista ilíaca, na linha axilar anterior. Prega oblíqua.',
 abd:'2 cm lateral à cicatriz umbilical. Prega vertical.',
 cox:'Ponto médio entre a prega inguinal e a borda superior da patela, face anterior. Prega vertical, com o peso no outro pé.',
 pan:'Face medial da perna, no ponto de maior circunferência. Prega vertical, com o joelho a 90°.'};

var DW={M:[[17,19,1.1620,0.0630],[20,29,1.1631,0.0632],[30,39,1.1422,0.0544],[40,49,1.1620,0.0700],[50,200,1.1715,0.0779]],
        F:[[17,19,1.1549,0.0678],[20,29,1.1599,0.0717],[30,39,1.1423,0.0632],[40,49,1.1333,0.0612],[50,200,1.1339,0.0645]]};
var siri=function(d){return 495/d-450;};

var EQ=[
 {id:'jp3',n:'Jackson e Pollock, 3 dobras',ref:'Jackson e Pollock (1978); Jackson, Pollock e Ward (1980)',age:[18,61],
  need:function(s){return s==='M'?['pei','abd','cox']:['tri','sup','cox'];},
  use:'Adultos de 18 a 61 anos, de eutróficos a obesidade grau I. Poucos pontos e boa reprodutibilidade.',
  calc:function(x){var a=x.age,d=x.d,S;if(x.sex==='M'){S=d.pei+d.abd+d.cox;return siri(1.10938-0.0008267*S+0.0000016*S*S-0.0002574*a);}S=d.tri+d.sup+d.cox;return siri(1.0994921-0.0009929*S+0.0000023*S*S-0.0001392*a);}},
 {id:'jp7',n:'Jackson e Pollock, 7 dobras',ref:'Jackson e Pollock (1978); Jackson, Pollock e Ward (1980)',age:[18,61],
  need:function(){return ['pei','axi','tri','sub','abd','sup','cox'];},
  use:'Atletas e pessoas ativas com muita massa muscular. A soma de 7 pontos reduz o erro de um ponto isolado.',
  calc:function(x){var a=x.age,d=x.d,S=d.pei+d.axi+d.tri+d.sub+d.abd+d.sup+d.cox;return x.sex==='M'?siri(1.112-0.00043499*S+0.00000055*S*S-0.00028826*a):siri(1.097-0.00046971*S+0.00000056*S*S-0.00012828*a);}},
 {id:'durnin',n:'Durnin e Womersley, 4 dobras',ref:'Durnin e Womersley (1974)',age:[17,72],
  need:function(){return ['bic','tri','sub','sup'];},
  use:'Faixa etária ampla, com coeficientes por década. Boa escolha a partir dos 50 anos.',
  calc:function(x){var t=DW[x.sex].filter(function(r){return x.age>=r[0]&&x.age<=r[1];})[0]||DW[x.sex][1],d=x.d,S=d.bic+d.tri+d.sub+d.sup;return siri(t[2]-t[3]*L10(S));}},
 {id:'guedes',n:'Guedes, 3 dobras',ref:'Guedes (1985)',age:[18,30],
  need:function(s){return s==='M'?['tri','sup','abd']:['sub','sup','cox'];},
  use:'Adultos jovens brasileiros de 18 a 30 anos, sem obesidade importante.',
  calc:function(x){var d=x.d;return x.sex==='M'?siri(1.17136-0.06706*L10(d.tri+d.sup+d.abd)):siri(1.16650-0.07063*L10(d.sub+d.cox+d.sup));}},
 {id:'faulkner',n:'Faulkner, 4 dobras',ref:'Faulkner (1968)',age:[18,60],
  need:function(){return ['tri','sub','sup','abd'];},
  use:'Estimativa rápida do percentual de gordura, muito usada em atletas. Não passa pela densidade corporal.',
  calc:function(x){var d=x.d;return 0.153*(d.tri+d.sub+d.sup+d.abd)+5.783;}},
 {id:'marinha',n:'Circunferências (método da Marinha dos EUA)',ref:'Hodgdon e Beckett (1984)',age:[18,70],cm:true,
  need:function(){return [];},
  use:'Obesidade grau II ou III (IMC de 35 ou mais), quando a dobra não pode ser pinçada com segurança.',
  calc:function(x){var c=x.cm,h=x.alt;if(!(h>0))return null;/* versão métrica (cm), via densidade corporal e Siri */if(x.sex==='M'){var a=c.cint-c.pesc;return a>0?siri(1.0324-0.19077*L10(a)+0.15456*L10(h)):null;}var b=c.cint+c.quad-c.pesc;return b>0?siri(1.29579-0.35004*L10(b)+0.221*L10(h)):null;}}
];
var EQM={};EQ.forEach(function(e){EQM[e.id]=e;});
T.EQ=EQM;

var med=function(a){var v=Object.keys(a||{}).map(function(k){return num(a[k]);}).filter(function(x){return x>0;}).sort(function(p,q){return p-q;});if(!v.length)return 0;var m=v.length>>1;return v.length%2?v[m]:(v[m-1]+v[m])/2;};
var cls=function(sex,g){var t=sex==='M'?[6,14,18,25]:[14,21,25,32],n=['Gordura essencial','Atlético','Fitness','Aceitável','Acima do aceitável'];for(var i=0;i<4;i++)if(g<t[i])return {t:n[i],k:i<=2?'ok':i===3?'warn':'bad'};return {t:n[4],k:'bad'};};

T.compCalc=function(id,ctx){var e=EQM[id];if(!e)return null;var miss=[],d={};
 if(e.cm){var c=ctx.cm||{};if(!(num(c.cint)>0&&num(c.pesc)>0&&(ctx.sex==='M'||num(c.quad)>0)))return {miss:['circunferências']};
  var g0=e.calc({sex:ctx.sex,alt:num(ctx.alt),cm:{cint:num(c.cint),pesc:num(c.pesc),quad:num(c.quad)}});return g0==null||!isFinite(g0)?{miss:['valores válidos']}:{g:Math.min(60,Math.max(3,g0)),miss:[]};}
 e.need(ctx.sex).forEach(function(s){var v=num((ctx.dc||{})[s]);if(v>0)d[s]=v;else miss.push(SN[s]);});
 if(miss.length)return {miss:miss};
 var g=e.calc({sex:ctx.sex,age:num(ctx.age),d:d});return g==null||!isFinite(g)?{miss:['valores válidos']}:{g:Math.min(60,Math.max(3,g)),miss:[]};};

T.compRec=function(sex,age,imc,perfil){var r,alt,why=[];
 if(imc>=35){r='marinha';alt=['jp3','durnin'];why.push('IMC de '+fmt(imc,1)+' (35 ou mais): com muito tecido adiposo a prega fica espessa e difícil de pinçar, e a equação perde precisão. Prefira circunferências e confirme por bioimpedância ou DEXA.');}
 else if(age>=60){r='durnin';alt=['jp3','marinha'];why.push('Idoso: o Durnin e Womersley tem coeficientes próprios para 50 anos ou mais e vai até 72 anos. Acompanhe a massa magra e a força de preensão manual, por causa do risco de sarcopenia.');}
 else if(perfil==='atleta'){r='jp7';alt=['faulkner','jp3'];why.push('Perfil atlético ou com muita massa muscular: a soma de 7 dobras dilui o erro de pontos isolados. O IMC superestima a gordura nesse perfil, por isso a dobra é mais útil que o peso.');}
 else if(age>=50){r='durnin';alt=['jp3','marinha'];why.push('Acima de 50 anos: o Durnin e Womersley tem coeficientes específicos para essa faixa.');}
 else if(age<=30&&imc<30&&perfil!=='ativo'){r='guedes';alt=['jp3','durnin'];why.push('Adulto jovem brasileiro e sem obesidade importante: a equação de Guedes foi desenvolvida para essa população.');}
 else{r='jp3';alt=['durnin','jp7'];why.push('Adulto de 18 a 61 anos, com IMC abaixo de 35: Jackson e Pollock com 3 dobras é prático, validado e reprodutível. Use Durnin e Womersley como segunda leitura.');}
 return {r:r,alt:alt,why:why};};

/* Casos clínicos. d = dobras (mm); cm = circunferências (cm) */
T.CASES=[
 {id:'c1',nome:'Marina, 38 anos',tag:'Obesidade grau I, sedentária',sex:'F',idade:38,peso:87.2,alt:164,perfil:'sedentario',dose:'10',sem:12,
  d:{tri:28,bic:14,sub:30,pei:18,axi:22,sup:32,abd:38,cox:40,pan:24},cm:{pesc:33,cint:98,quad:112},
  hist:'Tirzepatida 10 mg há 12 semanas. Perdeu 6,8 kg. Referência de ingestão proteica baixa (cerca de 60 g/dia).',
  eq:'Jackson e Pollock de 3 dobras (tríceps, suprailíaca e coxa). IMC abaixo de 35 e adulta de meia-idade. Durnin e Womersley serve como conferência.',
  conduta:'Se o percentual de gordura caiu pouco em relação ao peso, parte da perda é massa magra. Subir a proteína para 1,4 a 1,6 g/kg e iniciar treino de força 2 a 3 vezes por semana.'},
 {id:'c2',nome:'Roberto, 45 anos',tag:'Obesidade grau II, pré-diabetes',sex:'M',idade:45,peso:118,alt:176,perfil:'sedentario',dose:'5',sem:4,
  d:{tri:24,bic:14,sub:36,pei:30,axi:30,sup:40,abd:50,cox:38,pan:24},cm:{pesc:44,cint:124,quad:112},
  hist:'IMC de 38. Hipertenso e com pré-diabetes. Início recente da tirzepatida.',
  eq:'Método da Marinha (circunferências). Com IMC de 35 ou mais, o adipômetro perde precisão e a prega abdominal é difícil de pinçar.',
  conduta:'Registrar cintura e RCEst a cada consulta. Pedir bioimpedância ou DEXA para a linha de base e repetir a cada 12 semanas. Meta inicial de perda de 5 a 10%.'},
 {id:'c3',nome:'Helena, 62 anos',tag:'Pós-menopausa, risco de sarcopenia',sex:'F',idade:62,peso:68,alt:156,perfil:'sedentario',dose:'7.5',sem:8,
  d:{tri:24,bic:12,sub:22,pei:14,axi:16,sup:26,abd:30,cox:32,pan:18},cm:{pesc:32,cint:92,quad:104},
  hist:'IMC de 27,9 com diabetes tipo 2 e osteopenia. Em uso de tirzepatida há 8 semanas, com redução do apetite e da ingestão de proteína.',
  eq:'Durnin e Womersley (50 anos ou mais). O Jackson e Pollock fica fora da faixa de validação acima de 61 anos.',
  conduta:'Priorizar massa magra: 1,5 g/kg de proteína, distribuída em 4 refeições, vitamina D, cálcio e treino de força supervisionado. Medir força de preensão manual.'},
 {id:'c4',nome:'Lucas, 29 anos',tag:'Musculação, IMC de 27',sex:'M',idade:29,peso:86,alt:178,perfil:'atleta',dose:'0',sem:1,
  d:{tri:8,bic:5,sub:12,pei:8,axi:9,sup:11,abd:14,cox:12,pan:7},cm:{pesc:39,cint:84,quad:98},
  hist:'IMC de 27,1 por massa muscular, sem excesso de gordura. Procura emagrecimento rápido sem indicação clínica de medicamento.',
  eq:'Jackson e Pollock de 7 dobras. A soma de vários pontos reduz o erro em quem treina e tem pregas finas.',
  conduta:'O percentual de gordura mostra que não há indicação de déficit agressivo. Registrar o resultado como exemplo de que o IMC engana em perfil muscular e discutir indicação com o prescritor.'},
 {id:'c5',nome:'Camila, 24 anos',tag:'Eutrófica com gordura corporal alta',sex:'F',idade:24,peso:58,alt:165,perfil:'sedentario',dose:'0',sem:1,
  d:{tri:22,bic:12,sub:18,pei:12,axi:14,sup:20,abd:26,cox:34,pan:20},cm:{pesc:31,cint:74,quad:98},
  hist:'IMC de 21,3, mas sedentária e com pouca massa magra. Dietas restritivas repetidas.',
  eq:'Guedes (adulta jovem brasileira, sem obesidade importante). Jackson e Pollock de 3 dobras como alternativa.',
  conduta:'O IMC normal esconde excesso de gordura relativo. O foco é ganhar massa magra, com proteína adequada e treino de força, sem déficit calórico.'},
 {id:'c6',nome:'Carlos, 52 anos',tag:'Obesidade grau I, pré-diabetes',sex:'M',idade:52,peso:98,alt:178,perfil:'ativo',dose:'2.5',sem:2,
  d:{tri:18,bic:10,sub:28,pei:20,axi:22,sup:30,abd:36,cox:26,pan:16},cm:{pesc:41,cint:106,quad:104},
  hist:'IMC de 30,9. Caminha 3 vezes por semana. Gordura abdominal elevada e glicemia no limite.',
  eq:'Durnin e Womersley, pela idade de 50 anos ou mais. O Jackson e Pollock de 3 dobras serve como comparação.',
  conduta:'Acompanhar a gordura visceral pela cintura e RCEst. Reavaliar as dobras a cada 8 a 12 semanas, sempre com o mesmo avaliador e o mesmo adipômetro.'}
];

T.acts.loadcase=function(b){var c=T.CASES[parseInt(b.dataset.v,10)],S=T.S;if(!c)return;
 S.p=Object.assign(S.p,{nome:c.nome,sexo:c.sex,idade:c.idade,peso:c.peso,altura:c.alt,dose:c.dose,semana:c.sem,pesoIni:c.peso,exemplo:true});
 S.dc={};SITES.forEach(function(s){var v=c.d[s[0]];S.dc[s[0]]=[v+1,v,v-1];});S.cm={pesc:c.cm.pesc,cint:c.cm.cint,quad:c.cm.quad};
 S.ui.perfil=c.perfil;S.ui.eqsel='auto';S.v=[];T.save();T.render();window.scrollTo(0,0);T.flash('Caso carregado no perfil');};
T.acts.applygc=function(b){var g=parseFloat(b.dataset.v);if(!isFinite(g))return;var S=T.S;S.p.gc=Math.round(g*10)/10;
 var v=S.v||[],ix=-1,best='';v.forEach(function(x,i){if(!best||(x.date||'')>=best){best=x.date||'';ix=i;}});if(ix>=0)S.v[ix].gc=S.p.gc;T.save();T.render();T.flash(ix>=0?'Percentual de gordura aplicado ao perfil e à última consulta':'Percentual de gordura aplicado ao perfil');};
T.acts.tec=function(){T.set('ui.tec',!T.S.ui.tec);};

var ctxOf=function(S){var dc={};SITES.forEach(function(s){dc[s[0]]=med(S.dc&&S.dc[s[0]]);});return {sex:S.p.sexo,age:num(S.p.idade),alt:num(S.p.altura),dc:dc,cm:S.cm||{}};};

T.reg({id:'comp',tab:'Composição corporal',title:'Avaliação da composição corporal',
desc:'Escolha a equação mais adequada ao perfil do paciente, registre as dobras cutâneas com três leituras por ponto e compare os resultados. Inclui casos clínicos.',
html:function(S){var p=S.p,sx=p.sexo,age=num(p.idade),imc=T.c.imc(p.peso,p.altura),perfil=S.ui.perfil||'sedentario',ctx=ctxOf(S),R=T.compRec(sx,age,imc,perfil),sel=(S.ui.eqsel&&S.ui.eqsel!=='auto')?S.ui.eqsel:R.r,peso=num(p.peso);
 var skin='<div class="tw"><table class="dt"><thead><tr><th>Ponto</th><th class="n">1ª</th><th class="n">2ª</th><th class="n">3ª</th><th class="n">Mediana</th></tr></thead><tbody>'+
  SITES.map(function(s){var k=s[0],m=med(S.dc&&S.dc[k]);return '<tr><td>'+s[1]+(S.ui.tec?'<div class="xs muted" style="max-width:260px;white-space:normal">'+TECH[k]+'</div>':'')+'</td>'+[0,1,2].map(function(i){return '<td style="padding:4px"><input id="i_dc_'+k+i+'" data-k="dc.'+k+'.'+i+'" data-t="n" type="number" inputmode="decimal" step="0.5" min="0" max="80" style="min-width:58px;text-align:right" value="'+((S.dc&&S.dc[k]&&S.dc[k][i])||'')+'"></td>';}).join('')+'<td class="n"><b>'+(m?fmt(m,1):'—')+'</b></td></tr>';}).join('')+'</tbody></table></div>';
 var left='<div class="panel stack"><h2>Dados da avaliação</h2><div class="fld"><span>Perfil do paciente</span>'+T.seg('ui.perfil',[['sedentario','Sedentário'],['ativo','Ativo'],['atleta','Atleta ou muita massa muscular']])+'</div>'+
  '<div class="row sp"><h3>Dobras cutâneas (mm)</h3><button class="btn sm" data-act="tec">'+(S.ui.tec?'Ocultar técnica':'Ver técnica de medida')+'</button></div>'+skin+
  '<p class="sm muted">Meça sempre no lado direito, em 3 rodadas. A mediana das leituras é usada no cálculo. Diferença maior que 5% entre leituras pede nova medida.</p>'+
  '<h3>Circunferências (cm)</h3><div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">'+T.in('cm.pesc',{l:'Pescoço'})+T.in('cm.cint',{l:'Cintura ou abdômen'})+T.in('cm.quad',{l:'Quadril'})+'</div></div>';
 var rec='<div class="panel"><div class="row sp" style="margin-bottom:8px"><h2>Equação recomendada</h2>'+T.pill('Para este paciente','ok')+'</div><p style="font-size:1.1rem;font-weight:650;font-family:var(--f-display)">'+EQM[R.r].n+'</p><p class="sm muted">'+EQM[R.r].ref+'</p><p style="margin-top:8px">'+R.why[0]+'</p><p class="sm muted" style="margin-top:8px">Alternativas: '+R.alt.map(function(a){return EQM[a].n;}).join('; ')+'.</p>'+
  (imc>=35||age>=60?'<div class="al warn" style="margin-top:10px">'+T.pill('Atenção','warn')+'<div>'+(imc>=35?'Em IMC de 35 ou mais, confirme a composição por bioimpedância ou DEXA.':'Em idosos, associe a avaliação à força de preensão manual e ao desempenho funcional.')+'</div></div>':'')+'</div>';
 var rows=EQ.map(function(e){var res=T.compCalc(e.id,ctx),out=!e.cm&&(age<e.age[0]||age>e.age[1]),st,ok=res&&res.g!=null;
  if(!ok)st=T.pill('Faltam '+res.miss.slice(0,2).join(', '),'info');else if(out)st=T.pill('Fora da faixa de idade','warn');else if(e.id===R.r)st=T.pill('Recomendada','ok');else if(R.alt.indexOf(e.id)>=0)st=T.pill('Alternativa','info');else st=T.pill('Disponível');
  var g=ok?res.g:null,c=ok?cls(sx,g):null;
  return '<tr'+(e.id===sel?' class="cur"':'')+'><td><button class="btn sm" data-set="ui.eqsel" data-v="'+e.id+'" aria-pressed="'+(e.id===sel)+'">'+(e.id===sel?'Selecionada':'Usar')+'</button></td><td><b>'+e.n+'</b><div class="xs muted" style="max-width:300px;white-space:normal">'+e.use+'</div></td><td class="n">'+(ok?fmt(g,1)+'%':'—')+'</td><td class="n">'+(ok?fmt(peso*g/100,1):'—')+'</td><td class="n">'+(ok?fmt(peso*(1-g/100),1):'—')+'</td><td>'+(ok?T.pill(c.t,c.k):'')+'</td><td>'+st+'</td></tr>';}).join('');
 var cmp='<div class="panel"><h2>Comparação entre equações</h2><div class="tw"><table class="dt"><thead><tr><th></th><th>Equação</th><th class="n">% gordura</th><th class="n">Gordura (kg)</th><th class="n">Massa magra (kg)</th><th>Classificação</th><th>Situação</th></tr></thead><tbody>'+rows+'</tbody></table></div><p class="sm muted" style="margin-top:8px">Diferenças de 3 a 4 pontos percentuais entre equações são comuns. Use sempre a mesma equação para acompanhar a evolução do mesmo paciente.</p></div>';
 var rs=T.compCalc(sel,ctx),res='';
 if(rs&&rs.g!=null){var g=rs.g,mg=peso*g/100,mm=peso-mg,h=num(p.altura)/100,c=cls(sx,g),imm=h>0?mm/(h*h):0,img=h>0?mg/(h*h):0;
  res='<div class="panel stack"><div class="row sp"><h2>Resultado com '+EQM[sel].n+'</h2>'+T.pill(c.t,c.k)+'</div><div class="kpis"><div class="kpi hi"><div class="l">Gordura corporal</div><div class="v">'+fmt(g,1)+'<small>%</small></div><div class="d">'+fmt(mg,1)+' kg</div></div><div class="kpi"><div class="l">Massa magra</div><div class="v">'+fmt(mm,1)+'<small>kg</small></div><div class="d">'+fmt(100-g,1)+'% do peso</div></div><div class="kpi"><div class="l">Índice de massa magra</div><div class="v">'+fmt(imm,1)+'<small>kg/m²</small></div><div class="d">Gordura: '+fmt(img,1)+' kg/m²</div></div><div class="kpi"><div class="l">IMC</div><div class="v">'+fmt(imc,1)+'<small>kg/m²</small></div><div class="d">Peso '+fmt(peso,1)+' kg</div></div></div>'+
  T.bar([[g,'var(--c-carb)'],[100-g,'var(--c-prot)']])+'<div class="leg"><span><b style="background:var(--c-carb)"></b>Gordura '+fmt(g,1)+'%</span><span><b style="background:var(--c-prot)"></b>Massa magra '+fmt(100-g,1)+'%</span></div>'+
  '<div class="row"><button class="btn pri" data-act="applygc" data-v="'+(Math.round(g*10)/10)+'">Aplicar '+fmt(g,1)+'% ao perfil e à última consulta</button></div><p class="sm muted">Ao aplicar, a gordura corporal alimenta a equação de Cunningham, os alertas de perda de massa magra e o painel.</p></div>';}
 else res='<div class="panel"><h2>Resultado</h2><p class="muted">Preencha as dobras ou circunferências exigidas pela equação selecionada ('+EQM[sel].n+'). '+(rs&&rs.miss.length?'Faltam: '+rs.miss.join(', ')+'.':'')+'</p></div>';
 var cint=num((S.cm||{}).cint),quad=num((S.cm||{}).quad),h2=num(p.altura),rcq=quad>0?cint/quad:0,rce=h2>0?cint/h2:0,M=sx==='M';
 var rk=cint?(cint>=(M?102:88)?['Muito aumentado','bad']:cint>=(M?94:80)?['Aumentado','warn']:['Adequado','ok']):null,rq=rcq?(rcq>=(M?0.90:0.85)?['Risco elevado','bad']:['Adequada','ok']):null,re=rce?(rce>=0.5?['Acima de 0,5','warn']:['Abaixo de 0,5','ok']):null;
 var ant='<div class="panel"><h2>Risco metabólico</h2><div class="kpis"><div class="kpi"><div class="l">Cintura</div><div class="v">'+(cint?fmt(cint,0):'—')+'<small>cm</small></div><div class="d">'+(rk?T.pill(rk[0],rk[1]):'Informe a cintura')+'</div></div><div class="kpi"><div class="l">Relação cintura-quadril</div><div class="v">'+(rcq?fmt(rcq,2):'—')+'</div><div class="d">'+(rq?T.pill(rq[0],rq[1]):'Informe cintura e quadril')+'</div></div><div class="kpi"><div class="l">Cintura / altura</div><div class="v">'+(rce?fmt(rce,2):'—')+'</div><div class="d">'+(re?T.pill(re[0],re[1]):'')+'</div></div></div></div>';
 var cases='<div class="sec"><h2>Casos clínicos</h2><p class="sub" style="margin-bottom:12px">Seis perfis para treinar a escolha da equação. Cada botão carrega o paciente, as dobras e as circunferências na avaliação acima. O resultado mostrado abaixo de cada caso usa a equação sugerida.</p><div class="cols">'+
  T.CASES.map(function(c,i){var rc=T.compRec(c.sex,c.idade,T.c.imc(c.peso,c.alt),c.perfil),dc={};for(var k in c.d)dc[k]=c.d[k];var r=T.compCalc(rc.r,{sex:c.sex,age:c.idade,alt:c.alt,dc:dc,cm:c.cm}),g=r&&r.g!=null?r.g:null;
   return '<div class="card"><div class="row sp"><h3>'+c.nome+'</h3>'+T.pill(c.tag,'info')+'</div><p class="sm muted">'+(c.sex==='F'?'Mulher':'Homem')+', '+c.idade+' anos · '+fmt(c.peso,1)+' kg · '+c.alt+' cm · IMC '+fmt(T.c.imc(c.peso,c.alt),1)+'</p><p class="sm">'+c.hist+'</p>'+
   '<div class="al ok">'+T.pill('Equação','ok')+'<div><b>'+EQM[rc.r].n+'.</b> '+c.eq+(g!=null?'<div class="mono" style="margin-top:4px">'+fmt(g,1)+'% de gordura · '+cls(c.sex,g).t+'</div>':'')+'</div></div>'+
   '<p class="sm"><b>Conduta:</b> '+c.conduta+'</p><div><button class="btn sm" data-act="loadcase" data-v="'+i+'">Carregar caso</button></div></div>';}).join('')+'</div></div>';
 return '<div class="grid2">'+left+'<div class="stack">'+rec+res+cmp+ant+'</div></div>'+cases;}});
})();
