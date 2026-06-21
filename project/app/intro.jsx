/* ═══════════════════════════════════════════════════════════
   EcoInsight · OPENING ANIMATION
   "El planeta conectado por datos ambientales"
   sphere of points → lit data nodes → connection lines → logo → slogan
   Plays once per session. Skippable. Lightweight canvas + rAF.
   ═══════════════════════════════════════════════════════════ */
function EcoIntro({lang, onDone}) {
  const L = window.makeL(lang);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const [phase, setPhase] = React.useState(0);   // 0 globe, 1 connections, 2 logo, 3 slogan
  const [leaving, setLeaving] = React.useState(false);
  const startRef = React.useRef(performance.now());

  const ACCENT = '#4DB87A', BLUE = '#3B8FDB';

  const finish = React.useCallback(() => {
    setLeaving(true);
    setTimeout(() => { try{ sessionStorage.setItem('ei_intro_seen','1'); }catch(e){} onDone(); }, 620);
  }, [onDone]);

  React.useEffect(() => {
    // phase timeline
    const ts = [
      setTimeout(()=>setPhase(1), 950),
      setTimeout(()=>setPhase(2), 2000),
      setTimeout(()=>setPhase(3), 2650),
      setTimeout(finish, 4200),
    ];
    return () => ts.forEach(clearTimeout);
  }, [finish]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio||1, 2);
    let W, H, CX, CY, R;
    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W*dpr; canvas.height = H*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      CX = W/2; CY = H/2; R = Math.min(W,H)*0.27;
    };
    resize();
    window.addEventListener('resize', resize);

    // fibonacci sphere
    const N = 150;
    const pts = [];
    const gold = Math.PI*(3-Math.sqrt(5));
    for (let i=0;i<N;i++){
      const y = 1 - (i/(N-1))*2;
      const r = Math.sqrt(1-y*y);
      const th = gold*i;
      pts.push({ x:Math.cos(th)*r, y, z:Math.sin(th)*r,
        lit: Math.random()<0.5, delay: Math.random()*900, twk: Math.random()*Math.PI*2 });
    }
    // nearest-neighbour connections (precomputed on unit sphere)
    const links = [];
    for (let i=0;i<N;i++){
      const d = [];
      for (let j=0;j<N;j++){ if(i===j) continue;
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, dz=pts[i].z-pts[j].z;
        d.push([dx*dx+dy*dy+dz*dz, j]);
      }
      d.sort((a,b)=>a[0]-b[0]);
      for (let k=0;k<2;k++){ const j=d[k][1]; if(i<j) links.push([i,j]); }
    }

    const draw = () => {
      const now = performance.now();
      const el = now - startRef.current;
      ctx.clearRect(0,0,W,H);
      const rot = el*0.00035;
      const cos=Math.cos(rot), sin=Math.sin(rot);
      const proj = pts.map(p => {
        const x = p.x*cos - p.z*sin;
        const z = p.x*sin + p.z*cos;
        const sx = CX + x*R, sy = CY + p.y*R;
        const depth = (z+1)/2; // 0 back .. 1 front
        return {sx, sy, depth, lit:p.lit, delay:p.delay, twk:p.twk};
      });

      // connection lines
      const connT = Math.min(1, Math.max(0, (el-700)/1100));
      if (connT>0){
        for (const [i,j] of links){
          const a=proj[i], b=proj[j];
          const dep=(a.depth+b.depth)/2;
          ctx.strokeStyle = `rgba(77,184,122,${0.05+0.16*dep*connT})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy); ctx.stroke();
        }
      }
      // points
      for (const p of proj){
        const appear = Math.min(1, Math.max(0,(el-p.delay)/500));
        if (appear<=0) continue;
        const tw = 0.7 + 0.3*Math.sin(now*0.004 + p.twk);
        const baseA = (0.25 + 0.6*p.depth) * appear;
        if (p.lit){
          const r = (1.4 + 1.7*p.depth)*tw;
          const g = ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,r*4);
          g.addColorStop(0, `rgba(77,184,122,${baseA*tw})`);
          g.addColorStop(1, 'rgba(77,184,122,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.sx,p.sy,r*4,0,7); ctx.fill();
          ctx.fillStyle = `rgba(150,235,185,${baseA})`;
          ctx.beginPath(); ctx.arc(p.sx,p.sy,r,0,7); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(140,180,220,${baseA*0.7})`;
          ctx.beginPath(); ctx.arc(p.sx,p.sy,(0.9+1.2*p.depth),0,7); ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div onClick={finish} style={{position:'fixed',inset:0,zIndex:9999,background:'radial-gradient(ellipse 80% 80% at 50% 42%, #11264a 0%, #0D1C32 60%, #081427 100%)',
      display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',
      opacity:leaving?0:1,transition:'opacity .6s ease',pointerEvents:leaving?'none':'auto'}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',
        opacity:phase>=2?0.35:1,transform:phase>=2?'scale(1.06)':'scale(1)',transition:'opacity 1s ease, transform 1.4s ease'}}/>
      {/* logo + slogan */}
      <div style={{position:'relative',textAlign:'center',transform:'translateY(-2vh)'}}>
        <div style={{opacity:phase>=2?1:0,transform:phase>=2?'translateY(0) scale(1)':'translateY(14px) scale(.92)',
          transition:'opacity .9s ease, transform 1.1s cubic-bezier(.16,1,.3,1)',display:'flex',alignItems:'center',justifyContent:'center',gap:14,marginBottom:18}}>
          <div style={{display:'flex',filter:'drop-shadow(0 14px 40px rgba(77,184,122,.35))'}}>
            <img src={(window.__resources&&window.__resources.logo)||"uploads/logo-ei.png"} alt="EcoInsight" style={{height:72,width:'auto'}}/>
          </div>
          <span style={{fontFamily:'Plus Jakarta Sans,sans-serif',fontWeight:800,fontSize:46,letterSpacing:'-.03em',color:'#E6EDF8'}}>
            <span style={{color:ACCENT}}>Eco</span>Insight
          </span>
        </div>
        <p style={{opacity:phase>=3?1:0,transform:phase>=3?'translateY(0)':'translateY(10px)',transition:'opacity .9s ease, transform 1s ease',
          fontFamily:'DM Sans,sans-serif',fontSize:17,color:'#7A9BBF',letterSpacing:'.01em',maxWidth:440,margin:'0 auto'}}>
          {L('Transformando datos ambientales en decisiones sostenibles.','Turning environmental data into sustainable decisions.')}
        </p>
        <div style={{opacity:phase>=3?1:0,transition:'opacity .8s ease .2s',marginTop:14,display:'flex',gap:6,justifyContent:'center'}}>
          {[0,1,2].map(i=>(<span key={i} style={{width:5,height:5,borderRadius:'50%',background:i===0?ACCENT:i===1?BLUE:'#2C4880'}}/>))}
        </div>
      </div>
      <button onClick={(e)=>{e.stopPropagation();finish();}} style={{position:'absolute',bottom:28,right:30,background:'rgba(255,255,255,.06)',
        border:'1px solid rgba(255,255,255,.14)',color:'#7A9BBF',fontSize:12,fontWeight:600,fontFamily:'Plus Jakarta Sans,sans-serif',
        padding:'7px 16px',borderRadius:20,cursor:'pointer',letterSpacing:'.03em',backdropFilter:'blur(8px)'}}>
        {L('Saltar intro','Skip intro')} →
      </button>
    </div>
  );
}
window.EcoIntro = EcoIntro;
