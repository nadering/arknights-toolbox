# Operator Data Generation Guide

마크다운 에디터: https://coddy.tech/tools/ko/markdown-editor

---

이 문서는 Arknights Toolbox의 오퍼레이터 데이터를 인게임 JSON 기반으로 갱신하는 절차를 정리한다.

핵심 흐름은 아래 순서다.

```txt
game data 업데이트
→ release candidate scan
→ release event draft 생성
→ manual 파일 수정
→ release info generate
→ report 확인
→ 문제 없으면 generated 파일 커밋
```

---

## 1. 빠른 실행 순서

게임 업데이트 이후에는 아래 순서로 진행한다.

```bash
npm run check:gamedata
npm run check:cn-gamedata

npm run scan:operator-release
npm run scan:cn-operator-release
npm run create:operator-release-event-draft

npm run generate:operator-release-info
```

단, `scan:*`과 `create:*` 결과를 그대로 믿고 끝내면 안 된다.

```txt
scan 결과
→ 참고용 후보

draft 결과
→ manual 파일 초안 참고용

manual/operator-release-events.ts
→ 최종 source of truth

generate 결과
→ manual 기준으로 생성된 산출물
```

---

## 2. 전체 작업 루틴

### 2.1. game data repository 최신화

먼저 로컬 game data repository를 최신 상태로 갱신한다.

예시:

```bash
git -C <GLOBAL_GAMEDATA_PATH> pull
git -C <CN_GAMEDATA_PATH> pull
```

실제 경로는 `.env.local`의 값을 기준으로 한다.

```env
ARKNIGHTS_GAMEDATA_PATH=...
ARKNIGHTS_CN_GAMEDATA_PATH=...
```

장점:

```txt
- 최신 global/CN character_table을 기준으로 작업할 수 있음
- 신규 오퍼레이터와 신규 이벤트 후보를 확인할 수 있음
```

단점:

```txt
- game data repository 자체가 최신이 아니거나 구조가 바뀌면 scan 결과가 부정확할 수 있음
```

---

### 2.2. game data 경로 확인

```bash
npm run check:gamedata
npm run check:cn-gamedata
```

확인할 것:

```txt
- global game data 경로가 정상인지
- CN game data 경로가 정상인지
- character_table.json을 읽을 수 있는지
```

현재 기준 주요 경로:

```txt
global:
kr/gamedata/excel/character_table.json

CN:
zh_CN/gamedata/excel/character_table.json
```

---

### 2.3. release candidate scan 실행

```bash
npm run scan:operator-release
npm run scan:cn-operator-release
```

역할:

```txt
scan:operator-release
→ global/KR game data 기준 출시 이벤트 후보 확인

scan:cn-operator-release
→ CN game data 기준 미래시 출시 이벤트 후보 확인
```

예상 산출물:

```txt
src/data/operator/generated/operator-release-candidates.generated.ts
src/data/operator/generated/operator-release-candidate-report.md

src/data/operator/generated/operator-cn-release-candidates.generated.ts
src/data/operator/generated/operator-cn-release-candidate-report.md
```

주의:

```txt
- scan 결과는 최종 데이터가 아니다.
- activity_table / gacha_table / git history 기반 후보이므로 누락이나 오분류가 있을 수 있다.
- 특히 과거 이벤트 순서나 특수 이벤트는 사람이 확인해야 한다.
```

장점:

```txt
- 신규 이벤트와 신규 오퍼레이터 후보를 빠르게 찾을 수 있음
- manual 파일을 처음부터 직접 뒤지는 부담이 줄어듦
```

단점:

```txt
- 이벤트 순서, 복각 여부, 특수 이벤트 여부가 완벽하지 않을 수 있음
- 결과를 그대로 source of truth로 쓰면 안 됨
```

---

### 2.4. release event draft 생성

```bash
npm run create:operator-release-event-draft
```

역할:

```txt
scan 결과를 바탕으로
manual/operator-release-events.ts에 넣을 수 있는 draft를 생성한다.
```

예상 산출물:

```txt
src/data/operator/generated/operator-release-events.draft.generated.ts
```

주의:

