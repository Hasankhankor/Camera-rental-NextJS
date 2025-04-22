import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section className="w-full bg-muted/50">
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Hear from photographers who have transformed their workflow with CaptureCart.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40" alt="User avatar" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">محمد الهاشمي</h3>
                    <p className="text-sm text-muted-foreground">مصور أعراس</p>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "كابتشر كارت غيرت طريقة عملي في تصوير الأعراس. يمكنني الوصول إلى معدات عالية الجودة لجلسات تصوير محددة
                  دون الحاجة إلى استثمار ضخم. عملية الحجز سلسة للغاية!"
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40" alt="User avatar" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">فاطمة العلي</h3>
                    <p className="text-sm text-muted-foreground">مصورة فيديو مستقلة</p>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "كمصورة مستقلة، أحتاج إلى معدات مختلفة لعملاء مختلفين. كابتشر كارت تتيح لي الوصول إلى ما أحتاجه بالضبط،
                  عندما أحتاجه، دون أن أفلس. الجودة دائمًا ممتازة."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40" alt="User avatar" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">أحمد المنصوري</h3>
                    <p className="text-sm text-muted-foreground">طالب سينما</p>
                  </div>
                </div>
                <div className="flex mt-2 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  "كابتشر كارت كانت ضرورية لمشاريع أفلامي. كطالب، لم أكن لأتمكن أبدًا من شراء معدات احترافية، لكن أسعار
                  الإيجار معقولة وعملية الحجز واضحة وسهلة."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
