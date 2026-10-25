import { useState } from 'react';
import { MapPin, MessageSquare, User, X } from 'lucide-react';

export function PhoneFrame({ title, services }) {
  const [activeService, setActiveService] = useState(null);
  const ActiveIcon = activeService?.icon;

  return (
    <div className="w-[320px] h-[680px] bg-white rounded-[3rem] border-[12px] border-[#292929] shadow-2xl relative overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02]">
      <div className="absolute top-0 inset-x-0 h-7 w-40 bg-[#292929] rounded-b-3xl mx-auto z-20 flex justify-center items-center">
        <div className="w-16 h-1.5 bg-[#141414] rounded-full"></div>
      </div>

      <div className="bg-[#F14635] pt-12 pb-6 px-6 text-white text-center shadow-md z-10">
        <h4 className="text-xl font-extrabold tracking-tight">{title}</h4>
      </div>

      <div className="flex-1 bg-[#F5F5F7] p-4 overflow-y-auto pb-8 relative z-0">
        <div className="grid grid-cols-3 gap-y-6 gap-x-2">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <button
                key={svc.id}
                onClick={() => setActiveService(svc)}
                className="flex flex-col items-center justify-start group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-110 group-active:scale-95 ${activeService?.id === svc.id ? 'bg-[#F14635] text-white shadow-[#F14635]/40' : 'bg-white text-[#F14635]'}`}>
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-medium text-gray-800 text-center leading-tight max-w-[80px]">
                  {svc.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 py-4 px-8 flex justify-between items-center z-10 text-gray-400">
        <div className="flex flex-col items-center text-[#F14635]"><MapPin className="w-6 h-6 mb-1" /></div>
        <div className="flex flex-col items-center"><MessageSquare className="w-6 h-6 mb-1" /></div>
        <div className="flex flex-col items-center"><User className="w-6 h-6 mb-1" /></div>
      </div>

      {activeService && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#F14635]/10 rounded-xl flex items-center justify-center text-[#F14635]">
                {ActiveIcon && <ActiveIcon className="w-6 h-6" />}
              </div>
              <button onClick={() => setActiveService(null)} className="text-gray-400 hover:text-gray-800 bg-gray-100 rounded-full p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h5 className="text-xl font-bold text-gray-900 mb-2">{activeService.name}</h5>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{activeService.desc}</p>
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500 tracking-wider">
              {activeService.type}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
