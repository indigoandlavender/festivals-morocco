'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  className?: string
}

export function SearchBar({ value, onChange, onSubmit, className }: SearchBarProps) {
  const t = useTranslations('search')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex items-center',
        className
      )}
    >
      <div
        className={cn(
          'relative flex-1 flex items-center border transition-colors',
          isFocused ? 'border-foreground' : 'border-border',
          'bg-background'
        )}
      >
        <Search className="absolute left-4 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('placeholder')}
          className="w-full py-3 pl-11 pr-10 font-body text-sm bg-transparent outline-none placeholder:text-muted"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 text-muted hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="ml-2 px-6 py-3 bg-foreground text-background font-ui text-sm font-medium hover:bg-accent transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  )
}
