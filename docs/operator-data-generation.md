# 오퍼레이터 데이터 생성

## 용어

`release event`는 오퍼레이터가 추가된 이벤트 하나를 의미합니다.

```txt
예: 사세행 이벤트에 어떤 오퍼레이터들이 같이 출시됐는지 묶은 데이터
```

`releaseInfo`는 오퍼레이터마다 붙는 출시 정보입니다.

```txt
예: 이 오퍼레이터는 어떤 이벤트에서 나왔고, 출시 순서는 몇 번째인지
```

`release event draft`는 `operatorReleaseEventList`에 넣기 위한 초안입니다. 그대로 쓰는 파일이 아니라, 보고 필요한 부분만 수동 파일에 옮기면 됩니다.

---

## 실행 순서

게임 데이터 저장소부터 최신화합니다.

```bash
git -C <ARKNIGHTS_GAMEDATA_PATH> pull
git -C <ARKNIGHTS_CN_GAMEDATA_PATH> pull
```

그 다음 아래 순서로 실행합니다.

```bash
npm run scan:operator-release
npm run scan:cn-operator-release
npm run create:operator-release-event-draft

# 여기서 manual 파일을 직접 수정합니다.

npm run generate:operator-release-info
npm run generate:operators
```

---

## 1. `scan:operator-release`

사용 파일:

```txt
global game data
```

동작:

```txt
글로벌 서버 기준으로 출시 이벤트 / 오퍼레이터 후보를 찾습니다.
```

결과물:

```txt
src/data/operator/generated/operator-release-candidates.generated.ts
src/data/operator/generated/operator-release-candidate-report.md
```

---

## 2. `scan:cn-operator-release`

사용 파일:

```txt
CN game data
```

동작:

```txt
중국 서버 기준으로 미래시 출시 이벤트 / 오퍼레이터 후보를 찾습니다.
```

결과물:

```txt
src/data/operator/generated/operator-cn-release-candidates.generated.ts
src/data/operator/generated/operator-cn-release-candidate-report.md
```

---

## 3. `create:operator-release-event-draft`

사용 파일:

```txt
operator-release-candidates.generated.ts
operator-cn-release-candidates.generated.ts
```

동작:

```txt
scan 결과를 모아서 operatorReleaseEventList에 넣을 수 있는 초안을 만듭니다.
특정 이벤트에 대한 설명과, 해당 이벤트에 어떤 오퍼레이터가 출시되었는지를 예상하여 생성됩니다.
```

결과물:

```txt
src/data/operator/generated/operator-release-events.draft.generated.ts
```

---

## 4. draft 확인 후 직접 수정

수정 파일:

```txt
src/data/operator/manual/operator-release-events.ts
src/data/operator/manual/operator-override.ts
```

하는 일:

```txt
operator-release-events.draft.generated.ts를 보고 operatorReleaseEventList를 직접 수정합니다.
신규 오퍼레이터의 번역명, 추천 스킬, 추천 모듈, growthType이 필요하면 operatorOverrideList도 직접 수정합니다.
```

주의할 점:

```txt
operator-release-events.draft.generated.ts는 참고용입니다.
최종 기준은 operatorReleaseEventList입니다.
```

---

## 5. `generate:operator-release-info`

사용 파일:

```txt
global & CN character_table.json
global & CN activity_table.json
src/data/operator/manual/operator-release-events.ts
src/data/operator/manual/operator-exclusions.ts
```

동작:

```txt
operatorReleaseEventList를 기준으로 오퍼레이터별 releaseInfo를 만듭니다.
activity_table.json의 startTime을 보고 이벤트 시작 날짜도 같이 만듭니다.
```

결과물:

```txt
src/data/operator/generated/operator-release-info-map.generated.ts
src/data/operator/generated/operator-release-events.generated.ts
src/data/operator/generated/operator-release-info-report.md
```

---

## 6. `generate:operators`

사용 파일:

```txt
global & CN character_table.json
global & CN skill_table.json
global & CN uniequip_table.json
src/data/operator/manual/operator-override.ts
src/data/operator/manual/custom-operators.ts
src/data/operator/generated/operator-release-info-map.generated.ts
```

동작:

```txt
실제로 앱에서 사용하는 최종 오퍼레이터 데이터를 생성합니다.
```

결과물:

```txt
src/data/operator/generated/operators.draft.generated.ts
src/data/operator/generated/operators.generated.ts
src/data/operator/generated/operator-by-id.generated.ts
src/data/operator/generated/operator-id-migration-map.generated.ts
src/data/operator/generated/operator-generation-report.md
```

---

## 보고서에서 가볍게 볼 것

```txt
operator-release-info-report.md
- Unknown Manual Operator Mappings
- Duplicate Operator Mappings
- Missing Release Event Start Times
- Unmapped Future Operators

operator-generation-report.md
- Missing Materials
- Duplicate Operator Overrides
- Missing Release Info
- Added Future Modules
```
