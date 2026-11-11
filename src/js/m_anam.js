(function(){
var T=window.T,num=T.num,fmt=T.fmt;
var YN=[['s','Sim'],['n','Não']];
var op=function(a){return a.map(function(x){return [x,x];});};

/* Tipos: t texto · n número · d data · s lista · c múltipla escolha · y sim ou não · a texto longo · r escala 0 a 10 */
T.ANAM={
 antes:{nome:'Antes do uso',desc:'Avaliação inicial, elegibilidade nutricional e precauções.',secs:[
  {t:'Motivo e expectativas',f:[['a','motivo','Motivo da consulta e queixa principal'],['t','presc','Médico prescritor'],['d','inicio','Data prevista de início'],['n','meta','Meta de peso (kg)'],['r','motiv','Motivação para mudar (0 a 10)'],['r','conf','Confiança em manter hábitos (0 a 10)']]},
  {t:'Histórico de peso',f:[['n','pmax','Peso máximo na vida adulta (kg)'],['n','pmin','Peso mínimo na vida adulta (kg)'],['y','sanfona','Efeito sanfona'],['c','tent','Tentativas anteriores',op(['Dietas','Medicamentos','Cirurgia bariátrica','Acompanhamento nutricional','Nenhuma'])],['a','pesohist','Evolução do peso e fatores associados']]},
  {t:'Histórico clínico',f:[['c','comorb','Comorbidades',op(['Diabetes tipo 2','Pré-diabetes','Hipertensão','Dislipidemia','Apneia do sono','Gordura no fígado','Síndrome dos ovários policísticos','Doença renal crônica','Doença cardiovascular','Hipotireoidismo','Nenhuma'])],['a','meds','Medicamentos e suplementos em uso'],['t','alerg','Alergias e intolerâncias'],['t','cirurg','Cirurgias prévias']]},
  {t:'Precauções e contraindicações',f:[['y','mtc','História pessoal ou familiar de carcinoma medular de tireoide ou neoplasia endócrina múltipla tipo 2'],['y','pancr','Pancreatite prévia'],['y','vesic','Doença da vesícula ou cálculos biliares'],['y','gastrop','Gastroparesia ou doença gastrointestinal grave'],['y','retin','Retinopatia diabética'],['y','gest','Gestação, amamentação ou plano de engravidar'],['y','contr','Uso de anticoncepcional oral'],['y','insul','Uso de insulina ou sulfonilureia'],['y','ta','Transtorno alimentar ou compulsão alimentar'],['y','renal','Doença renal ou desidratação frequente']]},
  {t:'Hábitos alimentares',f:[['n','nref','Número de refeições por dia'],['a','r24','Recordatório de 24 horas'],['n','agua','Água por dia (L)'],['c','intol','Intolerâncias ou restrições',op(['Lactose','Glúten','Frutos do mar','Vegetariano ou vegano','Outras','Nenhuma'])],['a','pref','Preferências e aversões'],['y','emoc','Come por motivos emocionais'],['r','fome','Pensamentos constantes sobre comida (0 a 10)'],['s','ritmo','Ritmo das refeições',op(['Muito rápido','Normal','Lento'])]]},
  {t:'Estilo de vida',f:[['s','ativ','Atividade física',op(['Nenhuma','1 a 2 vezes por semana','3 a 4 vezes por semana','5 ou mais vezes por semana'])],['y','forca','Faz treino de força'],['n','sono','Horas de sono por noite'],['s','tabaco','Tabagismo',op(['Nunca fumou','Ex-fumante','Fumante'])],['s','alcool','Álcool',op(['Não bebe','Ocasional','Semanal','Diário'])],['r','estresse','Nível de estresse (0 a 10)']]},
  {t:'Trato gastrointestinal',f:[['s','evac','Frequência de evacuação',op(['Todos os dias','Dia sim, dia não','2 a 3 vezes por semana','Menos de 2 vezes por semana'])],['s','bristol','Forma das fezes (escala de Bristol)',op(['Tipo 1','Tipo 2','Tipo 3','Tipo 4','Tipo 5','Tipo 6','Tipo 7'])],['y','refl','Refluxo ou azia frequentes'],['y','naus','Náusea frequente']]},
  {t:'Exames e composição corporal',f:[['a','exames','Exames recentes (glicemia, HbA1c, perfil lipídico, TSH, função renal, enzimas hepáticas, vitamina D, B12, ferritina)'],['t','tfg','Taxa de filtração glomerular']],auto:true}
 ]},
 durante:{nome:'Durante o uso',desc:'Acompanhamento de adesão, tolerância, ingestão e composição corporal.',secs:[
  {t:'Uso do medicamento',f:[['d','ultap','Data da última aplicação'],['s','dia','Dia da semana da aplicação',op(['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'])],['s','adesao','Adesão às doses',op(['Todas as doses','Esqueceu 1 dose','Esqueceu 2 ou mais doses'])],['t','dific','Dificuldades com a aplicação'],['t','mudanca','Mudança de dose desde a última consulta']],auto:true},
  {t:'Apetite e saciedade',f:[['r','ap','Apetite (0 a 10)'],['r','sac','Saciedade precoce (0 a 10)'],['r','fnoise','Pensamentos sobre comida (0 a 10)'],['n','protd','Proteína estimada por dia (g)'],['n','puladas','Refeições puladas por semana'],['y','emoc2','Fome ou comer emocional']]},
  {t:'Sintomas e sinais de alerta',f:[['c','sint','Sintomas presentes',op(['Náusea','Vômito','Diarreia','Constipação','Refluxo','Dor abdominal','Distensão e gases','Nenhum'])],['c','red','Sinais de alerta',T.RED.map(function(r){return [r,r];})],['a','sintobs','Quando ocorrem e o que ajuda']]},
  {t:'Hidratação',f:[['n','agua2','Água por dia (L)'],['s','urina','Cor da urina',op(['Clara','Amarela','Escura'])],['y','tontura','Tontura ou queda de pressão']]},
  {t:'Energia, sono e humor',f:[['r','energia','Energia (0 a 10)'],['r','sono2','Qualidade do sono (0 a 10)'],['r','humor','Humor (0 a 10)'],['y','cabelo','Queda de cabelo'],['y','ideac','Pensamentos de se machucar ou de desistir da vida']]},
  {t:'Atividade física',f:[['n','forca2','Treinos de força por semana'],['r','canso','Cansaço nos treinos (0 a 10)'],['y','dormus','Perda de força ou dor muscular']]},
  {t:'Medicamentos e ajustes',f:[['a','meds2','Mudanças nos outros medicamentos (insulina, sulfonilureia, anti-hipertensivos)'],['a','supl','Suplementos em uso']]},
  {t:'Plano e metas',f:[['r','satis','Satisfação com o plano alimentar (0 a 10)'],['a','barr','Barreiras encontradas'],['a','metas','Metas até a próxima consulta']],auto:true}
 ]},
 apos:{nome:'Após o uso',desc:'Transição, manutenção do peso e prevenção do reganho.',secs:[
  {t:'Situação do tratamento',f:[['s','motivo2','Motivo da pausa ou do término',op(['Meta atingida','Efeitos adversos','Custo ou acesso','Orientação médica','Platô de peso','Outro'])],['d','ultdose','Data da última dose'],['n','pult','Peso na última dose (kg)'],['n','patual','Peso atual (kg)']]},
  {t:'Retorno do apetite',f:[['r','apr','Apetite atual (0 a 10)'],['r','fn2','Pensamentos sobre comida (0 a 10)'],['y','recomp','Aumento de porções ou de lanches'],['a','gatil','Situações que aumentam a fome']]},
  {t:'Manutenção',f:[['s','forca3','Treino de força',op(['Não faz','1 a 2 vezes por semana','3 ou mais vezes por semana'])],['n','prot3','Proteína estimada (g por dia)'],['y','estr','Refeições estruturadas e planejadas'],['s','peso3','Automonitoramento do peso',op(['Diário','Semanal','Raramente'])],['c','apoio','Rede de apoio',op(['Nutricionista','Médico','Psicólogo','Grupo de apoio','Educador físico'])]]},
  {t:'Composição corporal e saúde',f:[['a','exames3','Exames de seguimento'],['a','pa','Pressão arterial e glicemia'],['a','meds3','Medicamentos reduzidos ou suspensos']],auto:true},
  {t:'Prevenção de recaída',f:[['a','plano','Plano de ação se o peso subir mais de 2 kg'],['a','metas3','Metas para 6 a 12 meses']]}
 ]}
};
var fieldList=function(ph){var o=[];T.ANAM[ph].secs.forEach(function(s){s.f.forEach(function(f){o.push(f);});});return o;};
var answered=function(f){var v=T.S.a[f[1]];if(f[0]==='c')return Array.isArray(v)&&v.length>0;return v!=null&&v!=='';};
var label=function(f,v){if(f[0]==='y')return v==='s'?'Sim':v==='n'?'Não':'';if(f[0]==='c')return (v||[]).join(', ');if(f[0]==='r')return v+'/10';if(f[0]==='d')return T.fdate(v);return String(v);};
var rf=function(f){var t=f[0],id=f[1],lb=f[2],path='a.'+id,o=f[3];
 if(t==='t')return T.in(path,{l:lb,t:'text'});
 if(t==='n')return T.in(path,{l:lb});
 if(t==='d')return T.in(path,{l:lb,t:'date'});
 if(t==='s')return T.sel(path,o,{l:lb,blank:true});
 if(t==='a')return T.ta(path,{l:lb,rows:3,cls:'span'});
 if(t==='r')return T.rng(path,{l:lb,min:0,max:10,step:1,def:5});
 if(t==='y')return '<div class="fld"><span>'+lb+'</span>'+T.seg(path,YN)+'</div>';
 if(t==='c')return '<div class="fld"><span>'+lb+'</span>'+T.chips(path,o)+'</div>';return '';};
T.texts.anam=function(){var ph=T.S.ui.ap||'antes',A=T.ANAM[ph],p=T.S.p,ln=['ANAMNESE — '+A.nome.toUpperCase()+' DA TIRZEPATIDA','Paciente: '+(p.nome||'—')+' · '+p.idade+' anos · peso '+fmt(num(p.peso),1)+' kg · altura '+num(p.altura)+' cm · IMC '+fmt(T.c.imc(p.peso,p.altura),1)];
 A.secs.forEach(function(s){var rows=s.f.filter(answered).map(function(f){return '- '+f[2]+': '+label(f,T.S.a[f[1]]);});if(rows.length){ln.push('');ln.push(s.t.toUpperCase());rows.forEach(function(r){ln.push(r);});}});
 var al=T.anamAlerts();if(al.length){ln.push('');ln.push('PONTOS DE ATENÇÃO');al.forEach(function(a){ln.push('- '+a.t);});}
 return ln.join('\n');};
T.anamAlerts=function(){var a=T.S.a||{},o=[],y=function(k){return a[k]==='s';};
 if(y('mtc'))o.push({lvl:'bad',t:'História de carcinoma medular de tireoide ou NEM2: é contraindicação à tirzepatida. Comunicar o prescritor antes de qualquer conduta.',go:'anam'});
 if(y('gest'))o.push({lvl:'bad',t:'Gestação, amamentação ou plano de engravidar: a tirzepatida não é indicada. Alinhar com o prescritor.',go:'anam'});
 if(ia('ideac'))o.push({lvl:'bad',t:'Pensamentos de se machucar ou de desistir da vida: acolher, não deixar a pessoa sozinha, orientar atendimento imediato e comunicar o prescritor. No Brasil, o CVV atende pelo 188.',go:'anam'});
 if(y('pancr')||y('vesic'))o.push({lvl:'warn',t:'Pancreatite ou doença da vesícula prévias: precaução. Reforçar sinais de alerta de dor abdominal e reduzir gordura nas refeições.',go:'anam'});
 if(y('gastrop'))o.push({lvl:'warn',t:'Gastroparesia ou doença gastrointestinal grave: a tirzepatida retarda o esvaziamento gástrico. Discutir com o prescritor.',go:'anam'});
 if(y('retin'))o.push({lvl:'warn',t:'Retinopatia diabética: acompanhar a visão com o oftalmologista durante a perda rápida de peso.',go:'anam'});
 if(y('ta'))o.push({lvl:'warn',t:'Transtorno alimentar ou compulsão: acompanhamento multiprofissional e cuidado com metas de restrição.',go:'anam'});
 if(y('insul'))o.push({lvl:'info',t:'Uso de insulina ou sulfonilureia: risco de hipoglicemia. O prescritor pode precisar reduzir a dose desses medicamentos.',go:'anam'});
 if(y('contr'))o.push({lvl:'info',t:'Anticoncepcional oral: a tirzepatida pode reduzir sua eficácia. Orientar método de barreira nas 4 semanas após o início e após cada aumento de dose.',go:'anam'});
 if(y('renal'))o.push({lvl:'info',t:'Doença renal ou desidratação frequente: reforçar a hidratação e acompanhar a função renal.',go:'anam'});
 var ph=num(a.pult),pa=num(a.patual);if(ph>0&&pa>0&&pa-ph>=3)o.push({lvl:'warn',t:'Reganho de '+fmt(pa-ph,1)+' kg desde a última dose. Ativar o plano de prevenção de recaída.',go:'anam'});
 return o;};
function ia(k){return (T.S.a||{})[k]==='s';}
T.extra=(T.extra||[]);T.extra.push(T.anamAlerts);

T.acts.clearanam=function(){var ph=T.S.ui.ap||'antes',a=T.S.a||{};fieldList(ph).forEach(function(f){delete a[f[1]];});T.S.a=a;T.save();T.render();T.flash('Respostas desta fase apagadas');};
T.reg({id:'anam',tab:'Anamnese',title:'Ficha de anamnese com tirzepatida',
desc:'Ficha para os três momentos do tratamento: antes, durante e após o uso. As respostas geram pontos de atenção e um resumo para o prontuário.',
html:function(S){var ph=S.ui.ap||'antes',A=T.ANAM[ph],p=S.p,tot=0,ok=0;
 ['antes','durante','apos'].forEach(function(k){fieldList(k).forEach(function(f){if(k===ph){tot++;if(answered(f))ok++;}});});
 var pct=tot?ok/tot*100:0,imc=T.c.imc(p.peso,p.altura),m=T.c.macros(p),cm=S.cm||{};
 var head='<div class="panel stack"><div class="row sp"><div class="seg">'+[['antes','Antes'],['durante','Durante'],['apos','Após']].map(function(x){return '<button type="button" data-set="ui.ap" data-v="'+x[0]+'" aria-pressed="'+(ph===x[0])+'">'+x[1]+' o uso</button>';}).join('')+'</div><div class="row">'+T.copyBtn('anam','Copiar resumo')+'<button class="btn sm" data-act="clearanam">Limpar esta fase</button></div></div>'+
  '<div><div class="row sp sm"><span>'+A.desc+'</span><span class="mono">'+ok+' de '+tot+' campos · '+fmt(pct)+'%</span></div>'+T.progress(ok,tot,tot)+'</div></div>';
 var al=T.anamAlerts();var alh=al.length?'<div class="stack" style="margin-top:12px">'+al.map(T.alert).join('')+'</div>':'';
 var auto='<div class="kpis"><div class="kpi"><div class="l">Peso</div><div class="v">'+fmt(num(p.peso),1)+'<small>kg</small></div><div class="d">Inicial '+fmt(num(p.pesoIni),1)+' kg</div></div><div class="kpi"><div class="l">IMC</div><div class="v">'+fmt(imc,1)+'</div><div class="d">Altura '+num(p.altura)+' cm</div></div><div class="kpi"><div class="l">Cintura</div><div class="v">'+(num(cm.cint)?fmt(num(cm.cint),0):'—')+'<small>cm</small></div><div class="d">Da avaliação de composição</div></div><div class="kpi"><div class="l">Gordura corporal</div><div class="v">'+(num(p.gc)?fmt(num(p.gc),1):'—')+'<small>%</small></div><div class="d">Massa magra '+(num(p.gc)?fmt(num(p.peso)*(1-num(p.gc)/100),1)+' kg':'—')+'</div></div><div class="kpi"><div class="l">Dose e semana</div><div class="v">'+(p.dose==='0'?'—':String(p.dose).replace('.',',')+'<small>mg</small>')+'</div><div class="d">Semana '+num(p.semana)+' · meta '+fmt(m.kcal)+' kcal · proteína '+fmt(m.pg)+' g</div></div></div>';
 var secs=A.secs.map(function(s){return '<div class="panel stack"><h2>'+s.t+'</h2>'+(s.auto?auto:'')+'<div class="fgrid">'+s.f.map(function(f){var w=f[0]==='a'||f[0]==='c'||f[2].length>70;return '<div'+(w?' style="grid-column:1/-1"':'')+'>'+rf(f)+'</div>';}).join('')+'</div></div>';}).join('');
 return head+alh+'<div class="cols" style="margin-top:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))">'+secs+'</div>';}});
})();
