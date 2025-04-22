"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "Profoto B1X (1 head 500w)",
    category: "Lighting",
    price: 150.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Professional studio flash with 500W power and TTL functionality. Perfect for studio and location shoots.",
    condition: "Excellent",
    location: "Dubai Marina",
    specifications: [
      "500W power output",
      "TTL functionality",
      "High-Speed Sync up to 1/8000s",
      "Rechargeable battery with up to 325 full-power flashes",
      "Compatible with all major camera brands",
    ],
    owner: {
      name: "Camera World",
      rating: 4.8,
      reviews: 56,
      response: "Within 1 hour",
    },
  },
  {
    id: "2",
    name: "Nanlite Pavotube II 15C LED RGB",
    category: "Lighting",
    price: 70.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Versatile RGB LED tube light with multiple effects and wireless control. Perfect for creative lighting setups.",
    condition: "Good",
    location: "Downtown Dubai",
    specifications: [
      "15W RGB LED tube light",
      "Multiple built-in effects",
      "Wireless control via app",
      "Battery life up to 2 hours at full power",
      "Adjustable color temperature from 2700K to 7500K",
    ],
    owner: {
      name: "Light Masters",
      rating: 4.6,
      reviews: 32,
      response: "Within 2 hours",
    },
  },
  {
    id: "3",
    name: "Sony A7 S III Full Frame Camera",
    category: "Cameras",
    price: 330.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "The Sony A7S III is a full-frame mirrorless camera designed for professional videographers and photographers. It features a 12.1MP Exmor R BSI CMOS sensor and BIONZ XR image processor, allowing for impressive low-light performance and 4K video recording at up to 120p.",
    condition: "Excellent",
    location: "Dubai Marina",
    specifications: [
      "12.1MP Full-Frame Exmor R BSI CMOS Sensor",
      "UHD 4K 120p Video, 10-Bit 4:2:2 Internal",
      "16-Bit Raw Output, HLG & S-Log3 Gammas",
      "759-Point Fast Hybrid AF",
      "9.44m-Dot QXGA OLED EVF",
      '3.0" 1.44m-Dot Vari-Angle Touchscreen',
      "5-Axis SteadyShot Image Stabilization",
      "Extended ISO 40-409600, 10 fps Shooting",
      "Dual CFexpress Type A/SD Card Slots",
      "759-Point Fast Hybrid AF System",
    ],
    owner: {
      name: "Camera World",
      rating: 4.8,
      reviews: 56,
      response: "Within 1 hour",
    },
  },
  {
    id: "4",
    name: "Canon RF 24-70mm f/2.8L IS USM",
    category: "Lenses",
    price: 120.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Professional standard zoom lens for Canon RF mount. Features image stabilization and constant f/2.8 aperture throughout the zoom range.",
    condition: "Like New",
    location: "Business Bay",
    specifications: [
      "RF-Mount Lens for Canon mirrorless cameras",
      "Aperture Range: f/2.8 to f/22",
      "3 Aspherical Elements, 3 UD Elements",
      "Nano USM AF System",
      "Optical Image Stabilizer",
      "Customizable Control Ring",
      "Rounded 9-Blade Diaphragm",
      "Weather-Sealed Design",
    ],
    owner: {
      name: "Pro Lens Rentals",
      rating: 4.9,
      reviews: 78,
      response: "Within 30 minutes",
    },
  },
  {
    id: "5",
    name: "Sony FE 16-35mm f/2.8 GM",
    category: "Lenses",
    price: 110.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Professional wide-angle zoom lens for Sony E-mount. Part of Sony's G Master series with exceptional optical performance.",
    condition: "Excellent",
    location: "JLT",
    specifications: [
      "E-Mount Lens for Sony full-frame cameras",
      "Aperture Range: f/2.8 to f/22",
      "Two XA Elements, Two ED Elements",
      "Nano AR Coating",
      "Direct Drive SSM Focus System",
      "Focus Hold Button, AF/MF Switch",
      "Dust and Moisture-Resistant Construction",
      "Eleven-Blade Circular Diaphragm",
    ],
    owner: {
      name: "Alpha Rentals",
      rating: 4.7,
      reviews: 45,
      response: "Within 1 hour",
    },
  },
  {
    id: "6",
    name: "DJI Ronin-S Gimbal Stabilizer",
    category: "Stabilizers",
    price: 85.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Professional 3-axis gimbal stabilizer for DSLR and mirrorless cameras. Provides smooth footage for moving shots.",
    condition: "Good",
    location: "Dubai Silicon Oasis",
    specifications: [
      "3-Axis Motorized Gimbal Stabilizer",
      "Supports cameras up to 8 lbs",
      "Sport Mode for fast-moving subjects",
      "360° continuous rotation",
      "12-hour battery life",
      "Smartphone app control",
      "Multiple intelligent shooting modes",
    ],
    owner: {
      name: "Motion Masters",
      rating: 4.5,
      reviews: 38,
      response: "Within 2 hours",
    },
  },
  {
    id: "7",
    name: "Rode VideoMic Pro+",
    category: "Audio",
    price: 45.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Professional on-camera shotgun microphone with digital switching and improved battery life. Perfect for DSLR and mirrorless video recording.",
    condition: "Excellent",
    location: "Downtown Dubai",
    specifications: [
      "Directional shotgun microphone",
      "Digital switching controls",
      "Automatic power function",
      "Rycote Lyre shock mounting",
      "Safety channel recording",
      "Rechargeable lithium-ion battery",
      "3.5mm output",
    ],
    owner: {
      name: "Audio Experts",
      rating: 4.6,
      reviews: 29,
      response: "Within 1 hour",
    },
  },
  {
    id: "8",
    name: "Manfrotto MT055XPRO3 Tripod",
    category: "Supports",
    price: 35.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Professional aluminum tripod with 3-section legs and Quick Power Lock system. Versatile and stable support for cameras and video equipment.",
    condition: "Good",
    location: "Dubai Marina",
    specifications: [
      "Aluminum construction",
      "3-section legs with Quick Power Lock",
      "Maximum height: 170cm",
      "Minimum height: 9cm",
      "Maximum load capacity: 9kg",
      "90° center column mechanism",
      "Easy Link connection for accessories",
    ],
    owner: {
      name: "Support Systems",
      rating: 4.7,
      reviews: 42,
      response: "Within 1 hour",
    },
  },
  {
    id: "9",
    name: "Godox AD200Pro Pocket Flash",
    category: "Lighting",
    price: 65.0,
    currency: "AED",
    image: "/placeholder.svg?height=300&width=300",
    status: "available",
    description:
      "Portable and powerful flash with interchangeable flash heads. Provides 200Ws of power in a compact form factor.",
    condition: "Like New",
    location: "Business Bay",
    specifications: [
      "200Ws output power",
      "Interchangeable flash heads (bare bulb and speedlight)",
      "TTL and manual modes",
      "High-speed sync up to 1/8000s",
      "Recycle time: 0.01-2.1 seconds",
      "500 full-power flashes per charge",
      "2.4GHz wireless control",
    ],
    owner: {
      name: "Flash Rentals",
      rating: 4.8,
      reviews: 36,
      response: "Within 30 minutes",
    },
  },
]

export type Product = {
  id: string
  name: string
  category: string
  price: number
  currency: string
  image: string
  status: string
  description: string
  condition: string
  location: string
  specifications?: string[]
  owner?: {
    name: string
    rating: number
    reviews: number
    response: string
  }
  createdAt?: string
}

type ProductStore = {
  products: Product[]
  addProduct: (product: Product) => void
  getProduct: (id: string) => Product | undefined
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      getProduct: (id) => get().products.find((product) => product.id === id),
    }),
    {
      name: "product-store",
    },
  ),
)