```txt
- draft 파일은 참고용이다.
- 직접 import해서 source of truth로 쓰지 않는다.
- 내용을 확인한 뒤 manual/operator-release-events.ts에 사람이 옮긴다.
```

장점:

```txt
- 신규 이벤트 추가 시 operator-release-events.ts 초안을 빠르게 만들 수 있음
```

단점:

```txt
- draft에는 잘못된 이벤트, 빈 이벤트, 순서 오류, 누락된 오퍼레이터가 있을 수 있음
```

---

### 2.5. manual release event 수정

아래 파일을 수정한다.

```txt
src/data/operator/manual/operator-release-events.ts
```

이 파일이 출시 이벤트의 최종 source of truth다.

수정 기준:

```txt
- 출시 이후 이벤트만 넣는다.
- 서버 오픈 초기 오퍼레이터는 넣지 않는다.
- 이벤트 배열 순서는 최신 출시 이벤트가 위로 오게 한다.
- order 1 = 가장 최근 출시 이벤트다.
- 숫자가 커질수록 오래된 이벤트다.
```

예시 흐름:

```txt
1. scan report 확인
2. draft generated 파일 확인
3. 실제 출시 이벤트와 오퍼레이터 확인
4. operator-release-events.ts에 수동 반영
5. 서버 오픈 초기 오퍼레이터는 넣지 않음
```

---

### 2.6. 수동 제외 리스트 확인

아래 파일을 확인한다.

```txt
src/data/operator/manual/operator-exclusions.ts
```

역할:

```txt
구조상 오퍼레이터처럼 보이지만
앱에 넣으면 안 되는 캐릭터를 charId 기준으로 제외한다.
```

주의:

```txt
- 이름 패턴으로 제외하지 않는다.
- "터치", "예비 인원" 같은 이름은 예시일 뿐이다.
- 실제 charId와 데이터 구조를 확인한 뒤 제외한다.
```

예시:

```ts
export type OperatorExclusion = {
  charId: string;
  reason: string;
};

export const operatorExclusionList: OperatorExclusion[] = [
  {
    charId: "char_xxx",
    reason: "정상 육성 오퍼레이터가 아님",
  },
];
```

---

### 2.7. release info 생성

manual 파일을 수정한 뒤 아래 명령어를 실행한다.

```bash
npm run generate:operator-release-info
```

생성되는 파일:

```txt
src/data/operator/generated/operator-release-info-map.generated.ts
src/data/operator/generated/operator-release-info-report.md
```

역할:

```txt
global character_table
+ CN character_table
+ manual/operator-release-events.ts
+ manual/operator-exclusions.ts
= operator-release-info-map.generated.ts
```

---

## 3. Report 확인 순서

`operator-release-info-report.md`는 아래 순서로 확인한다.

```txt
1. Unmapped Future Operators
2. Unknown Manual Operator Mappings
3. Empty Release Events
4. Excluded Operators
5. Server Open Operators
6. Duplicate Operator Mappings
```

---

### 3.1. Unmapped Future Operators

의미:

```txt
CN character_table에는 있지만
manual/operator-release-events.ts에 출시 이벤트가 없는 future 오퍼레이터
```

처리:

```txt
- 실제 미래시 오퍼레이터라면 operator-release-events.ts에 출시 이벤트 추가
- 아직 출시 이벤트를 모르면 임시로 둘 수 있음
- 너무 많으면 manual release event가 덜 작성된 상태일 가능성이 큼
```

정상 기대:

```txt
가능하면 0에 가깝게 유지
```

---

### 3.2. Unknown Manual Operator Mappings

의미:

```txt
manual/operator-release-events.ts에는 있는데
raw global/CN character_table에서 찾지 못한 charId
```

가능한 원인:

```txt
- charId 오타
- 현재 참조 중인 game data가 오래됨
- CN/global 경로가 잘못됨
- manual에 아직 game data에 없는 오퍼레이터를 먼저 넣음
```

처리:

```txt
- charId 오타면 operator-release-events.ts 수정
- game data 문제면 repository 최신화
- 의도적으로 먼저 넣은 데이터라면 나중에 다시 확인
```

정상 기대:

```txt
0이어야 함
```

---

### 3.3. Empty Release Events

의미:

