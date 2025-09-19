import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ConferencePaper } from '@/lib/models';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    const paper = await ConferencePaper.findOne({ slug: slug }); 
    
    if (!paper) {
      return NextResponse.json({ success: false, message: "Paper not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: paper });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}