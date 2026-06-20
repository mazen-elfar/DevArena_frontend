import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// ── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = ({ onSignIn }) => (
  <nav className="lp-nav">
    <div className="lp-nav-inner">
      <div className="lp-nav-left">
        <div className="lp-logo">
          <span className="lp-logo-text">DevArena</span>
        </div>
        <div className="lp-nav-links">
          <a href="#" className="lp-nav-link active">Battles</a>
          <a href="#" className="lp-nav-link">Quests</a>
          <a href="#" className="lp-nav-link">Tournaments</a>
          <a href="#" className="lp-nav-link">Leaderboards</a>
        </div>
      </div>
      <div className="lp-nav-actions">
        <button className="lp-btn-ghost" onClick={onSignIn}>Sign In</button>
        <button className="lp-btn-primary" onClick={onSignIn}>Launch Arena</button>
      </div>
    </div>
  </nav>
);

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ onSignIn }) => (
  <section className="lp-hero">
    <div className="lp-hero-grid">
      {/* Left */}
      <div className="lp-hero-content">
        <div className="lp-glow lp-glow-cyan lp-glow-hero-tl" />
        <div className="lp-badge">
          <span className="lp-badge-dot" />
          <span className="lp-label-caps">ARENA LIVE: SEASON 4</span>
        </div>
        <div className="lp-divider-v" />
        <h1 className="lp-hero-heading">
          <span className="lp-hero-heading-bold">Code. Compete.</span><br />
          <span className="lp-gradient-text">Conquer.</span>
        </h1>
        <p className="lp-hero-sub">
          The world's most elite competitive programming arena. Battle in real-time, solve complex quests, and climb the global ranks.
        </p>
        <div className="lp-hero-btns">
          <button className="lp-btn-glass" onClick={onSignIn}>
            Start Battling
            <span className="material-symbols-outlined">terminal</span>
          </button>
          <button className="lp-btn-outline">Explore Quests</button>
        </div>
      </div>

      {/* Right */}
      <div className="lp-hero-visual">
        <div className="lp-hero-card glass-card">
          <div className="lp-glow lp-glow-cyan lp-glow-hero-tl" />
          <div className="lp-hero-img-wrap">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGFCnaT9mibzrVpK3dlvqLuWws3ZSTliSM-SAemBSGP-jJv0hYWVTRr5rPk1amFEsHkH8rzVZ-s4nueFlqvkE6Urn3aPBK6ppsvU61Dap6gbH2PIPfLQMA8Q-8fzOC1SihPRPjtDRScwINmQLlnihJtFew8Vr2cjruuflq6XC1WZ01_0xsm8S0riTlDu7DpMCoiPLRCSp-DsczuFnuOzQC_zESRiVX_csc9RrBdS1pW2_BGP-T_RVzXi4UQyKWElXVWcgYyjSNrUM"
              alt="Dev Battle Hologram"
              className="lp-hero-img"
            />
            <div className="lp-hero-img-overlay" />
          </div>
        </div>

        {/* Rank Card */}
        <div className="lp-float-card lp-float-card--rank animate-float">
          <div className="lp-float-icon lp-float-icon--cyan">
            <span className="material-symbols-outlined">military_tech</span>
          </div>
          <div>
            <p className="lp-float-label">CURRENT RANK</p>
            <p className="lp-float-value">Diamond III</p>
          </div>
        </div>

        {/* Streak Card */}
        <div className="lp-float-card lp-float-card--streak animate-float" style={{ animationDelay: '2s' }}>
          <div className="lp-float-icon lp-float-icon--purple">
            <span className="material-symbols-outlined">bolt</span>
          </div>
          <div>
            <p className="lp-float-label">WIN STREAK</p>
            <p className="lp-float-value">12 MATCHES</p>
          </div>
        </div>

        {/* XP Card */}
        <div className="lp-float-card lp-float-card--xp animate-float" style={{ animationDelay: '4s' }}>
          <div className="lp-xp-top">
            <div>
              <p className="lp-float-label">EXPERIENCE</p>
              <p className="lp-xp-value">42,500 <span className="lp-xp-max">/ 50k</span></p>
            </div>
            <span className="material-symbols-outlined lp-xp-arrow">keyboard_double_arrow_up</span>
          </div>
          <div className="lp-xp-bar-bg">
            <div className="lp-xp-bar-fill" />
          </div>
        </div>

        <div className="lp-glow lp-glow-hero-center" />
      </div>
    </div>
  </section>
);

