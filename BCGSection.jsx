import { useState } from 'react';
import { Settings } from 'lucide-react';
import { INITIAL_BCG_DATA } from '../data';
import { Reveal } from './Reveal';

export function BCGSection() {
  const [data, setData] = useState(INITIAL_BCG_DATA);
  const [activeTab, setActiveTab] = useState('marketplace');
  const [threshold, setThreshold] = useState(10);

  const activeData = data[activeTab];

  const handleSliderChange = (e, field) => {
    const val = parseFloat(e.target.value);
    setData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: val }
    }));
  };

  const resetData = () => {
    setData(INITIAL_BCG_DATA);
    setThreshold(10);
  };

  const getX = (share) => {
    const logVal = Math.log10(Math.max(0.1, Math.min(10, share)));
    return 50 - (logVal * 50);
  };

  const getY = (growth) => {
    const range = 20;
    const clampedGrowth = Math.max(-10, Math.min(30, growth));
    return 50 - ((clampedGrowth - threshold) / range) * 50;
  };

  const getClassification = (growth, share) => {
    if (growth >= threshold && share >= 1.0) return 'STAR';
    if (growth >= threshold && share < 1.0) return 'QUESTION MARK';
    if (growth < threshold && share >= 1.0) return 'CASH COW';
    return 'DOG';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 mt-12">
      <Reveal delay={100} className="w-full lg:w-1/3 bg-[#080808] p-8 rounded-3xl border border-[#292929]">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-[#F14635]" /> EXPLORE SCENARIOS
        </h3>

        <div className="mb-8 flex space-x-2 bg-[#141414] p-1 rounded-xl">
          {Object.keys(data).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === key ? 'bg-[#F14635] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {data[key].name}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Market Growth (%)</label>
              <span className="text-[#F14635] font-bold">{activeData.growth.toFixed(2)}%</span>
            </div>
            <input
              type="range" min="-10" max="30" step="0.1"
              value={activeData.growth}
              onChange={(e) => handleSliderChange(e, 'growth')}
              className="w-full h-2 bg-[#292929] rounded-lg appearance-none cursor-pointer accent-[#F14635]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Relative Market Share</label>
              <span className="text-[#F14635] font-bold">{activeData.share.toFixed(2)}</span>
            </div>
            <input
              type="range" min="0.1" max="10" step="0.01"
              value={activeData.share}
              onChange={(e) => handleSliderChange(e, 'share')}
              className="w-full h-2 bg-[#292929] rounded-lg appearance-none cursor-pointer accent-[#F14635]"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-[#141414] rounded-2xl border border-[#292929]">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Current Classification</p>
          <p className="text-3xl font-black text-white tracking-tighter mb-4">
            {getClassification(activeData.growth, activeData.share)}
          </p>
          <p className="text-sm text-gray-400 border-t border-[#292929] pt-4">
            <span className="text-white font-semibold">Priority:</span> {activeData.priority}
          </p>
        </div>

        <div className="mt-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between bg-[#141414] p-4 rounded-xl border border-[#292929]">
            <span className="text-sm text-gray-400">Growth Threshold</span>
            <div className="flex space-x-2 bg-[#080808] rounded-lg p-1">
              <button onClick={() => setThreshold(10)} className={`px-3 py-1 text-xs font-bold rounded ${threshold === 10 ? 'bg-gray-700 text-white' : 'text-gray-500'}`}>10%</button>
              <button onClick={() => setThreshold(15)} className={`px-3 py-1 text-xs font-bold rounded ${threshold === 15 ? 'bg-gray-700 text-white' : 'text-gray-500'}`}>15%</button>
            </div>
          </div>
          <button
            onClick={resetData}
            className="w-full py-3 border border-[#292929] text-gray-400 hover:text-white hover:border-gray-500 rounded-xl font-semibold transition-colors text-sm"
          >
            RESET TO REPORTED ESTIMATES
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-4 leading-tight">
          *Note: Marketplace uses Wildberries comparison proxy. Payments uses Visa proxy. Fintech uses Halyk proxy (Sep 2025). Hepsiburada excluded due to unmeasured relative share. User-adjusted values represent What-if Scenarios.
        </p>
      </Reveal>

      <Reveal delay={300} className="w-full lg:w-2/3">
        <div className="aspect-square max-h-[700px] w-full bg-[#0a0a0a] rounded-3xl border-2 border-[#292929] relative overflow-hidden flex shadow-2xl">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-[#292929] flex p-6 opacity-30"><span className="text-4xl font-black text-white">STARS</span></div>
            <div className="border-b border-[#292929] flex justify-end p-6 opacity-30"><span className="text-4xl font-black text-white">QUESTION MARKS</span></div>
            <div className="border-r border-[#292929] flex items-end p-6 opacity-30"><span className="text-4xl font-black text-white">CASH COWS</span></div>
            <div className="flex items-end justify-end p-6 opacity-30"><span className="text-4xl font-black text-white">DOGS</span></div>
          </div>

          <div className="absolute left-0 right-0 h-px bg-white/40 top-1/2 z-10"></div>
          <div className="absolute top-0 bottom-0 w-px bg-white/40 left-1/2 z-10"></div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-xs font-bold text-gray-400 tracking-widest z-20">MARKET GROWTH</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 tracking-widest z-20">RELATIVE MARKET SHARE (LOG)</div>

          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] px-2">30%</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] px-2">-10%</div>
          <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] py-1">10.0</div>
          <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] py-1">0.1</div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-2 text-[10px] text-[#F14635] z-10 bg-[#0a0a0a] px-1 font-bold">{threshold}% / 1.0</div>

          {Object.entries(data).map(([key, platform]) => {
            const x = getX(platform.share);
            const y = getY(platform.growth);
            const isActive = activeTab === key;
            const sizeClasses = {
              marketplace: 'w-24 h-24 md:w-32 md:h-32 text-lg',
              payments: 'w-20 h-20 md:w-28 md:h-28 text-base',
              fintech: 'w-16 h-16 md:w-24 md:h-24 text-sm'
            };

            return (
              <div
                key={key}
                onClick={() => setActiveTab(key)}
                className={`absolute rounded-full flex flex-col items-center justify-center cursor-pointer shadow-xl transition-all duration-700 ease-out transform -translate-x-1/2 -translate-y-1/2 z-30 ${sizeClasses[key]} ${isActive ? 'bg-[#F14635] text-white ring-4 ring-white/50 scale-110 z-40' : 'bg-[#141414] text-gray-300 border-2 border-[#F14635] hover:bg-[#F14635]/20'}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="font-bold text-center leading-tight px-2">{platform.name}</span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
