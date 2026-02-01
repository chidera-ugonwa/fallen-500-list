import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
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

        <h1 className="text-4xl font-redressed text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-8 font-lato text-muted-foreground">
          <p className="text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Fallen500 ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
            <p>
              Fallen500 is an educational platform that tracks and documents the stories of individuals who were once billionaires but have experienced significant financial decline. Our content is compiled for educational and historical purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Content Disclaimer</h2>
            <p>
              <strong className="text-foreground">Important:</strong> All financial figures, net worth estimates, and related data presented on Fallen500 are estimates based on publicly available information. These figures:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>May not reflect current exact values</li>
              <li>Are compiled from verified news sources and public records</li>
              <li>Should not be used as financial advice or for investment decisions</li>
              <li>Are subject to change without notice</li>
            </ul>
            <p>
              We make no guarantees about the accuracy, completeness, or timeliness of any information on this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. User Accounts</h2>
            <p>When you create an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Subscription Terms</h2>
            <p>For subscribers to our premium content:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Billing:</strong> Subscriptions are billed on a recurring basis according to your chosen plan.</li>
              <li><strong className="text-foreground">Cancellation:</strong> You may cancel your subscription at any time through your profile settings. Access continues until the end of your current billing period.</li>
              <li><strong className="text-foreground">Refunds:</strong> Refund requests are handled on a case-by-case basis. Contact us for assistance.</li>
              <li><strong className="text-foreground">Price Changes:</strong> We reserve the right to modify subscription prices with reasonable notice.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Reproduce, duplicate, or resell any part of the Service without permission</li>
              <li>Use automated systems to access the Service in a manner that exceeds reasonable use</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
            <p>
              All content on Fallen500, including text, graphics, logos, and software, is the property of Fallen500 or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Fallen500 shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
            </p>
            <p>
              We are not responsible for any decisions you make based on information presented on our platform. The content is for educational purposes only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at any time for violations of these Terms of Service or for any other reason at our discretion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or website notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us through our website.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
