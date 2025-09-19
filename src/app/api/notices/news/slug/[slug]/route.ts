import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { NewsArticle } from '@/lib/models';

// GET a single article by its SLUG
export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { slug } = context.params;
  try {
    await dbConnect();
    const article = await NewsArticle.findOne({ slug: slug });
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}