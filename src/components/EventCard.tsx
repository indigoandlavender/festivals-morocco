'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Ticket } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { formatDateRange, formatPrice } from '@/lib/utils/format'
import { categoryLabels, regionLabels } from '@/lib/events'
import type { Event, Locale } from '@/types'

interface EventCardProps {
  event: Event
  locale: Locale
  className?: string
}

export function EventCard({ event, locale, className }: EventCardProps) {
  const t = useTranslations('event')
  const tCategories = useTranslations('categories')

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('group border border-border bg-background', className)}
    >
      <Link href={`/event/${event.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title[locale]}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-background/90 font-body text-xs">
              {tCategories(event.category)}
            </span>
          </div>
          {/* Free Badge */}
          {event.price.isFree && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-accent text-white font-ui text-xs font-medium">
                {t('free')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {event.title[locale]}
          </h3>

          {/* Description */}
          <p className="font-body text-xs text-muted line-clamp-2 mb-4">
            {event.description[locale]}
          </p>

          {/* Meta Info */}
          <div className="space-y-2">
            {/* Date */}
            <div className="flex items-center gap-2 text-muted">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-body text-xs">
                {formatDateRange(event.startDate, event.endDate, locale)}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-body text-xs">
                {event.city}, {regionLabels[event.region][locale]}
              </span>
            </div>

            {/* Price */}
            {!event.price.isFree && (
              <div className="flex items-center gap-2 text-muted">
                <Ticket className="w-3.5 h-3.5" />
                <span className="font-body text-xs">
                  {formatPrice(event.price.min, event.price.currency)}
                  {event.price.min !== event.price.max && (
                    <> - {formatPrice(event.price.max, event.price.currency)}</>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
