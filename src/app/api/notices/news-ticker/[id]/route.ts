import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { NewsTicker } from '@/lib/models';

// GET a single item by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const item = await NewsTicker.findById(id);
    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific item
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const body = await request.json();
    const item = await NewsTicker.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific item
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const deletedItem = await NewsTicker.deleteOne({ _id: id });
    if (deletedItem.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}