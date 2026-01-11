import type { Event, EventCategory, MoroccoRegion } from '@/types'

// Mock events data
export const mockEvents: Event[] = [
  {
    id: 'gnaoua-2026',
    title: {
      en: 'Gnaoua World Music Festival',
      fr: 'Festival Gnaoua Musiques du Monde',
      es: 'Festival de Musica Gnaoua del Mundo',
      ar: 'مهرجان كناوة وموسيقى العالم',
    },
    description: {
      en: 'The iconic Gnaoua festival in Essaouira featuring traditional Gnaoua music and world artists.',
      fr: 'Le festival iconique de Gnaoua a Essaouira avec de la musique traditionnelle Gnaoua et des artistes du monde entier.',
      es: 'El iconico festival Gnaoua en Essaouira con musica tradicional Gnaoua y artistas del mundo.',
      ar: 'مهرجان كناوة الشهير في الصويرة يضم موسيقى كناوة التقليدية وفنانين من جميع أنحاء العالم.',
    },
    category: 'music',
    region: 'marrakech-safi',
    city: 'Essaouira',
    venue: 'Place Moulay Hassan',
    startDate: '2026-06-25',
    endDate: '2026-06-28',
    price: { min: 0, max: 0, currency: 'MAD', isFree: true },
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    tags: ['gnaoua', 'world music', 'essaouira', 'free'],
    coordinates: { lat: 31.5085, lng: -9.7595 },
    organizer: 'Association Yerma Gnaoua',
    website: 'https://www.festival-gnaoua.net',
    accessibility: { wheelchairAccess: true, signLanguage: false, audioDescription: false },
  },
  {
    id: 'mawazine-2026',
    title: {
      en: 'Mawazine Rhythms of the World',
      fr: 'Mawazine Rythmes du Monde',
      es: 'Mawazine Ritmos del Mundo',
      ar: 'موازين إيقاعات العالم',
    },
    description: {
      en: 'One of the largest music festivals in the world, featuring international and Moroccan artists.',
      fr: 'L\'un des plus grands festivals de musique au monde, avec des artistes internationaux et marocains.',
      es: 'Uno de los festivales de musica mas grandes del mundo, con artistas internacionales y marroquies.',
      ar: 'أحد أكبر المهرجانات الموسيقية في العالم، يضم فنانين دوليين ومغاربة.',
    },
    category: 'music',
    region: 'rabat-sale-kenitra',
    city: 'Rabat',
    venue: 'OLM Souissi',
    startDate: '2026-06-20',
    endDate: '2026-06-28',
    price: { min: 0, max: 500, currency: 'MAD', isFree: false },
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    tags: ['international', 'pop', 'arabic music', 'rabat'],
    coordinates: { lat: 33.9716, lng: -6.8498 },
    organizer: 'Maroc Cultures',
    website: 'https://www.festivalmawazine.ma',
    accessibility: { wheelchairAccess: true, signLanguage: false, audioDescription: false },
  },
  {
    id: 'fes-sacred-music-2026',
    title: {
      en: 'Fes Festival of World Sacred Music',
      fr: 'Festival de Fes des Musiques Sacrees du Monde',
      es: 'Festival de Fez de Musica Sacra del Mundo',
      ar: 'مهرجان فاس للموسيقى الروحية العالمية',
    },
    description: {
      en: 'A spiritual and musical journey through sacred music traditions from around the world.',
      fr: 'Un voyage spirituel et musical a travers les traditions de musique sacree du monde entier.',
      es: 'Un viaje espiritual y musical a traves de las tradiciones de musica sacra de todo el mundo.',
      ar: 'رحلة روحية وموسيقية عبر تقاليد الموسيقى المقدسة من جميع أنحاء العالم.',
    },
    category: 'spiritual',
    region: 'fes-meknes',
    city: 'Fes',
    venue: 'Bab Al Makina',
    startDate: '2026-06-06',
    endDate: '2026-06-14',
    price: { min: 150, max: 800, currency: 'MAD', isFree: false },
    image: 'https://images.unsplash.com/photo-1548778052-311f4bc2b502?w=800',
    tags: ['sacred', 'spiritual', 'sufi', 'fes', 'medina'],
    coordinates: { lat: 34.0181, lng: -5.0078 },
    organizer: 'Spirit of Fes Foundation',
    website: 'https://www.fesfestival.com',
    accessibility: { wheelchairAccess: false, signLanguage: false, audioDescription: false },
  },
  {
    id: 'marrakech-biennale-2026',
    title: {
      en: 'Marrakech Biennale',
      fr: 'Biennale de Marrakech',
      es: 'Bienal de Marrakech',
      ar: 'بينالي مراكش',
    },
    description: {
      en: 'Contemporary art exhibition featuring African and international artists across multiple venues.',
      fr: 'Exposition d\'art contemporain presentant des artistes africains et internationaux dans plusieurs lieux.',
      es: 'Exposicion de arte contemporaneo con artistas africanos e internacionales en multiples sedes.',
      ar: 'معرض للفن المعاصر يضم فنانين أفارقة ودوليين في مواقع متعددة.',
    },
    category: 'art',
    region: 'marrakech-safi',
    city: 'Marrakech',
    venue: 'Various locations',
    startDate: '2026-02-24',
    endDate: '2026-05-08',
    price: { min: 50, max: 150, currency: 'MAD', isFree: false },
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    tags: ['contemporary art', 'biennale', 'african art', 'installation'],
    coordinates: { lat: 31.6295, lng: -7.9811 },
    organizer: 'Marrakech Biennale Foundation',
    accessibility: { wheelchairAccess: true, signLanguage: false, audioDescription: true },
  },
  {
    id: 'tanjazz-2026',
    title: {
      en: 'Tanjazz Festival',
      fr: 'Festival Tanjazz',
      es: 'Festival Tanjazz',
      ar: 'مهرجان طنجاز',
    },
    description: {
      en: 'International jazz festival in Tangier featuring world-class jazz musicians.',
      fr: 'Festival international de jazz a Tanger avec des musiciens de jazz de renommee mondiale.',
      es: 'Festival internacional de jazz en Tanger con musicos de jazz de clase mundial.',
      ar: 'مهرجان جاز دولي في طنجة يضم موسيقيي جاز عالميين.',
    },
    category: 'music',
    region: 'tanger-tetouan-al-hoceima',
    city: 'Tangier',
    venue: 'Palais des Institutions Italiennes',
    startDate: '2026-09-17',
    endDate: '2026-09-20',
    price: { min: 200, max: 600, currency: 'MAD', isFree: false },
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
    tags: ['jazz', 'tangier', 'international'],
    coordinates: { lat: 35.7595, lng: -5.8340 },
    organizer: 'Tanjazz Association',
    website: 'https://www.tanjazz.org',
    accessibility: { wheelchairAccess: true, signLanguage: false, audioDescription: false },
  },
  {
    id: 'moussem-tan-tan-2026',
    title: {
      en: 'Moussem Tan Tan',
      fr: 'Moussem de Tan Tan',
      es: 'Moussem de Tan Tan',
      ar: 'موسم طانطان',
    },
    description: {
      en: 'UNESCO-recognized gathering of nomadic peoples celebrating Saharan traditions and culture.',
      fr: 'Rassemblement reconnu par l\'UNESCO des peuples nomades celebrant les traditions et la culture sahariennes.',
      es: 'Encuentro reconocido por la UNESCO de pueblos nomadas celebrando tradiciones y cultura sahariana.',
      ar: 'تجمع معترف به من قبل اليونسكو للشعوب الرحل يحتفل بالتقاليد والثقافة الصحراوية.',
    },
    category: 'heritage',
    region: 'guelmim-oued-noun',
    city: 'Tan Tan',
    venue: 'Tan Tan Desert',
    startDate: '2026-09-10',
    endDate: '2026-09-14',
    price: { min: 0, max: 0, currency: 'MAD', isFree: true },
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800',
    tags: ['nomadic', 'sahara', 'unesco', 'heritage', 'camel'],
    coordinates: { lat: 28.4381, lng: -11.1027 },
    organizer: 'Ministry of Culture',
    accessibility: { wheelchairAccess: false, signLanguage: false, audioDescription: false },
  },
  {
    id: 'marrakech-film-2026',
    title: {
      en: 'Marrakech International Film Festival',
      fr: 'Festival International du Film de Marrakech',
      es: 'Festival Internacional de Cine de Marrakech',
      ar: 'المهرجان الدولي للفيلم بمراكش',
    },
    description: {
      en: 'Prestigious film festival showcasing international and Moroccan cinema.',
      fr: 'Festival de cinema prestigieux presentant le cinema international et marocain.',
      es: 'Prestigioso festival de cine que presenta cine internacional y marroqui.',
      ar: 'مهرجان سينمائي مرموق يعرض السينما الدولية والمغربية.',
    },
    category: 'film',
    region: 'marrakech-safi',
    city: 'Marrakech',
    venue: 'Palais des Congres',
    startDate: '2026-11-27',
    endDate: '2026-12-05',
    price: { min: 100, max: 1000, currency: 'MAD', isFree: false },
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    tags: ['cinema', 'film', 'red carpet', 'celebrities'],
    coordinates: { lat: 31.6340, lng: -8.0090 },
    organizer: 'FIFM Foundation',
    website: 'https://www.festivalmarrakech.info',
    accessibility: { wheelchairAccess: true, signLanguage: true, audioDescription: true },
  },
  {
    id: 'rose-festival-2026',
    title: {
      en: 'Rose Festival of Kelaat M\'Gouna',
      fr: 'Festival des Roses de Kelaat M\'Gouna',
      es: 'Festival de las Rosas de Kelaat M\'Gouna',
      ar: 'مهرجان الورود بقلعة مكونة',
    },
    description: {
      en: 'Annual celebration of the rose harvest in the Valley of Roses with parades and music.',
      fr: 'Celebration annuelle de la recolte des roses dans la Vallee des Roses avec defiles et musique.',
      es: 'Celebracion anual de la cosecha de rosas en el Valle de las Rosas con desfiles y musica.',
      ar: 'احتفال سنوي بحصاد الورود في وادي الورود مع مواكب وموسيقى.',
    },
    category: 'heritage',
    region: 'draa-tafilalet',
    city: 'Kelaat M\'Gouna',
    venue: 'Valley of Roses',
    startDate: '2026-05-08',
    endDate: '2026-05-10',
    price: { min: 0, max: 0, currency: 'MAD', isFree: true },
    image: 'https://images.unsplash.com/photo-1518882605630-8a6b9d6e5a63?w=800',
    tags: ['roses', 'harvest', 'parade', 'dades valley'],
    coordinates: { lat: 31.2500, lng: -6.1333 },
    organizer: 'Local Authorities',
    accessibility: { wheelchairAccess: false, signLanguage: false, audioDescription: false },
  },
]

