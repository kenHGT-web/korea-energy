// Player profile. Only public avatar IDs are stored; XP/achievements are derived from trusted leaderboard values.
const AVATARS={bolt:'⚡',robot:'🤖',atom:'☢️',star:'⭐',ghost:'👾',flame:'🔥'};
const GAME_LABELS={power:'POWER GRID',electrician:'ELECTRICIAN',reactor:'REACTOR 03'};
const ACHIEVEMENTS=[
{id:'first',icon:'🎮',title:'Первый запуск',text:'Получить очки в любой игре',ok:s=>Object.values(s).some(v=>v>0)},
{id:'circuit',icon:'🔌',title:'Мастер цепей',text:'Набрать 3 000 очков в POWER GRID',ok:s=>s.power>=3000},
{id:'electric',icon:'🛠️',title:'Дежурный электрик',text:'Набрать 2 500 очков в ELECTRICIAN',ok:s=>s.electrician>=2500},
{id:'reactor',icon:'☢️',title:'Контроль реактора',text:'Набрать 2 500 очков в REACTOR 03',ok:s=>s.reactor>=2500},
{id:'triple',icon:'🏆',title:'Тройная энергия',text:'Получить рекорд в каждой игре',ok:s=>Object.values(s).every(v=>v>0)},
{id:'expert',icon:'💎',title:'Энергетический эксперт',text:'Набрать 20 000 очков суммарно',ok:s=>Object.values(s).reduce((a,b)=>a+b,0)>=20000}
];
export async function renderPlayerProfile(target,user,client){
 target.innerHTML='<p>Загрузка профиля...</p>';
 if(!client||!user){target.textContent='Войди в аккаунт, чтобы открыть профиль.';return}
 try{
  const [{data:records,error:scoreError},{data:row,error:profileError}]=await Promise.all([
   client.from('leaderboard').select('game,best_score').eq('user_id',user.id),
   client.from('player_profiles').select('avatar').eq('user_id',user.id).maybeSingle()
  ]);
  if(scoreError)throw scoreError;if(profileError)throw profileError;
  const scores={power:0,electrician:0,reactor:0};for(const r of records||[])if(Object.hasOwn(scores,r.game))scores[r.game]=Math.max(0,r.best_score);
  const total=Object.values(scores).reduce((a,b)=>a+b,0);
  const level=Math.min(31,1+Math.floor(total/1000));
  const progress=level>=31?100:(total%1000)/10;
  let avatar=AVATARS[row?.avatar]?row.avatar:'bolt';
  const nickname=String(user.user_metadata?.nickname||'Игрок');
  const unlocked=ACHIEVEMENTS.filter(a=>a.ok(scores)).length;
  target.innerHTML='';
  const hero=document.createElement('div');hero.className='arcade-profile-hero';
  const avatarDisplay=document.createElement('span');avatarDisplay.className='arcade-profile-avatar';avatarDisplay.textContent=AVATARS[avatar];
  const details=document.createElement('div');
  const nick=document.createElement('h3');nick.textContent=nickname;
  const stat=document.createElement('p');stat.textContent='Уровень '+level+'  •  '+total.toLocaleString('ru-RU')+' очков  •  '+unlocked+'/'+ACHIEVEMENTS.length+' достижений';
  const bar=document.createElement('div');bar.className='arcade-progress';const fill=document.createElement('span');fill.style.width=progress+'%';bar.append(fill);
  const hint=document.createElement('small');hint.textContent=level>=31?'Максимальный уровень':'До следующего уровня: '+(1000-total%1000)+' очков';
  details.append(nick,stat,bar,hint);hero.append(avatarDisplay,details);target.append(hero);
  const label=document.createElement('h3');label.textContent='ВЫБЕРИ АВАТАР';target.append(label);
  const choices=document.createElement('div');choices.className='arcade-avatar-options';target.append(choices);
  for(const [key,emoji] of Object.entries(AVATARS)){
   const b=document.createElement('button');b.type='button';b.className='arcade-btn arcade-avatar-option';b.textContent=emoji;b.title=key;b.setAttribute('aria-label','Аватар '+key);b.setAttribute('aria-pressed',String(avatar===key));
   b.addEventListener('click',async()=>{b.disabled=true;const {error}=await client.from('player_profiles').upsert({user_id:user.id,avatar:key,updated_at:new Date().toISOString()},{onConflict:'user_id'});b.disabled=false;if(error){message.textContent='Не удалось сохранить аватар: '+error.message;return}avatar=key;avatarDisplay.textContent=AVATARS[key];choices.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));message.textContent='Аватар сохранён.'});
   choices.append(b);
  }
  const message=document.createElement('p');message.className='arcade-note';message.setAttribute('role','status');target.append(message);
  const scoreTitle=document.createElement('h3');scoreTitle.textContent='ЛИЧНЫЕ РЕКОРДЫ';target.append(scoreTitle);
  const table=document.createElement('div');table.className='arcade-profile-scores';
  for(const [key,name] of Object.entries(GAME_LABELS)){const item=document.createElement('div');const x=document.createElement('span');x.textContent=name;const y=document.createElement('strong');y.textContent=String(scores[key]);item.append(x,y);table.append(item)}target.append(table);
  const achTitle=document.createElement('h3');achTitle.textContent='ДОСТИЖЕНИЯ';target.append(achTitle);
  const achievements=document.createElement('div');achievements.className='arcade-achievements';
  for(const a of ACHIEVEMENTS){const earned=a.ok(scores);const item=document.createElement('div');item.className='arcade-achievement'+(earned?'':' locked');const icon=document.createElement('span');icon.textContent=earned?a.icon:'🔒';const txt=document.createElement('div');const heading=document.createElement('strong');heading.textContent=a.title;const desc=document.createElement('small');desc.textContent=a.text;txt.append(heading,desc);item.append(icon,txt);achievements.append(item)}target.append(achievements);
  const note=document.createElement('p');note.className='arcade-note';note.textContent='Уровень и достижения рассчитываются из лучших сохранённых онлайн-рекордов. Email и пароль другим игрокам не показываются.';target.append(note);
 }catch(e){target.textContent='Ошибка загрузки профиля: '+e.message}
}
