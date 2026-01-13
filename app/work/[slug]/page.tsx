import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getContentBySlug, getAllSlugs } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"
import { generateSEO } from "@/lib/seo"

export async function generateStaticParams() {
  const slugs = getAllSlugs('work')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const content = getContentBySlug('work', params.slug)

  if (!content) {
    return {}
  }

  return generateSEO({
    title: content.meta.title,
    description: content.meta.description,
    url: `/work/${params.slug}`,
    image: content.meta.image,
    type: 'article',
    publishedTime: content.meta.date,
    tags: content.meta.tags,
  })
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const content = getContentBySlug('work', params.slug)

  if (!content) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-navy to-navy-700 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/work"
              className="mb-8 inline-flex items-center text-sm text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Work
            </Link>
            {content.meta.category && (
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
                {content.meta.category}
              </div>
            )}
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              {content.meta.title}
            </h1>
            <p className="mb-6 text-lg text-white/90">{content.meta.description}</p>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(content.meta.date)}
              </div>
              {content.meta.readingTime && (
                <div>{content.meta.readingTime}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-navy mx-auto max-w-3xl lg:prose-lg">
            <MDXRemote source={content.content} />
          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <section className="border-t bg-gradient-to-br from-navy-50 to-gold-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-navy md:text-3xl">
              Interested in Similar Results?
            </h2>
            <p className="mb-6 text-navy-600">
              Let&apos;s discuss how we can help your organization achieve its goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-navy px-6 py-3 font-medium text-white transition-colors hover:bg-navy-600"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
