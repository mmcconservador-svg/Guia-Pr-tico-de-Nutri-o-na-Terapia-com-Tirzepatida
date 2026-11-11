(function(){
var T=window.T,num=T.num,fmt=T.fmt;
var ATIV=[['1.2','Sedentário (1,2)'],['1.375','Pouco ativo (1,375)'],['1.55','Moderadamente ativo (1,55)'],['1.725','Muito ativo (1,725)'],['1.9','Extremamente ativo (1,9)']];

T.reg({id:'get',tab:'GET e macros',title:'Calculadora de GET, déficit e macronutrientes',
desc:'Calcule a taxa metabólica, o gasto energético total, a meta calórica com déficit e a divisão de macronutrientes com proteína por g/kg.',
html:function(S){var p=S.p,c=T.c,m=c.macros(p),tmb=c.tmb(p),get=c.get(p),piso=c.piso(p),base=c.base(p),imc=c.imc(p.peso,p.altura);
 var pp=m.kcal?m.pk/m.kcal*100:0,cp=m.kcal?m.ck/m.kcal*100:0,fp=m.kcal?m.fk/m.kcal*100:0,n=Math.max(1,num(p.nref,4));
 var left='<div class="panel stack"><h2>Parâmetros</h2>'+
  '<div class="fld"><span>Equação da taxa metabólica basal</span>'+T.seg('p.eq',[['mifflin','Mifflin-St Jeor'],['hb','Harris-Benedict'],['cun','Cunningham']])+'</div>'+
  (p.eq==='cun'?T.in('p.gc',{l:'Gordura corporal (%)'}):'')+
  T.sel('p.ativ',ATIV,{l:'Fator de atividade',t:'n'})+
  T.rng('p.deficit',{l:'Déficit calórico',min:0,max:1000,step:50,u:' kcal',def:500})+
  '<div class="fld"><span>Peso usado no cálculo da proteína</span>'+T.seg('p.base',[['ajustado','Ajustado'],['atual','Atual'],['ideal','Ideal']])+'</div>'+
  (S.auto.prot?'<p class="sm muted">Proteína definida pela fase do tratamento: <b>'+T.fases[T.faseIdx(p)].nome+'</b>, '+fmt(c.gkg(p),2)+' g/kg. Desligue a automação para ajustar à mão.</p>':T.rng('p.protG',{l:'Proteína',min:0.8,max:2.2,step:0.1,u:' g/kg',def:1.3}))+
  T.chk('auto.prot','Definir proteína automaticamente pela fase do tratamento')+
  T.rng('p.lip',{l:'Lipídios',min:15,max:45,step:1,u:' % do VET',def:30})+
  T.rng('p.nref',{l:'Refeições por dia',min:3,max:6,step:1,def:4})+'</div>';
 var al=[];
 if(num(p.peso)>0&&m.kcal<piso)al.push({lvl:'bad',t:'A meta de '+fmt(m.kcal)+' kcal fica abaixo do piso de '+piso+' kcal/dia. Reduza o déficit.'});
 if(m.neg)al.push({lvl:'warn',t:'Proteína e lipídios já ultrapassam a meta calórica. Reduza o percentual de lipídios.'});
 var right='<div class="stack"><div class="kpis"><div class="kpi"><div class="l">Taxa metabólica basal</div><div class="v">'+fmt(tmb)+'<small>kcal</small></div><div class="d">'+({mifflin:'Mifflin-St Jeor',hb:'Harris-Benedict',cun:'Cunningham'}[p.eq])+'</div></div>'+
  '<div class="kpi"><div class="l">GET</div><div class="v">'+fmt(get)+'<small>kcal</small></div><div class="d">TMB × '+fmt(num(p.ativ),3)+'</div></div>'+
  '<div class="kpi hi"><div class="l">Meta diária</div><div class="v">'+fmt(m.kcal)+'<small>kcal</small></div><div class="d">GET − '+fmt(num(p.deficit))+' kcal</div></div>'+
  '<div class="kpi"><div class="l">IMC</div><div class="v">'+fmt(imc,1)+'<small>kg/m²</small></div><div class="d">Peso ideal '+fmt(c.ideal(p.altura),1)+' kg · ajustado '+fmt(c.ajust(p.peso,p.altura),1)+' kg</div></div></div>'+
  al.map(T.alert).join('')+
  '<div class="panel"><h2>Macronutrientes</h2><div class="tw" style="margin-bottom:12px"><table class="dt"><thead><tr><th>Macro</th><th class="n">g/dia</th><th class="n">kcal</th><th class="n">% VET</th><th class="n">g/refeição</th></tr></thead><tbody>'+
  '<tr><td><b style="color:var(--c-prot)">Proteína</b><div class="xs muted">'+fmt(c.gkg(p),2)+' g/kg × '+fmt(base,1)+' kg</div></td><td class="n">'+fmt(m.pg)+'</td><td class="n">'+fmt(m.pk)+'</td><td class="n">'+fmt(pp)+'</td><td class="n">'+fmt(m.pg/n)+'</td></tr>'+
  '<tr><td><b style="color:var(--c-carb)">Carboidratos</b><div class="xs muted">Restante da meta</div></td><td class="n">'+fmt(m.cg)+'</td><td class="n">'+fmt(m.ck)+'</td><td class="n">'+fmt(cp)+'</td><td class="n">'+fmt(m.cg/n)+'</td></tr>'+
  '<tr><td><b style="color:var(--c-fat)">Lipídios</b><div class="xs muted">Priorizar insaturados</div></td><td class="n">'+fmt(m.fg)+'</td><td class="n">'+fmt(m.fk)+'</td><td class="n">'+fmt(fp)+'</td><td class="n">'+fmt(m.fg/n)+'</td></tr></tbody></table></div>'+
  T.bar([[pp,'var(--c-prot)'],[cp,'var(--c-carb)'],[fp,'var(--c-fat)']])+'<div class="leg"><span><b style="background:var(--c-prot)"></b>Proteína '+fmt(pp)+'%</span><span><b style="background:var(--c-carb)"></b>Carboidratos '+fmt(cp)+'%</span><span><b style="background:var(--c-fat)"></b>Lipídios '+fmt(fp)+'%</span></div>'+
  '<div class="row" style="margin-top:12px;gap:16px"><span class="sm"><b>Fibras:</b> '+fmt(c.fibra(p))+' g/dia</span><span class="sm"><b>Água:</b> '+fmt(c.agua(p),1)+' L/dia</span></div></div>'+
  '<div class="panel"><h2>Cenários de déficit</h2><div class="tw"><table class="dt"><thead><tr><th>Déficit</th><th class="n">Meta kcal</th><th class="n">Proteína g/kg</th><th class="n">Perda estimada</th><th>Leitura</th></tr></thead><tbody>'+
  [250,500,750,1000].map(function(d){var k=get-d,q=Object.assign({},p,{deficit:d}),sel=num(p.deficit)===d,ok=k>=piso;return '<tr'+(sel?' class="cur"':'')+'><td class="n">'+d+' kcal</td><td class="n">'+fmt(k)+'</td><td class="n">'+fmt(c.gkg(p),2)+'</td><td class="n">'+fmt(d*7/7700,2)+' kg/sem</td><td>'+(ok?(d<=500?T.pill('Seguro','ok'):T.pill('Acompanhar','warn')):T.pill('Abaixo do piso','bad'))+'</td></tr>';}).join('')+
  '</tbody></table></div><p class="sm muted" style="margin-top:8px">Perda estimada pela regra de 7.700 kcal por kg. Na prática, a tirzepatida reduz a ingestão espontaneamente. Use a meta como referência de adequação de nutrientes e não como motivo para restringir ainda mais.</p></div></div>';
 return '<div class="grid2">'+left+right+'</div>';}});

T.PROTF=[
 {id:'frango',n:'Peito de frango grelhado',m:'100 g',p:31,k:165},{id:'ovo',n:'Ovo cozido',m:'1 unidade',p:6.3,k:75},
 {id:'clara',n:'Clara de ovo',m:'3 unidades',p:11,k:51},{id:'tilapia',n:'Tilápia grelhada',m:'100 g',p:26,k:128},
 {id:'salmao',n:'Salmão grelhado',m:'100 g',p:22,k:200},{id:'patinho',n:'Patinho grelhado',m:'100 g',p:33,k:200},
 {id:'atum',n:'Atum em água, drenado',m:'1/2 lata (60 g)',p:14,k:65},{id:'camarao',n:'Camarão cozido',m:'100 g',p:24,k:100},
 {id:'grego',n:'Iogurte grego natural',m:'1 pote (170 g)',p:15,k:110},{id:'cottage',n:'Queijo cottage',m:'100 g',p:11,k:98},
 {id:'ricota',n:'Ricota fresca',m:'100 g',p:10,k:140},{id:'minas',n:'Queijo minas frescal',m:'50 g',p:8.7,k:132},
 {id:'leite',n:'Leite desnatado',m:'1 copo (200 mL)',p:7,k:70},{id:'whey',n:'Whey protein',m:'1 scoop (30 g)',p:24,k:120},
 {id:'tofu',n:'Tofu firme',m:'100 g',p:10,k:90},{id:'lentilha',n:'Lentilha cozida',m:'80 g (4 col. sopa)',p:7,k:93},
 {id:'grao',n:'Grão-de-bico cozido',m:'80 g (4 col. sopa)',p:7,k:130}];
T.MEALN=['Café da manhã','Lanche da manhã','Almoço','Lanche da tarde','Jantar','Ceia'];

T.reg({id:'prot',tab:'Proteína',title:'Tabela de progressão da proteína',
desc:'Meta de proteína por fase do escalonamento da dose, distribuição por refeição e montagem do dia com porções equivalentes.',
html:function(S){var p=S.p,c=T.c,base=c.base(p),alvo=c.prot(p),n=Math.max(1,num(p.nref,4)),fi=T.faseIdx(p),pf=S.pf||{};
 var tot=0,kc=0;T.PROTF.forEach(function(f){var q=pf[f.id]||0;tot+=q*f.p;kc+=q*f.k;});
 var pct=alvo?tot/alvo*100:0,st=pct>=95?'ok':pct>=70?'warn':'bad',txt=pct>=95?'Meta atingida':pct>=70?'Faltam '+fmt(alvo-tot)+' g':'Faltam '+fmt(alvo-tot)+' g. Considerar suplemento';
 var ctl='<div class="panel stack"><h2>Meta do paciente</h2><div class="kpis" style="grid-template-columns:1fr 1fr"><div class="kpi hi"><div class="l">Proteína por dia</div><div class="v">'+fmt(alvo)+'<small>g</small></div><div class="d">'+fmt(c.gkg(p),2)+' g/kg · base '+fmt(base,1)+' kg</div></div><div class="kpi"><div class="l">Por refeição</div><div class="v">'+fmt(alvo/n)+'<small>g</small></div><div class="d">'+n+' refeições</div></div></div>'+
  T.chk('auto.prot','Definir g/kg pela fase do tratamento')+(S.auto.prot?'':T.rng('p.protG',{l:'Proteína',min:0.8,max:2.2,step:0.1,u:' g/kg',def:1.3}))+
  '<div class="fld"><span>Peso-base</span>'+T.seg('p.base',[['ajustado','Ajustado'],['atual','Atual'],['ideal','Ideal']])+'</div>'+
  T.rng('p.nref',{l:'Refeições por dia',min:3,max:6,step:1,def:4})+
  '<div class="fld"><span>Função renal</span>'+T.seg('p.rim',[['normal','Normal'],['drc','TFG < 60']])+'</div>'+
  (p.rim==='drc'?'<p class="sm" style="color:var(--warn)">Com doença renal crônica, proteína acima de 0,8 g/kg exige decisão conjunta com o nefrologista.</p>':'')+'</div>';
 var fases='<div class="panel"><h2>Progressão por fase do escalonamento</h2><div class="tw"><table class="dt"><thead><tr><th>Fase</th><th>Dose</th><th>Semanas</th><th class="n">g/kg</th><th class="n">g/dia</th><th>Foco da conduta</th></tr></thead><tbody>'+
  T.fases.map(function(f,i){return '<tr'+(i===fi?' class="cur"':'')+'><td><b>'+f.nome+'</b>'+(i===fi?'<div>'+T.pill('Fase atual','ok')+'</div>':'')+'</td><td>'+(f.doses[0]==='0'?'—':f.doses.map(function(d){return d.replace('.',',');}).join(' e ')+' mg')+'</td><td>'+f.sem+'</td><td class="n">'+fmt(f.min,1)+' a '+fmt(f.max,1)+'</td><td class="n">'+fmt(f.min*base)+' a '+fmt(f.max*base)+'</td><td>'+f.foco+'</td></tr>';}).join('')+
  '</tbody></table></div><p class="sm muted" style="margin-top:8px">Faixas de 1,2 a 1,6 g/kg/dia são as mais usadas para preservar a massa magra durante perda de peso. Ajuste pela função renal, idade, prática de treino e composição corporal.</p></div>';
 var ref='<div class="panel"><h2>Distribuição por refeição</h2><div class="tw"><table class="dt"><thead><tr><th>Refeição</th><th class="n">Proteína (g)</th><th>Exemplo de prato</th></tr></thead><tbody>'+
  T.MEALN.slice(0,n).map(function(nm,i){var g=alvo/n,ex=g>=28?'120 g de carne, frango ou peixe':g>=20?'2 ovos + 1 pote de iogurte grego':g>=14?'1 pote de iogurte grego ou 100 g de cottage':'1 ovo + 1 fatia de queijo';return '<tr><td>'+nm+'</td><td class="n">'+fmt(g)+'</td><td>'+ex+'</td></tr>';}).join('')+
  '</tbody></table></div><p class="sm muted" style="margin-top:8px">Com saciedade precoce, as refeições maiores cabem menos. Nesse caso, divida a meta em mais refeições pequenas (25 a 30 g cada).</p></div>';
 var bld='<div class="panel"><div class="row sp" style="margin-bottom:10px"><h2>Montar o dia com porções</h2><div class="row"><span class="pill '+st+'">'+txt+'</span></div></div>'+
  '<div style="margin-bottom:12px"><div class="row sp sm"><span><b class="mono">'+fmt(tot,1)+' g</b> de '+fmt(alvo)+' g · '+fmt(kc)+' kcal</span><span class="mono">'+fmt(pct)+'%</span></div>'+T.progress(tot,alvo,alvo)+'</div>'+
  '<div class="tw"><table class="dt"><thead><tr><th>Alimento</th><th>Porção</th><th class="n">Proteína</th><th class="n">kcal</th><th class="n">Porções p/ 25 g</th><th>Quantas hoje</th></tr></thead><tbody>'+
  T.PROTF.map(function(f){return '<tr><td>'+f.n+'</td><td>'+f.m+'</td><td class="n">'+fmt(f.p,1)+' g</td><td class="n">'+f.k+'</td><td class="n">'+fmt(25/f.p,1)+'</td><td>'+T.cnt('pf',f.id)+'</td></tr>';}).join('')+'</tbody></table></div></div>';
 return '<div class="grid2">'+ctl+'<div class="stack">'+fases+ref+'</div></div><div class="sec">'+bld+'</div>';}});
})();
