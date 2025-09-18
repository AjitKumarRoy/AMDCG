import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { PhdApplication } from '@/lib/models';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      name, email, phone, bachelorsDegree, mastersDegree, 
      qualifyingExam, statementOfPurposeUrl, cvUrl, recaptchaToken
    } = body;

    if (!recaptchaToken) {
      return NextResponse.json({ success: false, message: "reCAPTCHA token is missing." }, { status: 400 });
    }

    // 1. VERIFY reCAPTCHA TOKEN
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    // ... (reCAPTCHA verification logic is the same)
    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`);
    if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed." }, { status: 400 });
    }

    // 2. SAVE TO DATABASE
    const newApplication = {
      name, email, phone, bachelorsDegree, mastersDegree, 
      qualifyingExam, statementOfPurposeUrl, cvUrl
    };

    await PhdApplication.create(newApplication);

    return NextResponse.json({ success: true, message: "Application submitted successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}