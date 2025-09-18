import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { BlogPost } from '@/lib/models';

export async function GET() {
  try {
    await dbConnect();
    // Only fetch posts that are marked as published
    const posts = await BlogPost.find({ isPublished: true }).sort({ publishedAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}