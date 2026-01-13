import { TrendingUp, Award, Users, BarChart, Compass, Rocket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Services",
  description: "Comprehensive strategic advisory services for growth, operations, and leadership development.",
  url: "/services",
})

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-700 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Our Services
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Integrated solutions designed to accelerate growth, enhance performance,
              and build organizational capability.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {/* Strategic Growth */}
            <div id="growth" className="scroll-mt-24">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-navy text-white">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-navy">
                    Strategic Growth
                  </h2>
                  <p className="mb-6 text-lg text-navy-600">
                    Drive sustainable expansion through data-driven market insights
                    and strategic planning.
                  </p>
                </div>
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Compass className="h-5 w-5 text-navy" />
                        Market Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Comprehensive market research, competitive analysis, and
                      opportunity identification to inform strategic decisions.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-navy" />
                        Growth Strategy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Develop and execute strategies for market expansion, product
                      development, and revenue growth.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-navy" />
                        Performance Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Build measurement frameworks and dashboards to track
                      progress and optimize performance.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Operational Excellence */}
            <div id="operations" className="scroll-mt-24 border-t pt-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-navy text-white">
                    <Award className="h-8 w-8" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-navy">
                    Operational Excellence
                  </h2>
                  <p className="mb-6 text-lg text-navy-600">
                    Optimize processes, reduce costs, and improve efficiency across
                    your organization.
                  </p>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Process Optimization</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Streamline operations, eliminate waste, and enhance productivity
                      through lean methodologies and best practices.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Digital Transformation</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Leverage technology to modernize operations, improve customer
                      experience, and enable data-driven decision making.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Management</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Navigate organizational change with structured approaches
                      that ensure adoption and minimize disruption.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Leadership Development */}
            <div id="leadership" className="scroll-mt-24 border-t pt-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-navy text-white">
                    <Users className="h-8 w-8" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-navy">
                    Leadership Development
                  </h2>
                  <p className="mb-6 text-lg text-navy-600">
                    Build leadership capability and strengthen team effectiveness
                    at all levels of your organization.
                  </p>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Executive Coaching</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      One-on-one coaching for senior leaders focused on strategic
                      thinking, decision making, and leadership effectiveness.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Development</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Enhance team dynamics, collaboration, and performance through
                      structured development programs.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Organizational Design</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-navy-600">
                      Design structures, roles, and processes that enable your
                      strategy and support your culture.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-gradient-to-br from-navy-50 to-gold-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Custom Solutions
            </h2>
            <p className="mb-8 text-lg text-navy-600">
              Every organization is unique. We tailor our approach to your specific
              context, challenges, and objectives. Let&apos;s discuss how we can help.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
