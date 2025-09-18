import Image from 'next/image';
import { Button } from './Button'; 
import { type NewsArticle as INewsArticle } from '@/types';

type ArticleWithId = INewsArticle & { _id: string };

// // Define the shape of the news item data
// interface NewsItem {
//   id: string;
//   title: string;
//   date: string;
//   link: string;
//   image: string;
//   excerpt: string;
// }

interface NewsCardProps {
  newsItem: ArticleWithId;
}

const placeholderImage = '/images/Notices/news/placeholder_news_home.png';

export const NewsCard = ({ newsItem }: NewsCardProps) => {

  const imageUrl = newsItem.image || placeholderImage;


  return (
    // className="bg-black/20 shadow-2xl backdrop-blur-md"
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] transition-all duration-300 hover:border-amber-500/50 flex flex-col group">
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
        <Image src={imageUrl} alt={newsItem.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="flex-grow">
        <p className="mb-2 text-sm text-amber-500 font-heading">{new Date(newsItem.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <h3 className="mb-2 text-lg font-bold text-white font-heading">{newsItem.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-2">{newsItem.excerpt}</p>
      </div>
      <div className="mt-4">
        <Button href={`/news-events/${newsItem.slug}`} variant="secondary" className="inline-flex" target='_blank'>
          Read More
        </Button>
      </div>
    </div>
  );
};