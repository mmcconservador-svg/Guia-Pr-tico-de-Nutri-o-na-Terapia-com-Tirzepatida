(function(){
'use strict';
var T = window.T = {mods:{}, order:[], acts:{}, texts:{}, cfg:{}};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var num=function(v,d){var n=parseFloat(String(v).replace(',','.'));return isFinite(n)?n:(d||0);};
var fmt=function(v,d){d=d||0;return (typeof v==='number'&&isFinite(v))?v.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';};
T.esc=esc;T.num=num;T.fmt=fmt;
T.addDays=function(s,n){var d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
T.today=function(){var d=new Date(),z=function(n){return (n<10?'0':'')+n;};return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate());};
T.fdate=function(s){if(!s)return '—';var a=String(s).split('-');return a.length===3?a[2]+'/'+a[1]+'/'+a[0]:s;};
T.reg=function(m){T.mods[m.id]=m;T.order.push(m.id);};

/* ---------- Estado ---------- */
T.def=function(){return {
  p:{nome:'Paciente exemplo',sexo:'F',idade:38,peso:87.2,altura:164,ativ:1.375,eq:'mifflin',gc:38,deficit:500,nref:4,protG:1.3,base:'ajustado',lip:30,dose:'10',semana:12,pesoIni:94,meta:75,rim:'normal',exemplo:true},
  auto:{prot:true,alertas:true,sx:true,supp:true,retorno:true,peso:true},
  v:[
    {id:1,date:'2026-08-19',sem:0,dose:'2.5',peso:94.0,cc:106,gc:40.0,prot:62,agua:1.4,ap:7,en:7,sx:{nausea:0,vomito:0,diarreia:0,constip:2,refluxo:1,dor:0,saciedade:1,distensao:1},red:[],nota:'Início do tratamento.'},
    {id:2,date:'2026-09-16',sem:4,dose:'5',peso:91.9,cc:103,gc:39.5,prot:70,agua:1.8,ap:4,en:6,sx:{nausea:3,vomito:0,diarreia:1,constip:3,refluxo:2,dor:0,saciedade:5,distensao:2},red:[],nota:'Náusea leve após a aplicação.'},
    {id:3,date:'2026-10-14',sem:8,dose:'7.5',peso:89.4,cc:100.5,gc:38.8,prot:76,agua:2.0,ap:3,en:6,sx:{nausea:4,vomito:1,diarreia:0,constip:5,refluxo:3,dor:1,saciedade:6,distensao:3},red:[],nota:'Constipação; iniciou fibras e magnésio.'},
    {id:4,date:'2026-11-11',sem:12,dose:'10',peso:87.2,cc:98,gc:38.0,prot:82,agua:2.2,ap:3,en:7,sx:{nausea:2,vomito:0,diarreia:0,constip:4,refluxo:2,dor:0,saciedade:5,distensao:2},red:[],nota:'Dose aumentada para 10 mg.'}
  ],
  f:{},l:{vitd:24,b12:310,ferr:22,hb:12.4,mg:1.9,zn:78,fol:7,ca:9.2},a:{},
  dc:{tri:[29,28,27],bic:[15,14,13],sub:[31,30,29],pei:[19,18,17],axi:[23,22,21],sup:[33,32,31],abd:[39,38,37],cox:[41,40,39],pan:[25,24,23]},cm:{pesc:33,cint:98,quad:112},
  pf:{},ff:{},fb:{},cb:{},md:[],ui:{tab:'dash',perfil:'sedentario',eqsel:'auto'}
};};
var merge=function(a,b){if(b==null)return a;if(Array.isArray(b)||typeof b!=='object')return b;if(typeof a!=='object'||a==null||Array.isArray(a))return b;for(var k in b){a[k]=merge(a[k],b[k]);}return a;};
T.load=function(key){T.key=key;var sv=null;try{sv=JSON.parse(localStorage.getItem(key)||'null');}catch(e){}T.S=T.def();if(sv)T.S=merge(T.S,sv);};
var saveT=null;
T.save=function(){clearTimeout(saveT);saveT=setTimeout(function(){try{localStorage.setItem(T.key,JSON.stringify(T.S));}catch(e){}},250);};
T.get=function(path){return path.split('.').reduce(function(o,k){return o==null?o:o[k];},T.S);};
T.setq=function(path,val){var ps=path.split('.'),o=T.S;for(var i=0;i<ps.length-1;i++){if(o[ps[i]]==null||typeof o[ps[i]]!=='object')o[ps[i]]={};o=o[ps[i]];}o[ps[ps.length-1]]=val;T.save();};
T.set=function(path,val){T.setq(path,val);T.render();};

/* ---------- Cálculos clínicos ---------- */
T.doses=[['2.5','2,5 mg'],['5','5 mg'],['7.5','7,5 mg'],['10','10 mg'],['12.5','12,5 mg'],['15','15 mg'],['0','Sem tirzepatida']];
T.fases=[
 {nome:'Início',doses:['2.5'],sem:'1–4',min:1.0,max:1.2,foco:'Criar o hábito de proteína em todas as refeições; dose de iniciação, apetite ainda pouco alterado.'},
 {nome:'Escalonamento inicial',doses:['5'],sem:'5–8',min:1.2,max:1.4,foco:'Saciedade aumenta: proteína primeiro no prato; 25 a 30 g por refeição; suplemento se a ingestão ficar abaixo de 70% da meta.'},
 {nome:'Perda acelerada',doses:['7.5','10'],sem:'9–16',min:1.3,max:1.6,foco:'Maior velocidade de perda: 4 a 5 mini-refeições, treino de força 2 a 3 vezes por semana, avaliar composição corporal.'},
 {nome:'Doses altas',doses:['12.5','15'],sem:'17+',min:1.5,max:1.6,foco:'Maior risco de perda de massa magra: manter a meta mesmo com pouco apetite; reavaliar bioimpedância a cada 8 a 12 semanas.'},
 {nome:'Manutenção ou pós-uso',doses:['0'],sem:'—',min:1.2,max:1.6,foco:'Manter proteína e treino para preservar a massa magra e conter o reganho de peso.'}
];
T.faseIdx=function(p){var i=T.fases.findIndex(function(f){return f.doses.indexOf(String(p.dose))>=0;});return i<0?0:i;};
T.c={
 imc:function(w,h){w=num(w);h=num(h);return h>0?w/Math.pow(h/100,2):0;},
 ideal:function(h){return 22*Math.pow(num(h)/100,2);},
 ajust:function(w,h){var i=T.c.ideal(h);w=num(w);return w>i?i+0.25*(w-i):w;},
 base:function(p){return p.base==='atual'?num(p.peso):p.base==='ideal'?T.c.ideal(p.altura):T.c.ajust(p.peso,p.altura);},
 tmb:function(p){var w=num(p.peso),h=num(p.altura),a=num(p.idade),M=p.sexo==='M';
  if(p.eq==='hb')return M?88.362+13.397*w+4.799*h-5.677*a:447.593+9.247*w+3.098*h-4.330*a;
  if(p.eq==='cun')return 500+22*(w*(1-num(p.gc)/100));
  return 10*w+6.25*h-5*a+(M?5:-161);},
 get:function(p){return T.c.tmb(p)*num(p.ativ,1.2);},
 meta:function(p){return T.c.get(p)-num(p.deficit);},
 piso:function(p){return p.sexo==='M'?1500:1200;},
 gkg:function(p){if(T.S.auto.prot){var f=T.fases[T.faseIdx(p)];return (f.min+f.max)/2;}return num(p.protG,1.2);},
 prot:function(p){return T.c.gkg(p)*T.c.base(p);},
 macros:function(p){var kcal=Math.max(0,T.c.meta(p)),pg=T.c.prot(p),pk=pg*4,fk=kcal*num(p.lip,30)/100,ck=Math.max(0,kcal-pk-fk);
  return {kcal:kcal,pg:pg,pk:pk,fg:fk/9,fk:fk,cg:ck/4,ck:ck,neg:kcal-pk-fk<0};},
 fibra:function(p){return Math.max(14*Math.max(0,T.c.meta(p))/1000,p.sexo==='F'?25:30);},
 agua:function(p){return Math.min(3,Math.max(2,0.035*T.c.ajust(p.peso,p.altura)));}
};
T.vs=function(){return (T.S.v||[]).slice().sort(function(a,b){return (a.date||'')<(b.date||'')?-1:1;});};
T.SX=[['nausea','Náusea'],['vomito','Vômito'],['diarreia','Diarreia'],['constip','Constipação'],['refluxo','Refluxo ou azia'],['dor','Dor abdominal'],['saciedade','Saciedade precoce'],['distensao','Distensão e gases']];
T.RED=['Dor abdominal intensa e persistente','Vômitos persistentes, sem conseguir se hidratar','Sinais de desidratação (urina escura, tontura, pouca urina)','Dor no lado direito do abdome, febre ou icterícia','Hipoglicemia (em uso de insulina ou sulfonilureia)','Reação alérgica grave','Alteração visual súbita','Humor deprimido ou ideação suicida'];
T.texture=function(){if(T.S.auto.sx===false)return {t:'sol',why:'Sugestão automática desligada.'};var L=T.vs().pop();if(!L||!L.sx)return {t:'sol',why:'Sem sintomas registrados: textura sólida.'};var s=L.sx;
 if(num(s.vomito)>=5||num(s.nausea)>=7)return {t:'liq',why:'Náusea ou vômito intensos na última consulta.'};
 if(num(s.nausea)>=4||num(s.saciedade)>=7||num(s.vomito)>=3)return {t:'past',why:'Náusea moderada ou saciedade muito precoce na última consulta.'};
 return {t:'sol',why:'Sintomas leves na última consulta.'};};
T.retorno=function(){var v=T.vs(),L=v[v.length-1],P=v[v.length-2];if(!L)return null;var mx=0;for(var k in (L.sx||{}))mx=Math.max(mx,num(L.sx[k]));
 var dias=(P&&String(P.dose)!==String(L.dose))||mx>=5?14:28;return {date:T.addDays(L.date,dias),dias:dias,why:dias===14?'Mudança de dose ou sintoma moderado: retorno em 2 semanas.':'Dose estável: retorno em 4 semanas.'};};

T.alerts=function(){var S=T.S,p=S.p,out=[],c=T.c,v=T.vs(),L=v[v.length-1],P=v[v.length-2],F=v[0];
 if(S.auto.alertas===false)return out;
 var kcal=c.meta(p),piso=c.piso(p);
 if(num(p.peso)>0&&kcal<piso)out.push({lvl:'bad',t:'Meta de '+fmt(kcal)+' kcal está abaixo do piso de '+piso+' kcal/dia. Reduza o déficit ou mantenha somente com supervisão.',go:'get'});
 var mc=c.macros(p);if(mc.neg)out.push({lvl:'warn',t:'Proteína e lipídios somam mais que a meta calórica. Reduza o percentual de lipídios.',go:'get'});
 if(p.rim==='drc'&&c.gkg(p)>0.8)out.push({lvl:'warn',t:'Função renal reduzida (TFG abaixo de 60): meta de proteína acima de 0,8 g/kg exige alinhamento com o nefrologista.',go:'prot'});
 if(L){
  var red=L.red||[];if(red.length)out.push({lvl:'bad',t:'Sinal de alerta registrado em '+T.fdate(L.date)+': '+red.join('; ')+'. Comunicar o prescritor ou orientar atendimento.',go:'se'});
  var sx=L.sx||{};T.SX.forEach(function(x){var n=num(sx[x[0]]);if(n>=7)out.push({lvl:'bad',t:x[1]+' intensa (nota '+n+'/10). Rever o manejo e avisar o prescritor.',go:'se'});else if(n>=4&&x[0]!=='constip')out.push({lvl:'warn',t:x[1]+' moderada (nota '+n+'/10).',go:'se'});});
  if(num(sx.constip)>=4)out.push({lvl:'info',t:'Constipação nota '+num(sx.constip)+'/10: aumentar água e fibras de forma gradual, avaliar magnésio.',go:'se'});
  if(P){var rate=(num(P.peso)-num(L.peso))/num(P.peso)*100/Math.max(1,num(L.sem)-num(P.sem));if(rate>1)out.push({lvl:'warn',t:'Perda de '+fmt(rate,2)+'% do peso por semana, acima de 1%. Revisar ingestão de proteína e preservar a massa magra.',go:'prot'});}
  if(F&&F!==L&&num(F.gc)&&num(L.gc)){var loss=num(F.peso)-num(L.peso),mmF=num(F.peso)*(1-num(F.gc)/100),mmL=num(L.peso)*(1-num(L.gc)/100);if(loss>2&&(mmF-mmL)/loss>0.30)out.push({lvl:'warn',t:'Cerca de '+fmt((mmF-mmL)/loss*100)+'% do peso perdido é massa magra (limite de atenção: 30%). Reforçar proteína e treino de força.',go:'prot'});}
  var alvo=c.prot(p);if(num(L.prot)>0&&alvo>0){var r=num(L.prot)/alvo;if(r<0.7)out.push({lvl:'warn',t:'Proteína de '+fmt(num(L.prot))+' g/dia é '+fmt(r*100)+'% da meta ('+fmt(alvo)+' g). Considerar refeições líquidas e suplemento.',go:'meals'});else if(r<0.9)out.push({lvl:'info',t:'Proteína de '+fmt(num(L.prot))+' g/dia está em '+fmt(r*100)+'% da meta de '+fmt(alvo)+' g.',go:'prot'});}
  if(num(L.agua)>0&&num(L.agua)<1.5)out.push({lvl:'warn',t:'Hidratação de '+fmt(num(L.agua),1)+' L/dia. Meta: '+fmt(c.agua(p),1)+' L.',go:'se'});
  if(num(p.meta)>0&&num(L.peso)<=num(p.meta))out.push({lvl:'ok',t:'Meta de peso atingida. Planejar a transição para manutenção (Anamnese, aba Após).',go:'anam'});
 }
 if(S.auto.supp!==false&&T.evalLabs){var ev=T.evalLabs(S.l,p);ev.forEach(function(e){if(e.st==='def'||e.st==='low')out.push({lvl:'info',t:e.nome+': '+e.txt+'. Avaliar suplementação.',go:'supp'});});}
 (T.extra||[]).forEach(function(f){try{out=out.concat(f()||[]);}catch(e){}});
 var o={bad:0,warn:1,info:2,ok:3};out.sort(function(a,b){return o[a.lvl]-o[b.lvl];});return out;};

T.resumo=function(){var S=T.S,p=S.p,c=T.c,v=T.vs(),L=v[v.length-1],m=c.macros(p),ln=[];
 ln.push('RESUMO NUTRICIONAL — '+(p.nome||'Paciente'));
 ln.push('Tirzepatida '+(p.dose==='0'?'(sem uso atual)':fmt(num(p.dose),1)+' mg/sem')+' · semana '+num(p.semana)+' · fase: '+T.fases[T.faseIdx(p)].nome);
 ln.push('Peso '+fmt(num(p.peso),1)+' kg · IMC '+fmt(c.imc(p.peso,p.altura),1)+' · inicial '+fmt(num(p.pesoIni),1)+' kg ('+fmt((num(p.pesoIni)-num(p.peso))/Math.max(1,num(p.pesoIni))*100,1)+'% perdido)');
 ln.push('Metas: '+fmt(m.kcal)+' kcal · proteína '+fmt(m.pg)+' g ('+fmt(c.gkg(p),1)+' g/kg) · carboidratos '+fmt(m.cg)+' g · lipídios '+fmt(m.fg)+' g · fibras '+fmt(c.fibra(p))+' g · água '+fmt(c.agua(p),1)+' L');
 if(L){var sx=L.sx||{},t=T.SX.filter(function(x){return num(sx[x[0]])>=3;}).map(function(x){return x[1]+' '+num(sx[x[0]])+'/10';});
  ln.push('Última consulta ('+T.fdate(L.date)+'): proteína '+fmt(num(L.prot))+' g, água '+fmt(num(L.agua),1)+' L, sintomas: '+(t.length?t.join(', '):'sem sintomas relevantes'));}
 var al=T.alerts();if(al.length){ln.push('Pontos de atenção:');al.slice(0,6).forEach(function(a){ln.push('- '+a.t);});}
 var r=T.retorno();if(r&&S.auto.retorno!==false)ln.push('Retorno sugerido: '+T.fdate(r.date)+' ('+r.why+')');
 return ln.join('\n');};
T.texts.resumo=T.resumo;
T.texts.paciente=function(){var p=T.S.p,c=T.c,m=c.macros(p),tx=T.texture(),nm={liq:'líquidas (shakes, caldos coados)',past:'pastosas (mingaus, purês, cremes)',sol:'sólidas, em porções pequenas'}[tx.t];
 return 'Olá'+(p.nome&&!T.S.p.exemplo?', '+p.nome.split(' ')[0]:'')+'! Resumo do seu plano nesta fase:\n\n'+
 '• Proteína: '+fmt(m.pg)+' g por dia (cerca de '+fmt(m.pg/num(p.nref,4))+' g em cada refeição). Coma a proteína primeiro.\n'+
 '• Água: '+fmt(c.agua(p),1)+' L por dia, em goles ao longo do dia.\n'+
 '• Fibras: '+fmt(c.fibra(p))+' g por dia, aumentando aos poucos.\n'+
 '• Refeições: '+num(p.nref,4)+' por dia, em porções pequenas e comendo devagar. Neste momento, prefira texturas '+nm+'.\n'+
 '• Treino de força 2 a 3 vezes por semana para proteger seus músculos.\n\n'+
 'Se tiver dor abdominal forte e contínua, vômitos que impedem de se hidratar ou urina bem escura, procure atendimento e avise seu médico.';};

/* ---------- Helpers de formulário ---------- */
var pid=function(p){return 'i_'+p.replace(/\W/g,'_');};
T.in=function(path,o){o=o||{};var v=T.get(path),tp=o.t||'number',dt=(tp==='text'||tp==='date')?'s':'n';
 return '<label class="fld '+(o.cls||'')+'">'+(o.l?'<span>'+o.l+'</span>':'')+'<input id="'+pid(path)+'" data-k="'+path+'" data-t="'+dt+'" type="'+tp+'"'+(o.step?' step="'+o.step+'"':(tp==='number'?' step="any"':''))+(o.min!=null?' min="'+o.min+'"':'')+(o.max!=null?' max="'+o.max+'"':'')+' value="'+esc(v==null?'':v)+'"'+(o.ph?' placeholder="'+esc(o.ph)+'"':'')+(o.inputmode?' inputmode="'+o.inputmode+'"':(tp==='number'?' inputmode="decimal"':''))+'></label>';};
T.sel=function(path,opts,o){o=o||{};var v=String(T.get(path)==null?'':T.get(path));
 return '<label class="fld '+(o.cls||'')+'">'+(o.l?'<span>'+o.l+'</span>':'')+'<select id="'+pid(path)+'" data-k="'+path+'" data-t="'+(o.t||'s')+'">'+(o.blank?'<option value="">—</option>':'')+opts.map(function(x){return '<option value="'+esc(x[0])+'"'+(String(x[0])===v?' selected':'')+'>'+esc(x[1])+'</option>';}).join('')+'</select></label>';};
T.ta=function(path,o){o=o||{};return '<label class="fld '+(o.cls||'')+'">'+(o.l?'<span>'+o.l+'</span>':'')+'<textarea id="'+pid(path)+'" data-k="'+path+'" rows="'+(o.rows||3)+'"'+(o.ph?' placeholder="'+esc(o.ph)+'"':'')+'>'+esc(T.get(path)||'')+'</textarea></label>';};
T.chk=function(path,label){return '<label class="row sm" style="gap:8px;cursor:pointer"><input type="checkbox" id="'+pid(path)+'" data-k="'+path+'" data-t="b"'+(T.get(path)?' checked':'')+'><span>'+label+'</span></label>';};
T.rng=function(path,o){var v=T.get(path);if(v===''||v==null)v=o.def!=null?o.def:o.min;return '<label class="fld '+(o.cls||'')+'"><span>'+o.l+' <b class="rv mono">'+String(v).replace('.',',')+(o.u||'')+'</b></span><input id="'+pid(path)+'" data-k="'+path+'" data-t="n" data-u="'+(o.u||'')+'" type="range" min="'+o.min+'" max="'+o.max+'" step="'+(o.step||1)+'" value="'+v+'"></label>';};
T.seg=function(path,opts,t){var v=String(T.get(path));return '<div class="seg" role="group">'+opts.map(function(x){return '<button type="button" data-set="'+path+'" data-v="'+esc(x[0])+'"'+(t?' data-t="'+t+'"':'')+' aria-pressed="'+(String(x[0])===v)+'">'+esc(x[1])+'</button>';}).join('')+'</div>';};
T.chips=function(path,opts){var a=T.get(path)||[];return '<div class="row">'+opts.map(function(x){return '<button type="button" class="chip" data-tog="'+path+'" data-v="'+esc(x[0])+'" aria-pressed="'+(a.indexOf(x[0])>=0)+'">'+esc(x[1])+'</button>';}).join('')+'</div>';};
T.cnt=function(path,id){var n=(T.get(path)||{})[id]||0;return '<span class="cnt"><button type="button" data-cnt="'+path+'" data-id="'+id+'" data-d="-1" aria-label="Diminuir">−</button><span>'+n+'</span><button type="button" data-cnt="'+path+'" data-id="'+id+'" data-d="1" aria-label="Aumentar">+</button></span>';};
T.pill=function(txt,k){return '<span class="pill '+(k||'')+'">'+txt+'</span>';};
T.alert=function(a){var lab={bad:'Urgente',warn:'Atenção',info:'Nota',ok:'Ok'}[a.lvl];return '<div class="al '+a.lvl+'">'+T.pill(lab,a.lvl)+'<div>'+esc(a.t)+'</div>'+(a.go&&T.cfg.mode==='hub'&&T.mods[a.go]?'<button class="btn sm" data-act="go" data-v="'+a.go+'">Abrir '+esc(T.mods[a.go].tab)+'</button>':'')+'</div>';};
T.copyBtn=function(name,label){return '<button class="btn sm" data-act="copy" data-v="'+name+'">'+(label||'Copiar texto')+'</button>';};
T.hm=function(n){n=num(n);return '<span class="hm h'+(n>=7?3:n>=4?2:n>=2?1:0)+'">'+n+'</span>';};
T.bar=function(parts){return '<div class="mbar">'+parts.map(function(x){return '<i style="width:'+Math.max(0,x[0])+'%;background:'+x[1]+'"></i>';}).join('')+'</div>';};
T.progress=function(val,min,max){var top=Math.max(max*1.25,val*1.05,1);return '<div class="prog" role="img" aria-label="Progresso"><i style="width:'+Math.min(100,val/top*100)+'%"></i><u style="left:'+min/top*100+'%"></u><u style="left:'+max/top*100+'%"></u></div>';};

/* ---------- Interface ---------- */
T.flash=function(msg){var t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');document.body.appendChild(t);}t.textContent=msg;t.className='toast on';clearTimeout(T._ft);T._ft=setTimeout(function(){t.className='toast';},2200);};
T.copy=function(text){var done=function(){T.flash('Texto copiado');};var fb=function(){var ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;opacity:0;top:0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done();}catch(e){T.flash('Selecione e copie manualmente');}document.body.removeChild(ta);};
 try{navigator.clipboard.writeText(text).then(done,fb);}catch(e){fb();}};
T.acts.pres=function(){T.pres=!T.pres;document.documentElement.classList.toggle('pres',T.pres);T.render();};
T.acts.go=function(b){T.set('ui.tab',b.dataset.v);window.scrollTo(0,0);};
T.acts.tab=T.acts.go;
T.acts.copy=function(b){var f=T.texts[b.dataset.v];if(f)T.copy(f());};
T.acts.blank=function(){var d=T.def();T.S.p=merge(d.p,{nome:'',peso:'',altura:'',idade:'',pesoIni:'',meta:'',exemplo:false,semana:1,dose:'2.5'});T.S.v=[];T.S.l={};T.S.dc={};T.S.cm={};T.S.f={};T.S.a={};T.S.pf={};T.S.ff={};T.S.fb={};T.S.cb={};T.S.md=[];T.save();T.render();T.flash('Ficha em branco');};
T.acts.reset=function(){T.S=T.def();T.save();T.render();};
T.acts.export=function(){T.copy(JSON.stringify(T.S));};
T.acts.import=function(){var el=document.getElementById('imp');try{var o=JSON.parse(el.value);T.S=merge(T.def(),o);T.save();T.render();T.flash('Dados importados');}catch(e){T.flash('Texto inválido. Cole o backup completo.');}};
T.acts.dados=function(){T.set('ui.dados',!T.S.ui.dados);};

T.shell=function(){
 var S=T.S,p=S.p,cfg=T.cfg,hub=cfg.mode==='hub',cur=hub?(T.mods[S.ui.tab]?S.ui.tab:'dash'):cfg.mod,m=T.mods[cur];
 var h='<div class="wrap"><header class="hd"><div><p class="eyebrow">Nutrição clínica · tirzepatida</p><h1>'+esc(hub?'Painel Tirzepatida':m.title)+'</h1>'+
  '<p class="sub">'+esc(hub?'Perfil do paciente, calculadoras, tabelas e anamnese ligados entre si. Altere um dado e as metas, alertas e sugestões se atualizam.':m.desc)+'</p></div>'+
  '<div class="tools"><button class="btn" data-act="pres">'+(T.pres?'Sair da apresentação':'Modo apresentação')+'</button>'+'<button class="btn noprs" data-act="dados">Dados e backup</button>'+'</div></header>';
 if(p.exemplo)h+='<div class="ban noprs"><span>Dados de exemplo. Substitua pelos dados do paciente.</span><button class="btn sm" data-act="blank">Começar ficha em branco</button></div>';
 h+='<section class="strip noprs" aria-label="Perfil do paciente">'+T.in('p.nome',{l:'Paciente',t:'text',cls:'wide'})+T.sel('p.sexo',[['F','Feminino'],['M','Masculino']],{l:'Sexo'})+
  T.in('p.idade',{l:'Idade (anos)'})+T.in('p.peso',{l:'Peso atual (kg)'})+T.in('p.altura',{l:'Altura (cm)'})+T.sel('p.dose',T.doses,{l:'Dose semanal'})+T.in('p.semana',{l:'Semana de uso'})+'</section>';
 if(S.ui.dados)h+='<section class="panel noprs" style="margin-bottom:14px"><h3>Dados e backup</h3><p class="sm muted">Os dados ficam apenas neste navegador e não são enviados a lugar nenhum. Copie o backup para guardar no prontuário ou levar a outro aparelho.</p><div class="row" style="margin:10px 0"><button class="btn" data-act="export">Copiar backup</button><button class="btn" data-act="reset">Restaurar exemplo</button></div><label class="fld"><span>Colar backup para importar</span><textarea id="imp" rows="3"></textarea></label><div style="margin-top:8px"><button class="btn pri" data-act="import">Importar</button></div></section>';
 if(hub)h+='<nav class="tabs" role="tablist">'+T.order.map(function(id){return '<button class="tab" role="tab" data-act="tab" data-v="'+id+'" aria-selected="'+(id===cur)+'">'+esc(T.mods[id].tab)+'</button>';}).join('')+'</nav>';
 h+='<main id="view">'+m.html(S)+'</main>';
 h+='<footer class="ft"><p>Material de apoio ao raciocínio clínico do profissional de saúde. Valores de alimentos são médias aproximadas (TACO e USDA); confira rótulos e tabelas oficiais. Doses e condutas devem ser individualizadas pela avaliação clínica, exames e prescrição médica. Calculadoras usam o peso ajustado (ideal + 25% do excesso) quando indicado.</p>'+(!hub&&cfg.hubUrl?'<p style="margin-top:6px"><a href="'+cfg.hubUrl+'" target="_blank" rel="noopener">Abrir o Painel Tirzepatida com todas as ferramentas ligadas</a></p>':'')+'</footer></div>';
 return h;};
T.render=function(){var app=document.getElementById('app');if(!app)return;var a=document.activeElement,keep=null,sy=window.scrollY,tl=app.querySelector('.tabs'),tsl=tl?tl.scrollLeft:0;
 if(a&&a.id&&app.contains(a))keep={id:a.id,v:a.value,s:a.selectionStart,e:a.selectionEnd,ty:a.type};
 var tw=[].map.call(app.querySelectorAll('.tw'),function(x){return x.scrollLeft;});
 app.innerHTML=T.shell();
 if(keep){var n=document.getElementById(keep.id);if(n){n.focus();if(keep.ty!=='range'&&keep.ty!=='checkbox'&&n.tagName!=='SELECT'){n.value=keep.v;try{n.setSelectionRange(keep.s,keep.e);}catch(e){}}}}
 var tl2=app.querySelector('.tabs');if(tl2)tl2.scrollLeft=tsl;
 [].forEach.call(app.querySelectorAll('.tw'),function(x,i){if(tw[i])x.scrollLeft=tw[i];});
 window.scrollTo(0,sy);};
var onIn=function(e){var el=e.target;if(!el||!el.dataset||!el.dataset.k||e.isComposing)return;var k=el.dataset.k,t=el.dataset.t||'s',v;
 if(el.type==='checkbox')v=el.checked;else v=el.value;
 if(t==='n'){v=(v===''?'':parseFloat(v));if(v!==''&&!isFinite(v))v='';}
 if(el.type==='range'&&e.type==='input'){var o=el.parentNode.querySelector('.rv');if(o)o.textContent=String(el.value).replace('.',',')+(el.dataset.u||'');return;}
 if(T.get(k)===v)return;
 if(el.tagName==='TEXTAREA'||el.type==='text'){T.setq(k,v);return;}
 T.set(k,v);};
T.boot=function(cfg){T.cfg=cfg;if(cfg.order){T.order=cfg.order.filter(function(id){return T.mods[id];}).concat(T.order.filter(function(id){return cfg.order.indexOf(id)<0;}));}T.load(cfg.key);var app=document.getElementById('app');
 document.addEventListener('input',onIn);document.addEventListener('change',onIn);
 document.addEventListener('compositionend',function(e){onIn({target:e.target,type:'input',isComposing:false});});
 document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act],[data-set],[data-tog],[data-cnt]');if(!b||!app.contains(b))return;var d=b.dataset;
  if(d.act){var f=T.acts[d.act];if(f)f(b,e);return;}
  if(d.set){var v=d.v;if(d.t==='n')v=parseFloat(v);T.set(d.set,v);return;}
  if(d.tog){var arr=(T.get(d.tog)||[]).slice(),i=arr.indexOf(d.v);if(i<0)arr.push(d.v);else arr.splice(i,1);T.set(d.tog,arr);return;}
  if(d.cnt){var o=Object.assign({},T.get(d.cnt)||{}),n=Math.max(0,(o[d.id]||0)+parseInt(d.d,10));if(n)o[d.id]=n;else delete o[d.id];T.set(d.cnt,o);}});
 T.render();};
})();
