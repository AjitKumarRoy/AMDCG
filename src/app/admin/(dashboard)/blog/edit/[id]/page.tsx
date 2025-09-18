import { BlogForm } from "../../components/BlogForm";
import { BlogPost } from "@/lib/models";
import dbConnect from "@/lib/dbConnect";

async function getPost(id: string) {
  await dbConnect();
  const post = await BlogPost.findById(id);
  return JSON.parse(JSON.stringify(post));
}

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return <BlogForm post={post} />;
}