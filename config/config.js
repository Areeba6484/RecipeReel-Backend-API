// config.js
import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  host: process.env.HOST || "localhost",
  dbUri: process.env.MONGODB_URI,
  webAppUrl: process.env.WEBAPP_URL,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },

  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
    fromName: process.env.EMAIL_FROM_NAME,
  },
};

export default config;
