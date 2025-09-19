import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { BookChapter } from '@/lib/models';

// GET a single chapter by ID
export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  try {
    await dbConnect();
    const chapter = await BookChapter.findById(context.params);
    if (!chapter) {
      return NextResponse.json({ success: false, message: "Chapter not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chapter });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific chapter
export async function PUT(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  try {
    await dbConnect();
    const body = await request.json();
    const chapter = await BookChapter.findByIdAndUpdate(context.params, body, { new: true, runValidators: true });
    if (!chapter) {
      return NextResponse.json({ success: false, message: "Chapter not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chapter });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific chapter
export async function DELETE(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  try {
    await dbConnect();
    const deletedChapter = await BookChapter.deleteOne({ _id: context.params });
    if (deletedChapter.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Chapter not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}