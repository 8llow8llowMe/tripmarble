/**
 * README 아키텍처 다이어그램 생성기.
 *
 *   cd docs/diagrams && npm install && npm run build
 *
 * docs/images/{architecture,infrastructure}.png 를 2배 해상도로 다시 만든다.
 * 애플리케이션과 무관한 문서 전용 도구라 의존성을 이 디렉터리에 격리한다.
 */
import * as si from 'simple-icons';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../images');
fs.mkdirSync(OUT, { recursive: true });

const FONT = 'Segoe UI, Malgun Gothic, sans-serif';
const C = {
  bg: '#FFFFFF',
  panel: '#F1F5F9',
  panelBorder: '#CBD5E1',
  panelTitle: '#475569',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  title: '#0F172A',
  sub: '#64748B',
  arrow: '#94A3B8',
  arrowText: '#475569',
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// simple-icons 에 없는 개념(공공 API, 메일, 보드게임)은 24x24 좌표계 도형으로 직접 그린다.
const CUSTOM = {
  tour: (c) =>
    `<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.7 0 3.2 2.9 3.7 7H8.3C8.8 6.9 10.3 4 12 4zM6.3 11H4.1a8 8 0 0 1 3.3-5.3A16 16 0 0 0 6.3 11zm0 2c.1 2 .5 3.9 1.1 5.3A8 8 0 0 1 4.1 13h2.2zm2 0h7.4c-.5 4.1-2 7-3.7 7s-3.2-2.9-3.7-7zm9.4 0h2.2a8 8 0 0 1-3.3 5.3c.6-1.4 1-3.3 1.1-5.3zm0-2c-.1-2-.5-3.9-1.1-5.3A8 8 0 0 1 19.9 11h-2.2z" fill="${c}"/>`,
  mail: (c) =>
    `<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.9 2L12 12.6 19.1 7H4.9zM4 9.4V17h16V9.4l-8 6.3-8-6.3z" fill="${c}"/>`,
  pin: (c) =>
    `<path d="M12 2a7.5 7.5 0 0 1 7.5 7.5c0 5.2-6.1 11.4-6.4 11.7a1.6 1.6 0 0 1-2.2 0C10.6 20.9 4.5 14.7 4.5 9.5A7.5 7.5 0 0 1 12 2zm0 4.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6z" fill="${c}"/>`,
  board: (c) =>
    `<rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="${c}"/>
     <circle cx="8" cy="8" r="1.8" fill="#FFFFFF"/>
     <circle cx="16" cy="8" r="1.8" fill="#FFFFFF"/>
     <circle cx="12" cy="12" r="1.8" fill="#FFFFFF"/>
     <circle cx="8" cy="16" r="1.8" fill="#FFFFFF"/>
     <circle cx="16" cy="16" r="1.8" fill="#FFFFFF"/>`,
};

function icon(name, x, y, size, override) {
  const s = size / 24;
  const open = `<g transform="translate(${x},${y}) scale(${s})">`;
  if (CUSTOM[name]) return `${open}${CUSTOM[name](override || '#475569')}</g>`;
  const ic = si['si' + name];
  if (!ic) {
    console.warn(`icon not found: ${name}`);
    return `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" fill="#CBD5E1"/>`;
  }
  return `${open}<path d="${ic.path}" fill="${override || '#' + ic.hex}"/></g>`;
}

function panel({ x, y, w, h, title, accent = C.panelBorder, fill = C.panel }) {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${fill}" stroke="${accent}" stroke-width="1.5"/>
  ${title ? `<text x="${x + 22}" y="${y + 30}" font-family="${FONT}" font-size="15" font-weight="700" fill="${C.panelTitle}" letter-spacing="0.4">${esc(title)}</text>` : ''}`;
}

function card({ x, y, w, h, ic, icColor, title, sub, badge }) {
  const iconSize = 28;
  const iy = y + (h - iconSize) / 2;
  const tx = x + 20 + iconSize + 16;
  const hasSub = Boolean(sub);
  const ty = hasSub ? y + h / 2 - 2 : y + h / 2 + 6;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.card}" stroke="${C.cardBorder}" stroke-width="1.5"/>
  ${icon(ic, x + 20, iy, iconSize, icColor)}
  <text x="${tx}" y="${ty}" font-family="${FONT}" font-size="15" font-weight="700" fill="${C.title}">${esc(title)}</text>
  ${hasSub ? `<text x="${tx}" y="${ty + 19}" font-family="${FONT}" font-size="12" fill="${C.sub}">${esc(sub)}</text>` : ''}
  ${badge ? pill(x + w - 14 - textW(badge, 11) - 20, y + 12, badge) : ''}`;
}

function textW(s, size) {
  let w = 0;
  for (const ch of String(s)) w += /[가-힣]/.test(ch) ? size : size * 0.55;
  return w;
}

function pill(x, y, label, color = '#EFF6FF', textColor = '#1D4ED8') {
  const w = textW(label, 11) + 20;
  return `<rect x="${x}" y="${y}" width="${w}" height="21" rx="10.5" fill="${color}"/>
  <text x="${x + w / 2}" y="${y + 15}" text-anchor="middle" font-family="${FONT}" font-size="11" font-weight="600" fill="${textColor}">${esc(label)}</text>`;
}

function arrow(x1, y1, x2, y2, { dashed = false, label, labelSide = 'right' } = {}) {
  const d = dashed ? ' stroke-dasharray="6 5"' : '';
  let lbl = '';
  if (label) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const w = textW(label, 12) + 16;
    const lx = labelSide === 'right' ? mx + 10 : mx - w - 10;
    lbl = `<rect x="${lx}" y="${my - 11}" width="${w}" height="22" rx="6" fill="#FFFFFF" opacity="0.95"/>
    <text x="${lx + w / 2}" y="${my + 4}" text-anchor="middle" font-family="${FONT}" font-size="12" fill="${C.arrowText}">${esc(label)}</text>`;
  }
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.arrow}" stroke-width="2.2"${d} marker-end="url(#ah)"/>${lbl}`;
}

