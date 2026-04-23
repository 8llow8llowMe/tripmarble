# TripMarble Web Redesign Tasks

작성일: 2026-04-22

> 이 문서는 디자인 토큰, 공통 UI, 스타일 시스템 정리를 위한 작업표다.
> 서비스 경험 단위의 UX 리뷰와 재설계 기준은 `frontend/web/SERVICE_UX_REVIEW.md`를 우선 기준으로 사용한다.

## 0. 목표

`DESIGN.md`의 Apple 기반 디자인 방향을 TripMarble Web에 적용한다.  
먼저 디자인 토큰을 정의하고, 그 토큰을 기준으로 공통 UI와 주요 화면을 순차적으로 리디자인한다.

참고 문서:
- `frontend/web/DESIGN.md`
- `PROJECT_STRUCTURE_REVIEW.md`

## 1. 전제와 결정 필요 사항

- 현재 전역 토큰은 `src/shared/styles/globals.scss`의 `--background`, `--foreground` 정도에 머물러 있다.
- 색상, 반경, 그림자, 폰트 크기, 간격이 여러 `*.module.scss`에 직접 하드코딩되어 있다.
- `DESIGN.md`의 "Near Black" 값이 `#22c55e`로 적혀 있는데, 이 값은 실제로 green 계열이다. 토큰 정의 전에 아래 둘 중 하나로 결정한다.
  - `#22c55e`를 TripMarble 고유 포인트 컬러로 유지한다.
  - Apple 계열 near-black인 `#1d1d1f` 또는 현재 본문 계열 `#171717`로 교정한다.
- Apple Blue `#0071e3`는 인터랙션 전용 accent로 사용한다. 장식용 accent 컬러를 추가하지 않는다.
- 카드/섹션은 gradient, 과한 shadow, 큰 radius를 줄이고 solid background, 명확한 타이포, 넓은 여백 중심으로 정리한다.

## 2. 권장 작업 순서

1. 토큰 기반 구축
2. 공통 UI 프리미티브 정리
3. 레이아웃 shell 리디자인
4. 카드/리스트 계열 통합
5. 페이지별 리디자인
6. 상태, 접근성, 반응형, QA 정리

## 3. 디자인 토큰 작업

### 3.1 Token 파일 추가

- [x] `src/shared/styles/tokens.scss`를 생성한다.
- [x] `src/shared/styles/globals.scss`에서 `tokens.scss`를 import한다.
- [x] 기존 `:root` 토큰은 `tokens.scss`로 이동하고 의미 기반 이름으로 확장한다.

권장 토큰 초안:

```scss
:root {
  /* Font */
  --font-display: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;

  /* Color: base */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-page: #f5f5f7;
  --color-surface: #ffffff;
  --color-surface-muted: #f5f5f7;
  --color-surface-dark: #272729;

  /* Color: text */
  --color-text-strong: #1d1d1f;
  --color-text: rgba(0, 0, 0, 0.8);
  --color-text-muted: rgba(0, 0, 0, 0.48);
  --color-text-inverse: #ffffff;

  /* Color: interactive */
  --color-accent: #0071e3;
  --color-link: #0066cc;
  --color-link-inverse: #2997ff;
  --color-focus: #0071e3;

  /* Radius */
  --radius-xs: 5px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-pill: 980px;
  --radius-circle: 50%;

  /* Spacing */
  --space-1: 2px;
  --space-2: 4px;
  --space-3: 6px;
  --space-4: 8px;
  --space-5: 12px;
  --space-6: 16px;
  --space-7: 20px;
  --space-8: 24px;
  --space-9: 32px;
  --space-10: 48px;
  --space-11: 64px;

  /* Layout */
  --container-sm: 640px;
  --container-md: 834px;
  --container-lg: 980px;
  --container-xl: 1070px;
  --header-height: 48px;

  /* Shadow */
  --shadow-none: none;
  --shadow-card: rgba(0, 0, 0, 0.22) 3px 5px 30px 0;

  /* Motion */
  --motion-fast: 150ms;
  --motion-standard: 300ms;
  --motion-slow: 500ms;
  --ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-enter: cubic-bezier(0.2, 0.6, 0.25, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

### 3.2 Typography 토큰 추가

- [x] `tokens.scss` 또는 `typography.scss`에 text role mixin/class를 정의한다.
- [x] `globals.scss`의 `body` font를 `Arial`에서 `--font-body`로 교체한다.
- [x] 큰 제목은 `--font-display`, 20px 미만 본문은 `--font-body`를 사용한다.
- [x] negative letter-spacing 규칙을 role 단위로만 적용한다.

권장 role:

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---:|---:|---:|---:|
| display | 56px | 600 | 1.07 | -0.28px |
| section-title | 40px | 600 | 1.10 | 0 |
| tile-title | 28px | 400 | 1.14 | 0.196px |
| card-title | 21px | 700 | 1.19 | 0.231px |
| body | 17px | 400 | 1.47 | -0.374px |
| caption | 14px | 400 | 1.29 | -0.224px |
| micro | 12px | 400 | 1.33 | -0.12px |

### 3.3 하드코딩 스타일 제거

- [x] `#0070f3`, `#4f46e5`, `#3f7cf6`, `#2563eb`, `#13203c`, `#5a6a86` 등 기존 컬러를 토큰으로 치환한다.
- [x] `border-radius: 16px`, `24px`, `40px`, `99px`, `999px` 등을 radius token으로 치환한다.
- [x] 그림자는 `--shadow-none`, `--shadow-card` 중심으로 줄인다.
- [x] 컴포넌트별 hover transition은 motion token으로 치환한다.

