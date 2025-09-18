"use client";
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ContactDetails } from './ContactDetails';
import { ContactForm } from './ContactForm';
import { Map } from './Map';
import { Faq } from './Faq';

const pageBanner = '/images/pagesBanner/banner6.png';

export function ContactPageClient() {
  return (
    <div>
      <PageHero 
        title="Contact Us"
        backgroundImage={pageBanner}
      />
      <Section>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <ContactDetails />
            <ContactForm />
          </div>
          <Map />
        </div>
      </Section>
      <Faq />
    </div>
  );
}