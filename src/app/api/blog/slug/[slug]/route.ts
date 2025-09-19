import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { BlogPost } from '@/lib/models';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    const post = await BlogPost.findOne({ slug: slug, isPublished: true }); 
    if (!post) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}