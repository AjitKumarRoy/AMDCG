import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Recruitment } from '@/lib/models';

// GET all recruitment postings
export async function GET() {
  try {
    await dbConnect();
    const postings = await Recruitment.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: postings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// CREATE a new recruitment posting
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const posting = await Recruitment.create(body);
    return NextResponse.json({ success: true, data: posting }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A recruitment posting with this slug already exists.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}