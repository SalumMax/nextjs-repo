import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      client: {
        auth_method: "client_secret_basic", // Explicitly set the client authentication method
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectDB();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const username = profile.name.slice(0, 20);
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        console.log("Fetching user for session:", session.user.email);
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          console.log("User found:", user);
          session.user.id = user._id.toString();
        } else {
          console.log("No user found for email:", session.user.email);
        }
        return session;
      } catch (error) {
        console.error("Error during session:", error);
        return session;
      }
    },
  },
};