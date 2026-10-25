import {
  ShoppingBag, ShoppingCart, Plane, MapPin, Box, Landmark, QrCode, Hand,
  CreditCard, Banknote, Car, Wallet, ArrowLeftRight, FileText, Gift, Settings,
  Briefcase, TrendingUp, Receipt, MonitorSmartphone, Truck, Megaphone,
  Calculator, Utensils, Shield,
} from 'lucide-react';

export const CONSUMER_SERVICES = [
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

export const MERCHANT_SERVICES = [
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

export const SWOT_DATA = [
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
    { id: 't1', title: 'T1. Inflation & Economic Uncertainty', desc: "Kazakhstan's annual inflation reached 12.3% in December 2025." },
    { id: 't2', title: 'T2. Digital Competition', desc: 'Intensifying competition from Halyk, Freedom, and e-commerce players.' },
    { id: 't3', title: 'T3. Regulatory & Tax Changes', desc: 'Potential shifts in banking regulations or merchant taxation.' }
  ]}
];

export const PORTER_FORCES = [
  { id: 'new', name: 'Threat of New Entrants', rating: 'LOW', points: ['Banking regulation and licensing', 'Capital requirements', 'Strong network effects', 'Established merchant and consumer base', 'Logistics and ecosystem barriers'], angle: -90 },
  { id: 'buyers', name: 'Bargaining Power of Buyers', rating: 'MODERATE', points: ['Alternative banking apps', 'Price and fee comparison', 'Merchants have other channels', 'Integrated ecosystem reduces switching convenience', 'Access to an established network'], angle: -18 },
  { id: 'suppliers', name: 'Bargaining Power of Suppliers', rating: 'MODERATE', points: ['Diversified merchant base', 'Limited reliance on individual large depositors', 'External technology dependence', 'Delivery-provider constraints'], angle: 54 },
  { id: 'subs', name: 'Threat of Substitutes', rating: 'MODERATE', points: ['Cash payments', 'Physical retail', 'Non-bank financing', 'Alternative ways to meet customer needs', 'Ecosystem convenience limits some substitution'], angle: 126 },
  { id: 'rivalry', name: 'Competitive Rivalry', rating: 'HIGH', points: ['Halyk Bank', 'Freedom Bank', 'Wildberries', 'Ozon', 'Competing banking, payment, and e-commerce products'], angle: 198 }
];

export const INITIAL_BCG_DATA = {
  marketplace: { name: 'Marketplace', growth: 19.40, share: 7.87, priority: 'Delivery reliability, merchant quality, repeat purchases' },
  payments: { name: 'Payments', growth: 13.34, share: 4.07, priority: 'Broad acceptance, reliable transactions, efficient merchant fees' },
  fintech: { name: 'Fintech', growth: 19.80, share: 1.50, priority: 'Responsible lending and credit risk management' }
};
