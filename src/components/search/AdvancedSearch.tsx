'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { SearchFilters } from '@/types'

interface AdvancedSearchProps {
  filters: Partial<SearchFilters>
  onFiltersChange: (filters: Partial<SearchFilters>) => void
  onClear: () => void
  className?: string
}

export function AdvancedSearch({
  filters,
  onFiltersChange,
  onClear,
  className,
}: AdvancedSearchProps) {
  const t = useTranslations('search')
  const [isExpanded, setIsExpanded] = useState(false)

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0
    onFiltersChange({
      ...filters,
      priceRange: {
        min: type === 'min' ? numValue : (filters.priceRange?.min || 0),
        max: type === 'max' ? numValue : (filters.priceRange?.max || 10000),
      },
    })
  }

  const handleFreeToggle = () => {
    onFiltersChange({
      ...filters,
      isFree: !filters.isFree,
    })
  }

  const handleAccessibilityChange = (
    key: 'wheelchairAccess' | 'signLanguage' | 'audioDescription'
  ) => {
    onFiltersChange({
      ...filters,
      accessibility: {
        ...filters.accessibility,
        [key]: !filters.accessibility?.[key],
      },
    })
  }

  const hasActiveFilters =
    filters.isFree ||
    filters.priceRange ||
    filters.accessibility?.wheelchairAccess ||
    filters.accessibility?.signLanguage ||
    filters.accessibility?.audioDescription

  return (
    <div className={cn('border border-border', className)}>
      {/* Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-footer-1 transition-colors"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted" />
          <span className="font-ui text-sm font-medium">{t('advanced')}</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-accent" />
          )}
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-muted transition-transform',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 border-t border-border space-y-6">
              {/* Price Range */}
              <div>
                <label className="font-body text-xs text-muted mb-2 block">
                  {t('priceRange')} (MAD)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange?.min || ''}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-24 px-3 py-2 border border-border font-body text-xs focus:border-foreground outline-none"
                  />
                  <span className="text-muted">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange?.max || ''}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-24 px-3 py-2 border border-border font-body text-xs focus:border-foreground outline-none"
                  />
                </div>
              </div>

              {/* Free Events Toggle */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isFree || false}
                    onChange={handleFreeToggle}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="font-body text-xs">{t('free')}</span>
                </label>
              </div>

              {/* Accessibility Options */}
              <div>
                <label className="font-body text-xs text-muted mb-2 block">
                  {t('accessibility')}
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'wheelchairAccess' as const, label: t('wheelchair') },
                    { key: 'signLanguage' as const, label: t('signLanguage') },
                    { key: 'audioDescription' as const, label: t('audioDescription') },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.accessibility?.[option.key] || false}
                        onChange={() => handleAccessibilityChange(option.key)}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="font-body text-xs">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 py-2 bg-foreground text-background font-ui text-xs font-medium hover:bg-accent transition-colors"
                >
                  {t('apply')}
                </button>
                <button
                  onClick={onClear}
                  className="px-4 py-2 border border-border font-ui text-xs hover:border-foreground transition-colors"
                >
                  {t('clear')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
