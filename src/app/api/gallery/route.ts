import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { GalleryImage } from '@/lib/models';

export async function GET() {
  try {
    await dbConnect();
    const images = await GalleryImage.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}