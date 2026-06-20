import { Check, Gem, Zap, Crown, Swords, ShieldCheck, Mail } from "lucide-react";
import "./UpgradeModal.css";

/**
 * UpgradeModal Content
 */
export function UpgradeModal() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic Arena Access", "Community Feed", "Daily Quests", "Standard Matchmaking"],
      active: true,
      color: "blue"
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      features: ["AI Insights Core", "Custom IDE Themes", "Priority Scrims", "Tournament Passes", "Pro Badge", "Ad-free Experience"],
      active: false,
      color: "indigo",
      popular: true
    },
    {
      name: "Elite",
      price: "$29",
      period: "/mo",
      features: ["1-on-1 Coaching", "Early Beta Access", "Exclusive Badges", "Elite Tournaments", "Private Repo Sync", "Dedicated Support"],
      active: false,
      color: "purple"
    }
  ];

  return (
    <div className="p-8 font-sans upgrade-modal">
      <div className="text-center mb-10">
        <h3 className="text-Indigo-400 font-black text-xs uppercase tracking-widest mb-2">Select Your Tier</h3>
        <h2 className="text-3xl font-black text-white">Unlock Full Potential</h2>
        <p className="text-gray-500 mt-2 text-sm">Empower your coding journey with DevBattle Premium</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 plan-card ${
              plan.popular ? "popular border-indigo-500 bg-indigo-500/5" : "border-[#1e294b]/40 bg-[#0d1222]"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full popular-badge">
                MOST POPULAR
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black uppercase text-white tracking-widest">{plan.name}</span>
                {plan.name === "Elite" ? <Crown className="w-5 h-5 text-amber-500" /> : plan.name === "Pro" ? <Gem className="w-5 h-5 text-indigo-500" /> : <Zap className="w-5 h-5 text-blue-500" />}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-500 text-xs font-bold">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[11px] text-gray-400 font-bold leading-tight">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-indigo-400" : "text-emerald-500"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 select-button ${
                plan.active 
                  ? "bg-[#1e294b]/40 text-gray-400 cursor-default" 
                  : plan.popular 
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25" 
                    : "bg-[#1e294b] text-white hover:bg-[#334155]"
              }`}
            >
              {plan.active ? "Current Plan" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#1e294b]/30 grid grid-cols-4 gap-6 footer-stats">
        <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mx-auto mb-3">
              <Swords className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Players</p>
            <p className="text-sm text-white font-black">50,000+</p>
        </div>
        <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mx-auto mb-3">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Ranked</p>
            <p className="text-sm text-white font-black">1.2M+</p>
        </div>
        <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mx-auto mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Secure</p>
            <p className="text-sm text-white font-black">100%</p>
        </div>
        <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mx-auto mb-3">
              <Mail className="w-5 h-5 text-indigo-500" />
            </div>
            <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Support</p>
            <p className="text-sm text-white font-black">24/7</p>
        </div>
      </div>
    </div>
  );
}
