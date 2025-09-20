"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/Button";
import { Loader } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error status.", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-slate-800 bg-black/20 backdrop-blur-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center font-display">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-slate-300 mb-2 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 rounded-md border-slate-700 text-white p-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-300 mb-2 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800/50 rounded-md border-slate-700 text-white p-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full inline-flex justify-center" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-slate-400 hover:text-amber-400 hover:underline">
            &larr; Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}