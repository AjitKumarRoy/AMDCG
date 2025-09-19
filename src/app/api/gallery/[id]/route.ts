import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { GalleryImage } from '@/lib/models';

export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const image = await GalleryImage.findById(id);
    if (!image) {
      return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}