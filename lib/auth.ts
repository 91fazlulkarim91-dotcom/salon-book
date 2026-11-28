import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI ?? "mongodb://localhost:27017/salonbook");
const db = client.db(process.env.MONGODB_DB ?? "salonbook");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    emailAndPassword: { 
      enabled: true,
      minPasswordLength: 6,
      maxPasswordLength: 128,
    },
    plugins: [
      admin({
        defaultRole: "user",
        adminRoles: ["admin"],
      }),
      jwt({
        jwt: {
          expirationTime: process.env.JWT_EXPIRES_IN ?? "15m",
          definePayload: ({ session }) => ({ sessionId: session.id }),
        },
      }),
    ],
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});