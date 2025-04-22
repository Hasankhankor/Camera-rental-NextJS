import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="w-full flex justify-center overflow-x-hidden">
      <div className={cn(
        "w-full max-w-[90rem] px-4 sm:px-6 lg:px-8",
        className
      )}>
        {children}
      </div>
    </div>
  )
}