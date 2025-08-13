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
  // ▶ SSR standalone build
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname), // 트레이싱 기준 루트 명시
  },
  // NEXT_PUBLIC_*만 런타임 주입
  env: Object.fromEntries(
    Object.keys(process.env)
      .filter((k) => k.startsWith("NEXT_PUBLIC_"))
      .map((k) => [k, process.env[k]])
  ),

  // next/image domains 설정 (SSR이므로 unoptimized 제거)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tong.visitkorea.or.kr" },
      { protocol: "https", hostname: "k.kakaocdn.net" },
    ],
  },

  // (옵션) 정적 호스팅 환경에서 404를 줄이기 위한 슬래시 강제. 필요 없으면 제거하세요.
  // trailingSlash: true,
};

export default nextConfig;
