import Link from "next/link"
import { ArrowRight, Award, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-700 py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Strategic Advisory for
              <span className="block text-gold"> Forward-Thinking Leaders</span>
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              We partner with visionary organizations to unlock growth, navigate complexity,
              and build enduring value.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/work">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-navy">200+</div>
              <div className="text-sm uppercase tracking-wider text-navy-600">
                Projects Delivered
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-navy">$2.5B+</div>
              <div className="text-sm uppercase tracking-wider text-navy-600">
                Value Created
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-navy">15 Years</div>
              <div className="text-sm uppercase tracking-wider text-navy-600">
                Industry Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              How We Help
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-navy-600">
              Our integrated approach combines strategic insight with operational excellence
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-navy/10 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle>Strategic Growth</CardTitle>
                <CardDescription>
                  Market analysis, expansion planning, and growth strategy development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="/services#growth"
                  className="inline-flex items-center text-sm font-medium text-navy hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-navy/10 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle>Operational Excellence</CardTitle>
                <CardDescription>
                  Process optimization, performance improvement, and efficiency gains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="/services#operations"
                  className="inline-flex items-center text-sm font-medium text-navy hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-navy/10 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Leadership Development</CardTitle>
                <CardDescription>
                  Executive coaching, team building, and organizational transformation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="/services#leadership"
                  className="inline-flex items-center text-sm font-medium text-navy hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/services">
                Explore All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-navy to-navy-700 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Organization?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Let&apos;s discuss how we can help you achieve your strategic goals.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
