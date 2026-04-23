# TripMarble Web 디자인 / 컴포넌트 구성 리뷰

작성일: 2026-04-21

이 문서는 `frontend/web`를 디자인 구조와 컴포넌트 호출/구성 관점에서 다시 검토한 결과다.  
API contract, 인증 버그, 인프라 이슈는 이번 문서의 중심에서 제외했다.

## 1. 검토 범위

- 레이아웃/화면
  - `frontend/web/src/app/page.tsx`
  - `frontend/web/src/widgets/layout/CategoryLayoutClient.tsx`
  - `frontend/web/src/widgets/header/Header.tsx`
  - `frontend/web/src/widgets/footer/Footer.tsx`
  - `frontend/web/src/entities/home/ui/home-dice/HomeDice.tsx`
  - `frontend/web/src/app/(spots)/spots/[id]/page.tsx`
- 공통 UI
  - `frontend/web/src/shared/ui/common/Button/Button.tsx`
  - `frontend/web/src/shared/ui/common/Card/Card.tsx`
  - `frontend/web/src/shared/ui/common/CardList/CardList.tsx`
  - `frontend/web/src/shared/ui/common/Carousel/Carousel.tsx`
  - `frontend/web/src/shared/ui/common/HorizontalList/HorizontalList.tsx`
  - `frontend/web/src/shared/ui/common/Modal/Modal.tsx`
  - `frontend/web/src/shared/ui/common/Input/Input.tsx`
- 전역 스타일
  - `frontend/web/src/shared/styles/globals.scss`

## 2. 전체 판단

현재 웹은 화면 단위 결과물은 어느 정도 나와 있지만, 디자인 시스템과 컴포넌트 계층 규칙이 충분히 정리된 상태는 아니다.  
특히 아래 세 가지가 핵심이다.

1. 공통 UI가 얇고, 실제 화면에서는 비슷한 카드/리스트/네비게이션을 각자 다시 그린다.
2. 큰 페이지가 데이터, 상태, 레이아웃, 섹션 렌더링을 한 파일에 같이 들고 있다.
3. 스타일 토큰이 거의 없어서 색상, 반경, 그림자, 간격이 컴포넌트마다 따로 굳어져 있다.

## 3. 좋은 점

- `app / entities / features / shared / widgets` 계층이 있어 기본적인 구조 의도는 좋다.
- 홈의 `HomeDice`처럼 메인 경험을 바로 보여주는 방향은 제품 성격과 잘 맞는다.
- `app/page.tsx`는 홈 구현을 별도 컴포넌트로 위임하고 있어 진입점은 단순하다.
- `CardList`, `Carousel`, `Modal`, `Button` 같은 공통 UI를 만들려는 시도는 있다.

## 4. 핵심 문제

### 4.1 디자인 시스템이 거의 없다

`globals.scss`의 `:root`에는 사실상 아래 정도만 있다.

- `--background`
- `--foreground`
- `--piece-w`
- `--col`
- `--embla-gap`

그 외의 색상/간격/반경/그림자/타이포는 각 SCSS 파일에 직접 박혀 있다.  
실제 검색해보면 `#0070f3`, `#4d36ff`, `#3f7cf6`, `#2563eb`, `#13203c`, `#5a6a86` 같은 색이 여러 파일에 흩어져 있다.

영향:
- 페이지마다 시각 톤이 조금씩 달라진다.
- 공통 컴포넌트를 고쳐도 화면 전체가 같이 정돈되지 않는다.
- 신규 화면 추가 시 기존 패턴을 따라가기보다 새 스타일을 또 만들게 된다.

제안:
- `shared/styles/tokens.scss` 또는 `shared/styles/theme.scss`를 만들고 아래를 토큰화한다.
  - semantic color: `primary`, `accent`, `surface`, `surface-muted`, `text-strong`, `text-subtle`
  - radius: `4/8/12/16`
  - spacing scale: `4/8/12/16/24/32/48`
  - shadow scale: `sm/md/lg`
  - type scale: `display`, `title`, `body`, `caption`

