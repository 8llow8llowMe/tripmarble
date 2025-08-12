import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath =
  process.env.NODE_ENV === "development"
    ? path.resolve(__dirname, "./env/.env-frontend-dev")
    : path.resolve(__dirname, "./env/.env-frontend-prod");

dotenv.config({ path: envPath, override: true });

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: Object.fromEntries(
    Object.keys(process.env)
      .filter((k) => k.startsWith("NEXT_PUBLIC_"))
      .map((k) => [k, process.env[k]])
  ),
  images: { domains: ["tong.visitkorea.or.kr", "k.kakaocdn.net"] },
};

export default nextConfig;