// ── Stats Terminal ────────────────────────────────────────────────────────────
const StatsTerminal = () => (
  <section className="lp-stats-section">
    <div className="lp-stats-inner">
      <div className="lp-terminal glass-card">
        <div className="lp-terminal-header">
          <div className="lp-terminal-dots">
            <div className="lp-dot lp-dot-red" />
            <div className="lp-dot lp-dot-yellow" />
            <div className="lp-dot lp-dot-green" />
          </div>
          <div className="lp-terminal-title">platform_stats.json — bash</div>
          <div style={{ width: 48 }} />
        </div>
        <div className="lp-terminal-body">
          <div className="lp-term-line"><span className="lp-term-ln">1</span><span><span className="lp-kw-purple">const</span> <span className="lp-kw-cyan">platformStats</span> = {'{'}</span></div>
          <div className="lp-term-line"><span className="lp-term-ln">2</span><span className="lp-term-indent"><span className="lp-kw-str">"activeDevelopers"</span>: <span className="lp-kw-yellow">"150k+"</span>,</span></div>
          <div className="lp-term-line"><span className="lp-term-ln">3</span><span className="lp-term-indent"><span className="lp-kw-str">"battlesPlayed"</span>: <span className="lp-kw-yellow">"1M+"</span>,</span></div>
          <div className="lp-term-line"><span className="lp-term-ln">4</span><span className="lp-term-indent"><span className="lp-kw-str">"questsSolved"</span>: <span className="lp-kw-yellow">"500k+"</span></span></div>
          <div className="lp-term-line"><span className="lp-term-ln">5</span><span>{'};'}</span></div>
          <div className="lp-term-line lp-term-line--mt"><span className="lp-term-ln">6</span><span><span className="lp-kw-green">$</span> <span>fetch --global-rankings</span><span className="lp-cursor" /></span></div>
        </div>
      </div>
      <div className="lp-glow lp-glow-cyan" style={{ bottom: 0, left: '25%' }} />
      <div className="lp-glow lp-glow-purple" style={{ bottom: 0, right: '25%' }} />
    </div>
  </section>
);

// ── Features ──────────────────────────────────────────────────────────────────
const Features = () => (
  <section className="lp-section lp-section--max">
    <div className="lp-section-header">
      <h2 className="text-headline-lg">Master Every Dimension</h2>
      <p className="lp-silver">Choose your path to excellence through our tailored competition modes.</p>
    </div>
    <div className="lp-features-grid">
      {/* DevBattles */}
      <div className="neon-border lp-feature-card">
        <div className="lp-feature-icon lp-feature-icon--cyan">
          <span className="material-symbols-outlined">swords</span>
        </div>
        <h3 className="text-headline-md">DevBattles</h3>
        <p className="lp-silver lp-feature-desc">Real-time 1v1 and multiplayer code matches. Solve problems faster than your opponent to win ELO.</p>
        <ul className="lp-feature-list">
          <li><span className="material-symbols-outlined lp-check-cyan">check_circle</span>Live syntax validation</li>
          <li><span className="material-symbols-outlined lp-check-cyan">check_circle</span>Integrated terminal</li>
        </ul>
        <a href="#" className="lp-feature-link lp-feature-link--cyan">
          Enter Battle Arena <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
      {/* Quests */}
      <div className="lp-feature-card lp-feature-card--default lp-feature-card--hover-purple">
        <div className="lp-feature-icon lp-feature-icon--purple">
          <span className="material-symbols-outlined">map</span>
        </div>
        <h3 className="text-headline-md">Quests</h3>
        <p className="lp-silver lp-feature-desc">Daily challenges and long-term narrative paths that help you master specific languages and frameworks.</p>
        <ul className="lp-feature-list">
          <li><span className="material-symbols-outlined lp-check-purple">check_circle</span>Curated skill tracks</li>
          <li><span className="material-symbols-outlined lp-check-purple">check_circle</span>Unlockable lore assets</li>
        </ul>
        <a href="#" className="lp-feature-link lp-feature-link--purple">
          View Quest Map <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
      {/* Community */}
      <div className="lp-feature-card lp-feature-card--default lp-feature-card--hover-cyan">
        <div className="lp-feature-icon lp-feature-icon--cyan">
          <span className="material-symbols-outlined">groups</span>
        </div>
        <h3 className="text-headline-md">Community</h3>
        <p className="lp-silver lp-feature-desc">Connect with elite developers, join clans, and share your battle highlights on the global feed.</p>
        <ul className="lp-feature-list">
          <li><span className="material-symbols-outlined lp-check-cyan">check_circle</span>Global Clan Wars</li>
          <li><span className="material-symbols-outlined lp-check-cyan">check_circle</span>Code reviews &amp; mentoring</li>
        </ul>
        <a href="#" className="lp-feature-link lp-feature-link--cyan">
          Join the Discord <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>
  </section>
);

