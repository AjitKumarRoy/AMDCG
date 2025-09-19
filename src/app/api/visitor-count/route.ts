import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { VisitorCount } from '@/lib/models';

const COUNTER_ID = 'total_visits';

// GET the current visitor count
export async function GET() {
  try {
    await dbConnect();
    const visitorCount = await VisitorCount.findOne({ identifier: COUNTER_ID });
    return NextResponse.json({ success: true, count: visitorCount?.count || 0 });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// POST to increment the visitor count
export async function POST() {
  try {
    await dbConnect();
    // Find the counter and increment it by 1. If it doesn't exist, create it.
    const updatedCount = await VisitorCount.findOneAndUpdate(
      { identifier: COUNTER_ID },
      { $inc: { count: 1 } },
      { upsert: true, new: true } // upsert creates it if it doesn't exist, new returns the updated doc
    );
    return NextResponse.json({ success: true, count: updatedCount.count });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}