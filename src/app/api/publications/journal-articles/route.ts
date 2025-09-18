import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { JournalArticle } from '@/lib/models';

// GET all journal articles
export async function GET() {
  try {
    await dbConnect();
    const articles = await JournalArticle.find({}).sort({ year: -1 }); // Sort by newest first
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// CREATE a new journal article
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const article = await JournalArticle.create(body);
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error: any) {
    // This will now catch duplicate link errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A publication with this link already exists.' },
        { status: 409 } // 409 Conflict
      );
    }
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}