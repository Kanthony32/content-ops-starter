import { CheckCircle, Target, Users, Lightbulb } from "lucide-react"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "About Us",
  description: "Learn about The Westview Group's mission, values, and approach to strategic advisory.",
  url: "/about",
})

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-700 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              About The Westview Group
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Founded on the belief that strategy and execution are inseparable,
              we help organizations bridge the gap between vision and reality.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Our Mission
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-navy-600">
              To empower leaders with the insights, tools, and support they need
              to build resilient, high-performing organizations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy">Strategic Focus</h3>
              <p className="text-navy-600">
                We align every initiative with your long-term objectives
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy">Collaborative Approach</h3>
              <p className="text-navy-600">
                We work alongside your team, not apart from them
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy">Results Driven</h3>
              <p className="text-navy-600">
                We measure success by tangible outcomes and impact
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-navy">Innovative Thinking</h3>
              <p className="text-navy-600">
                We challenge assumptions and find creative solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-t bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-navy md:text-4xl">
              Our Story
            </h2>
            <div className="prose prose-lg prose-navy">
              <p>
                The Westview Group was founded in 2009 with a simple observation:
                many organizations struggled not from lack of strategy, but from
                the inability to execute it effectively.
              </p>
              <p>
                Over the past 15 years, we&apos;ve worked with more than 200 organizations
                across industries, from Fortune 500 companies to high-growth startups.
                Our experience has taught us that sustainable transformation requires
                more than frameworks and methodologies—it requires partnership.
              </p>
              <p>
                Today, we bring together deep industry expertise, proven methodologies,
                and a genuine commitment to our clients&apos; success. We don&apos;t just
                advise; we roll up our sleeves and work alongside your team to make
                change happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Note */}
      <section className="bg-gradient-to-br from-navy-50 to-gold-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Our Team
            </h2>
            <p className="mb-8 text-lg text-navy-600">
              Our partners and advisors bring decades of combined experience across
              strategy, operations, technology, and organizational development. Each
              brings a unique perspective shaped by leadership roles in top-tier
              consulting firms, Fortune 500 companies, and successful startups.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
