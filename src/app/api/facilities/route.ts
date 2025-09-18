import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Facility } from '@/lib/models';


// get all facilities
export async function GET() {
  try {
    await dbConnect();
    const facilities = await Facility.find({});
    return NextResponse.json({ success: true, data: facilities });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}