```txt
operatorIds가 비어 있는 출시 이벤트
```

처리:

```txt
- 해당 이벤트에 출시 오퍼레이터가 있으면 operatorIds 추가
- 실제 출시 오퍼레이터가 없는 이벤트라면 제거하거나 유지 여부 판단
```

정상 기대:

```txt
가능하면 0에 가깝게 유지
```

---

### 3.4. Excluded Operators

의미:

```txt
filter-normal-operators.ts 또는 manual/operator-exclusions.ts에 의해 제외된 캐릭터
```

확인 기준:

```txt
- token / NPC / 비정상 임시 캐릭터라면 제외가 맞음
- 정상 오퍼레이터가 여기 있으면 필터가 너무 강한 것
- 로그라이크 이벤트와 같이 나온 정상 오퍼레이터는 제외하면 안 됨
```

중요:

```txt
라이디언처럼 로그라이크와 관련된 정상 오퍼레이터는 제외 대상이 아니다.
나중에 growthType 또는 releaseInfo category에서 별도 처리한다.
```

---

### 3.5. Server Open Operators

의미:

```txt
manual/operator-release-events.ts에 없어서
server_open으로 자동 분류된 global 오퍼레이터
```

확인 기준:

```txt
- 초기 오퍼레이터가 들어가 있으면 정상
- 출시 이후 오퍼레이터가 여기에 있으면 operator-release-events.ts 누락
```

주의:

```txt
server_open 목록은 길 수 있다.
서버 오픈 기준 오퍼레이터는 manual release event에 넣지 않기 때문이다.
```

---

### 3.6. Duplicate Operator Mappings

의미:

```txt
같은 charId가 여러 release event에 들어간 경우
```

처리:

```txt
- operator-release-events.ts에서 중복 charId 제거
- 출시 이벤트 기준으로는 같은 오퍼레이터가 여러 이벤트에 들어가면 보통 잘못된 상태
```

정상 기대:

```txt
0이어야 함
```

---

## 4. Report 상단 카운트 확인

보고서 상단에는 아래 카운트가 나온다.

```txt
- Total operators
  - Global operators
  - Future operators
- Mapped operators
- Unmapped future operators
- Unknown manual operator mappings
- Empty release events
- Excluded operators
- Server open operators
- Duplicate operator mappings
- Manual-included filtered operators
```

확인 기준:

```txt
Total operators = Global operators + Future operators
Mapped operators = releaseInfoByCharId에 실제 매핑된 오퍼레이터 수
```

주의:

```txt
Mapped operators가 Total operators보다 크면 이상하다.
manual에 있지만 raw character_table에 없는 charId가 releaseInfo에 들어간 것일 수 있다.
현재 스크립트에서는 raw에 없는 manual charId는 Unknown Manual Operator Mappings로 분리하고 releaseInfo에는 넣지 않는다.
```

---

## 5. Manual-included filtered operators

의미:

```txt
필터에서는 제외됐지만
manual/operator-release-events.ts에 있고
raw character_table에도 존재해서 releaseInfo 생성 대상으로 복구한 오퍼레이터
```

이 값이 생기는 것은 무조건 오류는 아니다.

가능한 케이스:

```txt
- 로그라이크 관련 특수 오퍼레이터
- 일반 육성 재료 구조와 다른 오퍼레이터
```

처리 방향:

```txt
- 정상 오퍼레이터라면 유지
- 일반 육성과 다르면 나중에 growthType 또는 override에서 별도 처리
- 앱에 넣으면 안 되는 캐릭터라면 operator-release-events.ts에서 제거하거나 operator-exclusions.ts에서 관리
```

---

## 6. 정상 오퍼레이터 필터 기준

정상 오퍼레이터 필터는 아래 파일에서 관리한다.

```txt
scripts/operator-generator/parsers/filter-normal-operators.ts
```

필터의 목적:

```txt
character_table.json 전체에서
실제 앱에 넣을 오퍼레이터 후보만 뽑는다.
```

주의할 점:

```txt
- 이름 패턴으로 제외하지 않는다.
- 1성/2성은 스킬이 없는 것이 정상이므로, 스킬이 없다고 무조건 제외하지 않는다.
- 3성은 1정예화가 있지만 evolveCost가 비어 있을 수 있다.
```

