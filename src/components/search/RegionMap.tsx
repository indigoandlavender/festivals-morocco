'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { cn } from '@/lib/utils/cn'
import { regionLabels } from '@/lib/events'
import type { MoroccoRegion, Locale } from '@/types'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// Morocco region center coordinates
const regionCenters: Record<MoroccoRegion, [number, number]> = {
  'marrakech-safi': [-8.0, 31.63],
  'casablanca-settat': [-7.58, 33.57],
  'fes-meknes': [-5.0, 34.03],
  'tanger-tetouan-al-hoceima': [-5.8, 35.76],
  'rabat-sale-kenitra': [-6.84, 34.02],
  'souss-massa': [-9.5, 30.42],
  'draa-tafilalet': [-5.5, 31.2],
  'beni-mellal-khenifra': [-6.35, 32.33],
  'oriental': [-2.93, 34.68],
  'guelmim-oued-noun': [-10.06, 28.98],
  'laayoune-sakia-el-hamra': [-13.2, 27.15],
  'dakhla-oued-ed-dahab': [-15.93, 23.72],
}

interface RegionMapProps {
  selectedRegion?: MoroccoRegion
  onRegionSelect: (region: MoroccoRegion | undefined) => void
  locale: Locale
  className?: string
}

export function RegionMap({
  selectedRegion,
  onRegionSelect,
  locale,
  className,
}: RegionMapProps) {
  const t = useTranslations('search')
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-7.09, 31.79], // Center of Morocco
      zoom: 4.5,
      minZoom: 4,
      maxZoom: 10,
    })

    map.current.on('load', () => {
      setIsLoaded(true)

      // Add markers for each region
      Object.entries(regionCenters).forEach(([region, coords]) => {
        const el = document.createElement('div')
        el.className = 'region-marker'
        el.style.width = '12px'
        el.style.height = '12px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = selectedRegion === region ? '#E53935' : '#1a1a1a'
        el.style.border = '2px solid #faf9f7'
        el.style.cursor = 'pointer'
        el.style.transition = 'transform 0.2s, background-color 0.2s'

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)'
        })
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)'
        })
        el.addEventListener('click', () => {
          onRegionSelect(
            selectedRegion === region ? undefined : (region as MoroccoRegion)
          )
        })

        const marker = new mapboxgl.Marker(el)
          .setLngLat(coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
              `<div class="font-body text-xs">${regionLabels[region as MoroccoRegion][locale]}</div>`
            )
          )
          .addTo(map.current!)

        markers.current.push(marker)
      })
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      markers.current.forEach((marker) => marker.remove())
      markers.current = []
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Update marker colors when selection changes
  useEffect(() => {
    if (!isLoaded) return

    markers.current.forEach((marker, index) => {
      const region = Object.keys(regionCenters)[index]
      const el = marker.getElement()
      el.style.backgroundColor = selectedRegion === region ? '#E53935' : '#1a1a1a'
    })

    // Fly to selected region
    if (selectedRegion && regionCenters[selectedRegion]) {
      map.current?.flyTo({
        center: regionCenters[selectedRegion],
        zoom: 7,
        duration: 1000,
      })
    }
  }, [selectedRegion, isLoaded])

  return (
    <div className={cn('relative', className)}>
      <div ref={mapContainer} className="w-full h-[300px] border border-border" />

      {/* Region List Overlay */}
      <div className="absolute top-2 left-2 bg-background/95 border border-border p-2 max-h-[280px] overflow-y-auto">
        <button
          onClick={() => onRegionSelect(undefined)}
          className={cn(
            'block w-full text-left px-2 py-1 font-body text-xs transition-colors',
            !selectedRegion ? 'text-accent font-medium' : 'text-muted hover:text-foreground'
          )}
        >
          {t('allRegions')}
        </button>
        {Object.keys(regionCenters).map((region) => (
          <button
            key={region}
            onClick={() => onRegionSelect(region as MoroccoRegion)}
            className={cn(
              'block w-full text-left px-2 py-1 font-body text-xs transition-colors',
              selectedRegion === region
                ? 'text-accent font-medium'
                : 'text-muted hover:text-foreground'
            )}
          >
            {regionLabels[region as MoroccoRegion][locale]}
          </button>
        ))}
      </div>
    </div>
  )
}
