import { NextResponse  } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { BookChapter } from '@/lib/models';


type PageProps = {
  params: Promise<{ id: string }>;
};

// GET a single chapter by ID
export async function GET(request: Request, { params }: PageProps) {
   const { id } = await params;
  try {
    await dbConnect();
    const chapter = await BookChapter.findById(id);
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
export async function PUT(request: Request, { params }: PageProps) {
   const { id } = await params;
  try {
    await dbConnect();
    const body = await request.json();
    const chapter = await BookChapter.findByIdAndUpdate(id, body, { new: true, runValidators: true });
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
export async function DELETE(request: Request, { params }: PageProps) {
   const { id } = await params;
  try {
    await dbConnect();
    const deletedChapter = await BookChapter.deleteOne({ _id: id });
    if (deletedChapter.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Chapter not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}