import { Section } from "@/components/ui/Section";
import { FAQSection } from "./FAQSection";
import { CTASection } from "./CTASection";

export function FaqAndCTA() {
  return (
    <Section>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* FAQ Section takes up 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
          <FAQSection />
        </div>
        
        {/* CTA Section takes up 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <CTASection />
        </div>
      </div>
    </Section>
  );
}