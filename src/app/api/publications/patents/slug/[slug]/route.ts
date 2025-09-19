import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Patent } from '@/lib/models';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    const patent = await Patent.findOne({ slug: slug }); 
    
    if (!patent) {
      return NextResponse.json({ success: false, message: "Patent not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: patent });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}