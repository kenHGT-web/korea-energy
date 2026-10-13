// Supabase Edge Function (Deno). Deploy with JWT verification enabled.
import { createClient } from 'npm:@supabase/supabase-js@2';
const allowed=['power','electrician','reactor'];
Deno.serve(async(req)=>{
 const origin=req.headers.get('Origin')||'*';
 const headers={'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'authorization,x-client-info,apikey,content-type','Access-Control-Allow-Methods':'POST, OPTIONS','Content-Type':'application/json','Vary':'Origin'};
 if(req.method==='OPTIONS')return new Response('ok',{headers});
 const respond=(obj:object,status=200)=>new Response(JSON.stringify(obj),{headers,status});
 if(req.method!=='POST')return respond({error:'POST only'},405);
 try{
  const url=Deno.env.get('SUPABASE_URL')!,anon=Deno.env.get('SUPABASE_ANON_KEY')!,secret=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const token=req.headers.get('Authorization')?.replace(/^Bearer\s+/i,'');if(!token)return respond({error:'Login required'},401);
  const auth=createClient(url,anon);const {data:{user},error:authError}=await auth.auth.getUser(token);if(authError||!user)return respond({error:'Invalid login'},401);
  const {game,score}=await req.json();if(!allowed.includes(game)||!Number.isInteger(score)||score<0||score>10000)return respond({error:'Invalid score'},400);
  const nickname=String(user.user_metadata?.nickname||'').trim();if(!/^[\p{L}\p{N}_-]{3,20}$/u.test(nickname))return respond({error:'Invalid nickname'},400);
  const admin=createClient(url,secret);const {data:old}=await admin.from('leaderboard').select('best_score,updated_at').eq('user_id',user.id).eq('game',game).maybeSingle();
  if(old?.updated_at&&Date.now()-Date.parse(old.updated_at)<15000)return respond({error:'Please wait 15 seconds before submitting again'},429);
  if(old&&old.best_score>=score)return respond({ok:true,best:old.best_score});
  const {error}=await admin.from('leaderboard').upsert({user_id:user.id,nickname,game,best_score:score,updated_at:new Date().toISOString()});if(error)throw error;
  return respond({ok:true,best:score});
 }catch(e){return respond({error:'Server error',detail:String(e)},500)}
});
// Important: bound/rate validation here is not cheat-proof. Use server replay validation for trusted competitions.
