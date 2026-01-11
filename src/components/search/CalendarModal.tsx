'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  addDays,
  addWeeks,
} from 'date-fns'
import { ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface DateRange {
  start: Date | null
  end: Date | null
}

interface CalendarModalProps {
  isOpen: boolean
  onClose: () => void
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

export function CalendarModal({
  isOpen,
  onClose,
  dateRange,
  onDateRangeChange,
}: CalendarModalProps) {
  const t = useTranslations('calendar')
  const tSearch = useTranslations('search')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentMonth])

  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

  const handleDayClick = (day: Date) => {
    if (selecting === 'start') {
      onDateRangeChange({ start: day, end: null })
      setSelecting('end')
    } else {
      if (dateRange.start && day < dateRange.start) {
        onDateRangeChange({ start: day, end: dateRange.start })
      } else {
        onDateRangeChange({ ...dateRange, end: day })
      }
      setSelecting('start')
    }
  }

  const handleQuickSelect = (option: 'today' | 'thisWeek' | 'thisMonth') => {
    const today = new Date()
    switch (option) {
      case 'today':
        onDateRangeChange({ start: today, end: today })
        break
      case 'thisWeek':
        onDateRangeChange({
          start: today,
          end: addDays(today, 7),
        })
        break
      case 'thisMonth':
        onDateRangeChange({
          start: today,
          end: addWeeks(today, 4),
        })
        break
    }
    setSelecting('start')
  }

  const isInRange = (day: Date) => {
    if (!dateRange.start || !dateRange.end) return false
    return isWithinInterval(day, { start: dateRange.start, end: dateRange.end })
  }

  const isRangeStart = (day: Date) => {
    return dateRange.start ? isSameDay(day, dateRange.start) : false
  }

  const isRangeEnd = (day: Date) => {
    return dateRange.end ? isSameDay(day, dateRange.end) : false
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border border-border shadow-xl w-[340px] max-w-[95vw]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted" />
                <span className="font-ui text-sm font-medium">{t('title')}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-muted hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Select */}
            <div className="px-4 py-3 border-b border-border">
              <p className="font-body text-xs text-muted mb-2">{t('quickSelect')}</p>
              <div className="flex gap-2">
                {(['today', 'thisWeek', 'thisMonth'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuickSelect(option)}
                    className="px-3 py-1.5 border border-border font-ui text-xs hover:border-foreground transition-colors"
                  >
                    {tSearch(option)}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1 text-muted hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-ui text-sm font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1 text-muted hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="px-4 pb-4">
              {/* Week day headers */}
              <div className="calendar-grid mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center font-body text-xs text-muted py-1"
                  >
                    {t(`days.${day}`)}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="calendar-grid">
                {days.map((day, index) => {
                  const isCurrentMonth = isSameMonth(day, currentMonth)
                  const isSelected = isRangeStart(day) || isRangeEnd(day)
                  const inRange = isInRange(day)

                  return (
                    <button
                      key={index}
                      onClick={() => handleDayClick(day)}
                      disabled={!isCurrentMonth}
                      className={cn(
                        'aspect-square flex items-center justify-center font-body text-xs transition-colors',
                        !isCurrentMonth && 'text-border cursor-not-allowed',
                        isCurrentMonth && !isSelected && !inRange && 'hover:bg-footer-2',
                        isSelected && 'bg-accent text-white',
                        inRange && !isSelected && 'bg-footer-2'
                      )}
                    >
                      {format(day, 'd')}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected Range Display */}
            <div className="px-4 py-3 border-t border-border bg-footer-1">
              <div className="flex justify-between text-xs">
                <div>
                  <span className="font-body text-muted">{t('startDate')}: </span>
                  <span className="font-body font-medium">
                    {dateRange.start ? format(dateRange.start, 'dd MMM yyyy') : '-'}
                  </span>
                </div>
                <div>
                  <span className="font-body text-muted">{t('endDate')}: </span>
                  <span className="font-body font-medium">
                    {dateRange.end ? format(dateRange.end, 'dd MMM yyyy') : '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="px-4 py-3 border-t border-border">
              <button
                onClick={onClose}
                className="w-full py-2 bg-foreground text-background font-ui text-sm font-medium hover:bg-accent transition-colors"
              >
                {t('confirm')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
