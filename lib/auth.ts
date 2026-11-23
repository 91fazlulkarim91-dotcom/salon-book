import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db('salonbookdb');

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL, 
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