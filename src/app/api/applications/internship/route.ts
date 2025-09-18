import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { InternshipApplication } from '@/lib/models';
import axios from 'axios'; // This line requires axios to be installed

export async function POST(request: Request) {
    console.log("SERVER IS USING SECRET KEY:", process.env.RECAPTCHA_SECRET_KEY);
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, university, fieldOfInterest, cvUrl, coverLetter, recaptchaToken, phone } = body;

    if (!recaptchaToken) {
        return NextResponse.json({ success: false, message: "reCAPTCHA token is missing." }, { status: 400 });
    }

    // 1. VERIFY reCAPTCHA TOKEN
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
    
    const recaptchaResponse = await axios.post(verificationUrl);
    const { success, score } = recaptchaResponse.data;

    if (!success || score < 0.5) {
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed. You might be a bot." }, { status: 400 });
    }

    // 2. SAVE TO DATABASE
    const newApplication = {
      name,
      email,
      phone,
      university,
      fieldOfInterest,
      cvUrl,
      coverLetter
    };

    await InternshipApplication.create(newApplication);

    return NextResponse.json({ success: true, message: "Application submitted successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}