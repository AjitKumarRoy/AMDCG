import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  // --- 1. Get the destination folder from the request ---
  const folder = formData.get('folder') as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  // Convert the file to a buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // --- 2. Construct the full folder path ---
  const fullFolderPath = folder ? `amdcg_uploads/${folder}` : 'amdcg_uploads';

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          // --- 3. Use the dynamic folder path ---
          folder: fullFolderPath,
          // resource_type: 'auto',  // This line tells Cloudinary to auto-detect and make it public
          access_mode: 'public',   // --- ADD THIS LINE TO FORCE PUBLIC ACCESS ---
        },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      ).end(buffer);
    });

    const result = uploadResult as { secure_url: string, width: number, height: number };
    return NextResponse.json({ success: true, url: result.secure_url, width: result.width, height: result.height, });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: 'File upload failed' }, { status: 500 });
  }
}