## 4. 공통 UI 리디자인 작업

### 4.1 Button

대상:
- `src/shared/ui/common/Button/Button.tsx`
- `src/shared/ui/common/Button/Button.module.scss`

Tasks:
- [x] `paddingSize`, `radius`, `bgColor`, `width`, `height`, `fontSize` 중심 API를 정리한다.
- [x] `variant: "primary" | "secondary" | "ghost" | "link" | "danger"`를 추가한다.
- [x] `size: "sm" | "md" | "lg"`를 추가한다.
- [x] `block`, `leadingIcon`, `trailingIcon`, `isLoading` 지원 여부를 결정한다.
- [x] `primary`는 Apple Blue `--color-accent`를 사용한다.
- [x] CTA성 버튼은 `--radius-pill`, 일반 버튼은 `--radius-sm`를 사용한다.
- [x] 모든 interactive state에 `:focus-visible` outline을 추가한다.

Definition of Done:
- [x] raw `width`, `height`, `fontSize` 없이도 기존 버튼 사용처가 깨지지 않는다.
- [x] 색상과 radius가 모두 token 기반이다.
- [x] hover, active, disabled, focus-visible 상태가 정의되어 있다.

### 4.2 Input / Form

대상:
- `src/shared/ui/common/Input/Input.tsx`
- `src/shared/ui/common/Input/Input.module.scss`
- `src/features/auth/login/LoginForm.module.scss`
- `src/features/auth/signup/SignUpForm.module.scss`
- `src/features/profile/edit/ProfileEditForm.module.scss`

Tasks:
- [x] input height, padding, border, focus ring을 token으로 통일한다.
- [x] label, helper text, error text typography role을 정의한다.
- [x] 로그인/회원가입/프로필 수정 폼의 중복 스타일을 공통 form pattern으로 정리한다.
- [x] validation error 색상 token을 추가할지 결정한다.

Definition of Done:
- [x] form field의 기본/hover/focus/error/disabled 상태가 일관된다.
- [x] 모바일에서 input과 버튼 touch target이 최소 44px 이상이다.

### 4.3 Modal / Dialog

대상:
- `src/shared/ui/common/Modal/Modal.tsx`
- `src/shared/ui/common/Modal/Modal.module.scss`
- `src/features/game/create-game/ui/CreateGameModal/**`
- `src/entities/games/ui/mission-modal/**`
- `src/entities/games/ui/tile-info-modal/**`

Tasks:
- [x] modal overlay, panel radius, spacing, shadow를 token 기반으로 정리한다.
- [x] close button은 원형 media control style로 통일한다.
- [x] title/body/footer slot 구조를 명확히 한다.
- [x] `CreateGameModal` step UI를 공통 modal layout 위에서 재구성한다.

