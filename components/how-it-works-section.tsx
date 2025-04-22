import { CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How LensLease Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Renting camera gear has never been easier. Follow these simple steps to get started.
              </p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto w-full">
            <div className="space-y-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Create Your Account</h3>
                  <p className="text-muted-foreground">
                    Sign up and complete your profile with ID verification to unlock booking capabilities.
                  </p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Quick registration process</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Secure ID verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Profile customization options</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Browse & Book Equipment</h3>
                  <p className="text-muted-foreground">
                    Search our extensive inventory, check availability, and reserve what you need instantly.
                  </p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Filter by equipment type, brand, and features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Real-time availability calendar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Transparent pricing with no hidden fees</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Pick Up & Create</h3>
                  <p className="text-muted-foreground">
                    Collect your gear at the scheduled time, inspect it together with our staff, and start shooting.
                  </p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Convenient pickup locations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Equipment inspection checklist</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Usage tips and support</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Return & Review</h3>
                  <p className="text-muted-foreground">
                    Return the equipment on time, get your deposit back automatically, and share your experience.
                  </p>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Flexible return windows</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Automatic deposit refunds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Equipment rating system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
