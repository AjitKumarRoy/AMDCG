import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Recruitment } from '@/lib/models';

// GET a single posting by ID
export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const posting = await Recruitment.findById(id);
    if (!posting) {
      return NextResponse.json({ success: false, message: "Posting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: posting });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific posting
export async function PUT(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const body = await request.json();
    const posting = await Recruitment.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!posting) {
      return NextResponse.json({ success: false, message: "Posting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: posting });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific posting
export async function DELETE(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const deletedPosting = await Recruitment.deleteOne({ _id: id });
    if (deletedPosting.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Posting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}