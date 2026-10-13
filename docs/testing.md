# 배포 전 테스트

Vitest로 데이터/로직을 검증하고 React Testing Library와 jsdom으로 `/depot` 페이지의 사용자 입력을 검증합니다. Node.js 24 LTS를 권장합니다. 설치 버전과 의존성은 `package-lock.json`에 고정됩니다.

## 실행

```bash
npm ci
npm test
```

`npm test`는 한 번 실행하고 종료합니다. 개발 중에는 다음 명령을 사용합니다.

```bash
npm run test:watch
npm run test:operators
npm run test:depot
npm run test:coverage
```

커버리지 HTML은 `coverage/index.html`에 생성됩니다. 현재는 초기 테스트 범위를 보여주는 보고서이며 전체 기능의 배포 안전성을 보장하는 비율 기준은 설정하지 않았습니다.

배포 전에 다음 명령을 실행하세요. 테스트, TypeScript, ESLint, Next.js 프로덕션 빌드를 순서대로 실행하고 하나라도 실패하면 중단합니다.

```bash
npm run check:release
```

이 명령은 Git 커밋/푸시 또는 실제 배포를 수행하지 않습니다. 빌드는 기존 애플리케이션의 환경 설정을 사용합니다.

## 초기 테스트 범위

- `tests/operators/skadi.test.ts`: `operators.generated.ts`의 6성 스카디(`char_263_skadi`) 전체 데이터를 snapshot으로 고정합니다. 원본 fixture를 필터 → 파서 → 재료 변환 → 빌더에 통과시킨 결과가 현재 generated 데이터와 같은지도 검사합니다. 알 수 없는 재료 ID와 스킬 테이블 누락도 검증합니다.
- `tests/operators/need.test.ts`: 스카디의 정예화/최대 레벨 비용, 공통 스킬 비용 중복 방지, 개별 마스터리 합산을 실제 필요량 계산과 창고 저장 형식까지 연결해 확인합니다.
- `tests/depot/storage.test.ts`: JSON 가져오기, 설정/추가, 저장/복원 왕복, 구 용문폐 ID 및 레거시 창고 복원, 잘못된 입력 거부를 검증합니다.
- `tests/depot/page.test.tsx`: 실제 `/depot` 페이지를 독립적인 Jotai store에서 렌더링합니다. JSON 가져오기, 수량 직접 수정, 초기화, 잘못된 JSON 입력을 확인합니다.

일반 테스트에는 `.env.local`, 외부 게임데이터 저장소, Firebase 로그인이나 네트워크가 필요하지 않습니다. 생성 CLI의 파일 출력 전체, 실제 브라우저 탐색/레이아웃, Firebase 동기화는 이번 초기 구성의 검증 범위에 포함하지 않습니다.

## 스카디 기준점 관리

`tests/fixtures/skadi-gamedata.json`은 KR 원본 테이블에서 스카디의 필수 필드만 추출한 고정 입력입니다. 테스트 실행 때 현재 generated 데이터로 입력을 재구성하지 않습니다. `tests/operators/__snapshots__/skadi.test.ts.snap`은 현재 승인된 스카디의 메타데이터 및 재료 ID/수량 기준점입니다.

데이터 생성 로직이나 generated 데이터를 바꾼 후 먼저 테스트를 실행하세요.

```bash
npm run generate:operators
npm run test:operators
```

스카디 데이터의 의도된 변경이라면 원본 변경과 snapshot diff를 확인한 후에만 기준점을 갱신합니다. 생성 로직 오류를 snapshot 갱신으로 덮지 마세요.

```bash
# .env.local의 ARKNIGHTS_GAMEDATA_PATH와 KR 원본 테이블이 필요합니다.
npm run test:refresh-skadi

# 스카디 snapshot만 갱신합니다. 일반 배포 검사에서는 실행하지 않습니다.
npm run test:operators -- --update

git diff -- tests/fixtures tests/operators/__snapshots__
npm run check:release
```

fixture 갱신 명령은 명시적으로 호출할 때만 파일을 덮어씁니다. 출시 정보와 수동 추천 설정은 generated 데이터 snapshot 및 현재 수동 override를 통해 함께 확인합니다.

## 새 테스트 추가

순수 로직 테스트는 `tests/**/*.test.ts`에 작성합니다. 컴포넌트 테스트는 `.test.tsx`에 작성하고 파일 첫 줄에 `// @vitest-environment jsdom`을 추가합니다. 각 화면 테스트에는 새 Jotai store를 사용해 다른 테스트의 상태가 섞이지 않게 합니다. 프로젝트의 `@/`, `@data/`, `@depot/`, `@common/` 별칭을 그대로 사용할 수 있습니다.

참고: [Vitest 실행 및 설정](https://vitest.dev/guide/), [React Testing Library 설정](https://testing-library.com/docs/react-testing-library/setup/).
