import {
  OperatorReleaseCategory,
  Server,
} from "../../src/data/operator/manual/operator-release-types";

export type CnAddedOperatorInfo = {
  charId: string;

  /** CN character_table 기준 이름 */
  cnName: string;

  /** KR/global character_table에 매칭된 이름. 아직 없으면 null */
  globalName: string | null;

  profession: string;

  /** 현재 KR/global 서버에 존재하는지 여부 */
  server: Server;
};

export type CnAddedActivityInfo = {
  id: string;

  /** CN activity_table 기준 이름 */
  cnName: string;

  /** KR/global activity_table에 매칭된 이름. 아직 없으면 null */
  globalName: string | null;

  /** 최신 CN activity_table 기준 type */
  type: string;

  /** 최초 등장 commit 당시 type. 과거 데이터에서는 숫자 enum일 수 있습니다. */
  firstSeenType: string;

  displayType: string;
  category: OperatorReleaseCategory;

  isRerun: boolean;
  isReplicate: boolean;
  hasEventShop: boolean;

  templateShopId: string | null;

  cnStartTime: number | null;
  cnEndTime: number | null;

  globalStartTime: number | null;
  globalEndTime: number | null;

  hasGlobalMatch: boolean;
};

export type CnAddedGachaInfo = {
  id: string;
  name: string;
};

export type CnReleaseCandidateConfidence = "high" | "medium" | "low";

export type CnReleaseCandidateKind =
  | "cn_release_candidate"
  | "cn_historical_baseline"
  | "cn_unmapped_release_activity";

export type CnReleaseCandidate = {
  kind: CnReleaseCandidateKind;

  commitHash: string;
  commitDate: string;

  addedOperatorList: CnAddedOperatorInfo[];
  addedActivityList: CnAddedActivityInfo[];
  addedGachaList: CnAddedGachaInfo[];

  confidence: CnReleaseCandidateConfidence;
  reasons: string[];
};
