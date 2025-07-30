# Jenkins와 GitHub Actions 연동 가이드

## 1. Jenkins 설정

### 1.1 Jenkins API Token 생성
1. Jenkins 관리 → 사용자 → 사용자 설정
2. API Token → Add new Token
3. Token 생성 후 복사

### 1.2 Jenkins 웹훅 설정
1. Jenkins 관리 → 시스템 설정
2. GitHub 서버 추가:
   - Name: GitHub
   - API URL: https://api.github.com
   - Credentials: GitHub Personal Access Token

### 1.3 멀티브랜치 파이프라인 설정
1. 각 서비스별 멀티브랜치 파이프라인 생성
2. Branch Sources → GitHub
3. Repository: your-repo
4. Credentials: GitHub Personal Access Token
5. **Discovery Behavior 설정:**
   - Discover pull requests from origin: 체크
   - Strategy: Merging the pull request with the current target branch revision
   - **Suppress automatic branch indexing: 체크** (중요!)

## 2. GitHub Secrets 설정

### 2.1 Repository Secrets 추가
1. Repository → Settings → Secrets and variables → Actions
2. 다음 Secrets 추가:
   - `JENKINS_URL`: https://your-jenkins-url.com
   - `JENKINS_TOKEN`: Jenkins API Token
   - `JENKINS_USERNAME`: Jenkins 사용자명

## 3. 워크플로우 동작 방식

### 3.1 일반적인 경우 (GitHub Actions 없이)
```
PR 생성/업데이트
    ↓
모든 멀티브랜치 파이프라인 트리거
    ↓
각 파이프라인에서 라벨 체크
    ↓
라벨이 있는 파이프라인만 실행
```

### 3.2 GitHub Actions 활용
```
PR 생성/업데이트
    ↓
GitHub Actions에서 라벨 분석
    ↓
라벨이 있는 서비스만 Jenkins API 호출
    ↓
해당 서비스의 파이프라인만 실행
```

## 4. 장점

### 4.1 리소스 효율성
- 불필요한 파이프라인 실행 방지
- Jenkins 리소스 절약
- 빌드 시간 단축

### 4.2 관리 편의성
- 중앙화된 라벨 관리
- 조건부 실행 로직 명확화
- 디버깅 용이성

### 4.3 확장성
- 새로운 서비스 추가 시 워크플로우만 수정
- 복잡한 조건 로직 구현 가능

## 5. 주의사항

### 5.1 보안
- Jenkins API Token 보안 관리
- GitHub Secrets 적절한 권한 설정
- HTTPS 통신 사용

### 5.2 모니터링
- GitHub Actions 실행 상태 모니터링
- Jenkins 파이프라인 실행 로그 확인
- 실패 시 알림 설정

## 6. 트러블슈팅

### 6.1 Jenkins API 호출 실패
- API Token 유효성 확인
- Jenkins URL 접근 가능성 확인
- 네트워크 연결 상태 확인

### 6.2 라벨 인식 실패
- 라벨 이름 정확성 확인
- GitHub API 응답 확인
- 워크플로우 로그 분석

### 6.3 파이프라인 실행 안됨
- Jenkins 파이프라인 설정 확인
- 파라미터 전달 확인
- 권한 설정 확인 