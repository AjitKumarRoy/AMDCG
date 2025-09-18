import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Zap, Handshake, TestTube2 } from 'lucide-react';

const values = [
  { icon: Zap, title: "Innovation", description: "Pioneering new materials and technologies." },
  { icon: Handshake, title: "Collaboration", description: "Partnering with industry and academia." },
  { icon: TestTube2, title: "Excellence", description: "Committing to the highest standards of research." },
];

export function CoreValuesSection() {
  return (
    <Section>
      <div className="container mx-auto text-center">
        <Title as="h2">Our Core Values</Title>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(value => (
            <div key={value.title} className="p-6 rounded-lg border border-white/10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
              <value.icon className="h-10 w-10 text-amber-400 mx-auto" />
              <h3 className="mt-4 text-lg font-bold text-white">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}