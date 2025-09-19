import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Facility } from '@/lib/models';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    await dbConnect();
    const facility = await Facility.findById(id);
    if (!facility) {
      return NextResponse.json({ success: false, message: "Facility not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: facility });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}