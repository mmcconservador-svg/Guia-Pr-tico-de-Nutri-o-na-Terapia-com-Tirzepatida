(function(){
var T=window.T,num=T.num,fmt=T.fmt;
T.today=T.today||function(){var d=new Date(),z=function(n){return (n<10?'0':'')+n;};return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate());};
T.lastIdx=function(){var v=T.S.v||[],ix=-1,best='';v.forEach(function(x,i){if(ix<0||(x.date||'')>=best){best=x.date||'';ix=i;}});return ix;};
T.acts.sx0=function(){var S=T.S,p=S.p,id=1;(S.v||[]).forEach(function(x){id=Math.max(id,x.id+1);});
 var sx={};T.SX.forEach(function(x){sx[x[0]]=0;});
 S.v=(S.v||[]).concat([{id:id,date:T.today(),sem:num(p.semana),dose:String(p.dose),peso:num(p.peso),cc:'',gc:num(p.gc),prot:'',agua:'',ap:5,en:5,sx:sx,red:[],nota:''}]);T.save();T.render();};

/* ---------- Efeitos colaterais ---------- */
T.SECARDS=[
 {id:'nausea',sx:'nausea',n:'Náusea',why:'O esvaziamento gástrico fica mais lento e há ação no centro do apetite. Costuma piorar por 2 a 3 dias após o aumento da dose e com refeições grandes ou gordurosas.',
  fazer:['Refeições pequenas e frequentes, comendo devagar e parando ao se sentir satisfeito','Beber líquidos entre as refeições e não junto com elas','Preferir alimentos frios ou em temperatura ambiente, que têm menos cheiro','Chá ou bala de gengibre sem açúcar','Ficar sentado por 2 a 3 horas após comer'],
  pref:['Torradas e biscoito de água e sal','Arroz, batata e frango cozidos','Iogurte natural, gelatina, frutas geladas'],evitar:['Frituras e molhos gordurosos','Doces muito concentrados','Álcool e bebidas gaseificadas','Odores fortes durante o preparo'],
  alerta:'Vômitos repetidos ou incapacidade de manter líquidos por mais de 24 horas.'},
 {id:'vomito',sx:'vomito',n:'Vômito',why:'Surge quando a refeição excede a capacidade de esvaziamento do estômago, ou em picos de náusea. O risco principal é a desidratação e a perda de eletrólitos.',
  fazer:['Pausar os alimentos sólidos por 1 a 2 horas','Repor líquidos em goles de 30 a 60 mL a cada 10 a 15 minutos','Usar solução de reidratação oral ou água de coco','Retomar com texturas líquidas e pastosas e avançar aos poucos','Informar o prescritor antes de subir a dose'],
  pref:['Soro de reidratação oral','Caldos coados','Gelatina e picolé de fruta'],evitar:['Refeições volumosas','Frituras','Comer rápido ou deitar logo após comer'],
  alerta:'Mais de 3 episódios em 24 horas, sinais de desidratação (urina escura, tontura, boca seca) ou dor abdominal forte.'},
 {id:'constip',sx:'constip',n:'Constipação',why:'O trânsito intestinal fica mais lento, e a menor ingestão de água e fibras agrava o quadro. É um dos efeitos mais persistentes.',
  fazer:['Água: 2 a 2,5 L por dia, em goles','Aumentar fibras aos poucos, de 3 a 5 g por semana, até 25 a 30 g','Psyllium 5 g com 200 mL de água, 1 a 2 vezes por dia, se prescrito','Magnésio (citrato ou glicinato) à noite, se prescrito e sem doença renal','Caminhada leve diária e horário fixo para tentar evacuar'],
  pref:['Ameixa seca, mamão, kiwi e pera com casca','Aveia, chia e linhaça hidratadas','Verduras cozidas, feijão e lentilha em porções pequenas'],evitar:['Aumentar fibras sem aumentar a água','Excesso de queijos e carnes sem vegetais','Retardar a vontade de evacuar'],
  alerta:'Sem evacuar por mais de 4 dias com dor ou distensão, sangue nas fezes ou vômitos.'},
 {id:'diarreia',sx:'diarreia',n:'Diarreia',why:'Mais comum no início e nos aumentos de dose. Costuma melhorar em poucos dias. O foco é reposição de líquidos e redução de gordura e irritantes.',
  fazer:['Repor líquidos e sais em pequenos volumes, ao longo do dia','Reduzir temporariamente gordura, café e álcool','Preferir fibras solúveis e alimentos cozidos','Evitar adoçantes com sorbitol, xilitol e manitol','Considerar probiótico, se o profissional indicar'],
  pref:['Arroz, batata e cenoura cozidos','Banana e maçã cozida','Aveia, frango e peixe cozidos'],evitar:['Frituras e molhos','Café, álcool e refrigerantes','Balas e chicletes dietéticos','Excesso de fibra insolúvel (farelos, verduras cruas)'],
  alerta:'Mais de 3 dias, sangue ou muco nas fezes, febre ou sinais de desidratação.'},
 {id:'refluxo',sx:'refluxo',n:'Refluxo e azia',why:'O estômago demora mais para esvaziar e o conteúdo volta com mais facilidade ao esôfago, sobretudo à noite e após refeições maiores.',
  fazer:['Refeições menores e jantar 3 horas antes de deitar','Elevar a cabeceira da cama','Mastigar bem e comer devagar','Evitar roupas apertadas na cintura','Avaliar com o médico o uso de antiácido ou inibidor de bomba'],
  pref:['Aveia, banana e melão','Frango, peixe e ovos cozidos','Legumes cozidos'],evitar:['Café, chocolate e hortelã','Frituras e alimentos muito gordurosos','Álcool e bebidas gaseificadas','Cítricos em jejum, se houver piora'],
  alerta:'Dificuldade para engolir, dor no peito, vômito com sangue ou fezes escuras.'},
 {id:'dor',sx:'dor',n:'Dor abdominal',why:'Desconforto leve pode ocorrer com a lentidão do esvaziamento. Dor forte e persistente exige avaliação médica, por causa do risco de pancreatite e de problemas na vesícula.',
  fazer:['Registrar local, intensidade, horário e relação com a alimentação','Reduzir gordura nas refeições, principalmente se a dor surge após comer','Interromper a progressão de dose até a avaliação, em conjunto com o prescritor'],
  pref:['Refeições leves, de baixa gordura'],evitar:['Frituras, embutidos e molhos gordurosos','Álcool'],
  alerta:'Dor intensa e contínua, que irradia para as costas, com náusea, vômito ou febre. Orientar atendimento imediato.'},
 {id:'saciedade',sx:'saciedade',n:'Saciedade precoce e baixa ingestão',why:'É o efeito desejado do medicamento, mas ingestão muito baixa leva à perda de massa magra e a deficiências de nutrientes.',
  fazer:['Começar sempre pela proteína','Fazer 4 a 6 mini-refeições em horários fixos, com alarme','Usar refeições líquidas e pastosas ricas em proteína','Escolher alimentos de alta densidade nutricional','Suplemento oral quando a ingestão ficar abaixo de 70% da meta'],
  pref:['Iogurte grego, ovos, queijo cottage e ricota','Shakes proteicos e caldos','Abacate, azeite e oleaginosas em pequenas porções'],evitar:['Beber água em grande volume antes de comer','Pular refeições','Líquidos sem nutrientes no lugar das refeições'],
  alerta:'Ingestão abaixo de 800 kcal por dia por mais de 3 dias ou perda de peso acima de 1% por semana.'},
 {id:'distensao',sx:'distensao',n:'Distensão e gases',why:'A digestão mais lenta aumenta a fermentação e a sensação de estufamento, e a oferta rápida de fibra agrava o quadro.',
  fazer:['Mastigar bem e evitar canudo e bebidas gaseificadas','Aumentar as fibras de forma gradual','Reduzir temporariamente leguminosas e crucíferas e reintroduzir em porções pequenas','Caminhada leve após as refeições','Chá de erva-doce ou funcho'],
  pref:['Cenoura, abobrinha e abóbora cozidas','Arroz, quinoa e aveia','Mamão, banana e morango'],evitar:['Refrigerante e água com gás','Mascar chiclete','Excesso de leite e laticínios, se houver intolerância à lactose'],
  alerta:'Distensão dolorosa com vômitos ou sem eliminar gases ou fezes.'},
 {id:'cabelo',sx:null,n:'Queda de cabelo',why:'A perda de peso rápida pode causar eflúvio telógeno, em geral reversível em 3 a 6 meses. Deficiências de proteína, ferro e zinco agravam.',
  fazer:['Garantir a meta de proteína e a ingestão calórica mínima','Investigar ferritina, zinco, vitamina D e B12','Evitar dietas muito restritivas','Reavaliar a velocidade de perda de peso'],
  pref:['Ovos, carnes, peixes e leguminosas','Sementes de abóbora e castanhas'],evitar:['Suplementos de biotina em excesso sem indicação'],
  alerta:'Queda associada a falhas em placas, coceira intensa ou lesões no couro cabeludo: encaminhar ao dermatologista.'},
 {id:'fadiga',sx:null,n:'Fadiga e tontura',why:'Em geral reflete ingestão calórica e hídrica baixas, perda de sódio, anemia ou, em quem usa insulina ou sulfonilureia, hipoglicemia.',
  fazer:['Checar hidratação, ingestão de calorias e proteína','Reforçar sal e líquidos, se não houver restrição','Avaliar hemograma, ferritina e B12','Se usa insulina ou sulfonilureia: medir a glicemia e avisar o prescritor, pois pode ser necessário reduzir a dose'],
  pref:['Refeições regulares com proteína','Frutas, caldos e água de coco'],evitar:['Longos períodos sem comer','Treinos intensos em jejum'],
  alerta:'Desmaio, confusão, palpitações ou glicemia abaixo de 70 mg/dL.'}
];
T.reg({id:'se',tab:'Efeitos colaterais',title:'Manejo dos efeitos colaterais',
desc:'Registre os sintomas da consulta e veja as estratégias nutricionais, alimentos preferidos e sinais de alerta de cada um, ordenados pela intensidade.',
html:function(S){var ix=T.lastIdx(),V=ix>=0?S.v[ix]:null,sx=(V&&V.sx)||{};
 var left;
 if(!V){left='<div class="panel stack"><h2>Sintomas da consulta</h2><p class="muted">Nenhuma consulta registrada. Crie um registro para anotar as notas de 0 a 10 e os sinais de alerta.</p><button class="btn pri" data-act="sx0">Criar registro de hoje</button></div>';}
 else{left='<div class="panel stack"><div class="row sp"><h2>Sintomas da consulta</h2>'+T.pill(T.fdate(V.date))+'</div><p class="sm muted">Nota de 0 (ausente) a 10 (intolerável). Alterar as notas atualiza os alertas e o painel.</p>'+
  T.SX.map(function(x){return T.rng('v.'+ix+'.sx.'+x[0],{l:x[1],min:0,max:10,step:1,def:0});}).join('')+
  '<div class="fld"><span>Sinais de alerta presentes</span>'+T.chips('v.'+ix+'.red',T.RED.map(function(r){return [r,r];}))+'</div>'+
  T.in('v.'+ix+'.agua',{l:'Água ingerida (L/dia)'})+'</div>';}
 var cards=T.SECARDS.slice().sort(function(a,b){return (a.sx?num(sx[b.sx]||0):0)>(b.sx?num(sx[a.sx]||0):0)?1:-1;});
 var pri=cards.filter(function(c){return c.sx&&num(sx[c.sx])>=3;});
 var tbl='<div class="panel"><h2>Visão geral dos sintomas</h2><div class="tw"><table class="dt"><thead><tr><th>Sintoma</th><th class="n">Nota</th><th>Estratégia principal</th><th>Alimentos preferidos</th><th>Evitar</th><th>Sinal de alerta</th></tr></thead><tbody>'+
  cards.map(function(c){var n=c.sx?num(sx[c.sx]):null;return '<tr><td><b>'+c.n+'</b></td><td class="n">'+(n==null?'—':T.hm(n))+'</td><td style="min-width:200px">'+c.fazer[0]+'</td><td style="min-width:170px">'+c.pref.slice(0,2).join('; ')+'</td><td style="min-width:150px">'+c.evitar.slice(0,2).join('; ')+'</td><td style="min-width:200px">'+c.alerta+'</td></tr>';}).join('')+'</tbody></table></div></div>';
 var det=function(c){var n=c.sx?num(sx[c.sx]):null;return '<div class="card"><div class="row sp"><h3>'+c.n+'</h3>'+(n==null?'':T.pill('Nota '+n+'/10',n>=7?'bad':n>=4?'warn':'ok'))+'</div><p class="sm muted">'+c.why+'</p><div><b class="sm">O que fazer</b><ul class="sm">'+c.fazer.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></div><div><b class="sm">Preferir</b><ul class="sm">'+c.pref.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></div><div><b class="sm">Evitar</b><ul class="sm">'+c.evitar.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></div><div class="al bad">'+T.pill('Alerta','bad')+'<div class="sm">'+c.alerta+'</div></div></div>';};
 var prio=pri.length?'<div class="sec"><h2>Prioridades desta consulta</h2><div class="cols">'+pri.map(det).join('')+'</div></div>':'<div class="al ok" style="margin-top:14px">'+T.pill('Ok','ok')+'<div>Nenhum sintoma com nota 3 ou mais. Mantenha a orientação preventiva e consulte os cartões abaixo quando houver queixa.</div></div>';
 var red='<div class="panel"><h2>Sinais de alerta gerais</h2><ul>'+T.RED.map(function(r){return '<li>'+r+'</li>';}).join('')+'</ul><p class="sm muted" style="margin-top:8px">Diante de qualquer um deles, orientar atendimento e comunicar o prescritor.</p></div>';
 return '<div class="grid2">'+left+'<div class="stack">'+tbl+red+'</div></div>'+prio+'<div class="sec"><h2>Todos os sintomas</h2><div class="cols">'+cards.filter(function(c){return pri.indexOf(c)<0;}).map(det).join('')+'</div></div>';}});

/* ---------- Refeições por textura ---------- */
T.MEALS=[
 {id:'l1',t:'liq',n:'Shake proteico de banana',ing:'200 mL de leite desnatado, 1 scoop de whey (30 g) e 1/2 banana',k:225,p:31,ml:300,uso:'Café da manhã ou pós-treino, quando há pouco apetite'},
 {id:'l2',t:'liq',n:'Caldo de ossos coado com colágeno',ing:'250 mL de caldo de ossos coado e 1 colher de sopa de colágeno (10 g)',k:50,p:10,ml:260,uso:'Náusea, vômitos ou dias de muito enjoo'},
 {id:'l3',t:'liq',n:'Iogurte grego batido com frutas vermelhas',ing:'1 pote de iogurte grego natural (170 g) e 1/2 xícara de frutas vermelhas',k:140,p:16,ml:230,uso:'Lanche da tarde, com fibras e antocianinas'},
 {id:'l4',t:'liq',n:'Suplemento oral pronto hiperproteico',ing:'1 unidade de 200 mL, conforme rótulo do produto',k:200,p:20,ml:200,uso:'Quando a ingestão ficar abaixo de 70% da meta'},
 {id:'l5',t:'liq',n:'Smoothie verde proteico',ing:'Couve, 1/2 pera, 200 mL de água de coco e 1 scoop de proteína vegetal',k:180,p:22,ml:350,uso:'Alternativa sem lactose'},
 {id:'p1',t:'past',n:'Mingau de aveia proteico',ing:'3 colheres de sopa de aveia, 150 mL de leite desnatado e 1/2 scoop de whey',k:240,p:21,ml:250,uso:'Café da manhã ou ceia'},
 {id:'p2',t:'past',n:'Purê de batata-doce com frango',ing:'150 g de purê e 60 g de frango desfiado batido',k:230,p:20,ml:220,uso:'Almoço ou jantar em dias de saciedade intensa'},
 {id:'p3',t:'past',n:'Creme de abóbora com frango',ing:'250 mL de creme de abóbora e 80 g de frango desfiado',k:180,p:18,ml:300,uso:'Jantar leve'},
 {id:'p4',t:'past',n:'Ovos mexidos cremosos',ing:'2 ovos mexidos em fogo baixo com 1 colher de requeijão light',k:200,p:15,ml:150,uso:'Café da manhã e lanche salgado'},
 {id:'p5',t:'past',n:'Iogurte grego com chia',ing:'1 pote (170 g), 1 colher de sopa de chia hidratada e 1/2 mamão amassado',k:190,p:17,ml:260,uso:'Lanche, ajuda no intestino preso'},
 {id:'p6',t:'past',n:'Pasta de atum com iogurte',ing:'1/2 lata de atum (60 g) e 1 colher de sopa de iogurte natural',k:85,p:15,ml:90,uso:'Lanche salgado com pão ou torrada'},
 {id:'p7',t:'past',n:'Papa de frango com legumes',ing:'Frango, cenoura, abobrinha e arroz batidos, 300 mL',k:220,p:25,ml:300,uso:'Almoço quando há dificuldade de mastigar ou engolir'},
 {id:'s1',t:'sol',n:'Omelete de espinafre e queijo',ing:'2 ovos, espinafre e 30 g de queijo minas frescal',k:210,p:18,ml:150,uso:'Qualquer refeição'},
 {id:'s2',t:'sol',n:'Frango grelhado com legumes e arroz',ing:'100 g de frango, 3 colheres de legumes cozidos e 2 colheres de arroz',k:280,p:33,ml:230,uso:'Almoço e jantar'},
 {id:'s3',t:'sol',n:'Peixe assado com salada',ing:'120 g de tilápia assada e salada cozida com azeite',k:220,p:26,ml:250,uso:'Jantar leve'},
 {id:'s4',t:'sol',n:'Salmão com brócolis e batata-doce',ing:'100 g de salmão, 60 g de brócolis e 100 g de batata-doce',k:420,p:24,ml:300,uso:'Fonte de ômega-3, 2 a 3 vezes por semana'},
 {id:'s5',t:'sol',n:'Carne moída com feijão e legumes',ing:'80 g de patinho, 1/2 concha de feijão e legumes',k:310,p:26,ml:250,uso:'Almoço completo, com ferro e fibras'},
 {id:'s6',t:'sol',n:'Sanduíche de ovo e cottage',ing:'2 fatias de pão integral, 1 ovo e 2 colheres de cottage',k:280,p:20,ml:200,uso:'Lanche e café da manhã'},
 {id:'s7',t:'sol',n:'Tapioca de frango',ing:'2 colheres de goma de tapioca e 60 g de frango desfiado com queijo',k:260,p:20,ml:150,uso:'Lanche salgado'},
 {id:'s8',t:'sol',n:'Iogurte grego com nozes',ing:'1 pote de iogurte grego e 15 g de nozes',k:220,p:15,ml:200,uso:'Lanche prático, com gordura insaturada'},
 {id:'s9',t:'sol',n:'Tofu mexido com legumes',ing:'100 g de tofu firme, tomate e espinafre',k:120,p:10,ml:150,uso:'Opção vegetariana'}
];
var TX=[['liq','Líquidas'],['past','Pastosas'],['sol','Sólidas']];
T.reg({id:'meals',tab:'Refeições por textura',title:'Refeições líquidas, pastosas e sólidas',
desc:'Opções por textura com calorias, proteína e volume. A textura sugerida vem dos sintomas da última consulta. Monte o dia e compare com a meta de proteína.',
html:function(S){var p=S.p,alvo=T.c.prot(p),mc=T.c.macros(p),sug=T.texture(),flt=S.ui.mt||'auto',eff=flt==='auto'?sug.t:flt,md=S.md||{},tk=0,tp=0,tml=0;
 T.MEALS.forEach(function(m){var q=md[m.id]||0;tk+=q*m.k;tp+=q*m.p;tml+=q*m.ml;});
 var pct=alvo?tp/alvo*100:0,falta=Math.max(0,alvo-tp);
 var rows=T.MEALS.filter(function(m){return eff==='all'||m.t===eff;});
 var tn={liq:'Líquida',past:'Pastosa',sol:'Sólida'};
 var left='<div class="panel stack"><h2>Textura</h2><div class="al info">'+T.pill('Sugestão','info')+'<div><b>'+({liq:'Refeições líquidas',past:'Refeições pastosas',sol:'Refeições sólidas'}[sug.t])+'.</b> '+sug.why+'</div></div>'+
  '<div class="seg">'+[['auto','Automática'],['liq','Líquidas'],['past','Pastosas'],['sol','Sólidas'],['all','Todas']].map(function(x){return '<button type="button" data-set="ui.mt" data-v="'+x[0]+'" aria-pressed="'+(flt===x[0])+'">'+x[1]+'</button>';}).join('')+'</div>'+
  '<div><div class="row sp sm"><span><b class="mono">'+fmt(tp,0)+' g</b> de '+fmt(alvo)+' g de proteína · '+fmt(tk)+' kcal</span><span class="mono">'+fmt(pct)+'%</span></div>'+T.progress(tp,alvo,alvo)+
  '<p class="sm muted" style="margin-top:6px">'+(tp===0?'Escolha as refeições do dia com os botões de mais e menos.':falta>0?'Faltam '+fmt(falta)+' g de proteína. Meta calórica do plano: '+fmt(mc.kcal)+' kcal.':'Meta de proteína atingida. Volume total das escolhas: '+fmt(tml)+' mL.')+'</p></div>'+
  '<div><button class="btn sm" data-act="clearmd">Limpar escolhas</button></div>'+
  '<p class="sm muted">Líquidas para náusea, vômito ou saciedade muito intensa. Pastosas na transição. Sólidas em porções pequenas quando os sintomas estiverem controlados. Mude de textura conforme a tolerância do dia.</p></div>';
 var tb='<div class="panel"><div class="tw"><table class="dt"><thead><tr><th>Opção</th><th>Textura</th><th>Ingredientes</th><th class="n">kcal</th><th class="n">Proteína</th><th class="n">Volume</th><th>Quando usar</th><th>Hoje</th></tr></thead><tbody>'+
  rows.map(function(m){return '<tr><td><b>'+m.n+'</b></td><td>'+T.pill(tn[m.t],m.t==='liq'?'info':m.t==='past'?'warn':'ok')+'</td><td style="min-width:220px">'+m.ing+'</td><td class="n">'+m.k+'</td><td class="n">'+m.p+' g</td><td class="n">'+m.ml+' mL</td><td style="min-width:180px">'+m.uso+'</td><td>'+T.cnt('md',m.id)+'</td></tr>';}).join('')+'</tbody></table></div><p class="sm muted" style="margin-top:8px">Valores aproximados. Para produtos industrializados, use o rótulo.</p></div>';
 return '<div class="grid2">'+left+'<div style="min-width:0">'+tb+'</div></div>';}});
T.acts.clearmd=function(){T.set('md',{});};

/* ---------- Suplementação conforme exames ---------- */
T.LABS=[
 {k:'vitd',n:'Vitamina D (25-OH)',un:'ng/mL',lo:20,mid:30,hi:100,ref:'30 a 100',step:1},
 {k:'b12',n:'Vitamina B12',un:'pg/mL',lo:200,mid:300,hi:1000,ref:'300 a 900',step:1},
 {k:'ferr',n:'Ferritina',un:'ng/mL',lo:15,mid:30,hiF:200,hiM:300,ref:'30 a 200 (F) · 30 a 300 (M)',step:1},
 {k:'hb',n:'Hemoglobina',un:'g/dL',loF:12,loM:13,ref:'12 a 16 (F) · 13 a 17 (M)',step:0.1},
 {k:'mg',n:'Magnésio sérico',un:'mg/dL',lo:1.7,mid:1.9,hi:2.6,ref:'1,7 a 2,2',step:0.1},
 {k:'zn',n:'Zinco',un:'µg/dL',lo:60,mid:70,hi:150,ref:'70 a 120',step:1},
 {k:'fol',n:'Folato sérico',un:'ng/mL',lo:3,mid:6,hi:40,ref:'6 ou mais',step:0.1},
 {k:'ca',n:'Cálcio total',un:'mg/dL',lo:8.5,mid:8.6,hi:10.5,ref:'8,6 a 10,2',step:0.1}
];
T.evalLabs=function(l,p){var out=[];l=l||{};T.LABS.forEach(function(x){var v=num(l[x.k]);if(!(v>0))return;var F=p&&p.sexo==='F',st='ok',txt='Dentro da referência';
 if(x.k==='hb'){var lim=F?x.loF:x.loM;if(v<lim){st='def';txt='Anemia (abaixo de '+String(lim).replace('.',',')+' g/dL)';}}
 else if(x.k==='ferr'){var h=F?x.hiF:x.hiM;if(v<x.lo){st='def';txt='Deficiência de ferro (abaixo de 15 ng/mL)';}else if(v<x.mid){st='low';txt='Reserva baixa (15 a 29 ng/mL)';}else if(v>h){st='high';txt='Acima da referência. Avaliar inflamação';}}
 else{if(v<x.lo){st='def';txt='Abaixo de '+String(x.lo).replace('.',',')+' '+x.un;}else if(v<x.mid){st='low';txt='Limítrofe ('+String(x.lo).replace('.',',')+' a '+String(x.mid-(x.step<1?0.1:1)).replace('.',',')+' '+x.un+')';}else if(v>x.hi){st='high';txt='Acima da referência';}}
 if(x.k==='vitd'&&st==='def')txt='Deficiência (abaixo de 20 ng/mL)';if(x.k==='vitd'&&st==='low')txt='Insuficiência (20 a 29 ng/mL)';
 out.push({k:x.k,nome:x.n,v:v,un:x.un,st:st,txt:txt,ref:x.ref});});return out;};
T.SUP=[
 {id:'vitd',n:'Vitamina D',lab:'vitd',evid:'Sólida',dose:'Deficiência: esquemas usuais de 50.000 UI por semana por 6 a 8 semanas, seguidos de 1.000 a 2.000 UI por dia. Insuficiência: 1.000 a 4.000 UI por dia.',obs:'Tomar com a refeição mais gordurosa. Avaliar cálcio e PTH em deficiência grave.',rev:'25-OH em 3 meses',src:'Peixes gordurosos, ovos, exposição solar'},
 {id:'b12',n:'Vitamina B12',lab:'b12',evid:'Sólida',dose:'500 a 1.000 mcg por dia por via oral. Forma intramuscular se deficiência grave ou sintomas neurológicos.',obs:'Metformina e inibidores de bomba reduzem a absorção. Se limítrofe, considerar ácido metilmalônico.',rev:'B12 em 2 a 3 meses',src:'Carnes, ovos, laticínios, peixes'},
 {id:'ferr',n:'Ferro',lab:'ferr',evid:'Sólida',dose:'40 a 60 mg de ferro elementar por dia ou em dias alternados, com vitamina C.',obs:'Afastar de cálcio, café e chá. O bisglicinato costuma ser mais bem tolerado e pode piorar a constipação. Investigar a causa em homens e mulheres na pós-menopausa.',rev:'Ferritina e hemograma em 8 a 12 semanas',src:'Carnes, feijão, lentilha, folhas escuras'},
 {id:'hb',n:'Anemia (hemoglobina baixa)',lab:'hb',evid:'Sólida',dose:'Definir a causa antes de tratar: ferro, B12, folato ou outra. Conduta conforme o resultado de cada um.',obs:'Hemoglobina abaixo do limite exige avaliação médica.',rev:'Hemograma em 8 a 12 semanas',src:'Ver ferro, B12 e folato'},
 {id:'fol',n:'Folato',lab:'fol',evid:'Sólida',dose:'400 a 800 mcg por dia de ácido fólico ou folato.',obs:'Em mulheres que podem engravidar, manter mesmo sem deficiência. Investigar B12 antes de repor folato isolado.',rev:'Folato em 3 meses',src:'Folhas verdes, feijão, lentilha, abacate'},
 {id:'mg',n:'Magnésio',lab:'mg',evid:'Moderada',dose:'200 a 400 mg de magnésio elementar por dia, à noite. Citrato e glicinato são as formas usuais.',obs:'Pode ajudar na constipação. Cuidado em doença renal. Doses altas causam diarreia.',rev:'Magnésio em 8 a 12 semanas',src:'Sementes, oleaginosas, folhas verdes, leguminosas'},
 {id:'zn',n:'Zinco',lab:'zn',evid:'Moderada',dose:'8 a 15 mg por dia, no máximo 30 mg. Uso acima de 15 mg por mais de 2 a 3 meses pede acompanhamento do cobre.',obs:'Tomar com alimento se houver náusea.',rev:'Zinco em 8 a 12 semanas',src:'Carnes, ostras, semente de abóbora, leguminosas'},
 {id:'ca',n:'Cálcio',lab:'ca',evid:'Moderada',dose:'1.000 a 1.200 mg por dia somando dieta e suplemento, em doses de até 500 mg.',obs:'O citrato é melhor em quem usa inibidor de bomba. Associar vitamina D. Cálcio sérico total reflete mal o consumo: avaliar a ingestão alimentar.',rev:'Conforme a causa',src:'Laticínios, sardinha, couve, gergelim'},
 {id:'prot',n:'Proteína em pó (whey ou colágeno)',lab:null,evid:'Sólida',dose:'20 a 30 g por dose, 1 a 2 vezes por dia, quando a ingestão ficar abaixo de 70% da meta.',obs:'Usar isolado ou hidrolisado em caso de intolerância à lactose. Colágeno tem menos leucina e não substitui toda a proteína.',rev:'Ingestão e composição corporal a cada consulta',src:'Ver tabela de progressão da proteína'},
 {id:'w3',n:'Ômega-3 (EPA e DHA)',lab:null,evid:'Moderada',dose:'1 a 2 g por dia de EPA mais DHA, se o consumo de peixes gordurosos for inferior a 2 vezes por semana.',obs:'Cautela com anticoagulantes. Pode causar refluxo e gosto de peixe.',rev:'Triglicerídeos em 3 meses',src:'Salmão, sardinha, atum'},
 {id:'fib',n:'Fibras (psyllium)',lab:null,evid:'Sólida',dose:'5 g, 1 a 2 vezes por dia, com 200 a 250 mL de água.',obs:'Aumentar aos poucos. Sem água suficiente, piora a constipação. Separar de outros medicamentos por 2 horas.',rev:'Hábito intestinal a cada consulta',src:'Ver tabela de fibras'},
 {id:'ele',n:'Eletrólitos e reidratação oral',lab:null,evid:'Sólida',dose:'Solução de reidratação oral em goles ao longo do dia durante vômito ou diarreia.',obs:'Preferir fórmulas de sais prontas. Em hipertensos e renais crônicos, acompanhar o sódio.',rev:'Enquanto durar o quadro',src:'Água de coco, caldos, soro oral'},
 {id:'mv',n:'Multivitamínico e mineral',lab:null,evid:'Moderada',dose:'1 dose diária, quando a ingestão estiver abaixo de 1.200 kcal ou o cardápio for pouco variado.',obs:'Não substitui a correção dos déficits identificados nos exames.',rev:'Conforme a evolução',src:'Dieta variada com frutas, verduras e leguminosas'},
 {id:'cre',n:'Creatina monoidratada',lab:null,evid:'Limitada neste contexto',dose:'3 a 5 g por dia, associada a treino de força. Uso opcional.',obs:'Evidência emergente para preservar massa magra. Avaliar a função renal. Pode aumentar o peso por retenção de líquido.',rev:'Composição corporal em 12 semanas',src:'Carnes e peixes (quantidades pequenas)'}
];
T.texts.supp=function(){var ev=T.evalLabs(T.S.l,T.S.p),ln=['SUPLEMENTAÇÃO — '+(T.S.p.nome||'Paciente')];
 ev.forEach(function(e){ln.push(e.nome+': '+fmt(e.v,e.v%1?1:0)+' '+e.un+' ('+e.txt+')');});
 var al=ev.filter(function(e){return e.st==='def'||e.st==='low';});
 if(al.length){ln.push('Condutas a avaliar:');al.forEach(function(e){var s=T.SUP.filter(function(x){return x.lab===e.k;})[0];if(s)ln.push('- '+s.n+': '+s.dose+' Reavaliar: '+s.rev+'.');});}
 else ln.push('Sem alterações nos exames informados.');
 return ln.join('\n');};
T.reg({id:'supp',tab:'Suplementação',title:'Suplementação conforme a deficiência',
desc:'Informe os exames para ver o que está baixo, acima ou adequado e a conduta de suplementação de cada nutriente, com dose de referência, cuidados e prazo de reavaliação.',
html:function(S){var p=S.p,ev=T.evalLabs(S.l,p),flt=S.ui.sf||'ind',flag={};ev.forEach(function(e){if(e.st==='def'||e.st==='low')flag[e.k]=e.st;});
 var left='<div class="panel stack"><h2>Exames do paciente</h2><div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))">'+T.LABS.map(function(x){return T.in('l.'+x.k,{l:x.n+' ('+x.un+')',step:x.step});}).join('')+'</div><p class="sm muted">Deixe em branco o que não foi pedido. Referências aproximadas, conferir a do laboratório.</p></div>';
 var st={def:['Deficiente','bad'],low:['Limítrofe','warn'],ok:['Adequado','ok'],high:['Acima','info']};
 var tb='<div class="panel"><h2>Interpretação</h2>'+(ev.length?'<div class="tw"><table class="dt"><thead><tr><th>Exame</th><th class="n">Valor</th><th>Referência</th><th>Situação</th><th>Leitura</th></tr></thead><tbody>'+ev.map(function(e){return '<tr><td><b>'+e.nome+'</b></td><td class="n">'+fmt(e.v,e.v%1?1:0)+' '+e.un+'</td><td>'+e.ref+'</td><td>'+T.pill(st[e.st][0],st[e.st][1])+'</td><td>'+e.txt+'</td></tr>';}).join('')+'</tbody></table></div>':'<p class="muted">Informe ao menos um exame.</p>')+'<div class="row" style="margin-top:10px">'+T.copyBtn('supp','Copiar resumo')+'</div></div>';
 var list=T.SUP.filter(function(s){return flt==='all'||(flt==='ind'&&s.lab&&flag[s.lab])||(flt==='rot'&&!s.lab);});
 var cards=list.length?list.map(function(s){var f=s.lab&&flag[s.lab];return '<div class="card'+(f?' sel':'')+'"><div class="row sp"><h3>'+s.n+'</h3>'+(f?T.pill(f==='def'?'Deficiente':'Limítrofe',f==='def'?'bad':'warn'):s.lab?'':T.pill('Rotina','info'))+'</div><p class="sm"><b>Dose de referência:</b> '+s.dose+'</p><p class="sm"><b>Cuidados:</b> '+s.obs+'</p><p class="sm"><b>Reavaliar:</b> '+s.rev+'</p><p class="sm"><b>Fontes alimentares:</b> '+s.src+'</p><p class="xs muted">Evidência: '+s.evid+'</p></div>';}).join(''):'<p class="muted">Nenhum nutriente indicado pelos exames informados.</p>';
 var sec='<div class="sec"><div class="row sp" style="margin-bottom:10px"><h2>Condutas por nutriente</h2><div class="seg">'+[['ind','Indicados pelos exames'],['rot','Rotina e apoio'],['all','Todos']].map(function(x){return '<button type="button" data-set="ui.sf" data-v="'+x[0]+'" aria-pressed="'+(flt===x[0])+'">'+x[1]+'</button>';}).join('')+'</div></div><div class="cols">'+cards+'</div><p class="sm muted" style="margin-top:12px">Doses são esquemas de referência de uso comum. A prescrição, o ajuste e a interação com medicamentos são responsabilidade do profissional habilitado, conforme exames, sintomas e comorbidades.</p></div>';
 return '<div class="grid2">'+left+tb+'</div>'+sec;}});
})();
