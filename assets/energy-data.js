// ENERGY ARCADE - energy statistics, official 2024 figures. No runtime external dependencies.
const DATA={
 ru:{
  kicker:'05 / ЭНЕРГЕТИКА В ЦИФРАХ',heading:'Энергетика Южной Кореи: статистика',intro:'Структура производства и потребления электричества в 2024 году. Наведи курсор на сектор или нажми на строку легенды.',
  gtitle:'Производство электроэнергии по источникам',gsub:'Доли от всего произведённого электричества, 2024',ctitle:'Потребление электроэнергии по секторам',csub:'Доли от потреблённого электричества, 2024',
  gt:['Атомная энергетика','Природный газ','Уголь','Новая и возобновляемая энергетика','Прочие источники'],
  ct:['Здания (жильё, услуги, общественный сектор)','Промышленность','Транспорт'],
  gexpl:'Почему именно эти источники?',gnotes:[
   'АЭС дают стабильную базовую генерацию и помогают снизить зависимость от импортируемого топлива.',
   'Газовые станции обеспечивают управляемую генерацию и помогают балансировать спрос, но газ в основном импортируется.',
   'Угольная генерация исторически обеспечивала большие объёмы электричества; её долю сокращают из-за выбросов.',
   'Солнце, ветер и другие источники развиваются ради снижения выбросов и диверсификации энергетики.',
   'Небольшая доля приходится на остальные виды генерации.'
  ],
  cexpl:'Что означает распределение?',cnotes:'В 2024 году здания впервые незначительно опередили промышленность по потреблению электричества: летняя жара увеличила расход на охлаждение, а часть промышленного спроса покрывали собственные электростанции предприятий. На транспорт приходилась лишь небольшая доля, хотя использование электроэнергии электромобилями росло.',
  companies:'Ключевые энергетические компании',companiesIntro:'Организации, занимающиеся производством, передачей и распределением электроэнергии.',roles:['Передача, распределение и продажа электричества; головная компания энергетической группы.','Атомные, гидроэлектрические и некоторые возобновляемые электростанции.','Тепловая и возобновляемая генерация.','Тепловая и возобновляемая генерация.','Тепловая и возобновляемая генерация.'],
  names:['KEPCO — Korea Electric Power Corporation','KHNP — Korea Hydro & Nuclear Power','KOSPO — Korea Southern Power','KOEN — Korea South-East Power','KOWEPO — Korea Western Power'],
  year:'ДАННЫЕ ЗА 2024 ГОД',source:'Источники: Министерство промышленности и энергетики Республики Корея, KESIS и KEPCO.',unit:'Доля, %'
 },
 en:{
  kicker:'05 / ENERGY IN NUMBERS',heading:'South Korea: electricity statistics',intro:'Electricity production and use in 2024. Hover over a segment or select a legend entry.',
  gtitle:'Electricity generation by source',gsub:'Share of electricity generated, 2024',ctitle:'Electricity consumption by sector',csub:'Share of electricity consumed, 2024',
  gt:['Nuclear','Natural gas','Coal','New and renewable energy','Other sources'],
  ct:['Buildings (homes, services, public)','Industry','Transport'],
  gexpl:'Why these sources?',gnotes:[
   'Nuclear plants provide steady baseload electricity and help reduce reliance on imported fuels.',
   'Gas plants offer dispatchable power that balances demand, although gas is largely imported.',
   'Coal historically supplied high volumes of electricity, but its share is declining due to emissions.',
   'Solar, wind and other sources expand to cut emissions and diversify the energy mix.',
   'A small remaining share comes from other generation sources.'
  ],
  cexpl:'How to interpret the figures',cnotes:'Buildings marginally overtook industry in electricity use in 2024. Summer heat raised cooling demand, while some industrial electricity was generated on site. Transport used a small share, although electric vehicle demand grew.',
  companies:'Key electricity companies',companiesIntro:'Organisations involved in producing, transmitting and distributing electricity.',roles:['Electricity transmission, distribution and sales; parent of major generating companies.','Nuclear, hydro and some renewable generation.','Thermal and renewable electricity generation.','Thermal and renewable electricity generation.','Thermal and renewable electricity generation.'],
  names:['KEPCO — Korea Electric Power Corporation','KHNP — Korea Hydro & Nuclear Power','KOSPO — Korea Southern Power','KOEN — Korea South-East Power','KOWEPO — Korea Western Power'],
  year:'2024 DATA',source:'Sources: Korean energy ministry, KESIS and KEPCO.',unit:'Share, %'
 },
 ko:{
  kicker:'05 / 숫자로 보는 에너지',heading:'대한민국 전력 통계',intro:'2024년 전력 생산 및 소비 구성. 부채꼴에 마우스를 올리거나 범례를 선택하세요.',
  gtitle:'발전원별 전력 생산 비중',gsub:'2024년 전체 발전량 중 비중',ctitle:'부문별 전력 소비 비중',csub:'2024년 전체 전력 소비량 중 비중',
  gt:['원자력','천연가스','석탄','신·재생에너지','기타'],
  ct:['건물 (가정·서비스·공공)','산업','수송'],
  gexpl:'이러한 에너지원이 선택된 이유',gnotes:[
   '원자력은 안정적인 기저 전력을 생산하며 수입 연료 의존도를 낮추는 데 도움이 됩니다.',
   '가스 발전은 수요 변동에 대응할 수 있지만 천연가스 대부분은 수입합니다.',
   '석탄 발전은 오랫동안 주요 전원이었지만 배출 문제로 비중이 줄고 있습니다.',
   '태양광·풍력 등은 배출 감축과 에너지원 다변화를 위해 확대되고 있습니다.',
   '나머지 소규모 전원도 일부 기여합니다.'
  ],
  cexpl:'소비 구조 해설',cnotes:'2024년 건물 부문의 전력 소비가 산업을 근소하게 앞섰습니다. 여름철 폭염으로 냉방 수요가 증가했고 일부 산업 전력은 사업장 내 자가발전으로 충당됐습니다. 수송 비중은 작지만 전기차 사용은 증가했습니다.',
  companies:'주요 전력 기업',companiesIntro:'전력 생산과 송전, 배전을 담당하는 기관입니다.',roles:['전력 송전·배전·판매 및 주요 발전 자회사 관리.','원자력·수력·일부 재생에너지 발전.','화력 및 재생에너지 발전.','화력 및 재생에너지 발전.','화력 및 재생에너지 발전.'],
  names:['KEPCO — 한국전력공사','KHNP — 한국수력원자력','KOSPO — 한국남부발전','KOEN — 한국남동발전','KOWEPO — 한국서부발전'],
  year:'2024년 통계',source:'출처: 대한민국 산업통상부, KESIS, 한국전력공사.',unit:'비중, %'
 }
};
const sets=[
 {key:'g',values:[31.7,28.1,28.1,10.6,1.5],colors:['#003b78','#2872a7','#8598a9','#208c82','#c9aa70']},
 {key:'c',values:[49.8,49.2,1.0],colors:['#003b78','#408eb0','#c9aa70']}
];
const companies=[
 ['https://www.kepco.co.kr/eng/','KEPCO'],
 ['https://www.khnp.co.kr/eng/','KHNP'],
 ['https://www.kospo.co.kr/','KOSPO'],
 ['https://www.koenergy.kr/','KOEN'],
 ['https://www.iwest.co.kr/','KOWEPO']
];
const root=document.getElementById('energy-analytics');
let selected={g:null,c:null};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function chartMarkup(ds,d){
 const k=ds.key,v=ds.values,c=ds.colors,labels=d[k+'t'];let start=0;
 const ranges=v.map((n,i)=>{const a=start;start+=n;return c[i]+' '+a+'% '+start+'%';}).join(',');
 const current=selected[k]===null?null:selected[k];
 const headline=current===null?'100%':v[current].toFixed(1).replace('.',',')+'%';
 const sub=current===null?d.year:labels[current];
 const items=v.map((n,i)=>'<button type="button" class="ea-legend-line'+(current===i?' active':'')+'" data-chart="'+k+'" data-index="'+i+'"><span class="ea-swatch" style="background:'+c[i]+'"></span><span>'+esc(labels[i])+'</span><b>'+n.toFixed(1)+'%</b></button>').join('');
 return '<article class="ea-panel"><h3>'+esc(d[k==='g'?'gtitle':'ctitle'])+'</h3><p class="ea-sub">'+esc(d[k==='g'?'gsub':'csub'])+'</p><div class="ea-visual"><div class="ea-pie" role="img" aria-label="'+esc(labels.map((x,i)=>x+': '+v[i]+'%').join('; '))+'" style="background:conic-gradient('+ranges+')"><div class="ea-pie-center"><strong>'+headline+'</strong><small>'+esc(sub)+'</small></div></div><div class="ea-legend">'+items+'</div></div></article>';
}
function render(){
 if(!root)return;const lang=DATA[document.documentElement.lang]||DATA.ru;
 root.innerHTML='<div class="container"><span class="kicker">'+esc(lang.kicker)+'</span><div class="ea-intro"><div><h2>'+esc(lang.heading)+'</h2><p>'+esc(lang.intro)+'</p></div><span class="ea-year">'+esc(lang.year)+'</span></div><div class="ea-panels">'+sets.map(s=>chartMarkup(s,lang)).join('')+'</div><div class="ea-explain"><div><h3>'+esc(lang.gexpl)+'</h3>'+lang.gnotes.map((note,i)=>'<p><b>'+esc(lang.gt[i])+' ('+sets[0].values[i].toFixed(1)+'%)</b> — '+esc(note)+'</p>').join('')+'</div><div><h3>'+esc(lang.cexpl)+'</h3><p>'+esc(lang.cnotes)+'</p></div></div><div class="ea-companies"><h3>'+esc(lang.companies)+'</h3><p>'+esc(lang.companiesIntro)+'</p><div class="ea-company-grid">'+companies.map(([url,code],i)=>'<article class="ea-company"><span class="ea-company-code">'+esc(code)+'</span><h4>'+esc(lang.names[i])+'</h4><p>'+esc(lang.roles[i])+'</p><a href="'+url+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(lang.names[i])+'">↗</a></article>').join('')+'</div></div><p class="ea-sources">'+esc(lang.source)+' <a href="https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/170507/view" target="_blank" rel="noopener noreferrer">2024 '+(document.documentElement.lang==='ko'?'발전·소비 통계':'generation & consumption')+'</a> · <a href="https://kesis.keei.re.kr/board.es?act=view&bid=0060&list_no=2119&mid=a10306000000&tag=" target="_blank" rel="noopener noreferrer">KESIS</a> · <a href="https://www.kepco.co.kr/eng/about-us/organization/subsidiaries/power-groups/conts.do" target="_blank" rel="noopener noreferrer">KEPCO</a></p></div>';
 root.querySelectorAll('[data-chart]').forEach(btn=>btn.addEventListener('click',()=>{const k=btn.dataset.chart,i=Number(btn.dataset.index);selected[k]=selected[k]===i?null:i;render();}));
}
if(root){render();new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
