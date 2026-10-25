import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, ChevronRight, ShoppingBag, ShoppingCart, Plane, 
  MapPin, Box, Landmark, QrCode, Hand, CreditCard, Banknote, 
  Car, Wallet, ArrowLeftRight, FileText, Gift, Settings, 
  Briefcase, TrendingUp, Receipt, Grid, MonitorSmartphone,
  Truck, Megaphone, Calculator, Utensils, Shield, Info, ArrowUpRight
} from 'lucide-react';

// --- CUSTOM HOOKS ---
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// --- DATA CONSTANTS ---
const CONSUMER_SERVICES = [
  { id: 'marketplace', name: 'Marketplace', desc: 'Shop for products from merchants through Kaspi.kz.', type: 'MARKETPLACE', icon: ShoppingBag },
  { id: 'egrocery', name: 'E-Grocery', desc: 'Order groceries online through the platform.', type: 'MARKETPLACE', icon: ShoppingCart },
  { id: 'travel', name: 'Kaspi Travel', desc: 'Access travel-related booking services.', type: 'MARKETPLACE', icon: Plane },
  { id: 'classifieds', name: 'Kaspi Classifieds', desc: 'Browse classified listings.', type: 'MARKETPLACE', icon: MapPin },
  { id: 'postomats', name: 'Kaspi Postomats', desc: 'Access parcel collection services.', type: 'MARKETPLACE', icon: Box },
  { id: 'gov', name: 'Government Services', desc: 'Use supported digital government services.', type: 'ECOSYSTEM', icon: Landmark },
  { id: 'qr', name: 'Kaspi QR', desc: 'Pay participating merchants using QR codes.', type: 'PAYMENTS', icon: QrCode },
  { id: 'alaqan', name: 'Kaspi Alaqan', desc: 'Use supported palm-based payment technology.', type: 'PAYMENTS', icon: Hand },
  { id: 'bnpl', name: 'Buy Now, Pay Later', desc: 'Split eligible purchases into instalments.', type: 'FINTECH', icon: CreditCard },
  { id: 'loan', name: 'General Purpose Loan', desc: 'Access consumer lending services.', type: 'FINTECH', icon: Banknote },
  { id: 'car', name: 'Car Finance', desc: 'Explore vehicle financing products.', type: 'FINTECH', icon: Car },
  { id: 'gold', name: 'Kaspi Gold', desc: 'Access card-related banking services.', type: 'PAYMENTS', icon: Wallet },
  { id: 'deposit', name: 'Kaspi Deposit', desc: 'Access deposit products.', type: 'FINTECH', icon: Landmark },
  { id: 'p2p', name: 'P2P Payments', desc: 'Transfer money between individuals.', type: 'PAYMENTS', icon: ArrowLeftRight },
  { id: 'bills', name: 'Bill Payments', desc: 'Pay household and other supported bills.', type: 'PAYMENTS', icon: FileText },
  { id: 'gift', name: 'Gift Certificates', desc: 'Access gift certificate services.', type: 'ECOSYSTEM', icon: Gift },
  { id: 'integrated', name: 'Integrated Services', desc: 'Explore additional ecosystem services.', type: 'ECOSYSTEM', icon: Settings },
];

