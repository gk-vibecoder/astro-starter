import type { en } from './en';

// Swedish translations — full scaffold with TODO markers.
// TypeScript will fail if any key is missing (satisfies typeof en).
// Replace English values with Swedish translations before launch.
export const sv = {
  nav: {
    features: 'Funktioner', // TODO: translate
    about: 'Om oss', // TODO: translate
    resources: 'Resurser', // TODO: translate
    signIn: 'Logga in', // TODO: translate
    getStarted: 'Kom igång', // TODO: translate
    featuresItems: {
      aiInsights: { label: 'AI Insights', sub: 'Powered by Aria AI' }, // TODO: translate
      integrations: { label: 'Integrationer', sub: 'Anslut dina verktyg' }, // TODO: translate
      security: { label: 'Säkerhet', sub: 'Enterprise-grade' }, // TODO: translate
    },
    resourcesItems: {
      blog: { label: 'Blogg', sub: '' }, // TODO: translate
      faq: { label: 'FAQ', sub: '' },
      contact: { label: 'Kontakt', sub: '' }, // TODO: translate
    },
    companyItems: {
      aboutUs: { label: 'Om oss', sub: '' }, // TODO: translate
      contact: { label: 'Kontakt', sub: '' }, // TODO: translate
    },
  },

  footer: {
    tagline: 'The modern platform powered by AI. Manage, analyze, and grow — all in one place.', // TODO: translate
    copyright: 'Alla rättigheter förbehållna.', // TODO: translate
    changelog: 'Ändringslogg', // TODO: translate
    roadmap: 'Roadmap',
    columns: {
      product: {
        title: 'Produkt', // TODO: translate
        features: 'Funktioner', // TODO: translate
        integrations: 'Integrationer', // TODO: translate
        security: 'Säkerhet', // TODO: translate
      },
      company: {
        title: 'Företag', // TODO: translate
        aboutUs: 'Om oss', // TODO: translate
        contact: 'Kontakt', // TODO: translate
        blog: 'Blogg', // TODO: translate
      },
      resources: {
        title: 'Resurser', // TODO: translate
        faq: 'FAQ',
        blog: 'Blogg', // TODO: translate
        contact: 'Kontakt', // TODO: translate
      },
      legal: {
        title: 'Juridiskt', // TODO: translate
        privacyPolicy: 'Integritetspolicy', // TODO: translate
        termsOfService: 'Användarvillkor', // TODO: translate
      },
    },
  },

  hero: {
    badge: 'Nu i beta', // TODO: translate
    headline: 'The Modern Platform Powered by AI', // TODO: translate
    description: 'Acme gives you powerful AI tools to manage, analyze, and grow — all in one place.', // TODO: translate
    ctaPrimary: 'Få tidig åtkomst', // TODO: translate
    ctaSecondary: 'Se hur det fungerar', // TODO: translate
    note: 'Ingen betalningsinformation krävs', // TODO: translate
    tags: ['AI-driven', 'Realtidsinsikter', 'Enterprise-redo', 'Säker design'], // TODO: translate
  },

  stats: [
    { value: '10K+', label: 'Aktiva användare' }, // TODO: translate
    { value: '99.9%', label: 'Drifttid SLA' }, // TODO: translate
    { value: '50+', label: 'Integrationer' }, // TODO: translate
  ],

  features: {
    label: 'Varför Acme', // TODO: translate
    headline: 'Din AI-drivna plattform för att hantera och växa', // TODO: translate
    description: 'Spara tid och nå bättre resultat med Aria AI. Skippa det manuella arbetet och samla allt i en plattform.', // TODO: translate
    items: [
      { icon: '◈', title: 'AI Insights', body: 'Få intelligenta rekommendationer och realtidsanalys — tillgänglig dygnet runt.' }, // TODO: translate
      { icon: '◎', title: 'Sömlösa integrationer', body: 'Anslut dina befintliga verktyg med 50+ integrationer byggda för moderna arbetsflöden.' }, // TODO: translate
      { icon: '◆', title: 'Enterprise-säkerhet', body: 'SOC 2 Type II-certifierat. End-to-end-kryptering, SSO och granulär åtkomstkontroll.' }, // TODO: translate
      { icon: '⬡', title: 'Aria AI Agent', body: 'Din AI-assistent. Ställ frågor, få analys och få skräddarsydda rekommendationer dygnet runt.' }, // TODO: translate
      { icon: '◉', title: 'Realtidsanalys', body: 'Håll dig i framkant med live-dashboards och AI-kurerade signaler relevanta för ditt sammanhang.' }, // TODO: translate
      { icon: '▣', title: 'Dokumenthantering', body: 'Lagra, organisera och nå alla dina dokument säkert på ett och samma ställe.' }, // TODO: translate
    ],
  },

  featuresBento: {
    eyebrow: 'Varför Acme', // TODO: translate
    headline: 'Din AI-drivna plattform för att hantera och växa', // TODO: translate
    description: 'Skippa det manuella arbetet. Samla allt i en plattform och låt Aria AI göra det tunga lyftet.', // TODO: translate
    aria: {
      title: 'Aria AI Agent', // TODO: translate
      body: 'Din AI-assistent. Ställ frågor, få analys och skräddarsydda rekommendationer — dygnet runt, för allt du hanterar.', // TODO: translate
      insightLabel: 'ARIA · INSIGHT',
      insight: '"Ditt engagemang har ökat med 18% den här månaden. Baserat på nuvarande trender kan du överväga att expandera till enterprisesegmentet."', // TODO: translate
    },
    aiInsights: {
      title: 'AI Insights', // TODO: translate
      body: 'Intelligenta rekommendationer och realtidsanalys — alltid tillgänglig, alltid relevant.', // TODO: translate
    },
    integrations: {
      title: 'Sömlösa integrationer', // TODO: translate
      body: 'Anslut dina befintliga verktyg med 50+ integrationer byggda för moderna arbetsflöden.', // TODO: translate
    },
    automation: {
      title: 'Automatisering', // TODO: translate
      body: 'Automatisera repetitiva uppgifter och arbetsflöden så att ditt team kan fokusera på det som spelar roll.', // TODO: translate
    },
    analytics: {
      title: 'Realtidsanalys', // TODO: translate
      body: 'Live-dashboards och AI-kurerade signaler relevanta för ditt sammanhang.', // TODO: translate
    },
    documents: {
      title: 'Dokumenthantering', // TODO: translate
      body: 'Lagra, organisera och nå alla dina dokument säkert på ett och samma ställe.', // TODO: translate
    },
  },

  integrations: {
    label: 'Integrationer', // TODO: translate
    headline: 'Anslut dina befintliga verktyg', // TODO: translate
    description: 'En ständigt växande lista med integrationer för att ansluta ditt arbetsflöde. Vår mission är att möta dig där du är.', // TODO: translate
    subtext: 'Fokusera på resultat istället för administration.', // TODO: translate
    moreSoon: 'Mer kommer snart', // TODO: translate
  },

  testimonials: {
    label: 'Kundrecensioner', // TODO: translate
    headline: 'Vad våra kunder säger', // TODO: translate
    items: [
      { quote: 'Allt är samlat på ett ställe och AI-insikterna har verkligen förändrat hur vi arbetar.', name: 'Alex Johnson', role: 'VD, Horizon Labs', initials: 'AJ' }, // TODO: translate
      { quote: 'Plattformen är intuitiv och automatiseringsfunktionerna har sparat oss otaliga timmar varje månad.', name: 'Maria Chen', role: 'Driftschef, Vertex Co.', initials: 'MC' }, // TODO: translate
      { quote: 'Integrationerna är sömlösa och gränssnittet är rent och enkelt. Precis vad vi behövde.', name: 'James Wright', role: 'CTO, Pulse Tech', initials: 'JW' }, // TODO: translate
      { quote: 'Acme tog bort stressen av att hantera alla våra verktyg manuellt. Nu fungerar allt tillsammans.', name: 'Sara Patel', role: 'Grundare, Nomad Studio', initials: 'SP' }, // TODO: translate
      { quote: 'Aria AI är enastående. Den lyfter fram insikter jag hade missat och agerar på dem automatiskt.', name: 'Tom Rivera', role: 'Produktchef, Beacon Inc.', initials: 'TR' }, // TODO: translate
      { quote: 'Jag har nu full synlighet i hela verksamheten. Jag rekommenderar Acme till varje grundare jag träffar.', name: 'Lena Fischer', role: 'Ängelinvesterare & Rådgivare', initials: 'LF' }, // TODO: translate
    ],
  },

  solutions: {
    label: 'Lösningar', // TODO: translate
    headline: 'Byggd för varje användningsfall', // TODO: translate
    description: 'Från analys till automatisering täcker Acme hela spektrumet av moderna affärsbehov — i en enhetlig plattform.', // TODO: translate
    items: [
      { name: 'Analys', symbol: 'AN' }, // TODO: translate
      { name: 'Automatisering', symbol: 'AU' }, // TODO: translate
      { name: 'Samarbete', symbol: 'CO' }, // TODO: translate
      { name: 'Rapportering', symbol: 'RP' }, // TODO: translate
      { name: 'Säkerhet', symbol: 'SC' }, // TODO: translate
      { name: 'Integrationer', symbol: 'IN' }, // TODO: translate
      { name: 'API-åtkomst', symbol: 'AP' }, // TODO: translate
      { name: 'Arbetsflöden', symbol: 'WF' }, // TODO: translate
    ],
  },

  enterprise: {
    label: 'Enterprise', // TODO: translate
    headline: 'Redo att skala med ditt team?', // TODO: translate
    description: 'Acme Enterprise ger din organisation avancerade kontroller, dedikerat stöd och flexibilitet att växa utan begränsningar.', // TODO: translate
    features: [
      'SSO, SAML och avancerad åtkomstkontroll', // TODO: translate
      'Dedikerad onboarding och kontohantering', // TODO: translate
      'Anpassade SLA:er och prioritetsstöd', // TODO: translate
    ],
    cta: 'Läs om Enterprise', // TODO: translate
    dashboard: 'Enterprise Dashboard', // TODO: translate
  },

  security: {
    label: 'Säkerhet', // TODO: translate
    headline: 'Vi tar säkerhet på allvar', // TODO: translate
    description: 'Säkerhet och integritet är kärnan i allt vi bygger. Dina data är krypterade och vi uppfyller de högsta branschstandarderna.', // TODO: translate
    cta: 'Läs vår säkerhetsöversikt', // TODO: translate
    features: [
      { icon: '⊕', title: 'SSO & 2FA', body: 'Autentisera säkert med enkel inloggning och tvåfaktorsautentisering vid varje inloggning.' }, // TODO: translate
      { icon: '◈', title: 'Säkra inloggningsuppgifter', body: 'Dina inloggningsuppgifter lagras aldrig i klartext. Vi använder branschstandardiserad hashning och saltning.' }, // TODO: translate
      { icon: '▣', title: 'Krypterade data', body: 'Alla dina data är krypterade i vila och under överföring med AES-256 och TLS 1.3.' }, // TODO: translate
    ],
  },

  latestNews: {
    label: 'Acme Blogg', // TODO: translate
    headline: 'Senaste från Acme', // TODO: translate
    moreNews: 'Fler inlägg', // TODO: translate
  },

  faq: {
    label: 'FAQ',
    headline: 'Har du frågor om Acme?', // TODO: translate
    description: 'Hittar du inte vad du letar efter? Besök vår fullständiga FAQ-sida för mer djupgående svar.', // TODO: translate
    fullFaqCta: 'Full FAQ', // TODO: translate
    items: [
      {
        q: 'Vad är Acme?', // TODO: translate
        a: 'Acme är en modern plattform driven av AI. Den låter dig hantera, analysera och växa din verksamhet genom att samla alla dina verktyg, data och arbetsflöden på ett ställe — med hjälp av vår Aria AI Agent.', // TODO: translate
      },
      {
        q: 'Hur integrerar Acme med mina befintliga verktyg?', // TODO: translate
        a: 'Acme ansluter med 50+ populära verktyg via inbyggda integrationer och ett robust API. Installationen tar vanligtvis minuter och vårt onboarding-team hjälper till med anpassad konfiguration.', // TODO: translate
      },
      {
        q: 'Hur fungerar Acmes prissättning?', // TODO: translate
        a: 'Acme använder en prenumerationsmodell. Vi erbjuder en gratis nivå för tidig åtkomst och betalplaner för team som behöver avancerade funktioner, fler platser eller enterprise-kontroller.', // TODO: translate
      },
      {
        q: 'Är mina data säkra med Acme?', // TODO: translate
        a: 'Absolut. Säkerhet är grundläggande för allt vi bygger. All data är krypterad i vila och under överföring. Vi är SOC 2 Type II-certifierade och stöder SSO och 2FA.', // TODO: translate
      },
      {
        q: 'Vad är Aria AI?', // TODO: translate
        a: 'Aria är vår AI-agent inbyggd i Acme-plattformen. Den lyfter fram insikter, automatiserar repetitiva uppgifter och svarar på frågor om dina data — tillgänglig dygnet runt.', // TODO: translate
      },
      {
        q: 'Hur kommer jag igång?', // TODO: translate
        a: 'Att komma igång är gratis — ingen betalningsinformation krävs. Registrera dig, anslut dina verktyg via våra integrationer och Acme börjar omedelbart lyfta fram insikter.', // TODO: translate
      },
    ],
  },

  cta: {
    title: 'Börja bygga med Acme.', // TODO: translate
    description: 'Gå med tusentals team som använder Acme för att samla, automatisera och växa — allt på ett ställe.', // TODO: translate
    ctaLabel: 'Kom igång', // TODO: translate
    note: 'Ingen betalningsinformation krävs.', // TODO: translate
    emailPlaceholder: 'Ange din e-post', // TODO: translate
  },

  howItWorks: {
    eyebrow: 'Så här fungerar det', // TODO: translate
    headline: 'Igång på minuter', // TODO: translate
    description: 'Anslut, konfigurera och lansera i tre enkla steg. Inga onboarding-samtal, ingen lång installation.', // TODO: translate
    cta: 'Kom igång gratis', // TODO: translate
    ctaHref: '/signup',
    steps: [
      {
        step: '01',
        title: 'Skapa ditt konto', // TODO: translate
        body: 'Registrera dig gratis på sekunder. Ingen betalningsinformation krävs — börja direkt.', // TODO: translate
      },
      {
        step: '02',
        title: 'Anslut dina verktyg', // TODO: translate
        body: 'Länka dina befintliga verktyg och tjänster med några klick. Vi stöder 50+ integrationer.', // TODO: translate
      },
      {
        step: '03',
        title: 'Få AI-drivna insikter', // TODO: translate
        body: 'Dina data samlas automatiskt. Fråga Aria AI om dina mätvärden, trender och möjligheter — när som helst.', // TODO: translate
      },
    ],
  },

  newsletter: {
    eyebrow: 'Nyhetsbrev', // TODO: translate
    headline: 'Håll dig uppdaterad', // TODO: translate
    description: 'Få de senaste produktuppdateringarna, insikterna och berättelserna direkt i din inkorg.', // TODO: translate
    placeholder: 'din@epost.se', // TODO: translate
    cta: 'Prenumerera', // TODO: translate
    note: 'Ingen spam. Avregistrera när som helst.', // TODO: translate
  },

  faqPage: {
    backLabel: 'Tillbaka till FAQ', // TODO: translate
    searchPlaceholder: 'Sök frågor…', // TODO: translate
    noResults: 'Inga resultat hittades.', // TODO: translate
    allCategories: 'Alla', // TODO: translate
    onThisPage: 'På den här sidan', // TODO: translate
  },

  testimonialPage: {
    eyebrow: 'Kundberättelser', // TODO: translate
    headline: 'Vad våra kunder säger', // TODO: translate
    description: 'Hör från team och grundare som använder Acme varje dag för att hantera och växa.', // TODO: translate
    backLabel: 'Tillbaka till berättelser', // TODO: translate
    keyResult: 'Nyckelresultat', // TODO: translate
    searchPlaceholder: 'Sök berättelser…', // TODO: translate
    comingSoon: 'Fler berättelser kommer snart', // TODO: translate
    comingSoonDesc: 'Vi samlar berättelser från våra kunder. Kom tillbaka snart.', // TODO: translate
    categoryAll: 'Alla', // TODO: translate
  },

  blogDetail: {
    backLabel: 'Tillbaka till blogg', // TODO: translate
    keepReading: 'Fortsätt läsa', // TODO: translate
    relatedArticles: 'Relaterade artiklar', // TODO: translate
    onThisPage: 'På den här sidan', // TODO: translate
  },
} satisfies typeof en;