function note(x, y, w, lines) {
  let s = panel({ x, y, w, h: 42 + lines.length * 24, title: null, accent: C.panelBorder });
  lines.forEach((n, i) => {
    s += `<circle cx="${x + 29}" cy="${y + 31 + i * 24}" r="3" fill="${C.arrow}"/>
    <text x="${x + 42}" y="${y + 35 + i * 24}" font-family="${FONT}" font-size="12.5" fill="#334155">${esc(n)}</text>`;
  });
  return s;
}

const DEFS = `<defs>
  <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.arrow}"/>
  </marker>
</defs>`;

function svgDoc(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${DEFS}
  <rect width="${w}" height="${h}" fill="${C.bg}"/>
  ${body}
</svg>`;
}

function heading(x, y, main, sub) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="24" font-weight="700" fill="${C.title}">${esc(main)}</text>
  <text x="${x}" y="${y + 24}" font-family="${FONT}" font-size="13" fill="${C.sub}">${esc(sub)}</text>`;
}

const W = 1240;
const PX = 30;
const PW = W - PX * 2;
const IX = PX + 24;
const IW = PW - 48;

/* ---------------------------------------------------------------- */
/* Diagram 1 : System Architecture                                    */
/* ---------------------------------------------------------------- */
function architecture() {
  let s = '';

  s += heading(
    PX,
    46,
    'TripMarble · System Architecture',
    '웹과 안드로이드 앱이 같은 백엔드를 호출한다 · auth 는 단독, 나머지는 API Gateway 경유',
  );

  // clients
  const clY = 92;
  const clH = 132;
  s += panel({ x: PX, y: clY, w: PW, h: clH, title: 'CLIENTS', accent: '#93C5FD', fill: '#F0F7FF' });
  const halfW = (IW - 24) / 2;
  s += card({
    x: IX,
    y: clY + 42,
    w: halfW,
    h: 76,
    ic: 'Nextdotjs',
    title: 'Web · Next.js 14 App Router',
    sub: 'SSR standalone · Redux Toolkit · TanStack Query · Three.js 보드판',
  });
  s += card({
    x: IX + halfW + 24,
    y: clY + 42,
    w: halfW,
    h: 76,
    ic: 'Expo',
    title: 'Android · Expo 53 (RN 0.79)',
    sub: 'React Navigation 7 · Redux Persist · WebView 지도 · expo-location',
  });
  s += arrow(W / 2, clY + clH, W / 2, clY + clH + 36, {
    label: 'axios · Bearer 토큰 (localStorage / AsyncStorage)',
  });

  // edge
  const edY = 260;
  const edH = 124;
  s += panel({ x: PX, y: edY, w: PW, h: edH, title: 'PUBLIC EDGE' });
  s += card({
    x: IX,
    y: edY + 44,
    w: 452,
    h: 62,
    ic: 'Nginx',
    title: 'Nginx + Certbot',
    sub: 'HTTPS 종료 · 도메인/경로 분기',
  });
  const domX = IX + 484;
  s += pill(domX, edY + 48, 'www.tripmarble.com', '#DBEAFE');
  s += pill(domX + 214, edY + 48, 'api.tripmarble.com/auth-service/', '#DBEAFE');
  s += pill(domX, edY + 77, 'minio.8llow8llowme.com', '#DBEAFE');
  s += pill(domX + 214, edY + 77, 'api.tripmarble.com/api-gateway/', '#DBEAFE');
  s += arrow(W / 2, edY + edH, W / 2, edY + edH + 36);

  // backend
  const beY = 420;
  const beH = 374;
  s += panel({
    x: PX,
    y: beY,
    w: PW,
    h: beH,
    title: 'BACKEND · Java 21 · Spring Boot 3.4.5 · Spring Cloud 2024.0.0',
    accent: '#86EFAC',
    fill: '#F2FBF5',
  });
  s += card({
    x: IX,
    y: beY + 42,
    w: halfW,
    h: 68,
    ic: 'Spring',
    title: 'api-gateway',
    sub: 'JWT 검증 · 리액티브 라우팅 · Swagger 집계',
    badge: '8000',
  });
  s += card({
    x: IX + halfW + 24,
    y: beY + 42,
    w: halfW,
    h: 68,
    ic: 'Spring',
    title: 'service-discovery',
    sub: 'Netflix Eureka · 서비스 등록/탐색',
    badge: '8761',
  });

  const svcW = (IW - 2 * 22) / 3;
  const svcH = 84;
  const svcTop = beY + 148;
  const services = [
    ['Springboot', 'auth-service', '인증 · 회원 · 소셜 로그인 · 이메일', '8081'],
    ['Springboot', 'trip-service', '지역 · 관광지 · 리뷰 · 사진', '8082'],
    ['Springboot', 'trip-game-service', '보드판 · 미션 · 이동 로그', '8083'],
    ['Springboot', 'batch-service', 'TourAPI 적재 (Spring Batch)', '8090'],
    ['Springboot', 'monitoring-service', 'Spring Boot Admin · 헬스 집계', '8080'],
    ['Gradle', 'core 모듈 5종', 'common · persistence · redis · security · storage', null],
  ];
  services.forEach((sv, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    s += card({
      x: IX + col * (svcW + 22),
      y: svcTop + row * (svcH + 20),
      w: svcW,
      h: svcH,
      ic: sv[0],
      title: sv[1],
      sub: sv[2],
      badge: sv[3],
    });
  });
  s += arrow(IX + halfW / 2 + 200, beY + 110, IX + halfW / 2 + 200, svcTop - 6);
  s += `<text x="${IX + halfW / 2 + 214}" y="${beY + 134}" font-family="${FONT}" font-size="12" fill="${C.arrowText}">lb:// 라우팅</text>`;
  s += `<text x="${IX}" y="${beY + 356}" font-family="${FONT}" font-size="12.5" fill="${C.sub}">서비스 간 호출은 OpenFeign + Eureka 로 처리한다 (auth ↔ trip ↔ trip-game) · 메시지 큐는 쓰지 않는다</text>`;
  s += arrow(PX + PW / 4, beY + beH, PX + PW / 4, beY + beH + 34);
  s += arrow(PX + (PW * 3) / 4, beY + beH, PX + (PW * 3) / 4, beY + beH + 34);

  // data + external
  const btY = beY + beH + 34;
  const colW = (PW - 24) / 2;
  const data = [
    ['Mysql', null, 'MySQL', 'tripmarble · 서비스별 스키마 분리'],
    ['Redis', null, 'Redis', 'refresh token · 이메일 인증코드 (Sentinel)'],
    ['Minio', null, 'MinIO', '프로필 · 리뷰 사진 (버킷 prefix tripmarble)'],
  ];
  const ext = [
    ['tour', '#0F766E', 'TourAPI', '한국관광공사 · 지역코드 · 관광지 목록/상세'],
    ['pin', '#EF4444', 'Kakao Map', '지도 렌더링 (Web SDK / WebView)'],
    ['Naver', '#03C75A', 'Kakao · Naver OAuth', '소셜 로그인'],
    ['mail', '#475569', 'SMTP', '회원가입 이메일 인증코드 발송'],
  ];
  const column = (x, title, items) => {
    let out = panel({ x, y: btY, w: colW, h: 42 + items.length * 66, title });
    items.forEach((it, i) => {
      out += card({
        x: x + 24,
        y: btY + 42 + i * 66,
        w: colW - 48,
        h: 58,
        ic: it[0],
        icColor: it[1],
        title: it[2],
        sub: it[3],
      });
    });
    return out;
  };
  s += column(PX, 'DATA & STORAGE', data);
  s += column(PX + colW + 24, 'EXTERNAL API', ext);

  return svgDoc(W, btY + 42 + Math.max(data.length, ext.length) * 66 + 40, s);
}

