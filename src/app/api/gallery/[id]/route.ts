import { NextResponse  } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { GalleryImage } from '@/lib/models';


type PageProps = {
  params: Promise<{ id: string }>;
};


export async function GET(request: Request, { params }: PageProps) {
  const { id } = await params;
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