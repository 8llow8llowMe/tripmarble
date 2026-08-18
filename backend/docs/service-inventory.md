# Backend Service Inventory

## Auth Service

- 책임: 회원 인증, 인가 진입점, 토큰 발급/재발급/로그아웃, 회원 기본 정보
- 컨텍스트: `auth`, `member`
- 특징: `AuthSecurityConfigurer` 기반 인증/인가 서비스, OAuth(Kakao/Naver) 연동, 이메일 인증

## Trip Service

- 책임: 여행 관리, 스팟/콘텐츠 관리, 지역 조회, 리뷰, 방문자 통계
- 컨텍스트: `trip`, `region`, `review`, `visitor`
- 특징: `ResourceServerSecurityConfigurer` 기반, Querydsl 사용, Minio 스토리지 연동

## Trip Game Service

- 책임: 여행 게임 메커니즘, 테마/퀘스트 관리, 스코어링
- 컨텍스트: `game`, `theme`
- 특징: `ResourceServerSecurityConfigurer` 기반, Querydsl 사용

## Batch Service

- 책임: 지역/여행 데이터 일괄 적재, 외부 API(Tour API) 연동 배치
- 컨텍스트: `region`, `trip`
- 특징: Spring Batch 기반, CommandLine Job Dispatcher, WebClient로 외부 API 호출

## Monitoring Service

- 책임: 애플리케이션 헬스 모니터링, 로그 집계, 서비스 인스턴스 추적
- 특징: Spring Boot Admin Server, Service Discovery 연동, 별도 도메인 레이어 없음

## API Gateway

- 책임: 요청 라우팅, JWT 유효성 검증, CORS 처리
- 특징: Spring Cloud Gateway, JWT 검증 필터, 리액티브 라우팅

## Service Discovery

- 책임: 서비스 등록/탐색, 헬스체크
- 특징: Eureka Server 기반

## Core Modules

| 모듈 | 책임 |
|------|------|
| `common-core` | Jasypt 암호화, Swagger 공통 설정, 공통 DTO/예외 |
| `persistence-core` | JPA Audit, Querydsl, Snowflake ID 생성, 기본 엔티티 |
| `redis-core` | Redis 연결/캐싱 설정 |
| `security-core` | AuthSecurityConfigurer, ResourceServerSecurityConfigurer, JWT 처리 |
| `storage-core` | MinIO 스토리지 연결, 버킷 관리, 파일 업로드/다운로드 |
