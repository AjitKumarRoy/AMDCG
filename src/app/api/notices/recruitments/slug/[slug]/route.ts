import { NextResponse, type RouteHandlerContext } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Recruitment } from '@/lib/models';

// GET a single posting by its SLUG
export async function GET(request: Request, context: RouteHandlerContext<{ slug: string }>) {
  const { slug } = context.params;
  try {
    await dbConnect();
    const posting = await Recruitment.findOne({ slug: slug });
    if (!posting) {
      return NextResponse.json({ success: false, message: "Posting not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: posting });
  } catch (error) {
    console.error("Error status:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 400 });
  }
}