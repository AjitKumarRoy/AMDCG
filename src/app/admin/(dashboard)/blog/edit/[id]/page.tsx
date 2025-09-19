import type { PageProps } from 'next';
import { BlogForm } from "../../components/BlogForm";
import { BlogPost } from "@/lib/models";
import dbConnect from "@/lib/dbConnect";

async function getPost(id: string) {
  await dbConnect();
  const post = await BlogPost.findById(id);
  return JSON.parse(JSON.stringify(post));
}

export default async function EditBlogPostPage({ params }: PageProps<{ id: string }>) {
  const { id } = await params;        
  const post = await getPost(id);
 
  return <BlogForm post={post} />;
}