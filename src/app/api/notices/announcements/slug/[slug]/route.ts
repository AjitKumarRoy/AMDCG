import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Announcement } from '@/lib/models';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    const announcement = await Announcement.findOne({ slug: slug }); 
    
    if (!announcement) {
      return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}