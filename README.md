# Washer Client v2

세탁기 관리 시스템의 클라이언트 애플리케이션입니다. Next.js 16과 React 19를 기반으로 구축되었으며, 현대적인 웹 개발 기술 스택을 사용합니다.

## 🚀 기술 스택

### 프레임워크 & 라이브러리

- **Next.js 16** - React 기반 풀스택 프레임워크
- **React 19** - 사용자 인터페이스 라이브러리
- **TypeScript** - 정적 타입 검사
- **Tailwind CSS 4** - 유틸리티 우선 CSS 프레임워크

### 상태 관리 & 데이터 페칭

- **TanStack Query** - 서버 상태 관리 및 캐싱
- **React Hook Form** - 폼 상태 관리
- **Zod** - 스키마 검증

### UI 컴포넌트

- **Radix UI** - 접근성이 뛰어난 헤드리스 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **Class Variance Authority** - 컴포넌트 변형 관리

### 개발 도구

- **Biome** - 빠른 린터 및 포매터
- **Axios** - HTTP 클라이언트
- **React Toastify** - 토스트 알림

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── entities/              # 비즈니스 엔티티
├── shared/                # 공유 모듈
│   ├── api/               # API 관련 유틸리티
│   ├── lib/               # 공통 라이브러리
│   ├── styles/            # 전역 스타일
│   └── ui/                # 재사용 가능한 UI 컴포넌트
├── views/                 # 페이지별 뷰 컴포넌트
│   └── main/              # 메인 페이지
└── widgets/               # 복합 UI 위젯
```

## 🛠️ 시작하기

### 필수 요구사항

- Node.js 18.17 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

1. **의존성 설치**

   ```bash
   pnpm i
   ```

2. **개발 서버 실행**

   ```bash
   pnpm run dev
   ```

3. **브라우저에서 확인**
   [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 코드 린팅
pnpm lint

# 코드 포매팅
pnpm format

# 린팅 및 포매팅 자동 수정
pnpm lint:fix
```
