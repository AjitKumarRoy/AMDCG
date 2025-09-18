import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ContactMessage } from '@/lib/models';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    // 1. Verify reCAPTCHA TOKEN
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
    const recaptchaResponse = await axios.post(verificationUrl);
    
    if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed." }, { status: 400 });
    }

    // 2. SAVE TO DATABASE
    await ContactMessage.create({ name, email, subject, message });

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}