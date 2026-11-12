(function(){
var T=window.T,num=T.num,fmt=T.fmt,esc=T.esc;
var NS='http://www.w3.org/2000/svg';
var fmtD=function(s){var a=String(s||'').split('-');return a.length===3?a[2]+'/'+a[1]:s;};

/* Gráfico de linhas desenhado à mão: uma escala para marcas, eixos e rótulos. */
function lines(o){var W=640,H=o.h||230,L=44,R=o.right||64,Tp=18,B=48,iw=W-L-R,ih=H-Tp-B,n=o.x.length;
 var vals=[];o.series.forEach(function(s){s.v.forEach(function(v){if(v!=null)vals.push(v);});});(o.refs||[]).forEach(function(r){vals.push(r.v);});
 if(!vals.length)return '<p class="muted sm">Sem dados para o gráfico.</p>';
 var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals),pad=Math.max((mx-mn)*0.12,1);mn=Math.floor(mn-pad);mx=Math.ceil(mx+pad);if(mx-mn<4)mx=mn+4;
 var X=function(i){return L+(n===1?iw/2:iw*i/(n-1));},Y=function(v){return Tp+ih*(1-(v-mn)/(mx-mn));};
 var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(o.alt)+'" style="width:100%;height:auto;display:block">';
 var st=(mx-mn)/4;for(var k=0;k<=4;k++){var v=mn+st*k,y=Y(v);s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y+'" y2="'+y+'" style="stroke:var(--line)" stroke-width="1"/><text x="'+(L-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" style="fill:var(--muted)">'+fmt(v,st<1?1:0)+'</text>';}
 (o.refs||[]).forEach(function(r){var y=Y(r.v);s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y+'" y2="'+y+'" style="stroke:'+r.c+'" stroke-width="1.5" stroke-dasharray="5 4"/><text x="'+(W-R+6)+'" y="'+(y+4)+'" font-size="11" style="fill:'+r.c+'">'+r.l+'</text>';});
 o.x.forEach(function(t,i){s+='<text x="'+X(i)+'" y="'+(H-B+16)+'" text-anchor="middle" font-size="11" style="fill:var(--muted)">'+esc(t[0])+'</text>';if(t[1])s+='<text x="'+X(i)+'" y="'+(H-B+30)+'" text-anchor="middle" font-size="10" style="fill:var(--muted)">'+esc(t[1])+'</text>';});
 o.series.forEach(function(se){var pts=[];se.v.forEach(function(v,i){if(v!=null)pts.push([X(i),Y(v),v]);});
  if(pts.length>1)s+='<polyline fill="none" style="stroke:'+se.c+'" stroke-width="2.5" stroke-linejoin="round" points="'+pts.map(function(p){return p[0]+','+p[1];}).join(' ')+'"/>';
  pts.forEach(function(p,i){var last=i===pts.length-1;s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(last?5:3.5)+'" style="fill:'+(last?se.c:'var(--surface)')+';stroke:'+se.c+'" stroke-width="2"/>';
   if(o.labels!==false&&(last||i===0||pts.length<=5))s+='<text x="'+p[0]+'" y="'+(p[1]-9)+'" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--fg)">'+fmt(p[2],1)+'</text>';});
  if(se.n&&pts.length){var lp=pts[pts.length-1];s+='<text x="'+(lp[0]+10)+'" y="'+(lp[1]+4)+'" font-size="11" font-weight="600" style="fill:'+se.c+'">'+se.n+'</text>';}});
 return s+'</svg>';}

function bars(o){var W=640,H=230,L=44,R=64,Tp=18,B=48,iw=W-L-R,ih=H-Tp-B,n=o.x.length;if(!n)return '<p class="muted sm">Sem dados para o gráfico.</p>';
 var mx=Math.max(o.ref*1.2,Math.max.apply(null,o.v.map(function(v){return v||0;}))*1.1,10);mx=Math.ceil(mx/10)*10;var Y=function(v){return Tp+ih*(1-v/mx);},bw=Math.min(54,iw/n*0.55);
 var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(o.alt)+'" style="width:100%;height:auto;display:block">';
 for(var k=0;k<=4;k++){var v=mx/4*k,y=Y(v);s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y+'" y2="'+y+'" style="stroke:var(--line)"/><text x="'+(L-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" style="fill:var(--muted)">'+fmt(v)+'</text>';}
 o.x.forEach(function(t,i){var cx=L+iw*(i+0.5)/n,v=o.v[i];s+='<text x="'+cx+'" y="'+(H-B+16)+'" text-anchor="middle" font-size="11" style="fill:var(--muted)">'+esc(t[0])+'</text><text x="'+cx+'" y="'+(H-B+30)+'" text-anchor="middle" font-size="10" style="fill:var(--muted)">'+esc(t[1]||'')+'</text>';
  if(v){var low=v<o.ref*0.7;s+='<rect x="'+(cx-bw/2)+'" y="'+Y(v)+'" width="'+bw+'" height="'+(Tp+ih-Y(v))+'" rx="3" style="fill:'+(low?'var(--warn)':'var(--c-prot)')+'"/><text x="'+cx+'" y="'+(Y(v)-6)+'" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--fg)">'+fmt(v)+'</text>';}});
 var yr=Y(o.ref);s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yr+'" y2="'+yr+'" style="stroke:var(--fg)" stroke-width="1.5" stroke-dasharray="5 4"/><text x="'+(W-R+6)+'" y="'+(yr+4)+'" font-size="11" style="fill:var(--fg)">meta '+fmt(o.ref)+' g</text>';
 return s+'</svg>';}

T.reg({id:'dash',tab:'Painel',title:'Painel Tirzepatida',desc:'',
html:function(S){var p=S.p,c=T.c,v=T.vs(),L=v[v.length-1],m=c.macros(p),fi=T.faseIdx(p),al=T.alerts(),ret=T.retorno(),tx=T.texture();
 var ini=num(p.pesoIni)||(v[0]?num(v[0].peso):num(p.peso)),dkg=ini-num(p.peso),dpc=ini?dkg/ini*100:0,meta=num(p.meta),prog=meta&&ini>meta?(ini-num(p.peso))/(ini-meta)*100:0,alvo=c.prot(p);
 var kp='<div class="kpis"><div class="kpi hi"><div class="l">Peso atual</div><div class="v">'+fmt(num(p.peso),1)+'<small>kg</small></div><div class="d">'+(dkg>0?'−':'+')+fmt(Math.abs(dkg),1)+' kg · '+fmt(Math.abs(dpc),1)+'% desde o início</div></div>'+
  '<div class="kpi"><div class="l">IMC</div><div class="v">'+fmt(c.imc(p.peso,p.altura),1)+'<small>kg/m²</small></div><div class="d">'+(meta?'Meta de '+fmt(meta,1)+' kg ('+fmt(Math.min(100,Math.max(0,prog)))+'% do caminho)':'Meta de peso não definida')+'</div></div>'+
  '<div class="kpi"><div class="l">Meta calórica</div><div class="v">'+fmt(m.kcal)+'<small>kcal</small></div><div class="d">GET '+fmt(c.get(p))+' − '+fmt(num(p.deficit))+'</div></div>'+
  '<div class="kpi"><div class="l">Proteína alvo</div><div class="v">'+fmt(alvo)+'<small>g</small></div><div class="d">'+(L&&num(L.prot)?'Última ingestão '+fmt(num(L.prot))+' g ('+fmt(num(L.prot)/alvo*100)+'%)':fmt(c.gkg(p),2)+' g/kg')+'</div></div>'+
  '<div class="kpi"><div class="l">Gordura corporal</div><div class="v">'+(num(p.gc)?fmt(num(p.gc),1):'—')+'<small>%</small></div><div class="d">'+(num(p.gc)?'Massa magra '+fmt(num(p.peso)*(1-num(p.gc)/100),1)+' kg':'Faça a avaliação de composição')+'</div></div>'+
  '<div class="kpi"><div class="l">Tratamento</div><div class="v">'+(p.dose==='0'?'—':String(p.dose).replace('.',',')+'<small>mg</small>')+'</div><div class="d">Semana '+num(p.semana)+' · '+T.fases[fi].nome+'</div></div></div>';
 var ph='<div class="row" style="gap:6px">'+T.fases.map(function(f,i){return '<span class="pill '+(i===fi?'ok':'')+'">'+f.nome+(i===fi?' · '+fmt(f.min,1)+' a '+fmt(f.max,1)+' g/kg':'')+'</span>';}).join('')+'</div>';
 var A='<div class="panel stack"><div class="row sp"><h2>Pontos de atenção</h2>'+T.pill(al.length+(al.length===1?' alerta':' alertas'),al.some(function(a){return a.lvl==='bad';})?'bad':al.length?'warn':'ok')+'</div>'+(al.length?al.slice(0,8).map(T.alert).join(''):'<div class="al ok">'+T.pill('Ok','ok')+'<div>Nenhum ponto de atenção com os dados atuais.</div></div>')+'</div>';
 var xs=v.map(function(r){return ['S'+num(r.sem),(String(r.dose)==='0'?'':String(r.dose).replace('.',',')+' mg')];});
 var wC=v.length?lines({alt:'Peso ao longo das consultas',x:xs,series:[{v:v.map(function(r){return num(r.peso)||null;}),c:'var(--accent)',n:'Peso'}],refs:meta?[{v:meta,c:'var(--warn)',l:'meta '+fmt(meta,0)}]:[]}):'<p class="muted">Registre consultas na aba Consultas para ver a evolução do peso.</p>';
 var pC=v.length?bars({alt:'Proteína ingerida em cada consulta contra a meta',x:xs,v:v.map(function(r){return num(r.prot);}),ref:alvo}):'';
 var cv=v.filter(function(r){return num(r.gc)>0&&num(r.peso)>0;});
 var bC=cv.length?lines({alt:'Massa magra e massa gorda ao longo das consultas',x:cv.map(function(r){return ['S'+num(r.sem),''];}),series:[{v:cv.map(function(r){return num(r.peso)*(1-num(r.gc)/100);}),c:'var(--c-prot)',n:'magra'},{v:cv.map(function(r){return num(r.peso)*num(r.gc)/100;}),c:'var(--c-carb)',n:'gorda'}],right:56}):'<p class="muted sm">Informe o percentual de gordura nas consultas para ver massa magra e massa gorda.</p>';
 var hm=v.length?'<div class="tw"><table class="dt"><thead><tr><th>Consulta</th>'+T.SX.map(function(x){return '<th class="n">'+x[1].split(' ')[0]+'</th>';}).join('')+'</tr></thead><tbody>'+v.slice().reverse().map(function(r){return '<tr><td>'+T.fdate(r.date)+' · S'+num(r.sem)+'</td>'+T.SX.map(function(x){return '<td class="n">'+T.hm((r.sx||{})[x[0]])+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>':'';
 var charts='<div class="cols" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))"><div class="panel"><h2>Peso por consulta (kg)</h2>'+wC+'</div><div class="panel"><h2>Proteína ingerida (g/dia)</h2>'+(pC||'<p class="muted">Sem consultas registradas.</p>')+'<p class="sm muted">Barras em âmbar indicam ingestão abaixo de 70% da meta.</p></div><div class="panel"><h2>Massa magra e massa gorda (kg)</h2>'+bC+'</div><div class="panel"><h2>Sintomas por consulta (0 a 10)</h2>'+(hm||'<p class="muted">Sem consultas registradas.</p>')+'</div></div>';
 var auto='<div class="panel stack"><h2>Automações</h2><p class="sm muted">Estas regras ligam as ferramentas entre si. Desligue as que não quiser.</p>'+
  T.chk('auto.prot','Proteína em g/kg definida pela fase da dose')+T.chk('auto.alertas','Gerar alertas a partir de consultas, exames e anamnese')+T.chk('auto.supp','Sinalizar suplementação quando um exame estiver baixo')+T.chk('auto.sx','Sugerir a textura das refeições pelos sintomas')+T.chk('auto.retorno','Sugerir a data de retorno')+T.chk('auto.peso','Atualizar o perfil ao registrar uma consulta')+
  '<div class="stack" style="gap:8px;margin-top:6px">'+(ret&&S.auto.retorno!==false?'<div class="al info">'+T.pill('Retorno','info')+'<div><b>'+T.fdate(ret.date)+'.</b> '+ret.why+'</div></div>':'')+
  '<div class="al info">'+T.pill('Textura','info')+'<div><b>'+({liq:'Líquidas',past:'Pastosas',sol:'Sólidas'}[tx.t])+'.</b> '+tx.why+'</div>'+(T.hubish()?'<button class="btn sm" data-act="go" data-v="meals">Ver opções</button>':'')+'</div></div></div>';
 var res='<div class="panel stack"><div class="row sp"><h2>Resumo para o prontuário</h2><div class="row">'+T.copyBtn('resumo','Copiar resumo')+T.copyBtn('paciente','Copiar mensagem ao paciente')+'</div></div><pre class="txt">'+esc(T.resumo())+'</pre></div>';
 return '<div class="stack">'+kp+ph+A+charts+'<div class="cols">'+auto+res+'</div></div>';}});

/* ---------- Consultas ---------- */
T.acts.addv=function(){var S=T.S,n=S.ui.nv||{},id=1;(S.v||[]).forEach(function(x){id=Math.max(id,x.id+1);});
 if(!n.date||!(num(n.peso)>0)){T.flash('Informe a data e o peso');return;}
 var latest=T.vs().pop(),isNew=!latest||n.date>=latest.date;
 var rec={id:id,date:n.date,sem:num(n.sem),dose:String(n.dose),peso:num(n.peso),cc:n.cc===''?'':num(n.cc),gc:n.gc===''?'':num(n.gc),prot:n.prot===''?'':num(n.prot),agua:n.agua===''?'':num(n.agua),ap:num(n.ap),en:num(n.en),sx:Object.assign({},n.sx),red:(n.red||[]).slice(),nota:n.nota||''};
 S.v=(S.v||[]).concat([rec]);
 if(isNew&&S.auto.peso!==false){S.p.peso=rec.peso;S.p.semana=rec.sem;S.p.dose=rec.dose;if(rec.gc)S.p.gc=rec.gc;if(rec.cc){S.cm=S.cm||{};S.cm.cint=rec.cc;}if(!num(S.p.pesoIni))S.p.pesoIni=rec.peso;S.p.exemplo=false;}
 S.ui.nv=null;T.save();T.render();T.flash('Consulta registrada. Perfil, alertas e painel atualizados');};
T.acts.delv=function(b){var id=parseInt(b.dataset.v,10);if(T.S.ui.del!==id){T.set('ui.del',id);return;}
 T.S.v=(T.S.v||[]).filter(function(x){return x.id!==id;});T.S.ui.del=null;T.save();T.render();};
T.reg({id:'visits',tab:'Consultas',title:'Registro de consultas',desc:'',
html:function(S){var v=T.vs(),last=v[v.length-1];
 if(!S.ui.nv){var sx={};T.SX.forEach(function(x){sx[x[0]]=0;});S.ui.nv={date:T.today?T.today():new Date().toISOString().slice(0,10),sem:last?num(last.sem)+4:num(S.p.semana),dose:String(S.p.dose),peso:num(S.p.peso)||'',cc:last?last.cc:'',gc:num(S.p.gc)||'',prot:'',agua:'',ap:5,en:5,sx:sx,red:[],nota:''};}
 var f='<div class="panel stack"><h2>Nova consulta</h2><div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))">'+T.in('ui.nv.date',{l:'Data',t:'date'})+T.in('ui.nv.sem',{l:'Semana de uso'})+T.sel('ui.nv.dose',T.doses,{l:'Dose'})+T.in('ui.nv.peso',{l:'Peso (kg)'})+T.in('ui.nv.cc',{l:'Cintura (cm)'})+T.in('ui.nv.gc',{l:'Gordura corporal (%)'})+T.in('ui.nv.prot',{l:'Proteína (g/dia)'})+T.in('ui.nv.agua',{l:'Água (L/dia)'})+'</div>'+
  '<div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">'+T.rng('ui.nv.ap',{l:'Apetite',min:0,max:10,step:1,def:5})+T.rng('ui.nv.en',{l:'Energia',min:0,max:10,step:1,def:5})+'</div>'+
  '<h3>Sintomas (0 a 10)</h3><div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">'+T.SX.map(function(x){return T.rng('ui.nv.sx.'+x[0],{l:x[1],min:0,max:10,step:1,def:0});}).join('')+'</div>'+
  '<div class="fld"><span>Sinais de alerta</span>'+T.chips('ui.nv.red',T.RED.map(function(r){return [r,r];}))+'</div>'+T.ta('ui.nv.nota',{l:'Observações da consulta',rows:2})+
  '<div class="row"><button class="btn pri" data-act="addv">Registrar consulta</button><span class="sm muted">Atualiza o perfil, os alertas e o painel.</span></div></div>';
 var tb='<div class="panel"><h2>Histórico</h2>'+(v.length?'<div class="tw"><table class="dt"><thead><tr><th>Data</th><th class="n">Sem.</th><th>Dose</th><th class="n">Peso</th><th class="n">Cintura</th><th class="n">% gord.</th><th class="n">Prot. g</th><th class="n">Água L</th><th>Observação</th><th></th></tr></thead><tbody>'+v.slice().reverse().map(function(r){var d=S.ui.del===r.id;return '<tr><td>'+T.fdate(r.date)+'</td><td class="n">'+num(r.sem)+'</td><td>'+(String(r.dose)==='0'?'—':String(r.dose).replace('.',',')+' mg')+'</td><td class="n">'+fmt(num(r.peso),1)+'</td><td class="n">'+(r.cc===''?'—':fmt(num(r.cc),0))+'</td><td class="n">'+(r.gc===''?'—':fmt(num(r.gc),1))+'</td><td class="n">'+(r.prot===''?'—':fmt(num(r.prot)))+'</td><td class="n">'+(r.agua===''?'—':fmt(num(r.agua),1))+'</td><td style="min-width:200px">'+esc(r.nota||'')+((r.red||[]).length?'<div>'+T.pill('Alerta','bad')+'</div>':'')+'</td><td><button class="btn sm" data-act="delv" data-v="'+r.id+'">'+(d?'Confirmar exclusão':'Excluir')+'</button></td></tr>';}).join('')+'</tbody></table></div>':'<p class="muted">Nenhuma consulta registrada.</p>')+'</div>';
 return '<div class="stack">'+f+tb+'</div>';}});
})();