const MERCHANT_SERVICES = [
  { id: 'bizacc', name: 'Business Account', desc: 'Access business account functions.', type: 'FINTECH', icon: Briefcase },
  { id: 'finance', name: 'Merchant Finance', desc: 'Explore financing for merchants.', type: 'FINTECH', icon: TrendingUp },
  { id: 'acquiring', name: 'Merchant Acquiring', desc: 'Accept supported customer payments.', type: 'PAYMENTS', icon: QrCode },
  { id: 'mpos', name: 'M-POS & Smart-POS', desc: 'Use merchant payment acceptance tools.', type: 'PAYMENTS', icon: MonitorSmartphone },
  { id: 'invoicing', name: 'Instant Invoicing', desc: 'Create payment requests and invoices.', type: 'PAYMENTS', icon: Receipt },
  { id: 'b2b', name: 'B2B Payments', desc: 'Make business-to-business payments.', type: 'PAYMENTS', icon: ArrowLeftRight },
  { id: 'inventory', name: 'Buy Inventory Now', desc: 'Explore inventory financing options.', type: 'FINTECH', icon: Box },
  { id: 'alipay', name: 'Alipay+', desc: 'Access supported payment connectivity.', type: 'PAYMENTS', icon: Shield },
  { id: 'market', name: 'Marketplace', desc: 'Sell products through the Marketplace.', type: 'MARKETPLACE', icon: ShoppingBag },
  { id: 'delivery', name: 'Kaspi Delivery', desc: 'Access delivery-related merchant services.', type: 'MARKETPLACE', icon: Truck },
  { id: 'ads', name: 'Kaspi Advertising', desc: 'Promote products and reach customers.', type: 'MARKETPLACE', icon: Megaphone },
  { id: 'posreg', name: 'Kaspi POS Register', desc: 'Access supported POS register functions.', type: 'ECOSYSTEM', icon: Calculator },
  { id: 'tax', name: 'Tax Report & Payment', desc: 'Access supported tax reporting & payment features.', type: 'ECOSYSTEM', icon: FileText },
  { id: 'deposit', name: 'Kaspi Pay Deposit', desc: 'Access merchant deposit services.', type: 'FINTECH', icon: Landmark },
  { id: 'resto', name: 'Kaspi Restaurants', desc: 'Access restaurant-related platform services.', type: 'ECOSYSTEM', icon: Utensils },
];

const SWOT_DATA = [
  { id: 'S', title: 'STRENGTHS', items: [
    { id: 's1', title: 'S1. Integrated Super App Ecosystem', desc: 'Seamless connection between Marketplace, Payments, and Fintech creates immense convenience.' },
    { id: 's2', title: 'S2. Strong Network Effects & Engagement', desc: '15.7M average MAU and ~764K active merchants in Kazakhstan.' },
    { id: 's3', title: 'S3. Advanced Logistics Infrastructure', desc: '182M orders delivered in 2025.' }
  ]},
  { id: 'W', title: 'WEAKNESSES', items: [
    { id: 'w1', title: 'W1. Geographic Concentration', desc: 'Historically reliant on the Kazakhstan market for revenue.' },
    { id: 'w2', title: 'W2. Dependence on Digital Infrastructure', desc: 'Vulnerable to tech outages or cyber threats.' },
    { id: 'w3', title: 'W3. International Integration Challenges', desc: 'Hepsiburada operations present additional integration and cost challenges.' }
  ]},
  { id: 'O', title: 'OPPORTUNITIES', items: [
    { id: 'o1', title: 'O1. E-Grocery Expansion', desc: 'GMV growth of 53% in 2025.' },
    { id: 'o2', title: 'O2. Demand for Merchant Services', desc: 'Growing need for B2B payments and merchant financing.' },
    { id: 'o3', title: 'O3. Expansion into Türkiye', desc: 'Access to a large new demographic through Hepsiburada.' }
  ]},
  { id: 'T', title: 'THREATS', items: [
    { id: 't1', title: 'T1. Inflation & Economic Uncertainty', desc: 'Kazakhstan\'s annual inflation reached 12.3% in December 2025.' },
    { id: 't2', title: 'T2. Digital Competition', desc: 'Intensifying competition from Halyk, Freedom, and e-commerce players.' },
    { id: 't3', title: 'T3. Regulatory & Tax Changes', desc: 'Potential shifts in banking regulations or merchant taxation.' }
  ]}
];

