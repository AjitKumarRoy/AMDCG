"use client";

import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ImageSlider } from "@/components/ui/ImageSlider";  

 
const slides = [
  { src: "/images/aboutPage/group2.jpeg", alt: "Advanced materials lab" },
  { src: "/images/aboutPage/group3.jpeg", alt: "High-tech characterization equipment" },
  { src: "/images/aboutPage/group4.jpeg", alt: "The AMDCG research team" },
  { src: "/images/aboutPage/group7.jpeg", alt: "The AMDCG research team" },
];

export function MissionSection() {
  return (
    <Section>
      <div className="container mx-auto text-center">
        <Title as="h2">
          Our Mission
        </Title>
        <p className="mt-4 max-w-3xl mx-auto text-slate-400">
          Our purpose is to push the frontiers of knowledge and technology through innovative research and collaborative excellence.
        </p>
        <div className="mt-12 max-w-4xl mx-auto">
          <ImageSlider slides={slides} />
        </div>
      </div>
    </Section>
  );
}