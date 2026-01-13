import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Terms of Service",
  description: "Terms of Service for The Westview Group",
  url: "/terms",
})

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-navy-700 py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="mt-4 text-white/80">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-navy mx-auto max-w-3xl lg:prose-lg">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using The Westview Group&apos;s website and services, you agree
              to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2>Use of Services</h2>
            <p>
              Our services are provided for business and professional purposes. You agree to
              use our services only for lawful purposes and in accordance with these Terms.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The content, features, and functionality of our website and services are owned
              by The Westview Group and are protected by international copyright, trademark,
              and other intellectual property laws.
            </p>

            <h2>Service Engagement</h2>
            <p>
              Specific terms for consulting and advisory services will be outlined in
              separate engagement agreements. These Terms of Service govern the use of our
              website and general interaction with our company.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall The Westview Group be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or relating to your
              use of our website or services.
            </p>

            <h2>Disclaimer</h2>
            <p>
              The information provided on our website is for general informational purposes
              only. While we strive to keep the information up to date and correct, we make
              no representations or warranties of any kind about the completeness, accuracy,
              or reliability of the information.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users
              of any material changes by posting the new Terms on this page.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws
              of the State of New York, without regard to its conflict of law provisions.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              legal@westviewgroup.com.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
