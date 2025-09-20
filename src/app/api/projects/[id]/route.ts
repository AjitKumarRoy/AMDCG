import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Project } from '@/lib/models';

type PageProps = {
  params: Promise<{ id: string }>;
};

// GET a single project by ID
export async function GET(request: Request,{ params }: PageProps) {
  const { id } = await params;
  try {
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific project
export async function PUT(request: Request,{ params }: PageProps) {
  const { id } = await params;
  try {
    await dbConnect();
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific project
export async function DELETE(request: Request,{ params }: PageProps) {
  const { id } = await params;
  try {
    await dbConnect();
    const deletedProject = await Project.deleteOne({ _id: id });
    if (deletedProject.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}