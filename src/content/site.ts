export type Agent = {
  name: string
  slug: string
  role: string
  image: string
  bio: string
}

export type ServicePage = {
  slug: string
  title: string
  eyebrow: string
  intro: string
  sections: { title: string; body: string }[]
  image?: string
}

export const phone = '(281) 241-3121'
export const email = 'info@1sttexasrealtors.com'

export const serviceAreas = [
  'Baytown', 'Clear Lake City', 'Clear Lake Shores', 'Deer Park', 'Dickinson',
  'El Lago', 'Friendswood', 'Galveston', 'Kemah', 'La Porte', 'League City',
  'Nassau Bay', 'Pasadena', 'Pearland', 'San Leon', 'Seabrook', 'Shoreacres',
  'Taylor Lake Village', 'Texas City', 'Tiki Island', 'Webster',
]

export const areaSlug = (area: string) => area.toLowerCase().replaceAll(' ', '-')
export const salePath = (area: string) => `/realtors-in-${areaSlug(area)}/`
export const rentPath = (area: string) => `/${areaSlug(area)}-tx-homes-for-rent/`

export const agents: Agent[] = [
  { name: 'Mark Bocado', slug: 'mark-bocado', role: 'Realtor', image: '/assets/reference/agents/Mark-Bocado.jpg', bio: 'A knowledgeable and responsive Realtor focused on helping clients move confidently through the Clear Lake NASA market.' },
  { name: 'Matt Bradley', slug: 'matt-bradley', role: 'Realtor', image: '/assets/reference/agents/Matt-Bradley.jpg', bio: 'Matt brings thoughtful guidance, local knowledge, and dedicated service to every real estate conversation.' },
  { name: 'Nancy Estes', slug: 'nancy-estes', role: 'Realtor', image: '/assets/reference/agents/Nancy-Estes.jpg', bio: 'Nancy provides patient, personal support for buyers and sellers from the first conversation through closing.' },
  { name: 'Jay Herder', slug: 'jay-herder', role: 'Realtor', image: '/assets/reference/agents/Jay-Herder.png', bio: 'Jay helps clients understand their options and make informed decisions with a service-first approach.' },
  { name: 'David Karstedt', slug: 'david-karstedt', role: 'Broker / Owner', image: '/assets/reference/agents/David-Karstedt.jpg', bio: 'David Karstedt leads 1st Texas Realtors with his wife Simone. Together they combine local market expertise, strong negotiation skills, and a caring approach.' },
  { name: 'Simone Karstedt', slug: 'simone-karstedt', role: 'Realtor / Owner', image: '/assets/reference/1st-tx-realtors-couple-slider.png', bio: 'Simone works alongside David to provide responsive service, neighborhood knowledge, and a smooth experience from search to closing.' },
  { name: 'William Machupa Jr.', slug: 'william-machupa-jr', role: 'Realtor', image: '/assets/reference/agents/William-Machupa.jpg', bio: 'William delivers clear communication and practical support for clients navigating their next move.' },
  { name: 'Rhan Pruitt', slug: 'rhan-pruitt', role: 'Realtor', image: '/assets/reference/agents/Rhan-Pruitt.jpg', bio: 'Rhan pairs local insight with dedicated service to help clients reach their real estate goals.' },
  { name: 'Daniel Rickert', slug: 'daniel-rickert', role: 'Realtor', image: '/assets/reference/agents/Daniel-Rickert.jpg', bio: 'Daniel is committed to a professional, caring experience throughout the buying and selling process.' },
]

export const testimonials = [
  { quote: 'They were responsive, knowledgeable, patient, and made the entire process feel manageable.', author: 'Sam Curtis' },
  { quote: 'The local knowledge and negotiation support made a real difference for our family.', author: 'Tammy Teel' },
  { quote: 'A trusted advisor from the first call through closing. We always felt looked after.', author: 'Carlis Payne' },
  { quote: 'Professional, caring, and genuinely committed to finding the right solution.', author: 'Julie Abram' },
  { quote: 'They understood our neighborhood, our timeline, and exactly what we needed.', author: 'Matthew Smith' },
  { quote: 'Excellent communication and guidance at every step of the transaction.', author: 'Melanie Schwemer' },
]

