'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react'
import { SearchBar } from '@/components/search/SearchBar'
import { RegionMap } from '@/components/search/RegionMap'
import { CalendarModal } from '@/components/search/CalendarModal'
import { VisualSearch } from '@/components/search/VisualSearch'
import { AdvancedSearch } from '@/components/search/AdvancedSearch'
import { SearchResults } from '@/components/search/SearchResults'
import { cn } from '@/lib/utils/cn'
import { getEvents, filterEvents } from '@/lib/events'
import type { MoroccoRegion, EventCategory, SearchFilters, Locale } from '@/types'

type SearchTab = 'region' | 'date' | 'visual' | 'advanced'

export default function HomePage() {
  const t = useTranslations('search')
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'

  // Search state
  const [query, setQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<MoroccoRegion | undefined>()
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  })
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([])
  const [advancedFilters, setAdvancedFilters] = useState<Partial<SearchFilters>>({})

  // UI state
  const [activeTab, setActiveTab] = useState<SearchTab | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Filter events
  const filteredEvents = useMemo(() => {
    const allEvents = getEvents()
    return filterEvents({
      query,
      region: selectedRegion,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      startDate: dateRange.start || undefined,
      endDate: dateRange.end || undefined,
    })
  }, [query, selectedRegion, selectedCategories, dateRange])

  const handleCategoryToggle = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleClearFilters = () => {
    setQuery('')
    setSelectedRegion(undefined)
    setDateRange({ start: null, end: null })
    setSelectedCategories([])
    setAdvancedFilters({})
  }

  const tabs: { id: SearchTab; icon: typeof MapPin; label: string }[] = [
    { id: 'region', icon: MapPin, label: t('region') },
    { id: 'date', icon: Calendar, label: t('date') },
    { id: 'visual', icon: Sparkles, label: t('visual') },
    { id: 'advanced', icon: SlidersHorizontal, label: t('advanced') },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-footer-1 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-title">
              <span className="text-accent">Festival</span>s Morocco
            </h1>
            <p className="font-body text-sm text-muted max-w-xl mx-auto">
              Discover art exhibitions, cultural festivals, music events, and heritage
              celebrations across Morocco.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <SearchBar value={query} onChange={setQuery} />
          </motion.div>

          {/* Search Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-2 flex-wrap"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'date') {
                    setIsCalendarOpen(true)
                  } else {
                    setActiveTab(activeTab === tab.id ? null : tab.id)
                  }
                }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 border font-ui text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-muted'
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expandable Search Panels */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Region Map */}
          {activeTab === 'region' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-6"
            >
              <RegionMap
                selectedRegion={selectedRegion}
                onRegionSelect={setSelectedRegion}
                locale={locale}
              />
            </motion.div>
          )}

          {/* Visual Search */}
          {activeTab === 'visual' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-6"
            >
              <VisualSearch
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                locale={locale}
              />
            </motion.div>
          )}

          {/* Advanced Search */}
          {activeTab === 'advanced' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-6"
            >
              <AdvancedSearch
                filters={advancedFilters}
                onFiltersChange={setAdvancedFilters}
                onClear={handleClearFilters}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchResults events={filteredEvents} locale={locale} />
        </div>
      </section>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
    </div>
  )
}
