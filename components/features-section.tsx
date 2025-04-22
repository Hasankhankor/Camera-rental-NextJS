import { Camera, Calendar, CreditCard, Shield, Star, Bell } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full bg-muted/50">
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything You Need for Your Perfect Shot
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform simplifies the rental process with powerful features designed for photographers of all
                levels.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Camera className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Extensive Inventory</h3>
              <p className="text-center text-muted-foreground">
                From DSLRs to cinema cameras, lenses, lighting, and accessories - all with real-time availability.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Calendar className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Instant Booking</h3>
              <p className="text-center text-muted-foreground">
                Reserve equipment in seconds with our streamlined booking system and waitlist options.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <CreditCard className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-center text-muted-foreground">
                Integrated payment processing with automatic deposit returns when equipment is safely returned.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Shield className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Verified Users</h3>
              <p className="text-center text-muted-foreground">
                ID verification ensures equipment is rented only to trusted, responsible users.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Bell className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Smart Notifications</h3>
              <p className="text-center text-muted-foreground">
                Timely alerts for pickups, returns, and maintenance updates via email and SMS.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Star className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Ratings & Reviews</h3>
              <p className="text-center text-muted-foreground">
                Make informed choices with detailed equipment reviews and reliability metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
