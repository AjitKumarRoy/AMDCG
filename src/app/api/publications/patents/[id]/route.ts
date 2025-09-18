import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Patent } from '@/lib/models';

// GET a single patent by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const patent = await Patent.findById(params.id);
    if (!patent) {
      return NextResponse.json({ success: false, message: "Patent not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: patent });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific patent
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const patent = await Patent.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!patent) {
      return NextResponse.json({ success: false, message: "Patent not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: patent });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific patent
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedPatent = await Patent.deleteOne({ _id: params.id });
    if (deletedPatent.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Patent not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}