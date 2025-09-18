import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Sidebar } from "./Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If there is no session (user is not logged in), redirect to the login page
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200 custom-scrollbar">
      <Sidebar />
      {/* --- UPDATED THIS LINE --- */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}