### 4.2 반경과 카드 스타일이 일관되지 않다

확인한 예:

- `Button.module.scss`
  - radius: `6 / 8 / 12`
- `Card.module.scss`
  - radius: `16`
- `Header.module.scss`
  - logo: `24`
  - nav: `99`
  - mobile menu: `12`
- 여러 페이지 스타일
  - `999px`, `40px`, `16px` 등이 혼재

문제:
- 같은 제품 안에서 버튼, 카드, 메뉴가 서로 다른 제품처럼 보일 수 있다.
- 공통 UI를 도입했는데도 결과는 통일되지 않는다.

제안:
- round scale을 고정한다.
  - 버튼/입력: `6 또는 8`
  - 카드/모달: `12 또는 16`
  - pill/chip만 `999px`
- `Button`, `Card`, `Modal`, `Filter`, `Header` 모두 같은 radius token을 사용하게 바꾼다.

### 4.3 공통 컴포넌트가 있지만 실제로는 재사용이 약하다

대표 예:

- `CardList`는 `Card`를 사용한다.
- 그런데 `GameList`는 `CardList`를 거치지 않고 자체 카드 렌더링을 다시 만든다.
- `HorizontalList`도 또 다른 썸네일/오버레이 구조를 직접 가진다.
- 결국 `Card`, `CardList`, `HorizontalList`, `GameList`가 모두 "이미지 + 텍스트 + 태그" 계열 UI를 각자 렌더링한다.

문제:
- UI가 조금씩 다르게 진화한다.
- 디자인 변경 시 수정 포인트가 여러 곳으로 퍼진다.
- 카드 계열 컴포넌트의 역할이 불명확해진다.

제안:
- 카드 계열을 아래처럼 정리한다.
  - `MediaCard`: 이미지/오버레이/메타/타이틀을 담당하는 핵심 카드
  - `CardRail`: 카드 가로 리스트
  - `CardGrid`: 카드 그리드
  - 도메인별 thin wrapper:
    - `SpotCard`
    - `GameCard`
    - `ReviewCard`
- `GameList`, `HorizontalList`, `CardList`는 직접 마크업을 갖지 말고 공통 카드 프리미티브를 조합만 하게 만든다.

### 4.4 공통 컴포넌트 API가 디자인 시스템보다 자유도가 너무 높다

`Button`은 아래처럼 raw style 성격의 props를 받는다.

- `width?: string`
- `height?: string`
- `fontSize?: string`

문제:
- 공통 버튼인데도 화면마다 임의 크기와 폰트가 들어간다.
- 디자인 토큰보다 inline override가 우선되는 구조가 된다.

제안:
- `Button`은 아래 중심으로 제한한다.
  - `variant`: `primary | secondary | ghost | danger`
  - `size`: `sm | md | lg`
  - `block`
  - `leadingIcon`, `trailingIcon`
- `width`, `height`, `fontSize` 같은 raw props는 제거하거나 정말 필요한 곳만 `className`로 확장한다.

### 4.5 Header 구성이 중복되고 호출 방식이 섞여 있다

`Header.tsx`는 데스크톱/모바일 메뉴 항목을 거의 같은 내용으로 두 번 그리고 있다.  
또 내부 라우팅인데 `Link`와 `<a href>`가 섞여 있고, `게임 목록`은 데스크톱/모바일에서 각각 별도 핸들러 구조를 가진다.

문제:
- 메뉴 추가/수정 시 두 군데를 같이 고쳐야 한다.
- 클릭 권한 제어와 라우팅 규칙이 흩어진다.
- 디자인 상태(active/hover/mobile)가 데이터 기반이 아니라 마크업 중복으로 유지된다.

제안:
- `navItems` 배열을 만들고 공통 렌더링으로 바꾼다.
- "로그인 필요" 항목은 `Link` 대신 `NavActionItem` 같은 컴포넌트로 추상화한다.
- 모바일 메뉴는 별도 마크업 복붙이 아니라 같은 `navItems`를 재사용하는 `MobileNavDrawer`로 분리한다.

