import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContentWrapperProps {
  children: ReactNode
  className?: string
}

export function ContentWrapper({ children, className }: ContentWrapperProps) {
  return (
    <div className="section-container min-w-[320px]">
      <div className={cn("content-container relative", className)}>
        {children}
      </div>
    </div>
  )
}