import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Privacy Policy",
  description: "Privacy Policy for The Westview Group",
  url: "/privacy",
})

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-navy-700 py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-4 text-white/80">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-navy mx-auto max-w-3xl lg:prose-lg">
            <h2>Introduction</h2>
            <p>
              At The Westview Group, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when
              you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Company name and position</li>
              <li>Email address and phone number</li>
              <li>Information you provide when contacting us or requesting services</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you information about our services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to
              third parties without your consent, except as described in this policy or
              as required by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect
              the security of your personal information. However, no method of
              transmission over the Internet is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at
              privacy@westviewgroup.com.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
