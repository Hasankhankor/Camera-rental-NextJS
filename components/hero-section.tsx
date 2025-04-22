import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
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
                src="/placeholder.svg?height=500&width=500"
                alt="Professional camera equipment"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
