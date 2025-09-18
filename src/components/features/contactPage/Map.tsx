"use client";
import { Title } from "@/components/ui/Title";
import { MapPin } from "lucide-react";
import footerData from '@/components/layout/footer/footer.json';

export function Map() {
  return (
    <div>
      <Title as="h2" icon={MapPin}>
        Our Location
      </Title>
      <div className="w-full h-96 md:h-180 rounded-2xl overflow-hidden border-2 border-slate-800 mt-8">
        <iframe
          src={footerData.googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale transition-all duration-500 hover:grayscale-0"
        ></iframe>
      </div>
    </div>
  );
}