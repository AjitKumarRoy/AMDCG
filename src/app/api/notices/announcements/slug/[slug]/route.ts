import { NextResponse  } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Announcement } from '@/lib/models';

type PageProps = {
  params: Promise<{ slug: string }>;
};


export async function GET(request: Request, { params }: PageProps) {
  const { slug } = await params;
  try {
    await dbConnect();
    const announcement = await Announcement.findOne({ slug: slug }); 
    
    if (!announcement) {
      return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}