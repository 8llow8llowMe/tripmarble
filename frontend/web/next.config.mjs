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

  // next/image domains 설정
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "tong.visitkorea.or.kr", pathname: "/**" },
      { protocol: "https", hostname: "tong.visitkorea.or.kr", pathname: "/**" },
      { protocol: "http", hostname: "k.kakaocdn.net", pathname: "/**" },
      { protocol: "https", hostname: "k.kakaocdn.net", pathname: "/**" },
      { protocol: "https", hostname: "tripmarble-dev.store", pathname: "/**" },
      {
        protocol: "http",
        hostname: "tripmarble-dev.store",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.minio.8llow8llowme.com",
        pathname: "/**",
      },
    ],
  },

  // (옵션) 정적 호스팅 환경에서 404를 줄이기 위한 슬래시 강제. 필요 없으면 제거하세요.
  // trailingSlash: true,
};
// CI에서 무조건 SSR 사용을 강제 (Jenkins에서 NEXT_FORCE_SSR=1 설정)
if (process.env.NEXT_FORCE_SSR === "1") {
  nextConfig.output = "standalone";
}

// CI 환경에서 export가 켜져 있으면 바로 실패시켜 재발 방지
if (process.env.CI && nextConfig.output === "export") {
  throw new Error(
    "CI에서 export 모드는 금지입니다. SSR(standalone)로만 빌드하세요."
  );
}
export default nextConfig;
