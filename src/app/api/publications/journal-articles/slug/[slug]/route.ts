import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { JournalArticle } from '@/lib/models';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    const article = await JournalArticle.findOne({ slug: slug }); 
    
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}