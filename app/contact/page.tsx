"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-700 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Get in Touch
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Ready to start a conversation? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-navy">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-navy">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-navy">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john@company.com" required />
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-navy">
                    Company
                  </label>
                  <Input id="company" placeholder="Your Company" />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project or challenge..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-navy">Contact Information</h2>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">
                          <Mail className="h-5 w-5" />
                        </div>
                        Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a
                        href="mailto:hello@westviewgroup.com"
                        className="text-navy hover:underline"
                      >
                        hello@westviewgroup.com
                      </a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">
                          <Phone className="h-5 w-5" />
                        </div>
                        Phone
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a href="tel:+15551234567" className="text-navy hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">
                          <MapPin className="h-5 w-5" />
                        </div>
                        Office
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <address className="not-italic text-navy">
                        123 Executive Drive
                        <br />
                        Suite 400
                        <br />
                        New York, NY 10001
                      </address>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-navy-50 to-gold-50 p-8">
                <h3 className="mb-4 text-xl font-bold text-navy">
                  Business Inquiries
                </h3>
                <p className="mb-4 text-navy-600">
                  For partnership opportunities, media inquiries, or general questions,
                  please reach out to our team directly.
                </p>
                <p className="text-sm text-navy-600">
                  Response time: We typically respond within 24 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
