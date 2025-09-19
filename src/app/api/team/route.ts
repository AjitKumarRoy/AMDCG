import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { TeamMember } from '@/lib/models';

// GET all team members
export async function GET() {
  try {
    await dbConnect();
    const members = await TeamMember.find({});
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// CREATE a new team member
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const member = await TeamMember.create(body);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
              console.error("Failed to create announcement:", error); // Log the full error
              
              // Type guard to check for MongoDB duplicate key error
              if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
                return NextResponse.json(
                  { success: false, error: 'A team member with this slug and email already exists.' },
                  { status: 409 } // 409 Conflict is a better status code for this
                );
              }
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}