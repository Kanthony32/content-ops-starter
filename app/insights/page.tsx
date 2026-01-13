import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getContentByType } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Insights",
  description: "Thought leadership, trends, and insights on strategy, operations, and leadership.",
  url: "/insights",
})

export default function InsightsPage() {
  const posts = getContentByType('insights')

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-700 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Insights
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Perspectives on strategy, leadership, and organizational transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post.meta.slug}
                  className="flex flex-col border-navy/10 transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    {post.meta.category && (
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
                        {post.meta.category}
                      </div>
                    )}
                    <CardTitle className="line-clamp-2">
                      {post.meta.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.meta.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="mb-4 flex items-center gap-4 text-xs text-navy-600">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(post.meta.date)}
                      </div>
                      {post.meta.readingTime && (
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.meta.readingTime}
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/insights/${post.meta.slug}`}
                      className="inline-flex items-center text-sm font-medium text-navy hover:underline"
                    >
                      Read article
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-navy-600">
                Articles coming soon. Check back later!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
