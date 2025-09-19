import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import { User } from "@/lib/models"
import bcrypt from "bcryptjs"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials) return null;
        await dbConnect();
        
        const user = await User.findOne({ email: credentials.email });
        
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Return a simplified user object for the session
          return { id: user._id.toString(), name: user.name, email: user.email };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login', // Redirect users to this page for login
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };