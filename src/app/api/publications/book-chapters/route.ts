import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { BookChapter } from '@/lib/models';

// GET all book chapters
export async function GET() {
  try {
    await dbConnect();
    const chapters = await BookChapter.find({}).sort({ year: -1 });
    return NextResponse.json({ success: true, data: chapters });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// CREATE a new book chapter
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const chapter = await BookChapter.create(body);
    return NextResponse.json({ success: true, data: chapter }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A book chapter with this link already exists.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}