import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-redressed text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-8 font-lato text-muted-foreground">
          <p className="text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              When you use Fallen500, we may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Account Information:</strong> Email address, name, and profile picture when you create an account or sign in with Google.</li>
              <li><strong className="text-foreground">Payment Information:</strong> When you subscribe to our premium content, payment details are processed securely through Paystack. We do not store your full payment card details.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our site, including pages visited and features used.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process your subscription payments</li>
              <li>Send you important updates about your account</li>
              <li>Improve our website and user experience</li>
              <li>Respond to your inquiries and support requests</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Third-Party Services</h2>
            <p>We use the following third-party services to operate Fallen500:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Google OAuth:</strong> For secure authentication when you choose to sign in with Google.</li>
              <li><strong className="text-foreground">Paystack:</strong> For processing subscription payments securely.</li>
              <li><strong className="text-foreground">Lovable Cloud:</strong> For hosting our backend infrastructure and database.</li>
            </ul>
            <p>
              These services have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Cancel your subscription at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us or use the account management features in your profile.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and authentication state. These cookies are necessary for the website to function properly and cannot be disabled.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our website.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
