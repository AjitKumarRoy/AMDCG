import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Patent } from '@/lib/models';

// GET all patents
export async function GET() {
  try {
    await dbConnect();
    const patents = await Patent.find({}).sort({ year: -1 });
    return NextResponse.json({ success: true, data: patents });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// CREATE a new patent
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const patent = await Patent.create(body);
    return NextResponse.json({ success: true, data: patent }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A patent with this number already exists.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}