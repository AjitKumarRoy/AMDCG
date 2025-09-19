import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { NewsArticle } from '@/lib/models';

// GET all news articles
export async function GET() {
  try {
    await dbConnect();
    const articles = await NewsArticle.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// CREATE a new news article
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const article = await NewsArticle.create(body);
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    console.error("Failed to create announcement:", error); // Log the full error
    
    // Type guard to check for MongoDB duplicate key error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A news article with this slug already exists.' },
        { status: 409 } // 409 Conflict is a better status code for this
      );
    }
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}