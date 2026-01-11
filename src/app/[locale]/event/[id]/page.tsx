import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import {
  Calendar,
  MapPin,
  Ticket,
  User,
  ExternalLink,
  Share2,
  Navigation,
  Accessibility,
  ArrowLeft,
} from 'lucide-react'
import { getEventById, getEvents, categoryLabels, regionLabels } from '@/lib/events'
import { formatDateRange, formatPrice } from '@/lib/utils/format'
import { EventCard } from '@/components/EventCard'
import type { Locale } from '@/types'

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params
  const event = getEventById(id)

  if (!event) {
    return { title: 'Event Not Found' }
  }

  return {
    title: event.title[locale as Locale],
    description: event.description[locale as Locale],
    openGraph: {
      title: event.title[locale as Locale],
      description: event.description[locale as Locale],
      images: [event.image],
    },
  }
}

export async function generateStaticParams() {
  const events = getEvents()
  const locales = ['en', 'fr', 'es', 'ar']

  return events.flatMap((event) =>
    locales.map((locale) => ({
      locale,
      id: event.id,
    }))
  )
}

export default async function EventPage({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const event = getEventById(id)
  const t = await getTranslations('event')
  const tCategories = await getTranslations('categories')

  if (!event) {
    notFound()
  }

  const typedLocale = locale as Locale

  // Get similar events (same category, different event)
  const similarEvents = getEvents()
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src={event.image}
          alt={event.title[typedLocale]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-background/90 border border-border font-ui text-sm hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-accent text-white font-ui text-sm font-medium">
            {tCategories(event.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
          {event.title[typedLocale]}
        </h1>

        {/* Description */}
        <p className="font-body text-sm text-muted mb-8 leading-relaxed">
          {event.description[typedLocale]}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Date */}
          <div className="flex items-start gap-3 p-4 border border-border">
            <Calendar className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-ui text-xs text-muted uppercase tracking-wide-letters mb-1">
                {t('date')}
              </p>
              <p className="font-body text-sm">
                {formatDateRange(event.startDate, event.endDate, typedLocale)}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 p-4 border border-border">
            <MapPin className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-ui text-xs text-muted uppercase tracking-wide-letters mb-1">
                {t('location')}
              </p>
              <p className="font-body text-sm">
                {event.city}, {regionLabels[event.region][typedLocale]}
              </p>
              <p className="font-body text-xs text-muted mt-1">{event.venue}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-start gap-3 p-4 border border-border">
            <Ticket className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-ui text-xs text-muted uppercase tracking-wide-letters mb-1">
                {t('price')}
              </p>
              <p className="font-body text-sm">
                {event.price.isFree ? (
                  <span className="text-accent font-medium">{t('free')}</span>
                ) : (
                  formatPrice(event.price.min, event.price.currency) +
                  (event.price.min !== event.price.max
                    ? ` - ${formatPrice(event.price.max, event.price.currency)}`
                    : '')
                )}
              </p>
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-start gap-3 p-4 border border-border">
            <User className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-ui text-xs text-muted uppercase tracking-wide-letters mb-1">
                {t('organizer')}
              </p>
              <p className="font-body text-sm">{event.organizer}</p>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        {(event.accessibility.wheelchairAccess ||
          event.accessibility.signLanguage ||
          event.accessibility.audioDescription) && (
          <div className="mb-8 p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Accessibility className="w-5 h-5 text-accent" />
              <p className="font-ui text-sm font-medium">{t('accessibility')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.accessibility.wheelchairAccess && (
                <span className="px-2 py-1 bg-footer-2 font-body text-xs">
                  Wheelchair Access
                </span>
              )}
              {event.accessibility.signLanguage && (
                <span className="px-2 py-1 bg-footer-2 font-body text-xs">
                  Sign Language
                </span>
              )}
              {event.accessibility.audioDescription && (
                <span className="px-2 py-1 bg-footer-2 font-body text-xs">
                  Audio Description
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {event.website && (
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-ui text-sm font-medium hover:bg-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t('website')}
            </a>
          )}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${event.coordinates.lat},${event.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-border font-ui text-sm hover:border-foreground transition-colors"
          >
            <Navigation className="w-4 h-4" />
            {t('directions')}
          </a>
          <button className="flex items-center gap-2 px-4 py-2 border border-border font-ui text-sm hover:border-foreground transition-colors">
            <Share2 className="w-4 h-4" />
            {t('share')}
          </button>
        </div>

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold mb-6">{t('similar')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarEvents.map((similarEvent) => (
                <EventCard
                  key={similarEvent.id}
                  event={similarEvent}
                  locale={typedLocale}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