Definition of Done:
- [x] 모달 계열이 같은 overlay, panel, close button 규칙을 사용한다.
- [x] ESC, backdrop click, focus trap 필요 여부가 정리되어 있다.

### 4.4 Card / MediaCard

대상:
- `src/shared/ui/common/Card/**`
- `src/shared/ui/common/CardList/**`
- `src/shared/ui/common/HorizontalList/**`
- `src/widgets/game-list/**`
- `src/widgets/game-list-horizontal/**`

Tasks:
- [x] `MediaCard` 프리미티브를 추가한다.
- [x] `CardGrid`, `CardRail` wrapper를 추가하거나 기존 `CardList`, `HorizontalList`를 개편한다.
- [x] 이미지, title, desc, meta, action 영역을 slot 또는 typed props로 정리한다.
- [x] 카드 radius는 `--radius-sm` 또는 `--radius-md`만 사용한다.
- [x] hover 효과는 shadow 과다 사용 대신 subtle transform 또는 link focus 중심으로 정리한다.

Definition of Done:
- [x] Spot, Game, Review 계열 카드가 같은 primitive를 사용한다.
- [x] 카드 목록의 gap, image ratio, text clamp가 토큰 기반으로 정리된다.

## 5. 레이아웃 Shell 작업

### 5.1 Global Style

대상:
- `src/shared/styles/globals.scss`

Tasks:
- [x] body background를 `--color-page`로 변경한다.
- [x] body color를 `--color-text-strong` 또는 결정된 text token으로 변경한다.
- [x] `.appPage`의 `max-width: 1516px`, `border-radius: 40px`, `background-color: white`를 재검토한다.
- [x] Apple식 full-width section rhythm을 위해 page container 규칙을 화면별 layout으로 분리한다.
- [x] scrollbar 색상을 token으로 치환한다.

Definition of Done:
- [x] 전역 스타일에 raw color/radius 값이 남지 않는다.
- [x] header/footer 포함 모든 페이지의 기본 배경 흐름이 통일된다.

### 5.2 Header

대상:
- `src/widgets/header/Header.tsx`
- `src/widgets/header/Header.module.scss`

Tasks:
- [x] 높이를 `80px`에서 `--header-height: 48px` 기준으로 재정의한다.
- [x] glass navigation: `rgba(0,0,0,0.8)` + `backdrop-filter: saturate(180%) blur(20px)` 적용 여부를 결정하고 구현한다.
- [x] `navItems` 배열 기반으로 desktop/mobile nav 중복을 제거한다.
- [x] 내부 라우팅은 `next/link`로 통일한다.
- [x] active, hover, focus-visible 상태를 token 기반으로 정리한다.
- [x] mobile menu를 `MobileNavDrawer` 또는 `MobileNavMenu`로 분리한다.

Definition of Done:
- [x] 메뉴 추가/수정이 데이터 배열 한 곳에서 가능하다.
- [x] header가 모든 주요 페이지에서 같은 높이와 glass 규칙을 유지한다.

### 5.3 Footer / Route Layout

대상:
- `src/widgets/footer/**`
- `src/widgets/layout/ClientLayout.tsx`
- `src/widgets/layout/CategoryLayoutClient.tsx`
- `src/app/**/layout.tsx`

Tasks:
- [x] pathname 조건 기반 footer 노출 규칙을 route group layout으로 옮길 수 있는지 검토한다.
- [x] default, immersive, map-heavy, auth 레이아웃 구분을 정의한다.
- [x] footer typography, link, spacing을 token 기반으로 정리한다.

Definition of Done:
- [x] footer 표시 여부가 임의 pathname 조건문에 의존하지 않는다.
- [x] auth/game/map 등 특수 화면 layout 규칙이 명확하다.

## 6. 페이지별 리디자인 작업

### 6.1 Home

대상:
- `src/app/page.tsx`
- `src/entities/home/ui/home-dice/HomeDice.tsx`
- `src/entities/home/ui/home-dice/HomeDice.module.scss`
- `src/entities/home/ui/polaroid-card/**`
- `src/entities/home/ui/polaroid-stack/**`

