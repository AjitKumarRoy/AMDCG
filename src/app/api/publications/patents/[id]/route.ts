import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Patent } from '@/lib/models';

// GET a single patent by ID
export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const patent = await Patent.findById(id);
    if (!patent) {
      return NextResponse.json({ success: false, message: "Patent not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: patent });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific patent
export async function PUT(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const body = await request.json();
    const patent = await Patent.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!patent) {
      return NextResponse.json({ success: false, message: "Patent not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: patent });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific patent
export async function DELETE(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { id } = context.params;
  try {
    await dbConnect();
    const deletedPatent = await Patent.deleteOne({ _id: id });
    if (deletedPatent.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Patent not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}