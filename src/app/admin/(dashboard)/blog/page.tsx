import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { BlogPost } from "@/lib/models";
import { BlogList } from "./components/BlogList";
import { BookText } from "lucide-react";

async function getBlogPosts() {
  await dbConnect();
  // Sort by published date, then creation date to keep drafts ordered
  const posts = await BlogPost.find({}).sort({ publishedAt: -1, _id: -1 });
  return JSON.parse(JSON.stringify(posts));
}

export default async function BlogAdminPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <Title as="h1" icon={BookText}>Manage Blog</Title>
      <p className="mt-2 text-slate-400">Create, edit, and manage your blog posts.</p>
      <BlogList posts={posts} />
    </div>
  );
}