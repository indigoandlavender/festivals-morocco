'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import type { Locale } from '@/types'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { href: '/about', label: t('navigation.about') },
    { href: '/contact', label: t('navigation.contact') },
    { href: '/faq', label: t('navigation.faq') },
    { href: '/press', label: t('navigation.press') },
  ]

  const legalLinks = [
    { href: '/privacy', label: t('legal.privacy') },
    { href: '/terms', label: t('legal.terms') },
    { href: '/cookies', label: t('legal.cookies') },
    { href: '/legal', label: t('legal.notice') },
  ]

  const socialLinks = [
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
    { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
  ]

  return (
    <footer className="mt-auto">
      {/* Level 1 - Navigation & Social */}
      <div className="bg-footer-1 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Navigation */}
            <nav className="flex flex-wrap gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-sm text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-muted tracking-wide-letters uppercase">
                {t('social.follow')}
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level 2 - Legal (Nexus Database) */}
      <div className="bg-footer-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            {legalLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-4 md:gap-8">
                <Link
                  href={link.href}
                  className="font-body text-xs text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="hidden md:inline text-border">|</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Level 3 - Powered by Slow Morocco */}
      <div className="bg-footer-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <p className="font-body text-xs text-muted">
              {t('powered')}{' '}
              <a
                href="https://slowmorocco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium"
              >
                {t('slowMorocco')}
              </a>
            </p>
            <p className="font-body text-xs text-muted">
              {currentYear} Festivals Morocco. {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
