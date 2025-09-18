"use client";

import Image from 'next/image';
import Link from 'next/link';
import { type BlogPost as IBlogPost } from '@/types';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type PostWithId = IBlogPost & { _id: string; };

const placeholderImage = '/images/placeholder-blog.jpg';

export function BlogPostCard({ post }: { post: PostWithId }) {
  const imageUrl = post.image || placeholderImage;

  return (
    <Link 
      href={`/blog/${post.slug}`}
      target="_blank"
      className=" h-full w-full rounded-2xl border border-slate-800 bg-black/20 overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1 flex flex-col group"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={post.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-grow flex flex-col p-6">
        <div className="flex-grow">
          {post.tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 rounded-full text-xs font-semibold bg-sky-800/50 text-sky-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-lg font-bold text-white font-heading line-clamp-2">{post.title}</h3>
          <p className="mt-2 text-sm text-slate-400 line-clamp-3">{post.excerpt}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-sm text-slate-400">
          <span>{post.publishedAt ? format(new Date(post.publishedAt), 'PPP') : 'Not Published'}</span>
          <Button variant="secondary" className="text-xs py-1 px-2 ">
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}