'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  X,
  Music,
  Palette,
  Film,
  Users,
  Theater,
  Landmark,
  UtensilsCrossed,
  BookOpen,
  Scissors,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { categoryLabels } from '@/lib/events'
import type { EventCategory, Locale } from '@/types'

const categoryIcons: Record<EventCategory, typeof Music> = {
  music: Music,
  art: Palette,
  film: Film,
  dance: Users,
  theatre: Theater,
  heritage: Landmark,
  food: UtensilsCrossed,
  literature: BookOpen,
  craft: Scissors,
  spiritual: Sparkles,
}

interface VisualSearchProps {
  selectedCategories: EventCategory[]
  onCategoryToggle: (category: EventCategory) => void
  onImageUpload?: (file: File) => void
  locale: Locale
  className?: string
}

export function VisualSearch({
  selectedCategories,
  onCategoryToggle,
  onImageUpload,
  locale,
  className,
}: VisualSearchProps) {
  const t = useTranslations('search')
  const tCategories = useTranslations('categories')
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) {
        handleFile(file)
      }
    },
    [onImageUpload]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [onImageUpload]
  )

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    onImageUpload?.(file)
  }

  const clearImage = () => {
    setUploadedImage(null)
  }

  const categories = Object.keys(categoryIcons) as EventCategory[]

  return (
    <div className={cn('space-y-6', className)}>
      {/* Image Upload Section */}
      <div>
        <h3 className="font-ui text-sm font-medium mb-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          {t('uploadImage')}
        </h3>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed transition-colors',
            isDragging ? 'border-accent bg-accent/5' : 'border-border',
            'hover:border-muted'
          )}
        >
          {uploadedImage ? (
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-32 object-cover"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1 bg-background/90 border border-border hover:bg-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
              <Upload className="w-8 h-8 text-muted mb-2" />
              <p className="font-body text-xs text-muted text-center px-4">
                {t('dropImage')}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Category Cards Section */}
      <div>
        <h3 className="font-ui text-sm font-medium mb-3">{t('categories')}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {categories.map((category) => {
            const Icon = categoryIcons[category]
            const isSelected = selectedCategories.includes(category)

            return (
              <motion.button
                key={category}
                onClick={() => onCategoryToggle(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'category-card flex flex-col items-center gap-2 p-4 border transition-colors',
                  isSelected
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-muted'
                )}
              >
                <Icon
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isSelected ? 'text-accent' : 'text-muted'
                  )}
                />
                <span
                  className={cn(
                    'font-body text-xs text-center transition-colors',
                    isSelected ? 'text-foreground font-medium' : 'text-muted'
                  )}
                >
                  {tCategories(category)}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
