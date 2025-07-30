# 하이브리드 CI/CD 패턴 - Jenkins 설정 가이드

## 1. Jenkins 멀티브랜치 파이프라인 설정 변경

### 1.1 기존 설정 (자동 트리거)
```
Branch Sources → GitHub
├── Repository: your-repo
├── Credentials: GitHub Token
├── Discover pull requests from origin: ✅ 체크
├── Strategy: Merging the pull request
└── 자동으로 모든 PR 트리거
```

### 1.2 변경할 설정 (수동 트리거)
```
Branch Sources → GitHub
├── Repository: your-repo
├── Credentials: GitHub Token
├── Discover pull requests from origin: ❌ 체크 해제
├── Strategy: Merging the pull request
├── Suppress automatic branch indexing: ✅ 체크
└── GitHub Actions에서만 수동 트리거
```

## 2. 각 서비스별 파이프라인 설정

### 2.1 auth-service 파이프라인
1. Jenkins → New Item → Multibranch Pipeline
2. Name: `auth-service`
3. Branch Sources → GitHub
4. **중요 설정:**
   - Discover pull requests from origin: ❌ **체크 해제**
   - Suppress automatic branch indexing: ✅ **체크**
   - Build Configuration → Mode: by Jenkinsfile
   - Script Path: `backend/service/auth-service/Jenkinsfile-auth-service`

### 2.2 trip-service 파이프라인
1. Jenkins → New Item → Multibranch Pipeline
2. Name: `trip-service`
3. Branch Sources → GitHub
4. **중요 설정:**
   - Discover pull requests from origin: ❌ **체크 해제**
   - Suppress automatic branch indexing: ✅ **체크**
   - Build Configuration → Mode: by Jenkinsfile
   - Script Path: `backend/service/trip-service/Jenkinsfile-trip-service`

### 2.3 trip-game-service 파이프라인
1. Jenkins → New Item → Multibranch Pipeline
2. Name: `trip-game-service`
3. Branch Sources → GitHub
4. **중요 설정:**
   - Discover pull requests from origin: ❌ **체크 해제**
   - Suppress automatic branch indexing: ✅ **체크**
   - Build Configuration → Mode: by Jenkinsfile
   - Script Path: `backend/service/trip-game-service/Jenkinsfile-trip-game-service`

### 2.4 api-gateway 파이프라인
1. Jenkins → New Item → Multibranch Pipeline
2. Name: `api-gateway`
3. Branch Sources → GitHub
4. **중요 설정:**
   - Discover pull requests from origin: ❌ **체크 해제**
   - Suppress automatic branch indexing: ✅ **체크**
   - Build Configuration → Mode: by Jenkinsfile
   - Script Path: `backend/cloud/api-gateway/Jenkinsfile-api-gateway`

### 2.5 service-discovery 파이프라인
1. Jenkins → New Item → Multibranch Pipeline
2. Name: `service-discovery`
3. Branch Sources → GitHub
4. **중요 설정:**
   - Discover pull requests from origin: ❌ **체크 해제**
   - Suppress automatic branch indexing: ✅ **체크**
   - Build Configuration → Mode: by Jenkinsfile
   - Script Path: `backend/cloud/service-discovery/Jenkinsfile-service-discovery`

## 3. Jenkins API 설정

### 3.1 API Token 생성
1. Jenkins → 사용자 → Configure
2. API Token → Add new Token
3. Token 생성 후 복사

### 3.2 CORS 설정 (필요시)
1. Jenkins → Manage Jenkins → Configure System
2. Global properties → Environment variables
3. 추가:
   - Name: `JENKINS_OPTS`
   - Value: `-Dhudson.security.csrf.GlobalCrumbIssuerConfiguration.DISABLE_CSRF_PROTECTION=true`

## 4. GitHub Actions 워크플로우 수정

### 4.1 Jenkins URL 경로 수정
```yaml
# 기존 (잘못된 경로)
"${{ secrets.JENKINS_URL }}/job/backend/job/auth-service/job/develop/buildWithParameters"

# 수정 (올바른 경로)
"${{ secrets.JENKINS_URL }}/job/auth-service/job/develop/buildWithParameters"
```

### 4.2 올바른 워크플로우
```yaml
- name: Trigger auth-service pipeline
  if: needs.analyze-labels.outputs.auth-service == 'true'
  run: |
    curl -X POST \
      -H "Authorization: Bearer ${{ secrets.JENKINS_TOKEN }}" \
      -H "Content-Type: application/json" \
      "${{ secrets.JENKINS_URL }}/job/auth-service/job/develop/buildWithParameters" \
      -d '{
        "SERVICE_GROUP": "service",
        "SERVICE_NAME": "auth-service",
        "SERVICE_LABEL": "backend-auth-service",
        "SKIP_LABEL_CHECK": "true"
      }'
```

## 5. 테스트 방법

### 5.1 GitHub Actions 테스트
1. PR 생성
2. 라벨 추가 (예: `backend-auth-service`)
3. GitHub Actions 탭에서 워크플로우 실행 확인

### 5.2 Jenkins 파이프라인 테스트
1. Jenkins → auth-service → develop 브랜치
2. Build with Parameters 클릭
3. 파라미터 입력 후 빌드 실행

## 6. 주의사항

### 6.1 보안
- Jenkins API Token 보안 관리
- GitHub Secrets 적절한 권한 설정
- HTTPS 통신 사용

### 6.2 모니터링
- GitHub Actions 실행 상태 확인
- Jenkins 파이프라인 실행 로그 확인
- 실패 시 알림 설정

### 6.3 트러블슈팅
- Jenkins API 호출 실패 시 URL 경로 확인
- 파라미터 전달 실패 시 JSON 형식 확인
- 권한 문제 시 API Token 재생성 