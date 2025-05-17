"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function HeroSection() {
  const images = [
    "https://image12.photobiz.com/6625/34_20210107162028_5427460_large.jpg",
    "https://cdn.fstoppers.com/styles/full/s3/media/2021/04/14/nando-prime-or-zoom.jpg",
    "https://cdn.prod.website-files.com/5979e04f8ce136000121f712/59bc282fa353f20001c492e8_image-rental-equipment.jpg",
    "https://www.accordequips.com/admin/assets/images/sliders/15bc431951b7d0.png"
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full bg-background">
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                CaptureCart: Smart Camera Rental System
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Access high-quality equipment without the commitment. Book instantly, pick up locally, and capture your
                vision.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/marketplace">
                <Button size="lg" className="px-8">
                  Browse Equipment
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="px-8">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px]">
              <Image
                src={images[currentImageIndex]}
                alt="Professional camera equipment"
                fill
                className="object-cover rounded-lg transition-opacity duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
