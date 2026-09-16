export const CONTACT = {
  email: 'valuation@blucp.com',
  phone: '+40 726 009 377',
  company: 'Blu Capital Partners SRL',
  address: 'HBC Dorobanti, Ermil Pangrati 30A, 4th Floor, Bucharest, Romania',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Blu%20Capital%20Partners%2C%20Ermil%20Pangrati%2030A%2C%20Bucharest%2C%20Romania',
  bookingUrl: 'https://outlook.office.com/book/tudormafteianu@blucp.com/',
  linkedinUrl: 'https://www.linkedin.com/company/blu-capital-partners/',
  youtubeUrl: 'https://www.youtube.com/@BluCapitalPartners',
  privacyUrl: 'https://blucp.com/privacy-policy/',
  // TODO: confirm URL; blucp.com/terms-and-conditions/ currently returns 404
  termsUrl: 'https://blucp.com/terms-and-conditions/',
  siteUrl: 'https://blucp.com',
  maWorldwideUrl: 'https://m-a-worldwide.com/',
  registration:
    'Blu Capital Partners SRL is a privately owned company registered with the Romanian Business Register under no. J52/423/2019 with UID & VAT no. RO40725750.',
}

// Mirrors the footer on blucp.com
export const FOOTER_LINKS = {
  services: [
    { label: 'Mid-Market Corporate Advisory', href: 'https://blucp.com/by-vertical/mid-market-corporate-advisory/' },
    { label: 'Energy & Infrastructure Advisory', href: 'https://blucp.com/by-vertical/energy-infrastructure-advisory/' },
    { label: 'Real Estate Advisory', href: 'https://blucp.com/by-vertical/real-estate-advisory/' },
    { label: 'Technology Advisory', href: 'https://blucp.com/by-vertical/technology-advisory/' },
    {
      label: 'Credit Portfolio & Structured Finance Advisory',
      href: 'https://blucp.com/by-vertical/credit-portfolio-structured-finance-advisory/',
    },
    { label: 'Private Capital Advisory', href: 'https://blucp.com/by-vertical/secondary-private-equity/' },
    { label: 'Small Business Corporate Advisory', href: 'https://blucp.com/by-vertical/small-business-corporate-advisory/' },
    { label: 'Blu Marketplace', href: 'https://blucp.com/transactions/' },
  ],
  useful: [
    { label: 'Newsroom', href: 'https://blucp.com/insights/' },
    { label: 'Our Firm', href: 'https://blucp.com/about-us/our-firm/' },
    { label: 'Team', href: 'https://blucp.com/team/overview/' },
    { label: 'Careers', href: 'https://blucp.com/careers/overview/' },
    { label: 'Key Figures', href: 'https://blucp.com/about-us/key-figures/' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact Us', href: 'https://blucp.com/contact-us/' },
    { label: 'Privacy Policy', href: 'https://blucp.com/privacy-policy/' },
    { label: 'EU Projects', href: 'https://blucp.com/eu-projects/' },
  ],
}

export const STEPS = [
  {
    when: 'Today, in 60 seconds',
    title: 'Submit your company details',
    body: 'Tell us your revenue, headcount and industry. Your quote arrives by email in under a minute, with a link to the valuation request form.',
  },
  {
    when: 'Same day',
    title: 'Sign and pay online',
    body: 'Complete the request form, sign the one-page engagement letter with Adobe Sign and pay 50% of the fee by card. You then get a secure folder for your financials.',
  },
  {
    when: '5–10 business days later',
    title: 'Receive your valuation report',
    body: 'An analyst prepares the valuation and a senior M&A banker reviews it. We walk you through the result in a 30–45 minute call.',
  },
]

export const TESTIMONIALS = [
  {
    // Verbatim from valuation.blucp.com/valuation-service/ — do not edit wording
    quote:
      'The valuation from BCP made business sense, and BCP’s recommendations helped us understand the valuation drivers and potential pitfalls in the valuation of the target company. The valuation from BCP allowed us to mature our thinking in structuring the transaction to ensure alignment of interest between our firm and the seller.',
    name: 'Bogdan Moldovan',
    role: 'CEO, Axigen',
  },
  {
    quote:
      'BCP has effectively valued our business in the context of a strategic partnership with a potential investor. BCP has considered all relevant historical and future developments of our business.',
    name: 'Maurizio Rossetto',
    role: 'CFO, AIC Group',
  },
  {
    quote:
      'BCP carefully advised us not only for an accurate valuation of our business for an M&A transaction; but also for selecting the right partner and for structuring, negotiating and successfully completing the M&A transaction with the number 5 player in Europe in our business.',
    name: 'Gina Iordache',
    role: 'CEO, Augsburg International',
  },
]

// Client logos as shown in the marquee on blucp.com.
// href is the client's own site, taken from the same source; entries without one are not linked.
export const CLIENT_LOGOS = [
  { src: '/logos/BCP-CA-MA-Agro-Farming-Development-Logo.png', alt: 'Agro Farming' },
  { src: '/logos/alezzi_logo_vectorial.svg', alt: 'Alezzi', href: 'https://alezzibeachresort.ro' },
  { src: '/logos/augsburg_international_logo.svg', alt: 'Augsburg International', href: 'https://augsburgbrands.ro' },
  { src: '/logos/BCP-CA-MA-briotherm-XPS-Logo-giasxps.ro_.jpg', alt: 'Briotherm', href: 'https://giasxps.ro' },
  { src: '/logos/denis_spedition_logo.webp', alt: 'Denis Spedition', href: 'https://www.denis-spedition.com' },
  { src: '/logos/farplas_logo.png', alt: 'Farplas', href: 'https://www.farplas.com' },
  { src: '/logos/neoclinique_logo.svg', alt: 'Neoclinique', href: 'https://www.neoclinique.ro' },
  { src: '/logos/nr1_fitness_logo_vectorial.svg', alt: 'NR1 Fitness', href: 'https://nr1fitness.ro' },
  { src: '/logos/clinica_medicala_ramed_vectorial.webp', alt: 'RaMED', href: 'https://www.ramed.ro' },
  { src: '/logos/romstyl_logo.png', alt: 'Romstyl', href: 'https://romstyl.ro' },
  { src: '/logos/BCP-CA-MA-Spitalul-Policlinica-Sf-Ioan-Logo-spitalsfantulioan.ro_.jpg', alt: 'Spitalul Sf. Ioan', href: 'https://spitalsfantulioan.ro' },
  { src: '/logos/stone_calibre_logo.png', alt: 'Stone Calibre', href: 'https://www.stonecalibre.com' },
  { src: '/logos/techsylvania_logo_vectorial.svg', alt: 'Techsylvania', href: 'https://techsylvania.com' },
  { src: '/logos/bmf_logo.svg', alt: 'BMF Group', href: 'https://bmfgrup.eu' },
  { src: '/logos/cgs_management_logo_vectorial.svg', alt: 'CGS Management', href: 'https://www.cgs-management.com' },
  { src: '/logos/BCP-CA-MA-ECM-Euro-Gas-Systems-Logo-eurogassystems.com_.png', alt: 'Euro Gas Systems', href: 'https://eurogassystems.com' },
  { src: '/logos/sunridge_partners_logo_vectorial.svg', alt: 'Sunridge Partners', href: 'https://sunridgepartners.com' },
  { src: '/logos/aic_trucks_logo.png', alt: 'AIC Trucks', href: 'https://www.aic-otokar.ro' },
  { src: '/logos/big_mega_renewable_energy_logo_vectorial.svg', alt: 'Big Mega Renewable', href: 'https://bigmegare.com' },
  { src: '/logos/omv_petrom_logo_vectorial.svg', alt: 'OMV Petrom', href: 'https://www.omvpetrom.com' },
  { src: '/logos/BCP-EIA-MA-tenergie-Logo-tenergie.fr_.png', alt: 'Tenergie', href: 'https://tenergie.fr' },
  { src: '/logos/voltalia_logo_vectorial.svg', alt: 'Voltalia', href: 'https://www.voltalia.com' },
  { src: '/logos/grenenergy_logo.svg', alt: 'Grenergy', href: 'https://grenergy.eu' },
  { src: '/logos/perpetum_logo.webp', alt: 'Perpetum', href: 'https://perpetuumsee.ro' },
  { src: '/logos/pne_logo.svg', alt: 'PNE', href: 'https://www.pnegroup.com' },
  { src: '/logos/estari_logo.svg', alt: 'Estari', href: 'https://estarigroup.com' },
  { src: '/logos/forty_management_logo.svg', alt: 'Forty Management', href: 'https://fortymanagement.ro' },
  { src: '/logos/aic_logo.svg', alt: 'AIC', href: 'https://aicre.ro' },
  { src: '/logos/tester_grup_logo.svg', alt: 'Tester Grup', href: 'https://testergrup.ro' },
  { src: '/logos/elon_logo.svg', alt: 'Elon', href: 'https://elon.ee' },
  { src: '/logos/highcrowd_logo.svg', alt: 'HighCrowd', href: 'https://highcrowd.com' },
  { src: '/logos/axigen_logo.webp', alt: 'Axigen', href: 'https://www.axigen.com' },
  { src: '/logos/BCP-TA-MA-Jonas-Software-Logo-jonassoftware.com_.png', alt: 'Jonas Software', href: 'https://jonassoftware.com' },
  { src: '/logos/qubiz_logo_vectorial.svg', alt: 'Qubiz', href: 'https://qubiz.com' },
  { src: '/logos/zitec_logo_vectorial.svg', alt: 'Zitec', href: 'https://zitec.com' },
  { src: '/logos/zurich_insurance_group_logo_vectorial.svg', alt: 'Zurich', href: 'https://www.zurich.com' },
  { src: '/logos/creditstar_group_logo.png', alt: 'Creditstar', href: 'https://www.creditstar.com' },
]

export const CREDENTIALS = [
  { figure: '100+', label: 'clients advised since 2019' },
  { figure: '1m+', label: 'transactions in our comparables data' },
  { figure: '2', label: 'bankers review every report, one of them senior' },
  { figure: '35+', label: 'countries covered through M&A Worldwide' },
]

export const FAQ = [
  {
    q: 'How is the fee calculated?',
    a: 'The fee starts at €4,000 and increases with your annual revenue. You see the exact amount in the quote email before you commit to anything. Faster delivery is an optional add-on.',
  },
  {
    q: 'When do I pay?',
    a: 'You pay 50% when you sign the engagement letter and the remaining 50% after you receive the final report. Both payments are made online by card through a secure payment link on your invoice.',
  },
  {
    q: 'What information do I need to provide?',
    a: 'After the first payment you receive a secure upload link and a checklist. Typically we need the profit and loss statement and balance sheet for the last three years, plus a short data request spreadsheet.',
  },
  {
    q: 'How do you value my business?',
    a: 'We combine several methodologies, such as discounted cash flow and market multiples, benchmarked against more than one million transactions. An analyst prepares the valuation and a senior banker reviews it before delivery.',
  },
  {
    q: 'How long does it take?',
    a: 'Standard delivery is 10 business days after we receive complete financials. Fast delivery takes 5 business days (+€1,000) and Express takes 72 hours (+€1,500).',
  },
  {
    q: 'Is my financial data safe?',
    a: 'Your files go into a private Microsoft SharePoint folder that only your assigned bankers can open. Upload links expire, and we process your data in line with the GDPR.',
  },
  {
    q: 'What can I use the valuation for?',
    a: 'Common purposes are preparing a sale or partial exit, raising growth capital, bank financing, IFRS reporting, shareholder disputes and employee share plans. You tell us the purpose in the request form.',
  },
  {
    q: 'Can I speak to a banker first?',
    a: 'Yes. Email valuation@blucp.com and a senior banker will set up a short call to discuss your situation.',
  },
]
