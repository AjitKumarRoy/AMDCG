import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { TeamMember } from '@/lib/models';


// --- GET a single team member by ID ---
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const member = await TeamMember.findById(params.id);
    if (!member) {
      return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}


// UPDATE a specific team member
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const member = await TeamMember.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific team member
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedMember = await TeamMember.deleteOne({ _id: params.id });
    if (deletedMember.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}