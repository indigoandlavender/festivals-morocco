'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
import { EventCard } from '@/components/EventCard'
import { cn } from '@/lib/utils/cn'
import type { Event, Locale } from '@/types'

interface SearchResultsProps {
  events: Event[]
  locale: Locale
  isLoading?: boolean
  className?: string
}

export function SearchResults({
  events,
  locale,
  isLoading,
  className,
}: SearchResultsProps) {
  const t = useTranslations('search')

  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-border animate-pulse">
            <div className="aspect-[16/10] bg-footer-2" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-footer-2 w-3/4" />
              <div className="h-4 bg-footer-2 w-full" />
              <div className="h-3 bg-footer-2 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          'flex flex-col items-center justify-center py-16 text-center',
          className
        )}
      >
        <SearchX className="w-12 h-12 text-border mb-4" />
        <h3 className="font-display text-lg font-semibold mb-2">
          {t('noResults')}
        </h3>
        <p className="font-body text-xs text-muted">{t('tryDifferent')}</p>
      </motion.div>
    )
  }

  return (
    <div className={className}>
      {/* Results Count */}
      <div className="mb-4">
        <span className="font-body text-xs text-muted">
          {events.length} {t('results')}
        </span>
      </div>

      {/* Results Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <EventCard event={event} locale={locale} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