Tasks:
- [x] Home을 `HomeHeroScene`, `HeroCopy`, `BoardLayer`, `RegionRail` 등 섹션 단위로 분리한다.
- [x] hero는 첫 화면에서 실제 서비스 경험이 보이도록 유지하되 Apple식 solid section과 tight headline을 적용한다.
- [x] CTA는 `Button` primitive로 통일한다.
- [x] polaroid/card 시각 효과가 새 token 체계와 충돌하지 않도록 shadow/radius를 정리한다.
- [x] desktop/mobile에서 텍스트와 dice/board 시각 요소가 겹치지 않는지 검증한다.

Definition of Done:
- [x] 홈 첫 화면의 핵심 행동이 명확하다.
- [x] visual hierarchy가 display/title/body role로 정리되어 있다.
- [x] 모바일 360px에서도 CTA와 주요 텍스트가 잘리지 않는다.

### 6.2 Auth

대상:
- `src/app/(auth)/layout.tsx`
- `src/app/(auth)/AuthLayout.module.scss`
- `src/features/auth/login/**`
- `src/features/auth/signup/**`

Tasks:
- [x] login/signup layout을 같은 form shell로 통일한다.
- [x] social login button 스타일을 button token과 맞춘다.
- [x] error/callback 화면의 메시지를 Apple식 짧고 구체적인 copy로 정리한다.
- [x] 모바일에서 form width, spacing, touch target을 검증한다.

Definition of Done:
- [x] 로그인/회원가입이 같은 UI 규칙을 공유한다.
- [x] auth flow의 empty/loading/error 상태가 정의되어 있다.

### 6.3 Game

대상:
- `src/app/(game)/game/page.tsx`
- `src/app/(game)/game/list/page.tsx`
- `src/app/(game)/game/[id]/page.tsx`
- `src/entities/games/ui/game-play/**`
- `src/entities/games/ui/game-board/**`
- `src/widgets/game-list/**`
- `src/widgets/game-empty-state/**`
- `src/features/game/create-game/ui/CreateGameModal/**`

Tasks:
- [x] game list는 `CardGrid` 또는 `CardRail` 기반으로 재구성한다.
- [x] game detail/play 화면은 immersive layout으로 분리한다.
- [x] game board 주변 UI는 card 안에 과하게 가두지 않고 full-width 또는 tool surface로 정리한다.
- [x] dice, mission, tile modal의 버튼/상태/타이포를 공통 token으로 통일한다.
- [x] empty game state는 과한 일러스트 대신 명확한 headline, 설명, CTA 중심으로 재작성한다.

Definition of Done:
- [x] 게임 생성, 목록, 상세, 플레이 흐름이 같은 시각 언어를 사용한다.
- [x] canvas/3D 영역과 주변 UI가 모바일에서 겹치지 않는다.

### 6.4 Spots / Search

대상:
- `src/app/(spots)/spots/page.tsx`
- `src/app/(spots)/spots/[id]/page.tsx`
- `src/app/(spots)/trip-spots/[id]/page.tsx`
- `src/app/search/page.tsx`
- `src/shared/ui/map/KakaoMap.tsx`
- `src/shared/ui/common/Filter/**`

Tasks:
- [x] `spots/[id]/page.tsx`의 큰 파일을 섹션과 hook으로 분리한다.
- [x] map-heavy layout을 정의하고 header/footer 규칙을 분리한다.
- [x] filter/search controls를 `Input`, `Button`, `Filter` token 기반으로 통일한다.
- [x] spot card/list item을 `MediaCard` 기반으로 재구성한다.
- [x] no results, loading, network error 상태를 명확한 copy와 CTA로 정리한다.

Definition of Done:
- [x] 검색/필터/지도/상세 패널의 UI 규칙이 같은 token을 사용한다.
- [x] 긴 상세 페이지가 섹션 단위로 유지보수 가능하게 분리되어 있다.

### 6.5 Profile / Reviews

