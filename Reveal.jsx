import { useScrollReveal } from '../hooks/useScrollReveal';

export const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
};

export const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-16">
    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
      {title.split('.').map((part, i) => (
        <span key={i}>{part}{i < title.split('.').length - 1 ? <span className="text-[#F14635]">.</span> : ''} </span>
      ))}
    </h2>
    {subtitle && <p className="text-xl md:text-2xl text-gray-400 font-light">{subtitle}</p>}
  </div>
);
