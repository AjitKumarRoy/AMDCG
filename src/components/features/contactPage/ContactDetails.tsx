"use client";
import { Mail, Phone, MapPin, PhoneCall } from 'lucide-react';
import { Title } from "@/components/ui/Title";
import footerData from '@/components/layout/footer/footer.json';

const contactInfo = {
  email: footerData.contact.email,
  phone: footerData.contact.phone,
  address: "Room No. 414, ED-2 Building, IIT Bhilai, Chhattisgarh, India - 491001"
};

export function ContactDetails() {
  return (
    <div className="space-y-6">
      <Title 
        as="h2" 
        icon={PhoneCall}
      >
        Contact Information
      </Title>
      <p className="text-slate-400">
        We're here to help and answer any question you might have. We look forward to hearing from you.
      </p>
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 text-slate-300 hover:text-amber-400">
          <Mail className="h-5 w-5 flex-shrink-0 text-amber-500" />
          <span>{contactInfo.email}</span>
        </a>
        <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 text-slate-300 hover:text-amber-400">
          <Phone className="h-5 w-5 flex-shrink-0 text-amber-500" />
          <span>{contactInfo.phone}</span>
        </a>
        <div className="flex items-start gap-4 text-slate-300">
          <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-amber-500" />
          <address className="not-italic">{contactInfo.address}</address>
        </div>
      </div>
    </div>
  );
}