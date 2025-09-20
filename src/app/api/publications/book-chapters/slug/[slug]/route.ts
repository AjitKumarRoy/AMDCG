import { NextResponse  } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { BookChapter } from '@/lib/models';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: PageProps) {
  const { slug } = await params;
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