import dotenv from "dotenv";

const envPath =
  process.env.NODE_ENV === "development"
    ? "./env/.env-frontend-dev"
    : "./env/.env-frontend-prod";

dotenv.config({ path: envPath });

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: Object.keys(process.env)
    .filter((key) => key.startsWith("NEXT_PUBLIC_"))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {}),
};

export default nextConfig;
