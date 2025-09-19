import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Event } from '@/lib/models';

// GET a single event by its SLUG
export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { slug } = context.params;
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