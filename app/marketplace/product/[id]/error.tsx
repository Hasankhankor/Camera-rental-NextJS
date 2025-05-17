'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error() {
  const router = useRouter()

  return (
    <div className="container max-w-6xl py-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">
          We couldn&apos;t load this product. It might have been removed or you may not have permission to view it.
        </p>
        <Button onClick={() => router.push("/marketplace")}>
          Return to Marketplace
        </Button>
      </div>
    </div>
  )
}