export const servicePages: Record<string, ServicePage> = {
  'home-buyers': {
    slug: 'home-buyers', title: 'Home Buying', eyebrow: 'Buy with confidence',
    intro: 'The first step to buying a home is getting pre-approved by a mortgage banker for the desired amount. From there, our Realtors help you move with clarity and confidence.',
    image: '/assets/reference/clearlaketxhomesforsale.jpg',
    sections: [
      { title: 'Represent your best interest', body: 'We explain the market, help you evaluate homes, and represent your goals throughout the offer and closing process.' },
      { title: 'Search smarter', body: 'Use our real-time MLS Home Search, map search, saved searches, and automatic email alerts to find homes for sale and rent as soon as they become available.' },
      { title: 'Experience when it matters', body: 'We negotiate with the seller’s agent, explain contingencies and addendums, provide school and community information, and guide short sales, foreclosures, REO, new construction, and relocation.' },
    ],
  },
  'seller-services': {
    slug: 'seller-services', title: 'Home Selling', eyebrow: 'Sell with a strategy',
    intro: 'Our Home Selling services begin with a free Market Analysis to determine the best price for your home and a plan to reach the right buyers.',
    image: '/assets/reference/seabrookhomesforsale.jpg',
    sections: [
      { title: 'Prepare the opportunity', body: 'We help you prioritize staging, repairs, cleaning, decluttering, paint, and curb appeal so your home makes a strong first impression.' },
      { title: 'Guide marketing and sales', body: 'Your home is presented across the MLS and major listing sites including Zillow, Trulia, Realtor.com, and Homes.com, with regular status updates and clear communication.' },
      { title: 'Negotiate and close', body: 'We review red flags, offers, rent-back clauses, cash offers, and contingencies, then coordinate the transaction through closing.' },
    ],
  },
  'homes-for-rent': {
    slug: 'homes-for-rent', title: 'Homes for Rent & Property Management', eyebrow: 'Find the right fit',
    intro: 'View real-time rental listings and work with Clear Lake NASA area Realtors who understand neighborhoods, commutes, schools, and the details that make a home work.',
    image: '/assets/reference/NASAhomesforsale.jpg',
    sections: [
      { title: 'Homes for rent', body: 'Browse real-time MLS rental listings, then call us to schedule a visit and negotiate with the owner for the best possible deal.' },
      { title: 'Professional leasing', body: 'We interview prospective tenants, complete background checks, verify references, prepare leases, and coordinate deposits.' },
      { title: 'Property management', body: 'Our service includes maintenance, repairs, home leasing, tenant communication, and a free rental Market Analysis for owners.' },
    ],
  },
  'new-home-construction': {
    slug: 'new-home-construction', title: 'New Home Construction', eyebrow: 'Build your next chapter',
    intro: 'From selecting a builder to understanding options, timelines, and contracts, our team provides experienced representation for new home construction.',
    sections: [
      { title: 'Builder guidance', body: 'We help you compare communities, builders, floor plans, included features, upgrades, and estimated completion timelines.' },
      { title: 'Representation matters', body: 'Having your own Realtor can provide an experienced advocate through negotiations, inspections, construction updates, and closing.' },
    ],
  },
  'home-staging': {
    slug: 'home-staging', title: 'Home Staging & Renovations', eyebrow: 'Prepare to stand out',
    intro: 'Small, intentional improvements can help buyers see the potential in your home and support a stronger marketing story.',
    sections: [
      { title: 'Focus on the first impression', body: 'We discuss cleaning, decluttering, paint, curb appeal, repairs, and practical updates that make the home feel cared for.' },
      { title: 'A plan for the market', body: 'Our recommendations are tied to your property, neighborhood, timing, and pricing strategy—not unnecessary renovations.' },
    ],
  },
  'relocation-service': {
    slug: 'relocation-service', title: 'Relocation Service', eyebrow: 'Know where you’re going',
    intro: 'Moving to the Clear Lake NASA area is easier with local guidance on neighborhoods, schools, commutes, services, and the homes that fit your life.',
    sections: [
      { title: 'Local perspective', body: 'We help relocating families compare communities including Clear Lake City, Friendswood, League City, Kemah, Seabrook, Nassau Bay, and surrounding areas.' },
      { title: 'One connected process', body: 'From real-time search and virtual tours to offer strategy and closing coordination, we keep your move organized and moving forward.' },
    ],
  },
  'commercial-property-realtors': {
    slug: 'commercial-property-realtors', title: 'Commercial Property Realtors', eyebrow: 'Local commercial expertise',
    intro: 'Contact 1st Texas Realtors for expert local real estate service on commercial property for rent and sale.',
    image: '/assets/reference/Clear-Lake-Texas-e1736781694121.jpg',
    sections: [
      { title: 'Understand the opportunity', body: 'We bring local market perspective to commercial property searches, sales, leasing, and investment decisions.' },
      { title: 'Professional coordination', body: 'Our team supports communication, negotiation, transaction details, and the next steps needed to move with confidence.' },
    ],
  },
}

export const coreRoutes = ['about', 'realtor-reviews', 'agents', 'privacy-policy', 'contact']
export const idxRoutes = ['home-search', 'register', 'login', 'new-home-construction', 'home-staging', 'relocation-service', 'commercial-property-realtors']

export const allStaticPaths = [
  ...coreRoutes,
  ...Object.keys(servicePages),
  ...agents.map(agent => `agents/${agent.slug}`),
  ...idxRoutes,
  ...serviceAreas.flatMap(area => [`realtors-in-${areaSlug(area)}`, `${areaSlug(area)}-tx-homes-for-rent`]),
]
