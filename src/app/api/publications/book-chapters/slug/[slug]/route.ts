import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { BookChapter } from '@/lib/models';

export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { slug } = context.params;
  try {
    await dbConnect();
    const chapter = await BookChapter.findOne({ slug: slug }); 
    
    if (!chapter) {
      return NextResponse.json({ success: false, message: "Chapter not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chapter });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}