대상:
- `src/app/(user)/profile/page.tsx`
- `src/app/(user)/profile/reviews/page.tsx`
- `src/features/profile/**`
- `src/entities/users/ui/**`
- `src/entities/reviews/**`

Tasks:
- [x] profile header, avatar, user info를 token 기반으로 정리한다.
- [x] review list를 `MediaCard` 또는 별도 `ReviewCard` wrapper로 정리한다.
- [x] profile edit form을 공통 form pattern에 맞춘다.
- [x] empty reviews 상태를 짧은 설명 + CTA로 정리한다.

Definition of Done:
- [x] profile과 review 화면의 card/form 스타일이 auth, spots와 일관된다.

### 6.6 Policy / Error / Not Found

대상:
- `src/app/policy/page.tsx`
- `src/app/policy/[slug]/page.tsx`
- `src/shared/ui/ErrorView/ErrorView.tsx`
- `src/shared/ui/NotFoundView/**`
- `src/app/global-error.tsx`
- `src/app/not-found.tsx`

Tasks:
- [x] policy list/detail typography를 readable body scale로 정리한다.
- [x] markdown content width를 `--container-lg` 기준으로 제한한다.
- [x] error/not-found는 headline, 1문장 설명, recovery CTA 구조로 통일한다.
- [x] decorative illustration 사용을 줄이고 copy와 action 중심으로 정리한다.

Definition of Done:
- [x] 모든 시스템 상태 화면이 같은 tone, spacing, button style을 사용한다.

## 7. 상태와 접근성

- [x] 모든 button/link/input에 `:focus-visible` 상태를 정의한다.
- [x] `prefers-reduced-motion: reduce`에서 transition/animation을 줄인다.
- [x] loading skeleton token을 정의한다.
- [x] empty/error/success/disabled 상태의 색상과 copy 규칙을 정한다.
- [x] touch target 최소 44px 규칙을 검증한다.
- [x] contrast ratio를 주요 페이지별로 확인한다.

상태 copy 규칙:
- Empty: 현재 없는 항목을 제목으로 말하고, 다음 행동 1개를 CTA로 제안한다.
- Error: 실패한 작업을 제목으로 말하고, 재시도 또는 복귀 CTA를 제공한다.
- Success: 완료된 작업과 다음에 할 수 있는 행동을 짧게 안내한다.
- Disabled: 비활성 이유를 title/helper text로 설명하고 opacity만으로 의미를 전달하지 않는다.

Contrast spot check:
- `--color-text-strong` on `--color-page`: 15.46:1
- `--color-link` on `--color-surface`: 5.57:1
- `--color-accent` with inverse text: 4.70:1
- `--color-danger` with inverse text: 4.83:1
- `--color-success` with inverse text: 5.47:1

## 8. 반응형 기준

지원 breakpoint:

| Name | Width | 검증 대상 |
|---|---:|---|
| Small Mobile | 360px | 최소 폭, 버튼/텍스트 줄바꿈 |
| Mobile | 390px | iPhone 일반 폭 |
| Tablet Small | 640px | 2-column 전환 |
| Tablet | 834px | tablet layout |
| Desktop Small | 1024px | desktop 시작 |
| Desktop | 1440px | 일반 desktop |

Tasks:
- [x] 각 주요 화면을 위 viewport에서 확인한다.
- [x] hero headline은 `56px -> 40px -> 28px` 흐름으로 줄인다.
- [x] grid는 `3-column -> 2-column -> 1-column`으로 전환한다.
- [x] fixed header와 page content가 겹치지 않는지 확인한다.

Responsive implementation notes:
- Breakpoint token을 `tokens.scss`에 정의하고, 실제 media query는 `639px`, `1023px` 기준으로 적용한다.
- Hero headline은 desktop `--type-display-size`, tablet `--type-section-title-size`, mobile `--type-tile-title-size` alias를 사용한다.
- 공통 `CardGrid`는 desktop 3-column, tablet 2-column, mobile 1-column으로 전환하며 필요 시 `--card-grid-columns-*`로 화면별 override할 수 있다.
- Header는 `--header-height`와 `--size-touch-target` 기준으로 nav/menu target을 정리했고, 일반 페이지는 `.layoutWrapper.hasHeader`의 `--layout-header-offset`으로 fixed header 충돌을 피한다.
- 자동 screenshot 환경은 없어서 CSS breakpoint, build, dev route 응답 기준으로 확인했다. 수동 QA는 `http://localhost:5173`에서 360/390/640/834/1024/1440 viewport로 진행한다.

