# GitHub Actions 설정 가이드

## 1. GitHub Secrets 설정

### 1.1 Repository Secrets 추가
1. GitHub 레포지토리 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 다음 Secrets 추가:

#### **JENKINS_URL**
- Name: `JENKINS_URL`
- Value: `https://your-jenkins-server.com`
- 예시: `https://jenkins.company.com`

#### **JENKINS_TOKEN**
- Name: `JENKINS_TOKEN`
- Value: Jenkins API Token (Jenkins에서 생성)
- 예시: `11aabbccddee11223344556677889900`

#### **JENKINS_USERNAME** (선택사항)
- Name: `JENKINS_USERNAME`
- Value: Jenkins 사용자명
- 예시: `admin`

## 2. GitHub Actions 무료 플랜

### 2.1 Private Repository 무료 플랜
- ✅ **무료**: Private repository에서도 GitHub Actions 무료 사용 가능
- ✅ **월 2,000분**: 무료 실행 시간 제공
- ✅ **동시 실행**: 최대 20개 job 동시 실행

### 2.2 사용량 확인
1. GitHub 레포지토리 → Settings → Actions → General
2. "Workflow permissions" 섹션에서 설정
3. "Actions" 탭에서 실행 시간 확인

### 2.3 비용 계산 예시
```
우리 워크플로우 예상 실행 시간:
- 라벨 분석: 10초
- Jenkins API 호출: 5초
- 총 15초 × PR당

월 2,000분 = 120,000초
120,000초 ÷ 15초 = 8,000개 PR 처리 가능
```

## 3. GitHub Actions 권한 설정

### 3.1 Workflow Permissions
1. GitHub 레포지토리 → Settings → Actions → General
2. "Workflow permissions" 섹션:
   - ✅ **Read and write permissions**: 체크
   - ✅ **Allow GitHub Actions to create and approve pull requests**: 체크

### 3.2 Branch Protection Rules (선택사항)
1. GitHub 레포지토리 → Settings → Branches
2. develop, main 브랜치에 대해:
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**

## 4. 워크플로우 파일 배포

### 4.1 파일 위치
```
.github/
└── workflows/
    └── jenkins-trigger.yml
```

### 4.2 배포 방법
1. 파일을 레포지토리에 push
2. GitHub Actions 탭에서 워크플로우 확인
3. "Actions" 탭에서 실행 상태 모니터링

## 5. 테스트 방법

### 5.1 워크플로우 테스트
1. PR 생성
2. 라벨 추가 (예: `backend-auth-service`)
3. GitHub Actions 탭에서 실행 확인
4. Jenkins에서 파이프라인 실행 확인

### 5.2 로그 확인
1. GitHub Actions → 워크플로우 클릭 → Job 클릭
2. 각 step의 로그 확인
3. 실패 시 에러 메시지 분석

## 6. 트러블슈팅

### 6.1 GitHub Actions 실행 안됨
- 파일 경로 확인: `.github/workflows/jenkins-trigger.yml`
- YAML 문법 오류 확인
- Secrets 설정 확인

### 6.2 Jenkins API 호출 실패
- JENKINS_URL, JENKINS_TOKEN 확인
- Jenkins 서버 접근 가능성 확인
- CORS 설정 확인

### 6.3 권한 오류
- GitHub Actions 권한 설정 확인
- Jenkins API Token 권한 확인
- Repository Secrets 권한 확인

## 7. 모니터링

### 7.1 GitHub Actions 모니터링
- Actions 탭에서 실행 상태 확인
- 실패 시 알림 설정
- 실행 시간 및 비용 모니터링

### 7.2 Jenkins 모니터링
- Jenkins 대시보드에서 파이프라인 상태 확인
- 빌드 로그 확인
- 실패 시 알림 설정 