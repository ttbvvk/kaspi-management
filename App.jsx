import { useEffect, useState } from 'react';
import {
  Menu, X, ChevronRight, ShoppingBag,
  Landmark, QrCode, ArrowUpRight
} from 'lucide-react';
import { CONSUMER_SERVICES, MERCHANT_SERVICES, SWOT_DATA } from './data';
import { Reveal, SectionHeader } from './components/Reveal';
import { PhoneFrame } from './components/PhoneFrame';
import { BCGSection } from './components/BCGSection';
import { PorterSection } from './components/PorterSection';

export default function App() {
  const [activeNav, setActiveNav] = useState('hero');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'overview', 'apps', 'swot', 'bcg', 'porter', 'recommendation', 'references'];
      let current = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          current = section;
        }
      }
      setActiveNav(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#F14635] selection:text-white overflow-x-hidden">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold tracking-widest text-lg cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-6 h-6 rounded-full bg-[#F14635] flex items-center justify-center">
              <span className="text-white text-xs">K</span>
            </div>
            <span>KASPI.KZ</span>
          </div>

          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-400">
            {['Overview', 'Ecosystem', 'SWOT', 'BCG Matrix', 'Five Forces', 'Recommendation', 'References'].map((item) => {
              const id = item.split(' ')[0].toLowerCase();
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id === 'ecosystem' ? 'apps' : id)}
                  className={`hover:text-white transition-colors ${activeNav === (id === 'ecosystem' ? 'apps' : id) ? 'text-white border-b-2 border-[#F14635]' : ''}`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button className="md:hidden text-white" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#141414] border-b border-[#292929] flex flex-col p-4 space-y-4 shadow-xl">
            {['Overview', 'Ecosystem', 'SWOT', 'BCG', 'Porter', 'Recommendation', 'References'].map((item) => {
              const id = item.toLowerCase() === 'ecosystem' ? 'apps' : item.toLowerCase();
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left text-lg font-medium text-gray-300 hover:text-[#F14635]"
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,70,53,0.15)_0,rgba(8,8,8,1)_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <Reveal delay={0}>
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#F14635] flex items-center justify-center mb-8 mx-auto shadow-[0_0_60px_rgba(241,70,53,0.4)]">
              <span className="text-5xl md:text-7xl font-bold text-white tracking-tighter">Kaspi</span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
              KASPI.KZ
            </h1>
            <h2 className="text-2xl md:text-4xl font-light text-gray-300 mb-8 tracking-tight">
              ONE ECOSYSTEM. <span className="text-[#F14635] font-semibold">THREE PLATFORMS.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              An Interactive Strategic Management Case Study exploring how Kaspi.kz creates competitive advantage through integration, innovation, and management strategy.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <button
              onClick={() => scrollTo('overview')}
              className="group relative px-8 py-4 bg-[#F14635] text-white font-bold rounded-full overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                EXPLORE THE ANALYSIS <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </Reveal>
        </div>
      </section>

      <section id="overview" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader title="BEYOND BANKING" subtitle="AN INTEGRATED DIGITAL ECOSYSTEM." />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Reveal delay={100} className="bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#292929] hover:border-[#F14635]/50 transition-colors">
            <h3 className="text-[#F14635] font-bold text-sm tracking-widest mb-4">MISSION</h3>
            <p className="text-2xl md:text-4xl font-semibold mb-8 leading-tight">
              Improve people's lives through innovative products and services.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Innovation', 'Convenience', 'Customer experience', 'Technology'].map((kw) => (
                <span key={kw} className="px-4 py-2 bg-[#080808] border border-[#292929] rounded-full text-sm text-gray-400">{kw}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#292929] flex flex-col justify-center items-center text-center">
            <h3 className="text-gray-400 font-bold text-sm tracking-widest mb-4">LONG-TERM AMBITION</h3>
            <p className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-4">
              100M
            </p>
            <p className="text-xl text-[#F14635] font-medium tracking-widest uppercase">Users</p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mb-24">
            <h3 className="text-2xl font-bold mb-8">Evolution</h3>
            <div className="flex overflow-x-auto pb-8 space-x-6 snap-x hide-scrollbar">
              {[
                { y: '2008', t: 'Registration of the Kaspi.kz legal entity' },
                { y: '2014', t: 'Marketplace & consumer financing developments' },
                { y: '2015', t: 'Kaspi Gold launch' },
                { y: '2017', t: 'Kaspi mobile application launch' },
                { y: '2024', t: 'Nasdaq listing (KSPI)' },
                { y: '2025', t: 'Expansion into Türkiye through Hepsiburada' }
              ].map((item, i) => (
                <div key={i} className="min-w-[280px] bg-[#141414] p-6 rounded-2xl border border-[#292929] snap-start relative">
                  <div className="absolute top-0 left-6 w-px h-full bg-[#292929] -z-10"></div>
                  <div className="w-4 h-4 rounded-full bg-[#F14635] mb-4"></div>
                  <h4 className="text-4xl font-bold text-white mb-2">{item.y}</h4>
                  <p className="text-gray-400">{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-8">2025 Scale Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { val: '15.7M', lbl: 'Average Monthly Active Users', sub: 'Kazakhstan Consumer Super App' },
              { val: '764K', lbl: 'Active Merchants', sub: 'Kazakhstan Kaspi Pay' },
              { val: '27.5M', lbl: 'Group Users', sub: 'Kazakhstan & Türkiye' },
              { val: '68%', lbl: 'DAU / MAU Ratio', sub: 'Kazakhstan' },
              { val: '77', lbl: 'Monthly Transactions', sub: 'Per Active Consumer (Kazakhstan)' },
              { val: '10,441', lbl: 'Kaspi Postomats', sub: 'Year-end 2025' }
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 100} className="bg-[#141414] p-6 md:p-8 rounded-2xl border border-[#292929] text-center flex flex-col justify-center">
                <p className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tighter">{stat.val}</p>
                <p className="text-sm md:text-base font-semibold text-[#F14635] mb-1">{stat.lbl}</p>
                <p className="text-xs text-gray-500">{stat.sub}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="bg-[#141414] rounded-3xl p-8 md:p-16 border border-[#292929] text-center mb-16 relative overflow-hidden">
            <h3 className="text-3xl font-bold mb-12 relative z-10">ONE INTEGRATED ECOSYSTEM</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
              {[
                { title: 'PAYMENTS', sub: 'Transfers · QR · Bills', icon: QrCode },
                { title: 'MARKETPLACE', sub: 'E-commerce · Grocery · Travel', icon: ShoppingBag },
                { title: 'FINTECH', sub: 'Financing · Instalments · Deposits', icon: Landmark }
              ].map((plat, i) => {
                const Icon = plat.icon;
                return (
                  <div key={i} className="w-full md:w-64 aspect-square bg-[#080808] rounded-full border-2 border-[#F14635] flex flex-col items-center justify-center p-6 shadow-[0_0_30px_rgba(241,70,53,0.15)] relative">
                    <Icon className="w-12 h-12 text-[#F14635] mb-4" />
                    <h4 className="text-xl font-bold mb-2">{plat.title}</h4>
                    <p className="text-sm text-gray-400 text-center">{plat.sub}</p>
                  </div>
                );
              })}
            </div>
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#F14635]/50 to-transparent z-0 mt-8"></div>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="text-2xl font-bold mb-8">HOW KASPI.KZ IS MANAGED</h3>
          <p className="text-xl text-gray-300 mb-8 border-l-4 border-[#F14635] pl-4">Differentiation Through Integration</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { t: 'PLANNING', d: 'Customer-focused innovation and expansion' },
              { t: 'ORGANIZING', d: 'Coordination across three platforms' },
              { t: 'LEADING', d: 'Innovation, teamwork, and customer service' },
              { t: 'CONTROLLING', d: 'Risk management, audits, and performance monitoring' }
            ].map((func, i) => (
              <div key={i} className="bg-[#141414] p-6 rounded-xl border border-[#292929]">
                <h4 className="text-[#F14635] font-bold text-sm mb-2">{func.t}</h4>
                <p className="text-gray-300 text-sm">{func.d}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#F14635]/10 border border-[#F14635]/30 p-6 rounded-xl text-center">
            <p className="font-bold text-white text-lg">Core advantage: Convenience through ecosystem integration.</p>
          </div>
        </Reveal>
      </section>

      <section id="apps" className="py-24 px-6 bg-[#141414] border-y border-[#292929]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader title="TWO SUPER APPS" subtitle="ONE CONNECTED ECOSYSTEM." />
          </Reveal>

          <div className="flex flex-col xl:flex-row justify-center items-center gap-16 mt-16 relative">
            <div className="hidden xl:block absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#F14635]/20 via-[#F14635] to-[#F14635]/20 z-0">
              <div className="absolute inset-0 bg-[#F14635] animate-pulse"></div>
            </div>

            <Reveal className="relative z-10 group" delay={100}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Consumer Super App</h3>
                <p className="text-[#F14635]">15.7M Average MAU</p>
              </div>
              <PhoneFrame title="Kaspi.kz" services={CONSUMER_SERVICES} type="consumer" />
            </Reveal>

            <Reveal className="relative z-10 group" delay={300}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Kaspi Pay Merchant</h3>
                <p className="text-[#F14635]">~764K Active Merchants</p>
              </div>
              <PhoneFrame title="Kaspi Pay" services={MERCHANT_SERVICES} type="merchant" />
            </Reveal>
          </div>
          <p className="text-center text-gray-500 mt-12 text-sm max-w-2xl mx-auto">
            *Click on the application icons to explore specific services. The dual-app structure enables powerful two-sided network effects across the Marketplace, Payments, and Fintech platforms.
          </p>
        </div>
      </section>

      <section id="swot" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader title="SWOT ANALYSIS" subtitle="Internal Capabilities. External Challenges." />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-12">
          {SWOT_DATA.map((quadrant, qIdx) => (
            <Reveal key={quadrant.id} delay={qIdx * 100} className="bg-[#141414] rounded-3xl border border-[#292929] overflow-hidden flex flex-col h-full">
              <div className={`p-6 border-b border-[#292929] ${quadrant.id === 'S' || quadrant.id === 'O' ? 'bg-[#141414]' : 'bg-[#0a0a0a]'}`}>
                <h3 className="text-3xl font-black tracking-tighter flex items-center">
                  <span className="text-[#F14635] mr-4 text-5xl">{quadrant.id}</span>
                  {quadrant.title}
                </h3>
              </div>
              <div className="p-6 flex-grow flex flex-col space-y-4">
                {quadrant.items.map((item) => (
                  <div key={item.id} className="group relative bg-[#080808] border border-[#292929] hover:border-[#F14635] p-4 rounded-xl cursor-help transition-colors">
                    <p className="font-semibold text-gray-200 group-hover:text-white transition-colors">{item.title}</p>
                    <div className="absolute left-0 bottom-full mb-2 w-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20">
                      <div className="bg-[#F14635] text-white text-sm p-3 rounded-lg shadow-xl relative">
                        {item.desc}
                        <div className="absolute top-full left-6 -mt-1 border-4 border-transparent border-t-[#F14635]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-12">
          <div className="bg-[#F14635] text-white p-6 md:p-8 rounded-2xl text-center max-w-4xl mx-auto shadow-[0_10px_40px_rgba(241,70,53,0.3)]">
            <h4 className="text-sm font-bold tracking-widest uppercase mb-2 text-white/80">Strategic Implication</h4>
            <p className="text-xl md:text-2xl font-semibold">
              Use ecosystem strengths while controlling expansion and operational risks.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="bcg" className="py-24 px-6 bg-[#141414] border-y border-[#292929]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader title="BCG GROWTH-SHARE MATRIX" subtitle="Where Do Kaspi.kz's Business Platforms Stand?" />
          </Reveal>
          <BCGSection />
        </div>
      </section>

      <section id="porter" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader title="PORTER'S FIVE FORCES" subtitle="Understanding Competitive Pressure." />
        </Reveal>
        <PorterSection />
      </section>

      <section id="recommendation" className="py-24 px-6 bg-[#F14635] text-white selection:bg-white selection:text-[#F14635]">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-white/80">OUR RECOMMENDATION</h2>
            <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none">
              GROWTH NEEDS<br />DISCIPLINE.
            </h3>
            <div className="bg-white text-[#080808] p-8 md:p-12 rounded-3xl max-w-4xl mx-auto shadow-2xl mb-16">
              <h4 className="text-2xl md:text-4xl font-black mb-6">IMPLEMENT A SIX-MONTH INVESTMENT-REVIEW PILOT</h4>
              <p className="text-lg md:text-xl font-medium text-gray-700">
                Evaluate major projects using operational performance, agreed budgets, and measurable outcomes before approving further investment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {[
              { t: 'SWOT', d: 'International integration and operational risks' },
              { t: 'BCG', d: 'Maintain strong positions through selective investment' },
              { t: 'FIVE FORCES', d: 'High competitive rivalry demands efficiency' }
            ].map((ctx, i) => (
              <div key={i} className="border-t-2 border-white/30 pt-4 text-left">
                <h5 className="font-bold text-xl mb-2">{ctx.t}</h5>
                <p className="text-white/90">{ctx.d}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={400} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
            <div className="bg-[#080808]/20 backdrop-blur-sm p-8 rounded-3xl border border-white/20 text-left">
              <p className="text-sm font-bold opacity-80 mb-2">PROJECT 01: KAZAKHSTAN</p>
              <h5 className="text-2xl font-bold mb-6">Marketplace Delivery</h5>
              <ul className="space-y-3">
                {['Cost per completed order', 'On-time delivery', 'Customer complaints'].map((kpi, i) => (
                  <li key={i} className="flex items-center"><ChevronRight className="w-5 h-5 mr-2 opacity-70" /> {kpi}</li>
                ))}
              </ul>
            </div>
            <div className="bg-[#080808]/20 backdrop-blur-sm p-8 rounded-3xl border border-white/20 text-left">
              <p className="text-sm font-bold opacity-80 mb-2">PROJECT 02: TÜRKIYE</p>
              <h5 className="text-2xl font-bold mb-6">Hepsiburada Integration</h5>
              <ul className="space-y-3">
                {['Operating results', 'Spending against budget', 'Integration progress'].map((kpi, i) => (
                  <li key={i} className="flex items-center"><ChevronRight className="w-5 h-5 mr-2 opacity-70" /> {kpi}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={600} className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute top-8 left-0 right-0 h-1 bg-white/20 hidden md:block"></div>
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {[
                  { m: 'MONTH 0', t: 'SET TARGETS', d: 'Agree on budgets, expectations, and KPIs.' },
                  { m: 'MONTH 3', t: 'INTERIM REVIEW', d: 'Compare actual performance against the plan.' },
                  { m: 'MONTH 6', t: 'MANAGEMENT DECISION', d: 'Continue funding, modify, or reconsider.' }
                ].map((step, i) => (
                  <div key={i} className="bg-[#080808] text-white p-6 rounded-2xl shadow-xl transform transition-transform hover:-translate-y-2 cursor-pointer border border-[#292929] hover:border-white">
                    <div className="w-4 h-4 rounded-full bg-[#F14635] mx-auto mb-4 border-2 border-[#080808] ring-2 ring-white"></div>
                    <p className="text-[#F14635] font-bold text-sm mb-1">{step.m}</p>
                    <h6 className="font-bold text-xl mb-3">{step.t}</h6>
                    <p className="text-sm text-gray-400">{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={800} className="mt-32">
            <h3 className="text-3xl md:text-5xl font-black mb-6">THE GOAL IS NOT GROWTH AT ANY COST.<br />IT IS SUSTAINABLE, WELL-MANAGED GROWTH.</h3>
            <div className="bg-[#080808] inline-block px-8 py-4 rounded-full border border-white/20">
              <p className="text-xl font-bold">Overall Assessment: Management is effective, with qualifications.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-400">
                <span>Integration</span> • <span>Innovation</span> • <span>Operational Discipline</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="references" className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <SectionHeader title="SOURCES & REFERENCES" />
        </Reveal>
        <Reveal delay={200} className="bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#292929]">
          <ol className="list-decimal list-outside ml-6 space-y-6 text-sm text-gray-400">
            <li>Joint Stock Company Kaspi.kz. (2026). Annual report on Form 20-F for the year ended December 31, 2025. <a href="https://ir.kaspi.kz/media/Form_20-F_2025.pdf" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline inline-flex items-center ml-1"><ArrowUpRight className="w-3 h-3" /> PDF</a></li>
            <li>Joint Stock Company Kaspi.kz. (2026, March 2). 4Q & FY 2025 results. <a href="https://ir.kaspi.kz/media/4Q__FY_2025_Presentation.pdf" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline inline-flex items-center ml-1"><ArrowUpRight className="w-3 h-3" /> PDF</a></li>
            <li>Joint Stock Company Kaspi.kz. (n.d.). Mission. <a href="https://ir.kaspi.kz/about/mission/" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Joint Stock Company Kaspi.kz. (n.d.). History. <a href="https://ir.kaspi.kz/about/history/" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Bureau of National Statistics. (2026). E-commerce in the Republic of Kazakhstan (2025). <a href="https://stat.gov.kz/en/industries/economy/local-market/publications/488906/" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>National Bank of Kazakhstan. (2026). Statistics of payment cards: Version No. 268. <a href="https://nationalbank.kz/en/news/elektronnye-bankovskie-uslugi/18537" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Halyk Finance. (2026, February 25). Review of banking sector development (2018–2025). <a href="https://halykfinance.kz/download/files/analytics/banks_feb2026.pdf" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline inline-flex items-center ml-1"><ArrowUpRight className="w-3 h-3" /> PDF</a></li>
            <li>Boston Consulting Group. (n.d.). What is the growth share matrix? <a href="https://www.bcg.com/about/overview/our-history/growth-share-matrix" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Porter, M. E. (2008). The five competitive forces that shape strategy. Harvard Business Review, 86(1), 78–93. <a href="https://hbr.org/2008/01/the-five-competitive-forces-that-shape-strategy" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Daft, R. L. (2022). Management (14th ed.). Cengage Learning.</li>
          </ol>
          <div className="mt-12 pt-8 border-t border-[#292929] text-xs text-gray-500 text-center">
            <p>Developed for academic strategic management case study presentation.</p>
            <p>Data reflects 2025 full-year reporting as published in early 2026.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
