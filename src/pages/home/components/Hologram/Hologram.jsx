import { useState, useEffect, useRef } from "react";
import { Radio } from "lucide-react";
import hologramImage from "../../../../assets/images/hologram_core_1781807172072.png";
import "./Hologram.css";

/**
 * HologramProjection Component
 */
export function HologramProjection() {
  const [rotation, setRotation] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    const animate = () => {
      setRotation((prev) => (prev + 0.3) % 360);
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleLogoClick = () => {
    setPulseCount((prev) => prev + 1);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = [];
    const colors = ["#00f0ff", "#7000ff", "#ff007c", "#00ff66"];

    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1 + Math.random() * 3,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha > 0) {
          active = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }
      });

      if (active) {
        requestAnimationFrame(drawParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    drawParticles();
  };

  return (
    <div className="relative rounded-3xl border border-[#3b82f6]/10 bg-gradient-to-b from-[#090d16] to-[#04060b] h-[370px] flex items-center justify-center overflow-hidden shadow-2xl group flex-1 hologram-container">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Hero Title Section */}
      <div className="absolute top-8 left-10 text-left z-20 pointer-events-auto hero-title-section">
        <h1 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">
          THE GAMIFIED <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
             CODING ARENA
          </span> <br />
          FOR MODERN <br />
          DEVELOPERS
        </h1>
        <p className="text-[10px] text-gray-500 mt-3 max-w-[220px] leading-relaxed font-bold">
          Compete. Contribute. Conquer. Level up your skills, climb the leaderboards, and become a legend in the DevBattle arena.
        </p>
        <div className="flex gap-3 mt-5">
           <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-[10px] font-black text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95">Join Tournament</button>
           <button className="px-5 py-2.5 rounded-xl bg-[#0d1222] border border-[#1e294b] text-[10px] font-black text-gray-400 hover:text-white transition-all active:scale-95">Explore Battles</button>
        </div>
      </div>

      <div className="absolute inset-0 p-4 flex items-center justify-center pointer-events-none">
        <svg className="w-[320px] h-[320px] opacity-20 ml-56" viewBox="0 0 100 100" style={{ transform: `rotate(${rotation}deg)` }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 8" />
          <path d="M 50 6 A 44 44 0 0 1 94 50" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 50 94 A 44 44 0 0 1 6 50" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <canvas ref={canvasRef} width={350} height={350} className="absolute pointer-events-none z-10 ml-56" />

      <div className="absolute flex flex-col items-center justify-center pointer-events-auto ml-56">
        <div onClick={handleLogoClick} className="relative w-[230px] h-[230px] cursor-pointer rounded-full flex items-center justify-center select-none active:scale-95 transition-all duration-300 core-wrapper">
          <div className="absolute inset-0 glow-effect transition-all duration-500" />
          <img src={hologramImage} alt="Holographic Projection Core" className="w-[200px] h-[200px] object-contain rounded-2xl drop-shadow-[0_0_35px_rgba(99,102,241,0.6)] mix-blend-screen opacity-90 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
          <div className="absolute bottom-2 tag-badge flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400" />
            ARENA PRIME
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-6 space-y-1.5 pointer-events-none font-mono text-right info-panel-right">
        <div className="flex items-center justify-end gap-1.5 status-active">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          SYSTEM DIRECT
        </div>
        <p className="status-label">COMPILE: SECURE</p>
        <p className="id-label">GRID LAT_A // 42.02.99</p>
      </div>
    </div>
  );
}
