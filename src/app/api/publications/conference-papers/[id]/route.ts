import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ConferencePaper } from '@/lib/models';

// GET a single paper by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const paper = await ConferencePaper.findById(params.id);
    if (!paper) {
      return NextResponse.json({ success: false, message: "Paper not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: paper });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific paper
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const paper = await ConferencePaper.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!paper) {
      return NextResponse.json({ success: false, message: "Paper not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: paper });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific paper
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedPaper = await ConferencePaper.deleteOne({ _id: params.id });
    if (deletedPaper.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Paper not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}