const PORTER_FORCES = [
  { id: 'new', name: 'Threat of New Entrants', rating: 'LOW', points: ['Banking regulation and licensing', 'Capital requirements', 'Strong network effects', 'Established merchant and consumer base', 'Logistics and ecosystem barriers'], angle: -90 },
  { id: 'buyers', name: 'Bargaining Power of Buyers', rating: 'MODERATE', points: ['Alternative banking apps', 'Price and fee comparison', 'Merchants have other channels', 'Integrated ecosystem reduces switching convenience', 'Access to an established network'], angle: -18 },
  { id: 'suppliers', name: 'Bargaining Power of Suppliers', rating: 'MODERATE', points: ['Diversified merchant base', 'Limited reliance on individual large depositors', 'External technology dependence', 'Delivery-provider constraints'], angle: 54 },
  { id: 'subs', name: 'Threat of Substitutes', rating: 'MODERATE', points: ['Cash payments', 'Physical retail', 'Non-bank financing', 'Alternative ways to meet customer needs', 'Ecosystem convenience limits some substitution'], angle: 126 },
  { id: 'rivalry', name: 'Competitive Rivalry', rating: 'HIGH', points: ['Halyk Bank', 'Freedom Bank', 'Wildberries', 'Ozon', 'Competing banking, payment, and e-commerce products'], angle: 198 }
];

const INITIAL_BCG_DATA = {
  marketplace: { name: 'Marketplace', growth: 19.40, share: 7.87, priority: 'Delivery reliability, merchant quality, repeat purchases' },
  payments: { name: 'Payments', growth: 13.34, share: 4.07, priority: 'Broad acceptance, reliable transactions, efficient merchant fees' },
  fintech: { name: 'Fintech', growth: 19.80, share: 1.50, priority: 'Responsible lending and credit risk management' }
};

// --- COMPONENTS ---

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-16">
    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
      {title.split('.').map((part, i) => (
        <span key={i}>{part}{i < title.split('.').length - 1 ? <span className="text-[#F14635]">.</span> : ''} </span>
      ))}
    </h2>
    {subtitle && <p className="text-xl md:text-2xl text-gray-400 font-light">{subtitle}</p>}
  </div>
);

