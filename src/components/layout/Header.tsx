'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils/cn'
import { Globe, ChevronDown, Menu, X } from 'lucide-react'
import type { Locale } from '@/types'

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
  { code: 'ar', label: 'AR' },
]

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('header')
  const pathname = usePathname()
  const router = useRouter()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setIsLangOpen(false)
  }

  const navItems = [
    { href: '/', label: t('nav.search') },
    { href: '/events', label: t('nav.events') },
    { href: '/regions', label: t('nav.regions') },
    { href: '/about', label: t('nav.about') },
  ]

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-display text-xl font-semibold tracking-title">
              {t('logo')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-ui text-sm font-medium transition-colors hover:text-accent',
                  pathname === item.href ? 'text-foreground' : 'text-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 font-ui text-sm font-medium text-muted hover:text-foreground transition-colors"
                aria-label={t('language')}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{locale}</span>
                <ChevronDown
                  className={cn(
                    'w-3 h-3 transition-transform',
                    isLangOpen && 'rotate-180'
                  )}
                />
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-24 bg-background border border-border shadow-lg z-20">
                    {locales.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => handleLocaleChange(loc.code)}
                        className={cn(
                          'w-full px-4 py-2 text-left font-ui text-sm transition-colors hover:bg-footer-2',
                          locale === loc.code
                            ? 'text-accent font-medium'
                            : 'text-foreground'
                        )}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block py-2 font-ui text-sm font-medium transition-colors hover:text-accent',
                  pathname === item.href ? 'text-foreground' : 'text-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
