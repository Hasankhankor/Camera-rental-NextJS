"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"

export type FilterState = {
  categories: {
    cameras: boolean
    lenses: boolean
    lighting: boolean
    audio: boolean
    stabilizers: boolean
    supports: boolean
  }
  priceRange: {
    under50: boolean
    under100: boolean
    under200: boolean
    over200: boolean
  }
}

export function Filter({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [categories, setCategories] = useState({
    cameras: false,
    lenses: false,
    lighting: false,
    audio: false,
    stabilizers: false,
    supports: false,
  })

  const [priceRange, setPriceRange] = useState({
    under50: false,
    under100: false,
    under200: false,
    over200: false,
  })

  const handleCategoryChange = (category: keyof typeof categories, checked: boolean) => {
    const newCategories = { ...categories, [category]: checked }
    setCategories(newCategories)
    onFilterChange({ categories: newCategories, priceRange })
  }

  const handlePriceChange = (range: keyof typeof priceRange, checked: boolean) => {
    const newPriceRange = { ...priceRange, [range]: checked }
    setPriceRange(newPriceRange)
    onFilterChange({ categories, priceRange: newPriceRange })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={categories.cameras}
          onCheckedChange={(checked) => handleCategoryChange("cameras", !!checked)}
        >
          Cameras
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={categories.lenses}
          onCheckedChange={(checked) => handleCategoryChange("lenses", !!checked)}
        >
          Lenses
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={categories.lighting}
          onCheckedChange={(checked) => handleCategoryChange("lighting", !!checked)}
        >
          Lighting
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={categories.audio}
          onCheckedChange={(checked) => handleCategoryChange("audio", !!checked)}
        >
          Audio
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={categories.stabilizers}
          onCheckedChange={(checked) => handleCategoryChange("stabilizers", !!checked)}
        >
          Stabilizers
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={categories.supports}
          onCheckedChange={(checked) => handleCategoryChange("supports", !!checked)}
        >
          Supports
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Price Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={priceRange.under50}
          onCheckedChange={(checked) => handlePriceChange("under50", !!checked)}
        >
          Under AED 50
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priceRange.under100}
          onCheckedChange={(checked) => handlePriceChange("under100", !!checked)}
        >
          AED 50 - 100
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priceRange.under200}
          onCheckedChange={(checked) => handlePriceChange("under200", !!checked)}
        >
          AED 100 - 200
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={priceRange.over200}
          onCheckedChange={(checked) => handlePriceChange("over200", !!checked)}
        >
          Over AED 200
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
