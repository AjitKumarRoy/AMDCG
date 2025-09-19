import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Announcement } from '@/lib/models';

// GET a single announcement by ID
export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific announcement
export async function PUT(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const body = await request.json();
    const announcement = await Announcement.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!announcement) {
      return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: announcement });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific announcement
export async function DELETE(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const deletedAnnouncement = await Announcement.deleteOne({ _id: id });
    if (deletedAnnouncement.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}