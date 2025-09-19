"use server";

import dbConnect from "@/lib/dbConnect";
import { BlogPost } from "@/lib/models";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function createBlogPost(formData: FormData) {
  try {
    await dbConnect();
    const isPublished = formData.get("isPublished") === 'on';
    const newPost = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      image: formData.get("image"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      author: formData.get("author"),
      tags: JSON.parse(formData.get("tags") as string || '[]'),
      isPublished: isPublished,
      publishedAt: isPublished ? new Date() : null,
    };
    await BlogPost.create(newPost);
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    // Check if the error is a MongoDB duplicate key error
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 11000) {
      throw new Error("A blog post with this slug already exists.");
    }
    throw new Error("Failed to create blog post.");
  }
//   redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  try {
    await dbConnect();
    
    // First, get the existing post to check its publish status
    const existingPost = await BlogPost.findById(id);
    if (!existingPost) {
      throw new Error("Blog post not found.");
    }

    const isNowPublished = formData.get("isPublished") === 'on';
    
    const updatedPostData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      image: formData.get("image"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      author: formData.get("author"),
      tags: JSON.parse(formData.get("tags") as string || '[]'),
      isPublished: isNowPublished,
      // Only set a new publishedAt date if it's being published for the first time
      publishedAt: existingPost.isPublished ? existingPost.publishedAt : (isNowPublished ? new Date() : null),
    };

    await BlogPost.findByIdAndUpdate(id, updatedPostData);
    
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    if (updatedPostData.slug) {
      revalidatePath(`/blog/${updatedPostData.slug}`);
    }
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 11000) {
      throw new Error("A blog post with this slug already exists.");
    }
    throw new Error("Failed to update blog post.");
  }
//   redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await dbConnect();
  await BlogPost.findByIdAndDelete(id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}