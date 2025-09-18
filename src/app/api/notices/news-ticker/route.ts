import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { NewsTicker } from '@/lib/models';

// GET all ticker items
export async function GET() {
  try {
    await dbConnect();
    const items = await NewsTicker.find({});
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// CREATE a new ticker item
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const item = await NewsTicker.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}