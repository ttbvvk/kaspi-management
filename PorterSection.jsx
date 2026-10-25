import { useEffect, useState } from 'react';
import { ChevronRight, Landmark, ShoppingBag } from 'lucide-react';
import { PORTER_FORCES } from '../data';
import { Reveal } from './Reveal';

export function PorterSection() {
  const [activeForce, setActiveForce] = useState(PORTER_FORCES[4]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row items-center gap-12 mt-16 min-h-[600px]">
      <Reveal className="w-full xl:w-3/5 h-[500px] md:h-[600px] relative flex items-center justify-center bg-[#141414] rounded-3xl border border-[#292929] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {PORTER_FORCES.map((force, i) => {
            const angleRad = force.angle * (Math.PI / 180);
            const r = 40;
            const x2 = 50 + r * Math.cos(angleRad);
            const y2 = 50 + r * Math.sin(angleRad);

            return (
              <line
                key={i}
                x1="50%" y1="50%"
                x2={`${x2}%`} y2={`${y2}%`}
                stroke={activeForce.id === force.id ? '#F14635' : '#292929'}
                strokeWidth={activeForce.id === force.id ? '3' : '1'}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#080808] border-4 border-[#F14635] w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(241,70,53,0.3)]">
          <span className="text-xl md:text-2xl font-black text-white tracking-tighter">KASPI.KZ</span>
        </div>

        {PORTER_FORCES.map((force) => {
          const r = isMobile ? 42 : 38;
          const angleRad = force.angle * (Math.PI / 180);
          const top = 50 + r * Math.sin(angleRad);
          const left = 50 + r * Math.cos(angleRad);
          const isActive = activeForce.id === force.id;

          return (
            <button
              key={force.id}
              onClick={() => setActiveForce(force)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 w-36 md:w-48 p-4 rounded-xl text-center text-sm font-bold transition-all duration-300 ${isActive ? 'bg-[#F14635] text-white scale-110 shadow-xl z-30' : 'bg-[#080808] border border-[#292929] text-gray-400 hover:bg-[#1a1a1a] hover:border-gray-500'}`}
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              {force.name}
            </button>
          );
        })}
      </Reveal>

      <Reveal delay={200} className="w-full xl:w-2/5 flex flex-col justify-center">
        <div className="bg-[#080808] p-8 md:p-10 rounded-3xl border border-[#292929] h-full shadow-2xl relative overflow-hidden">
          <div className={`absolute top-0 left-0 right-0 h-2 ${activeForce.rating === 'HIGH' ? 'bg-[#F14635]' : activeForce.rating === 'MODERATE' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>

          <h3 className="text-3xl font-bold mb-4 mt-2">{activeForce.name}</h3>

          <div className="flex items-center space-x-2 mb-8 bg-[#141414] p-3 rounded-lg w-max border border-[#292929]">
            {['LOW', 'MODERATE', 'HIGH'].map((level) => (
              <div key={level} className={`px-4 py-1 rounded text-xs font-bold ${activeForce.rating === level ? (level === 'HIGH' ? 'bg-[#F14635] text-white' : level === 'MODERATE' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white') : 'text-gray-500'}`}>
                {level}
              </div>
            ))}
          </div>

          <ul className="space-y-4 mb-12">
            {activeForce.points.map((pt, i) => (
              <li key={i} className="flex items-start text-gray-300 animate-in slide-in-from-right-4 fade-in duration-300" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <ChevronRight className="w-5 h-5 text-[#F14635] mr-2 shrink-0 mt-0.5" />
                <span className="text-base">{pt}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-[#292929] pt-6">
            <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Notable Competitors / Landscape</p>
            <div className="flex flex-wrap gap-4">
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><Landmark className="w-4 h-4 mr-2 text-[#F14635]" /> Halyk</span>
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><Landmark className="w-4 h-4 mr-2 text-[#F14635]" /> Freedom</span>
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><ShoppingBag className="w-4 h-4 mr-2 text-[#F14635]" /> Wildberries</span>
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><ShoppingBag className="w-4 h-4 mr-2 text-[#F14635]" /> Ozon</span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-[#141414] p-6 rounded-xl border-l-4 border-[#F14635]">
          <p className="font-bold text-lg">High competitive rivalry makes continuous innovation and efficient operations essential.</p>
        </div>
      </Reveal>
    </div>
  );
}
