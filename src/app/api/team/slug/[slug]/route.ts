import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { TeamMember } from '@/lib/models';

// GET a single team member by their SLUG
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    // Use findOne to search by the slug field
    const member = await TeamMember.findOne({ slug: slug }); 
    
    if (!member) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}