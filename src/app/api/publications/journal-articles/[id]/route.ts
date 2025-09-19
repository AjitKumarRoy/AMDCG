import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { JournalArticle } from '@/lib/models';


// GET a single article by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const article = await JournalArticle.findById(params.id);
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// UPDATE a specific article
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const article = await JournalArticle.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}

// DELETE a specific article
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedArticle = await JournalArticle.deleteOne({ _id: params.id });
    if (deletedArticle.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}