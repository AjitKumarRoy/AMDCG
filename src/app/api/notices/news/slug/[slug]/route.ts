import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { NewsArticle } from '@/lib/models';

// GET a single article by its SLUG
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    const article = await NewsArticle.findOne({ slug: slug });
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}