### 4.6 Footer / Layout 규칙이 pathname 조건에 의존한다

`CategoryLayoutClient.tsx`는 `pathname.startsWith("/spots")` 같은 조건으로 footer 노출 여부를 결정한다.

문제:
- 레이아웃 규칙이 라우트 문자열 조건문으로 퍼진다.
- 화면 종류가 늘수록 `if pathname ...` 패턴이 증가할 가능성이 크다.

제안:
- App Router route group별 layout으로 나눈다.
  - 예: `(default)`, `(immersive)`, `(map-heavy)`
- 홈/지도/게임처럼 헤더/푸터 규칙이 다른 화면은 route group layout으로 관리한다.

### 4.7 페이지 파일이 너무 크다

확인한 라인 수:

- `app/(spots)/spots/[id]/page.tsx`: `1185`
- `shared/ui/map/KakaoMap.tsx`: `625`
- `entities/games/ui/game-play/GamePlay.tsx`: `576`
- `entities/home/ui/home-dice/HomeDice.tsx`: `474`
- `app/(spots)/trip-spots/[id]/page.tsx`: `457`
- `features/game/create-game/ui/CreateGameModal/index.tsx`: `299`

문제:
- 한 파일 안에 데이터 정규화, 상태 관리, 섹션 마크업, UI 조건 분기가 다 들어 있다.
- 디자인 수정 시 레이아웃과 비즈니스 로직이 같이 흔들린다.
- 섹션 단위 재사용이나 실험이 어렵다.

제안:
- 큰 페이지는 아래 수준으로 분해한다.

예시: `spots/[id]/page.tsx`
- `SpotDetailPage`
- `SpotHeroSection`
- `SpotMapPanel`
- `SpotFilterBar`
- `SpotListPanel`
- `SpotDetailPanel`
- `SpotReviewSection`
- `useSpotDetailPage`
- `lib/parseBoundaryPolygons.ts`

예시: `HomeDice.tsx`
- `HomeHeroScene`
- `BoardLayer`
- `RegionPolaroidRail`
- `HeroCopy`
- `useHomeDiceScene`
- `useHomeScrollTimeline`

### 4.8 공통 컴포넌트의 추상화가 타입 수준에서 불완전하다

예:

- `HorizontalList<T>`인데 실제로는 `items as any`, `onItemClick as any`
- `Carousel`은 `key={index}` 사용
- `CreateGameModal`의 step registry는 `React.ComponentType<any>`

문제:
- "제네릭하게 설계한 것처럼 보이지만" 실제 타입 안정성은 없다.
- 컴포넌트 호출 규약이 코드에서 드러나지 않는다.
- 리팩터링 시 IDE 도움을 거의 못 받는다.

제안:
- `Carousel`에 `getItemKey`를 추가한다.
- `HorizontalList`는 진짜 generic으로 유지하거나, 아니면 `HorizontalListItem[]` 전용 컴포넌트로 단순화한다.
- step component는 `any` 대신 공통 props interface를 만든다.

## 5. 디자인 측면 수정 제안

### [ ] 공통 디자인 토큰부터 만든다

우선순위가 가장 높다.  
버튼/카드/헤더를 바로 고치기 전에, 색/간격/반경/그림자 토큰을 먼저 정의해야 한다.

추천 작업:
- [ ] `shared/styles/tokens.scss` 추가
- [ ] `globals.scss`는 reset + global shell 위주로만 유지
- [ ] 주요 컴포넌트에서 하드코딩 색상 제거

### [ ] 카드 계열 UI를 하나의 시각 언어로 통일한다

현재는 카드마다 시각적 밀도와 오버레이 스타일이 다르다.

추천 작업:
- [ ] `MediaCard` 도입
- [ ] `GameList`가 자체 마크업 대신 공통 카드 사용
- [ ] `HorizontalList`도 공통 카드의 compact variant 사용
- [ ] 이미지 비율, meta 위치, title 줄 수 규칙 고정

