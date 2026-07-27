export type AddedActivityInfo = {
  id: string;
  name: string;
  type: string;
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

  addedOperatorIds: string[];
  addedActivityList: AddedActivityInfo[];
  addedGachaList: AddedGachaInfo[];

  confidence: OperatorReleaseCandidateConfidence;
  reasons: string[];
};
