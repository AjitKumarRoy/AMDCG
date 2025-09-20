import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Event } from '@/lib/models';

type PageProps = {
  params: Promise<{ slug: string }>;
};


// GET a single event by its SLUG
export async function GET(request: Request, { params }: PageProps) {
  const { slug } = await params;
  try {
    await dbConnect();
    const event = await Event.findOne({ slug: slug });
    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}