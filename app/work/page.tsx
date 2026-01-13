import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getContentByType } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Our Work",
  description: "Case studies showcasing strategic transformations and measurable results.",
  url: "/work",
})

export default function WorkPage() {
  const caseStudies = getContentByType('work')

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-700 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Our Work
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Real challenges. Strategic solutions. Measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {caseStudies.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <Card
                  key={study.meta.slug}
                  className="flex flex-col border-navy/10 transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    {study.meta.category && (
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
                        {study.meta.category}
                      </div>
                    )}
                    <CardTitle className="line-clamp-2">
                      {study.meta.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {study.meta.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-navy-600">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(study.meta.date)}
                      </div>
                      <Link
                        href={`/work/${study.meta.slug}`}
                        className="inline-flex items-center text-sm font-medium text-navy hover:underline"
                      >
                        Read case study
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-navy-600">
                Case studies coming soon. Check back later!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