기본 포함 조건:

```txt
- charId가 char_로 시작
- 실제 8직군
- 정상 rarity
- name 또는 appellation 존재
- phases 배열 존재
```

재료 검사 기준:

```txt
1성/2성:
- 스킬 없음 허용
- 정예화 재료 없음 허용
- 스킬업 재료 없음 허용

3성:
- evolveCost 없음 허용
- 공통 스킬업 재료는 검사 가능
- 마스터리 재료는 검사하지 않음

4성 이상:
- 정예화 재료 검사
- 공통 스킬업 재료 검사
- 마스터리 재료 검사
```

manual release event에 있는 오퍼레이터:

```txt
- 필터에 걸렸더라도 raw character_table에 존재하면 releaseInfo 생성에는 포함
- 나중에 growthType 또는 특수 처리에서 별도 분기
```

---

## 7. Source of Truth

### 7.1. Global game data

사용 목적:

```txt
- 글로벌 기준 오퍼레이터 목록
- 한국어 이름
- 현재 글로벌에 존재하는 스킬/재료/모듈 데이터
```

환경 변수:

```env
ARKNIGHTS_GAMEDATA_PATH=...
```

현재 기준 character table 경로:

```txt
kr/gamedata/excel/character_table.json
```

---

### 7.2. CN game data

사용 목적:

```txt
- 글로벌에 아직 없는 future 오퍼레이터 확인
- 글로벌에 아직 없는 future 모듈 확인
- 미래시 releaseInfo 후보 확인
```

환경 변수:

```env
ARKNIGHTS_CN_GAMEDATA_PATH=...
```

현재 기준 character table 경로:

```txt
zh_CN/gamedata/excel/character_table.json
```

---

### 7.3. Manual files

아래 파일들은 generated 파일보다 우선되는 수동 관리 데이터다.

```txt
src/data/operator/manual/operator-release-events.ts
src/data/operator/manual/operator-exclusions.ts
src/data/operator/manual/operator-overrides.ts
```

역할:

```txt
operator-release-events.ts
→ 출시 이벤트 / 출시순 source of truth

operator-exclusions.ts
→ 앱에 넣으면 안 되는 캐릭터 수동 제외

operator-overrides.ts
→ JSON으로 알 수 없는 앱 전용 정보
```

---

## 8. Generated files

아래 파일들은 직접 수정하지 않는다.

```txt
src/data/operator/generated/operator-release-candidates.generated.ts
src/data/operator/generated/operator-release-candidate-report.md
src/data/operator/generated/operator-cn-release-candidates.generated.ts
src/data/operator/generated/operator-cn-release-candidate-report.md
src/data/operator/generated/operator-release-events.draft.generated.ts
src/data/operator/generated/operator-release-info-map.generated.ts
src/data/operator/generated/operator-release-info-report.md
```

나중에 전체 오퍼레이터 생성기까지 연결되면 아래 파일들도 generated로 관리한다.

```txt
src/data/operator/generated/operators.generated.ts
src/data/operator/generated/operator-by-id.generated.ts
src/data/operator/generated/operator-id-migration-map.generated.ts
src/data/operator/generated/operator-generation-report.md
```

---

## 9. Release order 규칙

현재 프로젝트에서는 order를 아래 기준으로 사용한다.

```txt
order 1 = 가장 최근 출시 이벤트
order 숫자가 커질수록 오래된 이벤트
server_open = manual 이벤트 마지막 이후
```

예시:

```txt
manual 이벤트가 N개이고 unmapped future가 있으면

최신 이벤트: order 1
manual 마지막 이벤트: order N
unmapped_future_release: order N + 1
server_open: order N + 2
```

unmapped future가 없으면:

```txt
server_open: order N + 1
```

---

## 10. operator-overrides.ts 역할

아래 파일은 JSON으로 알 수 없는 앱 전용 정보를 관리한다.

```txt
src/data/operator/manual/operator-overrides.ts
```

넣는 것:

```txt
- legacyId
- nicknameList
- preferSkillIndexes
- preferModules
- translatedName
- translatedSkillNames
- translatedModuleNames
- growthType
```

