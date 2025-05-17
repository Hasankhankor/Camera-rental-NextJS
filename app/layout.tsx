import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CaptureCart – Smart Camera Rental System",
  description: "Rent professional camera gear with ease through our smart rental system",
  generator: 'Hassan Tariq'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="overflow-x-hidden">
          <ClientLayout className="overflow-x-hidden">
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  )
}