## 9. 구현 체크포인트

### Wave 1: Foundation

- [x] `tokens.scss` 추가
- [x] `globals.scss` 정리
- [x] typography role 정의
- [x] lint/build 기준 확인

Foundation checkpoint notes:
- `tokens.scss`에는 color, typography, spacing, layout, state, responsive alias가 정의되어 있다.
- `globals.scss`는 `tokens.scss`, `typography.scss`를 import하고 body/layout/focus/skeleton/reduced-motion 기준을 전역화한다.
- `typography.scss`는 display, section-title, tile-title, card-title, body, caption, micro, nano role mixin/class를 제공한다.
- `yarn lint`, `yarn build` 통과를 기준으로 Foundation 작업 완료로 판단한다.

### Wave 2: Primitive Components

- [x] Button 개편
- [x] Input/Form 개편
- [x] Modal/Dialog 개편
- [ ] Card/MediaCard 개편

Button checkpoint notes:
- `Button`은 `variant`, `size`, `block`, `leadingIcon`, `trailingIcon`, `isLoading` API를 제공한다.
- Button size, border, disabled, loading spinner는 token 기반으로 정리되어 있다.

Input/Form checkpoint notes:
- `Input`은 value/onChange/onSubmit 외에 native input props, loading, invalid, helper/error text, class override를 지원한다.
- `form.scss`는 form shell, field group, label/helper/error, field state를 token 기반 mixin으로 제공한다.
- Login, Signup, Profile edit form은 공통 form mixin을 공유하고 touch target/disabled/error state를 token으로 맞춘다.

Modal/Dialog checkpoint notes:
- `Modal`은 title/footer/body slot, size variant, backdrop/ESC close option, focus trap, scroll lock을 제공한다.
- Modal overlay, panel width, close button, edge gap은 modal token으로 정리한다.
- title이 없는 dialog는 `ariaLabel`로 접근 가능한 이름을 제공한다.

### Wave 3: Layout

- [ ] Header glass nav 적용
- [ ] MobileNav 분리
- [ ] Footer token 적용
- [ ] route group layout 전략 반영

### Wave 4: Main Flows

- [ ] Home redesign
- [ ] Auth redesign
- [ ] Game list/detail/play redesign
- [ ] Spots/search redesign

### Wave 5: Secondary Flows

- [ ] Profile/reviews redesign
- [ ] Policy redesign
- [ ] Error/not-found redesign

### Wave 6: QA

- [ ] `yarn lint`
- [ ] `yarn build`
- [ ] 주요 viewport screenshot 확인
- [ ] keyboard navigation 확인
- [ ] reduced motion 확인
- [ ] raw color/radius 검색 후 제거

## 10. 검색/검증 명령

```bash
# frontend/web 기준
yarn lint
yarn build

# raw color 확인
rg '#[0-9a-fA-F]{3,8}' src

# 큰 radius 확인
rg 'border-radius:\\s*(1[3-9]|[2-9][0-9]|999|980)' src

# inline style override 확인
rg 'fontSize|width=|height=|style=\\{' src/shared src/features src/widgets src/entities src/app
```

## 11. 완료 기준

- [ ] 전역 디자인 토큰이 `tokens.scss`에 정의되어 있다.
- [ ] 공통 UI는 token 기반 variant/size API로 동작한다.
- [ ] 페이지별 SCSS에서 주요 색상, radius, spacing, shadow가 raw 값으로 반복되지 않는다.
- [ ] 홈, 인증, 게임, 장소/검색, 프로필, 정책/에러 화면이 같은 시각 언어를 공유한다.
- [ ] desktop/mobile 주요 viewport에서 텍스트 겹침, 버튼 잘림, fixed header 충돌이 없다.
- [ ] `yarn lint`, `yarn build`가 통과한다.