넣지 않는 것:

```txt
- name
- rarity
- class
- eliteMaterials
- skillList
- moduleList
- releaseInfo
```

이 값들은 game data 또는 generated releaseInfo에서 생성한다.

---

## 11. 로그라이크 / 특수 오퍼레이터 처리 방향

로그라이크 이벤트와 같이 나온 정상 오퍼레이터는 제외하지 않는다.

대신 나중에 아래 방식으로 별도 처리한다.

```ts
growthType: "normal" | "roguelike";
```

예상 처리:

```txt
growthType === "normal"
→ 일반 육성 재료 계산

growthType === "roguelike"
→ 일반 육성 재료 계산에서 제외하거나 별도 UI 표시
```

이 정보는 `operator-overrides.ts` 또는 별도 manual metadata에서 관리한다.

---

## 12. 문제 상황별 체크리스트

### 12.1. Mapped operators가 Total operators보다 많다

가능한 원인:

```txt
- manual release event의 charId가 raw character_table에 없는데 releaseInfo에 들어감
- 이전 스크립트 로직이 unknown manual charId도 매핑함
```

처리:

```txt
- Unknown Manual Operator Mappings 확인
- charId 오타 수정
- game data 최신화
```

---

### 12.2. 정상 오퍼레이터가 Excluded Operators에 있다

가능한 원인:

```txt
- 필터가 너무 강함
- 1~3성 재료 예외 처리가 부족함
- 로그라이크/특수 오퍼레이터를 일반 오퍼레이터 기준으로 검사함
```

처리:

```txt
- filter-normal-operators.ts 완화
- manual release event에 있는 정상 오퍼레이터는 raw에 있으면 포함
- 특수 처리는 나중에 growthType으로 분리
```

---

### 12.3. Unmapped Future Operators가 너무 많다

가능한 원인:

```txt
- CN 최신 데이터 기준 신규 오퍼레이터가 manual에 아직 없음
- operator-release-events.ts가 덜 작성됨
```

처리:

```txt
- 출시 이벤트 확인 후 operator-release-events.ts에 추가
- 아직 모르는 경우 임시로 두고 나중에 정리
```

---

### 12.4. Server Open Operators에 출시 이후 오퍼레이터가 있다

가능한 원인:

```txt
- operator-release-events.ts에서 해당 오퍼레이터 누락
```

처리:

```txt
- 해당 출시 이벤트에 operatorIds 추가
```

---

## 13. 커밋 전 확인

커밋 전 최소 확인 항목:

```txt
- Unknown Manual Operator Mappings가 0인지
- Duplicate Operator Mappings가 0인지
- Unmapped Future Operators가 의도한 수준인지
- Excluded Operators에 정상 오퍼레이터가 없는지
- Server Open Operators에 출시 이후 오퍼레이터가 섞이지 않았는지
```

문제가 없다면 아래 파일들을 커밋한다.

```txt
src/data/operator/manual/operator-release-events.ts
src/data/operator/manual/operator-exclusions.ts
src/data/operator/generated/operator-release-candidates.generated.ts
src/data/operator/generated/operator-release-candidate-report.md
src/data/operator/generated/operator-cn-release-candidates.generated.ts
src/data/operator/generated/operator-cn-release-candidate-report.md
src/data/operator/generated/operator-release-events.draft.generated.ts
src/data/operator/generated/operator-release-info-map.generated.ts
src/data/operator/generated/operator-release-info-report.md
```

---

## 14. 나중에 전체 operator generator까지 연결되면

releaseInfo가 정리된 뒤에는 전체 오퍼레이터 생성기를 실행한다.

예정 명령어:

```bash
npm run generate:operators
```

전체 생성기는 아래 데이터를 조합한다.

```txt
global character_table
global skill_table
global uniequip_table
CN character_table
CN skill_table
CN uniequip_table
operator-overrides.ts
operator-release-info-map.generated.ts
```

생성 대상:

```txt
src/data/operator/generated/operators.generated.ts
src/data/operator/generated/operator-by-id.generated.ts
src/data/operator/generated/operator-id-migration-map.generated.ts
src/data/operator/generated/operator-generation-report.md
```