### [ ] 헤더를 제품 네비게이션 컴포넌트로 재구성한다

추천 작업:
- [ ] `navItems` 데이터화
- [ ] `HeaderDesktopNav`, `HeaderMobileNav` 분리
- [ ] 로그인 가드가 필요한 메뉴는 `NavGuardLink`로 통합
- [ ] internal link는 `Link`로 일관화

### [ ] route별 shell을 분리한다

추천 작업:
- [ ] 일반 콘텐츠형 레이아웃
- [ ] immersive형 레이아웃
- [ ] map/detail형 레이아웃

이렇게 나누면 홈과 여행지 상세 같은 페이지가 억지로 같은 frame을 공유하지 않아도 된다.

## 6. 컴포넌트 호출 / 구성 측면 수정 제안

### [ ] 페이지는 "조립만" 하게 만든다

이상적인 기준:
- `app/.../page.tsx`
  - 데이터 진입점
  - route param 전달
  - 최상위 페이지 컴포넌트 렌더
- `widgets/...`
  - 화면 섹션 조립
- `features/...`
  - 사용자 액션 흐름
- `shared/ui/...`
  - 순수 프리미티브

현재는 큰 page 파일이 직접 많은 상태와 렌더링을 들고 있어 이 규칙이 흐려져 있다.

### [ ] 모달 공통 컴포넌트를 slot 기반으로 키운다

현재 `Modal`은 overlay와 content만 제공한다.

추천 작업:
- [ ] `ModalHeader`
- [ ] `ModalBody`
- [ ] `ModalFooter`
- [ ] `size=sm|md|lg|full`
- [ ] `closeOnOverlay`

이렇게 해야 feature 모달들이 공통 프레임 안에서 설계될 수 있다.

### [ ] 입력 컴포넌트를 검색 전용에서 form primitive로 확장한다

현재 `Input.tsx`는 사실상 "검색 폼"이다.

문제:
- 이름은 `Input`인데 실제 책임은 form + submit button까지 포함한다.

추천 작업:
- [ ] `TextField`
- [ ] `SearchBar`
- [ ] `FieldLabel`
- [ ] `FieldMessage`

즉, primitive와 composed component를 분리한다.

### [ ] CreateGameModal의 단계 구성을 명시적으로 바꾼다

현재는 step registry + `ComponentType<any>` 조합이라 읽기보다 추적이 어렵다.

추천 작업:
- [ ] `CreateGameStepShell` 도입
- [ ] 각 step props 타입 통일
- [ ] scroll/keyboard/navigation 로직은 hook으로 분리
- [ ] step UI는 render만 담당

## 7. 바로 손대기 좋은 순서

### 1단계: 공통 규칙 만들기

- [ ] design tokens 정의
- [ ] Button API 축소
- [ ] Card 계열 기준안 확정
- [ ] Header nav 데이터화

### 2단계: 큰 파일 분해

- [ ] `spots/[id]/page.tsx` 분해
- [ ] `HomeDice.tsx` scene/hook 분리
- [ ] `KakaoMap.tsx`를 map renderer + marker/polygon logic로 분리

### 3단계: 공통 UI 재조립

- [ ] `MediaCard`
- [ ] `CardRail`
- [ ] `Modal` slot API
- [ ] `TextField` / `SearchBar` 분리

## 8. 결론

지금 웹은 "화면을 만드는 속도"는 나쁘지 않지만, 디자인 시스템과 컴포넌트 조립 규칙이 약해서 화면이 늘수록 유지보수 비용이 빠르게 올라갈 구조다.

가장 효과가 큰 개선은 두 가지다.

1. 디자인 토큰과 공통 카드/버튼/헤더 규칙을 먼저 세운다.
2. `spots/[id]`, `HomeDice`, `KakaoMap`처럼 큰 파일을 섹션/훅/프리미티브로 나눈다.

이 두 가지를 먼저 하면 이후의 디자인 수정과 기능 추가가 훨씬 덜 비싸진다.
