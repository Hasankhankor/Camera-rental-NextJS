import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-6 md:h-24 md:py-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2024 CaptureCart. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground underline underline-offset-4">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
