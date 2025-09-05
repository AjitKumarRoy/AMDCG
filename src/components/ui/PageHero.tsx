import Image from 'next/image';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export const PageHero = ({ title, subtitle, backgroundImage }: PageHeroProps) => {
  return (
    <div className="relative h-64 md:h-80 w-full flex items-center justify-center text-white text-center">
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold font-display">{title}</h1>
        <p className="mt-4 text-lg md:text-xl text-slate-300 font-heading">{subtitle}</p>
      </div>
    </div>
  );
};