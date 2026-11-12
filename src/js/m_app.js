(function(){
var T=window.T,num=T.num,fmt=T.fmt;
var GROUPS=[['Acompanhar',['dash','visits','comp','anam']],['Calcular',['get','prot']],['Tabelas',['fat','fib','carb','meals']],['Clínica',['se','supp']]];
var BLURB={dash:'Indicadores, gráficos e pontos de atenção do paciente.',visits:'Peso, sintomas e ingestão a cada consulta.',comp:'Equação ideal, dobras cutâneas e casos clínicos.',anam:'Ficha para antes, durante e após o uso.',
 get:'Gasto energético, déficit e macronutrientes.',prot:'Meta de proteína por fase da dose.',fat:'Gorduras insaturadas em medidas caseiras.',fib:'Fibras e fitoquímicos, com tolerância.',carb:'Carboidratos por volume e trocas de 15 g.',meals:'Refeições líquidas, pastosas e sólidas.',
 se:'Estratégias por sintoma e sinais de alerta.',supp:'Exames e suplementação por deficiência.'};
var DOSES=['2.5','5','7.5','10','12.5','15'];

T.acts.openapp=function(){T.S.ui.view='app';T.save();T.render();window.scrollTo(0,0);};
T.acts.home=function(){T.S.ui.view='home';if(T.pres){T.pres=false;document.documentElement.classList.remove('pres');}T.save();T.render();window.scrollTo(0,0);};
T.acts.go=function(b){T.S.ui.view='app';T.S.ui.tab=b.dataset.v;T.save();T.render();window.scrollTo(0,0);};
T.acts.tab=T.acts.go;
T.acts.theme=function(){var t=T.S.ui.theme||'';T.S.ui.theme=t===''?'dark':t==='dark'?'light':'';T.save();T.render();};

function applyTheme(S){var t=S.ui.theme;if(t)document.documentElement.setAttribute('data-theme',t);else document.documentElement.removeAttribute('data-theme');}
var themeLabel=function(S){var t=S.ui.theme||'';return t===''?'Tema: automático':t==='dark'?'Tema: escuro':'Tema: claro';};
var foot=function(){return '<footer class="ft"><p>Material de apoio ao raciocínio clínico do profissional de saúde. Não substitui avaliação individual, exames nem prescrição médica. Valores de alimentos são médias aproximadas (TACO e USDA); confira rótulos e tabelas oficiais.</p></footer>';};

function landing(S){var p=S.p,c=T.c,m=c.macros(p),fi=T.faseIdx(p),f=T.fases[fi],di=DOSES.indexOf(String(p.dose));
 var top='<header class="ltop"><span class="brand">Guia Tirzepatida</span><div class="tools"><button class="btn sm" data-act="theme">'+themeLabel(S)+'</button><button class="btn pri sm" data-act="openapp">Abrir o aplicativo</button></div></header>';
 var stairs='<div class="stairs" role="group" aria-label="Dose semanal de tirzepatida">'+DOSES.map(function(d,i){return '<button type="button" data-set="p.dose" data-v="'+d+'" aria-pressed="'+(String(p.dose)===d)+'" style="height:'+(54+i*17)+'px"><b class="mono">'+d.replace('.',',')+'</b><span>mg</span></button>';}).join('')+'</div>';
 var hero='<section class="hero"><div class="hero-t"><p class="eyebrow">Nutrição clínica · tirzepatida</p><h1>Da anamnese ao acompanhamento, em um só lugar</h1><p class="lead">Calculadoras, tabelas de alimentos, avaliação da composição corporal e ficha de anamnese, todas ligadas ao mesmo paciente. Mude a dose, o peso ou um sintoma e as metas, os alertas e o resumo da consulta se atualizam.</p>'+
  '<div class="row" style="margin-top:20px"><button class="btn pri lg" data-act="openapp">Abrir o aplicativo</button><button class="btn lg" data-act="go" data-v="comp">Ver a composição corporal</button></div>'+
  '<ul class="facts"><li><b>12</b> ferramentas</li><li><b>6</b> casos clínicos</li><li><b>3</b> fases de anamnese</li><li>Dados só no seu navegador</li></ul></div>'+
  '<div class="panel hero-c stack"><div class="row sp"><h2>Escolha a dose e veja o plano</h2>'+T.pill('Exemplo ao vivo','info')+'</div>'+stairs+
  '<div class="kpis" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr))"><div class="kpi"><div class="l">Fase</div><div class="v" style="font-size:1.05rem;font-family:var(--f-display)">'+f.nome+'</div><div class="d">Semanas '+f.sem+'</div></div><div class="kpi hi"><div class="l">Proteína</div><div class="v">'+fmt(m.pg)+'<small>g/dia</small></div><div class="d">'+fmt(c.gkg(p),2)+' g/kg</div></div><div class="kpi"><div class="l">Meta</div><div class="v">'+fmt(m.kcal)+'<small>kcal</small></div><div class="d">Déficit de '+fmt(num(p.deficit))+' kcal</div></div></div>'+
  '<div class="grid3" style="grid-template-columns:1fr 1fr">'+T.in('p.peso',{l:'Peso (kg)'})+T.rng('p.deficit',{l:'Déficit',min:0,max:1000,step:50,u:' kcal',def:500})+'</div><p class="sm muted">'+f.foco+'</p></div></section>';
 var tiles='<section class="lsec"><h2>Tudo no mesmo ambiente</h2><p class="sub">Doze ferramentas em quatro grupos. Escolha uma para abrir o aplicativo já nela.</p>'+GROUPS.map(function(g){return '<div class="lgroup"><h3>'+g[0]+'</h3><div class="tiles">'+g[1].map(function(id){return '<button type="button" class="tile" data-act="go" data-v="'+id+'"><b>'+T.mods[id].tab+'</b><span>'+BLURB[id]+'</span></button>';}).join('')+'</div></div>';}).join('')+'</section>';
 var flow='<section class="lsec"><h2>Como as ferramentas se ligam</h2><ol class="flow"><li><b>Perfil e dose</b><span>Sexo, idade, peso, altura, dose e semana de uso definem a fase do tratamento.</span></li><li><b>Metas</b><span>Calorias, proteína por g/kg, fibras e água saem do perfil e da fase.</span></li><li><b>Consulta</b><span>Sintomas, exames, composição corporal e anamnese entram no mesmo cadastro.</span></li><li><b>Alertas e resumo</b><span>O painel aponta o que exige atenção, sugere a textura das refeições, o retorno e gera o resumo para o prontuário.</span></li></ol></section>';
 var priv='<section class="lsec lcols"><div><h2>Seus dados ficam com você</h2><p class="sub">Nada é enviado a servidor. As informações ficam no navegador deste aparelho, com opção de backup e de importação. A página abre com um paciente fictício de exemplo.</p></div><div class="stack"><div class="card"><h3>Para a consulta</h3><p class="sm muted">Preencha ao vivo e copie o resumo ou a mensagem ao paciente.</p></div><div class="card"><h3>Para a apresentação</h3><p class="sm muted">O modo apresentação amplia a tela e esconde os campos de edição.</p></div></div></section>';
 var cta='<section class="lcta"><h2>Pronto para a próxima consulta</h2><div class="row" style="justify-content:center"><button class="btn pri lg" data-act="openapp">Abrir o aplicativo</button></div></section>';
 return '<div class="land">'+top+hero+tiles+flow+priv+cta+foot()+'</div>';}

function appView(S){var cur=T.mods[S.ui.tab]?S.ui.tab:'dash',m=T.mods[cur],pres=T.pres;
 var nav=GROUPS.map(function(g){return '<div class="sg"><p class="sgt">'+g[0]+'</p>'+g[1].map(function(id){return '<button type="button" class="sl" data-act="go" data-v="'+id+'"'+(id===cur?' aria-current="page"':'')+'>'+T.mods[id].tab+'</button>';}).join('')+'</div>';}).join('');
 var side='<aside class="side noprs"><div class="sbrand"><b>Guia Tirzepatida</b><span>Nutrição clínica</span></div><nav aria-label="Ferramentas">'+nav+'</nav></aside>';
 var head='<div class="mtop"><div><p class="eyebrow">'+(GROUPS.filter(function(g){return g[1].indexOf(cur)>=0;})[0]||[''])[0]+'</p><h1 class="h1s">'+m.title+'</h1>'+(m.desc?'<p class="sub">'+m.desc+'</p>':'')+'</div><div class="tools"><button class="btn" data-act="home">Início</button><button class="btn" data-act="theme">'+themeLabel(S)+'</button><button class="btn" data-act="pres">'+(pres?'Sair da apresentação':'Modo apresentação')+'</button><button class="btn noprs" data-act="dados">Dados e backup</button></div></div>';
 return '<div class="appx">'+side+'<section class="mainx">'+head+T.strip(S)+T.dados(S)+'<main id="view">'+m.html(S)+'</main>'+foot()+'</section></div>';}

T.shellApp=function(){var S=T.S;applyTheme(S);return S.ui.view==='app'?appView(S):landing(S);};
})();
