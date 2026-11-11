(function(){
var T=window.T,num=T.num,fmt=T.fmt;

/* g = lipídios totais; ins = insaturados (g, aprox.); w3 = ômega-3 (g, ALA ou EPA+DHA) */
T.FATS=[
 {id:'azeite',n:'Azeite de oliva extra virgem',t:'mono',m:'1 colher de sopa (13 mL)',k:108,g:12,ins:9.9,w3:0.1,p:0,tol:'Fácil',obs:'Usar cru ou em fogo baixo. Fácil de somar sem aumentar o volume.'},
 {id:'abacate',n:'Abacate',t:'mono',m:'2 colheres de sopa (50 g)',k:80,g:7.5,ins:5.5,w3:0.1,p:1,tol:'Fácil',obs:'Textura cremosa, bom nas fases pastosas. Também fornece fibras (3 g).'},
 {id:'azeitona',n:'Azeitona verde',t:'mono',m:'5 unidades (20 g)',k:25,g:2.3,ins:1.7,w3:0,p:0,tol:'Fácil',obs:'Atenção ao sódio em quem tem hipertensão.'},
 {id:'amendoa',n:'Amêndoas',t:'mono',m:'10 unidades (12 g)',k:70,g:6,ins:4.6,w3:0,p:2.5,tol:'Moderada',obs:'Mastigar bem. Pode pesar se a saciedade estiver intensa.'},
 {id:'amendoim',n:'Amendoim torrado sem sal',t:'mono',m:'1 punhado (20 g)',k:118,g:10,ins:8,w3:0,p:5,tol:'Moderada',obs:'Densidade calórica alta. Medir a porção.'},
 {id:'pastaamen',n:'Pasta de amendoim integral',t:'mono',m:'1 colher de sobremesa (15 g)',k:90,g:7.5,ins:5.8,w3:0,p:3.8,tol:'Fácil',obs:'Boa em fases pastosas com iogurte ou mingau.'},
 {id:'pistache',n:'Pistache',t:'mono',m:'20 unidades (15 g)',k:85,g:6.8,ins:5.7,w3:0.05,p:3,tol:'Moderada',obs:'Fonte de luteína. Preferir sem sal.'},
 {id:'castpara',n:'Castanha-do-pará',t:'poli',m:'2 unidades (8 g)',k:53,g:5.4,ins:4.3,w3:0,p:1.1,tol:'Fácil',obs:'Fonte de selênio. Limitar a 2 a 3 unidades por dia.'},
 {id:'gergelim',n:'Gergelim',t:'poli',m:'1 colher de sopa (9 g)',k:52,g:4.5,ins:3.6,w3:0.03,p:1.6,tol:'Fácil',obs:'Fonte de cálcio. Polvilhar em saladas e purês.'},
 {id:'sabobora',n:'Semente de abóbora',t:'poli',m:'1 colher de sopa (10 g)',k:56,g:4.9,ins:3.8,w3:0.01,p:3,tol:'Fácil',obs:'Fonte de zinco e magnésio.'},
 {id:'nozes',n:'Nozes',t:'w3',m:'3 unidades (15 g)',k:98,g:9.8,ins:8.5,w3:1.4,p:2.3,tol:'Moderada',obs:'Fonte vegetal de ômega-3 (ALA).'},
 {id:'chia',n:'Semente de chia',t:'w3',m:'1 colher de sopa (12 g)',k:58,g:3.7,ins:3.1,w3:2.1,p:2,tol:'Fácil',obs:'Hidratar antes. Ajuda no intestino preso. Aumentar a dose aos poucos.'},
 {id:'linhaca',n:'Linhaça moída',t:'w3',m:'1 colher de sopa (10 g)',k:53,g:4.2,ins:3.6,w3:2.3,p:1.8,tol:'Fácil',obs:'Usar moída. Mistura bem em iogurte e vitaminas.'},
 {id:'sardinha',n:'Sardinha assada',t:'w3',m:'1 unidade média (60 g)',k:125,g:6.5,ins:4.5,w3:0.9,p:15,tol:'Moderada',obs:'EPA e DHA, além de proteína. Boa alternativa ao salmão.'},
 {id:'salmao',n:'Salmão grelhado',t:'w3',m:'100 g',k:200,g:11,ins:7.5,w3:2.0,p:22,tol:'Moderada',obs:'Duas a três porções de peixe gorduroso por semana cobrem a necessidade.'}
];
var FT=[['mono','Monoinsaturadas'],['poli','Poli-insaturadas'],['w3','Ricas em ômega-3']];
T.reg({id:'fat',tab:'Gorduras insaturadas',title:'Tabela de alimentos fonte de gorduras insaturadas',
desc:'Fontes de gorduras monoinsaturadas, poli-insaturadas e ômega-3 em medidas caseiras, com calorias, tolerância e ajuste ao teto de lipídios do plano.',
html:function(S){var p=S.p,m=T.c.macros(p),fb=S.fb||{},flt=S.ui.ft||'all',ft=S.ff||{},rows=T.FATS.filter(function(f){return flt==='all'||f.t===flt;});
 var g=0,k=0,w=0,ins=0;T.FATS.forEach(function(f){var q=ft[f.id]||0;g+=q*f.g;k+=q*f.k;w+=q*f.w3;ins+=q*f.ins;});
 var meta=m.fg,pct=meta?g/meta*100:0,st=pct>110?'warn':pct>=80?'ok':'info';
 var top='<div class="panel stack"><h2>Meta de lipídios do plano</h2><div class="kpis" style="grid-template-columns:1fr 1fr"><div class="kpi hi"><div class="l">Lipídios por dia</div><div class="v">'+fmt(meta)+'<small>g</small></div><div class="d">'+fmt(num(p.lip))+'% de '+fmt(m.kcal)+' kcal</div></div><div class="kpi"><div class="l">Ômega-3 sugerido</div><div class="v">1,1 a 1,6<small>g</small></div><div class="d">Ingestão adequada (ALA)</div></div></div>'+
  T.rng('p.lip',{l:'Lipídios',min:15,max:45,step:1,u:' % do VET',def:30})+
  '<div><div class="row sp sm"><span><b class="mono">'+fmt(g,1)+' g</b> escolhidos · '+fmt(ins,1)+' g insaturados · ômega-3 '+fmt(w,1)+' g</span><span class="mono">'+fmt(pct)+'%</span></div>'+T.progress(g,meta,meta)+'<p class="sm muted" style="margin-top:6px">'+(pct>110?'Acima da meta de lipídios. Reduza uma porção.':pct>=80?'Dentro da meta de lipídios.':'Ainda há espaço para lipídios de boa qualidade.')+' Total das escolhas: '+fmt(k)+' kcal.</p></div>'+
  '<div class="fld"><span>Filtrar por tipo</span>'+'<div class="seg">'+[['all','Todas']].concat(FT).map(function(x){return '<button type="button" data-set="ui.ft" data-v="'+x[0]+'" aria-pressed="'+(flt===x[0])+'">'+x[1]+'</button>';}).join('')+'</div></div>'+
  '<p class="sm muted">Priorize azeite, oleaginosas, sementes e peixes. Limite gorduras saturadas e trans. Com saciedade intensa, prefira porções pequenas e densas, como o azeite e as pastas.</p></div>';
 var tb='<div class="panel"><div class="tw"><table class="dt"><thead><tr><th>Alimento</th><th>Medida caseira</th><th class="n">kcal</th><th class="n">Lipídios</th><th class="n">Insat.</th><th class="n">Ômega-3</th><th>Tolerância</th><th>Observação</th><th>Hoje</th></tr></thead><tbody>'+
  rows.map(function(f){return '<tr><td><b>'+f.n+'</b><div class="xs muted">'+({mono:'Monoinsaturada',poli:'Poli-insaturada',w3:'Rica em ômega-3'}[f.t])+'</div></td><td>'+f.m+'</td><td class="n">'+f.k+'</td><td class="n">'+fmt(f.g,1)+' g</td><td class="n">'+fmt(f.ins,1)+' g</td><td class="n">'+(f.w3>=0.5?fmt(f.w3,1)+' g':'—')+'</td><td>'+T.pill(f.tol,f.tol==='Fácil'?'ok':'warn')+'</td><td style="min-width:220px">'+f.obs+'</td><td>'+T.cnt('ff',f.id)+'</td></tr>';}).join('')+'</tbody></table></div></div>';
 return '<div class="grid2">'+top+'<div style="min-width:0">'+tb+'</div></div>';}});

/* f = fibras g/porção; gas = potencial de gases; fito = principal fitoquímico */
T.FIBS=[
 {id:'aveia',n:'Aveia em flocos',g:'Cereais',m:'3 colheres de sopa (30 g)',k:118,f:2.7,gas:1,fito:'Beta-glucana',obs:'Fibra solúvel que melhora o colesterol e a glicemia.'},
 {id:'arrozint',n:'Arroz integral cozido',g:'Cereais',m:'3 colheres de sopa (75 g)',k:93,f:1.5,gas:1,fito:'Ácido ferúlico',obs:'Troca simples pelo arroz branco.'},
 {id:'paoint',n:'Pão integral',g:'Cereais',m:'1 fatia (25 g)',k:63,f:1.9,gas:1,fito:'Lignanas',obs:'Conferir se o primeiro ingrediente é farinha integral.'},
 {id:'quinoa',n:'Quinoa cozida',g:'Cereais',m:'3 colheres de sopa (60 g)',k:72,f:1.7,gas:1,fito:'Quercetina',obs:'Também fornece proteína vegetal.'},
 {id:'chia',n:'Chia',g:'Sementes',m:'1 colher de sopa (12 g)',k:58,f:4.1,gas:1,fito:'Ácido clorogênico, ômega-3',obs:'Hidratar em água ou iogurte por 10 minutos.'},
 {id:'linhaca',n:'Linhaça moída',g:'Sementes',m:'1 colher de sopa (10 g)',k:53,f:2.7,gas:1,fito:'Lignanas',obs:'Moída para ser absorvida.'},
 {id:'feijao',n:'Feijão cozido',g:'Leguminosas',m:'1/2 concha (45 g)',k:34,f:3.8,gas:3,fito:'Antocianinas, saponinas',obs:'Remolho, descarte da água e porções pequenas reduzem os gases.'},
 {id:'lentilha',n:'Lentilha cozida',g:'Leguminosas',m:'4 colheres de sopa (80 g)',k:93,f:6.3,gas:2,fito:'Polifenóis, ferro',obs:'Cozimento rápido e digestão mais leve que o feijão.'},
 {id:'grao',n:'Grão-de-bico cozido',g:'Leguminosas',m:'4 colheres de sopa (80 g)',k:130,f:5.5,gas:3,fito:'Saponinas, isoflavonas',obs:'Bom em purê (homus) nas fases pastosas.'},
 {id:'brocolis',n:'Brócolis cozido',g:'Crucíferas',m:'4 colheres de sopa (60 g)',k:20,f:2.0,gas:3,fito:'Sulforafano, indóis',obs:'Cozinhar até ficar macio e começar com 2 colheres.'},
 {id:'couve',n:'Couve refogada',g:'Folhosos',m:'2 colheres de sopa (40 g)',k:40,f:2.3,gas:2,fito:'Luteína, kaempferol',obs:'Cortar fino. Ótima fonte de cálcio e vitamina K.'},
 {id:'espinafre',n:'Espinafre cozido',g:'Folhosos',m:'3 colheres de sopa (60 g)',k:14,f:1.4,gas:1,fito:'Luteína, zeaxantina',obs:'Combina com ovos e purês.'},
 {id:'cenoura',n:'Cenoura cozida',g:'Raízes e legumes',m:'3 colheres de sopa (60 g)',k:24,f:1.7,gas:1,fito:'Beta-caroteno',obs:'Boa tolerância. Funciona em sopas e cremes.'},
 {id:'beterraba',n:'Beterraba cozida',g:'Raízes e legumes',m:'3 fatias (60 g)',k:26,f:1.2,gas:1,fito:'Betalaínas, nitrato',obs:'Pode escurecer urina e fezes. É esperado.'},
 {id:'batatadoce',n:'Batata-doce com casca',g:'Raízes e legumes',m:'100 g',k:86,f:2.4,gas:1,fito:'Beta-caroteno, antocianinas',obs:'Versão roxa tem mais antocianinas.'},
 {id:'tomate',n:'Tomate',g:'Raízes e legumes',m:'1 unidade média (120 g)',k:21,f:1.4,gas:1,fito:'Licopeno',obs:'Cozido ou com azeite aumenta a absorção do licopeno.'},
 {id:'framboesa',n:'Framboesa',g:'Frutas vermelhas',m:'1/2 xícara (60 g)',k:31,f:3.9,gas:1,fito:'Antocianinas, ácido elágico',obs:'Congelada funciona bem em vitaminas e iogurtes.'},
 {id:'mirtilo',n:'Mirtilo',g:'Frutas vermelhas',m:'1/2 xícara (75 g)',k:43,f:1.8,gas:1,fito:'Antocianinas',obs:'Pouco volume, muitos fitoquímicos.'},
 {id:'morango',n:'Morango',g:'Frutas vermelhas',m:'6 unidades (100 g)',k:30,f:1.7,gas:1,fito:'Ácido elágico, vitamina C',obs:'Boa opção de sobremesa.'},
 {id:'maca',n:'Maçã com casca',g:'Frutas',m:'1 unidade média (130 g)',k:68,f:3.1,gas:2,fito:'Quercetina, pectina',obs:'Cozida ou ralada é mais fácil de tolerar.'},
 {id:'pera',n:'Pera com casca',g:'Frutas',m:'1 unidade (140 g)',k:80,f:4.3,gas:2,fito:'Flavonoides, pectina',obs:'Contém sorbitol, o que ajuda na constipação.'},
 {id:'mamao',n:'Mamão papaia',g:'Frutas',m:'1/2 unidade (150 g)',k:60,f:2.7,gas:1,fito:'Carotenoides, papaína',obs:'Muito bem tolerado. Auxilia o trânsito intestinal.'},
 {id:'ameixa',n:'Ameixa seca',g:'Frutas',m:'3 unidades (24 g)',k:58,f:1.7,gas:1,fito:'Ácido neoclorogênico, sorbitol',obs:'Primeira escolha para constipação.'},
 {id:'laranja',n:'Laranja com bagaço',g:'Frutas',m:'1 unidade (150 g)',k:70,f:2.7,gas:1,fito:'Hesperidina, vitamina C',obs:'Prefira a fruta ao suco para manter a fibra.'},
 {id:'kiwi',n:'Kiwi',g:'Frutas',m:'1 unidade (75 g)',k:46,f:2.3,gas:1,fito:'Actinidina, vitamina C',obs:'Evidência favorável para a constipação.'},
 {id:'abacate',n:'Abacate',g:'Frutas',m:'2 colheres de sopa (50 g)',k:80,f:3.4,gas:1,fito:'Luteína, beta-sitosterol',obs:'Fibra e gordura boa no mesmo alimento.'}
];
var FG=['Cereais','Sementes','Leguminosas','Crucíferas','Folhosos','Raízes e legumes','Frutas vermelhas','Frutas'];
T.reg({id:'fib',tab:'Fibras e fitoquímicos',title:'Tabela de alimentos fonte de fibras e fitoquímicos',
desc:'Fibras por medida caseira, principal fitoquímico, potencial de gases e dicas de tolerância. Some as porções do dia e compare com a meta de fibras.',
html:function(S){var p=S.p,meta=T.c.fibra(p),fb=S.fb||{},grp=S.ui.fg||'all',gas=S.ui.fgas||'all',L=S.vs&&0;
 var rows=T.FIBS.filter(function(f){return (grp==='all'||f.g===grp)&&(gas==='all'||(gas==='baixo'&&f.gas===1)||(gas==='alto'&&f.gas>=3));});
 var tot=0,kc=0,gruposEsc={};T.FIBS.forEach(function(f){var q=fb[f.id]||0;if(q){tot+=q*f.f;kc+=q*f.k;gruposEsc[f.g]=1;}});
 var v=T.vs(),lv=v[v.length-1],con=lv&&lv.sx?num(lv.sx.constip):0,dist=lv&&lv.sx?num(lv.sx.distensao):0;
 var nota=con>=4?'Constipação nota '+con+'/10: priorize ameixa, kiwi, mamão, chia e aveia, com bastante água.':dist>=4?'Distensão nota '+dist+'/10: dê preferência aos itens de baixo potencial de gases e aumente a fibra aos poucos.':'Aumente as fibras gradualmente, em 3 a 5 g por semana, e acompanhe com água.';
 var pct=meta?tot/meta*100:0;
 var left='<div class="panel stack"><h2>Meta de fibras</h2><div class="kpis" style="grid-template-columns:1fr 1fr"><div class="kpi hi"><div class="l">Fibras por dia</div><div class="v">'+fmt(meta)+'<small>g</small></div><div class="d">14 g por 1.000 kcal (mínimo '+(p.sexo==='F'?25:30)+' g)</div></div><div class="kpi"><div class="l">Variedade hoje</div><div class="v">'+Object.keys(gruposEsc).length+'<small>/ 8 grupos</small></div><div class="d">Colorir o prato aumenta a variedade de fitoquímicos</div></div></div>'+
  '<div><div class="row sp sm"><span><b class="mono">'+fmt(tot,1)+' g</b> escolhidos · '+fmt(kc)+' kcal</span><span class="mono">'+fmt(pct)+'%</span></div>'+T.progress(tot,meta,meta)+'</div>'+
  '<div class="al info">'+T.pill('Conduta','info')+'<div>'+nota+'</div></div>'+
  '<div class="fld"><span>Grupo</span><div class="seg">'+['all'].concat(FG).map(function(x){return '<button type="button" data-set="ui.fg" data-v="'+x+'" aria-pressed="'+(grp===x)+'">'+(x==='all'?'Todos':x)+'</button>';}).join('')+'</div></div>'+
  '<div class="fld"><span>Potencial de gases</span>'+T.seg('ui.fgas',[['all','Todos'],['baixo','Baixo'],['alto','Alto']])+'</div></div>';
 var tb='<div class="panel"><div class="tw"><table class="dt"><thead><tr><th>Alimento</th><th>Medida caseira</th><th class="n">Fibras</th><th class="n">kcal</th><th>Fitoquímico</th><th>Gases</th><th>Dica</th><th>Hoje</th></tr></thead><tbody>'+
  rows.map(function(f){return '<tr><td><b>'+f.n+'</b><div class="xs muted">'+f.g+'</div></td><td>'+f.m+'</td><td class="n">'+fmt(f.f,1)+' g</td><td class="n">'+f.k+'</td><td>'+f.fito+'</td><td>'+T.pill(f.gas===1?'Baixo':f.gas===2?'Médio':'Alto',f.gas===1?'ok':f.gas===2?'warn':'bad')+'</td><td style="min-width:220px">'+f.obs+'</td><td>'+T.cnt('fb',f.id)+'</td></tr>';}).join('')+'</tbody></table></div></div>';
 return '<div class="grid2">'+left+'<div style="min-width:0">'+tb+'</div></div>';}});

/* c = carboidrato por medida; gr = gramas; ml = volume aproximado por medida */
T.CARBS=[
 {id:'arrozb',n:'Arroz branco cozido',g:'Cereais',m:'1 colher de sopa cheia',gr:25,c:7.0,k:32,f:0.2,ig:'Alto',ml:20},
 {id:'arrozi',n:'Arroz integral cozido',g:'Cereais',m:'1 colher de sopa cheia',gr:25,c:6.5,k:31,f:0.5,ig:'Médio',ml:20},
 {id:'quinoa',n:'Quinoa cozida',g:'Cereais',m:'1 colher de sopa cheia',gr:20,c:4.3,k:24,f:0.6,ig:'Baixo',ml:18},
 {id:'macarrao',n:'Macarrão cozido',g:'Cereais',m:'1 pegador (50 g)',gr:50,c:15.5,k:78,f:0.9,ig:'Médio',ml:60},
 {id:'aveia',n:'Aveia em flocos',g:'Cereais',m:'1 colher de sopa (10 g)',gr:10,c:6.7,k:39,f:0.9,ig:'Baixo',ml:15},
 {id:'paof',n:'Pão francês',g:'Pães',m:'1 unidade (50 g)',gr:50,c:28.9,k:150,f:1.5,ig:'Alto',ml:150},
 {id:'paoint',n:'Pão integral de forma',g:'Pães',m:'1 fatia (25 g)',gr:25,c:11.7,k:62,f:1.9,ig:'Médio',ml:80},
 {id:'tapioca',n:'Tapioca (goma hidratada)',g:'Pães',m:'2 colheres de sopa (30 g)',gr:30,c:18,k:72,f:0,ig:'Alto',ml:30},
 {id:'feijao',n:'Feijão carioca cozido',g:'Leguminosas',m:'1 concha pequena (60 g)',gr:60,c:8.2,k:46,f:5.1,ig:'Baixo',ml:60},
 {id:'lentilha',n:'Lentilha cozida',g:'Leguminosas',m:'2 colheres de sopa (40 g)',gr:40,c:8.0,k:46,f:3.2,ig:'Baixo',ml:35},
 {id:'grao',n:'Grão-de-bico cozido',g:'Leguminosas',m:'2 colheres de sopa (40 g)',gr:40,c:11,k:66,f:3.4,ig:'Baixo',ml:35},
 {id:'batata',n:'Batata inglesa cozida',g:'Raízes',m:'1 unidade média (100 g)',gr:100,c:11.9,k:52,f:1.3,ig:'Alto',ml:100},
 {id:'batatadoce',n:'Batata-doce cozida',g:'Raízes',m:'1/2 unidade (100 g)',gr:100,c:18.4,k:77,f:2.2,ig:'Médio',ml:100},
 {id:'mandioca',n:'Mandioca cozida',g:'Raízes',m:'2 colheres de sopa (60 g)',gr:60,c:18.1,k:72,f:1.2,ig:'Médio',ml:50},
 {id:'banana',n:'Banana prata',g:'Frutas',m:'1 unidade (70 g de polpa)',gr:70,c:18.2,k:69,f:1.4,ig:'Médio',ml:80},
 {id:'maca',n:'Maçã',g:'Frutas',m:'1 unidade média (130 g)',gr:130,c:18,k:75,f:3.1,ig:'Baixo',ml:200},
 {id:'mamao',n:'Mamão papaia',g:'Frutas',m:'1/2 unidade (150 g)',gr:150,c:16,k:60,f:2.7,ig:'Médio',ml:150},
 {id:'melancia',n:'Melancia',g:'Frutas',m:'1 fatia (150 g)',gr:150,c:12,k:45,f:0.6,ig:'Alto',ml:150},
 {id:'laranja',n:'Laranja',g:'Frutas',m:'1 unidade (150 g)',gr:150,c:13.4,k:70,f:2.7,ig:'Baixo',ml:150},
 {id:'leite',n:'Leite desnatado',g:'Laticínios',m:'1 copo (200 mL)',gr:200,c:10,k:70,f:0,ig:'Baixo',ml:200},
 {id:'iogn',n:'Iogurte natural desnatado',g:'Laticínios',m:'1 pote (170 g)',gr:170,c:8.5,k:80,f:0,ig:'Baixo',ml:170},
 {id:'mel',n:'Mel',g:'Açúcares',m:'1 colher de sobremesa (10 g)',gr:10,c:8.2,k:31,f:0,ig:'Alto',ml:7},
 {id:'sucolar',n:'Suco de laranja natural',g:'Açúcares',m:'1 copo (200 mL)',gr:200,c:17,k:72,f:0.4,ig:'Médio',ml:200}
];
var CG=['Cereais','Pães','Leguminosas','Raízes','Frutas','Laticínios','Açúcares'];
T.reg({id:'carb',tab:'Carboidratos por volume',title:'Tabela de carboidratos por volume alimentar',
desc:'Gramas de carboidrato em medidas caseiras, quanto volume cabe em 15 g e monte um prato por refeição, conferindo carboidrato e volume total.',
html:function(S){var p=S.p,m=T.c.macros(p),n=Math.max(1,num(p.nref,4)),cb=S.cb||{},grp=S.ui.cg||'all',igf=S.ui.cig||'all',alvoRef=m.cg/n;
 var rows=T.CARBS.filter(function(f){return (grp==='all'||f.g===grp)&&(igf==='all'||f.ig===igf);});
 var tc=0,tk=0,tml=0,tf=0;T.CARBS.forEach(function(f){var q=cb[f.id]||0;tc+=q*f.c;tk+=q*f.k;tml+=q*f.ml;tf+=q*f.f;});
 var pct=alvoRef?tc/alvoRef*100:0,vol=tml>300?'bad':tml>220?'warn':'ok';
 var left='<div class="panel stack"><h2>Prato da refeição</h2><div class="kpis" style="grid-template-columns:1fr 1fr"><div class="kpi hi"><div class="l">Carboidrato por refeição</div><div class="v">'+fmt(alvoRef)+'<small>g</small></div><div class="d">'+fmt(m.cg)+' g/dia ÷ '+n+' refeições</div></div><div class="kpi"><div class="l">Volume sugerido</div><div class="v">150 a 250<small>mL</small></div><div class="d">Esvaziamento gástrico mais lento</div></div></div>'+
  '<div><div class="row sp sm"><span><b class="mono">'+fmt(tc,1)+' g</b> de carboidrato · '+fmt(tk)+' kcal · fibras '+fmt(tf,1)+' g</span><span class="mono">'+fmt(pct)+'%</span></div>'+T.progress(tc,alvoRef,alvoRef)+'</div>'+
  '<div class="al '+(vol==='ok'?'ok':vol)+'">'+T.pill('Volume '+fmt(tml)+' mL',vol)+'<div>'+(vol==='ok'?'Volume compatível com o esvaziamento gástrico lento.':vol==='warn'?'Volume no limite. Se houver náusea, divida em duas refeições.':'Volume alto para uma refeição. Reduza porções ou separe em dois momentos.')+'</div></div>'+
  '<div class="fld"><span>Grupo</span><div class="seg">'+['all'].concat(CG).map(function(x){return '<button type="button" data-set="ui.cg" data-v="'+x+'" aria-pressed="'+(grp===x)+'">'+(x==='all'?'Todos':x)+'</button>';}).join('')+'</div></div>'+
  '<div class="fld"><span>Índice glicêmico</span>'+T.seg('ui.cig',[['all','Todos'],['Baixo','Baixo'],['Médio','Médio'],['Alto','Alto']])+'</div>'+
  '<button class="btn sm" data-act="clearcb">Limpar prato</button></div>';
 var tb='<div class="panel"><div class="tw"><table class="dt"><thead><tr><th>Alimento</th><th>Medida caseira</th><th class="n">Carboidrato</th><th class="n">kcal</th><th class="n">Fibras</th><th class="n">Medidas em 15 g</th><th>IG</th><th>Prato</th></tr></thead><tbody>'+
  rows.map(function(f){return '<tr><td><b>'+f.n+'</b><div class="xs muted">'+f.g+'</div></td><td>'+f.m+'</td><td class="n">'+fmt(f.c,1)+' g</td><td class="n">'+f.k+'</td><td class="n">'+fmt(f.f,1)+' g</td><td class="n">'+fmt(15/f.c,1)+'</td><td>'+T.pill(f.ig,f.ig==='Baixo'?'ok':f.ig==='Médio'?'warn':'bad')+'</td><td>'+T.cnt('cb',f.id)+'</td></tr>';}).join('')+'</tbody></table></div><p class="sm muted" style="margin-top:8px">Medidas em 15 g indica quantas medidas caseiras equivalem a uma troca de 15 g de carboidrato. Volumes são estimativas.</p></div>';
 return '<div class="grid2">'+left+'<div style="min-width:0">'+tb+'</div></div>';}});
T.acts.clearcb=function(){T.set('cb',{});};
})();
