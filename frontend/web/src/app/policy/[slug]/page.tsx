import { Metadata } from "next";
import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";
import styles from "./PolicyDetail.module.scss";
import { marked } from "marked";

type Params = { slug: string };

const LEGALS = {
  terms: { title: "이용약관", file: "service_terms.md" },
  privacy: { title: "개인정보 처리방침", file: "privacy_policy.md" },
  youth: { title: "청소년 보호정책", file: "youth-protection-policy.md" },
} as const;

export async function generateStaticParams() {
  return Object.keys(LEGALS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const metaTitle = LEGALS[params.slug as keyof typeof LEGALS]?.title || "정책";
  return { title: `${metaTitle} - TripMarble` };
}

async function getMarkdown(slug: string) {
  const info = LEGALS[slug as keyof typeof LEGALS];
  if (!info) return { title: "정책", md: "요청하신 문서를 찾을 수 없습니다." };

  const publicDir = path.join(process.cwd(), "public", "legals");
  const filePath = path.join(publicDir, info.file);
  try {
    const md = await fs.readFile(filePath, "utf-8");
    return { title: info.title, md };
  } catch (e) {
    return { title: info.title, md: "문서를 불러오지 못했습니다." };
  }
}

export default async function PolicyDetailPage({ params }: { params: Params }) {
  const { title, md } = await getMarkdown(params.slug);
  const html = marked.parse(md || "");

  return (
    <main className={styles.container}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          {Object.entries(LEGALS).map(([slug, it]) => (
            <Link
              key={slug}
              href={`/policy/${slug}`}
              className={
                params.slug === slug
                  ? `${styles.sideLink} ${styles.sideLinkActive}`
                  : styles.sideLink
              }
            >
              {it.title}
            </Link>
          ))}
        </aside>

        <article className={styles.article}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            시행일자: 문서 하단의 최신 변경일을 확인하세요.
          </div>
          <div
            className={styles.md}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </main>
  );
}
