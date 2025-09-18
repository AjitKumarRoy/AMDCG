"use client";

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function GoogleCaptchaWrapper({ children }: { children: React.ReactNode }) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!reCaptchaKey) {
    console.error("reCAPTCHA site key not found");
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}