const Reveal = ({ children, delay = 0, className = "" }) => {
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

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeNav, setActiveNav] = useState('hero');
  const [navOpen, setNavOpen] = useState(false);

  // Scroll Spy
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
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-[#292929]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold tracking-widest text-lg cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-6 h-6 rounded-full bg-[#F14635] flex items-center justify-center">
              <span className="text-white text-xs">K</span>
            </div>
            <span>KASPI.KZ</span>
          </div>
          
          {/* Desktop Nav */}
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

          {/* Mobile Nav Toggle */}
          <button className="md:hidden text-white" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Nav Menu */}
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

      {/* SECTION 1: HERO */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,70,53,0.15)_0,rgba(8,8,8,1)_50%)]"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <Reveal delay={0}>
            {/* SVG approximation of Kaspi logo */}
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

      {/* SECTION 2: COMPANY OVERVIEW */}
      <section id="overview" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader title="BEYOND BANKING" subtitle="AN INTEGRATED DIGITAL ECOSYSTEM." />
        </Reveal>

        {/* Mission & Ambition */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Reveal delay={100} className="bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#292929] hover:border-[#F14635]/50 transition-colors">
            <h3 className="text-[#F14635] font-bold text-sm tracking-widest mb-4">MISSION</h3>
            <p className="text-2xl md:text-4xl font-semibold mb-8 leading-tight">
              Improve people's lives through innovative products and services.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Innovation', 'Convenience', 'Customer experience', 'Technology'].map(kw => (
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

        {/* Timeline */}
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

        {/* Scale Metrics */}
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

        {/* Business Model */}
        <Reveal>
          <div className="bg-[#141414] rounded-3xl p-8 md:p-16 border border-[#292929] text-center mb-16 relative overflow-hidden">
            <h3 className="text-3xl font-bold mb-12 relative z-10">ONE INTEGRATED ECOSYSTEM</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
              {[
                { title: 'PAYMENTS', sub: 'Transfers · QR · Bills', icon: QrCode },
                { title: 'MARKETPLACE', sub: 'E-commerce · Grocery · Travel', icon: ShoppingBag },
                { title: 'FINTECH', sub: 'Financing · Instalments · Deposits', icon: Landmark }
              ].map((plat, i) => (
                <div key={i} className="w-full md:w-64 aspect-square bg-[#080808] rounded-full border-2 border-[#F14635] flex flex-col items-center justify-center p-6 shadow-[0_0_30px_rgba(241,70,53,0.15)] relative">
                  <plat.icon className="w-12 h-12 text-[#F14635] mb-4" />
                  <h4 className="text-xl font-bold mb-2">{plat.title}</h4>
                  <p className="text-sm text-gray-400 text-center">{plat.sub}</p>
                </div>
              ))}
            </div>
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#F14635]/50 to-transparent z-0 mt-8"></div>
          </div>
        </Reveal>

        {/* Management Strategy */}
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

      {/* SECTION 3: INTERACTIVE SUPER APPS */}
      <section id="apps" className="py-24 px-6 bg-[#141414] border-y border-[#292929]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader title="TWO SUPER APPS" subtitle="ONE CONNECTED ECOSYSTEM." />
          </Reveal>

          {/* Interactive Phones */}
          <div className="flex flex-col xl:flex-row justify-center items-center gap-16 mt-16 relative">
            
            {/* Desktop Connect Line */}
            <div className="hidden xl:block absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#F14635]/20 via-[#F14635] to-[#F14635]/20 z-0">
              <div className="absolute inset-0 bg-[#F14635] animate-pulse"></div>
            </div>

            {/* Consumer App */}
            <Reveal className="relative z-10 group" delay={100}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Consumer Super App</h3>
                <p className="text-[#F14635]">15.7M Average MAU</p>
              </div>
              <PhoneFrame title="Kaspi.kz" services={CONSUMER_SERVICES} type="consumer" />
            </Reveal>

            {/* Merchant App */}
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

      {/* SECTION 4: SWOT */}
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
                {quadrant.items.map((item, i) => (
                  <div key={item.id} className="group relative bg-[#080808] border border-[#292929] hover:border-[#F14635] p-4 rounded-xl cursor-help transition-colors">
                    <p className="font-semibold text-gray-200 group-hover:text-white transition-colors">{item.title}</p>
                    {/* Tooltip on hover */}
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

      {/* SECTION 5: BCG MATRIX */}
      <section id="bcg" className="py-24 px-6 bg-[#141414] border-y border-[#292929]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader title="BCG GROWTH-SHARE MATRIX" subtitle="Where Do Kaspi.kz's Business Platforms Stand?" />
          </Reveal>
          <BCGSection />
        </div>
      </section>

      {/* SECTION 6: PORTER'S FIVE FORCES */}
      <section id="porter" className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader title="PORTER'S FIVE FORCES" subtitle="Understanding Competitive Pressure." />
        </Reveal>
        <PorterSection />
      </section>

      {/* SECTION 7: RECOMMENDATION */}
      <section id="recommendation" className="py-24 px-6 bg-[#F14635] text-white selection:bg-white selection:text-[#F14635]">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-white/80">OUR RECOMMENDATION</h2>
            <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none">
              GROWTH NEEDS<br/>DISCIPLINE.
            </h3>
            <div className="bg-white text-[#080808] p-8 md:p-12 rounded-3xl max-w-4xl mx-auto shadow-2xl mb-16">
              <h4 className="text-2xl md:text-4xl font-black mb-6">IMPLEMENT A SIX-MONTH INVESTMENT-REVIEW PILOT</h4>
              <p className="text-lg md:text-xl font-medium text-gray-700">
                Evaluate major projects using operational performance, agreed budgets, and measurable outcomes before approving further investment.
              </p>
            </div>
          </Reveal>

          {/* Context Drivers */}
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

          {/* Pilot Projects */}
          <Reveal delay={400} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
            <div className="bg-[#080808]/20 backdrop-blur-sm p-8 rounded-3xl border border-white/20 text-left">
              <p className="text-sm font-bold opacity-80 mb-2">PROJECT 01: KAZAKHSTAN</p>
              <h5 className="text-2xl font-bold mb-6">Marketplace Delivery</h5>
              <ul className="space-y-3">
                {['Cost per completed order', 'On-time delivery', 'Customer complaints'].map((kpi, i) => (
                  <li key={i} className="flex items-center"><ChevronRight className="w-5 h-5 mr-2 opacity-70"/> {kpi}</li>
                ))}
              </ul>
            </div>
            <div className="bg-[#080808]/20 backdrop-blur-sm p-8 rounded-3xl border border-white/20 text-left">
              <p className="text-sm font-bold opacity-80 mb-2">PROJECT 02: TÜRKIYE</p>
              <h5 className="text-2xl font-bold mb-6">Hepsiburada Integration</h5>
              <ul className="space-y-3">
                {['Operating results', 'Spending against budget', 'Integration progress'].map((kpi, i) => (
                  <li key={i} className="flex items-center"><ChevronRight className="w-5 h-5 mr-2 opacity-70"/> {kpi}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Timeline */}
          <Reveal delay={600} className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Line */}
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
            <h3 className="text-3xl md:text-5xl font-black mb-6">THE GOAL IS NOT GROWTH AT ANY COST.<br/>IT IS SUSTAINABLE, WELL-MANAGED GROWTH.</h3>
            <div className="bg-[#080808] inline-block px-8 py-4 rounded-full border border-white/20">
              <p className="text-xl font-bold">Overall Assessment: Management is effective, with qualifications.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-400">
                <span>Integration</span> • <span>Innovation</span> • <span>Operational Discipline</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 8: REFERENCES */}
      <section id="references" className="py-24 px-6 max-w-4xl mx-auto">
        <Reveal>
          <SectionHeader title="SOURCES & REFERENCES" />
        </Reveal>
        <Reveal delay={200} className="bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#292929]">
          <ol className="list-decimal list-outside ml-6 space-y-6 text-sm text-gray-400">
            <li>Joint Stock Company Kaspi.kz. (2026). Annual report on Form 20-F for the year ended December 31, 2025. <a href="https://ir.kaspi.kz/media/Form_20-F_2025.pdf" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline flex items-center inline-flex ml-1"><ArrowUpRight className="w-3 h-3"/> PDF</a></li>
            <li>Joint Stock Company Kaspi.kz. (2026, March 2). 4Q & FY 2025 results. <a href="https://ir.kaspi.kz/media/4Q__FY_2025_Presentation.pdf" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline flex items-center inline-flex ml-1"><ArrowUpRight className="w-3 h-3"/> PDF</a></li>
            <li>Joint Stock Company Kaspi.kz. (n.d.). Mission. <a href="https://ir.kaspi.kz/about/mission/" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Joint Stock Company Kaspi.kz. (n.d.). History. <a href="https://ir.kaspi.kz/about/history/" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Bureau of National Statistics. (2026). E-commerce in the Republic of Kazakhstan (2025). <a href="https://stat.gov.kz/en/industries/economy/local-market/publications/488906/" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>National Bank of Kazakhstan. (2026). Statistics of payment cards: Version No. 268. <a href="https://nationalbank.kz/en/news/elektronnye-bankovskie-uslugi/18537" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline">Link</a></li>
            <li>Halyk Finance. (2026, February 25). Review of banking sector development (2018–2025). <a href="https://halykfinance.kz/download/files/analytics/banks_feb2026.pdf" target="_blank" rel="noreferrer" className="text-[#F14635] hover:underline flex items-center inline-flex ml-1"><ArrowUpRight className="w-3 h-3"/> PDF</a></li>
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

// --- SUBCOMPONENTS ---

function PhoneFrame({ title, services, type }) {
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="w-[320px] h-[680px] bg-white rounded-[3rem] border-[12px] border-[#292929] shadow-2xl relative overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02]">
      {/* Phone Notch */}
      <div className="absolute top-0 inset-x-0 h-7 w-40 bg-[#292929] rounded-b-3xl mx-auto z-20 flex justify-center items-center">
        <div className="w-16 h-1.5 bg-[#141414] rounded-full"></div>
      </div>

      {/* App Header */}
      <div className="bg-[#F14635] pt-12 pb-6 px-6 text-white text-center shadow-md z-10">
        <h4 className="text-xl font-extrabold tracking-tight">{title}</h4>
      </div>

      {/* App Content */}
      <div className="flex-1 bg-[#F5F5F7] p-4 overflow-y-auto pb-8 relative z-0">
        <div className="grid grid-cols-3 gap-y-6 gap-x-2">
          {services.map((svc) => (
            <button 
              key={svc.id}
              onClick={() => setActiveService(svc)}
              className="flex flex-col items-center justify-start group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-110 group-active:scale-95 ${activeService?.id === svc.id ? 'bg-[#F14635] text-white shadow-[#F14635]/40' : 'bg-white text-[#F14635]'}`}>
                <svc.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-medium text-gray-800 text-center leading-tight max-w-[80px]">
                {svc.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Nav Mock */}
      <div className="bg-white border-t border-gray-200 py-4 px-8 flex justify-between items-center z-10 text-gray-400">
        <div className="flex flex-col items-center text-[#F14635]"><MapPin className="w-6 h-6 mb-1"/></div>
        <div className="flex flex-col items-center"><MessageSquareMock className="w-6 h-6 mb-1"/></div>
        <div className="flex flex-col items-center"><UserMock className="w-6 h-6 mb-1"/></div>
      </div>

      {/* Interactive Modal */}
      {activeService && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#F14635]/10 rounded-xl flex items-center justify-center text-[#F14635]">
                <activeService.icon className="w-6 h-6" />
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

// Icons placeholders for bottom nav
const MessageSquareMock = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;
const UserMock = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;


function BCGSection() {
  const [data, setData] = useState(INITIAL_BCG_DATA);
  const [activeTab, setActiveTab] = useState('marketplace');
  const [threshold, setThreshold] = useState(10); // Growth threshold

  const activeData = data[activeTab];

  const handleSliderChange = (e, field) => {
    const val = parseFloat(e.target.value);
    setData(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: val }
    }));
  };

  const resetData = () => {
    setData(INITIAL_BCG_DATA);
    setThreshold(10);
  };

  // BCG Positioning Logic
  // X-Axis (Relative Market Share): Left = 10, Center = 1.0, Right = 0.1
  // We use standard log mapping for BCG. Log10(10)=1, Log10(1)=0, Log10(0.1)=-1
  // Map x-coordinate from 0% (Left) to 100% (Right)
  const getX = (share) => {
    // Math.log10(10) = 1 => map to 0%
    // Math.log10(1) = 0 => map to 50%
    // Math.log10(0.1) = -1 => map to 100%
    const logVal = Math.log10(Math.max(0.1, Math.min(10, share)));
    return 50 - (logVal * 50); 
  };

  // Y-Axis (Market Growth Rate): Top = 30%, Center = Threshold, Bottom = -10%
  // Map y-coordinate from 0% (Top) to 100% (Bottom)
  const getY = (growth) => {
    const range = 20; // 30 - 10 = 20, 10 - (-10) = 20
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
      {/* Controls Panel */}
      <Reveal delay={100} className="w-full lg:w-1/3 bg-[#080808] p-8 rounded-3xl border border-[#292929]">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-[#F14635]" /> EXPLORE SCENARIOS
        </h3>
        
        <div className="mb-8 flex space-x-2 bg-[#141414] p-1 rounded-xl">
          {Object.keys(data).map(key => (
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

      {/* Chart Panel */}
      <Reveal delay={300} className="w-full lg:w-2/3">
        <div className="aspect-square max-h-[700px] w-full bg-[#0a0a0a] rounded-3xl border-2 border-[#292929] relative overflow-hidden flex shadow-2xl">
          
          {/* Quadrant Backgrounds & Labels */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-[#292929] flex p-6 opacity-30"><span className="text-4xl font-black text-white">STARS</span></div>
            <div className="border-b border-[#292929] flex justify-end p-6 opacity-30"><span className="text-4xl font-black text-white">QUESTION MARKS</span></div>
            <div className="border-r border-[#292929] flex items-end p-6 opacity-30"><span className="text-4xl font-black text-white">CASH COWS</span></div>
            <div className="flex items-end justify-end p-6 opacity-30"><span className="text-4xl font-black text-white">DOGS</span></div>
          </div>

          {/* Axes Lines */}
          <div className="absolute left-0 right-0 h-px bg-white/40 top-1/2 z-10"></div>
          <div className="absolute top-0 bottom-0 w-px bg-white/40 left-1/2 z-10"></div>

          {/* Axis Labels */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-xs font-bold text-gray-400 tracking-widest z-20">MARKET GROWTH</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 tracking-widest z-20">RELATIVE MARKET SHARE (LOG)</div>

          {/* Scale Markers */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] px-2">30%</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] px-2">-10%</div>
          <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] py-1">10.0</div>
          <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-gray-500 z-10 bg-[#0a0a0a] py-1">0.1</div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-2 text-[10px] text-[#F14635] z-10 bg-[#0a0a0a] px-1 font-bold">{threshold}% / 1.0</div>

          {/* Bubbles */}
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

function PorterSection() {
  const [activeForce, setActiveForce] = useState(PORTER_FORCES[4]); // Default Rivalry High

  return (
    <div className="flex flex-col xl:flex-row items-center gap-12 mt-16 min-h-[600px]">
      
      {/* Interactive Radial Diagram */}
      <Reveal className="w-full xl:w-3/5 h-[500px] md:h-[600px] relative flex items-center justify-center bg-[#141414] rounded-3xl border border-[#292929] overflow-hidden">
        
        {/* Connecting Lines SVG */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {PORTER_FORCES.map((force, i) => {
            // Simplified line drawing from center to rough node positions
            // SVG coordinates center is 50%, 50%
            const angleRad = force.angle * (Math.PI / 180);
            const r = 40; // percentage radius
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

        {/* Center Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#080808] border-4 border-[#F14635] w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(241,70,53,0.3)]">
          <span className="text-xl md:text-2xl font-black text-white tracking-tighter">KASPI.KZ</span>
        </div>

        {/* Peripheral Nodes */}
        {PORTER_FORCES.map((force) => {
          // Calculate positions purely in CSS using the known angles
          // -90 is top, 0 is right, 90 is bottom, 180 is left.
          const r = window.innerWidth < 768 ? 42 : 38; // Radius % from center
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

      {/* Info Panel */}
      <Reveal delay={200} className="w-full xl:w-2/5 flex flex-col justify-center">
        <div className="bg-[#080808] p-8 md:p-10 rounded-3xl border border-[#292929] h-full shadow-2xl relative overflow-hidden">
          
          {/* Dynamic BG color bar based on rating */}
          <div className={`absolute top-0 left-0 right-0 h-2 ${activeForce.rating === 'HIGH' ? 'bg-[#F14635]' : activeForce.rating === 'MODERATE' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>

          <h3 className="text-3xl font-bold mb-4 mt-2">{activeForce.name}</h3>
          
          {/* Intensity Bar */}
          <div className="flex items-center space-x-2 mb-8 bg-[#141414] p-3 rounded-lg w-max border border-[#292929]">
             {['LOW', 'MODERATE', 'HIGH'].map(level => (
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
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><Landmark className="w-4 h-4 mr-2 text-[#F14635]"/> Halyk</span>
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><Landmark className="w-4 h-4 mr-2 text-[#F14635]"/> Freedom</span>
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><ShoppingBag className="w-4 h-4 mr-2 text-[#F14635]"/> Wildberries</span>
              <span className="px-3 py-1 bg-[#141414] border border-[#292929] rounded text-sm text-gray-300 flex items-center"><ShoppingBag className="w-4 h-4 mr-2 text-[#F14635]"/> Ozon</span>
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