export function getEvents(): Event[] {
  return mockEvents
}

export function getEventById(id: string): Event | undefined {
  return mockEvents.find(event => event.id === id)
}

export function filterEvents(filters: {
  query?: string
  region?: MoroccoRegion
  categories?: EventCategory[]
  startDate?: Date
  endDate?: Date
}): Event[] {
  let filtered = [...mockEvents]

  if (filters.query) {
    const q = filters.query.toLowerCase()
    filtered = filtered.filter(e =>
      e.title.en.toLowerCase().includes(q) ||
      e.description.en.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  if (filters.region) {
    filtered = filtered.filter(e => e.region === filters.region)
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(e => filters.categories!.includes(e.category))
  }

  if (filters.startDate) {
    filtered = filtered.filter(e => new Date(e.startDate) >= filters.startDate!)
  }

  if (filters.endDate) {
    filtered = filtered.filter(e => new Date(e.endDate) <= filters.endDate!)
  }

  return filtered
}

export const categoryLabels: Record<EventCategory, Record<string, string>> = {
  music: { en: 'Music', fr: 'Musique', es: 'Musica', ar: 'موسيقى' },
  art: { en: 'Art', fr: 'Art', es: 'Arte', ar: 'فن' },
  film: { en: 'Film', fr: 'Cinema', es: 'Cine', ar: 'سينما' },
  dance: { en: 'Dance', fr: 'Danse', es: 'Danza', ar: 'رقص' },
  theatre: { en: 'Theatre', fr: 'Theatre', es: 'Teatro', ar: 'مسرح' },
  heritage: { en: 'Heritage', fr: 'Patrimoine', es: 'Patrimonio', ar: 'تراث' },
  food: { en: 'Food', fr: 'Gastronomie', es: 'Gastronomia', ar: 'طعام' },
  literature: { en: 'Literature', fr: 'Litterature', es: 'Literatura', ar: 'أدب' },
  craft: { en: 'Craft', fr: 'Artisanat', es: 'Artesania', ar: 'حرف' },
  spiritual: { en: 'Spiritual', fr: 'Spirituel', es: 'Espiritual', ar: 'روحاني' },
}

export const regionLabels: Record<MoroccoRegion, Record<string, string>> = {
  'marrakech-safi': { en: 'Marrakech-Safi', fr: 'Marrakech-Safi', es: 'Marrakech-Safi', ar: 'مراكش-آسفي' },
  'casablanca-settat': { en: 'Casablanca-Settat', fr: 'Casablanca-Settat', es: 'Casablanca-Settat', ar: 'الدار البيضاء-سطات' },
  'fes-meknes': { en: 'Fes-Meknes', fr: 'Fes-Meknes', es: 'Fez-Mequinez', ar: 'فاس-مكناس' },
  'tanger-tetouan-al-hoceima': { en: 'Tanger-Tetouan-Al Hoceima', fr: 'Tanger-Tetouan-Al Hoceima', es: 'Tanger-Tetuan-Alhucemas', ar: 'طنجة-تطوان-الحسيمة' },
  'rabat-sale-kenitra': { en: 'Rabat-Sale-Kenitra', fr: 'Rabat-Sale-Kenitra', es: 'Rabat-Sale-Kenitra', ar: 'الرباط-سلا-القنيطرة' },
  'souss-massa': { en: 'Souss-Massa', fr: 'Souss-Massa', es: 'Sus-Masa', ar: 'سوس-ماسة' },
  'draa-tafilalet': { en: 'Draa-Tafilalet', fr: 'Draa-Tafilalet', es: 'Draa-Tafilalet', ar: 'درعة-تافيلالت' },
  'beni-mellal-khenifra': { en: 'Beni Mellal-Khenifra', fr: 'Beni Mellal-Khenifra', es: 'Beni Mellal-Jenifra', ar: 'بني ملال-خنيفرة' },
  'oriental': { en: 'Oriental', fr: 'Oriental', es: 'Oriental', ar: 'الشرق' },
  'guelmim-oued-noun': { en: 'Guelmim-Oued Noun', fr: 'Guelmim-Oued Noun', es: 'Guelmim-Oued Noun', ar: 'كلميم-واد نون' },
  'laayoune-sakia-el-hamra': { en: 'Laayoune-Sakia El Hamra', fr: 'Laayoune-Sakia El Hamra', es: 'El Aaiun-Saguia el Hamra', ar: 'العيون-الساقية الحمراء' },
  'dakhla-oued-ed-dahab': { en: 'Dakhla-Oued Ed-Dahab', fr: 'Dakhla-Oued Ed-Dahab', es: 'Dajla-Rio de Oro', ar: 'الداخلة-وادي الذهب' },
}