// ── Tournament ────────────────────────────────────────────────────────────────
const Countdown = () => {
  const ref = useRef(null);
  useEffect(() => {
    let time = 4 * 3600 + 22 * 60 + 15;
    const id = setInterval(() => {
      time--;
      const h = String(Math.floor(time / 3600)).padStart(2, '0');
      const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
      const s = String(time % 60).padStart(2, '0');
      if (ref.current) ref.current.textContent = `${h}:${m}:${s}`;
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <span ref={ref}>04:22:15</span>;
};

const Tournament = () => (
  <section className="lp-section">
    <div className="lp-tournament-wrap">
      <div className="lp-tournament-bg" />
      <div className="lp-tournament-glow" />
      <div className="lp-tournament-grid">
        <div className="lp-tournament-trophy">
          <div className="lp-trophy-card glass-card animate-float">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIf0Pkol9vJ_AbevjjqjGaFtfU6QiGv4j6ODkecERUM7VDmPKSDbc4z5_9JMjVHNwHbXIRXmBZwW4THpMHbvhFEvZPHH7TXmc6l12Wd5uuE8KwyiPLBjBtKXH0vPkHNHJvDBlgaeTok5GtNoBX0nvJhLphceo2ZS_wW5Jl-xlDYmnG3ZVdWbZXysweRQknOq4bbAZxdNu4WyL891sDtQBJla3d3SNlJxy_DeD0ayOn9qGyfLgqsTNXI2mbdG4TnIaPY7wtW9-VnbI"
              alt="Tournament Trophy"
              className="lp-trophy-img"
            />
          </div>
        </div>
        <div className="lp-tournament-info">
          <div className="lp-tournament-tags">
            <span className="lp-live-badge"><span className="lp-live-dot" />LIVE NOW</span>
            <span className="lp-label-caps lp-silver">GLOBAL INVITATIONAL</span>
          </div>
          <h2 className="text-display-lg">Weekly Byte-Blitz Tournament</h2>
          <p className="lp-silver lp-tournament-sub">Compete against the top 1% for a piece of the prize pool and exclusive legendary badges.</p>
          <div className="lp-tournament-stats">
            <div>
              <p className="lp-stat-label">Prize Pool</p>
              <p className="lp-stat-value lp-stat-cyan">$2,500 <span className="lp-stat-unit">USD</span></p>
            </div>
            <div className="lp-stat-divider" />
            <div>
              <p className="lp-stat-label">Time Remaining</p>
              <p className="lp-stat-value"><Countdown /></p>
            </div>
          </div>
          <button className="lp-btn-join">Join Tournament</button>
        </div>
      </div>
    </div>
  </section>
);

// ── Leaderboard ───────────────────────────────────────────────────────────────
const leaderboardData = [
  {
    rank: 1, rankColor: 'yellow', user: 'binary_wizard', country: 'USA', clan: 'Clan Nitro',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKkrTADfQFF41I4NXLqPNem43Y-xA5cbobGmLcTzRXN0cw8-nRExmuObXTlux2PSYOv2mtr1cDuJfS6FWze-xjcFGmuu4yr1hlaR4vWpifyr_fe8m7Aeq_10pWvG49-UXUEosESLJAag89oqgmsiUh78udD6qyNkRb6DutYdW4p8MgEOMYesuz6sTWklFnrEqVesP-iQCoEKvMqmD4jLkpLLeCc9KBnyZzDrHZkleCQ_74wU34EOiLc0_g3KiIhfAe83qKv28ODpI',
    battles: '2,412', winRate: 88, xp: '98,540'
  },
  {
    rank: 2, rankColor: 'slate', user: 'null_pointer_gal', country: 'Germany', clan: 'Solo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi4dzvxLrK7CBvgD418JOeKAxtXRmVoYqZxL58iAGp8KOgcnaaNYhDjDK6aDA5B34qQ2Mx-38ZOZT8DzleH4Y9OcdLG5J8Nt9nz584TdwG8RGsTVBizil1A7lYgmZg-7WBQKaIU6gTtB5XXRCj4xVm_6-4JPmC6LU2lf_86RTqaMxwLCVkt4X14nFtthoUHKVkiFtt_YYz9WywpzHNdxvTTNZfZcGW-YaJHgZ9_1IsP-wO9LiWmE3x6N0SK7_Si1oZ4wG4jmgEcfA',
    battles: '1,894', winRate: 82, xp: '92,100'
  },
  {
    rank: 3, rankColor: 'orange', user: 'overflow_ceo', country: 'India', clan: 'Clan Titan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuP28l7SZ7Qaj9zdBnXnTOloyQAeYAKWI2KhZLhnYz_32iXojZT0MKBwjj0CakAZXHQNBAqlJXIAFwYRTvMvKkWQB4sNZpLotpqzDq142bCUStQpy2VJgzwHv3rtG4J2HAunSArs9nSyTWMZnNCi8Z4A6l8L0VRdcEK5cNVIQI4AInG6qUzk_-v5RbsryjZniJrTU2IGxNEG_XLxeuzoCdasMcDSGQBnScfmM8nYL9Kj_hhr_QApf7yjp4e_deFpphG_Wj-FdykPM',
    battles: '3,120', winRate: 79, xp: '89,900'
  }
];

const Leaderboard = () => (
  <section className="lp-section lp-section--max">
    <div className="lp-lb-header">
      <div>
        <h2 className="text-headline-lg">The Hall of Fame</h2>
        <p className="lp-silver">Tracking the world's most efficient problem solvers.</p>
      </div>
      <div className="lp-lb-tabs">
        <button className="lp-lb-tab lp-lb-tab--active">Global</button>
        <button className="lp-lb-tab">Region</button>
        <button className="lp-lb-tab">Clans</button>
      </div>
    </div>
    <div className="lp-lb-table-wrap glass-card">
      <table className="lp-lb-table">
        <thead>
          <tr>
            <th>Rank</th><th>Developer</th><th>Battles</th><th>Win Rate</th><th>XP</th><th className="lp-th-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map(row => (
            <tr key={row.rank} className="lp-lb-row">
              <td><span className={`lp-rank-badge lp-rank-badge--${row.rankColor}`}>{row.rank}</span></td>
              <td>
                <div className="lp-lb-user">
                  <div className="lp-lb-avatar" style={{ backgroundImage: `url(${row.avatar})` }} />
                  <div>
                    <p className="lp-lb-username">{row.user}</p>
                    <p className="lp-lb-meta">{row.country} • {row.clan}</p>
                  </div>
                </div>
              </td>
              <td className="lp-mono">{row.battles}</td>
              <td>
                <div className="lp-winrate">
                  <span className="lp-winrate-pct">{row.winRate}%</span>
                  <div className="lp-winrate-bar"><div className="lp-winrate-fill" style={{ width: `${row.winRate}%` }} /></div>
                </div>
              </td>
              <td className="lp-mono">{row.xp}</td>
              <td className="lp-th-right"><button className="lp-profile-btn">View Profile</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="lp-lb-footer">
        <button className="lp-lb-load">Load Full Rankings <span className="material-symbols-outlined">expand_more</span></button>
      </div>
    </div>
  </section>
);

// ── Badges ────────────────────────────────────────────────────────────────────
const badges = [
  { icon: 'military_tech', label: 'Arena Master', color: 'cyan', unlocked: true, desc: 'Forged in the heat of a thousand duels. Granted to those who have dominated the 1v1 arena with a 70%+ win rate.', tag: 'UNLOCKED' },
  { icon: 'verified_user', label: 'Untouchable', color: 'purple', unlocked: true, desc: 'A ghost in the machine. Awarded for completing 50 consecutive matches without a single syntax error.', tag: 'UNLOCKED' },
  { icon: 'terminal', label: 'Syntax God', color: 'cyan', unlocked: true, desc: 'The compiler bows to you. Mastered every language track in the Season 4 Quest Map.', tag: 'UNLOCKED' },
  { icon: 'hotel_class', label: 'System Architect', color: null, unlocked: false, desc: 'Design the future. Requires reaching Diamond III rank and contributing to 5 open-source clan projects.', progress: 45, tag: 'LOCKED' },
  { icon: 'diamond', label: 'Unbreakable', color: null, unlocked: false, desc: 'Pressure is a privilege. Win a Global Invitational Tournament with zero losses.', progress: 12, tag: 'LOCKED' },
  { icon: 'auto_awesome', label: 'Code Shaman', color: 'purple', unlocked: true, ultimate: true, desc: 'The ultimate transcendence. Speak to the machine in its own tongue. Only 12 exist globally.', tag: 'ULTIMATE' },
];

const Badges = () => (
  <section className="lp-badges-section">
    <div className="lp-section--max">
      <div className="lp-badges-header">
        <h2 className="text-display-lg">Earn Your Prestige</h2>
        <p className="lp-silver lp-badges-sub">Your journey from initiate to legend is etched in the code. Unlock these honors through skill, speed, and unwavering focus.</p>
      </div>
      <div className="lp-badges-grid">
        {badges.map((b, i) => (
          <div key={i} className={`lp-badge-card ${b.unlocked ? (b.ultimate ? 'neon-border' : `lp-badge-card--${b.color}`) : 'lp-badge-card--locked'}`}>
            <div className="lp-badge-card-top">
              <div className={`lp-badge-icon ${b.unlocked ? `lp-badge-icon--${b.color}` : 'lp-badge-icon--locked'}`}>
                <span className={`material-symbols-outlined ${b.ultimate ? 'lp-pulse' : ''}`}>{b.icon}</span>
              </div>
              <span className={`lp-badge-tag lp-badge-tag--${b.tag.toLowerCase()}`}>{b.tag}</span>
            </div>
            <h3 className={b.unlocked ? 'text-headline-md' : 'lp-badge-title-locked'}>{b.label}</h3>
            <p className={b.unlocked ? 'lp-silver lp-badge-desc' : 'lp-badge-desc-locked'}>{b.desc}</p>
            {!b.unlocked && (
              <div className="lp-badge-progress-wrap">
                <div className="lp-badge-progress-bar"><div className="lp-badge-progress-fill" style={{ width: `${b.progress}%` }} /></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────────
const CTA = ({ onSignIn }) => (
  <section className="lp-cta-section">
    <div className="lp-cta-glow lp-cta-glow-purple" />
    <div className="lp-cta-glow lp-cta-glow-cyan" />
    <div className="lp-cta-inner">
      <h2 className="text-display-lg">Join the next generation of competitive developers.</h2>
      <p className="lp-silver lp-cta-sub">Claim your handle before it's gone and start climbing the ranks today.</p>
      <div className="lp-cta-form">
        <input type="email" placeholder="Enter your email" className="lp-cta-input" />
        <button className="lp-btn-primary lp-btn-primary--lg" onClick={onSignIn}>Create Free Account</button>
      </div>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="lp-footer">
    <div className="lp-footer-grid lp-section--max">
      <div className="lp-footer-brand">
        <div className="lp-logo lp-logo--sm"><span className="lp-logo-text">DevArena</span></div>
        <p className="lp-silver lp-footer-tagline">The premier destination for competitive programming and community-driven coding quests.</p>
        <div className="lp-footer-socials">
          <a href="#" className="lp-social-link"><span className="material-symbols-outlined">alternate_email</span></a>
          <a href="#" className="lp-social-link"><span className="material-symbols-outlined">hub</span></a>
          <a href="#" className="lp-social-link"><span className="material-symbols-outlined">podcasts</span></a>
        </div>
      </div>
      <div>
        <h4 className="lp-footer-col-title">Product</h4>
        <ul className="lp-footer-links">
          {['Battles', 'Quests', 'Leaderboards', 'Season Pass'].map(l => (
            <li key={l}><a href="#" className="lp-footer-link">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="lp-footer-col-title">Community</h4>
        <ul className="lp-footer-links">
          {['Discord', 'Github', 'Forums', 'Blog'].map(l => (
            <li key={l}><a href="#" className="lp-footer-link lp-footer-link--purple">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="lp-footer-col-title">Support</h4>
        <ul className="lp-footer-links">
          {['Documentation', 'API Reference', 'Privacy Policy', 'Contact Us'].map(l => (
            <li key={l}><a href="#" className="lp-footer-link">{l}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="lp-footer-bottom lp-section--max">
      <p className="lp-silver lp-footer-copy">© 2024 DevArena. Execute with Excellence.</p>
      <div className="lp-footer-status">
        <span className="lp-status-dot" />
        <p className="lp-mono lp-silver lp-footer-status-text">All Systems Operational</p>
      </div>
    </div>
  </footer>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();
  const handleSignIn = () => navigate('/home');

  return (
    <div className="lp-root">
      <Navbar onSignIn={handleSignIn} />
      <Hero onSignIn={handleSignIn} />
      <StatsTerminal />
      <Features />
      <Tournament />
      <Leaderboard />
      <Badges />
      <CTA onSignIn={handleSignIn} />
      <Footer />
    </div>
  );
};

export default LandingPage;