/* ---------------------------------------------------------------- */
/* Diagram 2 : Infrastructure & CI/CD                                 */
/* ---------------------------------------------------------------- */
function infrastructure() {
  let s = '';

  s += heading(
    PX,
    46,
    'TripMarble · Infrastructure & CI/CD',
    'Vault 없이 private 서브모듈(TripMarble-env)로 환경변수를 배포한다',
  );

  // pipeline band : backend & web
  const ciY = 82;
  const ciH = 138;
  s += panel({
    x: PX,
    y: ciY,
    w: PW,
    h: ciH,
    title: 'CI/CD · BACKEND & WEB (Jenkins)',
    accent: '#FDBA74',
    fill: '#FFF7ED',
  });
  const steps = [
    ['Github', null, 'GitHub PR', 'develop → dev · main → prod'],
    ['Githubactions', null, 'Actions', 'jenkins-trigger.yml'],
    ['Jenkins', null, 'Jenkins', '서브모듈 recursive 체크아웃'],
    ['Gradle', null, 'build', 'bootJar · yarn build'],
    ['Docker', null, 'sshPublisher', 'compose --env-file'],
  ];
  const stW = (IW - 4 * 30) / 5;
  steps.forEach((st, i) => {
    const x = IX + i * (stW + 30);
    s += card({ x, y: ciY + 44, w: stW, h: 76, ic: st[0], icColor: st[1], title: st[2], sub: st[3] });
    if (i < steps.length - 1) s += arrow(x + stW + 3, ciY + 82, x + stW + 27, ciY + 82);
  });
  s += `<text x="${IX}" y="${ciY + 132}" font-family="${FONT}" font-size="12" fill="${C.sub}">백엔드는 backend-1 로, 웹 SSR 은 storage 로 전송한다 · dev 웹은 빌드 검증만 하고 배포하지 않는다</text>`;

  // pipeline band : android
  const anY = ciY + ciH + 22;
  const anH = 138;
  s += panel({
    x: PX,
    y: anY,
    w: PW,
    h: anH,
    title: 'CI/CD · ANDROID (GitHub Actions)',
    accent: '#A5B4FC',
    fill: '#F5F5FF',
  });
  const anSteps = [
    ['Githubactions', null, 'mobile-android-build', 'PR 라벨 기반 트리거'],
    ['Gradle', null, 'bundleRelease', 'keystore 복원 · 서명'],
    ['Fastlane', null, 'fastlane supply', 'AAB 업로드'],
    ['Googleplay', null, 'Google Play', 'alpha / open 트랙'],
  ];
  const anW = (IW - 3 * 36) / 4;
  anSteps.forEach((st, i) => {
    const x = IX + i * (anW + 36);
    s += card({ x, y: anY + 44, w: anW, h: 76, ic: st[0], icColor: st[1], title: st[2], sub: st[3] });
    if (i < anSteps.length - 1) s += arrow(x + anW + 4, anY + 82, x + anW + 32, anY + 82);
  });
  s += `<text x="${IX}" y="${anY + 132}" font-family="${FONT}" font-size="12" fill="${C.sub}">com.followfollowme.tripmarble · Expo prebuild 된 android 디렉터리를 Gradle 로 직접 빌드한다 (EAS 미사용)</text>`;

  // env submodule band
  const enY = anY + anH + 22;
  const enH = 148;
  s += panel({
    x: PX,
    y: enY,
    w: PW,
    h: enH,
    title: 'ENV · GIT SUBMODULE (private repo · TripMarble-env)',
    accent: '#C4B5FD',
    fill: '#FAF5FF',
  });
  const envW = (IW - 2 * 22) / 3;
  const envs = [
    ['backend/env', 'feature/be/env'],
    ['frontend/web/env', 'feature/fe/web/env'],
    ['frontend/mobile/env', 'feature/fe/mobile/env'],
  ];
  envs.forEach((e, i) => {
    s += card({
      x: IX + i * (envW + 22),
      y: enY + 44,
      w: envW,
      h: 68,
      ic: 'Git',
      title: e[0],
      sub: e[1],
    });
  });
  s += `<text x="${IX}" y="${enY + 138}" font-family="${FONT}" font-size="12" fill="${C.sub}">.env-backend-{dev,prod} · .env-frontend-web-{dev,prod} · .env-web-ssr-prod · .env-frontend-mobile-{dev,prod}</text>`;

  // hosts
  const hostY = enY + enH + 46;
  s += `<text x="${PX}" y="${hostY - 8}" font-family="${FONT}" font-size="15" font-weight="700" fill="${C.panelTitle}" letter-spacing="0.4">SERVER TOPOLOGY</text>`;

  const hosts = [
    {
      title: 'storage · 192.168.0.12',
      sub: '인그레스 · 오브젝트 스토리지 · 웹 SSR',
      items: [
        ['Nginx', 'Nginx + Certbot', 'HTTPS · 도메인 라우팅'],
        ['Nextdotjs', 'web-ssr', 'Next.js standalone :3000'],
        ['Minio', 'MinIO', '이미지 오브젝트 스토리지'],
        ['Redis', 'Redis node3', 'Sentinel 3'],
      ],
    },
    {
      title: 'backend-1 · 192.168.0.13',
      sub: 'prod 애플리케이션 (8xxx 대역)',
      items: [
        ['Springboot', '백엔드 컨테이너 5종', 'gateway · eureka · auth · trip · game'],
        ['Redis', 'Redis node2', 'Sentinel 2'],
      ],
    },
    {
      title: 'main-server · 192.168.0.11',
      sub: '공용 데이터 계층',
      items: [
        ['Mysql', 'MySQL', 'tripmarble 스키마'],
        ['Redis', 'Redis node1', 'Sentinel 1 · master'],
      ],
    },
    {
      title: 'ollama-01 · 192.168.0.10',
      sub: '빌드 · 인프라 도구 (x86_64)',
      items: [
        ['Jenkins', 'Jenkins controller', '멀티브랜치 파이프라인'],
        ['Jenkins', 'builder agent', 'Gradle · Yarn 빌드'],
      ],
    },
    {
      title: 'deploy · 192.168.0.14',
      sub: '관측 스택',
      items: [
        ['Prometheus', 'Prometheus', 'node_exporter scrape'],
        ['Grafana', 'Grafana', '호스트 지표 대시보드'],
      ],
    },
    {
      title: 'external',
      sub: '레포지토리 · 앱 배포 채널',
      items: [
        ['Github', 'GitHub', '앱 레포 + private env 레포'],
        ['Googleplay', 'Google Play', 'AAB 배포 (alpha 트랙)'],
      ],
    },
  ];

  const cols = 3;
  const hw = (IW - 2 * 24) / cols;
  const bodyH = (h) => 60 + h.items.length * 66 + 6;
  const rowTop = [hostY + 12, 0];
  rowTop[1] = rowTop[0] + Math.max(...hosts.slice(0, cols).map(bodyH)) + 26;

  hosts.forEach((h, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const bx = IX + col * (hw + 24);
    const by = rowTop[row];
    s += panel({ x: bx, y: by, w: hw, h: bodyH(h), title: null, accent: '#CBD5E1', fill: '#F8FAFC' });
    s += `<text x="${bx + 18}" y="${by + 28}" font-family="${FONT}" font-size="14" font-weight="700" fill="${C.title}">${esc(h.title)}</text>
    <text x="${bx + 18}" y="${by + 47}" font-family="${FONT}" font-size="11.5" fill="${C.sub}">${esc(h.sub)}</text>`;
    h.items.forEach((it, j) => {
      s += card({
        x: bx + 14,
        y: by + 60 + j * 66,
        w: hw - 28,
        h: 58,
        ic: it[0],
        title: it[1],
        sub: it[2],
      });
    });
  });

  const notesY = rowTop[1] + Math.max(...hosts.slice(cols).map(bodyH)) + 26;
  const notes = [
    'Vault 를 쓰지 않는다. Jenkins 가 private 서브모듈에서 env 파일을 받아 배포 서버로 보내고 compose --env-file 로만 주입한다',
    'Nginx 는 api.tripmarble.com 의 /auth-service/ 와 /api-gateway/ 를 backend-1(192.168.0.13) 의 8081 · 8000 으로 프록시한다',
    'Redis 는 3노드 센티널(.11 master · .13 · .12 replica) quorum 2 이고, dev · prod 프로파일은 Sentinel 모드로 접속한다',
    '애플리케이션 헬스는 monitoring-service(Spring Boot Admin) 가, 호스트 지표는 Prometheus + Grafana 가 담당한다',
    '안드로이드는 Jenkins 를 거치지 않고 GitHub Actions 에서 서명·번들 후 fastlane supply 로 Play 트랙에 올린다',
  ];
  s += note(PX, notesY, PW, notes);

  return svgDoc(W, notesY + 42 + notes.length * 24 + 34, s);
}

/* ---------------------------------------------------------------- */
function write(name, svg) {
  const r = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: 2 },
    font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' },
  });
  fs.writeFileSync(`${OUT}/${name}.png`, r.render().asPng());
  console.log(`${name}: ok`);
}

write('architecture', architecture());
write('infrastructure', infrastructure());
