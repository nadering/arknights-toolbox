import { AddedOperatorInfo } from "./character-types";

export type AddedActivityInfo = {
  id: string;
  name: string;

  /** 최신 activity_table.json 기준 type */
  type: string;

  /** 최초 추가 commit 당시의 type. 과거 데이터에서는 number일 수 있습니다. */
  firstSeenType: string;

  displayType: string;
  isReplicate: boolean;
};

export type AddedGachaInfo = {
  id: string;
  name: string;
};

export type OperatorReleaseCandidateConfidence = "high" | "medium" | "low";

export type OperatorReleaseCandidate = {
  commitHash: string;
  commitDate: string;

  addedOperatorList: AddedOperatorInfo[];
  addedActivityList: AddedActivityInfo[];
  addedGachaList: AddedGachaInfo[];

  confidence: OperatorReleaseCandidateConfidence;
  reasons: string[];
};
