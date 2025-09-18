import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Project } from '@/lib/models';

// GET a single project by its SLUG
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    await dbConnect();
    // Use findOne to search by a specific field
    const project = await Project.findOne({ slug: slug }); 
    
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}